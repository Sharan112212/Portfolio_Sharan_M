import { motion, AnimatePresence } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { Mail, Send, Linkedin, Github, Twitter, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Contact({ onVisible }: { onVisible: () => void }) {
  // Persistence touch

  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (response.ok) {
          setStatus("success");
          setFormData({ subject: "", email: "", message: "" });
          setTimeout(() => setStatus("idle"), 5000);
        } else {
          throw new Error(data.error || "Failed to send message.");
        }
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned an invalid response.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <Section id="contact" onVisible={onVisible} className="py-32 px-6 max-w-4xl mx-auto mb-32">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-4 text-gradient">Initialize Link</h2>
        <p className="text-white/40">Ready to discuss projects, security audits, or full-stack collaborations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <GlassCard className="flex items-center gap-6 p-6">
            <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 flex items-center justify-center text-neon-blue">
               <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Email</div>
              <div className="text-sm font-medium">justsharan0822@gmail.com</div>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-6 p-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
               <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Base</div>
              <div className="text-sm font-medium">Tamil Nadu, India</div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-3 gap-4">
             <SocialBtn icon={<Github />} href="https://github.com/Sharan112212" />
             <SocialBtn icon={<Linkedin />} href="https://www.linkedin.com/in/sharan-m-048a91325/" />
             <SocialBtn icon={<Twitter />} href="https://twitter.com/" />
          </div>
        </div>

        {/* Contact Form */}
        <GlassCard>
           <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Subject Identifier"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Return Path (Email)"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors placeholder:text-white/20"
                />
              </div>
              <div>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Transmission Payload (Message)"
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-blue/50 transition-colors placeholder:text-white/20 resize-none"
                />
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm glass p-3 rounded-xl border-green-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Transmission successful.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm glass p-3 rounded-xl border-red-500/20"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neon-blue hover:text-black transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    Establish Connection
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
           </form>
        </GlassCard>
      </div>
    </Section>
  );
}

function SocialBtn({ icon, href }: { icon: any; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="h-20 glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all rounded-3xl"
    >
      {icon}
    </a>
  );
}
