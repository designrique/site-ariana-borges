import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from './components/HeroSection';
import IdentificationSection from './components/IdentificationSection';
import AboutGroupSection from './components/AboutGroupSection';
import TopicsSection from './components/TopicsSection';
import TherapistSection from './components/TherapistSection';
import StructureSection from './components/StructureSection';
import ForWhoSection from './components/ForWhoSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import { trackClubeViewContent } from '@/lib/metaTracking';

const ClubeDoLivroMulherMaravilha: React.FC = () => {
    useEffect(() => {
        trackClubeViewContent();
    }, []);

    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online</title>
                <meta name="description" content="Grupo Terapêutico de Leitura online com Ariana Borges. 8 encontros ao vivo explorando A Psicologia da Mulher-Maravilha para fortalecer sua identidade e força interior." />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://clubelivromulhermaravilha.arianaborges.com/" />
                <meta property="og:title" content="Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online" />
                <meta property="og:description" content="Um grupo terapêutico online para mulheres que desejam fortalecer sua identidade e resgatar sua força interior. 8 encontros ao vivo com Ariana Borges." />
                <meta property="og:image" content="https://clubelivromulhermaravilha.arianaborges.com/og-clube-livro.jpg" />
                <meta property="og:image:alt" content="Clube do Livro: A Psicologia da Mulher-Maravilha - Instituto Ariana Borges" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Instituto Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online" />
                <meta name="twitter:description" content="Um grupo terapêutico online para mulheres que desejam fortalecer sua identidade e resgatar sua força interior." />
                <meta name="twitter:image" content="https://clubelivromulhermaravilha.arianaborges.com/og-clube-livro.jpg" />

                <link rel="canonical" href="https://clubelivromulhermaravilha.arianaborges.com/" />
            </Helmet>

            <a href="#hero_section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50">
                Pular para o conteúdo principal
            </a>

            <HeroSection />
            <IdentificationSection />
            <AboutGroupSection />
            <TopicsSection />
            <TherapistSection />
            <StructureSection />
            <ForWhoSection />
            <PricingSection />
            <FAQSection />
            <FinalCTASection />
        </div>
    );
};

export default ClubeDoLivroMulherMaravilha;
