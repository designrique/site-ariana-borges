import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Award, BookOpen, Heart, Star, Users, Zap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useScheduling } from '@/components/SchedulingContext';
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
        title: 'Escavando Fundo (Dig Deeper)',
        description: 'Descubra como acessar a raiz das crenças mais profundas. Técnicas avançadas de escavação para transformação completa de padrões limitantes.',
        prereq: 'DNA Avançado',
        duration: '2 dias',
    },
];

const modulosConexoes = [
    {
        title: 'Relacionamentos Amorosos',
        description: 'Libere bloqueios inconscientes que sabotam suas relações. Atraia e mantenha conexões saudáveis baseadas em amor e respeito.',
        prereq: 'DNA Básico',
        duration: '2 dias',
    },
    {
        title: 'Família Interior',
        description: 'Cure as feridas do seu eu criança e reconecte-se com partes perdidas de si mesma. Transforme traumas de infância em sabedoria.',
        prereq: 'DNA Básico',
        duration: '2 dias',
    },
    {
        title: 'Família Extendida',
        description: 'Trabalhe padrões transgeracionais e cure relacionamentos familiares. Libere heranças emocionais que limitam sua vida.',
        prereq: 'DNA Avançado',
        duration: '2 dias',
    },
];

const modulosProsperidade = [
    {
        title: 'Manifestando e Abundância',
        description: 'Domine a arte de manifestar seus desejos. Aprenda a criar realidade a partir das suas intenções mais elevadas.',
        prereq: 'DNA Básico',
        duration: '2 dias',
    },
    {
        title: 'Jogos da Vida',
        description: 'Transforme sua relação com dinheiro, sucesso e prosperidade. Identifique e libere crenças de escassez.',
        prereq: 'DNA Básico',
        duration: '2 dias',
    },
];

const modulosSaude = [
    {
        title: 'Anatomia Intuitiva',
        description: 'Mergulhe profundamente nos sistemas do corpo humano e descubra as emoções e crenças armazenadas em cada órgão e sistema.',
        prereq: 'DNA Avançado',
        duration: '15 dias',
    },
    {
        title: 'Doenças e Desordens',
        description: 'Aprenda como trabalhar com condições específicas de saúde, entendendo as crenças e emoções por trás de cada manifestação.',
        prereq: 'Anatomia Intuitiva',
        duration: '10 dias',
    },
    {
        title: 'Planos de Existência',
        description: 'Explore os sete planos de existência e aprenda a trabalhar com cada um deles para cura e manifestação.',
        prereq: 'DNA Avançado',
        duration: '2 dias',
    },
];

const ThetaHealing: React.FC = () => {
    const { openScheduling } = useScheduling();

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
                        <Sparkles size={14} /> Cursos ThetaHealing®
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Cursos <span className="text-brand-goldDark italic">ThetaHealing®</span>
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        A formação de ThetaHealing® é estruturada em módulos progressivos que acompanham o desenvolvimento do aluno em todas as camadas: física, emocional, mental, energética e espiritual.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 text-brand-lilacDark">
                            <Award size={20} />
                            <span className="font-sans text-sm font-medium">Certificação Internacional</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2 text-brand-goldDark">
                            <Star size={20} />
                            <span className="font-sans text-sm font-medium">Instrutora Certificada</span>
                        </div>
                    </div>
                    <button
                        onClick={openScheduling}
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
                            <BookOpen className="text-brand-lilacDark" size={24} />
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

            {/* Conexões e Relacionamentos */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Heart className="text-brand-goldDark" size={24} />
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            <Zap className="text-brand-lilacDark" size={24} />
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

            {/* Saúde, Corpo e Espiritualidade */}
            <ScrollReveal>
                <section className="py-20 bg-brand-beige">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Users className="text-brand-goldDark" size={24} />
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
                                    <Award className="text-brand-gold mb-4" size={48} />
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
                                        <Star className="text-brand-gold mx-auto mb-3" size={40} />
                                        <h4 className="font-serif text-lg text-brand-dark mb-2">Instrutora Certificada</h4>
                                        <p className="font-sans text-gray-600 text-sm">Ariana Borges é instrutora certificada e reconhecida internacionalmente</p>
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
                                <div className="text-2xl">💜</div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Terapia Individual</h3>
                                    <p className="font-sans text-gray-600 text-sm">Sessões de ThetaHealing® individuais</p>
                                </div>
                            </Link>
                            <Link
                                to="/formacao-de-terapeutas"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-2xl">🎓</div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Outras Formações</h3>
                                    <p className="font-sans text-gray-600 text-sm">Reiki, Registros Akáshicos e mais</p>
                                </div>
                            </Link>
                            <Link
                                to="/autoconhecimento-em-grupo"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-2xl">👥</div>
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
                            ✨ Pronta para iniciar sua jornada?
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Entre em contato para saber sobre as próximas turmas e começar sua formação em ThetaHealing®.
                        </p>
                        <button
                            onClick={openScheduling}
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
