import React from 'react';

const StructureSection: React.FC = () => {
    return (
        <section id="estrutura" className="py-20 md:py-28 bg-white text-brand-dark">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                        Estrutura do grupo
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                    {[
                        { icon: "📅", label: "8 encontros online ao vivo" },
                        { icon: "⏰", label: "Duração de 1h30 a 2h por encontro" },
                        { icon: "👩", label: "Grupo fechado para aprofundamento" },
                        { icon: "📚", label: "Leitura guiada do livro" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-brand-beige rounded-xl px-6 py-5 border border-brand-lilac/20"
                        >
                            <span className="text-2xl shrink-0">{item.icon}</span>
                            <span className="font-sans text-brand-dark font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl px-8 py-7 text-center">
                    <p className="font-serif text-xl text-brand-dark mb-2">Participação ideal</p>
                    <p className="font-sans text-3xl font-bold text-brand-goldDark mb-2">8 a 15 mulheres</p>
                    <p className="font-sans text-gray-600 text-sm">para garantir profundidade nas trocas.</p>
                </div>
            </div>
        </section>
    );
};

export default StructureSection;
