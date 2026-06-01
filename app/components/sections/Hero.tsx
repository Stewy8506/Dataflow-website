"use client";

import { motion } from "framer-motion";
import { cinematicRevealContainer, cinematicRevealText, fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";

export function Hero() {
  const platform = usePlatform();
  const primaryDownload = DOWNLOADS[platform].primary;
  return (
    <section className="hero">
      <motion.div initial="hidden" animate="visible" variants={stagger(0.1)}>
        <motion.h1 variants={cinematicRevealContainer}>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText} className="gradient-text">DATAFLOW</motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText}>VISUALISER</motion.span>
          </div>
        </motion.h1>
        <motion.p className="tagline font-light" variants={fadeUp}>
          A high-performance native desktop tool for indexing, visualizing, and analyzing local codebases with blast-radius simulation.
        </motion.p>
        <motion.div className="actions" variants={fadeUp}>
          <MagneticButton>
            <a href={primaryDownload.url} className="btn primary">
              Download for {platform === "mac" ? "Mac" : platform === "linux" ? "Linux" : "Windows"}
            </a>
          </MagneticButton>
          <span className="mono-label text-muted">V1.0.0</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
