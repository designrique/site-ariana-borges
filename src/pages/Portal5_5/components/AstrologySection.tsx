import React from 'react';
import { Sun1 } from 'iconsax-react';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const AstrologySection: React.FC = () => {
    const portal = useCurrentPortal();
    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-brand-dark to-[#1a0d33] text-brand-beige">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-10">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        Astrologia
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
                        O céu que sustenta esse portal
                    </h2>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
                    <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mb-5 mx-auto">
                        <Sun1 size={28} variant="Linear" color="#D4AF37" />
                    </div>
                    <p className="font-sans text-gray-300 leading-relaxed text-center text-base md:text-lg">
                        {portal.astrology_context}
                    </p>
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
