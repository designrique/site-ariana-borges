import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '1414964383316703';
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/EAEoS3N7tCWKMO81NY9Uv8';
const PORTAL_5_5_WHATSAPP_LINK = 'https://chat.whatsapp.com/CMeZf3iVA0QHWHlmBOBBNz';
const PORTAL_5_5_AMOUNT_CENTS = 19800;
// DNA Basico: R$ 1.298 cheio. Tickets >= R$1000 sao tratados como DNA Basico
// (cobre cupom ALBANY com desconto eventual mantendo o produto correto).
const DNA_BASICO_THRESHOLD_CENTS = 100000;
const DNA_BASICO_FULL_PRICE_CENTS = 129800;

const buildPortal5_5EmailHtml = (firstName: string): string => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal 5/5 — Pagamento Confirmado</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0420;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0420;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a0d33;border-radius:16px;overflow:hidden;max-width:600px;width:100%;border:1px solid rgba(212,175,55,0.3);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a0d33,#0a0420);padding:40px 40px 32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.2);">
            <p style="color:#D4AF37;font-size:12px;letter-spacing:4px;text-transform:uppercase;margin:0 0 14px;font-family:Arial,sans-serif;">5 de Maio · 20h · Online</p>
            <h1 style="color:#ffffff;font-size:30px;margin:0 0 6px;font-weight:normal;font-family:Georgia,serif;">Portal 5/5</h1>
            <p style="color:#D4AF37;font-size:15px;margin:0;font-style:italic;font-family:Georgia,serif;">Pagamento confirmado ✨</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#f5e8c8;font-size:18px;line-height:1.7;margin:0 0 20px;font-family:Georgia,serif;">Olá, <strong>${firstName}</strong>!</p>
            <p style="color:#cfc4a8;font-size:16px;line-height:1.7;margin:0 0 20px;font-family:Arial,sans-serif;">
              Sua entrada na <strong>Mesa de Salomão Coletiva + Ativação da Kundalini</strong> está garantida.
            </p>
            <p style="color:#cfc4a8;font-size:16px;line-height:1.7;margin:0 0 32px;font-family:Arial,sans-serif;">
              Acesse o grupo exclusivo no botão abaixo — todos os detalhes do encontro chegarão lá:
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
              <tr>
                <td style="background:#25D366;border-radius:999px;padding:16px 36px;text-align:center;">
                  <a href="${PORTAL_5_5_WHATSAPP_LINK}" style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;display:block;font-family:Arial,sans-serif;">
                    Entrar no grupo do WhatsApp
                  </a>
                </td>
              </tr>
            </table>
            <p style="color:#8a7d5e;font-size:13px;line-height:1.6;margin:0 0 8px;font-family:Arial,sans-serif;">
              Caso o botão não funcione, copie e cole o link abaixo no seu navegador:
            </p>
            <p style="color:#D4AF37;font-size:13px;word-break:break-all;margin:0 0 32px;font-family:Arial,sans-serif;">
              ${PORTAL_5_5_WHATSAPP_LINK}
            </p>
            <hr style="border:none;border-top:1px solid rgba(212,175,55,0.15);margin:0 0 24px;">
            <p style="color:#cfc4a8;font-size:14px;line-height:1.7;margin:0 0 6px;font-family:Arial,sans-serif;"><strong style="color:#D4AF37;">Próximos passos:</strong></p>
            <ol style="color:#cfc4a8;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;font-family:Arial,sans-serif;">
              <li>Entre no grupo agora pelo botão acima</li>
              <li>Marque na agenda: <strong>5 de Maio às 20h</strong></li>
              <li>O link de transmissão será enviado no grupo no dia</li>
            </ol>
            <p style="color:#cfc4a8;font-size:14px;line-height:1.7;margin:0 0 4px;font-family:Georgia,serif;font-style:italic;">Com presença,</p>
            <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0;font-family:Georgia,serif;">Ariana Borges</p>
            <p style="color:#8a7d5e;font-size:12px;margin:4px 0 0;font-family:Arial,sans-serif;">Instituto Ariana Borges</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0a0420;padding:20px 40px;text-align:center;border-top:1px solid rgba(212,175,55,0.1);">
            <p style="color:#5a5440;font-size:11px;margin:0;font-family:Arial,sans-serif;">
              Este e-mail foi enviado automaticamente após a confirmação do seu pagamento.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const hashData = (data: string) =>
    crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');

const getFirstString = (...values: Array<unknown>): string | undefined => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

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

        // BLOQUEIO TESTE: payloads com order_nsu/transaction_nsu prefixados "TEST"
        // ou flag explicita _test=true nao disparam Purchase real (evita poluir Pixel).
        const isTestPayload = data._test === true
            || (typeof data.order_nsu === 'string' && data.order_nsu.toUpperCase().startsWith('TEST'))
            || (typeof data.transaction_nsu === 'string' && data.transaction_nsu.toUpperCase().startsWith('TEST'));
        if (isTestPayload) {
            console.warn('[webhook-infinitepay] TEST payload detected — skipping CAPI Purchase + email');
            return res.status(200).json({ success: true, test_mode: true, skipped: 'CAPI + email' });
        }

        if (data.status === 'approved' || data.paid === true) {
            console.log('Payment confirmed. Processing...');

            const email = data.customer?.email || '';
            const phone = data.customer?.phone_number || '';
            const name = data.customer?.name || 'cliente';
            const amountCents = typeof data.amount === 'number' ? data.amount : 0;
            const isPortal5_5 = amountCents === PORTAL_5_5_AMOUNT_CENTS;
            const isDnaBasico = !isPortal5_5 && amountCents >= DNA_BASICO_THRESHOLD_CENTS;
            const value = amountCents
                ? amountCents / 100
                : isPortal5_5 ? 198.00 : isDnaBasico ? 1298.00 : 298.00;
          const orderNsu = getFirstString(data.order_nsu, data.orderNsu, data.invoice?.order_nsu, data.invoice?.orderNsu);
          const transactionNsu = getFirstString(
            data.transaction_nsu,
            data.transactionNsu,
            data.transaction?.nsu,
            data.payment?.transaction_nsu,
          );
          const eventPrefix = isPortal5_5
            ? 'portal-5-5-purchase'
            : isDnaBasico
              ? 'dna-basico-purchase'
              : 'clube-purchase';
          const eventId = orderNsu && transactionNsu
            ? `${eventPrefix}-${orderNsu}-${transactionNsu}`
            : orderNsu
              ? `${eventPrefix}-${orderNsu}`
              : transactionNsu
                ? `${eventPrefix}-${transactionNsu}`
                : undefined;

            // Meta CAPI
            if (META_ACCESS_TOKEN) {
                const eventTime = Math.floor(Date.now() / 1000);
                const capiPayload = {
                    data: [{
                        event_name: 'Purchase',
                        event_time: eventTime,
                        action_source: 'website',
                ...(eventId ? { event_id: eventId } : {}),
                event_source_url: isPortal5_5
                  ? 'https://portal.arianaborges.com/obrigado'
                  : isDnaBasico
                    ? 'https://dnabasico.arianaborges.com/obrigado'
                    : 'https://clubelivromulhermaravilha.arianaborges.com/obrigado',
                        user_data: {
                            em: email ? [hashData(email)] : [],
                  ph: phone ? [hashData(phone)] : [],
                        },
                        attribution_data: { attribution_share: '1.0' },
                custom_data: {
                  currency: 'BRL',
                  value: value.toString(),
                  content_name: isPortal5_5
                    ? 'Portal 5/5 - Mesa de Salomao + Kundalini'
                    : isDnaBasico
                      ? 'DNA Basico - ThetaHealing'
                      : 'Clube do Livro - A Psicologia da Mulher-Maravilha',
                  content_category: isPortal5_5
                    ? 'energy_portal'
                    : isDnaBasico
                      ? 'thetahealing_basico'
                      : 'book_club',
                  source: 'webhook_infinitepay',
                },
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
                    subject: isPortal5_5
                        ? 'Pagamento confirmado — Portal 5/5 ✨'
                        : 'Pagamento confirmado — Clube do Livro Mulher Maravilha ✨',
                    htmlContent: isPortal5_5
                        ? buildPortal5_5EmailHtml(firstName)
                        : buildEmailHtml(firstName),
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
