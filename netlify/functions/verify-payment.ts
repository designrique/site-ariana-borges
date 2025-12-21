import { Handler, HandlerEvent } from "@netlify/functions";

const INFINITEPAY_VERIFY_URL = "https://api.infinitepay.io/invoices/public/checkout/payment_check";
const HANDLE = "institutoarianaborges";

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const { order_nsu, transaction_nsu, slug } = JSON.parse(event.body || "{}");

        if (!order_nsu || !transaction_nsu || !slug) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required parameters" }),
            };
        }

        const payload = {
            handle: HANDLE,
            order_nsu,
            transaction_nsu,
            slug
        };

        const response = await fetch(INFINITEPAY_VERIFY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("InfinitePay verification error:", errorText);
            throw new Error(`Failed to verify payment: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error in verify-payment function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
