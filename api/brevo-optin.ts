const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';
const BREVO_LIST_ID = 3;

async function saveBrevoContact(name: string, email: string, phone: string, source: string, apiKey: string) {
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
                SMS: phone || '',
                SOURCE: source || 'whatsapp-button',
            },
            listIds: [BREVO_LIST_ID],
            updateEnabled: true,
        }),
    });

    const data = await response.json().catch(() => ({}));
    if (response.status === 400 && data.code === 'duplicate_parameter') return;
    if (!response.ok) console.error('[brevo-optin] API error:', response.status, data);
}

async function saveBotLead(name: string, email: string, phone: string, source: string) {
    const botUrl = process.env.BOT_API_URL;
    const botKey = process.env.PREFILL_API_KEY;
    if (!botUrl || !phone) return;

    await fetch(`${botUrl}/api/v1/leads/prefill`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': botKey || '',
        },
        body: JSON.stringify({ name, email, phone, source }),
    });
}

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
        const { name, email, phone = '', source } = body;

        if (!name || !email) {
            return res.status(400).json({ error: 'name and email are required' });
        }

        // Dispara em paralelo — nunca bloqueia o redirect do WhatsApp
        await Promise.allSettled([
            saveBrevoContact(name, email, phone, source, apiKey),
            saveBotLead(name, email, phone, source),
        ]);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('[brevo-optin] Unexpected error:', error);
        return res.status(200).json({ success: false, warning: 'Internal error' });
    }
}
