import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const LocationSection: React.FC = () => {
    const locationImages = [
        "/riobonito/image-bonito-pernambuco-refugio-do-rio-bonito-1.jpeg",
        "/riobonito/pousadarefugio-riobonito.webp",
        "/riobonito/pousadarefugio-riobonito2.webp"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % locationImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="location_details" className="py-20 bg-brand-dark text-brand-beige">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">

                    <div className="w-full md:w-1/2 relative group h-[400px]">
                        <div className="absolute -inset-4 bg-brand-gold/10 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>

                        {/* Carousel Container */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            {locationImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Pousada Refúgio do Rio Bonito - Vista ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}

                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {locationImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                        aria-label={`Ver imagem ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex items-center gap-2 text-brand-gold mb-2">
                            <MapPin size={20} />
                            <span className="uppercase tracking-widest text-sm font-bold">Bonito / PE</span>
                        </div>

                        <h2 className="font-serif text-3xl md:text-5xl leading-tight">
                            O Território Sagrado
                        </h2>

                        <h3 className="font-sans text-xl text-brand-lilac">
                            Pousada Refúgio do Rio Bonito
                        </h3>

                        <div className="prose prose-invert prose-lg text-gray-300">
                            <p>
                                Um santuário ecológico perfeito para silenciar o ruído externo.
                            </p>
                            <p>
                                Incluso no pacote: <strong>hospedagem em quartos acolhedores</strong> e <strong>alimentação consciente completa</strong> (café, almoço e jantar), permitindo que seu corpo desintoxique junto com sua mente.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LocationSection;
