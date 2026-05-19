import React from 'react';

const StorySection: React.FC = () => {
    return (
        <section id="historia" className="py-20 md:py-28 bg-brand-beige text-brand-dark">
            <div className="max-w-2xl mx-auto px-6">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-12 leading-tight text-center text-balance max-w-xl mx-auto">
                    Você sente que sempre acaba vivendo a mesma história no amor?
                </h2>

                <div className="font-sans text-lg text-gray-700 leading-relaxed space-y-3 mb-12 text-center">
                    <p>Você conhece alguém.</p>
                    <p>Se envolve.</p>
                    <p>Cria expectativas.</p>
                    <p>Entrega seu coração.</p>
                    <p className="text-brand-goldDark font-medium pt-4">E depois...</p>
                </div>

                <div className="font-sans text-lg text-gray-700 leading-relaxed space-y-3 mb-12 text-center">
                    <p>Você se vê novamente ansiosa.</p>
                    <p>Tentando agradar.</p>
                    <p>Aceitando menos do que merece.</p>
                    <p>Tentando salvar alguém.</p>
                    <p>Tentando ser suficiente.</p>
                </div>

                <p className="font-sans text-lg text-gray-700 text-center mb-6">E a pergunta volta:</p>

                <blockquote className="font-serif italic text-2xl md:text-3xl text-brand-dark text-center mb-16 border-l-4 border-brand-gold pl-6 max-w-xl mx-auto">
                    "Por que isso acontece comigo?"
                </blockquote>

                <div className="font-sans text-lg text-gray-700 leading-relaxed space-y-5 text-center max-w-xl mx-auto">
                    <p>Talvez você tenha chamado isso de <span className="text-brand-goldDark font-medium">azar</span>.</p>
                    <p>Talvez tenha pensado que era <span className="text-brand-goldDark font-medium">destino</span>.</p>
                    <p>Talvez tenha acreditado que simplesmente <span className="text-brand-goldDark font-medium">não nasceu para viver um relacionamento saudável</span>.</p>
                </div>
            </div>
        </section>
    );
};

export default StorySection;
