import { Handler, HandlerEvent } from "@netlify/functions";

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

        // Logic to process the payment confirmation
        // For example, if data.paid is true, we know the payment was successful

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Webhook received" }),
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
