import React, { useMemo } from 'react';
import { ArrowDown2 } from 'iconsax-react';

// Monta o link do checkout carregando a origem REAL da visita: repassa as UTMs
// de entrada (a Hotmart as lê nativamente) e consolida um `sck` — parametro
// nativo da Hotmart, max 30 chars — para o Dashboard de Origem de Vendas
// distinguir tráfego pago de orgânico. Sem isso, nao da pra saber se a venda
// veio do anuncio. Origem sem utm_source => "direto".
const buildCheckoutUrl = (): string => {
    const base = 'https://pay.hotmart.com/N96775692V';
    const params = new URLSearchParams({ checkoutMode: '2' });
    const entry = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
    );

    (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const)
        .forEach((k) => {
            const v = entry.get(k);
            if (v) params.set(k, v);
        });

    const src = entry.get('utm_source');
    const sck = (src
        ? [src, entry.get('utm_medium'), entry.get('utm_campaign')].filter(Boolean).join('-')
        : 'direto'
    ).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30);
    params.set('sck', sck);

    return `${base}?${params.toString()}`;
};

const FinalCTASection: React.FC = () => {
    // useMemo com [] => href estável (calculado uma vez no mount), pro widget
    // Hotmart nao ver o href mudar entre o init e o clique.
    const checkoutUrl = useMemo(buildCheckoutUrl, []);

    const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Desktop: o widget Hotmart intercepta e abre o popup — previne a
        // navegacao dupla. Mobile: o popup do widget e instavel, entao deixa
        // o link navegar direto pro checkout (confiavel em qualquer device).
        if (window.matchMedia('(min-width: 769px)').matches) {
            e.preventDefault();
        }
    };

    return (
        <section id="inscricao" className="py-20 md:py-28 bg-brand-gold relative overflow-hidden text-brand-dark">
            <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <p className="font-sans text-sm text-brand-dark/70 uppercase tracking-widest mb-4">
                    Sua transformação pode começar hoje
                </p>

                <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight font-bold">
                    Você não precisa continuar<br />repetindo os mesmos ciclos.
                </h2>

                <p className="font-sans text-lg md:text-xl text-brand-dark/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                    O amor que você procura começa na mulher que você decide se tornar.
                </p>

                <a
                    href={checkoutUrl}
                    onClick={handleCheckoutClick}
                    className="hotmart-fb hotmart__button-checkout inline-flex items-center gap-2 bg-brand-dark text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-base md:text-lg cursor-pointer"
                >
                    QUERO ENTRAR PARA O DEDO MAGNÉTICO®
                    <ArrowDown2 size={20} variant="Linear" color="currentColor" className="-rotate-90" />
                </a>

                <p className="font-sans text-sm text-brand-dark/60 mt-6">
                    Acesso imediato após a inscrição
                </p>
            </div>
        </section>
    );
};

export default FinalCTASection;
