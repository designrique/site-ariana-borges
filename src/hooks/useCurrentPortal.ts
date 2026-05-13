import portals from '@/data/portals.json';

export interface PortalData {
    id: string;
    date: string;            // YYYY-MM-DD
    displayDate: string;     // "5 de Maio"
    displayTime: string;     // "20h"
    format: string;          // "Online"
    title: string;           // "Portal 5/5"
    subtitle: string;
    tagline: string;
    energia: string[];
    essence: string;
    mesa_aspect: string;
    kundalini_aspect: string;
    astrology_context: string;
    after_portal: string;
    ogImageHint: string;
}

const PORTALS = portals as PortalData[];

/**
 * Retorna o portal vigente seguindo lógica D+1:
 * - Portal cuja data >= hoje: o próximo a acontecer (ou o de hoje)
 * - Após o ultimo portal do ano (12/12): retorna o 1/1 do proximo ano
 *
 * Override via querystring `?portal=DD-MM` para preview/QA (ex: ?portal=11-11).
 */
export function getCurrentPortal(now: Date = new Date()): PortalData {
    // QA override via querystring (apenas client-side)
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const override = params.get('portal');
        if (override) {
            const found = PORTALS.find(p => p.id === override);
            if (found) return found;
        }
    }

    // Comparacao por dia (ignora hora) — portal "passa" no dia seguinte (D+1)
    const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const upcoming = PORTALS.filter(p => p.date >= todayStr);

    if (upcoming.length > 0) {
        // primeiro portal cujo date >= hoje
        return upcoming[0];
    }

    // Todos passaram este ano → loop pra 1/1 do proximo ano
    // Cria copia do 1/1 com a data do ano seguinte
    const nextYearFirst = { ...PORTALS[0] };
    const currentYear = now.getFullYear();
    nextYearFirst.date = `${currentYear + 1}-01-01`;
    return nextYearFirst;
}

export function useCurrentPortal(): PortalData {
    return getCurrentPortal();
}
