import React from 'react';
import { ArrowDown } from 'lucide-react';

const FinalCTASection: React.FC = () => {
    return (
        <section id="final_cta" className="py-20 bg-brand-gold relative overflow-hidden text-brand-dark">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight font-bold">
                    Quando o corpo é consagrado, a alma retorna.
                </h2>

                <a
                    href="#investimento"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
                >
                    Inscrever-se Agora
                    <ArrowDown size={20} />
                </a>
            </div>
        </section>
    );
};

export default FinalCTASection;
