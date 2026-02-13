import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GallerySection: React.FC = () => {
    // List of existing image indices in public/fotos-encontro-deusas
    // Updated to reflect only the images currently present in the filesystem
    const imageIndices = [
        2, 8, 11, 15, 16, 20, 23, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 41, 43, 46, 48, 50, 51, 52, 54, 55, 56, 57, 58, 60, 62, 65, 67, 68, 70, 73, 74, 80, 81, 82, 83, 84, 86
    ];

    // Initialize state with a shuffled version of the image indices
    const [shuffledImages] = useState(() => {
        const baseImages = imageIndices.map((n, i) => ({
            src: `/fotos-encontro-deusas/fotos-encontro-deusas${n}.jpg`,
            alt: `Encontro das Deusas - Momento ${i + 1}`,
            id: n
        }));
        return [...baseImages].sort(() => Math.random() - 0.5);
    });

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
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

    // Keyboard navigation for modal
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

    // Carousel navigation
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
        <section id="past_events_gallery" className="py-20 bg-brand-beige overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
                        Memórias de quem já viveu
                    </h2>
                    <p className="font-sans text-gray-600 max-w-2xl mx-auto">
                        Registros de egrégoras anteriores. Mulheres reais, sem filtros, em um espaço seguro de conexão.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:block"
                        aria-label="Anterior"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:block"
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
                                key={img.id}
                                className="min-w-[80vw] md:min-w-[300px] h-[300px] md:h-[250px] snap-center flex-shrink-0 relative group/card cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                    loading="lazy"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'; // Hide broken images
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Maximize2 className="text-white drop-shadow-md" size={32} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
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

export default GallerySection;
