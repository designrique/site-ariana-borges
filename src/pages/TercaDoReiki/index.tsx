import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ArrowDown, Check, ChevronDown, Clock, Heart, Leaf,
    MapPin, MessageCircle, Sparkles,
} from 'lucide-react';
import { trackProductEvent } from '@/lib/metaTracking';
import {
    DURACAO_MIN,
    HORARIOS,
    LOCAL,
    PRECO_BRL,
    buildAgendarWhatsAppUrl,
    buildDuvidasWhatsAppUrl,
} from './whatsapp';

const CONTENT_NAME = 'Terca do Reiki - Sessao Individual - Recife';
const CONTENT_CATEGORY = 'reiki_presencial_recife';

const trackData = (source: string) => ({
    currency: 'BRL',
    value: PRECO_BRL,
    content_name: CONTENT_NAME,
    content_category: CONTENT_CATEGORY,
    source,
});

// ————————————————————————————————————————————————————————————— Hero

const Hero: React.FC = () => (
    <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige"
    >
        <div className="absolute inset-0 z-0 bg-[#0a0420]" aria-hidden="true">
            <div
                className="absolute inset-0 opacity-90"
                style={{
                    background:
                        'radial-gradient(circle at 50% 65%, rgba(212,175,55,0.28) 0%, rgba(106,75,184,0.42) 30%, rgba(20,8,40,0.95) 70%, #0a0420 100%)',
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-2/3 opacity-60 mix-blend-screen"
                style={{
                    background:
                        'radial-gradient(ellipse 40% 90% at 50% 100%, rgba(255,190,120,0.30), transparent 70%)',
                    animation: 'portal-pulse 7s ease-in-out infinite',
                }}
            />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-purple-950/70 text-white border border-brand-gold/40 text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                Toda terça · Presencial · Recife
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-3">
                Terça do Reiki
                <span className="block text-3xl sm:text-4xl md:text-5xl text-brand-gold mt-2">
                    sessão individual, {DURACAO_MIN} minutos
                </span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-200 mb-4 max-w-2xl leading-relaxed mt-4">
                {DURACAO_MIN} minutos só seus, no meio da semana, para o corpo desacelerar de verdade.
                Reiki é imposição de mãos: você deita, vestida, e recebe. Sem esforço, sem manipulação —
                só descanso profundo.
            </p>

            <p className="font-sans text-sm text-brand-gold mt-2 mb-10 uppercase tracking-[0.2em]">
                R$ {PRECO_BRL} · {DURACAO_MIN} min · agendamento pelo WhatsApp
            </p>

            <a
                href="#agendar"
                className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-goldLight"
            >
                Escolher meu horário
                <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
            </a>
        </div>
    </section>
);

// ————————————————————————————————————————————————————— O que é o Reiki

const beneficios = [
    'Relaxamento profundo e uma pausa real no meio da semana.',
    'Alívio da sensação de estresse e ansiedade acumulados.',
    'Costuma soltar a tensão do corpo — ombros, mandíbula, respiração.',
    'Muita gente relata dormir melhor na noite seguinte.',
    'Uma sensação de leveza e clareza quando você levanta da maca.',
];

const OQueEReiki: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-goldDark font-bold mb-5">
                <Leaf size={14} aria-hidden="true" /> O que é o Reiki
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
                Não é algo que você faz.
                <span className="block text-brand-lilacDark">É algo que você recebe.</span>
            </h2>

            <div className="space-y-6 font-sans text-lg leading-relaxed text-brand-dark/85">
                <p>
                    O Reiki é uma prática japonesa de imposição de mãos. Na sessão, você fica deitada e
                    vestida numa maca confortável, e a Ariana posiciona as mãos sobre pontos do corpo. Não
                    tem agulha, não tem massagem, não tem esforço da sua parte. É só receber.
                </p>
                <p>
                    A proposta é simples e honesta: criar um espaço para o seu sistema nervoso sair do modo
                    alerta e voltar para o modo descanso — aquele que a correria da semana quase nunca deixa
                    acontecer.
                </p>
            </div>

            <ul className="space-y-4 mt-10">
                {beneficios.map((b) => (
                    <li key={b} className="flex gap-4 items-start">
                        <span className="mt-0.5 p-1 rounded-full bg-brand-gold/20 text-brand-goldDark shrink-0">
                            <Heart size={14} aria-hidden="true" />
                        </span>
                        <span className="font-sans text-lg leading-relaxed text-brand-dark/85">{b}</span>
                    </li>
                ))}
            </ul>

            <p className="font-sans text-sm text-brand-dark/60 mt-8 border-l-2 border-brand-gold/40 pl-5 leading-relaxed">
                O Reiki é uma prática de relaxamento e cuidado, complementar. Não substitui acompanhamento
                médico ou psicológico — caminha junto com ele.
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————— Como é a sessão

const ComoESessao: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-dark text-brand-beige">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
                <img
                    src="/fotos-hero/hero-maos-cura-energetica-ariana-borges.webp"
                    alt="Mãos em cura energética durante uma sessão de Reiki com Ariana Borges"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                    loading="lazy"
                />
            </div>

            <div className="order-1 md:order-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-5">
                    <Sparkles size={14} aria-hidden="true" /> Como é a sessão
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                    {DURACAO_MIN} minutos para não fazer nada
                </h2>
                <div className="space-y-5 font-sans text-lg leading-relaxed text-gray-300">
                    <p>
                        Você chega, tira os sapatos e deita na maca — vestida, coberta se quiser. A luz é
                        baixa, o som é suave.
                    </p>
                    <p>
                        Durante os {DURACAO_MIN} minutos, a Ariana conduz a sessão com as mãos sobre pontos
                        do corpo. Você não precisa conversar, controlar a respiração ou "fazer certo". A
                        maioria das pessoas relaxa tão fundo que quase dorme.
                    </p>
                    <p className="text-base text-gray-400 border-l-2 border-brand-gold/40 pl-5">
                        No fim, você levanta no seu tempo, bebe uma água e volta para o dia com o corpo mais
                        leve. É isso — e é mais raro do que parece conseguir isso numa terça-feira.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————————— Agendar

const HorarioButton: React.FC<{ horario: string }> = ({ horario }) => (
    <a
        href={buildAgendarWhatsAppUrl(horario)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackProductEvent('Lead', 'generate_lead', trackData(`horario_${horario}`))}
        className="flex flex-col items-center justify-center gap-1 py-5 rounded-2xl bg-white border-2 border-brand-gold/30 text-brand-dark font-sans font-bold text-xl hover:border-brand-gold hover:bg-brand-gold/10 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
    >
        <Clock size={18} className="text-brand-goldDark" aria-hidden="true" />
        {horario}
    </a>
);

const Agendar: React.FC = () => (
    <section id="agendar" className="py-20 md:py-28 bg-brand-lilac/30 text-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-lilacDark font-bold mb-4">
                    Reserve seu horário
                </span>
                <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">
                    Escolha um horário desta terça
                </h2>
                <p className="font-sans text-lg text-brand-dark/70 max-w-xl mx-auto">
                    Toque no horário que combina com você. Ele abre uma conversa no WhatsApp com a mensagem
                    pronta — a Ariana confirma a sua vaga daquela terça.
                </p>
            </div>

            <div className="rounded-3xl bg-white shadow-xl border border-brand-gold/20 p-6 md:p-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-sans align-top mr-1">R$</span>
                        <span className="text-6xl md:text-7xl font-bold font-sans text-brand-dark leading-none">
                            {PRECO_BRL}
                        </span>
                    </div>
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-dark/60 mt-2">
                        Sessão individual · {DURACAO_MIN} minutos
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    {HORARIOS.map((h) => (
                        <HorarioButton key={h} horario={h} />
                    ))}
                </div>

                <p className="text-center text-sm text-brand-dark/60 mt-8">
                    Vagas limitadas por horário · pagamento (Pix ou presencial) combinado no WhatsApp
                </p>

                <p className="text-center text-sm text-brand-dark/70 mt-4">
                    Ficou com alguma dúvida?{' '}
                    <a
                        href={buildDuvidasWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductEvent('Lead', 'generate_lead', trackData('duvidas_whatsapp'))}
                        className="font-bold text-brand-goldDark underline underline-offset-2 hover:text-brand-dark"
                    >
                        Fale com a Ariana
                    </a>
                </p>
            </div>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————————— Local

const Local: React.FC = () => (
    <section className="py-20 md:py-28 bg-white text-brand-dark">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-goldDark font-bold mb-5">
                    <MapPin size={14} aria-hidden="true" /> Onde acontece
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                    No Instituto, em Recife
                </h2>
                <address className="not-italic font-sans text-lg leading-relaxed text-brand-dark/85 space-y-1">
                    <p className="font-bold">{LOCAL.linha1}</p>
                    <p>{LOCAL.linha2}</p>
                    <p>{LOCAL.bairro} · {LOCAL.cidade} – {LOCAL.estado}</p>
                </address>
                <p className="font-sans text-sm text-brand-dark/60 mt-6 leading-relaxed">
                    Fácil acesso e estacionamento na região. Chegue uns 10 minutos antes para começar a
                    sessão já respirando.
                </p>
            </div>

            <div className="w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl border border-brand-gold/15">
                <iframe
                    title="Localização do Instituto Ariana Borges em Recife"
                    src={`https://maps.google.com/maps?q=${LOCAL.mapsQuery}&output=embed&hl=pt-BR&z=17`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————————— Ariana

const Ariana: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[240px_1fr] gap-10 items-center">
            <img
                src="/perfil-ariana-borges.webp"
                alt="Ariana Borges, terapeuta holística e reikiana"
                className="rounded-2xl shadow-xl w-full max-w-[240px] mx-auto object-cover aspect-[3/4]"
                loading="lazy"
            />
            <div>
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-goldDark font-bold mb-4">
                    Quem conduz
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-5 leading-tight">Ariana Borges</h2>
                <div className="space-y-4 font-sans text-brand-dark/80 leading-relaxed">
                    <p>
                        Terapeuta holística e instrutora de ThetaHealing®, Ariana conduz há anos processos
                        de autoconhecimento — individuais, em grupo e em retiros — com uma mistura rara de
                        sensibilidade e pé no chão.
                    </p>
                    <p>
                        Não promete milagre e não usa mistério como isca. Na Terça do Reiki, o convite é
                        pequeno e concreto: parar, descansar e sair mais leve do que entrou.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————— FAQ

const faq = [
    {
        q: 'Preciso acreditar em Reiki para funcionar?',
        a: 'Não. Você não precisa fazer nada além de deitar e receber. Muita gente chega cética e sai surpresa com o quanto o corpo relaxou.',
    },
    {
        q: 'Como é a sessão, na prática?',
        a: `Você fica deitada, vestida, numa maca confortável. São ${DURACAO_MIN} minutos com a Ariana posicionando as mãos sobre pontos do corpo. Sem agulha, sem massagem, sem manipulação.`,
    },
    {
        q: 'Reiki substitui tratamento médico?',
        a: 'Não. Reiki é uma prática de relaxamento e cuidado, complementar — nunca substitui acompanhamento médico ou psicológico. Continue com os seus normalmente.',
    },
    {
        q: 'Como agendo e pago?',
        a: `Você escolhe o horário aqui na página, fala com a Ariana no WhatsApp para confirmar a vaga daquela terça, e o pagamento de R$ ${PRECO_BRL} é combinado direto com ela — Pix na hora ou presencial.`,
    },
    {
        q: 'Preciso levar alguma coisa?',
        a: 'Só você. Roupa confortável ajuda. O resto está no espaço.',
    },
    {
        q: 'Estou grávida ou tenho uma condição de saúde. Posso participar?',
        a: 'O Reiki é suave e não invasivo. Ainda assim, se você tem alguma condição, comente com a Ariana no WhatsApp antes — ela te orienta com honestidade.',
    },
];

const FAQ: React.FC = () => (
    <section className="py-20 md:py-28 bg-white text-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-5xl mb-10 leading-tight text-center">
                Perguntas que sempre chegam
            </h2>
            <div className="divide-y divide-brand-lilac">
                {faq.map(({ q, a }) => (
                    <details key={q} className="group py-5">
                        <summary className="flex justify-between items-start gap-4 cursor-pointer list-none font-sans font-bold text-lg text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">
                            {q}
                            <ChevronDown
                                size={20}
                                className="shrink-0 mt-1 text-brand-goldDark transition-transform group-open:rotate-180"
                                aria-hidden="true"
                            />
                        </summary>
                        <p className="mt-3 font-sans text-brand-dark/75 leading-relaxed pr-8">{a}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————— CTA final

const CTAFinal: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-dark text-brand-beige text-center">
        <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                Esta terça pode ser diferente.
            </h2>
            <p className="font-sans text-lg text-gray-300 mb-10 leading-relaxed">
                {DURACAO_MIN} minutos de descanso profundo, por R$ {PRECO_BRL}. Escolha um horário e deixe o
                resto com a Ariana.
            </p>
            <a
                href="#agendar"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-goldLight"
            >
                <MessageCircle size={20} aria-hidden="true" />
                Escolher meu horário
            </a>
            <p className="font-sans text-xs text-gray-400 mt-6 tracking-widest uppercase">
                Toda terça · {LOCAL.cidade} · R$ {PRECO_BRL} · {DURACAO_MIN} min
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————— Página

const TercaDoReiki: React.FC = () => {
    React.useEffect(() => {
        trackProductEvent('ViewContent', 'view_item', trackData('landing_view'), 'terca-do-reiki-view-tracked');
    }, []);

    const title = 'Terça do Reiki — Sessão Individual em Recife | Ariana Borges';
    const description = `Toda terça, sessão individual de Reiki de ${DURACAO_MIN} minutos por R$ ${PRECO_BRL}, presencial em Recife. Escolha seu horário (7h às 14h) e agende pelo WhatsApp.`;
    const url = 'https://arianaborges.com/terca-do-reiki';
    // Interino: OG genérico da marca (existe no repo). Trocar por /og-terca-do-reiki.jpg (1200×630) quando houver arte dedicada.
    const ogImage = 'https://arianaborges.com/og-image.png';

    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="Instituto Ariana Borges" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:locale" content="pt_BR" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />

                <link rel="canonical" href={url} />

                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    serviceType: 'Sessão individual de Reiki',
                    name: 'Terça do Reiki — Sessão Individual',
                    description:
                        `Sessão individual de Reiki de ${DURACAO_MIN} minutos, presencial em ${LOCAL.cidade}, toda terça-feira.`,
                    provider: {
                        '@type': 'Organization',
                        name: 'Instituto Ariana Borges',
                        url: 'https://arianaborges.com',
                    },
                    areaServed: { '@type': 'City', name: LOCAL.cidade },
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: LOCAL.linha1,
                        addressLocality: LOCAL.cidade,
                        addressRegion: LOCAL.estado,
                        addressCountry: 'BR',
                    },
                    offers: {
                        '@type': 'Offer',
                        price: PRECO_BRL,
                        priceCurrency: 'BRL',
                        availability: 'https://schema.org/InStock',
                        url,
                    },
                })}</script>
            </Helmet>

            <a
                href="#hero"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50"
            >
                Pular para o conteúdo principal
            </a>

            <Hero />
            <OQueEReiki />
            <ComoESessao />
            <Agendar />
            <Local />
            <Ariana />
            <FAQ />
            <CTAFinal />
        </div>
    );
};

export default TercaDoReiki;
