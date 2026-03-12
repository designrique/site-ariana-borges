import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Preciso já ter lido o livro?",
            answer: "Não. A leitura será conduzida ao longo dos encontros.",
        },
        {
            question: "As aulas ficam gravadas?",
            answer: "Pode ser disponibilizada gravação para participantes que perderem algum encontro.",
        },
        {
            question: "Preciso ter experiência com terapia?",
            answer: "Não. O grupo é aberto tanto para iniciantes quanto para quem já está em processos de autoconhecimento.",
        },
        {
            question: "Como faço a inscrição?",
            answer: "Clique no botão da página.",
        },
    ];

    return (
        <section id="faq_section" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">
                    Dúvidas Frequentes
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-brand-beige/50 rounded-xl border border-brand-lilac/20 overflow-hidden transition-all duration-300"
                        >
                            <button
                                className="w-full flex justify-between items-center p-6 text-left hover:bg-brand-lilac/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="font-serif text-lg text-brand-dark font-medium">{faq.question}</span>
                                <span className="text-brand-gold ml-4">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <div
                                id={`faq-answer-${index}`}
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                role="region"
                            >
                                <div className="p-6 pt-0 font-sans text-gray-600 whitespace-pre-wrap">
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

export default FAQSection;
