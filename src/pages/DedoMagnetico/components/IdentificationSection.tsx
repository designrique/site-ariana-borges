import React from 'react';
import { TickSquare } from 'iconsax-react';

const items = [
    'Atrai pessoas indisponíveis emocionalmente',
    'Se doa mais do que recebe',
    'Tem medo de rejeição ou abandono',
    'Se apega rápido demais',
    'Tem dificuldade de impor limites',
    'Vive ciclos repetitivos no amor',
    'Sente que sempre precisa provar seu valor',
    'Deseja construir uma relação saudável sem perder sua essência',
];

const IdentificationSection: React.FC = () => {
    return (
        <section id="identificacao" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                        Você provavelmente se identifica com algumas dessas situações:
                    </h2>
                </div>

                <div className="space-y-3 max-w-2xl mx-auto">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-white border border-brand-lilac/20 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="p-1 rounded-full bg-brand-gold/20 text-brand-goldDark shrink-0">
                                <TickSquare size={18} variant="Linear" color="currentColor" />
                            </div>
                            <span className="font-sans text-gray-800 leading-relaxed">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 max-w-xl mx-auto">
                    <p className="font-sans text-lg text-gray-700 mb-3">
                        Se você respondeu "sim" para algumas delas...
                    </p>
                    <p className="font-serif italic text-2xl md:text-3xl text-brand-goldDark">
                        Este curso foi criado para você.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default IdentificationSection;
