import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPreloaderProps {
  videoSrc: string;
  duration?: number; // Duração do preloader em milissegundos
  onComplete?: () => void;
  showSkipButton?: boolean;
}

const VideoPreloader: React.FC<VideoPreloaderProps> = ({
  videoSrc,
  duration = 5000, // 5 segundos padrão
  onComplete,
  showSkipButton = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  // Efeito para controlar o tempo do preloader
  useEffect(() => {
    if (isSkipped) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        handleComplete();
      }
    }, 50); // Atualiza a cada 50ms para animação suave

    return () => clearInterval(interval);
  }, [duration, isSkipped]);

  // Efeito para verificar quando o vídeo está carregado
  useEffect(() => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.preload = 'auto';
    
    video.onloadeddata = () => {
      setIsVideoLoaded(true);
    };

    return () => {
      video.onloadeddata = null;
    };
  }, [videoSrc]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500); // Aguarda a animação de saída
  };

  const handleSkip = () => {
    setIsSkipped(true);
    handleComplete();
  };

  // Variantes de animação para o Framer Motion
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

  const videoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        delay: 0.2 
      }
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeIn" as const 
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: `${progress}%`,
      transition: { duration: 0.1 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-brand-blueDark via-brand-greenDark to-brand-goldDark"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Overlay gradiente espiritual */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blueDark/80 via-brand-greenDark/60 to-brand-goldDark/40 mix-blend-overlay"></div>
          
          {/* Partículas flutuantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-gold/40 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, -50, 50, -30],
                  opacity: [0, 0.8, 0.5, 0],
                  scale: [0, 1, 0.8, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
            {/* Container do vídeo */}
            <motion.div
              className="relative mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl"
              variants={videoVariants}
            >
              <div className="relative w-full max-w-2xl aspect-video">
                <video
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedData={() => setIsVideoLoaded(true)}
                />
                
                {/* Overlay gradiente no vídeo */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blueDark/30 via-transparent to-brand-greenDark/20"></div>
                
                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 via-transparent to-brand-gold/10 animate-pulse"></div>
              </div>

              {/* Indicador de carregamento do vídeo */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-blueDark/80">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4"></div>
                    <p className="text-brand-beige font-sans text-sm">Carregando energia transformadora...</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Texto espiritual */}
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-beige mb-4">
                Bem-vindo à sua <span className="text-brand-gold">Jornada de Cura</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-brand-beige/80 max-w-2xl mx-auto leading-relaxed">
                Prepare-se para uma experiência transformadora de ThetaHealing DNA Básico
              </p>
            </motion.div>

            {/* Barra de progresso */}
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-sm text-brand-beige/70">
                  {isSkipped ? 'Pulado' : 'Preparando energia...'}
                </span>
                <span className="font-sans text-sm font-semibold text-brand-gold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-2 bg-brand-beige/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold"
                  variants={progressBarVariants}
                  animate="visible"
                />
              </div>
            </div>

            {/* Botão de pular */}
            {showSkipButton && (
              <motion.button
                onClick={handleSkip}
                className="group relative px-6 py-3 bg-transparent border-2 border-brand-gold/50 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="relative z-10 font-sans font-semibold text-brand-gold group-hover:text-brand-beige transition-colors">
                  Pular introdução
                </span>
                <motion.div
                  className="absolute inset-0 bg-brand-gold"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            )}

            {/* Mensagem espiritual */}
            <motion.p
              className="mt-8 font-sans text-sm text-brand-beige/60 text-center max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              "A cura começa quando permitimos que a energia divina flua através de nós"
            </motion.p>
          </div>

          {/* Efeitos de borda */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPreloader;