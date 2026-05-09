import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { CyberLab } from "./components/sections/CyberLab";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/layout/Footer";
import { Dock } from "./components/navigation/Dock";
import { DynamicIsland } from "./components/navigation/DynamicIsland";
import { BackgroundCanvas } from "./components/canvas/BackgroundCanvas";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-neon-blue/30 selection:text-black">
      <CustomCursor />
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <BackgroundCanvas />
      </div>

      {/* Dynamic Island HUD */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <DynamicIsland activeSection={activeSection} />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-blue origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onVisible={() => setActiveSection("hero")} />
        <About onVisible={() => setActiveSection("about")} />
        <Skills onVisible={() => setActiveSection("skills")} />
        <Projects onVisible={() => setActiveSection("projects")} />
        <CyberLab onVisible={() => setActiveSection("cyberlab")} />
        <Experience onVisible={() => setActiveSection("experience")} />
        <Contact onVisible={() => setActiveSection("contact")} />
        <Footer />
      </main>

      {/* Floating Dock Navigation */}
      <Dock activeSection={activeSection} />
    </div>
  );
}
