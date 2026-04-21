import React from 'react';
import { TickSquare } from 'iconsax-react';

const PricingSection: React.FC = () => {
    const plans = [
        {
            title: "Primeiro Lote",
            price: "2.298,00",
            period: "à vista ou parcelado",
            condition: "Melhor condição (até maio)",
            features: ["Hospedagem em Quarto Duplo", "Alimentação Inclusa", "Translado Incluso", "Kit da Deusa"],
            highlight: true,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G4EAwBwJNk5zQYeoz47OfZAc21ctEuiBJlCa4KONl0VMq9lCRKaTE4B_PxQFicQSeECBcyxb0nTw_MyLP9-HdosuiErIunOmn3v0lDfbgWfm-iL6PQM-P6hUXQ1dDYseMmOfAaoH8w-cixrtYLB9VY8D.v1.c7bdfac1ddf63fbc"
        },
        {
            title: "Segundo Lote",
            price: "2.498,00",
            period: "à vista ou parcelado",
            condition: "A partir de junho",
            features: ["Hospedagem em Quarto Duplo", "Alimentação Inclusa", "Translado Incluso", "Kit da Deusa"],
            highlight: false,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G4EAwJwJdgxlxAjY11kTdAyie9tqPfcLA4mOgtpYjdUZRbfRuf2yiGk1W4jIdHIC8O9BUZBIlGlAgQe6sfySdgdWjZY_u4v2o1ZkzKKFbPao0bdtj5N5voAP2D7g8wMTRoOoWRpInD51c6nRASPNl9Ic.v1.b31228438f20d58f"
        },
        {
            title: "Terceiro Lote",
            price: "2.698,00",
            period: "à vista ou parcelado",
            condition: "A partir de agosto",
            features: ["Hospedagem em Quarto Duplo", "Alimentação Inclusa", "Translado Incluso", "Kit da Deusa"],
            highlight: false,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G4EAwJwJdgxlxAjY11kTdAyie9tqPfcLA4mOgtpYjdUZRbfRuf2yiGk1W4jIdHIC8O9BUZBIlGlAgQe6sfySdgdWjZY_u4v2o1ZkzKKFbPao0bdtj5N5voAP2D7g8wMTRoOoWRpInD51c6nRASPNl9Ic.v1.b31228438f20d58f"
        }
    ];

    return (
        <section id="investimento" className="py-20 bg-brand-dark text-brand-beige">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                        Invista na sua Reconstrução
                    </h2>
                    <p className="font-sans text-brand-lilac/80">
                        Valores progressivos. Priorize sua decisão.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 border ${plan.highlight ? 'bg-brand-gold text-brand-dark border-brand-gold scale-105 shadow-2xl z-10' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 transition-colors'}`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-lilac text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md whitespace-nowrap">
                                    Melhor Oferta
                                </div>
                            )}

                            <h3 className={`font-serif text-2xl mb-2 ${plan.highlight ? 'text-brand-dark' : 'text-white'}`}>{plan.title}</h3>
                            <p className={`text-sm mb-6 ${plan.highlight ? 'text-brand-dark/80' : 'text-gray-400'}`}>{plan.condition}</p>

                            <div className="mb-8">
                                <span className="text-sm font-sans mr-1">R$</span>
                                <span className={`text-4xl font-bold font-sans ${plan.highlight ? 'text-brand-dark' : 'text-white'}`}>{plan.price}</span>
                                <p className={`text-xs mt-1 ${plan.highlight ? 'text-brand-dark/70' : 'text-gray-500'}`}>{plan.period}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className={`p-1 rounded-full ${plan.highlight ? 'bg-brand-dark/10 text-brand-dark' : 'bg-brand-gold/20 text-brand-gold'}`}>
                                            <TickSquare size={14} variant="Linear" color="currentColor" />
                                        </div>
                                        <span className="text-sm font-sans">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={plan.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${plan.highlight
                                    ? 'bg-brand-dark text-white hover:bg-opacity-90 shadow-lg'
                                    : 'bg-brand-gold text-brand-dark hover:bg-brand-goldDark'
                                    }`}
                            >
                                Garantir minha vaga no {plan.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
