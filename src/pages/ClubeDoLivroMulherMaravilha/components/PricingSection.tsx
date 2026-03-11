import React from 'react';
import { Check } from 'lucide-react';

const PricingSection: React.FC = () => {
    const features = [
        "8 encontros terapêuticos online ao vivo",
        "Leitura guiada do livro",
        "Exercícios terapêuticos",
        "Grupo fechado com até 15 mulheres",
        "Condução da terapeuta Ariana Borges",
    ];

    return (
        <section id="investimento" className="py-20 bg-brand-dark text-brand-beige">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                        Participação no grupo
                    </h2>
                    <p className="font-sans text-gray-400">
                        Vagas limitadas para manter a qualidade do grupo.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative rounded-2xl p-8 bg-brand-gold text-brand-dark border border-brand-gold scale-100 shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                            Programa Completo
                        </div>

                        <h3 className="font-serif text-2xl mb-2 text-brand-dark">Clube do Livro</h3>
                        <p className="text-sm mb-6 text-brand-dark/70">8 encontros terapêuticos online</p>

                        <div className="mb-8">
                            <span className="text-sm font-sans mr-1">R$</span>
                            <span className="text-5xl font-bold font-sans text-brand-dark">298</span>
                            <p className="text-xs mt-1 text-brand-dark/70">à vista ou parcelado</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-brand-dark/10 text-brand-dark shrink-0">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-sans">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://checkout.infinitepay.io/institutoarianaborges/3igXd4O5Sh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 bg-brand-dark text-white hover:bg-opacity-90 shadow-lg"
                        >
                            👉 Quero participar do grupo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
