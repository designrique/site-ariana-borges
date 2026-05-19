import React from 'react';

const AboutCourseSection: React.FC = () => {
    return (
        <section id="sobre_o_curso" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-14">
                    <p className="font-sans text-sm text-brand-goldDark uppercase tracking-widest mb-4">
                        O Dedo Magnético® foi criado para mudar isso
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                        Mais do que um curso sobre relacionamentos,<br />
                        uma jornada de transformação emocional.
                    </h2>
                </div>

                <div className="font-sans text-lg text-gray-700 leading-relaxed space-y-6 max-w-2xl mx-auto">
                    <p>
                        O <strong className="text-brand-goldDark">Dedo Magnético®</strong> é uma jornada profunda de
                        autoconhecimento e transformação emocional.
                    </p>

                    <p>
                        Você vai compreender por que continua atraindo determinadas pessoas e aprender a
                        <strong className="text-brand-goldDark"> romper padrões</strong> que sabotam sua vida amorosa.
                    </p>

                    <p>
                        Porque o problema nunca foi "escolher homens errados".
                    </p>

                    <div className="bg-white border-l-4 border-brand-gold rounded-r-xl px-8 py-6 my-8 shadow-sm">
                        <p className="font-serif italic text-xl md:text-2xl text-brand-dark leading-relaxed">
                            O problema é que, muitas vezes, existe uma parte ferida dentro de você
                            escolhendo por você.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCourseSection;
