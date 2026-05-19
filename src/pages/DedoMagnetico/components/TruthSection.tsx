import React from 'react';

const TruthSection: React.FC = () => {
    return (
        <section id="verdade" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="font-sans text-base text-brand-gold uppercase tracking-widest mb-6">
                    Existe algo que quase ninguém te ensinou
                </p>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight">
                    Nós não escolhemos nossos relacionamentos apenas com a mente.
                </h2>

                <p className="font-sans text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Escolhemos a partir das nossas <strong className="text-brand-gold">feridas emocionais</strong>,
                    histórias da infância, <strong className="text-brand-gold">crenças inconscientes</strong> e
                    necessidades afetivas.
                </p>

                <p className="font-sans text-lg text-gray-300 leading-relaxed mb-6">
                    E enquanto isso permanecer escondido…
                </p>

                <p className="font-serif italic text-2xl md:text-3xl text-brand-gold leading-tight">
                    Você continuará repetindo ciclos.
                </p>
            </div>
        </section>
    );
};

export default TruthSection;
