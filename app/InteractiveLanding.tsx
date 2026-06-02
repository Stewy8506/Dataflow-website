import { ClientGlobal3DBackground as Global3DBackground } from "./components/ui/ClientGlobal3DBackground";
import { SmoothScroll } from "./components/ui/SmoothScroll";
import { Noise } from "./components/ui/Noise";
import { IntroLoader } from "./components/ui/IntroLoader";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { ScrollTracker } from "./components/ui/ScrollTracker";

import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { ProductShowcase } from "./components/sections/ProductShowcase";
import { Workflow } from "./components/sections/Workflow";
import { Ecosystems } from "./components/sections/Ecosystems";
import { Engine } from "./components/sections/Engine";
import { Privacy } from "./components/sections/Privacy";
import { Download } from "./components/sections/Download";
import { Footer } from "./components/sections/Footer";

export default function InteractiveLanding() {
  return (
    <>
      <ScrollTracker />
      <SmoothScroll />
      <Noise />
      <Global3DBackground />
      <div 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 50%, var(--bg) 0%, transparent 70%)",
          opacity: 0.8
        }}
      />
      <IntroLoader />
      <ScrollProgress />
      <CustomCursor />

      <main className="site" style={{ paddingTop: "112px" }}>
        <Navbar />
        <div id="hero" className="scroll-section"><Hero /></div>
        <div id="marquee" className="scroll-section"><Marquee /></div>
        <div id="showcase" className="scroll-section"><ProductShowcase /></div>
        <div id="workflow" className="scroll-section"><Workflow /></div>
        <div id="ecosystems" className="scroll-section"><Ecosystems /></div>
        <div id="engine" className="scroll-section"><Engine /></div>
        <div id="privacy" className="scroll-section"><Privacy /></div>
        <div id="download" className="scroll-section"><Download /></div>
        <Footer />
      </main>
    </>
  );
}
