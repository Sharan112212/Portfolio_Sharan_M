import { motion } from "motion/react";
import { Section, GlassCard } from "../ui/Section";
import { Shield, Eye, Lock, HardDrive, Terminal } from "lucide-react";

export function CyberLab({ onVisible }: { onVisible: () => void }) {
  return (
    <Section id="cyberlab" onVisible={onVisible} className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="relative">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-20 relative z-10">
          <div className="text-neon-blue inline-block p-4 glass rounded-3xl mb-6 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Cybersecurity Lab</h2>
          <p className="text-white/40 max-w-xl mx-auto">Deep dive into vulnerabilities, threat intelligence, and digital defense.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Main Terminal Widget */}
          <GlassCard className="md:col-span-8 bg-black/60 font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-4 border-bottom border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="text-white/20 uppercase tracking-[0.2em] font-bold">session: active</div>
            </div>
            
            <div className="space-y-2 text-white/70">
              <div className="flex gap-2">
                <span className="text-neon-blue">root@sharan:~#</span>
                <span>nmap -sS -O 192.168.1.1</span>
              </div>
              <div className="pl-4 opacity-50">
                Starting Nmap 7.92 ( https://nmap.org ) at 2024-05-07 17:31 UTC<br/>
                Nmap scan report for gateway.local (192.168.1.1)<br/>
                Host is up (0.0021s latency).<br/>
                Not shown: 996 closed tcp ports (reset)<br/>
                PORT    STATE SERVICE<br/>
                22/tcp  open  ssh<br/>
                80/tcp  open  http<br/>
                443/tcp open  https<br/>
              </div>
              <div className="flex gap-2 pt-2">
                <span className="text-neon-blue">root@sharan:~#</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </GlassCard>

          {/* Side Info Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <GlassCard className="flex-1">
              <div className="text-neon-blue mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-medium mb-1">Defense Matrix</h4>
              <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                Hardening Linux systems and deploying secure firewall configurations for local infrastructure.
              </p>
            </GlassCard>
            
            <GlassCard className="flex-1">
              <div className="text-purple-400 mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="font-medium mb-1">Intelligence</h4>
              <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                Tracking CVEs and zero-day exploits to understand emerging attack vectors.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Lab Stats Bar */}
        <div className="mt-6">
          <GlassCard className="py-4 flex flex-wrap justify-between items-center gap-8">
            <StatItem label="Vulnerabilities Found" value="12+" />
            <StatItem label="CTF Completion" value="85%" />
            <StatItem label="Hacking Rank" value="#342" />
            <StatItem label="Active Probes" value="4" />
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 min-w-[120px] text-center md:text-left">
      <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-0.5">{label}</div>
      <div className="text-xl font-medium tracking-tight text-neon-blue">{value}</div>
    </div>
  );
}
