import React from 'react';
import { Star } from 'lucide-react';
import { PricingOption } from '../types';
import { useCheckout } from './CheckoutContext';

const plans: PricingOption[] = [
  {
    title: "Jornada Completa",
    price: "R$555,00",
    features: [
      "Acesso aos 21 dias completos",
      "Grupo VIP de acompanhamento",
      "Gravações vitalícias de todos os dias",
      "Bônus: Ritual de Manifestação de 2026 gravado"
    ],
    recommended: true
  }
];

const Pricing: React.FC = () => {
  const { openCheckout } = useCheckout();

  return (
    <section className="py-16 md:py-24 bg-white" id="investimento">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3 md:mb-4">Investimento em Você</h2>
          <p className="font-sans text-gray-600 text-sm md:text-base">Inicie sua transformação agora.</p>
        </div>

        <div className="flex justify-center max-w-md mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-300 w-full ${plan.recommended ? 'bg-brand-lilac/10 border-2 border-brand-gold shadow-xl md:scale-105 z-10' : 'bg-gray-50 border border-gray-100 hover:shadow-lg'}`}
            >


              <h3 className="font-serif text-xl md:text-2xl text-brand-dark mb-2">{plan.title}</h3>
              <div className="my-4 md:my-6">
                <span className="text-3xl md:text-4xl font-serif text-brand-gold font-bold">{plan.price}</span>
                {!plan.recommended && <span className="text-gray-400 text-xs md:text-sm ml-2">/ por ciclo</span>}
                {plan.recommended && <span className="text-gray-400 text-xs md:text-sm ml-2">/ total</span>}
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 md:gap-3 text-gray-600 font-sans text-xs md:text-sm">
                    <Star className={`w-3 h-3 md:w-4 md:h-4 mt-1 ${plan.recommended ? 'text-brand-gold fill-brand-gold' : 'text-gray-400'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={openCheckout}
                className={`w-full py-3 md:py-4 rounded-xl font-bold text-sm md:text-base transition-colors ${plan.recommended ? 'bg-brand-gold text-white hover:bg-yellow-600' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold'}`}
              >
                Garantir Minha Vaga
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
