import { motion } from "motion/react";
import { Section } from "../ui/Section";
import { ChevronDown, Shield, Cpu, Globe } from "lucide-react";

export function Hero({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="hero" onVisible={onVisible} className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-dark rounded-full mb-8 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-medium opacity-60">Ready for engagement</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-6 text-gradient">
          Sharan
        </h1>
        
        <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto font-light leading-relaxed mb-12">
          Computer Science & Business Systems student specializing in <span className="text-white">Cybersecurity</span>, <span className="text-white">AI</span>, and <span className="text-white">Full Stack Development</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-white text-black rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
          >
            View Projects
          </button>
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 glass rounded-full font-medium transition-all hover:bg-white/10"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* Hero Widgets */}
      <div className="absolute bottom-20 left-12 hidden lg:flex flex-col gap-4">
        <Widget icon={<Shield className="w-4 h-4" />} title="Security Ops" value="Active" />
        <Widget icon={<Cpu className="w-4 h-4" />} title="AI Core" value="Syncing" />
      </div>

      <div className="absolute bottom-20 right-12 hidden lg:flex flex-col gap-4">
        <Widget 
          icon={<Globe className="w-4 h-4" />} 
          title="Location" 
          value="Earth-01" 
          onClick={() => window.open("https://www.google.com/maps/place/Chennai,+Tamil+Nadu", "_blank")}
        />
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </Section>
  );
}

function Widget({ icon, title, value, onClick }: { icon: any; title: string; value: string; onClick?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`glass p-4 rounded-3xl min-w-[160px] flex items-center gap-4 border border-white/5 ${onClick ? 'cursor-pointer hover:bg-white/10' : ''}`}
    >
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-neon-blue">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider opacity-40 font-bold">{title}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </motion.div>
  );
}
