// `?.` para o whatsapp.check.ts rodar no Node puro, onde import.meta.env nao existe.
const WHATSAPP_NUMBER = import.meta.env?.VITE_WHATSAPP_NUMBER || '551153041409';

export const PRECO_BRL = 80;
export const DURACAO_MIN = 45;

// Terça do Reiki é recorrente (toda terça); os horários são exibidos como texto —
// o site não tem picker, a reserva acontece no WhatsApp.
export const HORARIOS = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h'] as const;

export const LOCAL = {
    linha1: 'Av. Rui Barbosa, 715, sala 403',
    linha2: 'Empresarial Rui Barbosa',
    bairro: 'Graças',
    cidade: 'Recife',
    estado: 'PE',
    mapsQuery: 'Av.+Rui+Barbosa,+715,+Recife,+PE,+Brasil',
} as const;

export const buildAgendarWhatsAppUrl = (horario?: string): string => {
    const quando = horario ? ` às ${horario}` : '';
    const msg = `Olá Ariana! Quero agendar a Terça do Reiki${quando} — sessão individual de ${DURACAO_MIN} minutos (R$ ${PRECO_BRL}).`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const buildDuvidasWhatsAppUrl = (): string => {
    const msg = 'Olá Ariana! Tenho uma dúvida sobre a Terça do Reiki (sessão individual presencial, em Recife).';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
