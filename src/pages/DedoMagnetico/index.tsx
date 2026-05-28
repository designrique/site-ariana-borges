import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import TruthSection from './components/TruthSection';
import AboutCourseSection from './components/AboutCourseSection';
import DiscoverSection from './components/DiscoverSection';
import IdentificationSection from './components/IdentificationSection';
import ImagineSection from './components/ImagineSection';
import ReceiveSection from './components/ReceiveSection';
import TherapistSection from './components/TherapistSection';
import FinalCTASection from './components/FinalCTASection';

const DedoMagnetico: React.FC = () => {
    useEffect(() => {
        // Widget popup do Hotmart so no desktop — no mobile o popup e instavel
        // e o botao navega direto pro checkout (ver FinalCTASection).
        // Injeta apenas o script (sem o CSS, que estiliza o botao verde padrao
        // e conflitaria com o nosso design custom).
        if (!window.matchMedia('(min-width: 769px)').matches) return;
        const scriptId = 'hotmart-checkout-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://static.hotmart.com/checkout/widget.min.js';
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>Dedo Magnético® | Pare de atrair relações que machucam — Ariana Borges</title>
                <meta name="description" content="Curso online com Ariana Borges para mulheres que querem romper padrões inconscientes, fortalecer a autoestima e construir relacionamentos saudáveis e verdadeiros." />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arianaborges.com/dedo-magnetico" />
                <meta property="og:title" content="Dedo Magnético® | Pare de atrair relações que machucam — Ariana Borges" />
                <meta property="og:description" content="Uma jornada profunda de autoconhecimento e transformação emocional para você compreender por que continua atraindo determinadas pessoas e aprender a romper padrões que sabotam sua vida amorosa." />
                <meta property="og:image" content="https://arianaborges.com/og-dedo-magnetico.jpg" />
                <meta property="og:image:secure_url" content="https://arianaborges.com/og-dedo-magnetico.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:alt" content="Dedo Magnético® - Curso online com Ariana Borges" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Instituto Ariana Borges" />
                <meta property="og:locale" content="pt_BR" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Dedo Magnético® | Pare de atrair relações que machucam" />
                <meta name="twitter:description" content="Curso online com Ariana Borges para romper padrões e construir relacionamentos conscientes." />
                <meta name="twitter:image" content="https://arianaborges.com/og-dedo-magnetico.jpg" />

                <link rel="canonical" href="https://arianaborges.com/dedo-magnetico" />
            </Helmet>

            <a href="#hero_section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50">
                Pular para o conteúdo principal
            </a>

            <HeroSection />
            <StorySection />
            <TruthSection />
            <AboutCourseSection />
            <DiscoverSection />
            <IdentificationSection />
            <ImagineSection />
            <ReceiveSection />
            <TherapistSection />
            <FinalCTASection />
        </div>
    );
};

export default DedoMagnetico;
