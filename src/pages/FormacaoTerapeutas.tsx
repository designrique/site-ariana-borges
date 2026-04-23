import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Teacher } from 'iconsax-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useWhatsApp } from '@/components/WhatsAppButton';
import { Link } from 'react-router-dom';

const formacoes = [
    {
        emoji: '📚',
        title: 'Leitura de Registros Akáshicos',
        description: 'Aprenda a acessar o campo quântico de memórias da alma. Desenvolva a habilidade de realizar leituras precisas para si e para outros, revelando padrões kármicos e orientações espirituais.',
        highlights: ['Acesso ao campo akáshico', 'Leitura para terceiros', 'Certificação profissional'],
    },
    {
        emoji: '✨',
        title: 'Reiki Essencial',
        description: 'Formação completa em Reiki, desde o nível básico até o mestrado. Aprenda a canalizar a energia vital universal para promover cura e equilíbrio em todos os níveis do ser.',
        highlights: ['Níveis I, II e Mestrado', 'Símbolos sagrados', 'Atendimento profissional'],
    },
    {
        emoji: '🌈',
        title: 'Leitura de Aura – Método Essence',
        description: 'Desenvolva a percepção extrassensorial para ler campos energéticos. Um método exclusivo que permite identificar bloqueios, padrões e potenciais através da leitura da aura.',
        highlights: ['Método exclusivo', 'Percepção extrassensorial', 'Interpretação energética'],
    },
    {
        emoji: '🔮',
        title: 'ThetaHealing® – Formação Oficial',
        description: 'Formação certificada internacionalmente em ThetaHealing®. Aprenda a acessar a onda cerebral Theta para realizar curas profundas e transformar crenças limitantes.',
        highlights: ['Certificação internacional', 'DNA Básico e Avançado', 'Prática supervisionada'],
        link: '/thetahealing',
    },
];

const FormacaoTerapeutas: React.FC = () => {
    const { openPopup } = useWhatsApp();

    return (
        <>
            <Helmet>
                <title>Formação de Terapeutas - Instituto Ariana Borges</title>
                <meta name="description" content="Torne-se terapeuta, transforme vidas e desperte sua própria cura. Formações certificadas em técnicas integrativas e terapias holísticas." />
                <meta property="og:title" content="Formação de Terapeutas - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <Teacher size={14} variant="Linear" color="currentColor" /> Formação de Terapeutas
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Torne-se terapeuta, <span className="text-brand-goldDark italic">transforme vidas</span> e desperte sua própria cura
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        Cada curso de formação terapêutica é mais do que uma capacitação técnica — é um portal de transformação pessoal profunda. Com uma abordagem humanizada, segura e fundamentada na escuta da alma, você é guiada por um caminho de autoconhecimento, cura e preparo profissional.
                    </p>
                    <button
                        onClick={openPopup}
                        className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                        Marque um Atendimento
                    </button>
                </div>
            </section>

            {/* Intro Section */}
            <ScrollReveal>
                <section className="py-16 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-brand-gold mb-4 bg-brand-lilac/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <img src="/icons/site/abordagem-humanizada.png" alt="Abordagem Humanizada" className="w-7 h-7 object-contain" />
                                </div>
                                <h3 className="font-serif text-lg text-brand-dark mb-2">Abordagem Humanizada</h3>
                                <p className="font-sans text-gray-600 text-sm">Formação com acolhimento e respeito ao seu ritmo</p>
                            </div>
                            <div className="text-center">
                                <div className="text-brand-gold mb-4 bg-brand-lilac/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <img src="/icons/site/certificacao-profissional.png" alt="Certificação Profissional" className="w-7 h-7 object-contain" />
                                </div>
                                <h3 className="font-serif text-lg text-brand-dark mb-2">Certificação Profissional</h3>
                                <p className="font-sans text-gray-600 text-sm">Certificados reconhecidos para atuação profissional</p>
                            </div>
                            <div className="text-center">
                                <div className="text-brand-gold mb-4 bg-brand-lilac/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <img src="/icons/site/transformacao-pessoal.png" alt="Transformação Pessoal" className="w-7 h-7 object-contain" />
                                </div>
                                <h3 className="font-serif text-lg text-brand-dark mb-2">Transformação Pessoal</h3>
                                <p className="font-sans text-gray-600 text-sm">Você se cura enquanto aprende a curar</p>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Formações Section */}
            <ScrollReveal>
                <section className="py-20 bg-brand-beige">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Nossas Formações
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Escolha a formação que ressoa com seu chamado e inicie sua jornada como terapeuta.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {formacoes.map((formacao, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <span className="text-4xl">{formacao.emoji}</span>
                                        <h3 className="font-serif text-2xl text-brand-dark">{formacao.title}</h3>
                                    </div>
                                    <p className="font-sans text-gray-600 leading-relaxed mb-6">
                                        {formacao.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {formacao.highlights.map((highlight, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-brand-lilac/20 text-brand-lilacDark text-xs font-medium rounded-full"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                    {formacao.link ? (
                                        <Link
                                            to={formacao.link}
                                            className="text-brand-lilacDark font-bold text-sm hover:text-brand-gold transition-colors inline-flex items-center gap-2"
                                        >
                                            Ver programa completo
                                            <span>→</span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={openPopup}
                                            className="text-brand-lilacDark font-bold text-sm hover:text-brand-gold transition-colors inline-flex items-center gap-2"
                                        >
                                            Saber mais
                                            <span>→</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* ThetaHealing Highlight */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-gradient-to-r from-brand-lilac/30 to-brand-gold/20 p-8 md:p-12 rounded-3xl">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="md:w-2/3">
                                    <img src="/icons/theta/dna-basico.png" alt="ThetaHealing® DNA Espiral" className="w-16 h-16 mb-4 object-contain" />
                                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                                        ThetaHealing® – Formação Completa
                                    </h2>
                                    <p className="font-sans text-gray-600 leading-relaxed mb-6">
                                        A formação de ThetaHealing® é estruturada em módulos progressivos que acompanham o desenvolvimento do aluno em todas as camadas: física, emocional, mental, energética e espiritual.
                                    </p>
                                    <Link
                                        to="/thetahealing"
                                        className="inline-block bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Ver Programa Completo
                                    </Link>
                                </div>
                                <div className="md:w-1/3 text-center">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                                        <img src="/icons/site/certificacao-profissional.png" alt="Certificação Internacional" className="w-12 h-12 object-contain mx-auto mb-3" />
                                        <h4 className="font-serif text-lg text-brand-dark mb-2">Certificação Internacional</h4>
                                        <p className="font-sans text-gray-600 text-sm mb-3">Reconhecida pelo THInK® - ThetaHealing Institute of Knowledge</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <Link
                                to="/terapia-individual"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="bg-brand-lilac/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                    <img src="/icons/site/terapia-individual.png" alt="Terapia Individual" className="w-6 h-6 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Terapia Individual</h3>
                                    <p className="font-sans text-gray-600 text-sm">Sessões personalizadas de cura</p>
                                </div>
                            </Link>
                            <Link
                                to="/autoconhecimento-em-grupo"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="bg-brand-lilac/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                                    <img src="/icons/site/autoconhecimento-grupo.png" alt="Autoconhecimento em Grupo" className="w-6 h-6 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Autoconhecimento em Grupo</h3>
                                    <p className="font-sans text-gray-600 text-sm">Jornadas coletivas de transformação</p>
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
                            ✨ Você está pronta para se transformar?
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Escolha sua jornada e venha florescer com a gente.
                        </p>
                        <button
                            onClick={openPopup}
                            className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Agendar Atendimento
                        </button>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default FormacaoTerapeutas;
