declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

type MetaEventName = 'ViewContent' | 'Lead' | 'InitiateCheckout' | 'Purchase';

type MetaServerEventPayload = {
    eventName: MetaEventName;
    eventId?: string;
    customData?: Record<string, string | number | boolean>;
    userData?: {
        email?: string;
        phone?: string;
        fbp?: string;
        fbc?: string;
        client_user_agent?: string;
    };
};

const CLUB_PRODUCT_NAME = 'Clube do Livro - A Psicologia da Mulher-Maravilha';
const CLUB_PRODUCT_VALUE = 298;
const CLUB_PRODUCT_CATEGORY = 'book_club';
const LEAD_SESSION_KEY = 'clube-livro-lead-tracked';
const PURCHASE_SESSION_PREFIX = 'clube-livro-purchase-tracked';

const defaultCustomData = (source: string): Record<string, string | number | boolean> => ({
    currency: 'BRL',
    value: CLUB_PRODUCT_VALUE,
    content_name: CLUB_PRODUCT_NAME,
    content_category: CLUB_PRODUCT_CATEGORY,
    source,
});

const createEventId = (prefix: string): string => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return `${prefix}-${crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const hasBrowserPixel = (): boolean => typeof window !== 'undefined' && typeof window.fbq === 'function';

export const buildClubePurchaseEventId = (
    orderNsu?: string | null,
    transactionNsu?: string | null,
): string | undefined => {
    if (orderNsu && transactionNsu) {
        return `clube-purchase-${orderNsu}-${transactionNsu}`;
    }

    if (orderNsu) {
        return `clube-purchase-${orderNsu}`;
    }

    if (transactionNsu) {
        return `clube-purchase-${transactionNsu}`;
    }

    return undefined;
};

export const trackBrowserMetaEvent = (
    eventName: MetaEventName,
    customData: Record<string, string | number | boolean>,
    eventId?: string,
): void => {
    if (!hasBrowserPixel()) {
        return;
    }

    if (eventId) {
        window.fbq?.('track', eventName, customData, { eventID: eventId });
        return;
    }

    window.fbq?.('track', eventName, customData);
};

export const postMetaServerEvent = async ({
    eventName,
    eventId,
    customData,
    userData,
}: MetaServerEventPayload): Promise<boolean> => {
    try {
        const response = await fetch('/api/meta-capi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            keepalive: true,
            body: JSON.stringify({
                event_name: eventName,
                event_id: eventId,
                event_source_url: window.location.href,
                custom_data: customData,
                user_data: userData,
            }),
        });

        return response.ok;
    } catch (error) {
        console.error('Meta server event failed:', error);
        return false;
    }
};

export const trackClubeViewContent = (): void => {
    const eventId = createEventId('clube-view-content');
    const customData = defaultCustomData('landing_view');

    trackBrowserMetaEvent('ViewContent', customData, eventId);
    void postMetaServerEvent({
        eventName: 'ViewContent',
        eventId,
        customData,
    });
};

export const trackClubeLead = (source: string): void => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(LEAD_SESSION_KEY) === '1') {
        return;
    }

    const eventId = createEventId('clube-lead');
    const customData = defaultCustomData(source);
    const browserEventFired = hasBrowserPixel();

    trackBrowserMetaEvent('Lead', customData, eventId);
    void postMetaServerEvent({
        eventName: 'Lead',
        eventId,
        customData,
    }).then((serverEventFired) => {
        if (typeof sessionStorage === 'undefined') {
            return;
        }

        if (browserEventFired || serverEventFired) {
            sessionStorage.setItem(LEAD_SESSION_KEY, '1');
        }
    });

    if (typeof sessionStorage !== 'undefined' && browserEventFired) {
        sessionStorage.setItem(LEAD_SESSION_KEY, '1');
    }
};

export const trackClubeInitiateCheckout = (source: string): void => {
    const eventId = createEventId('clube-initiate-checkout');
    const customData = defaultCustomData(source);

    trackBrowserMetaEvent('InitiateCheckout', customData, eventId);
    void postMetaServerEvent({
        eventName: 'InitiateCheckout',
        eventId,
        customData,
    });
};

export const trackClubePurchase = (
    orderNsu?: string | null,
    transactionNsu?: string | null,
    paidAmountInCents?: number,
): void => {
    const eventId = buildClubePurchaseEventId(orderNsu, transactionNsu);
    const purchaseSessionKey = eventId ? `${PURCHASE_SESSION_PREFIX}-${eventId}` : undefined;

    if (
        purchaseSessionKey
        && typeof sessionStorage !== 'undefined'
        && sessionStorage.getItem(purchaseSessionKey) === '1'
    ) {
        return;
    }

    const customData = {
        ...defaultCustomData('purchase_confirmation'),
        value: paidAmountInCents ? paidAmountInCents / 100 : CLUB_PRODUCT_VALUE,
    };

    trackBrowserMetaEvent('Purchase', customData, eventId);

    if (purchaseSessionKey && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(purchaseSessionKey, '1');
    }
};
