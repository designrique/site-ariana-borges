import React from 'react';

const gifts = [
    { icon: '🎁', title: 'Aulas completas do método Dedo Magnético®' },
    { icon: '🎁', title: 'Exercícios terapêuticos e práticas de autoconhecimento' },
    { icon: '🎁', title: 'Ferramentas para identificar padrões emocionais' },
    { icon: '🎁', title: 'Materiais complementares' },
    { icon: '🎁', title: 'Acesso ao conteúdo para estudar no seu ritmo' },
    { icon: '🎁', title: 'Bônus exclusivos' },
];

const ReceiveSection: React.FC = () => {
    return (
        <section id="o_que_voce_recebe" className="py-20 md:py-28 bg-white text-brand-dark">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                        O que você recebe:
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {gifts.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-4 bg-brand-beige rounded-xl px-6 py-5 border border-brand-lilac/20"
                        >
                            <span className="text-2xl shrink-0">{item.icon}</span>
                            <span className="font-sans text-brand-dark font-medium leading-relaxed">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReceiveSection;
