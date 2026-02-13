import React from 'react';
import { Sparkles } from 'lucide-react';

const AboutSection: React.FC = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 relative">
                    <div className="aspect-[4/5] rounded-2xl relative overflow-hidden shadow-xl">
                        <img
                            src="/perfil-ariana-borges.jpeg"
                            alt="Ariana Borges"
                            className="w-full h-full object-cover object-top sepia-[0.1] brightness-[1.05] contrast-[0.95]"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -z-10"></div>
                </div>

                <div className="md:w-1/2">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/50 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <Sparkles size={14} /> Facilitadora
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 leading-tight">
                        Quem irá conduzir o encontro
                    </h2>
                    <h3 className="font-serif text-2xl text-brand-goldDark italic mb-4">Ariana Borges</h3>
                    <p className="font-sans text-gray-600 text-lg leading-relaxed mb-6">
                        É um imenso privilégio dedicar minha vida à espiritualidade com um foco profundo na cura holística e no desenvolvimento pessoal.
                    </p>
                    <p className="font-sans text-gray-600 leading-relaxed mb-8">
                        Terapeuta e mentora espiritual com mais de 12 mil atendimentos e 1.500 alunos impactados. Minha missão é guiar pessoas em jornadas de cura profunda e reconexão com sua essência, unindo espiritualidade, ciência e técnicas integrativas.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
