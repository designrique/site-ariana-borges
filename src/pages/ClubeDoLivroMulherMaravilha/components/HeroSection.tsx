import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section id="hero_section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 bg-brand-dark">
                <img
                    src="/clube-livro-mulher-maravilha/hero-background.webp"
                    alt="Grupo Terapêutico de Leitura – A Psicologia da Mulher-Maravilha"
                    className="w-full h-full object-cover opacity-50"
                    loading="eager"
                    {...({ fetchpriority: "high" } as any)}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark/90"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
                <span className="inline-block py-1 px-4 rounded-full bg-red-900/70 text-white border border-red-500/30 text-sm font-sans tracking-widest uppercase mb-6 backdrop-blur-sm">
                    Instituto Ariana Borges • Grupo Online
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                    Desperte a heroína que existe dentro de você.
                </h1>

                <p className="font-sans text-lg md:text-xl text-gray-200 mb-6 max-w-2xl leading-relaxed">
                    Um grupo terapêutico online para mulheres que desejam fortalecer sua identidade, resgatar sua força interior e compreender o feminino com mais consciência.
                </p>

                <p className="font-sans text-base text-gray-300 italic mb-6">
                    Baseado no livro <strong className="text-brand-gold not-italic">A Psicologia da Mulher‑Maravilha</strong>.
                </p>

                <div className="mb-10">
                    <img
                        src="/clube-mulher-maravilha/capa-livro-mulher-maravilha.webp"
                        alt="Capa do livro A Psicologia da Mulher-Maravilha"
                        className="w-32 md:w-40 rounded-xl shadow-2xl shadow-black/60 mx-auto"
                        loading="eager"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 text-sm font-sans text-gray-200">
                    <span className="flex items-center gap-2">👩‍💻 Encontros ao vivo</span>
                    <span className="flex items-center gap-2">📚 Leitura guiada + processo terapêutico</span>
                    <span className="flex items-center gap-2">🌿 Condução da terapeuta Ariana Borges</span>
                </div>

                <a
                    href="#investimento"
                    className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                    👉 Quero participar do grupo
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
