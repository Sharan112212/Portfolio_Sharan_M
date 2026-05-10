import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
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
import { Preloader } from "./components/ui/Preloader";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen selection:bg-neon-blue/30 selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

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
      <motion.main 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Hero onVisible={() => setActiveSection("hero")} />
        <About onVisible={() => setActiveSection("about")} />
        <Skills onVisible={() => setActiveSection("skills")} />
        <Projects onVisible={() => setActiveSection("projects")} />
        <CyberLab onVisible={() => setActiveSection("cyberlab")} />
        <Experience onVisible={() => setActiveSection("experience")} />
        <Contact onVisible={() => setActiveSection("contact")} />
        <Footer />
      </motion.main>

      {/* Floating Dock Navigation */}
      {!isLoading && <Dock activeSection={activeSection} />}
    </div>
  );
}
