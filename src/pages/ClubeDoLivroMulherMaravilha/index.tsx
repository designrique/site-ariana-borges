import React from 'react';
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

const ClubeDoLivroMulherMaravilha: React.FC = () => {
    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online</title>
                <meta name="description" content="Grupo Terapêutico de Leitura online com Ariana Borges. 8 encontros ao vivo explorando A Psicologia da Mulher-Maravilha para fortalecer sua identidade e força interior." />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arianaborges.com/clube-livro-mulher-maravilha" />
                <meta property="og:title" content="Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online" />
                <meta property="og:description" content="Um grupo terapêutico online para mulheres que desejam fortalecer sua identidade e resgatar sua força interior. 8 encontros ao vivo com Ariana Borges." />
                <meta property="og:site_name" content="Instituto Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Clube do Livro: A Psicologia da Mulher-Maravilha | Grupo Terapêutico Online" />
                <meta name="twitter:description" content="Um grupo terapêutico online para mulheres que desejam fortalecer sua identidade e resgatar sua força interior." />

                <link rel="canonical" href="https://arianaborges.com/clube-livro-mulher-maravilha" />
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
