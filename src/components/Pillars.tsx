import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/cms';

const iconMap: Record<string, string> = {
    'UserCheck': '/icons/site/terapia-individual.png',
    'GraduationCap': '/icons/site/formacao-terapeutas.png',
    'Users': '/icons/site/autoconhecimento-grupo.png',
    'ShieldCheck': '/icons/site/quebra-maldicao.png',
    'Lightbulb': '/icons/site/transformacao-pessoal.png',
    'FileText': '/icons/site/registros-akashicos.png',
    'Search': '/icons/site/leitura-aura.png',
    'Clock': '/icons/site/mindfulness.png',
};

const Pillars: React.FC = () => {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: getServices
    });

    const pillars = services && services.length > 0 ? services.map(s => ({
        img: s.icon ? (iconMap[s.icon] ?? '/icons/site/terapia-individual.png') : '/icons/site/terapia-individual.png',
        title: s.title,
        description: s.description,
        link: s.link || '#',
        cta: s.cta || 'Saiba mais'
    })) : [
        {
            img: '/icons/site/terapia-individual.png',
            title: 'Terapia Individual',
            description: 'Liberte-se: Desperte, Cure e Transforme sua Vida com sessões de Terapia Personalizada.',
            link: '/terapia-individual',
            cta: 'Saiba mais'
        },
        {
            img: '/icons/site/formacao-terapeutas.png',
            title: 'Formação de Terapeutas',
            description: 'Seja um Agente de Mudança: Diversas Formações de Terapeuta de Excelência.',
            link: '/formacao-de-terapeutas',
            cta: 'Saiba mais'
        },
        {
            img: '/icons/site/autoconhecimento-grupo.png',
            title: 'Autoconhecimento em Grupo',
            description: 'Junte-se a uma Jornada de Descoberta: Turmas de Autoconhecimento para Transformação Interior.',
            link: '/autoconhecimento-em-grupo',
            cta: 'Saiba mais'
        }
    ];

    return (
        <section className="py-10 md:py-16 bg-brand-beige">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-serif text-2xl md:text-4xl text-brand-dark text-center mb-8 md:mb-12">
                    Nossas Frentes de Atuação
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-brand-lilac/20"
                        >
                            <div className="mb-6 bg-brand-lilac/10 w-20 h-20 rounded-full flex items-center justify-center">
                                <img src={pillar.img} alt={pillar.title} className="w-14 h-14 object-contain" />
                            </div>
                            <h3 className="font-serif text-2xl text-brand-dark mb-4">{pillar.title}</h3>
                            <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                                {pillar.description}
                            </p>
                            <a
                                href={pillar.link}
                                className="text-brand-lilacDark font-bold text-sm tracking-wider uppercase hover:text-brand-gold transition-colors inline-flex items-center group"
                            >
                                {pillar.cta}
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;
