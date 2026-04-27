import React from 'react';
import { Tree } from 'iconsax-react';

const AstrologySection: React.FC = () => {
    return (
        <section id="astrology_context" className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-brand-lilac/10 rounded-3xl p-8 md:p-12 border border-brand-lilac/20 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                    <div className="flex-shrink-0 bg-brand-gold/10 p-6 rounded-full">
                        <Tree size={48} variant="Linear" color="currentColor" className="text-brand-goldDark" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                            <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-2">
                                A Energia do Momento: Lua Nova em Virgem ♍
                            </h3>
                            <p className="font-sans text-brand-goldDark font-bold uppercase tracking-wide text-sm">
                                Purificação, Recomeço e Realinhamento
                            </p>
                        </div>

                        <div className="font-sans text-gray-700 leading-relaxed space-y-4">
                            <p>
                                Este encontro acontece sob a energia da Lua Nova em Virgem, marcando um novo ciclo de cura, organização interna e reconexão com o corpo. Virgem nos convida a olhar para os detalhes, a escutar os sinais sutis do nosso ser e a reorganizar o que precisa de atenção.
                            </p>
                            <p>
                                É o momento astrológico perfeito para <strong className="text-brand-dark">iniciar processos de purificação interior</strong>, estabelecer novos rituais de autocuidado e realinhar sua trajetória com sua essência mais pura e autêntica.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AstrologySection;
