import React from 'react';
import { Check } from 'lucide-react';

const PricingSection: React.FC = () => {
    const plans = [
        {
            title: "Lote Fevereiro",
            price: "2.598,00",
            period: "à vista ou parcelado",
            condition: "Melhor condição (até 28/02)",
            features: ["Hospedagem Completa", "Alimentação Inclusa", "Kit da Deusa"],
            highlight: true,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G9MAYBwJdmzJ8FOGfT1AKGsPbHGog28fIHVN3SyyqRN8UOA_VmP-Agkogai0SyyuNw7Y12G4xmEadFlGeeBbbKgblmXA8IesIuYgSP3ApMzDmWWStXIGecssRc11m-613JFs0YTwLAVTB7Xu28-G3YOwfR3-Tpz0R_WsmVeJRC_2yonMk7aTIuUVzCikLlnNAIwc_vhN1FobDjA6lumMoyYQnQE.v1.ebb0e5665e2dceb2"
        },
        {
            title: "Lote Março",
            price: "2.898,00",
            period: "à vista ou parcelado",
            condition: "A partir de 01/03",
            features: ["Hospedagem Completa", "Alimentação Inclusa", "Kit da Deusa"],
            highlight: false,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G8wAYBwJdgyyBh37EMTm_5oXJfjvecXM_lX_BtpAJhBFBTSfX4IUMXULUROZpwfsUVsQ1MIgagskD6WAT3w9WXoVERx7NXZ4OQRTBVcm3iJuMMgyP9n5wNQ0Pk-av5J8F3Qo1qJEtGvYibEf99e9iHxit_4lbbYeVP5s9og3oIL-LghaK7RyisAFAzaCFexJ2zigoPPm_Ic6F4bLi1lSD5XR6IoaAQ.v1.fc212b6eab273580"
        },
        {
            title: "Lote Abril",
            price: "3.098,00",
            period: "à vista ou parcelado",
            condition: "Últimas vagas (a partir de 01/04)",
            features: ["Hospedagem Completa", "Alimentação Inclusa", "Kit da Deusa"],
            highlight: false,
            url: "https://checkout.infinitepay.io/institutoarianaborges?lenc=G8sAYGT-b9Yi-Nhcz8sC_-0JVCAJ3G0aU-C8pwfsUVsQ1MIgaguTPJQf-MDXkyVVRHDskbHlZhAMFayH6U6vASXDEDVTFNRV1X2n-UnJt9dnXu35TZ9Eww6xr_NxLoLu0B3_CPEjL1DaBpxmjLb3fzlg10FTj30DQm8AVjQN3nDtq7jAqS837j3UPS8cXky_FxrfG4kXNg.v1.7d9ab428bd3c79a6"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
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
                                            <Check size={14} strokeWidth={3} />
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
