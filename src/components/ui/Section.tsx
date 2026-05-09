import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionProps {
  id: string;
  children: ReactNode;
  onVisible?: () => void;
  className?: string;
}

export function Section({ id, children, onVisible, className }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView && onVisible) {
      onVisible();
    }
  }, [isInView, onVisible]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass rounded-3xl p-8 relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
