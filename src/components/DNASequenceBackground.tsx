import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BASE_PATH = '/dna-basico/animation-hero-dna';
const FPS = 24;
const INTERVAL = 1000 / FPS;

// 239 frames, frame 003 não existe
const FRAME_PATHS: string[] = Array.from({ length: 239 }, (_, i) => {
  const n = i + 1;
  if (n === 3) return null;
  return `${BASE_PATH}/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}).filter(Boolean) as string[];

const DNASequenceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_PATHS.length).fill(null));
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameIndexRef = useRef<number>(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // Dimensiona o canvas via window — resolve o problema de offsetWidth=0 no mount
  useEffect(() => {
    const setSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  // Carrega frames e sinaliza quando o primeiro estiver pronto para começar a animar
  useEffect(() => {
    FRAME_PATHS.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[i] = img;
        if (i === 0) setFirstFrameReady(true);
      };
      img.src = src;
    });
  }, []);

  // Loop de animação — inicia assim que o primeiro frame carrega
  useEffect(() => {
    if (!firstFrameReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (timestamp: number) => {
      if (timestamp - lastTimeRef.current >= INTERVAL) {
        lastTimeRef.current = timestamp;

        const img = imagesRef.current[frameIndexRef.current];
        if (img) {
          const cw = canvas.width;
          const ch = canvas.height;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          const sw = img.naturalWidth * scale;
          const sh = img.naturalHeight * scale;
          const sx = (cw - sw) / 2;
          const sy = (ch - sh) / 2;
          ctx.drawImage(img, sx, sy, sw, sh);
        }

        // Avança para o próximo frame que já carregou, fazendo loop
        let next = (frameIndexRef.current + 1) % FRAME_PATHS.length;
        // Pula frames ainda não carregados para não travar
        let tries = 0;
        while (!imagesRef.current[next] && tries < FRAME_PATHS.length) {
          next = (next + 1) % FRAME_PATHS.length;
          tries++;
        }
        frameIndexRef.current = next;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [firstFrameReady]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Canvas da sequência */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Fade-in: esconde até o primeiro frame estar pronto */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-dark via-goddess-purpleDark to-goddess-purple"
        initial={{ opacity: 1 }}
        animate={{ opacity: firstFrameReady ? 0 : 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Overlay permanente */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 via-goddess-purpleDark/70 to-goddess-purple/70 pointer-events-none" />
    </div>
  );
};

export default DNASequenceBackground;
