import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Users, Calendar, MapPin, Clock, Wifi } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useScheduling } from '@/components/SchedulingContext';
import { Link } from 'react-router-dom';

const vivencias = [
    {
        emoji: '🌟',
        title: 'Prosperare® – Ciência, Fé e Vibração',
        description: 'Um curso completo que une espiritualidade e neurociência para ativar a abundância em todas as áreas da vida. Descubra como mente e energia criam realidade.',
        duration: '2 dias',
        format: 'Presencial',
        icon: <MapPin size={14} />,
    },
    {
        emoji: '🔥',
        title: 'Ativação da Kundalini em grupo',
        description: 'Vivência poderosa de despertar da energia vital que habita sua base da coluna. Através de práticas específicas, essa ativação libera bloqueios, expande a consciência e desperta seu potencial criativo.',
        duration: '1 dia',
        format: 'Presencial',
        icon: <MapPin size={14} />,
    },
    {
        emoji: '❤️',
        title: 'Dedo Magnético® – Atraindo Relacionamentos Saudáveis',
        description: 'Workshop focado em libertar padrões inconscientes que atraem relacionamentos tóxicos. Aprenda a elevar sua frequência para magnetizar conexões baseadas em amor, respeito e crescimento mútuo.',
        duration: '1 dia',
        format: 'Online ou Presencial',
        icon: <Wifi size={14} />,
    },
    {
        emoji: '🌀',
        title: 'Meditação dos Espirais',
        description: 'Prática meditativa profunda que utiliza o movimento espiral como portal de expansão da consciência. Conecte-se com dimensões elevadas e receba insights para sua jornada.',
        duration: '3 horas',
        format: 'Online ou Presencial',
        icon: <Wifi size={14} />,
    },
    {
        emoji: '🌸',
        title: 'Encontro das Deusas – Retiro Presencial',
        description: 'Retiro exclusivo para mulheres que desejam reconectar-se com o sagrado feminino. Dias de imersão com rituais, práticas de cura e conexão profunda entre mulheres.',
        duration: '3 dias',
        format: 'Presencial',
        icon: <MapPin size={14} />,
    },
    {
        emoji: '🌕',
        title: 'Confraria da Lua – Grupo de Leitura para Mulheres',
        description: 'Círculo mensal online onde mulheres se reúnem para estudar, compartilhar e crescer juntas. Leituras selecionadas sobre espiritualidade, autoconhecimento e empoderamento feminino.',
        duration: 'Mensal',
        format: 'Online',
        icon: <Wifi size={14} />,
    },
];

const AutoconhecimentoGrupo: React.FC = () => {
    const { openScheduling } = useScheduling();

    return (
        <>
            <Helmet>
                <title>Autoconhecimento em Grupo - Instituto Ariana Borges</title>
                <meta name="description" content="Espiritualidade, sabedoria e cura emocional em jornadas coletivas de transformação. Grupos, vivências e retiros para sua evolução." />
                <meta property="og:title" content="Autoconhecimento em Grupo - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <Users size={14} /> Autoconhecimento em Grupo
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Espiritualidade, sabedoria e <span className="text-brand-goldDark italic">cura emocional</span> em jornadas coletivas
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        A energia do grupo potencializa a transformação individual. Junte-se a nós em vivências que expandem consciência, curam feridas e despertam seu potencial mais elevado.
                    </p>
                    <button
                        onClick={openScheduling}
                        className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                        Marque um Atendimento
                    </button>
                </div>
            </section>

            {/* Vivências Section */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">
                            Nossas Vivências e Grupos
                        </h2>
                        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">
                            Cada experiência é desenhada para promover transformação profunda através do poder da coletividade.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vivencias.map((vivencia, index) => (
                                <div
                                    key={index}
                                    className="bg-brand-beige p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-brand-lilac/10 flex flex-col"
                                >
                                    <span className="text-4xl mb-4">{vivencia.emoji}</span>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3">{vivencia.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                                        {vivencia.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-brand-lilacDark">
                                            <Clock size={14} />
                                            <span className="font-sans font-medium">{vivencia.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-brand-goldDark">
                                            {vivencia.icon}
                                            <span className="font-sans font-medium">{vivencia.format}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Message Section */}
            <ScrollReveal>
                <section className="py-20 bg-brand-lilac/10">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">
                            ✦ A Cura Começa com a Escolha
                        </h2>
                        <p className="font-sans text-gray-600 text-lg leading-relaxed mb-4">
                            O trabalho em grupo oferece uma dimensão única de cura. Quando nos reunimos com intenção compartilhada, criamos um campo energético poderoso que amplifica a transformação de cada participante.
                        </p>
                        <p className="font-sans text-gray-600 leading-relaxed">
                            Seja em vivências intensivas de um dia ou em grupos contínuos, cada encontro é uma oportunidade de se ver refletida no outro, de ser testemunhada em sua vulnerabilidade e de celebrar suas conquistas em comunidade.
                        </p>
                    </div>
                </section>
            </ScrollReveal>

            {/* Próximos Eventos */}
            <ScrollReveal>
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-gradient-to-r from-brand-lilac/30 to-brand-gold/20 p-8 md:p-12 rounded-3xl text-center">
                            <Calendar className="text-brand-lilacDark mx-auto mb-4" size={48} />
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                                Quer saber das próximas turmas?
                            </h2>
                            <p className="font-sans text-gray-600 mb-8 max-w-2xl mx-auto">
                                Entre em contato para saber sobre as próximas datas e garantir sua vaga nas vivências que ressoam com você.
                            </p>
                            <button
                                onClick={openScheduling}
                                className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                            >
                                Entrar em Contato
                            </button>
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
                                <div className="text-2xl">💜</div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Terapia Individual</h3>
                                    <p className="font-sans text-gray-600 text-sm">Sessões personalizadas de cura</p>
                                </div>
                            </Link>
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

export default AutoconhecimentoGrupo;
