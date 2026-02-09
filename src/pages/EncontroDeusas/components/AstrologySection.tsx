import React from 'react';
import { Mountain } from 'lucide-react'; // Using Mountain as proxy for Earth element

const AstrologySection: React.FC = () => {
    return (
        <section id="astrology_context" className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-brand-lilac/10 rounded-3xl p-8 md:p-12 border border-brand-lilac/20 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                    <div className="flex-shrink-0 bg-brand-gold/10 p-6 rounded-full">
                        <Mountain size={48} className="text-brand-goldDark" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-2">
                                A Energia do Momento: Sol em Touro ♉
                            </h3>
                            <p className="font-sans text-brand-goldDark font-bold uppercase tracking-wide text-sm">
                                Pés no chão, Prazer e Construção
                            </p>
                        </div>

                        <div className="font-sans text-gray-700 leading-relaxed space-y-4">
                            <p>
                                Este encontro acontece sob a regência de Touro. Na astrologia, isso significa que não vamos buscar "fugir para o etéreo". Touro convoca para a Terra, para o corpo e para a realidade.
                            </p>
                            <p>
                                É o momento astrológico perfeito para <strong className="text-brand-dark">materializar mudanças</strong>, cuidar das finanças emocionais e restaurar o prazer de estar viva, com solidez e segurança.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AstrologySection;
