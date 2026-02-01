import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Clock, MapPin, Video } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useScheduling } from '@/components/SchedulingContext';
import { Link } from 'react-router-dom';

const terapiasOnline = [
    {
        emoji: '🔮',
        title: 'Tarô de Salomão',
        description: 'Uma leitura oracular precisa e profunda, que revela padrões ocultos, orientações do campo espiritual e decisões práticas alinhadas à sua verdade. Canaliza a sabedoria ancestral de Salomão com foco em clareza e direcionamento.',
        duration: '45 min'
    },
    {
        emoji: '🕯️',
        title: 'Mesa de Salomão',
        description: 'Ferramenta de cura vibracional e reequilíbrio energético que atua à distância sobre bloqueios mentais, emocionais e espirituais. Trabalha com a remoção de energias densas e padrões nocivos.',
        duration: '1h'
    },
    {
        emoji: '🌈',
        title: 'Leitura de Aura – Método Essence',
        description: 'Um mergulho profundo no seu campo energético para identificar padrões, bloqueios e potenciais. A leitura revela aspectos ocultos do seu ser e oferece direcionamentos precisos.',
        duration: '1h'
    },
    {
        emoji: '📚',
        title: 'Leitura de Registros Akáshicos',
        description: 'Acesse o campo quântico de memórias da sua alma. Descubra padrões kármicos, conexões de vidas passadas e receba orientações para sua evolução espiritual.',
        duration: '1h'
    },
    {
        emoji: '🌌',
        title: 'Mesa Metatrônica',
        description: 'Técnica avançada de cura dimensional que trabalha com geometria sagrada e frequências elevadas. Atua em múltiplos níveis de consciência promovendo transformações profundas.',
        duration: '1h30'
    },
    {
        emoji: '🧠',
        title: 'Psicanálise Integrativa',
        description: 'Abordagem que une a psicanálise tradicional com técnicas integrativas, oferecendo uma compreensão profunda dos padrões inconscientes enquanto trabalha aspectos energéticos.',
        duration: '1h'
    },
    {
        emoji: '💎',
        title: 'ThetaHealing®',
        description: 'Técnica de meditação e cura que acessa a onda cerebral Theta para identificar e transformar crenças limitantes. Promove mudanças rápidas e profundas em todos os níveis.',
        duration: '1h'
    },
    {
        emoji: '🌿',
        title: 'Constelação Sistêmica',
        description: 'Metodologia que revela dinâmicas ocultas nos sistemas familiares e relacionais. Permite identificar e harmonizar padrões transgeracionais que afetam sua vida atual.',
        duration: '1h30'
    },
    {
        emoji: '⚡',
        title: 'Cura Reconectiva',
        description: 'Técnica que trabalha com frequências de cura para reconectar você com a plenitude do universo. Promove equilíbrio físico, mental e espiritual.',
        duration: '1h'
    },
    {
        emoji: '✨',
        title: 'Reiki',
        description: 'Terapia energética japonesa que utiliza a imposição das mãos para canalizar energia vital universal. Promove relaxamento profundo e equilíbrio energético.',
        duration: '1h'
    },
];

const terapiasPresenciais = [
    {
        emoji: '✨',
        title: 'Barras de Access®',
        description: 'Técnica que trabalha 32 pontos na cabeça que armazenam pensamentos, crenças e emoções limitantes. O toque suave libera cargas eletromagnéticas, promovendo mais clareza e leveza.',
        duration: '1h'
    },
];

const TerapiaIndividual: React.FC = () => {
    const { openScheduling } = useScheduling();

    return (
        <>
            <Helmet>
                <title>Terapia Individual - Instituto Ariana Borges</title>
                <meta name="description" content="Ferramentas para despertar, curar e transformar vidas. Terapias individuais online e presenciais com técnicas integrativas." />
                <meta property="og:title" content="Terapia Individual - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <Sparkles size={14} /> Terapia Individual
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Ferramentas para <span className="text-brand-goldDark italic">despertar, curar</span> e transformar vidas
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        Cada sessão é um encontro sagrado com seu eu mais profundo. Utilizamos técnicas integrativas que atuam em múltiplas dimensões do seu ser.
                    </p>
                    <button
                        onClick={openScheduling}
                        className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                        Marque um Atendimento
                    </button>
                </div>
            </section>

            {/* Online Therapies Section */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <Video className="text-brand-lilacDark" size={24} />
                            <span className="font-sans text-brand-lilacDark font-bold uppercase tracking-wider text-sm">
                                Online ou Presencial
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Terapias que podem ser realizadas Online ou Presencialmente
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Flexibilidade para você escolher o formato que melhor se adapta à sua rotina.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {terapiasOnline.map((terapia, index) => (
                                <div
                                    key={index}
                                    className="bg-brand-beige p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-brand-lilac/10"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-3xl">{terapia.emoji}</span>
                                        <div className="flex-1">
                                            <h3 className="font-serif text-xl text-brand-dark mb-2">{terapia.title}</h3>
                                            <p className="font-sans text-gray-600 text-sm leading-relaxed mb-3">
                                                {terapia.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-brand-lilacDark">
                                                <Clock size={14} />
                                                <span className="font-sans text-sm font-medium">Duração: {terapia.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Presencial Only Section */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <MapPin className="text-brand-goldDark" size={24} />
                            <span className="font-sans text-brand-goldDark font-bold uppercase tracking-wider text-sm">
                                Somente Presencial
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Terapias que podem ser realizadas somente Presencialmente
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Experiências que requerem o encontro presencial para sua plena realização.
                        </p>

                        <div className="max-w-2xl mx-auto">
                            {terapiasPresenciais.map((terapia, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl">{terapia.emoji}</span>
                                        <div className="flex-1">
                                            <h3 className="font-serif text-2xl text-brand-dark mb-3">{terapia.title}</h3>
                                            <p className="font-sans text-gray-600 leading-relaxed mb-4">
                                                {terapia.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-brand-goldDark">
                                                <Clock size={16} />
                                                <span className="font-sans font-medium">Duração: {terapia.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Healing Message Section */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">
                            ✦ A Cura Começa com a Escolha
                        </h2>
                        <p className="font-sans text-gray-600 text-lg leading-relaxed mb-8">
                            Cada técnica é uma porta para um aspecto diferente da sua cura. Não existe caminho errado — existe o caminho que ressoa com você neste momento. Confie na sua intuição e permita-se ser guiada pelo que seu coração pede.
                        </p>
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
                                to="/formacao-de-terapeutas"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-2xl">🎓</div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Formação de Terapeutas</h3>
                                    <p className="font-sans text-gray-600 text-sm">Torne-se um agente de transformação</p>
                                </div>
                            </Link>
                            <Link
                                to="/autoconhecimento-em-grupo"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="text-2xl">👥</div>
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
                            onClick={openScheduling}
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

export default TerapiaIndividual;
