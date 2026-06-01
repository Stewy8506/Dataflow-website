"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Download,
  Eye,
  Radar,
  Network,
  Bot,
  ShieldCheck,
  Lock,
} from "lucide-react";

// --- Data ---

const primaryDownload = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";
const msiDownload = "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi";

const stack = ["TypeScript", "Rust", "React", "Python", "Go", "Java", "C++", "Dart", "Kotlin", "Swift", "Ruby"];

const features = [
  {
    num: "01",
    title: "Graph Terrain",
    body: "2D and 3D dependency views reveal folders, edges, and implicit framework relationships.",
    icon: Network,
  },
  {
    num: "02",
    title: "Blast Radius",
    body: "Preview the damage before the refactor. Trace downstream paths with risk coloring.",
    icon: Radar,
  },
  {
    num: "03",
    title: "Codebase Memory",
    body: "Use Gemini or local OpenAI-compatible providers to ask questions inside the architecture.",
    icon: Bot,
  },
];

const steps = [
  { num: "1", title: "Open a repo", body: "Pick a local workspace." },
  { num: "2", title: "Index the graph", body: "Rust extracts relationships fast." },
  { num: "3", title: "Inspect risk", body: "Filter, diff, ask AI, export." },
];

const releaseDetails = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Windows x64" },
  { label: "Setup EXE", value: "3.8 MB" },
  { label: "MSI package", value: "5.2 MB" },
  { label: "Released", value: "May 29, 2026" },
];

const changelog = [
  "Tauri desktop bundles for Windows x64",
  "2D and 3D dependency map workspace",
  "Blast-radius preview and graph snapshot diffing",
  "Gemini and local OpenAI-compatible provider support",
];

// --- Animations ---

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const cinematicRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cinematicRevealText = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

// --- Components ---

function Noise() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

function AmbientOrbs() {
  return (
    <div className="ambient-orbs" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return null;
}

function IntroLoader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className={`intro-loader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="logo">DV</div>
      <div className="counter">{String(count).padStart(3, "0")}</div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 16 }} />;
  
  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg)" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Eye size={16} /> : <Bot size={16} />}
    </button>
  );
}

// --- Main Page ---

export default function InteractiveLanding() {
  return (
    <>
      <SmoothScroll />
      <Noise />
      <AmbientOrbs />
      <IntroLoader />

      <main className="site">
        <nav className="nav">
          <a href="#" className="brand">
            DV
          </a>
          <div className="links">
            <a href="#engine">Engine</a>
            <a href="#download">Download</a>
            <ThemeToggle />
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
            <motion.h1 variants={cinematicRevealContainer}>
              <div style={{ overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} variants={cinematicRevealText}>DATAFLOW</motion.span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} variants={cinematicRevealText}>VISUALISER</motion.span>
              </div>
            </motion.h1>
            <motion.p className="tagline font-light" variants={fadeUp}>
              See your codebase. All of it.
            </motion.p>
            <motion.div className="actions" variants={fadeUp}>
              <a href={primaryDownload} className="btn primary">
                Download for Windows
              </a>
              <span className="mono-label text-muted">V1.0.0</span>
            </motion.div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <section style={{ padding: 0 }}>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
                <span key={i} className="marquee-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT SHOWCASE */}
        <motion.section 
          id="product"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger()}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "24px" }}>
            Understand the structure<br/>before you break it.
          </motion.h2>
          
          <motion.div className="card-grid" variants={fadeUp}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.num} className="card">
                  <span className="mono-label">{feature.num}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                  <Icon className="icon" size={24} />
                </div>
              );
            })}
          </motion.div>

          <motion.div className="graph-container" variants={fadeUp}>
            <svg viewBox="0 0 760 300" role="img" aria-label="Animated dependency graph preview">
              <path id="p1" className="edge" d="M100 150 C 250 50, 400 250, 600 150" />
              <path id="p2" className="edge" d="M100 150 C 300 250, 500 50, 600 150" />
              <path id="p3" className="edge" d="M350 150 C 450 100, 500 200, 600 150" />
              
              <circle className="dataPulse" r="4">
                <animateMotion dur="4s" repeatCount="indefinite"><mpath href="#p1"/></animateMotion>
              </circle>
              <circle className="dataPulse" r="4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="-2s"><mpath href="#p2"/></animateMotion>
              </circle>
              
              <g className="nodes">
                <circle cx="100" cy="150" r="16" />
                <circle cx="350" cy="150" r="24" />
                <circle cx="600" cy="150" r="20" />
              </g>
            </svg>
          </motion.div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger()}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
            Workflow
          </motion.h2>
          <motion.div className="step-grid" variants={stagger()}>
            {steps.map((step) => (
              <motion.div key={step.num} className="step-item" variants={fadeUp}>
                <span className="step-number font-light">{step.num}</span>
                <h4 style={{ fontSize: "24px" }}>{step.title}</h4>
                <p className="text-muted">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ENGINE */}
        <motion.section 
          id="engine"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger()}
        >
          <motion.div className="engine-panel" variants={fadeUp}>
            <h2>Built with Rust.<br/><span className="font-light">Rendered in React.</span></h2>
            <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }}>
              Dataflow Visualiser is a desktop architecture console. Rust indexes the repository, React renders the workspace, and the signal layer keeps risk attached to real files.
            </p>
            <div className="engine-stats">
              <div className="engine-stat">
                <h4>10-50x</h4>
                <p>Faster parsing path</p>
              </div>
              <div className="engine-stat">
                <h4>Local</h4>
                <p>Repo-first analysis</p>
              </div>
              <div className="engine-stat">
                <h4>Tauri</h4>
                <p>Explicit filesystem boundaries</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* PRIVACY */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger()}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "40px" }}>
            Privacy by default.
          </motion.h2>
          <motion.div className="card-grid" style={{ marginTop: 0 }} variants={stagger()}>
            <motion.div className="card" variants={fadeUp}>
              <ShieldCheck className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Local Indexing</h3>
              <p>File access starts from the native directory picker and Tauri capability scopes. No code leaves your machine without consent.</p>
            </motion.div>
            <motion.div className="card" variants={fadeUp}>
              <Lock className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Provider Choice</h3>
              <p>Use Gemini for cloud assistance or Ollama, LM Studio, vLLM, and compatible local APIs to keep all AI requests on-device.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* DOWNLOAD */}
        <motion.section 
          id="download"
          className="download-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger()}
        >
          <motion.h2 variants={fadeUp}>
            Download<br/><span className="font-light">the app.</span>
          </motion.h2>
          
          <motion.div className="download-meta" variants={fadeUp}>
            {releaseDetails.map((detail) => (
              <div key={detail.label} className="meta-item">
                <span className="mono-label text-muted">{detail.label}</span>
                <span className="val">{detail.value}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="actions" style={{ justifyContent: "center" }} variants={fadeUp}>
            <a href={primaryDownload} className="btn primary">
              <Download size={16} /> Windows Setup
            </a>
            <a href={msiDownload} className="btn secondary">
              MSI Package
            </a>
          </motion.div>

          <motion.div className="changelog-list" variants={fadeUp}>
            <h4>What's in 1.0.0</h4>
            <ul>
              {changelog.map((item, i) => (
                <li key={i}>
                  <span className="text-accent">•</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* FOOTER */}
        <footer className="footer">
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <strong style={{ color: "var(--fg)" }}>DV</strong>
            <span>MIT Licensed</span>
          </div>
          <div className="footer-nav">
            <a href="#">Top</a>
            <a href="#engine">Engine</a>
            <a href="#download">Download</a>
          </div>
        </footer>
      </main>
    </>
  );
}
