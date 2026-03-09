import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface ImageSequencePreloaderProps {
  basePath: string;
  frameCount: number;
  framePrefix?: string;
  frameExtension?: string;
  fps?: number;
  duration?: number;
  onComplete?: () => void;
  showSkipButton?: boolean;
}

const ImageSequencePreloader: React.FC<ImageSequencePreloaderProps> = ({
  basePath,
  frameCount = 240,
  framePrefix = 'ezgif-frame-',
  frameExtension = '.jpg',
  fps = 24, // 24 frames por segundo
  duration = 10000, // 10 segundos padrão
  onComplete,
  showSkipButton = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFrames, setLoadedFrames] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const controls = useAnimation();

  // Gerar array de URLs dos frames
  const frameUrls = Array.from({ length: frameCount }, (_, i) => {
    const frameNumber = (i + 1).toString().padStart(3, '0');
    return `${basePath}/${framePrefix}${frameNumber}${frameExtension}`;
  });

  // Pré-carregar imagens
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = frameUrls.map((url, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedFrames(prev => {
              const newSet = new Set(prev);
              newSet.add(index + 1);
              return newSet;
            });
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${index + 1}`);
            resolve();
          };
          img.src = url;
        });
      });

      await Promise.all(loadPromises);
      setIsLoading(false);
    };

    loadImages();
  }, [frameUrls]);

  // Animação da sequência de imagens
  useEffect(() => {
    if (isLoading || isSkipped || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const totalFrames = frameCount;
    const frameDuration = 1000 / fps; // ms por frame
    const totalDuration = Math.min(duration, totalFrames * frameDuration);

    let frameIndex = 0;
    const images: HTMLImageElement[] = [];

    // Carregar todas as imagens em memória
    const loadAllImages = async () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = frameUrls[i];
        images.push(img);
        await new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
    };

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progressRatio = Math.min(elapsed / totalDuration, 1);
      
      // Atualizar progresso
      setProgress(progressRatio * 100);
      
      // Calcular frame atual baseado no tempo
      frameIndex = Math.floor((elapsed / frameDuration) % totalFrames);
      setCurrentFrame(frameIndex + 1);

      // Desenhar frame atual no canvas
      if (images[frameIndex] && images[frameIndex].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calcular escala para preencher o canvas mantendo proporção
        const img = images[frameIndex];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Aplicar efeitos visuais
        applyVisualEffects(ctx, canvas, progressRatio);
      }

      if (elapsed < totalDuration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        handleComplete();
      }
    };

    const applyVisualEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number) => {
      // Overlay gradiente espiritual
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(30, 58, 138, 0.3)'); // brand-blueDark
      gradient.addColorStop(0.5, 'rgba(101, 163, 13, 0.2)'); // brand-green
      gradient.addColorStop(1, 'rgba(180, 83, 9, 0.3)'); // brand-goldDark
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Efeito de brilho pulsante
      const pulseIntensity = 0.3 + 0.2 * Math.sin(progress * Math.PI * 4);
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );
      glowGradient.addColorStop(0, `rgba(251, 191, 36, ${pulseIntensity * 0.3})`); // brand-gold
      glowGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    };

    // Iniciar animação
    loadAllImages().then(() => {
      animationRef.current = requestAnimationFrame(animate);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading, isSkipped, frameUrls, frameCount, fps, duration]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  const handleSkip = () => {
    setIsSkipped(true);
    handleComplete();
  };

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.3 }
    }
  };

  const loadingProgress = (loadedFrames.size / frameCount) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-brand-blueDark via-brand-greenDark to-brand-goldDark overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Canvas para animação */}
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blueDark/60 via-brand-greenDark/40 to-brand-goldDark/50 mix-blend-overlay"></div>

          {/* Partículas energéticas */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-brand-gold/50 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: [null, -40, 30, -20],
                  x: [null, 20, -15, 10],
                  opacity: [0, 0.8, 0.4, 0],
                  scale: [0, 1.2, 0.8, 0],
                  rotate: [0, 180, 360, 180]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Conteúdo sobreposto */}
          <motion.div 
            className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-4"
            variants={contentVariants}
          >
            {/* Indicador de carregamento */}
            {isLoading && (
              <div className="mb-8 text-center">
                <div className="w-16 h-16 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4 mx-auto"></div>
                <p className="font-sans text-brand-beige text-lg">
                  Preparando energia transformadora... {Math.round(loadingProgress)}%
                </p>
                <div className="mt-4 w-64 h-2 bg-brand-beige/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Título e mensagem */}
            {!isLoading && (
              <>
                <motion.div 
                  className="text-center mb-8 md:mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-beige mb-4">
                    Bem-vindo à <span className="text-brand-gold">Frequência Theta</span>
                  </h2>
                  <p className="font-sans text-xl md:text-2xl text-brand-beige/80 max-w-2xl mx-auto leading-relaxed">
                    Sua jornada de cura e transformação pessoal está prestes a começar
                  </p>
                </motion.div>

                {/* Informações da animação */}
                <motion.div 
                  className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-brand-gold/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="font-sans text-sm text-brand-beige/70 mb-1">Frame</div>
                      <div className="font-serif text-2xl text-brand-gold">{currentFrame}/{frameCount}</div>
                    </div>
                    <div>
                      <div className="font-sans text-sm text-brand-beige/70 mb-1">FPS</div>
                      <div className="font-serif text-2xl text-brand-green">{fps}</div>
                    </div>
                    <div>
                      <div className="font-sans text-sm text-brand-beige/70 mb-1">Progresso</div>
                      <div className="font-serif text-2xl text-brand-blue">{Math.round(progress)}%</div>
                    </div>
                    <div>
                      <div className="font-sans text-sm text-brand-beige/70 mb-1">Tempo</div>
                      <div className="font-serif text-2xl text-brand-beige">
                        {Math.round((currentFrame / fps))}s
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Barra de progresso principal */}
                <div className="w-full max-w-md mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans text-sm text-brand-beige/70">
                      {isSkipped ? 'Experiência pulada' : 'Conexão energética em progresso...'}
                    </span>
                    <span className="font-sans text-sm font-semibold text-brand-gold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-3 bg-brand-beige/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    >
                      {/* Efeito de brilho na barra */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-8 bg-white/40"
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Botão de pular */}
                {showSkipButton && !isLoading && (
                  <motion.button
                    onClick={handleSkip}
                    className="group relative px-8 py-4 bg-transparent border-2 border-brand-gold/50 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="relative z-10 font-sans font-semibold text-lg text-brand-gold group-hover:text-brand-beige transition-colors">
                      Entrar na Jornada Agora
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                )}

                {/* Mensagem espiritual */}
                <motion.p
                  className="mt-8 font-sans text-sm text-brand-beige/60 text-center max-w-md italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  "A verdadeira cura acontece quando permitimos que a energia divina flua através de cada célula do nosso ser"
                </motion.p>
              </>
            )}
          </motion.div>

          {/* Efeitos de borda energética */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-brand-green to-transparent animate-pulse"></div>
          
          {/* Indicador de canto */}
          <div className="absolute top-4 right-4 text-xs text-brand-beige/50 font-sans">
            ThetaHealing DNA Básico
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageSequencePreloader;