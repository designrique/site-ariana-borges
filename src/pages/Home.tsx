import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import Pillars from '@/components/Pillars';
import AboutIntro from '@/components/AboutIntro';
import FAQ from '@/components/FAQ';
import ScrollReveal from '@/components/ScrollReveal';
import { useScheduling } from '@/components/SchedulingContext';

const Home: React.FC = () => {
    const { openScheduling } = useScheduling();

    return (
        <>
            <Helmet>
                <title>Home - Instituto Ariana Borges</title>
                <meta name="description" content="Terapia Individual, Formação de Terapeutas e Grupo de Autoconhecimento. Liberte-se: Desperte, Cure e Transforme sua Vida." />
                <meta property="og:title" content="Home - Instituto Ariana Borges" />
            </Helmet>

            <Hero />

            <ScrollReveal>
                <Pillars />
            </ScrollReveal>

            <ScrollReveal delay={100}>
                <AboutIntro />
            </ScrollReveal>

            <ScrollReveal>
                <FAQ />
            </ScrollReveal>

            {/* Final CTA Section */}
            <ScrollReveal>
                <section className="py-24 bg-brand-lilac/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl -z-10"></div>
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
                            Olá, Ser de Luz
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Sua jornada de transformação começa com um primeiro passo. Estamos aqui para guiá-lo.
                        </p>
                        <button
                            onClick={openScheduling}
                            className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Agendar Atendimento
                        </button>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default Home;
