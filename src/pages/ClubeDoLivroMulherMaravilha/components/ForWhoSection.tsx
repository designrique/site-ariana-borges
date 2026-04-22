import React from 'react';
import { TickSquare } from 'iconsax-react';

const ForWhoSection: React.FC = () => {
    return (
        <section id="para_quem" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl mb-12">
                    Este grupo é para mulheres que:
                </h2>

                <div className="space-y-4 text-left max-w-xl mx-auto">
                    {[
                        "desejam se conhecer mais profundamente",
                        "querem fortalecer sua identidade feminina",
                        "sentem que precisam resgatar sua força interior",
                        "buscam um espaço terapêutico de troca e crescimento",
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-4 hover:bg-white/10 transition-colors"
                        >
                            <div className="p-1 rounded-full bg-brand-gold/20 text-brand-gold shrink-0">
                                <TickSquare size={16} variant="Linear" color="currentColor" />
                            </div>
                            <span className="font-sans text-gray-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForWhoSection;
