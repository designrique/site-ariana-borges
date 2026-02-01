
interface Customer {
    name: string;
    email: string;
    phone_number: string;
}

interface PaymentItem {
    quantity: number;
    price: number; // Centavos
    description: string;
}

interface CreateLinkPayload {
    handle: string;
    items: PaymentItem[];
    customer: Customer;
    redirectUrl: string;
    webhookUrl: string;
}

interface CheckoutResponse {
    url: string;
}

interface PaymentStatusResponse {
    paid: boolean;
    amount?: number;
    paid_amount?: number;
    message?: string;
}

const N8N_PROXY_URL = 'https://webhook.digitalfisher.com.br/webhook/create_payment_link';
const N8N_CHECK_URL = 'https://webhook.digitalfisher.com.br/webhook/check_payment';

export const createCheckoutLink = async (payload: CreateLinkPayload): Promise<CheckoutResponse> => {
    try {
        const response = await fetch(N8N_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Erro ao gerar link de pagamento: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.url) {
            throw new Error('URL de checkout não retornada pela API.');
        }

        return data;
    } catch (error) {
        console.error('InfinityPay Service Error:', error);
        throw error;
    }
}


export const checkPaymentStatus = async (orderNsu: string, transactionNsu: string, slug: string): Promise<boolean> => {
    try {
        const response = await fetch(N8N_CHECK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_nsu: orderNsu,
                transaction_nsu: transactionNsu,
                slug: slug
            }),
        });

        if (!response.ok) {
            console.error('Payment check failed:', response.statusText);
            return false;
        }

        const data: PaymentStatusResponse = await response.json();
        return data.paid === true;

    } catch (error) {
        console.error('Error checking payment status:', error);
        return false;
    }
};
