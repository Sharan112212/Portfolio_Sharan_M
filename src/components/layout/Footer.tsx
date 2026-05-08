import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { cn } from "../../lib/utils";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/Sharan112212", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sharan-m-048a91325/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mail2sharan06@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pb-24 px-6 mt-32">
      <div className="max-w-6xl mx-auto relative">
        {/* Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-neon-blue/5 blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-[40px] p-8 md:p-12 relative overflow-hidden group"
        >
          {/* Subtle reflection line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative z-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-medium text-gradient">Sharan</h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
                Building intelligent digital experiences through code, security, and creativity.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Navigation</span>
              <div className="flex flex-wrap md:flex-col gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/50 hover:text-neon-blue transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Socials & Connect */}
            <div className="flex flex-col gap-6 md:items-end">
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-2xl hover:bg-white/10 hover:text-neon-blue transition-all group/icon"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="text-right hidden md:block">
                <div className="text-[10px] uppercase tracking-widest opacity-20 font-bold">Status</div>
                <div className="flex items-center gap-2 justify-end mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium opacity-40">Available for collaboration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-medium opacity-30">
            <div>© 2026 Sharan. Designed with precision and creativity.</div>
            <div className="flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-red-500" /> in India
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
