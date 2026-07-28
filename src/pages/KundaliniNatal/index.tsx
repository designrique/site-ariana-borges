import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
    ArrowDown, Calendar, Check, ChevronDown, Clock, Feather,
    Flame, MapPin, MessageCircle, Sparkles, Users,
} from 'lucide-react';
import { trackProductEvent } from '@/lib/metaTracking';
import {
    AURA_INDIVIDUAL_DE_BRL,
    AURA_INDIVIDUAL_POR_BRL,
    EVENTO,
    LOTE_1_PRICE_BRL,
    LOTE_2_PRICE_BRL,
    VAGAS_TOTAIS,
    buildAuraWhatsAppUrl,
    buildCheckoutUrl,
    buildDuvidasWhatsAppUrl,
    currentPriceBRL,
    isLote1,
} from './checkout';

const CONTENT_NAME = 'Ativacao da Kundalini em Grupo - Natal/RN';
const CONTENT_CATEGORY = 'kundalini_presencial_natal';

const trackData = (source: string) => ({
    currency: 'BRL',
    value: currentPriceBRL(),
    content_name: CONTENT_NAME,
    content_category: CONTENT_CATEGORY,
    source,
});

// ————————————————————————————————————————————————————————————— Hero

const Hero: React.FC<{ price: number; lote1: boolean }> = ({ price, lote1 }) => (
    <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark text-brand-beige"
    >
        <div className="absolute inset-0 z-0 bg-[#0a0420]" aria-hidden="true">
            <div
                className="absolute inset-0 opacity-90"
                style={{
                    background:
                        'radial-gradient(circle at 50% 65%, rgba(212,175,55,0.30) 0%, rgba(106,75,184,0.45) 30%, rgba(20,8,40,0.95) 70%, #0a0420 100%)',
                }}
            />
            <div
                className="absolute inset-x-0 bottom-0 h-2/3 opacity-60 mix-blend-screen"
                style={{
                    background:
                        'radial-gradient(ellipse 40% 90% at 50% 100%, rgba(255,170,80,0.35), transparent 70%)',
                    animation: 'portal-pulse 7s ease-in-out infinite',
                }}
            />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-purple-950/70 text-white border border-brand-gold/40 text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                {EVENTO.data} · {EVENTO.diaSemana} · {EVENTO.hora} · {EVENTO.cidade}
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-3">
                Ativação da Kundalini
                <span className="block text-3xl sm:text-4xl md:text-5xl text-brand-gold mt-2">
                    em grupo, presencial
                </span>
            </h1>

            <p className="font-serif italic text-brand-goldLight text-xl sm:text-2xl mb-8">
                com Leitura de Aura do Beija-Flor
            </p>

            <p className="font-sans text-lg md:text-xl text-gray-200 mb-4 max-w-2xl leading-relaxed">
                Uma noite em Natal para despertar a força que dorme na base da sua coluna —
                e finalmente enxergar o que o seu campo anda dizendo sobre você.
            </p>

            <p className="font-sans text-sm text-brand-gold mb-10 uppercase tracking-[0.2em]">
                Apenas {VAGAS_TOTAIS} vagas
            </p>

            <a
                href="#investimento"
                className="group bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-goldLight"
            >
                Quero minha vaga
                <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
            </a>

            <p className="font-sans text-xs text-gray-400 mt-6 tracking-widest uppercase">
                {lote1 ? '1º lote' : '2º lote'} · R$ {price} · Pix, cartão ou parcelado
            </p>
        </div>
    </section>
);

// ———————————————————————————————————————————————————— Identificação

const dores = [
    'Você faz terapia, lê, medita — e mesmo assim tem a sensação de viver no automático.',
    'A energia acaba antes do dia acabar. Você acorda cansada.',
    'Sente que existe uma força grande dentro de você, mas não sabe por onde ela sai.',
    'Repete os mesmos padrões: mesmos relacionamentos, mesmos medos, mesmas travas.',
    'Quer entender o que você carrega no campo — não só o que pensa sobre si mesma.',
];

const Identificacao: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl mb-8 leading-tight">
                Talvez você já tenha percebido
            </h2>
            <ul className="space-y-5 mb-10">
                {dores.map((dor) => (
                    <li key={dor} className="flex gap-4 items-start">
                        <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-brand-gold" aria-hidden="true" />
                        <span className="font-sans text-lg leading-relaxed text-brand-dark/85">{dor}</span>
                    </li>
                ))}
            </ul>
            <p className="font-serif text-2xl md:text-3xl italic text-brand-lilacDark leading-snug">
                Não é falta de esforço. É energia parada.
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————— O que é Kundalini

const Kundalini: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-dark text-brand-beige">
        <div className="max-w-3xl mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-5">
                <Flame size={14} aria-hidden="true" /> O que é a ativação
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">
                A Kundalini não é algo que você aprende.
                <span className="block text-brand-gold">É algo que você lembra.</span>
            </h2>

            <div className="space-y-6 font-sans text-lg leading-relaxed text-gray-300">
                <p>
                    A tradição descreve a Kundalini como a força vital que fica enrolada e adormecida
                    na base da coluna. Ela não some — ela espera. E enquanto espera, a vida vai
                    acontecendo em economia: o suficiente para funcionar, nunca o suficiente para viver.
                </p>
                <p>
                    <strong className="text-white font-normal">Ativar</strong> é abrir passagem para
                    essa energia subir. Ela atravessa os centros energéticos um a um — a base, o ventre,
                    o plexo, o coração, a garganta, o olhar, o topo da cabeça — e onde há nó, ela avisa.
                    Às vezes com calor. Às vezes com choro. Às vezes com um silêncio que você não sentia
                    havia anos.
                </p>
                <p>
                    Em grupo, isso muda de escala. Doze pessoas respirando no mesmo ritmo criam um campo
                    que sustenta o que cada uma sozinha não sustentaria. Você não precisa fazer força —
                    precisa deixar acontecer.
                </p>
                <p className="text-base text-gray-400 border-l-2 border-brand-gold/40 pl-5">
                    A condução é gradual e presencial, do começo ao fim. Cada corpo responde do seu jeito
                    e no seu tempo — não existe reação certa, e nada aqui exige que você entregue mais do
                    que está disponível para entregar naquela noite.
                </p>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————— Leitura de Aura

const LeituraAura: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-lilac/30 text-brand-dark">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-lilacDark font-bold mb-5">
                    <Feather size={14} aria-hidden="true" /> Leitura de Aura
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                    Por que Beija-Flor
                </h2>
                <div className="space-y-5 font-sans text-lg leading-relaxed text-brand-dark/85">
                    <p>
                        O beija-flor é o único que consegue parar no ar. Ele não força a flor, não arranca
                        nada: chega leve, pousa no que é doce e enxerga néctar onde os outros só veem
                        planta.
                    </p>
                    <p>
                        A leitura funciona assim. Não é diagnóstico, não é julgamento, não é previsão do
                        futuro. Ariana lê o seu campo de forma intuitiva e devolve em palavras o que está
                        ali: as cores que dominam, o que anda pesado, o que já está pedindo passagem e o
                        que você vem carregando sem perceber que carrega.
                    </p>
                    <p>
                        <strong className="font-normal text-brand-lilacDark">
                            Cada uma das {VAGAS_TOTAIS} participantes recebe a sua leitura durante o
                            encontro
                        </strong>{' '}
                        — antes da ativação, para você entrar sabendo onde está; e o grupo inteiro escuta,
                        porque quase sempre o que aparece no campo de uma diz algo sobre o campo de todas.
                    </p>
                </div>
            </div>

            <div className="relative">
                <img
                    src="/fotos-hero/hero-maos-cura-energetica-ariana-borges.webp"
                    alt="Mãos em cura energética durante atendimento com Ariana Borges"
                    className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                    loading="lazy"
                />
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————— Como funciona

const roteiro = [
    { hora: '19h', titulo: 'Abertura do círculo', texto: 'Chegada, acolhimento e alinhamento do campo do grupo. Você chega, respira e para.' },
    { hora: '19h30', titulo: 'Leitura de Aura do Beija-Flor', texto: `A leitura individual de cada uma das ${VAGAS_TOTAIS} participantes, conduzida por Ariana.` },
    { hora: '20h', titulo: 'Ativação da Kundalini', texto: 'Respiração, som e condução energética para a energia subir pelos centros — no seu tempo.' },
    { hora: '21h', titulo: 'Integração', texto: 'Água, silêncio e partilha. O momento em que o que subiu encontra lugar para ficar.' },
];

const ComoFunciona: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
        <div className="max-w-3xl mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-goldDark font-bold mb-5">
                <Sparkles size={14} aria-hidden="true" /> A noite
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">Como funciona o encontro</h2>
            <p className="font-sans text-lg text-brand-dark/70 mb-12">
                {EVENTO.diaSemana.charAt(0).toUpperCase() + EVENTO.diaSemana.slice(1)}, {EVENTO.data},
                a partir das {EVENTO.hora}, em {EVENTO.cidade}. Cerca de três horas.
            </p>

            <ol className="relative border-l-2 border-brand-gold/30 pl-8 space-y-10">
                {roteiro.map((item) => (
                    <li key={item.hora} className="relative">
                        <span
                            className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-brand-gold ring-4 ring-brand-beige"
                            aria-hidden="true"
                        />
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-brand-goldDark font-bold">
                            {item.hora}
                        </span>
                        <h3 className="font-serif text-2xl mt-1 mb-2">{item.titulo}</h3>
                        <p className="font-sans text-brand-dark/75 leading-relaxed">{item.texto}</p>
                    </li>
                ))}
            </ol>

            <div className="mt-12 rounded-2xl bg-white border border-brand-gold/25 p-6 flex gap-4 items-start">
                <MapPin size={22} className="text-brand-goldDark shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-sans text-brand-dark/80 leading-relaxed">
                    <strong className="font-bold">Onde:</strong> {EVENTO.cidade}. O endereço completo é
                    enviado por WhatsApp assim que a sua inscrição é confirmada — é um encontro pequeno,
                    em espaço reservado.
                </p>
            </div>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————— Investimento

const inclui = [
    'Ativação da Kundalini em grupo, presencial, conduzida do início ao fim',
    'Sua Leitura de Aura do Beija-Flor, individual, dentro do encontro',
    'Círculo de no máximo 12 pessoas — espaço para você ser vista',
    'Integração guiada ao final, para o que subiu não se perder',
    'Endereço e orientações enviados por WhatsApp após a confirmação',
];

const Investimento: React.FC<{ price: number; lote1: boolean }> = ({ price, lote1 }) => (
    <section id="investimento" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
        <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-4">
                    Sua vaga
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-3 leading-tight">
                    São {VAGAS_TOTAIS} lugares no círculo
                </h2>
                <p className="font-sans text-brand-lilac/80">
                    Quando fecham, fecham. Não abrimos exceção — o tamanho do grupo é parte do trabalho.
                </p>
            </div>

            <div className="relative rounded-3xl bg-gradient-to-br from-brand-gold to-brand-goldDark text-brand-dark p-1 shadow-2xl shadow-brand-gold/20">
                <div className="bg-[#fdf6e3] rounded-3xl p-8 md:p-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark text-brand-gold px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-md whitespace-nowrap">
                        {lote1 ? '1º lote' : '2º lote'}
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8 text-xs uppercase tracking-widest text-brand-dark/70 font-bold">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar size={14} aria-hidden="true" /> {EVENTO.data}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={14} aria-hidden="true" /> {EVENTO.hora}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} aria-hidden="true" /> {EVENTO.cidade}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Users size={14} aria-hidden="true" /> {VAGAS_TOTAIS} vagas
                        </span>
                    </div>

                    <div className="text-center mb-8">
                        {!lote1 && (
                            <p className="font-sans text-sm text-brand-dark/50 line-through mb-1">
                                1º lote R$ {LOTE_1_PRICE_BRL} — encerrado
                            </p>
                        )}
                        <div>
                            <span className="text-lg font-sans align-top mr-1">R$</span>
                            <span className="text-6xl md:text-7xl font-bold font-sans text-brand-dark leading-none">
                                {price}
                            </span>
                        </div>
                        <p className="text-xs mt-2 text-brand-dark/60 uppercase tracking-widest">
                            à vista ou parcelado
                        </p>
                        {lote1 && (
                            <p className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-[#9A3412] bg-[#FDE7D3] px-4 py-2 rounded-full">
                                1º lote até 28/07 · depois R$ {LOTE_2_PRICE_BRL}
                            </p>
                        )}
                    </div>

                    <ul className="space-y-3 mb-10 max-w-md mx-auto">
                        {inclui.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <span className="mt-0.5 p-1 rounded-full bg-brand-dark/10 text-brand-dark shrink-0">
                                    <Check size={14} aria-hidden="true" />
                                </span>
                                <span className="text-sm md:text-base font-sans text-brand-dark/85">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={buildCheckoutUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProductEvent('InitiateCheckout', 'begin_checkout', trackData('pricing_section'))}
                        className="block w-full py-4 md:py-5 rounded-xl font-bold text-center transition-all duration-300 bg-brand-dark text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl text-base md:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                    >
                        Garantir minha vaga · R$ {price}
                    </a>

                    <p className="text-center text-xs text-brand-dark/60 mt-4">
                        Pagamento seguro via InfinitePay · Pix, cartão ou parcelamento
                    </p>

                    <p className="text-center text-sm text-brand-dark/70 mt-6">
                        Prefere tirar uma dúvida antes?{' '}
                        <a
                            href={buildDuvidasWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-brand-goldDark underline underline-offset-2 hover:text-brand-dark"
                        >
                            Fale com a Ariana no WhatsApp
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// —————————————————————————————————————————————— Leitura individual (WA)

const AuraIndividual: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-lilacDark text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-goldLight font-bold mb-5">
                <Feather size={14} aria-hidden="true" /> Só para você
            </span>
            <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                Quer uma Leitura de Aura só sua?
            </h2>
            <p className="font-sans text-lg text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto">
                No círculo, a leitura acontece diante do grupo. Na sessão individual, é uma hora inteira
                dedicada ao seu campo — sem plateia, com tempo para você perguntar, chorar, entender e
                sair com um caminho claro do que fazer com o que apareceu.
            </p>

            <div className="inline-flex flex-col items-center gap-1 mb-8">
                <span className="font-sans text-white/60 line-through text-lg">
                    De R$ {AURA_INDIVIDUAL_DE_BRL}
                </span>
                <div className="flex items-baseline gap-1">
                    <span className="font-sans text-xl align-top">por R$</span>
                    <span className="font-sans font-bold text-6xl md:text-7xl leading-none text-brand-goldLight">
                        {AURA_INDIVIDUAL_POR_BRL}
                    </span>
                </div>
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/70 mt-2">
                    Valor promocional · agendamento pelo WhatsApp
                </span>
            </div>

            <div>
                <a
                    href={buildAuraWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProductEvent('Lead', 'generate_lead', {
                        ...trackData('aura_individual_whatsapp'),
                        value: AURA_INDIVIDUAL_POR_BRL,
                        content_name: 'Leitura de Aura Individual',
                    })}
                    className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5A] text-[#07301B] font-sans font-bold py-4 px-9 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                    <MessageCircle size={20} aria-hidden="true" />
                    Agendar minha leitura individual
                </a>
            </div>

            <p className="font-sans text-xs text-white/60 mt-6">
                Presencial em Natal ou online, conforme sua agenda e a da Ariana.
            </p>
        </div>
    </section>
);

// ——————————————————————————————————————————————————————————— Ariana

const Ariana: React.FC = () => (
    <section className="py-20 md:py-28 bg-brand-beige text-brand-dark">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-[240px_1fr] gap-10 items-center">
            <img
                src="/perfil-ariana-borges.webp"
                alt="Ariana Borges, terapeuta e condutora do encontro"
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
                        Não promete milagre e não usa mistério como isca. O que ela faz é abrir um campo
                        seguro o suficiente para você encarar o que já sabia — e forte o suficiente para
                        você sair de lá diferente.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————— FAQ

const faq = [
    {
        q: 'Preciso ter alguma experiência com meditação ou energia?',
        a: 'Não. A condução é feita passo a passo, em voz alta, do começo ao fim. Muita gente chega no primeiro encontro sem nunca ter meditado — e é justamente quem costuma sentir mais.',
    },
    {
        q: 'O que eu levo?',
        a: 'Roupa confortável (nada apertado na cintura), uma garrafa de água e, se tiver, uma canga ou tapetinho. O resto está no espaço.',
    },
    {
        q: 'Onde exatamente é em Natal?',
        a: 'O endereço completo vai por WhatsApp assim que sua inscrição é confirmada. É um espaço reservado, para um grupo de 12 pessoas — por isso não divulgamos publicamente.',
    },
    {
        q: 'Isso é religioso?',
        a: 'Não. A Kundalini aparece em várias tradições, mas o encontro não é ritual de fé nenhuma e não pede que você acredite em nada. Você pode ter qualquer religião — ou nenhuma.',
    },
    {
        q: 'E se eu não sentir nada?',
        a: 'Acontece, e não é fracasso. Tem corpo que responde na hora, com calor e choro; tem corpo que responde três dias depois, num sonho ou numa decisão que enfim saiu. A integração ao final existe para isso.',
    },
    {
        q: 'Estou grávida / tomo medicação / tenho uma condição de saúde. Posso participar?',
        a: 'Fale com a Ariana no WhatsApp antes de se inscrever. Alguns quadros pedem adaptação na condução e alguns pedem que a gente espere um momento melhor — ela vai ser honesta com você sobre isso.',
    },
    {
        q: 'Posso levar uma amiga?',
        a: 'Pode, desde que cada uma faça a sua inscrição. São 12 vagas no total e elas não são transferíveis no dia.',
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

const CTAFinal: React.FC<{ price: number }> = ({ price }) => (
    <section className="py-20 md:py-28 bg-brand-dark text-brand-beige text-center">
        <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">
                Dia {EVENTO.data.replace(' de julho', '')}, às {EVENTO.hora}, doze mulheres vão sentar
                nesse círculo.
            </h2>
            <p className="font-sans text-lg text-gray-300 mb-10 leading-relaxed">
                Você pode ser uma delas — ou pode continuar adiando, como já vem adiando. As duas coisas
                custam alguma coisa. Só uma devolve.
            </p>
            <a
                href={buildCheckoutUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProductEvent('InitiateCheckout', 'begin_checkout', trackData('final_cta'))}
                className="inline-block bg-brand-gold hover:bg-brand-goldDark text-brand-dark font-sans font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-goldLight"
            >
                Garantir minha vaga · R$ {price}
            </a>
            <p className="font-sans text-xs text-gray-400 mt-6 tracking-widest uppercase">
                {EVENTO.data} · {EVENTO.hora} · {EVENTO.cidade} · {VAGAS_TOTAIS} vagas
            </p>
        </div>
    </section>
);

// ————————————————————————————————————————————————————————————— Página

const KundaliniNatal: React.FC = () => {
    const price = currentPriceBRL();
    const lote1 = isLote1();

    React.useEffect(() => {
        trackProductEvent('ViewContent', 'view_item', trackData('landing_view'), 'kundalini-natal-view-tracked');
    }, []);

    const title = `Ativação da Kundalini em Grupo — ${EVENTO.data}, ${EVENTO.cidade} | Ariana Borges`;
    const description = `Encontro presencial em ${EVENTO.cidade} no dia ${EVENTO.data}, às ${EVENTO.hora}: Ativação da Kundalini em grupo com Leitura de Aura do Beija-Flor. Apenas ${VAGAS_TOTAIS} vagas.`;
    const ogImage = 'https://arianaborges.com/og-kundalini-natal.jpg';

    return (
        <div className="font-sans antialiased text-brand-dark">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://arianaborges.com/kundalini-natal" />
                <meta property="og:site_name" content="Instituto Ariana Borges" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:locale" content="pt_BR" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />

                <link rel="canonical" href="https://arianaborges.com/kundalini-natal" />

                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Event',
                    name: 'Ativação da Kundalini em Grupo com Leitura de Aura do Beija-Flor',
                    startDate: EVENTO.isoStart,
                    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                    eventStatus: 'https://schema.org/EventScheduled',
                    location: {
                        '@type': 'Place',
                        name: 'Espaço reservado (endereço enviado após a inscrição)',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Natal',
                            addressRegion: 'RN',
                            addressCountry: 'BR',
                        },
                    },
                    organizer: { '@type': 'Organization', name: 'Instituto Ariana Borges', url: 'https://arianaborges.com' },
                    performer: { '@type': 'Person', name: 'Ariana Borges' },
                    maximumAttendeeCapacity: VAGAS_TOTAIS,
                    offers: {
                        '@type': 'Offer',
                        price,
                        priceCurrency: 'BRL',
                        availability: 'https://schema.org/LimitedAvailability',
                        url: 'https://arianaborges.com/kundalini-natal',
                    },
                })}</script>
            </Helmet>

            <a
                href="#hero"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-gold text-brand-dark px-4 py-2 rounded-full font-bold z-50"
            >
                Pular para o conteúdo principal
            </a>

            <Hero price={price} lote1={lote1} />
            <Identificacao />
            <Kundalini />
            <LeituraAura />
            <ComoFunciona />
            <Investimento price={price} lote1={lote1} />
            <AuraIndividual />
            <Ariana />
            <FAQ />
            <CTAFinal price={price} />
        </div>
    );
};

export default KundaliniNatal;
