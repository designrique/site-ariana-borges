import React from 'react';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const PortalEssenceSection: React.FC = () => {
    const portal = useCurrentPortal();
    const portalNumber = portal.title.replace('Portal ', ''); // ex: "5/5"
    return (
        <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                    O que é o {portal.title}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
                    O dia {portalNumber} não é comum.
                </h2>
                <div className="space-y-5 font-sans text-base md:text-lg text-brand-dark/80 leading-relaxed">
                    <p>{portal.essence}</p>
                    <p className="text-xl md:text-2xl font-serif italic text-brand-dark mt-10">
                        {portal.subtitle}
                    </p>
                    <p className="font-serif text-xl md:text-2xl">
                        <span className="text-brand-gold font-bold">{portal.tagline}</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PortalEssenceSection;
