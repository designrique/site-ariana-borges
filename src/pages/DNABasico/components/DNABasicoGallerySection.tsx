import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const DNABasicoGallerySection: React.FC = () => {
    const images = [
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/DSC_1413.webp', alt: 'DNA Básico - Recordação 1' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/IMG-20150402-WA0004.webp', alt: 'DNA Básico - Recordação 2' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/IMG-20150624-WA0010.webp', alt: 'DNA Básico - Recordação 3' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais  Fotografias (142).webp', alt: 'DNA Básico - Recordação 4' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais  Fotografias (5).webp', alt: 'DNA Básico - Recordação 5' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (10).webp', alt: 'DNA Básico - Recordação 6' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (11).webp', alt: 'DNA Básico - Recordação 7' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (15).webp', alt: 'DNA Básico - Recordação 8' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (29).webp', alt: 'DNA Básico - Recordação 9' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (31).webp', alt: 'DNA Básico - Recordação 10' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (40).webp', alt: 'DNA Básico - Recordação 11' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (47).webp', alt: 'DNA Básico - Recordação 12' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (6).webp', alt: 'DNA Básico - Recordação 13' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (66).webp', alt: 'DNA Básico - Recordação 14' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/Kaká Morais Fotografia (7).webp', alt: 'DNA Básico - Recordação 15' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH A.webp', alt: 'DNA Básico - Recordação 16' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH C.webp', alt: 'DNA Básico - Recordação 17' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH D.webp', alt: 'DNA Básico - Recordação 18' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH E.webp', alt: 'DNA Básico - Recordação 19' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH F.webp', alt: 'DNA Básico - Recordação 20' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA TH G.webp', alt: 'DNA Básico - Recordação 21' },
        { src: '/dna-basico/dna-basico-fotos/7.IAB DNA BÁSICO Theathealing/TURMA THA B.webp', alt: 'DNA Básico - Recordação 22' },
    ];

    // Shuffled images on mount
    const [shuffledImages] = useState(() =>
        [...images].sort(() => Math.random() - 0.5)
    );

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'unset';
    };

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev === null || prev === shuffledImages.length - 1 ? 0 : prev + 1));
        }
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev === null || prev === 0 ? shuffledImages.length - 1 : prev - 1));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth / 2;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="dna_basico_memories" className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-goddess-purpleDark mb-4">
                        Memórias de DNAs passados
                    </h2>
                    <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto">
                        Registros de turmas anteriores. Transformações profundas em um espaço de cura e expansão.
                    </p>
                </div>

                <div className="relative group">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-goddess-purple hover:text-white text-goddess-purple p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:block"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-goddess-purple hover:text-white text-goddess-purple p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:block"
                        aria-label="Próximo"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-4 pb-8 px-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {shuffledImages.map((img, index) => (
                            <div
                                key={index}
                                className="min-w-[80vw] md:min-w-[350px] h-[300px] md:h-[280px] snap-center flex-shrink-0 relative group/card cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-goddess-purple/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Maximize2 className="text-white drop-shadow-md" size={32} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedImageIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Fechar galeria"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                        aria-label="Próxima imagem"
                    >
                        <ChevronRight size={48} />
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={shuffledImages[selectedImageIndex].src}
                            alt={shuffledImages[selectedImageIndex].alt}
                            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-sans backdrop-blur-sm">
                            {selectedImageIndex + 1} / {shuffledImages.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DNABasicoGallerySection;
