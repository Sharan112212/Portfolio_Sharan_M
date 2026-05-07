import { motion } from "motion/react";
import { User, Code, Briefcase, Shield, Mail, GraduationCap } from "lucide-react";
import { cn } from "../../lib/utils";

const items = [
  { id: "about", icon: User, label: "About" },
  { id: "skills", icon: Code, label: "Skills" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "cyberlab", icon: Shield, label: "Lab" },
  { id: "experience", icon: GraduationCap, label: "Experience" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function Dock({ activeSection }: { activeSection: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        className="glass-dark p-2 rounded-2xl flex gap-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={cn(
              "p-3 rounded-xl transition-all relative group",
              activeSection === item.id 
                ? "bg-white/10 text-white" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 glass-dark rounded-md text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
            {activeSection === item.id && (
              <motion.div
                layoutId="active-indicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_8px_#00f2ff]"
              />
            )}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
