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

const Portal5_5: React.FC = () => {
    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>Portal 5/5 — Mesa de Salomão Coletiva + Ativação da Kundalini | Ariana Borges</title>
                <meta name="description" content="5 de Maio: Portal 5/5 online às 20h. Mesa de Salomão Coletiva e Ativação da Kundalini para reorganizar caminhos, romper padrões e mover sua vida." />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://portal.arianaborges.com/" />
                <meta property="og:title" content="Portal 5/5 — Mesa de Salomão Coletiva + Ativação da Kundalini" />
                <meta property="og:description" content="5 de Maio às 20h, online. Um portal de ruptura de padrões e aceleração de destino. Mesa de Salomão + Kundalini por R$198." />
                <meta property="og:image" content="https://portal.arianaborges.com/og-portal-5-5.png" />
                <meta property="og:site_name" content="Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Portal 5/5 — Mesa de Salomão Coletiva + Ativação da Kundalini" />
                <meta name="twitter:description" content="5 de Maio às 20h, online. Movimento, ruptura e abertura de caminhos." />
                <meta name="twitter:image" content="https://portal.arianaborges.com/og-portal-5-5.png" />

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
