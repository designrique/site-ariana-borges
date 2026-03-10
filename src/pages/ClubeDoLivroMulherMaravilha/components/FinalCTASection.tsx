import React from 'react';
import { ArrowDown } from 'lucide-react';

const FinalCTASection: React.FC = () => {
    return (
        <section id="final_cta" className="py-20 bg-brand-gold relative overflow-hidden text-brand-dark">
            <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight font-bold">
                    Sua jornada começa aqui
                </h2>

                <p className="font-sans text-lg md:text-xl text-brand-dark/80 mb-4 max-w-2xl mx-auto leading-relaxed">
                    Toda mulher carrega dentro de si uma heroína silenciosa.
                    Quando essa força desperta, a vida começa a ser vivida com mais verdade, coragem e propósito.
                </p>

                <p className="font-sans text-base text-brand-dark/70 mb-10 max-w-xl mx-auto">
                    Se você sente que chegou a hora de se reconectar com sua essência, este grupo pode ser o início dessa jornada.
                </p>

                <a
                    href="#investimento"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
                >
                    👉 Quero entrar no grupo
                    <ArrowDown size={20} />
                </a>
            </div>
        </section>
    );
};

export default FinalCTASection;
