import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Como funcionam os atendimentos?",
        answer: "Os atendimentos podem ser realizados de forma online ou presencial, com duração média de 50 minutos a 1h30, dependendo da técnica escolhida."
    },
    {
        question: "Quais técnicas são utilizadas?",
        answer: "Utilizamos uma abordagem integrativa que pode incluir Psicanálise, ThetaHealing®, Mesa de Salomão, Reiki, e outras ferramentas de cura vibracional."
    },
    {
        question: "Como agendar uma consulta?",
        answer: "Você pode agendar diretamente pelo botão de WhatsApp no site ou através da página de contato."
    },
    {
        question: "Os cursos possuem certificado?",
        answer: "Sim, todos os cursos de formação terapêutica oferecem certificação reconhecida para atuação profissional."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-brand-beige">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">
                    Perguntas Frequentes
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
                        >
                            <button
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-serif text-lg text-brand-dark font-medium">{faq.question}</span>
                                <span className="text-brand-gold ml-4">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 font-sans text-gray-600 bg-white border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
