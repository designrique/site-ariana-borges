import React from 'react';
import { ArrowDown2 } from 'iconsax-react';
import { useCurrentPortal, formatPortalPrice } from '@/hooks/useCurrentPortal';

const HeroSection: React.FC = () => {
    const portal = useCurrentPortal();
    const price = formatPortalPrice(portal);
    return (
        <section
            id="hero_section"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige"
        >
            <div className="absolute inset-0 z-0 bg-brand-dark">
                <div
                    className="absolute inset-0 opacity-90"
                    style={{
                        background:
                            'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.35) 0%, rgba(102,51,153,0.45) 35%, rgba(20,8,40,0.95) 75%, #0a0420 100%)',
                    }}
                />
                <div
                    className="absolute inset-0 mix-blend-screen opacity-60"
                    style={{
                        background:
                            'conic-gradient(from 90deg at 50% 50%, rgba(212,175,55,0.15), rgba(180,140,255,0.15), rgba(212,175,55,0.15))',
                        animation: 'spin 60s linear infinite',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-50 mix-blend-screen"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,200,110,0.25), transparent 70%)',
                        animation: 'portal-pulse 6s ease-in-out infinite',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-4 rounded-full bg-purple-950/70 text-white border border-brand-gold/40 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase mb-6 backdrop-blur-sm">
                    {portal.displayDate} • {portal.displayTime} • {portal.format}
                </span>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 leading-none">
                    {portal.title}
                </h1>
                <p className="font-serif italic text-brand-gold text-xl sm:text-2xl md:text-3xl mb-8">
                    Mesa de Salomão Coletiva + Ativação da Kundalini <span className="text-white not-italic text-xs align-super tracking-widest">AO VIVO</span>
                </p>

                <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                    {portal.tagline}
                </p>

                <a
                    href="#investimento"
                    className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                    Quero atravessar o Portal
                    <ArrowDown2 size={20} variant="Linear" color="currentColor" className="group-hover:translate-y-1 transition-transform" />
                </a>

                <p className="font-sans text-xs text-gray-400 mt-6 tracking-widest uppercase">
                    Mesa + Kundalini · R$ {price}
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
