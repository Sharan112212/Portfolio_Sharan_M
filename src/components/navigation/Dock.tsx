import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { User, Code, Briefcase, Shield, Mail, GraduationCap } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../lib/utils";

const items = [
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "cyberlab", icon: Shield, label: "Lab" },
  { id: "experience", icon: GraduationCap, label: "Experience" },
  { id: "contact", icon: Mail, label: "Contact" },
];

function DockItem({ item, activeSection, mouseX }: { item: any; activeSection: string; mouseX: any }) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - (bounds.width / 2);
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 70, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={() => scrollTo(item.id)}
      className={cn(
        "aspect-square rounded-2xl flex items-center justify-center transition-colors relative group",
        activeSection === item.id 
          ? "bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
      )}
    >
      <item.icon className="w-[45%] h-[45%] transition-transform group-hover:scale-110" />
      
      {/* Premium Tooltip */}
      <span className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 glass-dark rounded-xl text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/5 shadow-2xl scale-50 group-hover:scale-100 origin-bottom">
        {item.label}
      </span>

      {/* Active Indicator Dot - macOS Style */}
      {activeSection === item.id && (
        <motion.div
          layoutId="active-dot"
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
        />
      )}
    </motion.button>
  );
}

export function Dock({ activeSection }: { activeSection: string }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-dark p-3 rounded-[32px] flex items-end gap-2.5 border border-white/10 shadow-2xl transition-all hover:bg-black/50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
      >
        {items.map((item) => (
          <DockItem 
            key={item.id} 
            item={item} 
            activeSection={activeSection} 
            mouseX={mouseX} 
          />
        ))}
      </motion.div>
    </div>
  );
}
