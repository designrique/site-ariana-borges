import React from 'react';

const PortalEssenceSection: React.FC = () => {
    return (
        <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                    O que é o Portal 5/5
                </span>
                <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
                    O dia 5/5 não é comum.
                </h2>
                <div className="space-y-5 font-sans text-base md:text-lg text-brand-dark/80 leading-relaxed">
                    <p>
                        Na numerologia cabalística, o número <strong>5</strong> representa <em>movimento, mudança e liberdade</em>.
                    </p>
                    <p>
                        Quando duplicado — <strong>5/5</strong> — essa energia se amplifica e se torna um portal de
                        <strong> ruptura de padrões</strong> e <strong>aceleração de destino</strong>.
                    </p>
                    <p className="text-xl md:text-2xl font-serif italic text-brand-dark mt-10">
                        É o tipo de dia em que a vida não aceita mais estagnação.
                    </p>
                    <p className="font-serif text-xl md:text-2xl">
                        Ou você se move…
                        <br />
                        <span className="text-brand-gold font-bold">ou a vida move você.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PortalEssenceSection;
