import { Handler, HandlerEvent } from "@netlify/functions";
import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || "1414964383316703";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

const hashData = (data: string) => {
    return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

const buildHashedArray = (value?: string) => {
    if (!value) {
        return [];
    }

    return [hashData(value)];
};

const handler: Handler = async (event: HandlerEvent) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const {
            email,
            phone,
            value,
            currency,
            event_name = "Purchase",
            event_id,
            event_source_url,
            custom_data = {},
            user_data = {},
        } = body;

        if (!ACCESS_TOKEN) {
            console.error("META_ACCESS_TOKEN not set");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Configuration Error: META_ACCESS_TOKEN is missing" }),
            };
        }

        const eventTime = Math.floor(Date.now() / 1000);
        const normalizedUserData = {
            em: buildHashedArray(user_data.email || email),
            ph: buildHashedArray(user_data.phone || phone),
            fbp: user_data.fbp,
            fbc: user_data.fbc,
            client_user_agent: user_data.client_user_agent,
        };

        const filteredUserData = Object.fromEntries(
            Object.entries(normalizedUserData).filter(([, fieldValue]) => {
                if (Array.isArray(fieldValue)) {
                    return fieldValue.length > 0;
                }

                return typeof fieldValue === 'string' && fieldValue.length > 0;
            }),
        );

        const mergedCustomData = Object.fromEntries(
            Object.entries({
                currency: currency || custom_data.currency || "BRL",
                value: value ?? custom_data.value,
                content_name: custom_data.content_name,
                content_category: custom_data.content_category,
                content_ids: custom_data.content_ids,
                source: custom_data.source,
            }).filter(([, fieldValue]) => fieldValue !== undefined),
        );

        const capiPayload = {
            data: [
                {
                    event_name: event_name,
                    event_time: eventTime,
                    action_source: "website",
                    ...(event_id ? { event_id } : {}),
                    ...(event_source_url ? { event_source_url } : {}),
                    user_data: filteredUserData,
                    attribution_data: {
                        attribution_share: "1.0"
                    },
                    custom_data: mergedCustomData,
                    original_event_data: {
                        event_name: event_name,
                        event_time: eventTime
                    }
                }
            ]
        };

        const response = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(capiPayload),
        });

        const result = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error("Error in meta-capi function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};

export { handler };
