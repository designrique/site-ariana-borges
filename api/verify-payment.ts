const INFINITEPAY_VERIFY_URL = 'https://api.infinitepay.io/invoices/public/checkout/payment_check';
const HANDLE = 'institutoarianaborges';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { order_nsu, transaction_nsu, slug } = body;

        if (!order_nsu || !transaction_nsu || !slug) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const response = await fetch(INFINITEPAY_VERIFY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle: HANDLE, order_nsu, transaction_nsu, slug }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('InfinitePay verification error:', errorText);
            throw new Error(`Failed to verify payment: ${response.statusText}`);
        }

        return res.status(200).json(await response.json());
    } catch (error) {
        console.error('Error in verify-payment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
