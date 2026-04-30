const INFINITEPAY_HANDLE = 'institutoarianaborges';

export const PORTAL_PRICE_BRL = 198;
export const PORTAL_PRICE_CENTS = PORTAL_PRICE_BRL * 100;
export const PORTAL_PRODUCT_NAME = 'Portal 5/5 — Mesa de Salomão + Ativação da Kundalini';
export const PORTAL_REDIRECT_URL = 'https://portal.arianaborges.com/obrigado';

export function buildInfinitePayCheckoutUrl(): string {
    const params = new URLSearchParams();
    params.set('items[0][name]', PORTAL_PRODUCT_NAME);
    params.set('items[0][price]', String(PORTAL_PRICE_CENTS));
    params.set('items[0][quantity]', '1');
    params.set('redirect_url', PORTAL_REDIRECT_URL);
    return `https://checkout.infinitepay.io/${INFINITEPAY_HANDLE}?${params.toString()}`;
}
