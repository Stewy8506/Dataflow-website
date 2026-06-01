"use client";

import { motion } from "framer-motion";
import { Zap, Network, Radar, Bot, Code2, Terminal } from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { fadeUp, stagger } from "../ui/animations";

const features = [
  { num: "01", title: "Native-Speed Parsing", body: "Uses oxc-parser and Tree-Sitter in Rust to scan thousands of files per second without blocking the main thread.", icon: Zap },
  { num: "02", title: "Interactive Canvas", body: "WebGL-powered 2D and 3D force-directed graphs with smart dynamic handle routing and directory clustering.", icon: Network },
  { num: "03", title: "Blast-Radius Analytics", body: "Simulate structural changes and instantly see the downstream propagation path color-coded by breaking risk.", icon: Radar },
  { num: "04", title: "Deep AI Engine", body: "Automated semantic domain mapping, executable refactoring, and interactive file-scoped Q&A via Gemini or local LLMs.", icon: Bot },
  { num: "05", title: "Advanced Analysis", body: "Dead code detection, circular dependency tracking, and complexity heatmaps across your entire workspace.", icon: Code2 },
  { num: "06", title: "Deep IDE Integration", body: "Fully integrated PTY terminal. Open any node directly in VS Code, Cursor, WebStorm, IntelliJ, or Neovim.", icon: Terminal },
];

export function ProductShowcase() {
  return (
    <motion.section
      id="product"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.h2 variants={fadeUp as any} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "24px" }}>
        Understand the structure<br />before you break it.
      </motion.h2>

      <motion.div className="card-grid" variants={fadeUp as any}>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <SpotlightCard key={feature.num}>
              <span className="mono-label">{feature.num}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Icon className="icon" size={24} />
            </SpotlightCard>
          );
        })}
      </motion.div>

      <motion.div className="graph-container" variants={fadeUp as any}>
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
  );
}
