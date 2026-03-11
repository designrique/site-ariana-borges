import React from 'react';

const topics = [
    { icon: "🧠", title: "O arquétipo da heroína feminina" },
    { icon: "💬", title: "Verdade interior e autenticidade" },
    { icon: "❤️", title: "Amor sem dependência emocional" },
    { icon: "⚡", title: "Liderança feminina consciente" },
    { icon: "🌑", title: "A integração da sombra emocional" },
    { icon: "🌿", title: "Autonomia e soberania feminina" },
    { icon: "🔥", title: "Coragem para ocupar seu lugar no mundo" },
    { icon: "✨", title: "Prosperidade Magnética" },
];

const TopicsSection: React.FC = () => {
    return (
        <section id="temas" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                        Temas abordados nos encontros
                    </h2>
                    <p className="font-sans text-gray-300 text-lg">
                        Ao longo do grupo vamos trabalhar:
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {topics.map((topic, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-6 py-5 hover:bg-white/10 transition-colors"
                        >
                            <span className="text-2xl shrink-0">{topic.icon}</span>
                            <span className="font-sans text-gray-200 text-base">{topic.title}</span>
                        </div>
                    ))}
                </div>

                <p className="font-sans text-center text-gray-400 mt-10 text-sm">
                    Cada encontro traz reflexões, exercícios terapêuticos e momentos de partilha.
                </p>
            </div>
        </section>
    );
};

export default TopicsSection;
