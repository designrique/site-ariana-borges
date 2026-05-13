import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCurrentPortal } from '@/hooks/useCurrentPortal';

const WHATSAPP_NUMBER = '551153041409';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá Ariana! Vim do link do seu Instagram 🙏');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Eventos com data fixa — escondem automaticamente apos D+1
const DNA_BASICO_END_DATE = new Date('2026-05-18T00:00:00-03:00'); // D+1 do 17/05
const ENCONTRO_DEUSAS_END_DATE = new Date('2026-09-14T00:00:00-03:00'); // D+1 do 13/09

interface BioLink {
    icon: string;        // path em /bio-icons
    title: string;
    subtitle: string;
    href: string;
    target?: string;
    highlight?: boolean; // destaque dourado para eventos ativos
}

const LinkInBio: React.FC = () => {
    const portal = useCurrentPortal();
    const now = new Date();
    const showDnaBasico = now < DNA_BASICO_END_DATE;
    const showEncontroDeusas = now < ENCONTRO_DEUSAS_END_DATE;

    const eventos: BioLink[] = [
        {
            icon: '/bio-icons/portal.webp',
            title: `${portal.title} — ${portal.displayDate} · ${portal.displayTime}`,
            subtitle: portal.tagline,
            href: 'https://portal.arianaborges.com',
            target: '_blank',
            highlight: true,
        },
        ...(showDnaBasico ? [{
            icon: '/bio-icons/dna-basico.webp',
            title: 'DNA Básico — 15, 16 e 17 de Maio',
            subtitle: 'Imersão presencial em Recife · Certificação ThetaHealing®',
            href: 'https://dnabasico.arianaborges.com',
            target: '_blank',
            highlight: true,
        }] : []),
        ...(showEncontroDeusas ? [{
            icon: '/bio-icons/encontro-deusas.webp',
            title: 'Encontro das Deusas — 11 a 13 de Setembro',
            subtitle: 'Imersão feminina em Bonito/PE · Lua Nova em Virgem',
            href: 'https://encontrodeusas.arianaborges.com',
            target: '_blank',
            highlight: true,
        }] : []),
    ];

    const servicos: BioLink[] = [
        { icon: '/bio-icons/thetahealing.webp',           title: 'ThetaHealing® — Conheça a técnica',     subtitle: 'Reprograme crenças que sabotam sua vida', href: '/thetahealing' },
        { icon: '/bio-icons/terapia-individual.webp',     title: 'Terapia Individual',                    subtitle: 'Sessões 1-a-1 com Ariana',                href: '/terapia-individual' },
        { icon: '/bio-icons/formacao.webp',               title: 'Formação de Terapeutas',                subtitle: 'Torne-se terapeuta certificado ThetaHealing®', href: '/formacao-de-terapeutas' },
        { icon: '/bio-icons/autoconhecimento-grupo.webp', title: 'Autoconhecimento em Grupo',             subtitle: 'Encontros mensais de transformação coletiva', href: '/autoconhecimento-em-grupo' },
    ];

    const conteudo: BioLink[] = [
        { icon: '/bio-icons/blog.webp',  title: 'Blog & Reflexões', subtitle: 'Conteúdo gratuito sobre transformação',    href: '/blog' },
        { icon: '/bio-icons/sobre.webp', title: 'Quem é Ariana',    subtitle: 'Instrutora Master & Science ThetaHealing®', href: '/sobre' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0916] via-[#12102b] to-[#0b0916] text-[#F9F7F2]">
            <Helmet>
                <title>Ariana Borges · ThetaHealing & Terapia | Links</title>
                <meta name="description" content="Acesso direto a todos os eventos, serviços e conteúdos do Instituto Ariana Borges." />
                <meta name="robots" content="noindex, follow" />
                <meta property="og:title" content="Ariana Borges · Links" />
                <meta property="og:description" content="Eventos ativos, serviços e contato direto." />
                <meta property="og:image" content="https://arianaborges.com/perfil-ariana-borges.webp" />
            </Helmet>

            <div className="max-w-md mx-auto px-5 py-10">
                {/* HEADER */}
                <header className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10">
                        <img
                            src="/perfil-ariana-borges.webp"
                            alt="Ariana Borges"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="font-serif text-3xl mb-1">Ariana Borges</h1>
                    <p className="font-sans text-sm text-[#F9F7F2]/70 mb-2">
                        ThetaHealing® · Terapia Holística · Espiritualidade
                    </p>
                    <a
                        href="https://instagram.com/institutoarianaborges"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-sans text-xs text-[#D4AF37] hover:text-[#E0BD5C] transition-colors"
                    >
                        @institutoarianaborges
                    </a>
                </header>

                {/* EVENTOS ATIVOS */}
                {eventos.length > 0 && (
                    <Section label="EVENTOS ATIVOS">
                        {eventos.map((link, i) => (
                            <LinkCard key={i} {...link} />
                        ))}
                    </Section>
                )}

                {/* SERVIÇOS */}
                <Section label="SERVIÇOS">
                    {servicos.map((link, i) => (
                        <LinkCard key={i} {...link} />
                    ))}
                </Section>

                {/* CONTEÚDO */}
                <Section label="CONTEÚDO">
                    {conteudo.map((link, i) => (
                        <LinkCard key={i} {...link} />
                    ))}
                </Section>

                {/* WHATSAPP CTA */}
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1ebe5d] hover:to-[#0f7567] text-white font-sans font-bold py-4 px-6 rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-[1.02] text-center"
                >
                    <div className="flex items-center justify-center gap-3">
                        <img src="/bio-icons/whatsapp.webp" alt="" className="w-7 h-7 brightness-0 invert" />
                        <div className="text-left">
                            <p className="text-base">Falar pelo WhatsApp</p>
                            <p className="text-xs font-normal opacity-90">Atendimento personalizado · resposta rápida</p>
                        </div>
                    </div>
                </a>

                {/* FOOTER */}
                <footer className="mt-10 text-center">
                    <p className="font-sans text-xs text-[#F9F7F2]/40">
                        Instituto Ariana Borges
                    </p>
                </footer>
            </div>
        </div>
    );
};

// ============================================================
// COMPONENTES
// ============================================================

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <section className="mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#D4AF37]/40"></span>
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
                {label}
            </span>
            <span className="h-px w-8 bg-[#D4AF37]/40"></span>
        </div>
        <div className="space-y-3">{children}</div>
    </section>
);

const LinkCard: React.FC<BioLink> = ({ icon, title, subtitle, href, target, highlight }) => {
    const isExternal = target === '_blank';
    const baseClasses = `block group rounded-2xl px-4 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]`;
    const variantClasses = highlight
        ? 'bg-gradient-to-r from-[#3A2878]/80 to-[#12102b]/80 border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10 hover:border-[#D4AF37]/70'
        : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/8';

    return (
        <a
            href={href}
            target={target}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`${baseClasses} ${variantClasses}`}
        >
            <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ${highlight ? 'ring-1 ring-[#D4AF37]/40' : ''}`}>
                    <img src={icon} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`font-sans font-semibold text-sm leading-tight ${highlight ? 'text-white' : 'text-[#F9F7F2]'}`}>
                        {title}
                    </p>
                    <p className="font-sans text-xs text-[#F9F7F2]/60 mt-1 leading-snug">
                        {subtitle}
                    </p>
                </div>
                <span className={`flex-shrink-0 text-lg ${highlight ? 'text-[#D4AF37]' : 'text-[#F9F7F2]/30'} group-hover:translate-x-1 transition-transform`}>
                    →
                </span>
            </div>
        </a>
    );
};

export default LinkInBio;
