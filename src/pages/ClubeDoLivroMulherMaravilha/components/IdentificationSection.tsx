import React from 'react';

const IdentificationSection: React.FC = () => {
    return (
        <section id="identificacao" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight">
                    Talvez você esteja sentindo que…
                </h2>

                <ul className="font-sans text-lg text-gray-700 leading-relaxed space-y-4 text-left max-w-xl mx-auto mb-12">
                    {[
                        "precisa ser forte o tempo todo",
                        "cuida de todo mundo e esquece de si mesma",
                        "quer se reconectar com sua essência feminina",
                        "sente que existe um potencial dentro de você ainda não vivido",
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="text-brand-gold mt-1">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

                <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
                    A verdade é que muitas mulheres cresceram aprendendo a silenciar sua força para caber nas expectativas do mundo.
                </p>

                <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
                    Mas existe um <strong className="text-brand-goldDark">arquétipo poderoso</strong> dentro de cada mulher.
                    Um arquétipo que representa:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                        { icon: "✨", label: "coragem" },
                        { icon: "✨", label: "verdade" },
                        { icon: "✨", label: "compaixão" },
                        { icon: "✨", label: "liderança feminina consciente" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl px-4 py-5 shadow-sm border border-brand-lilac/20">
                            <span className="block text-2xl mb-2">{item.icon}</span>
                            <span className="font-serif text-brand-dark text-base">{item.label}</span>
                        </div>
                    ))}
                </div>

                <p className="font-sans text-lg text-gray-700 mt-10 leading-relaxed">
                    Esse arquétipo é simbolizado pela personagem{' '}
                    <strong className="text-brand-goldDark">Mulher‑Maravilha</strong>.
                </p>
            </div>
        </section>
    );
};

export default IdentificationSection;
