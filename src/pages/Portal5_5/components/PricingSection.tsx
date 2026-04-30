import React from 'react';
import { TickSquare, Calendar, Global, Clock } from 'iconsax-react';
import { buildInfinitePayCheckoutUrl, PORTAL_PRICE_BRL } from '../checkout';

const includes = [
    'Mesa de Salomão Coletiva (online)',
    'Ativação da Kundalini às 20h',
    'Campo estruturado de transformação',
    'Acesso ao vivo com Ariana Borges',
];

const PricingSection: React.FC = () => {
    const checkoutUrl = buildInfinitePayCheckoutUrl();

    return (
        <section id="investimento" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                        Sua decisão
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-3 leading-tight">
                        Atravesse o Portal 5/5
                    </h2>
                    <p className="font-sans text-brand-lilac/80">
                        Mesa de Salomão Coletiva + Ativação da Kundalini.
                    </p>
                </div>

                <div className="relative rounded-3xl bg-gradient-to-br from-brand-gold to-brand-goldDark text-brand-dark p-1 shadow-2xl shadow-brand-gold/20">
                    <div className="bg-[#fdf6e3] rounded-3xl p-8 md:p-12">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark text-brand-gold px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-md whitespace-nowrap">
                            Portal 5/5
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs uppercase tracking-widest text-brand-dark/70 font-bold">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} variant="Linear" color="currentColor" />
                                5 de Maio
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={14} variant="Linear" color="currentColor" />
                                20h
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Global size={14} variant="Linear" color="currentColor" />
                                Online
                            </span>
                        </div>

                        <div className="text-center mb-8">
                            <p className="font-sans text-sm text-brand-dark/70 mb-1">Mesa + Kundalini</p>
                            <div>
                                <span className="text-lg font-sans align-top mr-1">R$</span>
                                <span className="text-6xl md:text-7xl font-bold font-sans text-brand-dark leading-none">
                                    {PORTAL_PRICE_BRL}
                                </span>
                            </div>
                            <p className="text-xs mt-2 text-brand-dark/60 uppercase tracking-widest">
                                à vista ou parcelado
                            </p>
                        </div>

                        <ul className="space-y-3 mb-10 max-w-md mx-auto">
                            {includes.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-brand-dark/10 text-brand-dark">
                                        <TickSquare size={14} variant="Linear" color="currentColor" />
                                    </div>
                                    <span className="text-sm md:text-base font-sans text-brand-dark/85">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 md:py-5 rounded-xl font-bold text-center transition-all duration-300 bg-brand-dark text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl text-base md:text-lg"
                        >
                            Garantir minha vaga no Portal 5/5
                        </a>

                        <p className="text-center text-xs text-brand-dark/60 mt-4">
                            Pagamento seguro via InfinitePay · Pix, cartão ou parcelamento
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
