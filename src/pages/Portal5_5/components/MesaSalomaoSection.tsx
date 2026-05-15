import React from 'react';
import { TickSquare, CloseCircle } from 'iconsax-react';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const trabalhados = [
    'Padrões que te mantêm preso(a) no mesmo lugar',
    'Medos que impedem decisões importantes',
    'Bloqueios inconscientes à mudança',
    'Ciclos repetitivos nos relacionamentos, dinheiro e propósito',
];

const ativados = [
    'Movimento interno',
    'Liberdade emocional',
    'Clareza de direção',
    'Coragem para agir',
];

const MesaSalomaoSection: React.FC = () => {
    const portal = useCurrentPortal();
    return (
        <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        A prática central
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                        A Mesa de Salomão no {portal.title}
                    </h2>
                    <p className="font-sans text-base md:text-lg text-brand-dark/80 max-w-3xl mx-auto leading-relaxed">
                        {portal.mesa_aspect}
                    </p>
                    <p className="font-serif italic text-2xl md:text-3xl text-brand-gold mt-4">
                        Ela reposiciona sua vida.
                    </p>
                    <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30">
                        <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                        <span className="font-sans text-xs uppercase tracking-widest text-brand-dark/85 font-bold">
                            Gravação enviada às 21h em grupo exclusivo
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white border border-brand-dark/10 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <CloseCircle size={20} variant="Linear" color="#B91C1C" />
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl">Trabalhados na Mesa</h3>
                        </div>
                        <ul className="space-y-4">
                            {trabalhados.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-sans text-sm md:text-base text-brand-dark/85">
                                    <span className="text-red-700 mt-1 font-bold">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-brand-dark text-brand-beige border border-brand-gold/30 rounded-2xl p-8 shadow-md">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center">
                                <TickSquare size={20} variant="Linear" color="#D4AF37" />
                            </div>
                            <h3 className="font-serif text-xl md:text-2xl text-white">Ativado em você</h3>
                        </div>
                        <ul className="space-y-4">
                            {ativados.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 font-sans text-sm md:text-base text-gray-300">
                                    <span className="text-brand-gold mt-1 font-bold">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MesaSalomaoSection;
