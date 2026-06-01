"use client";

import { motion } from "framer-motion";
import { cinematicRevealContainer, cinematicRevealText, fadeUp, stagger } from "../ui/animations";

const primaryDownload = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";

export function Hero() {
  return (
    <section className="hero">
      <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
        <motion.h1 variants={cinematicRevealContainer}>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText as any} className="gradient-text">DATAFLOW</motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText as any}>VISUALISER</motion.span>
          </div>
        </motion.h1>
        <motion.p className="tagline font-light" variants={fadeUp as any}>
          A high-performance native desktop tool for indexing, visualizing, and analyzing local codebases with blast-radius simulation.
        </motion.p>
        <motion.div className="actions" variants={fadeUp as any}>
          <a href={primaryDownload} className="btn primary">
            Download for Windows
          </a>
          <span className="mono-label text-muted">V1.0.0</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
