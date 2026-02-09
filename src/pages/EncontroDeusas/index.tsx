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
                <title>Encontro das Deusas | Retiro de Reconstrução e Soberania</title>
                <meta name="description" content="Um retiro terapêutico em Bonito/PE (24-26 Abril) para mulheres que buscam força, autonomia e cura emocional em momentos de transição." />
                <meta name="robots" content="index, follow" />
                <meta property="og:image" content="/og-site-encontro-deusas.png" />
                <meta property="og:image:type" content="image/png" />
                <meta name="twitter:image" content="/og-site-encontro-deusas.png" />
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
