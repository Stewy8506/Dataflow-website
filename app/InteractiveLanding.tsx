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
  Zap,
  Code2,
  Terminal,
  EyeOff,
  Database,
} from "lucide-react";

// --- Data ---

const primaryDownload = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";
const msiDownload = "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi";

const stack = ["Rust", "Tauri v2", "React 19", "WebGL", "oxc-parser", "Tree-Sitter", "Gemini API", "Local LLMs", "TypeScript"];

const features = [
  {
    num: "01",
    title: "Native-Speed Parsing",
    body: "Uses oxc-parser and Tree-Sitter in Rust to scan thousands of files per second without blocking the main thread.",
    icon: Zap,
  },
  {
    num: "02",
    title: "Interactive Canvas",
    body: "WebGL-powered 2D and 3D force-directed graphs with smart dynamic handle routing and directory clustering.",
    icon: Network,
  },
  {
    num: "03",
    title: "Blast-Radius Analytics",
    body: "Simulate structural changes and instantly see the downstream propagation path color-coded by breaking risk.",
    icon: Radar,
  },
  {
    num: "04",
    title: "Deep AI Engine",
    body: "Automated semantic domain mapping, executable refactoring, and interactive file-scoped Q&A via Gemini or local LLMs.",
    icon: Bot,
  },
  {
    num: "05",
    title: "Advanced Analysis",
    body: "Dead code detection, circular dependency tracking, and complexity heatmaps across your entire workspace.",
    icon: Code2,
  },
  {
    num: "06",
    title: "Deep IDE Integration",
    body: "Fully integrated PTY terminal. Open any node directly in VS Code, Cursor, WebStorm, IntelliJ, or Neovim.",
    icon: Terminal,
  },
];

const steps = [
  { num: "1", title: "Select", body: "Pick a local directory via the native OS picker." },
  { num: "2", title: "Index", body: "Rust builds the AST dependency graph and streams it to WebGL." },
  { num: "3", title: "Simulate", body: "Select a node to run blast-radius DFS and preview breaks." },
  { num: "4", title: "Enrich", body: "Ask the AI to map semantic domains or explain logic." },
  { num: "5", title: "Refactor", body: "Have the AI rewrite files and apply them to disk." },
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
              A high-performance native desktop tool for indexing, visualizing, and analyzing local codebases with blast-radius simulation.
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
            Understand the structure<br />before you break it.
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
            <svg viewBox="0 0 1000 400" role="img" aria-label="Animated dependency graph preview">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Edges */}
              <path id="e1" className="edge" d="M150,200 C300,100 400,200 500,200" strokeWidth="1.5" />
              <path id="e2" className="edge" d="M150,200 C250,300 400,300 500,200" strokeWidth="1.5" />
              <path id="e3" className="edge" d="M500,200 C650,200 700,100 850,150" strokeWidth="1.5" />
              <path id="e4" className="edge" d="M500,200 C600,350 750,300 850,250" strokeWidth="1.5" />

              {/* Pulses */}
              <circle r="4" fill="var(--accent)" filter="url(#glow)">
                <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#e1" /></animateMotion>
              </circle>
              <circle r="4" fill="var(--accent)" filter="url(#glow)">
                <animateMotion dur="4s" repeatCount="indefinite" begin="1s"><mpath href="#e2" /></animateMotion>
              </circle>
              <circle r="4" fill="#00ffcc" filter="url(#glow)">
                <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#e3" /></animateMotion>
              </circle>
              <circle r="4" fill="#ff4060" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.5s"><mpath href="#e4" /></animateMotion>
              </circle>

              {/* Nodes */}
              <circle cx="150" cy="200" r="12" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <circle cx="500" cy="200" r="24" fill="#111" stroke="var(--accent)" strokeWidth="3" filter="url(#glow)">
                <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="850" cy="150" r="16" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <circle cx="850" cy="250" r="16" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
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
            <h2>Built with Rust.<br /><span className="font-light">Rendered in React.</span></h2>
            <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }}>
              Dataflow Visualiser strictly separates the sandboxed UI layer from the native systems engine, communicating over a low-latency IPC bridge.
            </p>
            <div className="engine-stats">
              <div className="engine-stat">
                <h4>10-50x</h4>
                <p>Faster parsing via oxc-parser</p>
              </div>
              <div className="engine-stat">
                <h4>100%</h4>
                <p>Local execution & privacy</p>
              </div>
              <div className="engine-stat">
                <h4>Tauri v2</h4>
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
          <motion.div className="card-grid privacy-grid" style={{ marginTop: 0 }} variants={stagger()}>
            <motion.div className="card privacy" variants={fadeUp}>
              <ShieldCheck className="watermark" />
              <ShieldCheck className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Local Indexing</h3>
              <p>File access starts from the native directory picker and Tauri capability scopes. No code leaves your machine without consent.</p>
            </motion.div>
            <motion.div className="card privacy" variants={fadeUp}>
              <Lock className="watermark" />
              <Lock className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Provider Choice</h3>
              <p>Use Gemini for cloud assistance or Ollama, LM Studio, vLLM, and compatible local APIs to keep all AI requests on-device.</p>
            </motion.div>
            <motion.div className="card privacy" variants={fadeUp}>
              <EyeOff className="watermark" />
              <EyeOff className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Strict Scopes</h3>
              <p>Rust backend operations explicitly enforce the Tauri fs_scope(). The execution sandbox rejects access to any unauthorized files.</p>
            </motion.div>
            <motion.div className="card privacy" variants={fadeUp}>
              <Database className="watermark" />
              <Database className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
              <h3>Offline First</h3>
              <p>Dataflow Visualiser is designed to run entirely air-gapped. Your codebase history, snapshots, and graph data are stored in a local SQLite journal.</p>
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
            Download<br /><span className="font-light">the app.</span>
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
