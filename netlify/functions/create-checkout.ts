import { Handler, HandlerEvent } from "@netlify/functions";

const INFINITEPAY_API_URL = "https://api.infinitepay.io/invoices/public/checkout/links";
const HANDLE = "institutoarianaborges";

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const { customer } = JSON.parse(event.body || "{}");
        const orderNsu = Math.floor(Date.now() / 1000).toString();

        const payload = {
            handle: HANDLE,
            order_nsu: orderNsu,
            redirect_url: "https://mesa-salomao.netlify.app/obrigado",
            webhook_url: "https://mesa-salomao.netlify.app/webhook-infinitepay",
            items: [
                {
                    quantity: 1,
                    price: 55500,
                    description: "Mesa de Salomão - Abra seus Caminhos em 21 Dias"
                }
            ],
            customer: customer || {}
        };

        const response = await fetch(INFINITEPAY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("InfinitePay API error:", errorText);
            throw new Error(`Failed to create checkout link: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("InfinitePay API Response:", JSON.stringify(data));

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...data,
                checkout_url: data.url || data.checkout_url
            }),
        };
    } catch (error) {
        console.error("Error in create-checkout function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
