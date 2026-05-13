const INFINITEPAY_API_URL = 'https://api.infinitepay.io/invoices/public/checkout/links';
const HANDLE = 'institutoarianaborges';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { items, customer, redirectUrl, webhookUrl, order_nsu } = body;

        const payload = {
            handle: HANDLE,
            order_nsu: order_nsu || Math.floor(Date.now() / 1000).toString(),
            redirect_url: redirectUrl,
            webhook_url: webhookUrl,
            items: items || [],
            customer: customer || {},
        };

        const response = await fetch(INFINITEPAY_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('InfinitePay API error:', errorText);
            throw new Error(`Failed to create checkout link: ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json({ ...data, checkout_url: data.url || data.checkout_url });
    } catch (error) {
        console.error('Error in create-checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
