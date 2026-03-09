import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Brain, Heart, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getHero } from '@/lib/cms';
import { useScheduling } from './SchedulingContext';
import ImageSequencePreloader from './ImageSequencePreloader';
import { motion } from 'framer-motion';

const DNAHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { openScheduling } = useScheduling();

  const { data: heroData } = useQuery({
    queryKey: ['hero'],
    queryFn: getHero
  });

  useEffect(() => {
    // Verificar se já viu o preloader nesta sessão
    const hasSeenPreloader = sessionStorage.getItem('dnaPreloaderSeen');
    if (hasSeenPreloader) {
      setShowPreloader(false);
      setShowContent(true);
    }
    
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreloaderComplete = () => {
    // Primeiro esconde o preloader
    setShowPreloader(false);
    sessionStorage.setItem('dnaPreloaderSeen', 'true');
    
    // Após um pequeno delay, mostra o conteúdo com transição suave
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const title = heroData?.title || (
    <>
      <span className="text-brand-gold">ThetaHealing DNA Básico</span>: 
      <br className="hidden md:block" /> 
      Sua Jornada de Transformação Pessoal Começa Aqui
    </>
  );

  const subtitle = heroData?.subtitle || "Desperte seu potencial de cura, reprograme crenças limitantes e expanda sua consciência. Aprenda a técnica que transforma vidas em apenas 3 dias intensivos.";
  const ctaText = heroData?.ctaButtonText || "Garanta Minha Vaga Agora";
  const bgImage = heroData?.backgroundImage?.url || "/dna-basico/ariana-meditando.jpg";

  // Variantes de animação para o conteúdo
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <>
      {/* Preloader com sequência de imagens ThetaHealing */}
      {showPreloader && (
        <ImageSequencePreloader
          basePath="/dna-basico/animation-hero-dna"
          frameCount={240}
          framePrefix="ezgif-frame-"
          frameExtension=".jpg"
          fps={24}
          duration={10000} // 10 segundos para a experiência completa
          onComplete={handlePreloaderComplete}
          showSkipButton={true}
        />
      )}

      {/* Hero Section com transição suave */}
      {showContent && (
        <motion.section 
          className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blueDark via-brand-greenDark to-brand-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        {/* Background com efeito de partículas */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bgImage}
            alt="Ariana Borges - Terapeuta ThetaHealing"
            className="w-full h-[120%] object-cover opacity-30 sepia-[0.3] brightness-[0.9] contrast-[1.1] hue-rotate-[180deg] transition-transform duration-75 ease-out"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          
          {/* Overlay gradiente espiritual */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blueDark/70 via-brand-greenDark/40 to-brand-blue/80"></div>
          
          {/* Efeito de partículas energéticas */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-gold/30 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, -30, 20, -10],
                  opacity: [0, 0.6, 0.3, 0],
                  scale: [0, 1.2, 0.8, 0]
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
        </div>

        {/* Conteúdo Principal */}
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
        >
          {/* Badge Institucional */}
          <motion.div 
            className="mb-6 md:mb-8 flex justify-center"
            variants={itemVariants}
          >
            <span className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-brand-blue/30 via-brand-green/30 to-brand-gold/30 text-brand-beige text-sm md:text-base font-sans tracking-widest uppercase border border-brand-gold/30 backdrop-blur-sm">
              <Sparkles size={16} className="text-brand-gold" /> 
              Instituto Ariana Borges • Formação Certificada
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-beige mb-6 md:mb-8 leading-tight"
            variants={itemVariants}
          >
            {typeof title === 'string' ? title : title}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="font-sans text-lg md:text-xl lg:text-2xl text-brand-beige/90 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed whitespace-pre-line"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Ícones de Benefícios */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-12"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30">
              <Brain className="w-8 h-8 text-brand-gold" />
              <span className="font-sans text-sm text-brand-beige">Reprogramação Mental</span>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-brand-green/20 backdrop-blur-sm border border-brand-green/30">
              <Heart className="w-8 h-8 text-brand-gold" />
              <span className="font-sans text-sm text-brand-beige">Cura Emocional</span>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30">
              <Zap className="w-8 h-8 text-brand-beige" />
              <span className="font-sans text-sm text-brand-beige">Expansão Energética</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <button
              onClick={openScheduling}
              className="group relative bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold hover:from-brand-gold hover:via-brand-green hover:to-brand-blue hover:scale-105 transition-all duration-500 text-brand-dark font-sans font-bold py-4 px-8 md:py-5 md:px-10 rounded-full shadow-2xl hover:shadow-brand-gold/30 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">{ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
            
            <a 
              href="#estrutura" 
              className="group text-brand-beige hover:text-brand-gold font-sans font-semibold py-4 px-8 underline decoration-brand-gold/50 hover:decoration-brand-gold transition-all flex items-center gap-2"
            >
              <span>Conheça a metodologia completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Contador de Vagas (Scarcity) */}
          <motion.div 
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-brand-blue/20 to-brand-green/20 backdrop-blur-sm border border-brand-gold/30 max-w-md mx-auto"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-sm text-brand-beige/80">Vagas Disponíveis:</span>
              <span className="font-sans font-bold text-brand-gold text-lg">12/25</span>
            </div>
            <div className="h-2 bg-brand-beige/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold"
                initial={{ width: "0%" }}
                animate={{ width: "48%" }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 font-sans text-xs text-brand-beige/60 text-center">
              Turma com vagas limitadas para atendimento personalizado
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-brand-gold/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-brand-gold rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Efeitos de borda energética */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-50"></div>
      </motion.section>
      )}
    </>
  );
};

export default DNAHero;