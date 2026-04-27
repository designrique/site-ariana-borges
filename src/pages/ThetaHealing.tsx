import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MagicStar, Medal, Book1, Heart, People, Flash, UserTick, Teacher } from 'iconsax-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useWhatsApp } from '@/components/WhatsAppButton';
import { Link } from 'react-router-dom';

const modulosEssencial = [
    {
        title: 'DNA Básico',
        description: 'A porta de entrada para o universo do ThetaHealing®. Aprenda a acessar a frequência Theta, realizar leituras intuitivas e iniciar processos de cura energética.',
        prereq: 'Sem pré-requisitos',
        duration: '3 dias',
    },
    {
        title: 'DNA Avançado',
        description: 'Aprofunde seu domínio das técnicas, limpe crenças enraizadas e aprenda a trabalhar com downloads divinos de forma mais profunda e eficaz.',
        prereq: 'DNA Básico',
        duration: '3 dias',
    },
    {
        title: 'Aprofunde-se',
        description: 'Descubra como acessar a raiz das crenças mais profundas. Técnicas avançadas de escavação para transformação completa de padrões limitantes.',
        prereq: 'DNA Avançado',
        duration: '2 dias',
    },
];

const modulosConexoes = [
    {
        title: 'Você e seu Círculo Íntimo',
        description: 'Transforme as dinâmicas com as pessoas mais próximas. Aprenda a criar vínculos saudáveis, respeitosos e evolutivos dentro do seu círculo de confiança.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Você e seu Parceiro',
        description: 'Cure padrões relacionais que se repetem nos relacionamentos amorosos. Construa uma base de amor, respeito e crescimento mútuo com seu parceiro.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Você e a Terra',
        description: 'Aprofunde sua conexão com o planeta e com os ciclos naturais. Libere bloqueios que impedem sua ancoragem e presença plena no aqui e agora.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Você e o Criador',
        description: 'Fortaleça sua conexão com a fonte criadora. Expanda sua fé, sua confiança e sua capacidade de receber guiança divina em todas as áreas da vida.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Alma Gêmea',
        description: 'Prepare-se para atrair e reconhecer seu par de alma. Trabalhe as crenças e padrões que bloqueiam a chegada de um amor verdadeiro e duradouro.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Amor pela Família',
        description: 'Cure as feridas familiares e transforme padrões transgeracionais. Libere heranças emocionais e crie novos vínculos baseados em amor incondicional.',
        prereq: 'Você e o Criador',
        duration: '2 dias',
    },
    {
        title: 'Amor Próprio',
        description: 'Desenvolva uma relação amorosa e compassiva com você mesma. Libere crenças de inadequação e construa uma autoestima sólida ancorada na sua essência divina.',
        prereq: 'Você e o Criador',
        duration: '2 dias',
    },
];

const modulosProsperidade = [
    {
        title: 'Manifestação e Abundância',
        description: 'Libere bloqueios relacionados à prosperidade e aprenda a manifestar seus desejos mais profundos. Transforme crenças sobre dinheiro, merecimento e abundância em todas as áreas da vida.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Jogo da Vida',
        description: 'Compreenda as regras do campo energético que rege sua trajetória. Aprenda a jogar conscientemente o jogo da vida, transformando padrões repetitivos em oportunidades de crescimento.',
        prereq: 'Aprofunde-se',
        duration: '3 dias',
    },
    {
        title: 'Relações Mundiais',
        description: 'Expanda sua perspectiva sobre as dinâmicas do mundo. Cure crenças coletivas que limitam sua percepção e sua capacidade de agir com consciência global.',
        prereq: 'Aprofunde-se',
        duration: '5 dias',
    },
];

const modulosFormEspecializadas = [
    {
        title: 'Animal',
        description: 'Aprenda a se comunicar e trabalhar energeticamente com animais. Cure desequilíbrios emocionais e físicos dos seus companheiros de vida.',
        prereq: 'Aprofunde-se',
        duration: '1 dia',
    },
    {
        title: 'Planta',
        description: 'Descubra a consciência do reino vegetal e aprenda a se comunicar com as plantas. Compreenda como a natureza pode ser uma aliada poderosa na sua jornada de cura.',
        prereq: 'Aprofunde-se',
        duration: '1 dia',
    },
    {
        title: 'Criança Intuitiva em Mim (Adulto)',
        description: 'Reconecte-se com sua intuição e criatividade naturais. Cure a criança interior e libere o potencial intuitivo que habita em você desde o nascimento.',
        prereq: 'Aprofunde-se',
        duration: '4 dias',
    },
    {
        title: 'Criança Intuitiva em Mim (Infantil)',
        description: 'Versão especialmente desenhada para crianças e adolescentes. Desenvolve a intuição, a percepção energética e o autoconhecimento desde cedo.',
        prereq: 'Sem pré-requisitos',
        duration: '2 dias',
    },
];

const modulosSaude = [
    {
        title: 'Ritmo e Peso Perfeito',
        description: 'Transforme sua relação com o corpo, a alimentação e o peso. Libere crenças emocionais que impedem o equilíbrio físico e reencontre seu ritmo natural de saúde.',
        prereq: 'Aprofunde-se',
        duration: '2 dias',
    },
    {
        title: 'Anatomia Intuitiva',
        description: 'Mergulhe profundamente nos sistemas do corpo humano e descubra as emoções e crenças armazenadas em cada órgão e sistema.',
        prereq: 'Você e o Criador',
        duration: '15 dias',
    },
    {
        title: 'DNA 3',
        description: 'Aprofunde seu entendimento sobre o DNA e aprenda a trabalhar com o potencial de cura contido na estrutura genética. Técnicas avançadas de reprogramação a nível celular.',
        prereq: 'Anatomia Intuitiva',
        duration: '5 dias',
    },
    {
        title: 'Planos de Existência',
        description: 'Explore os sete planos de existência e aprenda a trabalhar com cada um deles para cura e manifestação.',
        prereq: 'Anatomia Intuitiva',
        duration: '5 dias',
    },
    {
        title: 'Doenças e Desordens',
        description: 'Aprofunde-se no entendimento energético e espiritual das doenças. Aprenda a trabalhar com os programas de crenças associados a desordens físicas e emocionais para promover curas profundas.',
        prereq: 'Anatomia Intuitiva',
        duration: '10 dias',
    },
];

const modulosEspecializacoes = [
    { title: 'Manifestação e Abundância', img: '/icons/theta/manifestacao-abundancia.png', variant: 'gold' as const },
    { title: 'Jogo da Vida', img: '/icons/theta/jogo-da-vida.png', variant: 'lilac' as const },
    { title: 'Alma Gêmea', img: '/icons/theta/alma-gemea.png', variant: 'gold' as const },
    { title: 'Criança Arco-Íris Adulto', img: '/icons/theta/crianca-arco-iris.png', variant: 'lilac' as const },
    { title: 'Planta', img: '/icons/theta/planta.png', variant: 'gold' as const },
    { title: 'Animal', img: '/icons/theta/animal.png', variant: 'lilac' as const },
    { title: 'Anatomia Intuitiva', img: '/icons/theta/anatomia-intuitiva.png', variant: 'gold' as const },
    { title: 'Relações Mundiais', img: '/icons/theta/relacoes-mundiais.png', variant: 'lilac' as const },
    { title: 'Amor pela Família', img: '/icons/theta/amor-pela-familia.png', variant: 'gold' as const },
    { title: 'Amor Próprio', img: '/icons/theta/amor-proprio.png', variant: 'lilac' as const },
    { title: 'Você e o Criador', img: '/icons/theta/voce-criador.png', variant: 'gold' as const },
    { title: 'Ritmo e Peso Perfeito', img: '/icons/theta/ritmo-peso-perfeito.png', variant: 'lilac' as const },
    { title: 'Você e Seu Parceiro', img: '/icons/theta/voce-parceiro.png', variant: 'gold' as const },
    { title: 'Você e a Terra', img: '/icons/theta/voce-terra.png', variant: 'lilac' as const },
    { title: 'Você e o Seu Círculo Íntimo', img: '/icons/theta/voce-circulo-intimo.png', variant: 'gold' as const },
];

const ThetaHealing: React.FC = () => {
    const { openPopup } = useWhatsApp();

    return (
        <>
            <Helmet>
                <title>ThetaHealing® - Instituto Ariana Borges</title>
                <meta name="description" content="Formação completa em ThetaHealing® com certificação internacional. Módulos progressivos para seu desenvolvimento completo como terapeuta." />
                <meta property="og:title" content="ThetaHealing® - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <MagicStar size={14} variant="Linear" color="currentColor" /> Cursos ThetaHealing®
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Cursos <span className="text-brand-goldDark italic">ThetaHealing®</span>
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        A formação de ThetaHealing® é estruturada em módulos progressivos que acompanham o desenvolvimento do aluno em todas as camadas: física, emocional, mental, energética e espiritual.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 text-brand-lilacDark">
                            <Medal size={20} variant="Linear" color="currentColor" />
                            <span className="font-sans text-sm font-medium">Certificação Internacional</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2 text-brand-goldDark">
                            <img src="/icons/theta/dna-instrutora-certificada.png" alt="Instrutora Certificada" className="w-5 h-5 object-contain" />
                            <span className="font-sans text-sm font-medium">Instrutora Certificada</span>
                        </div>
                    </div>
                    <button
                        onClick={openPopup}
                        className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                        Quero Começar Minha Formação
                    </button>
                </div>
            </section>

            {/* Formação Essencial */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Book1 size={24} variant="Linear" color="currentColor" className="text-brand-lilacDark" />
                            <span className="font-sans text-brand-lilacDark font-bold uppercase tracking-wider text-sm">
                                ✦ Formação Essencial
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            A Base do ThetaHealing®
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Os cursos fundamentais para iniciar sua jornada como praticante de ThetaHealing®.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modulosEssencial.map((modulo, index) => (
                                <div
                                    key={index}
                                    className="bg-brand-beige p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <div className="absolute top-4 right-4 bg-brand-lilac/30 px-3 py-1 rounded-full">
                                        <span className="font-sans text-xs text-brand-lilacDark font-medium">{modulo.duration}</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 pr-16">{modulo.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                                        {modulo.description}
                                    </p>
                                    <div className="text-xs text-brand-goldDark font-medium">
                                        Pré-requisito: {modulo.prereq}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Trilha Completa - Flowchart */}
            <ScrollReveal>
                <section className="py-20 bg-brand-beige overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Trilha Completa de Formação
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Cada módulo constrói sobre o anterior em uma jornada progressiva de evolução e especialização.
                        </p>

                        {/* === Desktop tree (lg+) === */}
                        <div className="hidden lg:flex flex-col items-center">

                            {/* TRUNK: DNA Básico */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lilacDark overflow-hidden shadow-md">
                                    <img src="/icons/theta/dna-basico.png" alt="DNA Básico" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-lilacDark mt-2">DNA Básico</p>
                            </div>
                            <div className="w-[2px] h-8 bg-brand-lilacDark/60" />

                            {/* TRUNK: DNA Avançado */}
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lilacDark overflow-hidden shadow-md">
                                    <img src="/icons/theta/dna-avancado.png" alt="DNA Avançado" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-lilacDark mt-2">DNA Avançado</p>
                            </div>
                            <div className="w-[2px] h-8 bg-brand-lilacDark/60" />

                            {/* TRUNK: Aprofunde-se */}
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-white border-[3px] border-brand-goldDark overflow-hidden shadow-lg ring-4 ring-brand-gold/20">
                                    <img src="/icons/theta/aprofundando-digging.png" alt="Aprofunde-se" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-goldDark mt-2">Aprofunde-se</p>
                            </div>
                            <div className="w-[2px] h-10 bg-brand-lilacDark/60" />

                            {/* SPLIT: Left branches + Você e o Criador + Planta/Criança/Animal */}
                            <div className="w-full flex items-start">

                                {/* LEFT GROUP (55%) — 7 branches diretos do Aprofunde-se */}
                                <div className="w-[55%] flex flex-col items-stretch">
                                    <div className="h-[2px] bg-brand-lilacDark/50" />
                                    <div className="flex justify-around">
                                        {[
                                            { img: 'relacoes-mundiais.png', label: 'Relações Mundiais' },
                                            { img: 'manifestacao-abundancia.png', label: 'Manifestação e Abundância' },
                                            { img: 'jogo-da-vida.png', label: 'Jogo da Vida' },
                                            { img: 'alma-gemea.png', label: 'Alma Gêmea' },
                                            { img: 'voce-terra.png', label: 'Você e a Terra' },
                                            { img: 'voce-parceiro.png', label: 'Você e Seu Parceiro' },
                                            { img: 'voce-circulo-intimo.png', label: 'Você e Seu Círculo Íntimo' },
                                        ].map((branch, i) => (
                                            <div key={i} className="flex flex-col items-center flex-1">
                                                <div className="w-[2px] h-6 bg-brand-lilacDark/50" />
                                                <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-white border-2 border-brand-lilacDark/70 overflow-hidden shadow-sm">
                                                    <img src={`/icons/theta/${branch.img}`} alt={branch.label} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1.5 uppercase leading-tight px-1 max-w-[70px]">{branch.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* MIDDLE: Você e o Criador sub-tree (25%) */}
                                <div className="w-[25%] flex flex-col items-center">
                                    <div className="h-[2px] bg-brand-lilacDark/50 w-full" />
                                    <div className="w-[2px] h-6 bg-brand-lilacDark/60" />

                                    {/* Você e o Criador */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-lilacDark overflow-hidden shadow-md ring-4 ring-brand-lilac/20">
                                            <img src="/icons/theta/voce-criador.png" alt="Você e o Criador" className="w-full h-full object-cover" />
                                        </div>
                                        <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-lilacDark mt-2 text-center">Você e o Criador</p>
                                    </div>
                                    <div className="w-[2px] h-6 bg-brand-lilacDark/60" />

                                    {/* 3 children: Amor Família, Amor Próprio, Anatomia */}
                                    <div className="w-full flex flex-col items-stretch">
                                        <div className="h-[2px] bg-brand-lilacDark/50 w-3/4 mx-auto" />
                                        <div className="flex justify-around w-full">

                                            {/* Amor pela Família */}
                                            <div className="flex flex-col items-center flex-1">
                                                <div className="w-[2px] h-5 bg-brand-lilacDark/50" />
                                                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-lilacDark/70 overflow-hidden shadow-sm">
                                                    <img src="/icons/theta/amor-pela-familia.png" alt="Amor pela Família" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1.5 uppercase leading-tight px-1 max-w-[60px]">Amor pela Família</p>
                                            </div>

                                            {/* Amor Próprio */}
                                            <div className="flex flex-col items-center flex-1">
                                                <div className="w-[2px] h-5 bg-brand-lilacDark/50" />
                                                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-lilacDark/70 overflow-hidden shadow-sm">
                                                    <img src="/icons/theta/amor-proprio.png" alt="Amor Próprio" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1.5 uppercase leading-tight px-1 max-w-[60px]">Amor Próprio</p>
                                            </div>

                                            {/* Anatomia Intuitiva + sub-children (mesmo tamanho) */}
                                            <div className="flex flex-col items-center flex-1">
                                                <div className="w-[2px] h-5 bg-brand-lilacDark/50" />
                                                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-lilacDark/70 overflow-hidden shadow-sm">
                                                    <img src="/icons/theta/anatomia-intuitiva.png" alt="Anatomia Intuitiva" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1.5 uppercase leading-tight px-1 max-w-[60px]">Anatomia Intuitiva</p>
                                                <div className="w-[2px] h-4 bg-brand-lilacDark/40 mt-1" />
                                                <div className="h-[2px] bg-brand-lilacDark/40 w-full" />
                                                <div className="flex w-full justify-around">
                                                    {[
                                                        { img: 'planos-existencia.png', label: 'Planos de Existência' },
                                                        { img: 'doencas-desordens.png', label: 'Doenças e Desordens' },
                                                        { img: 'dna-avancado.png', label: 'DNA 3' },
                                                    ].map((sub, j) => (
                                                        <div key={j} className="flex flex-col items-center" style={{ width: '33%' }}>
                                                            <div className="w-[2px] h-4 bg-brand-lilacDark/40" />
                                                            <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-lilacDark/50 overflow-hidden shadow-sm">
                                                                <img src={`/icons/theta/${sub.img}`} alt={sub.label} className="w-full h-full object-cover" />
                                                            </div>
                                                            <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1 leading-tight">{sub.label}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT (20%) — Planta, Criança Intuitiva Adulto, Animal diretos do Aprofunde-se */}
                                <div className="w-[20%] flex flex-col items-stretch">
                                    <div className="h-[2px] bg-brand-lilacDark/50 w-full" />
                                    <div className="flex justify-around">
                                        {[
                                            { img: 'planta.png', label: 'Planta' },
                                            { img: 'crianca-arco-iris.png', label: 'Criança Intuitiva Adulto' },
                                            { img: 'animal.png', label: 'Animal' },
                                        ].map((branch, i) => (
                                            <div key={i} className="flex flex-col items-center flex-1">
                                                <div className="w-[2px] h-6 bg-brand-lilacDark/50" />
                                                <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-white border-2 border-brand-lilacDark/70 overflow-hidden shadow-sm">
                                                    <img src={`/icons/theta/${branch.img}`} alt={branch.label} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="font-sans text-[8px] xl:text-[9px] text-center text-brand-dark font-semibold mt-1.5 uppercase leading-tight px-1 max-w-[70px]">{branch.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* STANDALONE: Criança Intuitiva em Mim (Infantil) — lilac bubble */}
                            <div className="mt-10 self-start ml-[3%] flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-brand-lilac/30 border-2 border-brand-lilacDark overflow-hidden shadow-md">
                                    <img src="/icons/theta/crianca-intuitiva-infantil.png" alt="Criança Intuitiva Infantil" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-brand-lilacDark mt-2 text-center">Criança Intuitiva<br />em Mim (Infantil)</p>
                                <span className="mt-1 text-[9px] bg-brand-lilac/40 text-brand-lilacDark rounded-full px-2 py-0.5 font-medium">Sem pré-requisitos</span>
                            </div>

                        </div>

                        {/* === Mobile/Tablet simplified (< lg) === */}
                        <div className="lg:hidden flex flex-col items-center">
                            {[
                                { img: '/icons/theta/dna-basico.png', label: 'DNA Básico', level: 'Nível 1', color: 'lilac' as const },
                                { img: '/icons/theta/dna-avancado.png', label: 'DNA Avançado', level: 'Nível 2', color: 'lilac' as const },
                                { img: '/icons/theta/aprofundando-digging.png', label: 'Aprofunde-se', level: 'Nível 3', color: 'gold' as const },
                            ].map((node, i) => (
                                <React.Fragment key={node.label}>
                                    <div className={`flex items-center gap-3 bg-white px-4 py-3 rounded-xl border w-full max-w-sm ${node.color === 'gold' ? 'border-brand-gold/30' : 'border-brand-lilac/20'}`}>
                                        <div className={`w-12 h-12 rounded-full border-2 overflow-hidden shrink-0 ${node.color === 'gold' ? 'border-brand-goldDark' : 'border-brand-lilacDark'}`}>
                                            <img src={node.img} alt={node.label} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className={`font-sans text-xs font-bold uppercase tracking-wide ${node.color === 'gold' ? 'text-brand-goldDark' : 'text-brand-lilacDark'}`}>{node.level}</p>
                                            <p className="font-serif text-base text-brand-dark">{node.label}</p>
                                        </div>
                                    </div>
                                    {i < 2 && <div className="w-[2px] h-5 bg-brand-lilacDark/50" />}
                                </React.Fragment>
                            ))}

                            <div className="w-full h-[2px] bg-brand-lilacDark/30 my-6" />
                            <p className="font-serif text-lg text-brand-dark text-center mb-6">Especializações</p>
                            <div className="grid grid-cols-3 gap-4 gap-y-6 w-full">
                                {modulosEspecializacoes.map((modulo, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <div className={`w-14 h-14 rounded-full overflow-hidden mb-2 border ${modulo.variant === 'gold' ? 'border-brand-gold/40' : 'border-brand-lilac/40'}`}>
                                            <img src={modulo.img} alt={modulo.title} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="font-sans text-xs text-brand-dark font-medium leading-tight">{modulo.title}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Standalone lilac bubble mobile */}
                            <div className="mt-8 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-brand-lilac/30 border-2 border-brand-lilacDark overflow-hidden">
                                    <img src="/icons/theta/crianca-intuitiva-infantil.png" alt="Criança Intuitiva Infantil" className="w-full h-full object-cover" />
                                </div>
                                <p className="font-sans text-xs text-brand-lilacDark font-bold uppercase mt-2 text-center">Criança Intuitiva<br />em Mim (Infantil)</p>
                                <span className="mt-1 text-[10px] bg-brand-lilac/40 text-brand-lilacDark rounded-full px-2 py-0.5">Sem pré-requisitos</span>
                            </div>
                        </div>

                    </div>
                </section>
            </ScrollReveal>

            {/* Conexões e Relacionamentos */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Heart size={24} variant="Linear" color="currentColor" className="text-brand-goldDark" />
                            <span className="font-sans text-brand-goldDark font-bold uppercase tracking-wider text-sm">
                                ✦ Conexões e Relacionamentos
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Cure seus Relacionamentos
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Módulos focados em transformar padrões relacionais e curar feridas afetivas.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modulosConexoes.map((modulo, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <div className="absolute top-4 right-4 bg-brand-gold/20 px-3 py-1 rounded-full">
                                        <span className="font-sans text-xs text-brand-goldDark font-medium">{modulo.duration}</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 pr-16">{modulo.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                                        {modulo.description}
                                    </p>
                                    <div className="text-xs text-brand-lilacDark font-medium">
                                        Pré-requisito: {modulo.prereq}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Prosperidade e Realização */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Flash size={24} variant="Linear" color="currentColor" className="text-brand-lilacDark" />
                            <span className="font-sans text-brand-lilacDark font-bold uppercase tracking-wider text-sm">
                                ✦ Prosperidade e Realização
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Manifeste sua Abundância
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Transforme sua relação com prosperidade e aprenda a manifestar seus desejos.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modulosProsperidade.map((modulo, index) => (
                                <div
                                    key={index}
                                    className="bg-brand-beige p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <div className="absolute top-4 right-4 bg-brand-lilac/30 px-3 py-1 rounded-full">
                                        <span className="font-sans text-xs text-brand-lilacDark font-medium">{modulo.duration}</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 pr-16">{modulo.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                                        {modulo.description}
                                    </p>
                                    <div className="text-xs text-brand-goldDark font-medium">
                                        Pré-requisito: {modulo.prereq}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Formações Especializadas */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <MagicStar size={24} variant="Linear" color="currentColor" className="text-brand-lilacDark" />
                            <span className="font-sans text-brand-lilacDark font-bold uppercase tracking-wider text-sm">
                                ✦ Formações Especializadas
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Expansões do Campo
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Módulos especiais que expandem sua prática para o mundo natural e o potencial intuitivo.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {modulosFormEspecializadas.map((modulo, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <div className="absolute top-4 right-4 bg-brand-lilac/30 px-3 py-1 rounded-full">
                                        <span className="font-sans text-xs text-brand-lilacDark font-medium">{modulo.duration}</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 pr-16">{modulo.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                                        {modulo.description}
                                    </p>
                                    <div className="text-xs text-brand-goldDark font-medium">
                                        Pré-requisito: {modulo.prereq}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Saúde, Corpo e Espiritualidade */}
            <ScrollReveal>
                <section className="py-20 bg-brand-beige">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <People size={24} variant="Linear" color="currentColor" className="text-brand-goldDark" />
                            <span className="font-sans text-brand-goldDark font-bold uppercase tracking-wider text-sm">
                                ✦ Saúde, Corpo e Espiritualidade
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Formação Avançada
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Cursos aprofundados para quem deseja se especializar em cura física e espiritual.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {modulosSaude.map((modulo, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <div className="absolute top-4 right-4 bg-brand-gold/20 px-3 py-1 rounded-full">
                                        <span className="font-sans text-xs text-brand-goldDark font-medium">{modulo.duration}</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 pr-16">{modulo.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4">
                                        {modulo.description}
                                    </p>
                                    <div className="text-xs text-brand-lilacDark font-medium">
                                        Pré-requisito: {modulo.prereq}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Certification Banner */}
            <ScrollReveal>
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-gradient-to-r from-brand-lilac/30 to-brand-gold/20 p-8 md:p-12 rounded-3xl">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="md:w-2/3">
                                    <Medal size={48} variant="Linear" color="currentColor" className="text-brand-gold mb-4" />
                                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                                        Certificação Internacional
                                    </h2>
                                    <p className="font-sans text-gray-600 leading-relaxed mb-4">
                                        Todos os cursos são certificados pelo THInK® - ThetaHealing Institute of Knowledge, garantindo reconhecimento internacional para sua atuação como terapeuta.
                                    </p>
                                    <p className="font-sans text-gray-600 leading-relaxed">
                                        Ao concluir cada módulo, você recebe certificado oficial que permite atuar profissionalmente e dar continuidade à sua formação.
                                    </p>
                                </div>
                                <div className="md:w-1/3 text-center">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                                        <img src="/icons/theta/dna-instrutora-certificada.png" alt="Instrutora Certificada" className="w-10 h-10 object-contain mx-auto mb-3" />
                                        <h4 className="font-serif text-lg text-brand-dark mb-2">Instrutora Certificada</h4>
                                        <p className="font-sans text-gray-600 text-sm mb-3">Ariana Borges é instrutora certificada e reconhecida internacionalmente</p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <span className="bg-brand-lilac/20 text-brand-lilacDark text-xs font-semibold px-3 py-1 rounded-full">Master</span>
                                            <span className="bg-brand-gold/20 text-brand-goldDark text-xs font-semibold px-3 py-1 rounded-full">Science</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Other Pillars Section */}
            <ScrollReveal>
                <section className="py-16 bg-brand-beige">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-2xl md:text-3xl text-brand-dark text-center mb-8">
                            Conheça também
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            <Link
                                to="/terapia-individual"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-brand-lilacDark bg-brand-lilac/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                                    <UserTick size={28} variant="Linear" color="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Terapia Individual</h3>
                                    <p className="font-sans text-gray-600 text-sm">Sessões de ThetaHealing® individuais</p>
                                </div>
                            </Link>
                            <Link
                                to="/formacao-de-terapeutas"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-brand-gold bg-brand-gold/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                                    <Teacher size={28} variant="Linear" color="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Outras Formações</h3>
                                    <p className="font-sans text-gray-600 text-sm">Reiki, Registros Akáshicos e mais</p>
                                </div>
                            </Link>
                            <Link
                                to="/autoconhecimento-em-grupo"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-brand-lilacDark bg-brand-lilac/10 w-14 h-14 rounded-full flex items-center justify-center shrink-0">
                                    <People size={28} variant="Linear" color="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Grupos</h3>
                                    <p className="font-sans text-gray-600 text-sm">Vivências coletivas de transformação</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* CTA Section */}
            <ScrollReveal>
                <section className="py-24 bg-brand-lilac/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl -z-10"></div>
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6">
                            Pronta para iniciar sua jornada?
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Entre em contato para saber sobre as próximas turmas e começar sua formação em ThetaHealing®.
                        </p>
                        <button
                            onClick={openPopup}
                            className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Quero Começar
                        </button>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default ThetaHealing;
