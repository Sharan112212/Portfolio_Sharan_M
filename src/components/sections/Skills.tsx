import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";

const technicalSkills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 85 },
  { name: "Bash Scripting", level: 70 },
  { name: "Tailwind", level: 95 },
];

const securityTools = [
  "Nmap", "Wireshark", "Burp Suite", "Kali Linux", "Metasploit", "Bash"
];

export function Skills({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="skills" onVisible={onVisible} className="py-32 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Tech Stack</h2>
          <p className="text-white/40 max-w-md">The tools I use to turn lines of code into futuristic experiences and secure systems.</p>
        </div>
        <div className="hidden md:block glass px-4 py-2 rounded-full border border-white/5">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Inventory v2.4</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Development */}
        <GlassCard className="lg:col-span-2">
          <h3 className="text-xl font-medium mb-8">Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs opacity-40 font-mono">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-neon-blue rounded-full shadow-[0_0_10px_#00f2ff]"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Security / Tools */}
        <div className="space-y-8">
           <GlassCard>
            <h3 className="text-xl font-medium mb-6">Security Toolkit</h3>
            <div className="flex flex-wrap gap-2">
              {securityTools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 glass rounded-lg text-xs font-medium border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  {tool}
                </span>
              ))}
            </div>
           </GlassCard>

           <GlassCard className="bg-neon-blue/5 border-neon-blue/20">
            <h3 className="text-xl font-medium mb-2">Learning</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Currently deepening knowledge in Ethical Hacking, CTFs, and Advanced Web Security patterns.
            </p>
           </GlassCard>
        </div>
      </div>
    </Section>
  );
}
