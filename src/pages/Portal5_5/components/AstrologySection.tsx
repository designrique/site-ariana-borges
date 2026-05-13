import React from 'react';
import { Moon, Sun1 } from 'iconsax-react';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const AstrologySection: React.FC = () => {
    const portal = useCurrentPortal();
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-brand-dark to-[#1a0d33] text-brand-beige">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        Astrologia e Lua
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
                        O céu que sustenta esse portal
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <div className="w-14 h-14 rounded-full bg-brand-lilac/20 flex items-center justify-center mb-5">
                            <Moon size={28} variant="Linear" color="#C8A2C8" />
                        </div>
                        <h3 className="font-serif text-2xl text-white mb-3">A Lua do dia</h3>
                        <p className="font-sans text-gray-300 leading-relaxed mb-3">
                            A Lua neste período atua como um <strong className="text-brand-lilac">gatilho emocional</strong>.
                            Ela traz à superfície aquilo que você vinha evitando sentir.
                        </p>
                        <p className="font-sans text-gray-400 italic">
                            E isso não é um problema — é exatamente o que permite a mudança.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mb-5">
                            <Sun1 size={28} variant="Linear" color="#D4AF37" />
                        </div>
                        <h3 className="font-serif text-2xl text-white mb-3">Contexto astrológico</h3>
                        <p className="font-sans text-gray-300 leading-relaxed">
                            {portal.astrology_context}
                        </p>
                    </div>
                </div>

                <div className="mt-14 text-center max-w-3xl mx-auto">
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
                        Por que esse portal é tão forte
                    </h3>
                    <p className="font-sans text-gray-300 leading-relaxed">
                        {portal.essence}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AstrologySection;
