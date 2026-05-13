/**
 * Vercel Cron: Meta Ads insights report sent via Brevo.
 * Schedule defined em vercel.json (default: 0 * * * * — top da hora).
 *
 * Env vars (Vercel):
 *   META_ACCESS_TOKEN       — token Marketing API com ads_read
 *   META_AD_ACCOUNT_ID      — act_xxx
 *   META_CAMPAIGN_ID        — id da campanha
 *   BREVO_API_KEY           — Brevo Transactional
 *   REPORT_TO_EMAIL         — destino (default hdgpimentel@gmail.com)
 *   REPORT_FROM_EMAIL       — sender (default contato@institutoarianaborges.com.br)
 *   REPORT_FROM_NAME        — sender name (default Instituto Ariana Borges)
 *   CRON_SECRET             — Vercel injeta auto + valida via Authorization header
 *   REPORT_TIMEZONE         — default America/Recife
 */

const META_API = 'https://graph.facebook.com/v23.0';
const BREVO_SMTP_API = 'https://api.brevo.com/v3/smtp/email';

const FIELDS_INSIGHTS =
    'campaign_name,adset_name,ad_name,impressions,reach,clicks,ctr,cpc,cpm,spend,frequency,actions,cost_per_action_type';

type ActionRow = { action_type: string; value: string | number };
type InsightRow = {
    ad_name?: string;
    impressions?: string;
    reach?: string;
    clicks?: string;
    spend?: string;
    ctr?: string;
    actions?: ActionRow[];
};

type Totals = {
    impressions: number;
    reach: number;
    clicks: number;
    spend: number;
    lpv: number;
    initiate_checkout: number;
    purchase: number;
    lead: number;
};

type Summary = {
    totals: Totals;
    ctr: number;
    cpc: number;
    cpm: number;
    cpa_purchase: number | null;
};

const env = (k: string, fallback = ''): string =>
    (process.env[k] ?? fallback).trim();

async function metaGet<T = any>(path: string, params: Record<string, string>): Promise<T> {
    const url = new URL(`${META_API}/${path.replace(/^\//, '')}`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    url.searchParams.set('access_token', env('META_ACCESS_TOKEN'));
    const r = await fetch(url.toString());
    const body = await r.json();
    if (!r.ok || (body as any).error) {
        const e = (body as any).error || body;
        throw new Error(`Meta API ${r.status}: ${e.message || JSON.stringify(e)}`);
    }
    return body as T;
}

function actionsToMap(actions?: ActionRow[]): Record<string, number> {
    const out: Record<string, number> = {};
    for (const a of actions || []) {
        out[a.action_type] = Number(a.value) || 0;
    }
    return out;
}

function summarize(rows: InsightRow[]): Summary {
    const t: Totals = {
        impressions: 0, reach: 0, clicks: 0, spend: 0,
        lpv: 0, initiate_checkout: 0, purchase: 0, lead: 0,
    };
    // reach NAO e somavel (pessoas unicas). Quando ha multiplas linhas (ex: level=adset/ad),
    // pegamos o MAX como aproximacao conservadora — soma infla por overlap.
    let maxReach = 0;
    for (const r of rows) {
        t.impressions += Number(r.impressions) || 0;
        t.clicks += Number(r.clicks) || 0;
        t.spend += Number(r.spend) || 0;
        maxReach = Math.max(maxReach, Number(r.reach) || 0);
        const a = actionsToMap(r.actions);
        t.lpv += a.landing_page_view || 0;
        t.initiate_checkout += a.initiate_checkout || 0;
        t.purchase += a.purchase || 0;
        t.lead += a.lead || 0;
    }
    t.reach = maxReach;
    return {
        totals: t,
        ctr: t.impressions > 0 ? (t.clicks / t.impressions) * 100 : 0,
        cpc: t.clicks > 0 ? t.spend / t.clicks : 0,
        cpm: t.impressions > 0 ? (t.spend / t.impressions) * 1000 : 0,
        cpa_purchase: t.purchase > 0 ? t.spend / t.purchase : null,
    };
}

function fmtBR(n: number, dec = 2) {
    return n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function nowInTz(tz: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
        hour12: false,
    }).format(new Date()).replace(',', '');
}

// Retorna YYYY-MM-DD no fuso solicitado (ex: 'America/Recife')
function dateInTz(tz: string, offsetDays = 0): string {
    const d = new Date(Date.now() + offsetDays * 86_400_000);
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(d);
    const y = parts.find(p => p.type === 'year')!.value;
    const m = parts.find(p => p.type === 'month')!.value;
    const day = parts.find(p => p.type === 'day')!.value;
    return `${y}-${m}-${day}`;
}

// Thresholds em BRL onde queremos disparar alertas pontuais (uma vez cada).
const SPEND_ALERT_THRESHOLDS = [50, 100, 150];

async function buildAndSendReport(reportType: 'hourly' | 'daily'): Promise<{ subject: string; recipients: string[]; alertsSent: number[] }> {
    const campaignId = env('META_CAMPAIGN_ID');
    const tz = env('REPORT_TIMEZONE', 'America/Recife');

    const campaign = await metaGet<any>(campaignId, {
        fields: 'id,name,status,objective',
    });

    // Reconciliacao com Ads Manager:
    // 1. use_unified_attribution_setting=true → mesma janela de atribuicao do BM
    // 2. time_range explicito em America/Recife → "today" no fuso correto (nao no fuso do ad account)
    // 3. date_preset:'lifetime' (nao 'maximum') → identico ao BM
    const today = dateInTz(tz, 0);
    const yesterday = dateInTz(tz, -1);
    const baseParams = {
        fields: FIELDS_INSIGHTS,
        level: 'campaign',
        limit: '50',
        use_unified_attribution_setting: 'true',
    };

    const [insightsToday, insightsYesterday, insightsLifetime, insightsAd] = await Promise.all([
        metaGet<{ data: InsightRow[] }>(`${campaignId}/insights`, {
            ...baseParams,
            time_range: JSON.stringify({ since: today, until: today }),
        }),
        metaGet<{ data: InsightRow[] }>(`${campaignId}/insights`, {
            ...baseParams,
            time_range: JSON.stringify({ since: yesterday, until: yesterday }),
        }),
        metaGet<{ data: InsightRow[] }>(`${campaignId}/insights`, {
            ...baseParams,
            date_preset: 'maximum', // 'lifetime' nao e valido em campaign-level
        }),
        metaGet<{ data: InsightRow[] }>(`${campaignId}/insights`, {
            ...baseParams,
            level: 'ad',
            date_preset: 'maximum',
        }),
    ]);

    const campSummary = summarize(insightsToday.data || []);
    const yesterdaySummary = summarize(insightsYesterday.data || []);
    const lifetimeSummary = summarize(insightsLifetime.data || []);
    const topAds = (insightsAd.data || [])
        .sort((a, b) => (Number(b.spend) || 0) - (Number(a.spend) || 0))
        .slice(0, 8);

    const ts = nowInTz(tz);
    const label = reportType === 'daily' ? 'Daily' : 'Hourly';
    const subject = `[Meta Ads][${label}] ${campaign.name} — ${ts}`;

    const cpaTxt = lifetimeSummary.cpa_purchase != null
        ? `R$ ${fmtBR(lifetimeSummary.cpa_purchase)}` : 'sem conversoes';

    const textBody = [
        `Relatorio horario Meta Ads — ${ts}`,
        `Campanha: ${campaign.name} (${campaign.id})`,
        `Status: ${campaign.status} | Objetivo: ${campaign.objective}`,
        ``,
        `Metricas (Hoje | Ontem | Lifetime):`,
        `- Spend:      R$${fmtBR(campSummary.totals.spend)} | R$${fmtBR(yesterdaySummary.totals.spend)} | R$${fmtBR(lifetimeSummary.totals.spend)}`,
        `- Impressions: ${campSummary.totals.impressions} | ${yesterdaySummary.totals.impressions} | ${lifetimeSummary.totals.impressions}`,
        `- Reach:       ${campSummary.totals.reach} | ${yesterdaySummary.totals.reach} | ${lifetimeSummary.totals.reach}`,
        `- Clicks:      ${campSummary.totals.clicks} | ${yesterdaySummary.totals.clicks} | ${lifetimeSummary.totals.clicks}`,
        `- CTR:         ${fmtBR(campSummary.ctr)}% | ${fmtBR(yesterdaySummary.ctr)}% | ${fmtBR(lifetimeSummary.ctr)}%`,
        `- CPC:         R$${fmtBR(campSummary.cpc)} | R$${fmtBR(yesterdaySummary.cpc)} | R$${fmtBR(lifetimeSummary.cpc)}`,
        `- LPV:         ${campSummary.totals.lpv} | ${yesterdaySummary.totals.lpv} | ${lifetimeSummary.totals.lpv}`,
        `- Purchase:    ${campSummary.totals.purchase} | ${yesterdaySummary.totals.purchase} | ${lifetimeSummary.totals.purchase}`,
        `- CPA Purchase (lifetime): ${cpaTxt}`,
        ``,
        `Top anuncios por gasto (lifetime):`,
        ...topAds.map((r) => {
            const a = actionsToMap(r.actions);
            return `- ${r.ad_name || '(sem nome)'} | Spend R$${fmtBR(Number(r.spend) || 0)} | CTR ${fmtBR(Number(r.ctr) || 0)}% | LPV ${a.landing_page_view || 0} | IC ${a.initiate_checkout || 0} | P ${a.purchase || 0}`;
        }),
    ].join('\n');

    const htmlRows = topAds.map((r) => {
        const a = actionsToMap(r.actions);
        return `<tr>
            <td>${r.ad_name || '(sem nome)'}</td>
            <td>${fmtBR(Number(r.spend) || 0)}</td>
            <td>${fmtBR(Number(r.ctr) || 0)}%</td>
            <td>${a.landing_page_view || 0}</td>
            <td>${a.initiate_checkout || 0}</td>
            <td>${a.purchase || 0}</td>
        </tr>`;
    }).join('\n');

    const cellMetric = (label: string, today: number | string, yest: number | string, total: number | string) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;">${label}</td>
             <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${today}</td>
             <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;color:#666;">${yest}</td>
             <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">${total}</td></tr>`;

    const htmlBody = `<html><body style="font-family:Arial,sans-serif;color:#222;">
        <h2 style="color:#3A2878;">Meta Ads ${label} Insights</h2>
        <p><strong>Campanha:</strong> ${campaign.name} (${campaign.id})<br/>
           <strong>Status:</strong> ${campaign.status} · <strong>Objetivo:</strong> ${campaign.objective}<br/>
           <strong>Snapshot:</strong> ${ts} (${tz})</p>
        <h3>Resumo (3 janelas)</h3>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #ddd;">
            <thead>
                <tr style="background:#f5f5f5;">
                    <th style="padding:8px 12px;text-align:left;">Métrica</th>
                    <th style="padding:8px 12px;text-align:right;">Hoje</th>
                    <th style="padding:8px 12px;text-align:right;color:#666;">Ontem</th>
                    <th style="padding:8px 12px;text-align:right;">Lifetime</th>
                </tr>
            </thead>
            <tbody>
                ${cellMetric('Spend', `R$ ${fmtBR(campSummary.totals.spend)}`, `R$ ${fmtBR(yesterdaySummary.totals.spend)}`, `R$ ${fmtBR(lifetimeSummary.totals.spend)}`)}
                ${cellMetric('Impressions', campSummary.totals.impressions, yesterdaySummary.totals.impressions, lifetimeSummary.totals.impressions)}
                ${cellMetric('Reach', campSummary.totals.reach, yesterdaySummary.totals.reach, lifetimeSummary.totals.reach)}
                ${cellMetric('Clicks', campSummary.totals.clicks, yesterdaySummary.totals.clicks, lifetimeSummary.totals.clicks)}
                ${cellMetric('CTR', `${fmtBR(campSummary.ctr)}%`, `${fmtBR(yesterdaySummary.ctr)}%`, `${fmtBR(lifetimeSummary.ctr)}%`)}
                ${cellMetric('CPC', `R$ ${fmtBR(campSummary.cpc)}`, `R$ ${fmtBR(yesterdaySummary.cpc)}`, `R$ ${fmtBR(lifetimeSummary.cpc)}`)}
                ${cellMetric('CPM', `R$ ${fmtBR(campSummary.cpm)}`, `R$ ${fmtBR(yesterdaySummary.cpm)}`, `R$ ${fmtBR(lifetimeSummary.cpm)}`)}
                ${cellMetric('LPV', campSummary.totals.lpv, yesterdaySummary.totals.lpv, lifetimeSummary.totals.lpv)}
                ${cellMetric('InitiateCheckout', campSummary.totals.initiate_checkout, yesterdaySummary.totals.initiate_checkout, lifetimeSummary.totals.initiate_checkout)}
                ${cellMetric('Lead', campSummary.totals.lead, yesterdaySummary.totals.lead, lifetimeSummary.totals.lead)}
                ${cellMetric('Purchase', campSummary.totals.purchase, yesterdaySummary.totals.purchase, lifetimeSummary.totals.purchase)}
            </tbody>
        </table>
        <p style="font-size:13px;color:#888;margin-top:8px;">CPA Purchase (lifetime): ${lifetimeSummary.cpa_purchase != null ? `R$ ${fmtBR(lifetimeSummary.cpa_purchase)}` : 'sem conversoes'}</p>
        <h3>Top anuncios por gasto (lifetime)</h3>
        <table border="1" cellpadding="6" style="border-collapse:collapse;">
            <thead>
                <tr style="background:#f5f5f5;">
                    <th>Anuncio</th><th>Spend (R$)</th><th>CTR</th><th>LPV</th><th>IC</th><th>Purchase</th>
                </tr>
            </thead>
            <tbody>${htmlRows || '<tr><td colspan="6">Sem dados ainda</td></tr>'}</tbody>
        </table>
        <p style="margin-top:24px;color:#888;font-size:12px;">
            Gerado automaticamente pelo cron de relatorios horarios · vercel-cron · ${ts}
        </p>
    </body></html>`;

    const recipients = env('REPORT_TO_EMAIL', 'hdgpimentel@gmail.com')
        .split(',').map(s => s.trim()).filter(Boolean);

    await sendBrevoEmail(recipients, subject, textBody, htmlBody);

    // Alertas de spend (sem state externo): cruza threshold se total atual >= X
    // E total ate a hora anterior < X. Detectado via breakdown horario do Meta.
    const alertsSent: number[] = [];
    try {
        const hourly = await metaGet<{ data: any[] }>(
            `${campaignId}/insights`,
            {
                fields: 'spend',
                date_preset: 'today',
                level: 'campaign',
                breakdowns: 'hourly_stats_aggregated_by_advertiser_time_zone',
                limit: '48',
            },
        );
        const sortedHours = (hourly.data || []).sort((a, b) =>
            (a.hourly_stats_aggregated_by_advertiser_time_zone || '').localeCompare(
                b.hourly_stats_aggregated_by_advertiser_time_zone || ''
            )
        );
        const lastBucket = sortedHours[sortedHours.length - 1];
        const lastHourSpend = lastBucket ? Number(lastBucket.spend) || 0 : 0;
        const totalSpend = campSummary.totals.spend;
        const previousTotalSpend = totalSpend - lastHourSpend;

        for (const threshold of SPEND_ALERT_THRESHOLDS) {
            const justCrossed = totalSpend >= threshold && previousTotalSpend < threshold;
            if (!justCrossed) continue;
            const alertSubject = `[ALERTA] DNA Basico bateu R$ ${threshold} — ${ts}`;
            const alertText = [
                `ALERTA DE SPEND - DNA Basico`,
                ``,
                `Total acumulado hoje: R$ ${fmtBR(totalSpend)}`,
                `Threshold cruzado: R$ ${threshold}`,
                ``,
                `Numero de Purchases ate agora: ${campSummary.totals.purchase}`,
                `LPV (landing page views): ${campSummary.totals.lpv}`,
                ``,
                `Acao sugerida: revisa Ads Manager se ja deveria pausar`,
                `https://www.facebook.com/adsmanager/manage/campaigns?act=${env('META_AD_ACCOUNT_ID').replace('act_','')}`,
            ].join('\n');
            const alertHtml = `<html><body style="font-family:Arial,sans-serif;">
                <h2 style="color:#DC3545;">🚨 Spend Alert — DNA Básico</h2>
                <p><strong>Total acumulado hoje:</strong> R$ ${fmtBR(totalSpend)}</p>
                <p><strong>Threshold cruzado:</strong> R$ ${threshold}</p>
                <p><strong>Purchases ate agora:</strong> ${campSummary.totals.purchase} ·
                   <strong>LPV:</strong> ${campSummary.totals.lpv}</p>
                <p><a href="https://www.facebook.com/adsmanager/manage/campaigns?act=${env('META_AD_ACCOUNT_ID').replace('act_','')}">Abrir Ads Manager</a></p>
            </body></html>`;
            await sendBrevoEmail(recipients, alertSubject, alertText, alertHtml);
            alertsSent.push(threshold);
        }
    } catch (e) {
        console.error('[spend-alert] check failed (nao bloqueia o report):', e);
    }

    return { subject, recipients, alertsSent };
}

async function sendBrevoEmail(recipients: string[], subject: string, text: string, html: string) {
    const r = await fetch(BREVO_SMTP_API, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': env('BREVO_API_KEY'),
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: {
                name: env('REPORT_FROM_NAME', 'Instituto Ariana Borges'),
                email: env('REPORT_FROM_EMAIL', 'contato@institutoarianaborges.com.br'),
            },
            to: recipients.map(email => ({ email })),
            subject,
            textContent: text,
            htmlContent: html,
        }),
    });
    if (!r.ok) throw new Error(`Brevo send failed ${r.status}: ${await r.text()}`);
}

export default async function handler(req: any, res: any) {
    // Vercel Cron envia "Authorization: Bearer ${CRON_SECRET}" automaticamente.
    // Em prod, valida pra evitar trigger publico.
    const cronSecret = env('CRON_SECRET');
    const authHeader = req.headers?.authorization || '';
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const required = ['META_ACCESS_TOKEN', 'META_AD_ACCOUNT_ID', 'META_CAMPAIGN_ID', 'BREVO_API_KEY'];
    const missing = required.filter(k => !env(k));
    if (missing.length) {
        return res.status(500).json({ error: `Missing env: ${missing.join(', ')}` });
    }

    const url = new URL(req.url || '', 'http://x');
    const reportType = url.searchParams.get('type') === 'daily' ? 'daily' : 'hourly';

    try {
        const result = await buildAndSendReport(reportType);
        return res.status(200).json({ success: true, type: reportType, ...result });
    } catch (err: any) {
        console.error('[cron-meta-ads-report]', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}
