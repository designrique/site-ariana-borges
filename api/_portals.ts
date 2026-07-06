// Fonte única dos portais para as funções serverless em api/.
// O front usa src/data/portals.json; o build serverless evita import de JSON,
// então a lista é replicada aqui em TS — manter em sincronia com portals.json.
// O prefixo "_" impede o Vercel de tratar este arquivo como endpoint.

export interface PortalInfo {
    id: string;
    date: string;          // YYYY-MM-DD
    displayDate: string;
    displayTime: string;
    title: string;
    subtitle: string;
    tagline: string;
}

export const PORTALS: PortalInfo[] = [
    { id: '01-01', date: '2026-01-01', displayDate: '1 de Janeiro', displayTime: '20h', title: 'Portal 1/1', subtitle: 'Início + manifestação + abertura de ano', tagline: 'O ano em que tudo recomeça pede sua decisão.' },
    { id: '02-02', date: '2026-02-02', displayDate: '2 de Fevereiro', displayTime: '20h', title: 'Portal 2/2', subtitle: 'Intuição + relações + equilíbrio emocional', tagline: 'O primeiro número espiritual te chama de volta para casa.' },
    { id: '03-03', date: '2026-03-03', displayDate: '3 de Março', displayTime: '20h', title: 'Portal 3/3', subtitle: 'Voz + criatividade + verdade que cura', tagline: 'Diga em voz alta o que sua alma vem sussurrando.' },
    { id: '04-04', date: '2026-04-04', displayDate: '4 de Abril', displayTime: '20h', title: 'Portal 4/4', subtitle: 'Estrutura + ancoragem + materialização', tagline: 'O céu desce e pede chão para acontecer.' },
    { id: '05-05', date: '2026-05-05', displayDate: '5 de Maio', displayTime: '20h', title: 'Portal 5/5', subtitle: 'Mudança + liberdade + quebra de padrões', tagline: 'A vida pede que você saia do lugar onde já não cabe.' },
    { id: '06-06', date: '2026-06-06', displayDate: '6 de Junho', displayTime: '20h', title: 'Portal 6/6', subtitle: 'Amor + harmonia + cura do feminino', tagline: 'O amor verdadeiro começa pela maneira como você se trata.' },
    { id: '07-07', date: '2026-07-07', displayDate: '7 de Julho', displayTime: '20h', title: 'Portal 7/7', subtitle: 'Sabedoria + introspecção + canal espiritual', tagline: 'O silêncio é onde sua alma fala mais alto.' },
    { id: '08-08', date: '2026-08-08', displayDate: '8 de Agosto', displayTime: '20h', title: 'Portal 8/8', subtitle: 'Prosperidade + poder pessoal + Portal do Leão', tagline: 'A abundância encontra quem se reconhece como soberano.' },
    { id: '09-09', date: '2026-09-09', displayDate: '9 de Setembro', displayTime: '20h', title: 'Portal 9/9', subtitle: 'Encerramento + perdão + libertação kármica', tagline: 'Para o novo nascer, o velho precisa ser sepultado com honra.' },
    { id: '10-10', date: '2026-10-10', displayDate: '10 de Outubro', displayTime: '20h', title: 'Portal 10/10', subtitle: 'Virada + destino + Roda da Fortuna', tagline: 'O destino se move quando você toma a sua posição.' },
    { id: '11-11', date: '2026-11-11', displayDate: '11 de Novembro', displayTime: '20h', title: 'Portal 11/11', subtitle: 'Despertar + iluminação + propósito de alma', tagline: 'O céu te chama pelo nome que só sua alma conhece.' },
    { id: '12-12', date: '2026-12-12', displayDate: '12 de Dezembro', displayTime: '20h', title: 'Portal 12/12', subtitle: 'Integração + síntese + último portal do ano', tagline: 'O último portal do ano colhe tudo o que você plantou.' },
];

// Espelha getCurrentPortal() de src/hooks/useCurrentPortal.ts (lógica D+1, comparação por data UTC).
// Portal "passa" no dia seguinte; após o último do ano, faz loop para o 1/1 do ano seguinte.
export const getCurrentPortal = (now: Date = new Date()): PortalInfo => {
    const todayStr = now.toISOString().slice(0, 10);
    const upcoming = PORTALS.filter(p => p.date >= todayStr);
    if (upcoming.length > 0) return upcoming[0];
    return { ...PORTALS[0], date: `${now.getFullYear() + 1}-01-01` };
};

// Match exato por data (YYYY-MM-DD).
export const findPortalForDate = (dateStr: string): PortalInfo | null =>
    PORTALS.find(p => p.date === dateStr) ?? null;

// Primeiro portal estritamente após a data dada.
export const findNextPortal = (afterDate: string): PortalInfo | null =>
    PORTALS.filter(p => p.date > afterDate)[0] ?? null;
