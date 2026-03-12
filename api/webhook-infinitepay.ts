import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '1414964383316703';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/EAEoS3N7tCWKMO81NY9Uv8';

const hashData = (data: string) =>
    crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');

const buildEmailHtml = (firstName: string): string => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pagamento Confirmado</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;">
          <tr>
            <td style="background:#1a1a2e;padding:40px 40px 32px;text-align:center;">
              <p style="color:#c9a227;font-size:13px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;font-family:Arial,sans-serif;">Instituto Ariana Borges</p>
              <h1 style="color:#ffffff;font-size:26px;margin:0;font-weight:normal;">Pagamento confirmado ✨</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="color:#333333;font-size:17px;line-height:1.7;margin:0 0 20px;font-family:Georgia,serif;">Olá, <strong>${firstName}</strong>!</p>
              <p style="color:#555555;font-size:16px;line-height:1.7;margin:0 0 20px;font-family:Arial,sans-serif;">
                Seu pagamento para o <strong>Clube do Livro — A Psicologia da Mulher&#8209;Maravilha</strong> foi confirmado com sucesso.
              </p>
              <p style="color:#555555;font-size:16px;line-height:1.7;margin:0 0 32px;font-family:Arial,sans-serif;">
                Clique no botão abaixo para entrar no grupo do WhatsApp e garantir o seu lugar:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="background:#c9a227;border-radius:10px;padding:16px 32px;text-align:center;">
                    <a href="${WHATSAPP_GROUP_LINK}" style="color:#1a1a2e;font-size:16px;font-weight:bold;text-decoration:none;display:block;font-family:Arial,sans-serif;">
                      👉 Entrar no grupo do WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0 0 8px;font-family:Arial,sans-serif;">
                Caso o botão não funcione, copie e cole o link abaixo no seu navegador:
              </p>
              <p style="color:#c9a227;font-size:13px;word-break:break-all;margin:0 0 32px;font-family:Arial,sans-serif;">
                ${WHATSAPP_GROUP_LINK}
              </p>
              <hr style="border:none;border-top:1px solid #eeeeee;margin:0 0 32px;">
              <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 4px;font-family:Georgia,serif;">Com amor e gratidão,</p>
              <p style="color:#333333;font-size:16px;font-weight:bold;margin:0;font-family:Georgia,serif;">Ariana Borges</p>
              <p style="color:#999999;font-size:13px;margin:4px 0 0;font-family:Arial,sans-serif;">Instituto Ariana Borges</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f0eb;padding:24px 40px;text-align:center;">
              <p style="color:#bbbbbb;font-size:12px;margin:0;font-family:Arial,sans-serif;">
                Este email foi enviado automaticamente após a confirmação do seu pagamento.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        console.log('Received webhook from InfinitePay:', JSON.stringify(data, null, 2));

        if (data.status === 'approved' || data.paid === true) {
            console.log('Payment confirmed. Processing...');

            const email = data.customer?.email || '';
            const phone = data.customer?.phone_number || '';
            const name = data.customer?.name || 'cliente';
            const value = data.amount ? data.amount / 100 : 298.00;

            // Meta CAPI
            if (META_ACCESS_TOKEN) {
                const eventTime = Math.floor(Date.now() / 1000);
                const capiPayload = {
                    data: [{
                        event_name: 'Purchase',
                        event_time: eventTime,
                        action_source: 'website',
                        user_data: {
                            em: email ? [hashData(email)] : [],
                            ph: phone ? [hashData(phone)] : [null],
                        },
                        attribution_data: { attribution_share: '1.0' },
                        custom_data: { currency: 'BRL', value: value.toString() },
                        original_event_data: { event_name: 'Purchase', event_time: eventTime },
                    }],
                };

                const metaResponse = await fetch(
                    `https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
                    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(capiPayload) }
                );
                console.log('Meta CAPI Response:', JSON.stringify(await metaResponse.json()));
            } else {
                console.warn('META_ACCESS_TOKEN not set. Skipping Meta CAPI.');
            }

            // Brevo email
            if (BREVO_API_KEY && email) {
                const firstName = name.split(' ')[0];
                const emailPayload = {
                    sender: { name: 'Instituto Ariana Borges', email: 'contato@arianaborges.com' },
                    to: [{ email, name }],
                    subject: 'Pagamento confirmado — Clube do Livro Mulher Maravilha ✨',
                    htmlContent: buildEmailHtml(firstName),
                };

                const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
                    body: JSON.stringify(emailPayload),
                });
                console.log('Brevo Response:', JSON.stringify(await brevoResponse.json()));
            } else {
                console.warn('BREVO_API_KEY not set or customer email missing. Skipping email.');
            }
        }

        return res.status(200).json({ success: true, message: 'Webhook processed' });
    } catch (error) {
        console.error('Error in webhook-infinitepay:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
