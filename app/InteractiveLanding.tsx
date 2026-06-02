"use client";
import { useEffect } from "react";
import { useBgStore } from "./store/bgStore";

import { SmoothScroll } from "./components/ui/SmoothScroll";
import { Noise } from "./components/ui/Noise";
import { Global3DBackground } from "./components/ui/Global3DBackground";
import { IntroLoader } from "./components/ui/IntroLoader";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";

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
  const setActiveSection = useBgStore((state) => state.setActiveSection);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      <SmoothScroll />
      <Noise />
      <Global3DBackground />
      <IntroLoader />
      <ScrollProgress />
      <CustomCursor />

      <main className="site">
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
