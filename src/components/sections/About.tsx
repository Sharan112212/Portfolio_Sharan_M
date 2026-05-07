import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";

export function About({ onVisible }: { onVisible: () => void }) {
  const stats = [
    { label: "Level", value: "Junior" },
    { label: "Spec", value: "SecOps" },
    { label: "Status", value: "Open" },
  ];

  return (
    <Section id="about" onVisible={onVisible} className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-neon-blue/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative aspect-square glass rounded-[40px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
              alt="Cybersecurity" 
              className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="text-2xl font-bold mb-1">Sharan</h3>
              <p className="text-white/50 text-sm">CS & Business Systems Student</p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-medium mb-8"
          >
            Decoding Reality. <br />
            <span className="opacity-40">Securing the Future.</span>
          </motion.h2>

          <motion.p 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-white/60 leading-relaxed mb-12 text-lg"
          >
            I am a passionate technologist bridging the gap between business logic and technical execution. Focused on building secure, AI-driven applications and performing ethical hacking to harden digital assets.
          </motion.p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <GlassCard key={i} className="px-6 py-4">
                <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-1">{stat.label}</div>
                <div className="text-xl font-medium tracking-tight">{stat.value}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
