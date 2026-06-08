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
import { AppShowcase } from "./components/sections/AppShowcase";
import { FeatureDeep } from "./components/sections/FeatureDeep";
import { Workflow } from "./components/sections/Workflow";
import { Ecosystems } from "./components/sections/Ecosystems";
import { Engine } from "./components/sections/Engine";
import { ComparisonTable } from "./components/sections/ComparisonTable";
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
        className="bg-dot-grid"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 80%)",
          opacity: 0.8
        }}
      />
      <div 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 50%, var(--bg) 0%, transparent 70%)",
          opacity: 0.3
        }}
      />
      <IntroLoader />
      <ScrollProgress />
      <CustomCursor />

      <main className="site" style={{ paddingTop: "90px" }}>
        <Navbar />
        <div id="hero" className="scroll-section"><Hero /></div>
        <div id="marquee" className="scroll-section"><Marquee /></div>
        
        <div id="app-showcase" className="scroll-section" style={{ position: "relative", margin: "80px 0" }}>
          <AppShowcase />
        </div>
        
        <div id="features" className="scroll-section"><FeatureDeep /></div>
        
        <div id="workflow" className="scroll-section">
          <Workflow />
        </div>
        
        <div id="ecosystems" className="scroll-section"><Ecosystems /></div>
        <div id="engine" className="scroll-section"><Engine /></div>
        
        <div id="comparison" className="scroll-section" style={{ position: "relative", margin: "80px 0" }}>
          <ComparisonTable />
        </div>
        
        <div id="privacy" className="scroll-section"><Privacy /></div>
        
        <div id="download" className="scroll-section" style={{ position: "relative", marginTop: "80px" }}>
          <Download />
        </div>
        
        <Footer />
      </main>
    </>
  );
}
