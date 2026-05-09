import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";
import { certificates } from "../../data/certificates";

export function Certificates({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="certificates" onVisible={onVisible} className="py-32 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Credentials</h2>
        <p className="text-white/40 max-w-xl">
          A collection of professional certifications and achievements across software engineering and cybersecurity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, i) => (
          <GlassCard key={i} className="flex flex-col group/cert h-full">
            <div className="relative aspect-[16/10] mb-8 rounded-2xl overflow-hidden bg-white/5 border border-white/5">
              <img 
                src={cert.image} 
                alt={cert.title}
                className="w-full h-full object-cover opacity-60 group-hover/cert:opacity-100 group-hover/cert:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop";
                  target.className = "w-full h-full object-cover opacity-20 grayscale transition-all";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute top-4 right-4 focus-visible:outline-none">
                <div className="p-2 glass rounded-full text-neon-blue shadow-2xl">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2 text-neon-blue/80 font-mono text-[10px] uppercase tracking-widest font-bold">
                <Building2 className="w-3 h-3" />
                {cert.organization}
              </div>
              <h3 className="text-2xl font-medium mb-3 group-hover/cert:text-neon-blue transition-colors">
                {cert.title}
              </h3>
              <p className="text-white/50 mb-8 leading-relaxed text-sm">
                {cert.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {cert.date}
              </div>
              {cert.link && (
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors group/link"
                >
                  Verify Certificate
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
