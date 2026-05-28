import React from 'react';
import { ArrowDown2 } from 'iconsax-react';

const FinalCTASection: React.FC = () => {
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
                    href="https://pay.hotmart.com/N96775692V?checkoutMode=2"
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
