import React from 'react';
import { ArrowRight2 } from 'iconsax-react';
import { buildInfinitePayCheckoutUrl } from '../checkout';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const FinalCTASection: React.FC = () => {
    const checkoutUrl = buildInfinitePayCheckoutUrl();
    const portal = useCurrentPortal();

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-brand-dark text-brand-beige">
            <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.25) 0%, transparent 60%)',
                }}
            />

            <div className="relative max-w-3xl mx-auto px-6 text-center">
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                    Se você sentiu um chamado…
                </h2>

                <div className="space-y-4 font-sans text-base md:text-lg text-gray-300 leading-relaxed mb-10">
                    <p>Provavelmente você já sabe: algo na sua vida precisa mudar.</p>
                    <p>E talvez você já tenha tentado de várias formas — mas continuou no mesmo lugar.</p>
                    <p className="text-brand-gold font-serif italic text-xl md:text-2xl pt-4">
                        Esse portal não promete milagre.
                    </p>
                    <p className="text-white font-serif text-xl md:text-2xl">
                        Ele cria movimento.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-10 text-left max-w-xl mx-auto">
                    <p className="font-sans text-sm uppercase tracking-widest text-brand-lilac/80 mb-4">
                        Sua escolha
                    </p>
                    <p className="font-sans text-gray-400 line-through mb-2">
                        ❌ continuar tentando resolver tudo sozinho(a)
                    </p>
                    <p className="font-sans text-white text-lg">
                        ✅ entrar em um campo estruturado de transformação
                    </p>
                </div>

                <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 md:px-12 rounded-full shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-1 text-base md:text-lg"
                >
                    Quero participar do {portal.title}
                    <ArrowRight2 size={20} variant="Linear" color="currentColor" className="group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="font-serif italic text-brand-gold/80 mt-10 text-base md:text-lg">
                    O movimento começa com uma decisão.
                    <br />
                    E a sua já começou a acontecer quando você chegou até aqui.
                </p>
            </div>
        </section>
    );
};

export default FinalCTASection;
