import React from 'react';

const AboutGroupSection: React.FC = () => {
    return (
        <section id="sobre_grupo" className="py-20 md:py-28 bg-white text-brand-dark">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                    Um grupo de leitura que também é um processo terapêutico
                </h2>

                <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
                    Durante <strong className="text-brand-goldDark">8 encontros online</strong>, vamos mergulhar no livro{' '}
                    <em>A Psicologia da Mulher‑Maravilha</em> e explorar como os símbolos da heroína se conectam com
                    a jornada emocional de cada mulher.
                </p>

                <p className="font-serif text-2xl md:text-3xl text-brand-dark italic mb-10">
                    Não será apenas leitura.
                </p>

                <p className="font-sans text-lg text-gray-700 mb-10">
                    Será um espaço de:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left max-w-xl mx-auto mb-12">
                    {[
                        { icon: "🔍", label: "reflexão profunda" },
                        { icon: "🌱", label: "autoconhecimento" },
                        { icon: "👂", label: "escuta terapêutica" },
                        { icon: "💪", label: "fortalecimento emocional" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-brand-beige rounded-xl px-6 py-4 border border-brand-lilac/20">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-sans text-brand-dark font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>

                <p className="font-sans text-lg text-gray-600 italic">
                    Um ambiente seguro para mulheres que desejam crescer juntas.
                </p>
            </div>
        </section>
    );
};

export default AboutGroupSection;
