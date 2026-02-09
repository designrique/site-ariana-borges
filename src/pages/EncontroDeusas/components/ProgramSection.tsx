import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const ProgramSection: React.FC = () => {
    const schedule = [
        {
            day: "Sexta-feira (Noite)",
            title: "MÓDULO I – INICIAÇÃO: Validando a Dor",
            time: "18h às 21h30",
            description: "Chega de fingir que está tudo bem. Criaremos um campo seguro para você tirar a armadura.",
            rituals: ["Abertura do Círculo", "Meditação da Descida Consciente", "Escrita Curativa"],
            archetypes: "Perséfone e Ísis"
        },
        {
            day: "Sábado (Integral)",
            title: "MÓDULO II – CONSAGRAÇÃO: O Corpo que Lembra",
            time: "08h às 21h00",
            description: "Trabalho corporal profundo para curar a autoimagem e a dissociação causada pelo trauma.",
            rituals: ["Práticas de 'O Corpo como Templo'", "Ritual de Resgate de Alma", "O Fogo Sagrado"],
            archetypes: "Deméter, Afrodite e Oxum Ancestral"
        },
        {
            day: "Domingo (Manhã)",
            title: "MÓDULO III – SOBERANIA: A Mulher que Reina",
            time: "08h às 12h00",
            description: "O momento de levantar a cabeça e decidir para onde você vai.",
            rituals: ["Limites, Escolhas e Posicionamento", "Ritual da Coroação", "Selamento Final"],
            archetypes: "Ártemis, Iansã e Hécate"
        }
    ];

    return (
        <section id="program_schedule" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                        Sua Jornada de 3 Dias
                    </h2>
                    <p className="font-sans text-gray-600">
                        Utilizamos a Psicologia Arquetípica não como misticismo, mas como ferramenta de acesso ao inconsciente.
                    </p>
                </div>

                <div className="space-y-12">
                    {schedule.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-0">
                            {/* Vertical Line for Desktop */}
                            <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-brand-gold/30 -translate-x-1/2"></div>

                            <div className={`flex flex-col md:flex-row gap-8 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Time/Day Badge */}
                                <div className="flex-1 w-full md:w-auto md:text-right sticky top-24 self-start">
                                    <div className={`inline-flex flex-col md:items-end ${index % 2 !== 0 ? 'md:items-start' : ''}`}>
                                        <span className="font-serif text-2xl text-brand-goldDark block mb-1">{item.day}</span>
                                        <span className="font-sans text-sm text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                            <Clock size={14} /> {item.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute left-0 md:left-[50%] w-4 h-4 rounded-full bg-brand-gold border-4 border-white shadow-sm md:-translate-x-1/2 mt-2"></div>

                                {/* Content Card */}
                                <div className="flex-1 bg-brand-beige/50 p-6 md:p-8 rounded-2xl border border-brand-lilac/10 hover:shadow-md transition-shadow duration-300 w-full">
                                    <h3 className="font-serif text-xl text-brand-dark mb-3 font-bold">
                                        {item.title}
                                    </h3>
                                    <p className="font-sans text-gray-700 mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="space-y-3">
                                        <div className="text-sm">
                                            <strong className="text-brand-lilacDark block mb-1">Rituais & Práticas:</strong>
                                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                                {item.rituals.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                        <div className="text-sm border-t border-brand-gold/10 pt-3 mt-3">
                                            <span className="text-gray-500">Arquétipos: </span>
                                            <span className="font-medium text-brand-dark">{item.archetypes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramSection;
