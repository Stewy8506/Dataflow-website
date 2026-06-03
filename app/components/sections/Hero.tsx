"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { cinematicRevealContainer, cinematicRevealText, fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";
import { ChevronDown } from "lucide-react";

const TECH_BADGES = ["Rust", "Tauri v2", "WebGL", "oxc-parser"];

export function Hero() {
  const platform = usePlatform();
  const primaryDownload = DOWNLOADS[platform].primary;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero" style={{ position: "relative" }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
        style={{ y: y1, opacity, position: "relative", zIndex: 1 }}
      >
        <motion.h1 variants={cinematicRevealContainer}>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText} className="gradient-text">DATAFLOW</motion.span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.span style={{ display: "block" }} variants={cinematicRevealText}>VISUALISER</motion.span>
          </div>
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.p className="tagline font-light" variants={fadeUp}>
          <TypeAnimation
            sequence={[
              "Index, visualize, and analyze local codebases at native speed.",
              3000,
              "Simulate blast-radius before you break production.",
              3000,
              "Refactor with AI that understands your entire dependency graph.",
              3000,
            ]}
            wrapper="span"
            speed={60}
            repeat={Infinity}
          />
        </motion.p>

        <motion.div className="actions" variants={fadeUp}>
          <MagneticButton>
            <a href={primaryDownload.url} className="btn primary interactive">
              Download for {platform === "mac" ? "Mac" : platform === "linux" ? "Linux" : "Windows"}
            </a>
          </MagneticButton>
          <span className="mono-label text-muted">V1.0.0</span>
        </motion.div>

        {/* Floating tech badges */}
        <motion.div
          variants={fadeUp}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "40px" }}
        >
          {TECH_BADGES.map((badge, i) => (
            <motion.span
              key={badge}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                fontSize: "12px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "var(--muted)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", boxShadow: "0 0 6px var(--accent)" }} />
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", opacity: 0.5, fontFamily: "monospace" }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--muted)", opacity: 0.4 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
