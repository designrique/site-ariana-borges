import React from 'react';
import { LampOn, HeartCircle, Flash } from 'iconsax-react';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const levels = [
    {
        icon: LampOn,
        title: 'Mental',
        items: [
            'Quebra de padrões repetitivos',
            'Liberação de pensamentos limitantes',
            'Clareza para novas escolhas',
        ],
    },
    {
        icon: HeartCircle,
        title: 'Emocional',
        items: [
            'Liberação de apegos',
            'Desbloqueio de sentimentos presos',
            'Coragem para sair do que não faz mais sentido',
        ],
    },
    {
        icon: Flash,
        title: 'Espiritual',
        items: [
            'Reorganização de caminhos',
            'Aceleração de mudanças necessárias',
            'Abertura de novas possibilidades',
        ],
    },
];

const ThreeLevelsSection: React.FC = () => {
    const portal = useCurrentPortal();
    return (
        <section className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        Em três níveis
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white">
                        O que o {portal.title} ativa em você
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {levels.map((level) => {
                        const Icon = level.icon;
                        return (
                            <div
                                key={level.title}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-brand-gold/40 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mb-6">
                                    <Icon size={28} variant="Linear" color="#D4AF37" />
                                </div>
                                <h3 className="font-serif text-2xl text-white mb-4">
                                    {level.title}
                                </h3>
                                <ul className="space-y-3 mt-4">
                                    {level.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-300 font-sans text-sm md:text-base">
                                            <span className="text-brand-gold mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ThreeLevelsSection;
