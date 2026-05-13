import crypto from 'crypto';

const INFINITEPAY_VERIFY_URL = 'https://api.infinitepay.io/invoices/public/checkout/payment_check';
const HANDLE = 'institutoarianaborges';
const PIXEL_ID = process.env.META_PIXEL_ID || '1414964383316703';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const DNA_PRODUCT_NAME = 'DNA Basico - ThetaHealing';
const DNA_PRODUCT_CATEGORY = 'thetahealing_basico';
const DNA_FALLBACK_VALUE = 1298.00;

const hashData = (s: string) =>
    crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

const buildDnaEmailHtml = (firstName: string): string => `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>DNA Básico — Pagamento Confirmado</title></head>
<body style="margin:0;padding:0;background-color:#0b0916;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0916;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#12102b;border-radius:16px;overflow:hidden;max-width:600px;width:100%;border:1px solid rgba(212,175,55,0.3);">
        <tr>
          <td style="background:linear-gradient(135deg,#12102b,#0b0916);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.3);">
            <p style="color:#D4AF37;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 14px;font-family:Arial,sans-serif;">15 · 16 · 17 de Maio · Recife</p>
            <h1 style="color:#ffffff;font-size:30px;margin:0 0 6px;font-weight:normal;font-family:Georgia,serif;">DNA Básico ThetaHealing®</h1>
            <p style="color:#D4AF37;font-size:15px;margin:0;font-style:italic;font-family:Georgia,serif;">Pagamento confirmado ✨</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#f5e8c8;font-size:18px;line-height:1.7;margin:0 0 20px;font-family:Georgia,serif;">Olá, <strong>${firstName}</strong>!</p>
            <p style="color:#cfc4a8;font-size:16px;line-height:1.7;margin:0 0 20px;font-family:Arial,sans-serif;">
              Sua vaga na imersão <strong>DNA Básico ThetaHealing®</strong> está garantida. Em 3 dias presenciais você recebe a técnica completa e o certificado internacional.
            </p>
            <hr style="border:none;border-top:1px solid rgba(212,175,55,0.15);margin:28px 0;">
            <p style="color:#D4AF37;font-size:14px;font-weight:bold;margin:0 0 12px;font-family:Arial,sans-serif;letter-spacing:1px;">DETALHES DA TURMA</p>
            <p style="color:#cfc4a8;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
              <strong style="color:#fff;">Datas:</strong> 15, 16 e 17 de Maio de 2026<br>
              <strong style="color:#fff;">Local:</strong> Recife — Pernambuco<br>
              <strong style="color:#fff;">Carga horária:</strong> 3 dias de imersão presencial
            </p>
            <p style="color:#D4AF37;font-size:14px;font-weight:bold;margin:0 0 12px;font-family:Arial,sans-serif;letter-spacing:1px;">PRÓXIMOS PASSOS</p>
            <ol style="color:#cfc4a8;font-size:14px;line-height:1.8;margin:0 0 28px;padding-left:20px;font-family:Arial,sans-serif;">
              <li>Bloqueie a agenda: 15, 16 e 17 de Maio</li>
              <li>Em breve você receberá o link do grupo exclusivo no WhatsApp com endereço completo, horários e o que levar</li>
              <li>Qualquer dúvida, fale com a equipe pelo WhatsApp</li>
            </ol>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
              <tr>
                <td style="background:#25D366;border-radius:999px;padding:16px 36px;text-align:center;">
                  <a href="https://wa.me/551153041409?text=Acabei%20de%20me%20inscrever%20no%20DNA%20B%C3%A1sico%21"
                     style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;display:block;font-family:Arial,sans-serif;">
                    Falar com a equipe pelo WhatsApp
                  </a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid rgba(212,175,55,0.15);margin:28px 0 20px;">
            <p style="color:#cfc4a8;font-size:14px;line-height:1.7;margin:0 0 4px;font-family:Georgia,serif;font-style:italic;">Com gratidão,</p>
            <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0;font-family:Georgia,serif;">Ariana Borges</p>
            <p style="color:#8a7d5e;font-size:12px;margin:4px 0 0;font-family:Arial,sans-serif;">Instrutora Master & Science · ThetaHealing®</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0b0916;padding:20px 40px;text-align:center;border-top:1px solid rgba(212,175,55,0.1);">
            <p style="color:#5a5440;font-size:11px;margin:0;font-family:Arial,sans-serif;">
              E-mail enviado automaticamente após confirmação do pagamento.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { order_nsu, transaction_nsu, slug } = body;

        if (!order_nsu || !transaction_nsu || !slug) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Modo TESTE: dispara CAPI com test_event_code (aparece em Test Events do
        // Meta Events Manager sem afetar campanha real). Bypass InfinityPay verify
        // e usa dados sinteticos. Trigger via query ?test_event_code=XXX
        const url = new URL(req.url || '', 'http://x');
        const testEventCode = url.searchParams.get('test_event_code') || body.test_event_code || '';
        const testEmail = url.searchParams.get('test_email') || body.test_email || 'hdgpimentel@gmail.com';
        const isTest = !!testEventCode;

        let paid: boolean;
        let paidAmount: number | null;
        let email: string;
        let phone: string;
        let name: string;

        if (isTest) {
            console.log('[dna-basico-confirm] TEST MODE — code:', testEventCode);
            paid = true;
            paidAmount = 129800;
            email = testEmail;
            phone = '5511993050033';
            name = 'Teste Test Events';
        } else {
            // Verifica com InfinityPay
            const verifyResp = await fetch(INFINITEPAY_VERIFY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handle: HANDLE, order_nsu, transaction_nsu, slug }),
            });
            const verifyData = await verifyResp.json();
            if (!verifyResp.ok) {
                console.error('InfinitePay verify error:', verifyData);
                return res.status(502).json({ error: 'Verification failed', details: verifyData });
            }
            paid = !!verifyData.paid;
            paidAmount = typeof verifyData.paid_amount === 'number' ? verifyData.paid_amount : null;
            const customer = verifyData.customer || {};
            email = customer.email || verifyData.email || '';
            phone = customer.phone_number || customer.phone || verifyData.phone || '';
            name = customer.name || verifyData.name || 'cliente';
        }

        const result: any = { paid, paid_amount: paidAmount, capi_sent: false, email_sent: false, test_mode: isTest };

        if (!paid) {
            return res.status(200).json(result);
        }

        const value = paidAmount ? paidAmount / 100 : DNA_FALLBACK_VALUE;
        const eventId = `dna-basico-purchase-${order_nsu}-${transaction_nsu}`;
        const eventTime = Math.floor(Date.now() / 1000);

        // 1) CAPI Purchase (server-side com event_id pra dedup com browser)
        if (META_ACCESS_TOKEN) {
            const capiPayload: any = {
                data: [{
                    event_name: 'Purchase',
                    event_time: eventTime,
                    action_source: 'website',
                    event_id: eventId,
                    event_source_url: 'https://dnabasico.arianaborges.com/obrigado',
                    user_data: {
                        em: email ? [hashData(email)] : [],
                        ph: phone ? [hashData(phone)] : [],
                    },
                    attribution_data: { attribution_share: '1.0' },
                    custom_data: {
                        currency: 'BRL',
                        value: value.toString(),
                        content_name: DNA_PRODUCT_NAME,
                        content_category: DNA_PRODUCT_CATEGORY,
                        source: isTest ? 'test_event_capi' : 'thankyou_page_confirm',
                    },
                    original_event_data: { event_name: 'Purchase', event_time: eventTime },
                }],
            };
            if (testEventCode) {
                capiPayload.test_event_code = testEventCode;
            }

            const capiResp = await fetch(
                `https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(capiPayload) }
            );
            const capiData = await capiResp.json();
            console.log('[dna-basico-confirm] CAPI:', JSON.stringify(capiData));
            result.capi_sent = capiResp.ok && (capiData.events_received || 0) > 0;
        }

        // 2) Brevo email
        if (BREVO_API_KEY && email) {
            const firstName = String(name).split(' ')[0];
            const brevoResp = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
                body: JSON.stringify({
                    sender: {
                        name: process.env.REPORT_FROM_NAME || 'Ariana Borges | Suporte',
                        email: process.env.REPORT_FROM_EMAIL || 'nao-responda@arianaborges.com',
                    },
                    to: [{ email, name }],
                    subject: 'DNA Básico ThetaHealing — Pagamento confirmado ✨',
                    htmlContent: buildDnaEmailHtml(firstName),
                }),
            });
            const brevoData = await brevoResp.json();
            console.log('[dna-basico-confirm] Brevo:', JSON.stringify(brevoData));
            result.email_sent = brevoResp.ok;
            result.email_to = email;
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('[dna-basico-confirm] Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
