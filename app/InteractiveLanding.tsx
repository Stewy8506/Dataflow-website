import { SmoothScroll } from "./components/ui/SmoothScroll";
import { Noise } from "./components/ui/Noise";
import { NetworkBackground } from "./components/ui/NetworkBackground";
import { IntroLoader } from "./components/ui/IntroLoader";
import { ScrollProgress } from "./components/ui/ScrollProgress";

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
      <SmoothScroll />
      <Noise />
      <NetworkBackground />
      <IntroLoader />
      <ScrollProgress />

      <main className="site">
        <Navbar />
        <Hero />
        <Marquee />
        <ProductShowcase />
        <Workflow />
        <Ecosystems />
        <Engine />
        <Privacy />
        <Download />
        <Footer />
      </main>
    </>
  );
}
