import React from 'react';
import { TickSquare, Warning2 } from 'iconsax-react';

const sensacoes = [
    'Sensação de libertação',
    'Clareza sobre decisões importantes',
    'Desapego natural do que não faz mais sentido',
    'Abertura de novos caminhos',
    'Movimento real na vida',
];

const AfterPortalSection: React.FC = () => {
    return (
        <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        Depois do Portal
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
                        O que você pode sentir
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="bg-white border border-brand-dark/10 rounded-2xl p-8 shadow-sm">
                        <ul className="space-y-4">
                            {sensacoes.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-sans text-base md:text-lg">
                                    <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <TickSquare size={16} variant="Linear" color="#D4AF37" />
                                    </div>
                                    <span className="text-brand-dark/85">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-brand-dark text-brand-beige rounded-2xl p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <Warning2 size={24} variant="Linear" color="#D4AF37" />
                            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
                                Importante
                            </span>
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 leading-tight">
                            Este não é um portal confortável.
                        </h3>
                        <p className="font-serif italic text-lg text-brand-gold mb-3">
                            É um portal de verdade.
                        </p>
                        <p className="font-sans text-gray-300 leading-relaxed">
                            E por isso ele é tão transformador.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AfterPortalSection;
