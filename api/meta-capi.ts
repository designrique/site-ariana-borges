import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '1414964383316703';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

const hashData = (data: string) =>
    crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');

const buildHashedArray = (value?: string) => {
    if (!value) return [];
    return [hashData(value)];
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const {
            email,
            phone,
            value,
            currency,
            event_name = 'Purchase',
            event_id,
            event_source_url,
            custom_data = {},
            user_data = {},
        } = body;

        if (!ACCESS_TOKEN) {
            return res.status(500).json({ error: 'META_ACCESS_TOKEN not configured' });
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
            Object.entries(normalizedUserData).filter(([, v]) =>
                Array.isArray(v) ? v.length > 0 : typeof v === 'string' && v.length > 0
            )
        );

        const mergedCustomData = Object.fromEntries(
            Object.entries({
                currency: currency || custom_data.currency || 'BRL',
                value: value ?? custom_data.value,
                content_name: custom_data.content_name,
                content_category: custom_data.content_category,
                content_ids: custom_data.content_ids,
                source: custom_data.source,
            }).filter(([, v]) => v !== undefined)
        );

        const capiPayload = {
            data: [{
                event_name,
                event_time: eventTime,
                action_source: 'website',
                ...(event_id ? { event_id } : {}),
                ...(event_source_url ? { event_source_url } : {}),
                user_data: filteredUserData,
                attribution_data: { attribution_share: '1.0' },
                custom_data: mergedCustomData,
                original_event_data: { event_name, event_time: eventTime },
            }],
        };

        const response = await fetch(
            `https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(capiPayload) }
        );

        return res.status(200).json(await response.json());
    } catch (error) {
        console.error('Error in meta-capi:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
