/**
 * Vercel Cron diário (06h BRT = 09h UTC).
 * Verifica se ONTEM foi data de portal (DD/MM espelhada).
 * Se sim → envia email anunciando que portal.arianaborges.com agora exibe o NOVO portal.
 *
 * Auth: Authorization: Bearer ${CRON_SECRET}
 */
import portalsData from '../src/data/portals.json';

const BREVO_SMTP_API = 'https://api.brevo.com/v3/smtp/email';
const TZ = 'America/Recife';

interface Portal {
    id: string;
    date: string;
    displayDate: string;
    displayTime: string;
    title: string;
    subtitle: string;
    tagline: string;
    energia: string[];
    essence: string;
    mesa_aspect: string;
    kundalini_aspect: string;
}

const PORTALS = portalsData as Portal[];

const env = (k: string, fallback = ''): string => (process.env[k] ?? fallback).trim();

function dateInTz(tz: string, offsetDays = 0): string {
    const d = new Date(Date.now() + offsetDays * 86_400_000);
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(d);
    const y = parts.find(p => p.type === 'year')!.value;
    const m = parts.find(p => p.type === 'month')!.value;
    const day = parts.find(p => p.type === 'day')!.value;
    return `${y}-${m}-${day}`;
}

function findPortalForDate(dateStr: string): Portal | null {
    return PORTALS.find(p => p.date === dateStr) ?? null;
}

function findNextPortal(afterDate: string): Portal | null {
    const upcoming = PORTALS.filter(p => p.date > afterDate);
    return upcoming[0] ?? null;
}

function buildEmailHtml(closedPortal: Portal, nextPortal: Portal | null): string {
    const nextSection = nextPortal ? `
        <hr style="border:none;border-top:1px solid rgba(212,175,55,0.2);margin:32px 0;">
        <p style="color:#D4AF37;font-size:13px;font-weight:bold;margin:0 0 12px;letter-spacing:1px;font-family:Arial,sans-serif;">PRÓXIMO PORTAL ATIVO NA LP</p>
        <h3 style="color:#fff;font-size:24px;margin:0 0 8px;font-family:Georgia,serif;">${nextPortal.title} — ${nextPortal.displayDate}</h3>
        <p style="color:#cfc4a8;font-size:14px;line-height:1.7;margin:0 0 12px;font-family:Arial,sans-serif;">${nextPortal.subtitle}</p>
        <p style="color:#D4AF37;font-style:italic;font-size:14px;margin:0;font-family:Georgia,serif;">"${nextPortal.tagline}"</p>
    ` : '';

    return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>Portal D+1</title></head>
<body style="margin:0;padding:0;background-color:#0b0916;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0916;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#12102b;border-radius:16px;overflow:hidden;max-width:600px;border:1px solid rgba(212,175,55,0.3);">
<tr><td style="background:linear-gradient(135deg,#12102b,#0b0916);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.3);">
<p style="color:#D4AF37;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 14px;font-family:Arial,sans-serif;">Portal D+1 · Atualização automática</p>
<h1 style="color:#ffffff;font-size:30px;margin:0 0 6px;font-weight:normal;font-family:Georgia,serif;">${closedPortal.title} encerrado</h1>
<p style="color:#D4AF37;font-size:15px;margin:0;font-style:italic;font-family:Georgia,serif;">portal.arianaborges.com já trocou de conteúdo ✨</p>
</td></tr>
<tr><td style="padding:40px;">
<p style="color:#f5e8c8;font-size:16px;line-height:1.7;margin:0 0 20px;font-family:Georgia,serif;">Olá, Henrique!</p>
<p style="color:#cfc4a8;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
O portal de ontem, <strong style="color:#fff;">${closedPortal.title} (${closedPortal.displayDate})</strong>, foi encerrado. A landing page <strong>portal.arianaborges.com</strong> já está exibindo automaticamente o conteúdo do próximo portal.
</p>
${nextSection}
<hr style="border:none;border-top:1px solid rgba(212,175,55,0.2);margin:32px 0;">
<p style="color:#cfc4a8;font-size:13px;line-height:1.7;margin:0 0 12px;font-family:Arial,sans-serif;">
<strong style="color:#D4AF37;">Sugestões de ação hoje:</strong>
</p>
<ul style="color:#cfc4a8;font-size:13px;line-height:1.8;padding-left:20px;margin:0 0 24px;font-family:Arial,sans-serif;">
<li>Revisar a landing pra confirmar visualmente que o conteúdo trocou</li>
<li>Stories anunciando o próximo portal pro engajamento</li>
<li>Pausar campanhas Meta Ads do portal anterior se houver</li>
<li>Iniciar conteúdo de aquecimento pro novo</li>
</ul>
<p style="color:#8a7d5e;font-size:12px;margin:24px 0 0;font-family:Arial,sans-serif;">
Site está em produção. Trigger manual em qualquer hora:<br>
<code style="color:#D4AF37;font-size:11px;">https://arianaborges.com/api/cron-portal-d1-email</code>
</p>
</td></tr>
<tr><td style="background:#0b0916;padding:20px 40px;text-align:center;border-top:1px solid rgba(212,175,55,0.1);">
<p style="color:#5a5440;font-size:11px;margin:0;font-family:Arial,sans-serif;">
E-mail automático · cron-portal-d1-email · arianaborges.com
</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

async function sendBrevoEmail(recipients: string[], subject: string, html: string) {
    const r = await fetch(BREVO_SMTP_API, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'api-key': env('BREVO_API_KEY'),
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: {
                name: env('REPORT_FROM_NAME', 'Ariana Borges | Suporte'),
                email: env('REPORT_FROM_EMAIL', 'nao-responda@arianaborges.com'),
            },
            to: recipients.map(email => ({ email })),
            subject,
            htmlContent: html,
        }),
    });
    if (!r.ok) throw new Error(`Brevo ${r.status}: ${await r.text()}`);
}

export default async function handler(req: any, res: any) {
    const cronSecret = env('CRON_SECRET');
    const auth = req.headers?.authorization || '';
    if (cronSecret && auth !== `Bearer ${cronSecret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const required = ['BREVO_API_KEY'];
    const missing = required.filter(k => !env(k));
    if (missing.length) {
        return res.status(500).json({ error: `Missing env: ${missing.join(', ')}` });
    }

    const yesterday = dateInTz(TZ, -1);
    const closed = findPortalForDate(yesterday);

    if (!closed) {
        return res.status(200).json({
            success: true,
            triggered: false,
            reason: `Yesterday (${yesterday}) was not a portal date — no email sent`,
        });
    }

    const next = findNextPortal(yesterday);
    const recipients = env('REPORT_TO_EMAIL', 'hdgpimentel@gmail.com')
        .split(',').map(s => s.trim()).filter(Boolean);
    const subject = `[Portal D+1] ${closed.title} encerrado — landing já trocou`;
    const html = buildEmailHtml(closed, next);

    try {
        await sendBrevoEmail(recipients, subject, html);
        return res.status(200).json({
            success: true,
            triggered: true,
            closed_portal: closed.id,
            next_portal: next?.id ?? '(loop pra 1/1 do próximo ano)',
            recipients,
        });
    } catch (e: any) {
        console.error('[cron-portal-d1-email]', e);
        return res.status(500).json({ success: false, error: e.message });
    }
}
