import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { Award, ExternalLink, Calendar, Building2, X, Maximize2 } from "lucide-react";
import { certificates, Certificate } from "../../data/certificates";

export function Certificates({ onVisible }: { onVisible: () => void }) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

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
          <GlassCard key={i} className="flex flex-col group/cert h-full relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neon-blue/10 blur-[100px] rounded-full group-hover/cert:bg-neon-blue/20 transition-colors duration-700" />
            
            {/* Image Container with Visual Treatment */}
            <div 
              className="relative aspect-[16/10] mb-8 rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-zoom-in"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Inner Glass Frame */}
              <div className="absolute inset-0 z-10 border-[8px] border-white/5 rounded-2xl pointer-events-none" />
              <div className="absolute inset-0 z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
              
              <img 
                src={cert.image} 
                alt={cert.title}
                className="w-full h-full object-cover opacity-50 contrast-125 saturate-[0.8] group-hover/cert:opacity-90 group-hover/cert:scale-105 group-hover/cert:saturate-100 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop";
                  target.className = "w-full h-full object-cover opacity-20 grayscale transition-all";
                }}
              />

              {/* Edge Masking / Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-20 pointer-events-none" />
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/cert:opacity-10 transition-opacity duration-500 z-20 pointer-events-none" />
              
              {/* Grain / Noise Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              <div className="absolute top-4 right-4 z-30">
                <div className="flex gap-2">
                  <div className="p-2 glass rounded-full text-neon-blue shadow-2xl">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="p-2 glass rounded-full text-white/50 opacity-0 group-hover/cert:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow z-30">
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

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 z-30">
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

      {/* Full View Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 overflow-y-auto max-h-full"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-3 glass rounded-full text-white/50 hover:text-white transition-all z-50 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 order-2 lg:order-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6 text-neon-blue font-mono text-xs uppercase tracking-[0.2em] font-bold">
                    <Award className="w-5 h-5" />
                    Certification Details
                  </div>
                  <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight">
                    {selectedCert.title}
                  </h2>
                  <div className="space-y-6 text-white/60 leading-relaxed mb-10">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neon-blue">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Issuing Organization</div>
                        <div className="font-medium">{selectedCert.organization}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-neon-blue">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Date of Issue</div>
                        <div className="font-medium">{selectedCert.date}</div>
                      </div>
                    </div>
                    <p className="border-l-2 border-neon-blue/30 pl-6 text-lg italic">
                      {selectedCert.description}
                    </p>
                  </div>
                  {selectedCert.link && (
                    <a 
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-neon-blue transition-colors group"
                    >
                      Verify Official Credential
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                </div>
                
                <div className="relative aspect-square lg:aspect-auto bg-black/40 order-1 lg:order-2 overflow-hidden border-b lg:border-b-0 lg:border-l border-white/5">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title}
                    className="w-full h-full object-contain p-6"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop";
                    }}
                  />
                  {/* Subtle Grain Overlay for Modal Image Too */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
