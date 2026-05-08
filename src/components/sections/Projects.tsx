import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { ExternalLink, Github, Monitor, ShoppingCart, Ghost, ShieldCheck } from "lucide-react";

const projects = [
  {
    title: "ShieldNet AI",
    description: "Cyber threat alert platform using machine learning to detect and notify about real-time vulnerabilities.",
    tech: ["React", "Python", "FastAPI", "AI"],
    icon: <ShieldCheck className="w-8 h-8" />,
    link: "#",
    github: "#"
  },
  {
    title: "Smart Trolley System",
    description: "IoT integrated shopping solution for automated billing and streamlined retail experiences.",
    tech: ["Arduino", "Node.js", "Firebase", "React"],
    icon: <ShoppingCart className="w-8 h-8" />,
    link: "#",
    github: "#"
  },
  {
    title: "Forgotten Temple",
    description: "Immersive visual novel experience with complex branching narratives and dynamic visual effects.",
    tech: ["Ren'Py", "Python", "Canvas"],
    icon: <Ghost className="w-8 h-8" />,
    link: "#",
    github: "#"
  },
  {
    title: "SecOps Lab",
    description: "Collection of automated tools for reconnaissance and vulnerability scanning during pen-testing.",
    tech: ["Bash", "Linux", "Nmap", "Metasploit"],
    icon: <Monitor className="w-8 h-8" />,
    link: "#",
    github: "#"
  }
];

export function Projects({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="projects" onVisible={onVisible} className="py-32 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Showcase</h2>
        <p className="text-white/40 max-w-xl">A glimpse into the architectural and creative systems I've developed.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <GlassCard key={i} className="flex flex-col h-full group/card">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-neon-blue group-hover/card:scale-110 transition-transform">
                {project.icon}
              </div>
              <div className="flex gap-2">
                <a 
                  href="https://github.com/Sharan112212" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-full hover:bg-white/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href={project.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-full hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-medium mb-3 group-hover/card:text-neon-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-white/50 mb-8 flex-grow leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span key={t} className="text-[10px] uppercase tracking-widest font-bold py-1 px-3 bg-white/5 rounded-full opacity-60">
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
