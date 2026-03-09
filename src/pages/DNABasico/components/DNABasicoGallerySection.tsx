import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const DNABasicoGallerySection: React.FC = () => {
    const images = [
        { src: '/dna-basico/galeria/dna-basico-thetahealing-ariana-borges-instituto.webp', alt: 'DNA Básico ThetaHealing - Instituto Ariana Borges' },
        { src: '/dna-basico/galeria/curso-dna-basico-thetahealing-participantes.webp', alt: 'Curso DNA Básico ThetaHealing - Participantes em transformação' },
        { src: '/dna-basico/galeria/workshop-thetahealing-brasil-ariana-borges.webp', alt: 'Workshop ThetaHealing Brasil - Ariana Borges' },
        { src: '/dna-basico/galeria/dna-basico-thetahealing-experiencia-transformadora.webp', alt: 'DNA Básico ThetaHealing - Experiência transformadora' },
        { src: '/dna-basico/galeria/formacao-thetahealing-dna-basico-brasil.webp', alt: 'Formação ThetaHealing DNA Básico Brasil' },
        { src: '/dna-basico/galeria/curso-thetahealing-meditacao-expansao.webp', alt: 'Curso ThetaHealing - Meditação e expansão de consciência' },
        { src: '/dna-basico/galeria/dna-basico-thetahealing-cura-energetica.webp', alt: 'DNA Básico ThetaHealing - Cura energética e espiritual' },
        { src: '/dna-basico/galeria/workshop-dna-basico-autoconhecimento.webp', alt: 'Workshop DNA Básico - Autoconhecimento e cura' },
        { src: '/dna-basico/galeria/thetahealing-brasil-consciencia-expansao.webp', alt: 'ThetaHealing Brasil - Expansão de consciência' },
        { src: '/dna-basico/galeria/dna-basico-thetahealing-atividades-grupo.webp', alt: 'DNA Básico ThetaHealing - Atividades em grupo' },
        { src: '/dna-basico/galeria/curso-thetahealing-transformacao-interior.webp', alt: 'Curso ThetaHealing - Transformação interior' },
        { src: '/dna-basico/galeria/instituto-ariana-borges-thetahealing-pratica.webp', alt: 'Instituto Ariana Borges - Prática ThetaHealing' },
        { src: '/dna-basico/galeria/dna-basico-thetahealing-momento-cura.webp', alt: 'DNA Básico ThetaHealing - Momento de cura profunda' },
        { src: '/dna-basico/galeria/ariana-borges-instrutora-thetahealing-master.webp', alt: 'Ariana Borges - Instrutora Master & Science ThetaHealing' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-a.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo A' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-c.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo C' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-d.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo D' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-e.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo E' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-f.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo F' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-g.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo G' },
        { src: '/dna-basico/galeria/turma-dna-basico-thetahealing-grupo-b.webp', alt: 'Turma DNA Básico ThetaHealing - Grupo B' },
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
