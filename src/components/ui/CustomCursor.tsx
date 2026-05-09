import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice);

    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.glass') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        input, textarea, [contenteditable="true"] {
          cursor: text !important;
        }
      `}</style>

      {/* Main Glass Orb */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full pointer-events-none z-[9999] border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.2)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <AnimatePresence>
          {isHovered && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 rounded-full bg-neon-blue/10 blur-sm"
             />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/10 rounded-full pointer-events-none z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 150 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.2 : 0.5,
          borderColor: isHovered ? "rgba(0, 242, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
        }}
      />
    </>
  );
}
