import React from 'react';
import { Flash, Clock } from 'iconsax-react';

const KundaliniSection: React.FC = () => {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-[#1a0d33] text-brand-beige">
            <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.4), transparent 60%), radial-gradient(circle at 20% 80%, rgba(180,140,255,0.3), transparent 60%)',
                }}
            />

            <div className="relative max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/40 text-xs font-bold uppercase tracking-[0.25em] mb-6">
                        <Clock size={14} variant="Linear" color="currentColor" />
                        Incluso no Portal · 20h
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
                        Ativação da Kundalini
                    </h2>
                    <p className="font-serif italic text-brand-gold text-xl md:text-2xl">
                        Para quem quer ir ainda mais fundo.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="font-sans text-gray-300 leading-relaxed mb-4">
                                Se a <strong className="text-white">Mesa de Salomão reorganiza…</strong>
                            </p>
                            <p className="font-sans text-gray-300 leading-relaxed mb-4">
                                A <strong className="text-brand-gold">Kundalini ativa.</strong>
                            </p>
                            <ul className="space-y-3 mt-6 font-sans text-gray-300">
                                <li className="flex items-start gap-3">
                                    <Flash size={18} variant="Linear" color="#D4AF37" className="mt-1 flex-shrink-0" />
                                    <span>Desperta sua energia vital</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Flash size={18} variant="Linear" color="#D4AF37" className="mt-1 flex-shrink-0" />
                                    <span>Aumenta sua percepção</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Flash size={18} variant="Linear" color="#D4AF37" className="mt-1 flex-shrink-0" />
                                    <span>Acelera seu processo de transformação</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-brand-dark/40 rounded-xl p-6 border border-brand-gold/20">
                            <p className="font-serif italic text-lg md:text-xl text-white leading-relaxed">
                                Fazer os dois no mesmo dia é como
                            </p>
                            <p className="font-serif text-2xl md:text-3xl text-brand-gold mt-3 leading-tight">
                                limpar o caminho
                                <br />
                                <span className="text-white">+</span>
                                <br />
                                acender o motor.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KundaliniSection;
