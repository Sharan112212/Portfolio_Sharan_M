import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const loadingTexts = [
  "INITIALIZING INTERFACE",
  "ESTABLISHING CONNECTION",
  "SECURING SESSION",
  "LOADING WORKSPACE"
];

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 600);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsFinishing(true);
          // Small delay before completing to let the 100% state breathe
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        // Random incremental steps for a more "organic" loading feel
        const increment = Math.random() * (prev > 80 ? 2 : 10);
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 1, ease: [0.65, 0, 0.35, 1] }
      }}
    >
      {/* Premium Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)' }}
      />
      
      <div className="relative flex flex-col items-center">
        {/* Monogram/Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-12 text-center"
        >
          <motion.span 
            className="text-4xl md:text-6xl font-display font-medium tracking-[0.25em] text-white inline-block"
            animate={isFinishing ? { 
              textShadow: "0 0 30px rgba(255,255,255,0.5)",
              scale: 1.02 
            } : {}}
            transition={{ duration: 0.8 }}
          >
            SHARAN
          </motion.span>
          
          <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-white/10">
            <motion.div 
              className="h-full bg-neon-blue shadow-[0_0_15px_rgba(0,242,255,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Status Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.4, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-white uppercase"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Minimal Percentage */}
          <motion.span 
            className="text-[10px] font-mono text-white/20 tracking-widest"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>

      {/* Cinematic Frame Accents */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none">
        <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
        
        <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-white/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-t from-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
        
        <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-gradient-to-t from-white/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-gradient-to-l from-white/40 to-transparent" />
      </div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </motion.div>
  );
};
