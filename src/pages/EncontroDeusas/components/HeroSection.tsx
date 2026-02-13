import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section id="hero_section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 bg-brand-dark">
                <img
                    src="/fotos-encontro-deusas/hero-background.webp"
                    alt="Retiro Encontro das Deusas em Bonito, Pernambuco"
                    className="w-full h-full object-cover opacity-60"
                    loading="eager"
                    {...({ fetchpriority: "high" } as any)}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop"; // Fallback
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark/90"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-3 rounded-full bg-purple-950/80 text-white border border-purple-500/30 text-sm font-sans tracking-widest uppercase mb-6 backdrop-blur-sm">
                    24 a 26 de Abril • Bonito/PE
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                    Encontro das Deusas: A consagração
                </h1>

                <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                    Um retiro terapêutico para mulheres que atravessam momentos de ruptura e decidiram que é hora de retomar a própria força.
                </p>

                <a
                    href="#investimento"
                    className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                    Quero resgatar minha força
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
