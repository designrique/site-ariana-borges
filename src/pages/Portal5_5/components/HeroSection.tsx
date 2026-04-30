import React from 'react';
import { ArrowDown2 } from 'iconsax-react';

const HeroSection: React.FC = () => {
    return (
        <section
            id="hero_section"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige"
        >
            <div className="absolute inset-0 z-0 bg-brand-dark">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/portal-5-5/hero.mp4"
                    poster="/portal-5-5/hero-poster.webp"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/90" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-4 rounded-full bg-purple-950/70 text-white border border-brand-gold/40 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase mb-6 backdrop-blur-sm">
                    5 de Maio • 20h • Online
                </span>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 leading-none">
                    Portal 5/5
                </h1>
                <p className="font-serif italic text-brand-gold text-xl sm:text-2xl md:text-3xl mb-8">
                    Mesa de Salomão Coletiva + Ativação da Kundalini
                </p>

                <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                    Um portal que não pede permissão.
                    <br className="hidden md:block" />
                    Ele move a sua vida.
                </p>

                <a
                    href="#investimento"
                    className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                    Quero atravessar o Portal
                    <ArrowDown2 size={20} variant="Linear" color="currentColor" className="group-hover:translate-y-1 transition-transform" />
                </a>

                <p className="font-sans text-xs text-gray-400 mt-6 tracking-widest uppercase">
                    Mesa + Kundalini · R$ 198
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
