import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from './components/HeroSection';
import PortalEssenceSection from './components/PortalEssenceSection';
import ThreeLevelsSection from './components/ThreeLevelsSection';
import MesaSalomaoSection from './components/MesaSalomaoSection';
import AstrologySection from './components/AstrologySection';
import KundaliniSection from './components/KundaliniSection';
import AfterPortalSection from './components/AfterPortalSection';
import PricingSection from './components/PricingSection';
import FinalCTASection from './components/FinalCTASection';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const Portal5_5: React.FC = () => {
    const portal = useCurrentPortal();
    const ogImage = `https://portal.arianaborges.com/og-portal-${portal.id}.png`;
    const titleFull = `${portal.title} — Mesa de Salomão + Ativação da Kundalini AO VIVO | Ariana Borges`;
    const desc = `${portal.displayDate}: ${portal.title} online às ${portal.displayTime}. ${portal.tagline} Mesa de Salomão + Kundalini AO VIVO.`;
    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>{titleFull}</title>
                <meta name="description" content={desc} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://portal.arianaborges.com/" />
                <meta property="og:title" content={titleFull} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:site_name" content="Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={titleFull} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={ogImage} />

                <link rel="canonical" href="https://portal.arianaborges.com/" />
            </Helmet>

            <a href="#hero_section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50">
                Pular para o conteúdo principal
            </a>

            <HeroSection />
            <PortalEssenceSection />
            <ThreeLevelsSection />
            <MesaSalomaoSection />
            <AstrologySection />
            <KundaliniSection />
            <AfterPortalSection />
            <PricingSection />
            <FinalCTASection />
        </div>
    );
};

export default Portal5_5;
