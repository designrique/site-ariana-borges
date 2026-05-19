import React from 'react';

const imagineItems = [
    'identificar sinais que antes ignorava.',
    'parar de aceitar migalhas emocionais.',
    'sentir paz ao invés de ansiedade dentro de uma relação.',
    'aprender a escolher ao invés de apenas esperar ser escolhida.',
    'perceber que amor saudável não precisa doer.',
];

const ImagineSection: React.FC = () => {
    return (
        <section id="imagine" className="py-20 md:py-28 bg-brand-dark text-brand-beige">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                        Imagine como será quando:
                    </h2>
                </div>

                <ul className="space-y-5 max-w-2xl mx-auto">
                    {imagineItems.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-4 font-sans text-lg text-gray-200 leading-relaxed"
                        >
                            <span className="font-serif text-brand-gold text-2xl shrink-0 leading-none mt-1">↳</span>
                            <span>Você {item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ImagineSection;
