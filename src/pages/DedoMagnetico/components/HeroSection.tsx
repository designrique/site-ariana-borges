import React from 'react';
import { ArrowDown2 } from 'iconsax-react';

const HeroSection: React.FC = () => {
    return (
        <section id="hero_section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige">
            <div className="absolute inset-0 z-0 bg-brand-dark">
                <img
                    src="/dedo-magnetico/hero-background.webp"
                    alt="Dedo Magnético – Jornada de autoconhecimento e relacionamentos conscientes"
                    className="w-full h-full object-cover opacity-40"
                    loading="eager"
                    {...({ fetchpriority: "high" } as any)}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2574&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark/95"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-4 rounded-full bg-brand-lilacDark/40 text-white border border-brand-lilac/30 text-sm font-sans tracking-widest uppercase mb-8 backdrop-blur-sm">
                    Instituto Ariana Borges • Curso Online
                </span>

                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight tracking-tight">
                    DEDO<br className="sm:hidden" /> MAGNÉTICO<span className="text-brand-gold">®</span>
                </h1>

                <p className="font-sans text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                    Pare de atrair relações que machucam e aprenda a construir relacionamentos
                    <strong className="text-brand-gold"> saudáveis, conscientes e verdadeiros.</strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 text-sm font-sans text-gray-200">
                    <span className="flex items-center gap-2">💫 Conteúdo online</span>
                    <span className="flex items-center gap-2">📖 No seu ritmo</span>
                    <span className="flex items-center gap-2">🌿 Com Ariana Borges</span>
                </div>

                <a
                    href="#inscricao"
                    className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                    Quero entrar para o Dedo Magnético®
                    <ArrowDown2 size={20} variant="Linear" color="currentColor" className="group-hover:translate-y-1 transition-transform" />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
