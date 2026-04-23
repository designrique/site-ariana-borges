const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';
const BREVO_LIST_ID = 3;

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Brevo API key not configured' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email, source } = body;

        if (!name || !email) {
            return res.status(400).json({ error: 'name and email are required' });
        }

        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                email,
                attributes: {
                    FIRSTNAME: firstName,
                    LASTNAME: lastName,
                    SOURCE: source || 'whatsapp-button',
                },
                listIds: [BREVO_LIST_ID],
                updateEnabled: true,
            }),
        });

        if (response.status === 204 || response.status === 201 || response.status === 200) {
            return res.status(200).json({ success: true });
        }

        const data = await response.json().catch(() => ({}));

        // Contact already exists — treat as success
        if (response.status === 400 && data.code === 'duplicate_parameter') {
            return res.status(200).json({ success: true });
        }

        console.error('[brevo-optin] API error:', response.status, data);
        return res.status(200).json({ success: false, warning: 'Could not save contact' });
    } catch (error) {
        console.error('[brevo-optin] Unexpected error:', error);
        // Never block the WhatsApp redirect — return 200 with warning
        return res.status(200).json({ success: false, warning: 'Internal error' });
    }
}
