import React from 'react';

const TherapistSection: React.FC = () => {
    return (
        <section id="sobre_ariana" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <p className="font-sans text-sm text-brand-goldDark uppercase tracking-widest mb-3">
                        Quem conduz essa jornada
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">
                        Sobre Ariana Borges
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="shrink-0">
                        <img
                            src="/perfil-ariana-borges.jpeg"
                            alt="Ariana Borges – Psicoterapeuta e Terapeuta Integrativa"
                            className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-brand-gold"
                            loading="lazy"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop";
                            }}
                        />
                    </div>

                    <div>
                        <p className="font-sans text-gray-700 leading-relaxed mb-5">
                            Sou <strong className="text-brand-dark">Ariana Borges</strong>, psicoterapeuta e
                            terapeuta integrativa há mais de <strong className="text-brand-goldDark">15 anos</strong>.
                        </p>

                        <p className="font-sans text-gray-700 leading-relaxed mb-5">
                            Ao longo da minha trajetória, já acompanhei milhares de mulheres em processos
                            profundos de transformação emocional, autoconhecimento e relacionamentos.
                        </p>

                        <p className="font-sans text-gray-700 leading-relaxed mb-5">
                            Criei o <strong className="text-brand-goldDark">Dedo Magnético®</strong> para ajudar
                            mulheres a saírem do ciclo do "dedo podre" e desenvolverem relações mais conscientes —
                            começando pela relação mais importante de todas:
                        </p>

                        <p className="font-serif italic text-xl text-brand-goldDark leading-relaxed mb-6">
                            a relação consigo mesma.
                        </p>

                        <div className="border-l-4 border-brand-gold pl-5 py-2">
                            <p className="font-serif italic text-lg text-brand-dark leading-relaxed">
                                O amor que você procura começa na mulher que você decide se tornar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TherapistSection;
