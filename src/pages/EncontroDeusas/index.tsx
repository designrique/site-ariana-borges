import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import AboutSection from './components/AboutSection';
import AstrologySection from './components/AstrologySection';
import GallerySection from './components/GallerySection';
import ProgramSection from './components/ProgramSection';
import LocationSection from './components/LocationSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';

const EncontroDeusas: React.FC = () => {
    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>Encontro das Deusas: A consagração | Retiro Terapêutico</title>
                <meta name="description" content="Participe do Encontro das Deusas: A consagração. Um retiro terapêutico exclusivo em Bonito/PE (24-26 de Abril) para mulheres que buscam força, autonomia e cura emocional." />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arianaborges.com/encontro-das-deusas" />
                <meta property="og:title" content="Encontro das Deusas: A consagração | Retiro Terapêutico" />
                <meta property="og:description" content="Um retiro exclusivo para mulheres que atravessam momentos de ruptura e decidiram que é hora de retomar a própria força. 24 a 26 de Abril em Bonito/PE." />
                <meta property="og:image" content="/og-site-encontro-deusas.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:site_name" content="Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://arianaborges.com/encontro-das-deusas" />
                <meta name="twitter:title" content="Encontro das Deusas: A consagração | Retiro Terapêutico" />
                <meta name="twitter:description" content="Um retiro exclusivo para mulheres que atravessam momentos de ruptura e decidiram que é hora de retomar a própria força." />
                <meta name="twitter:image" content="/og-site-encontro-deusas.png" />

                <link rel="canonical" href="https://arianaborges.com/encontro-das-deusas" />
            </Helmet>

            <a href="#hero_section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50">
                Pular para o conteúdo principal
            </a>

            <HeroSection />
            <ProblemSection />
            <AboutSection />
            <AstrologySection />
            <GallerySection />
            <ProgramSection />
            <LocationSection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
            <FinalCTASection />
        </div>
    );
};

export default EncontroDeusas;
