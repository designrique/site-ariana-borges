import React from 'react';

const ProblemSection: React.FC = () => {
    return (
        <section id="intro_problem" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
                    Para a mulher que você é hoje <br />
                    <span className="text-gray-500 italic text-2xl md:text-3xl">(não a que esperam que você seja)</span>
                </h2>

                <div className="font-sans text-lg text-gray-700 leading-relaxed space-y-6">
                    <p>
                        Sabemos que divórcios, transições de carreira, luto ou instabilidade financeira não são apenas "fases difíceis". São portais de identidade que exigem muita energia.
                    </p>
                    <p>
                        Muitas vezes, tentamos resolver tudo racionalmente, mas o corpo trava. A angústia permanece. O <strong className="text-brand-goldDark">Encontro das Deusas</strong> foi desenhado para ser um espaço de <strong className="text-brand-goldDark">enfrentamento acolhedor</strong>, onde você vai parar de "sobreviver" aos problemas e começar a desenhar sua nova realidade.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
