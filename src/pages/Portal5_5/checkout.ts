const INFINITEPAY_HANDLE = 'institutoarianaborges';

export const PORTAL_PRICE_BRL = 198;
export const PORTAL_PRICE_CENTS = PORTAL_PRICE_BRL * 100;
export const PORTAL_PRODUCT_NAME = 'Portal Mensal — Mesa de Salomão + Ativação da Kundalini AO VIVO';
export const PORTAL_REDIRECT_URL = 'https://portal.arianaborges.com/obrigado';

// Mesa de Salomão avulsa (só a gravação da Mesa, sem a Kundalini AO VIVO).
export const MESA_PRICE_BRL = 130;
export const MESA_PRICE_CENTS = MESA_PRICE_BRL * 100;
export const MESA_PRODUCT_NAME = 'Mesa de Salomão Coletiva (gravação)';

function buildCheckoutUrl(name: string, cents: number): string {
    const params = new URLSearchParams();
    params.set('items[0][name]', name);
    params.set('items[0][price]', String(cents));
    params.set('items[0][quantity]', '1');
    params.set('redirect_url', PORTAL_REDIRECT_URL);
    return `https://checkout.infinitepay.io/${INFINITEPAY_HANDLE}?${params.toString()}`;
}

export const buildInfinitePayCheckoutUrl = (): string => buildCheckoutUrl(PORTAL_PRODUCT_NAME, PORTAL_PRICE_CENTS);
export const buildMesaCheckoutUrl = (): string => buildCheckoutUrl(MESA_PRODUCT_NAME, MESA_PRICE_CENTS);
