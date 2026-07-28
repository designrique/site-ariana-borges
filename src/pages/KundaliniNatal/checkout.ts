const INFINITEPAY_HANDLE = 'institutoarianaborges';
// `?.` para o checkout.check.ts rodar no Node puro, onde import.meta.env nao existe.
const WHATSAPP_NUMBER = import.meta.env?.VITE_WHATSAPP_NUMBER || '551153041409';

// 1o lote ate 28/07 23h59 (horario de Brasilia); depois a pagina vira sozinha pro 2o lote.
export const LOTE_1_DEADLINE = new Date('2026-07-28T23:59:59-03:00');

export const LOTE_1_PRICE_BRL = 198;
export const LOTE_2_PRICE_BRL = 248;
export const VAGAS_TOTAIS = 12;

export const AURA_INDIVIDUAL_DE_BRL = 498;
export const AURA_INDIVIDUAL_POR_BRL = 369;

export const EVENTO = {
    data: '29 de julho',
    diaSemana: 'quarta-feira',
    hora: '19h',
    cidade: 'Natal/RN',
    isoStart: '2026-07-29T19:00:00-03:00',
} as const;

export const isLote1 = (now: Date = new Date()): boolean => now <= LOTE_1_DEADLINE;

export const currentPriceBRL = (now?: Date): number =>
    isLote1(now) ? LOTE_1_PRICE_BRL : LOTE_2_PRICE_BRL;

export const buildCheckoutUrl = (now?: Date): string => {
    const lote = isLote1(now) ? '1o lote' : '2o lote';
    const params = new URLSearchParams();
    params.set('items[0][name]', `Ativacao da Kundalini em Grupo - Natal/RN - 29/07 (${lote})`);
    params.set('items[0][price]', String(currentPriceBRL(now) * 100));
    params.set('items[0][quantity]', '1');
    params.set('redirect_url', 'https://arianaborges.com/obrigado');
    return `https://checkout.infinitepay.io/${INFINITEPAY_HANDLE}?${params.toString()}`;
};

export const buildAuraWhatsAppUrl = (): string => {
    const msg = `Olá Ariana! Vi a página da Ativação da Kundalini em Natal e quero agendar uma Leitura de Aura individual pelo valor promocional de R$ ${AURA_INDIVIDUAL_POR_BRL} (de R$ ${AURA_INDIVIDUAL_DE_BRL}).`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const buildDuvidasWhatsAppUrl = (): string => {
    const msg = 'Olá Ariana! Tenho uma dúvida sobre a Ativação da Kundalini em grupo, dia 29/07 em Natal.';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
