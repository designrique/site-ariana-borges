
import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { current } = scrollRef;
                const maxScrollLeft = current.scrollWidth - current.clientWidth;

                // If we're at the end, scroll back to start
                if (current.scrollLeft >= maxScrollLeft - 10) {
                    current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll('right');
                }
            }
        }, 5000); // Scroll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Ana Cláudia",
            age: "",
            context: "",
            quote: "Quando eu vi o Encontro das Deusas achei que era uma boa oportunidade de reencontrar a mulher que eu quero ser...",
            videoUrl: "https://drive.google.com/file/d/12tDxDolVk15lWfUIfyK1js66o9XJ2tSH/preview",
            thumbnail: "/assets/images/thumbs/video1.jpg"
        },
        {
            id: 2,
            name: "Karina Moraes",
            age: "",
            context: "",
            quote: "...o encontro das deusas veio para me conectar com o meu feminino, me curar através da minha ancestralidade todas as crenças que eu tinha...",
            videoUrl: "https://drive.google.com/file/d/1UJAHpXuOhxaqzItmxErwHTS4u6pgHO-t/preview",
            thumbnail: "/assets/images/thumbs/video2.jpg"
        },
        {
            id: 3,
            name: "Luana",
            age: "",
            context: "",
            quote: "...o Encontro das Deusas veio culminar com várias coisas que eu já estava buscando no meu feminino, coisas que ainda estavam bloqueadas... super indico, foi uma experiência fantástica",
            videoUrl: "https://drive.google.com/file/d/1435EQGLpsXo3QPXfDganJIReUsSaFpAb/preview",
            thumbnail: "/assets/images/thumbs/video3.jpg"
        },
        {
            id: 4,
            name: "Joelma Monteiro",
            age: "",
            context: "",
            quote: "...estava a beira de uma depressão ...hoje eu estou saindo daqui mais forte, mais decidida, mais segura...",
            videoUrl: "https://drive.google.com/file/d/1t-uwHqnxQ-JoFuvzNaAog45zhswhRlaw/preview",
            thumbnail: "/assets/images/thumbs/video4.jpg"
        },
        {
            id: 5,
            name: "Márcia",
            age: "",
            context: "",
            quote: "...fui surpreendida com os acontecimentos do curso, posso dizer que hoje sou outra pessoa Só tenho a dizer Gratidão.",
            videoUrl: "https://drive.google.com/file/d/1bekZ-nr4ixsH9LQs7u2sxAQZr49XVfZ1/preview",
            thumbnail: "/assets/images/thumbs/video5.jpg"
        },
        {
            id: 6,
            name: "Chelly",
            age: "",
            context: "",
            quote: "...saio daqui hoje me sentindo mais mulher, preenchida, inteira. E o lugar incrível, a conexão que a gente tem com a natureza, com a terra, com o ar, com o fogo é incrível.",
            videoUrl: "https://drive.google.com/file/d/1avN82YG1_vsgGLgD3Zihz5SFFqQ42h1Q/preview",
            thumbnail: "/assets/images/thumbs/video6.jpg"
        },
        {
            id: 7,
            name: "Patrícia",
            age: "",
            context: "",
            quote: "...esse encontro com o feminino... o lugar maravilhoso, adorei o encontro",
            videoUrl: "https://drive.google.com/file/d/1Y7YcJffsF7JIA7mOFsPBIvx1KxViNrSL/preview",
            thumbnail: "/assets/images/thumbs/video7.jpg"
        },
        {
            id: 8,
            name: "Thaisa",
            age: "",
            context: "",
            quote: "...saber novas versões sobre mim mesma é se conectar com os elementos da natureza que estão super disponíveis aqui... tudo bem bem pensado e organizado, me trouxe uma grande sintonia com a natureza.",
            videoUrl: "https://drive.google.com/file/d/124nWNZeN1oZ4eswGnq-wTlumBe2wtz3q/preview",
            thumbnail: "/assets/images/thumbs/video8.jpg"
        }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const firstCard = current.firstElementChild as HTMLElement;
            const gap = 24; // gap-6 is 1.5rem = 24px
            const scrollAmount = firstCard ? firstCard.clientWidth + gap : 300;

            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="video_testimonials" className="py-20 bg-brand-beige overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                        Histórias de Recomeço
                    </h2>
                    <p className="font-sans text-gray-600">
                        Escute quem chegou com o coração apertado e saiu com a alma lavada.
                    </p>
                </div>

                <div className="relative group">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                        aria-label="Próximo"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-6 pb-8 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="min-w-full md:min-w-[260px] md:w-[260px] snap-start flex-shrink-0"
                            >
                                <div className="group/card relative rounded-2xl overflow-hidden shadow-xl bg-white h-full flex flex-col">
                                    <div className="aspect-video w-full bg-gray-200 relative">
                                        <iframe
                                            src={t.videoUrl}
                                            className="w-full h-full"
                                            allow="autoplay"
                                            title={`Depoimento de ${t.name}`}
                                            loading="lazy"
                                        ></iframe>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <blockquote className="font-serif text-lg text-brand-dark mb-4 italic leading-relaxed">
                                            "{t.quote}"
                                        </blockquote>
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                            <div>
                                                <strong className="block text-brand-dark font-sans">{t.name}</strong>
                                                {t.context && <span className="text-xs text-gray-500 uppercase tracking-wide">{t.context}</span>}
                                            </div>
                                            {t.age && <span className="text-brand-gold font-serif text-sm italic">{t.age}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
