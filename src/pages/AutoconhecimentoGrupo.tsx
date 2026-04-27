import React from 'react';
import { Helmet } from 'react-helmet-async';
import { People, Calendar, Location, Clock, Wifi } from 'iconsax-react';

import ScrollReveal from '@/components/ScrollReveal';
import { useWhatsApp } from '@/components/WhatsAppButton';
import { Link } from 'react-router-dom';

const vivencias = [
    {
        img: '/icons/site/neurociencia.png',
        color: 'gold' as const,
        title: 'Prosperare® – Ciência, Fé e Vibração',
        description: 'Um curso completo que une espiritualidade e neurociência para ativar a abundância em todas as áreas da vida. Descubra como mente e energia criam realidade.',
        duration: '2 dias',
        format: 'Presencial',
        icon: <Location size={14} variant="Linear" color="currentColor" />,
    },
    {
        img: '/icons/site/abre-caminho.png',
        color: 'lilac' as const,
        title: 'Ativação da Kundalini em grupo',
        description: 'Vivência poderosa de despertar da energia vital que habita sua base da coluna. Através de práticas específicas, essa ativação libera bloqueios, expande a consciência e desperta seu potencial criativo.',
        duration: '1h',
        format: 'Online ou Presencial',
        icon: <Wifi size={14} variant="Linear" color="currentColor" />,
    },
    {
        img: '/icons/site/constelacao-sistemica.png',
        color: 'gold' as const,
        title: 'Dedo Magnético® – Atraindo Relacionamentos Saudáveis',
        description: 'Workshop focado em libertar padrões inconscientes que atraem relacionamentos tóxicos. Aprenda a elevar sua frequência para magnetizar conexões baseadas em amor, respeito e crescimento mútuo.',
        duration: 'Curso gravado ou 2 dias',
        format: 'Apenas Online',
        icon: <Wifi size={14} variant="Linear" color="currentColor" />,
    },
    {
        img: '/icons/site/mindfulness.png',
        color: 'lilac' as const,
        title: 'Meditação dos Espirais',
        description: 'Prática meditativa profunda que utiliza o movimento espiral como portal de expansão da consciência. Conecte-se com dimensões elevadas e receba insights para sua jornada.',
        duration: '2 dias',
        format: 'Online ou Presencial',
        icon: <Wifi size={14} variant="Linear" color="currentColor" />,
    },
    {
        img: '/icons/site/autoconhecimento-grupo.png',
        color: 'gold' as const,
        title: 'Encontro das Deusas – Retiro Presencial',
        description: 'Retiro exclusivo para mulheres que desejam reconectar-se com o sagrado feminino. Dias de imersão com rituais, práticas de cura e conexão profunda entre mulheres.',
        duration: '3 dias',
        format: 'Presencial',
        icon: <Location size={14} variant="Linear" color="currentColor" />,
    },
    {
        img: '/icons/site/registros-akashicos.png',
        color: 'lilac' as const,
        title: 'Confraria da Lua – Grupo de Leitura para Mulheres',
        description: 'Círculo mensal online onde mulheres se reúnem para estudar, compartilhar e crescer juntas. Leituras selecionadas sobre espiritualidade, autoconhecimento e empoderamento feminino.',
        duration: 'Semestral',
        format: 'Online',
        icon: <Wifi size={14} variant="Linear" color="currentColor" />,
    },
];

const AutoconhecimentoGrupo: React.FC = () => {
    const { openPopup } = useWhatsApp();

    return (
        <>
            <Helmet>
                <title>Autoconhecimento em Grupo - Instituto Ariana Borges</title>
                <meta name="description" content="Espiritualidade, sabedoria e cura emocional em jornadas coletivas de transformação. Grupos, vivências e retiros para sua evolução." />
                <meta property="og:title" content="Autoconhecimento em Grupo - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-12 md:py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lilac/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <People size={14} variant="Linear" color="currentColor" /> Autoconhecimento em Grupo
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                        Espiritualidade, sabedoria e <span className="text-brand-goldDark italic">cura emocional</span> em jornadas coletivas
                    </h1>
                    <p className="font-sans text-gray-600 text-lg max-w-3xl mx-auto mb-10">
                        A energia do grupo potencializa a transformação individual. Junte-se a nós em vivências que expandem consciência, curam feridas e despertam seu potencial mais elevado.
                    </p>
                    <button
                        onClick={openPopup}
                        className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1"
                    >
                        Marque um Atendimento
                    </button>
                </div>
            </section>

            {/* Vivências Section */}
            <ScrollReveal>
                <section className="py-12 md:py-20 bg-white">
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
                                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center mb-4 shrink-0 bg-white shadow-sm">
                                        <img src={vivencia.img} alt={vivencia.title} className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-dark mb-3">{vivencia.title}</h3>
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                                        {vivencia.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-brand-lilacDark">
                                            <Clock size={14} variant="Linear" color="currentColor" />
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
                <section className="py-12 md:py-20 bg-brand-lilac/10">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">
                            ✦ A Cura Começa com a Escolha
                        </h2>
                        <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                            O trabalho em grupo oferece uma dimensão única de cura. Quando nos reunimos com intenção compartilhada, criamos um campo energético poderoso que amplifica a transformação de cada participante.
                        </p>
                        <p className="font-sans text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            Seja em vivências intensivas de um dia ou em grupos contínuos, cada encontro é uma oportunidade de se ver refletida no outro, de ser testemunhada em sua vulnerabilidade e de celebrar suas conquistas em comunidade.
                        </p>
                    </div>
                </section>
            </ScrollReveal>

            {/* Próximos Eventos */}
            <ScrollReveal>
                <section className="py-12 md:py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-gradient-to-r from-brand-lilac/30 to-brand-gold/20 p-8 md:p-12 rounded-3xl text-center">
                            <Calendar size={48} variant="Linear" color="currentColor" className="text-brand-lilacDark mx-auto mb-4" />
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                                Quer saber das próximas turmas?
                            </h2>
                            <p className="font-sans text-gray-600 mb-8 max-w-2xl mx-auto">
                                Entre em contato para saber sobre as próximas datas e garantir sua vaga nas vivências que ressoam com você.
                            </p>
                            <button
                                onClick={openPopup}
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
                <section className="py-10 md:py-16 bg-brand-beige">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="font-serif text-2xl md:text-3xl text-brand-dark text-center mb-8">
                            Conheça também
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <Link
                                to="/terapia-individual"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="bg-brand-lilac/10 w-20 h-20 rounded-full flex items-center justify-center shrink-0">
                                    <img src="/icons/site/terapia-individual.png" alt="Terapia Individual" className="w-12 h-12 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-lg text-brand-dark group-hover:text-brand-gold transition-colors">Terapia Individual</h3>
                                    <p className="font-sans text-gray-600 text-sm">Sessões personalizadas de cura</p>
                                </div>
                            </Link>
                            <Link
                                to="/formacao-de-terapeutas"
                                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="bg-brand-gold/10 w-20 h-20 rounded-full flex items-center justify-center shrink-0">
                                    <img src="/icons/site/formacao-terapeutas.png" alt="Formação de Terapeutas" className="w-12 h-12 object-contain" />
                                </div>
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
                <section className="py-14 md:py-24 bg-brand-lilac/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl -z-10"></div>
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-brand-dark mb-6">
                            Venha se transformar em grupo
                        </h2>
                        <p className="font-sans text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                            Cada vivência é uma porta para uma versão mais plena de você. Escolha a que ressoa com seu momento e garanta sua vaga.
                        </p>
                        <button
                            onClick={openPopup}
                            className="bg-brand-lilacDark hover:bg-brand-gold text-white font-sans font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg transform hover:-translate-y-1 hover:scale-105"
                        >
                            Quero Participar
                        </button>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default AutoconhecimentoGrupo;
