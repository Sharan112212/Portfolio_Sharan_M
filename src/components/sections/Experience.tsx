import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    type: "education",
    title: "Computer Science & Business Systems",
    organization: "TCE (Thiagarajar College of Engineering)",
    period: "2022 - Present",
    description: "Specializing in software engineering, business management, and cybersecurity systems.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    type: "project",
    title: "ShieldNet Development",
    organization: "Freelance / Open Source",
    period: "2024",
    description: "Leading the development of an AI-driven threat monitoring system.",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    type: "certification",
    title: "Cybersecurity Fundamentals",
    organization: "Cisco Networking Academy",
    period: "2023",
    description: "Foundational knowledge in networking protocols and defense strategies.",
    icon: <BookOpen className="w-5 h-5" />
  }
];

export function Experience({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="experience" onVisible={onVisible} className="py-32 px-6 max-w-4xl mx-auto">
       <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-4 text-gradient">Path Traversed</h2>
        <p className="text-white/40">The milestones through academia and technical ventures.</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[26px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue/40 via-white/5 to-transparent hidden md:block" />

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-start md:gap-12"
            >
              <div className="w-14 h-14 rounded-2xl glass mt-1 flex-shrink-0 flex items-center justify-center text-neon-blue z-10 border border-white/10 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                {exp.icon}
              </div>

              <GlassCard className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-medium">{exp.title}</h3>
                    <div className="text-neon-blue/60 text-sm">{exp.organization}</div>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 whitespace-nowrap bg-white/5 px-3 py-1 rounded-full h-fit">
                    {exp.period}
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
