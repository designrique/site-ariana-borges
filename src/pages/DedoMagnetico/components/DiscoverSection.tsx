import React from 'react';

const discoveries = [
    { icon: '✨', title: 'Seu perfil relacional' },
    { icon: '✨', title: 'Como identificar padrões inconscientes' },
    { icon: '✨', title: 'As 5 feridas emocionais da infância e seus impactos nos relacionamentos' },
    { icon: '✨', title: 'Como reconhecer sinais de dependência emocional' },
    { icon: '✨', title: 'Como fortalecer autoestima e autovalorização' },
    { icon: '✨', title: 'Como desenvolver limites saudáveis' },
    { icon: '✨', title: 'Como diferenciar amor verdadeiro de carência emocional' },
    { icon: '✨', title: 'Como se tornar uma mulher emocionalmente magnética' },
];

const DiscoverSection: React.FC = () => {
    return (
        <section id="descobertas" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                        Durante o Dedo Magnético®<br />você irá descobrir:
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {discoveries.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-5 hover:bg-white/10 transition-colors"
                        >
                            <span className="text-2xl shrink-0">{item.icon}</span>
                            <span className="font-sans text-gray-200 text-base leading-relaxed">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DiscoverSection;
