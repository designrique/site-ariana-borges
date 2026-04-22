import { Handler, HandlerEvent } from "@netlify/functions";
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || "1414964383316703";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

const hashData = (data: string) => {
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

const getFirstString = (...values: Array<unknown>): string | undefined => {
    for (const value of values) {
        if (typeof value === 'string' && value.trim().length > 0) {
            return value;
        }
    }

    return undefined;
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const data = JSON.parse(event.body || "{}");
        console.log("Received webhook from InfinitePay:", JSON.stringify(data, null, 2));

        // InfinitePay typically sends a 'paid' boolean or status
        // Adjust this condition based on the actual InfinitePay webhook payload
        if (data.status === 'approved' || data.paid === true) {
            console.log("Payment confirmed. Sending Meta CAPI event...");

            if (ACCESS_TOKEN) {
                const email = data.customer?.email || "";
                const phone = data.customer?.phone_number || "";
                const value = data.amount ? data.amount / 100 : 555.00;
                const orderNsu = getFirstString(data.order_nsu, data.orderNsu, data.invoice?.order_nsu, data.invoice?.orderNsu);
                const transactionNsu = getFirstString(
                    data.transaction_nsu,
                    data.transactionNsu,
                    data.transaction?.nsu,
                    data.payment?.transaction_nsu,
                );
                const eventId = orderNsu && transactionNsu
                    ? `clube-purchase-${orderNsu}-${transactionNsu}`
                    : orderNsu
                        ? `clube-purchase-${orderNsu}`
                        : transactionNsu
                            ? `clube-purchase-${transactionNsu}`
                            : undefined;

                const eventTime = Math.floor(Date.now() / 1000);
                const capiPayload = {
                    data: [
                        {
                            event_name: "Purchase",
                            event_time: eventTime,
                            action_source: "website",
                            ...(eventId ? { event_id: eventId } : {}),
                            event_source_url: "https://clubelivromulhermaravilha.arianaborges.com/obrigado",
                            user_data: {
                                em: email ? [hashData(email)] : [],
                                ph: phone ? [hashData(phone)] : []
                            },
                            attribution_data: {
                                attribution_share: "1.0"
                            },
                            custom_data: {
                                currency: "BRL",
                                value: value.toString(),
                                content_name: "Clube do Livro - A Psicologia da Mulher-Maravilha",
                                content_category: "book_club",
                                source: "webhook_infinitepay"
                            },
                            original_event_data: {
                                event_name: "Purchase",
                                event_time: eventTime
                            }
                        }
                    ]
                };

                const metaResponse = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(capiPayload)
                });

                const metaResult = await metaResponse.json();
                console.log("Meta CAPI Response:", JSON.stringify(metaResult));
            } else {
                console.warn("META_ACCESS_TOKEN not set. Skipping CAPI.");
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Webhook processed" }),
        };
    } catch (error) {
        console.error("Error in webhook-infinitepay function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
