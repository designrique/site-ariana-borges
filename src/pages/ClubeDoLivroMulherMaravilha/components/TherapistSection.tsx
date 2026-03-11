import React from 'react';

const TherapistSection: React.FC = () => {
    return (
        <section id="terapeuta" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">
                        Quem conduz essa jornada
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="shrink-0">
                        <img
                            src="/Ariana-Borges-profile-photo.jpeg"
                            alt="Ariana Borges – Terapeuta"
                            className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-brand-gold"
                            loading="lazy"
                        />
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-2">Ariana Borges</h3>
                        <p className="font-sans text-brand-goldDark text-sm uppercase tracking-widest mb-5">
                            Terapeuta • Instituto Ariana Borges
                        </p>
                        <p className="font-sans text-gray-700 leading-relaxed mb-6">
                            Terapeuta e facilitadora de processos de autoconhecimento. Fundadora do Instituto Ariana Borges,
                            Ariana já conduziu milhares de atendimentos e formações voltadas para desenvolvimento emocional e espiritual.
                        </p>

                        <p className="font-sans text-gray-700 mb-4 font-medium">Seu trabalho integra:</p>
                        <ul className="space-y-2">
                            {[
                                "psicologia simbólica",
                                "desenvolvimento do feminino",
                                "processos terapêuticos de autoconhecimento",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-sans text-gray-700">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <p className="font-sans text-gray-600 italic mt-6 text-sm leading-relaxed">
                            Neste grupo, Ariana conduz cada encontro criando um espaço seguro para reflexão, crescimento e transformação.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TherapistSection;
