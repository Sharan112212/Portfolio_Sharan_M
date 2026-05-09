import { motion, AnimatePresence } from "motion/react";
import { Terminal, Shield, User, Code, Briefcase, Mail, Award } from "lucide-react";

interface DynamicIslandProps {
  activeSection: string;
}

export function DynamicIsland({ activeSection }: DynamicIslandProps) {
  const getIcon = () => {
    switch (activeSection) {
      case "hero": return <User className="w-4 h-4" />;
      case "about": return <User className="w-4 h-4" />;
      case "skills": return <Code className="w-4 h-4" />;
      case "projects": return <Briefcase className="w-4 h-4" />;
      case "certificates": return <Award className="w-4 h-4" />;
      case "cyberlab": return <Shield className="w-4 h-4" />;
      case "experience": return <Briefcase className="w-4 h-4" />;
      case "contact": return <Mail className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    switch (activeSection) {
      case "hero": return "Welcome";
      case "cyberlab": return "Security Ops";
      default: return activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    }
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="glass-dark px-4 py-2 rounded-full flex items-center gap-3 min-w-[120px] justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2"
        >
          <div className="text-neon-blue">
            {getIcon()}
          </div>
          <span className="text-xs font-medium tracking-wide text-white/90">
            {getLabel()}
          </span>
        </motion.div>
      </AnimatePresence>
      <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
    </motion.div>
  );
}
