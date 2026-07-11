import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
    }
}

const CONSENT_KEY = 'cookie-consent';

// Banner LGPD. O estado default (negado) é setado nos HTMLs de entrada via
// Consent Mode v2 + fbq('consent','revoke'). Este banner concede no aceite:
// gtag consent update + fbq consent grant, e persiste a escolha em localStorage
// (lida pelos HTMLs no próximo carregamento).
const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
        } catch {
            /* localStorage indisponível: não bloqueia a página */
        }
    }, []);

    const decide = (granted: boolean) => {
        try {
            localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
        } catch {
            /* ignore */
        }
        if (granted) {
            window.gtag?.('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
            });
            window.fbq?.('consent', 'grant');
        }
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            className="fixed bottom-0 inset-x-0 z-[9999] bg-brand-dark/95 backdrop-blur text-white px-4 py-4 sm:px-6"
        >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <p className="font-sans text-sm leading-relaxed text-white/85 flex-1">
                    Usamos cookies para medir o desempenho do site e das campanhas. Você pode aceitar ou recusar.
                    Saiba mais na{' '}
                    <Link to="/privacidade" className="underline hover:text-brand-gold">
                        Política de Privacidade
                    </Link>
                    .
                </p>
                <div className="flex gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => decide(false)}
                        className="font-sans text-sm px-4 py-2 rounded-full border border-white/40 text-white/90 hover:bg-white/10 transition-colors"
                    >
                        Recusar
                    </button>
                    <button
                        type="button"
                        onClick={() => decide(true)}
                        className="font-sans text-sm font-bold px-5 py-2 rounded-full bg-brand-gold text-brand-dark hover:scale-105 transition-transform"
                    >
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
