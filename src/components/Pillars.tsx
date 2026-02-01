import React from 'react';
import { UserCheck, GraduationCap, Users, ShieldCheck, Lightbulb, FileText, Search, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/lib/cms';

const iconMap: Record<string, React.ReactNode> = {
    'UserCheck': <UserCheck size={32} />,
    'GraduationCap': <GraduationCap size={32} />,
    'Users': <Users size={32} />,
    'ShieldCheck': <ShieldCheck size={32} />,
    'Lightbulb': <Lightbulb size={32} />,
    'FileText': <FileText size={32} />,
    'Search': <Search size={32} />,
    'Clock': <Clock size={32} />,
};

const Pillars: React.FC = () => {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: getServices
    });

    const pillars = services && services.length > 0 ? services.map(s => ({
        icon: s.icon ? iconMap[s.icon] : <UserCheck size={32} />,
        title: s.title,
        description: s.description,
        link: s.link || '#',
        cta: s.cta || 'Saiba mais'
    })) : [
        {
            icon: <UserCheck size={32} />,
            title: 'Terapia Individual',
            description: 'Liberte-se: Desperte, Cure e Transforme sua Vida com sessões de Terapia Personalizada.',
            link: '/terapia-individual',
            cta: 'Saiba mais'
        },
        {
            icon: <GraduationCap size={32} />,
            title: 'Formação de Terapeutas',
            description: 'Seja um Agente de Mudança: Diversas Formações de Terapeuta de Excelência.',
            link: '/formacao-de-terapeutas',
            cta: 'Saiba mais'
        },
        {
            icon: <Users size={32} />,
            title: 'Autoconhecimento em Grupo',
            description: 'Junte-se a uma Jornada de Descoberta: Turmas de Autoconhecimento para Transformação Interior.',
            link: '/autoconhecimento-em-grupo',
            cta: 'Saiba mais'
        }
    ];

    return (
        <section className="py-16 bg-brand-beige">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">
                    Nossas Frentes de Atuação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-brand-lilac/20"
                        >
                            <div className="text-brand-gold mb-6 bg-brand-lilac/10 w-16 h-16 rounded-full flex items-center justify-center">
                                {pillar.icon}
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
