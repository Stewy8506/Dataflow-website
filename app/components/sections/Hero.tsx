"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { cinematicRevealContainer, cinematicRevealText, fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";
import { ChevronDown } from "lucide-react";



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

        {/* Typewriter tagline in glassmorphic chip */}
        <motion.div className="tagline-chip" variants={fadeUp} style={{ marginBottom: "48px" }}>
          <p className="tagline font-light" style={{ marginBottom: 0 }}>
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
          </p>
        </motion.div>

        <motion.div className="actions" variants={fadeUp}>
          <MagneticButton>
            <a href={primaryDownload.url} className="btn primary interactive">
              Download for {platform === "mac" ? "Mac" : platform === "linux" ? "Linux" : "Windows"}
            </a>
          </MagneticButton>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="mono-label text-muted">V1.0.0</span>
            <span style={{ color: "var(--text-faint)", fontSize: "11px" }}>·</span>
            <a
              href="https://github.com/Stewy8506/Repository-Visualiser"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label"
              style={{ color: "var(--muted)", fontSize: "11px", textDecoration: "none", opacity: 0.7 }}
            >
              MIT · Open Source
            </a>
          </div>
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
          gap: "8px",
          zIndex: 1,
        }}
      >
        {/* Gradient line above scroll indicator */}
        <div style={{
          width: "1px",
          height: "32px",
          background: "linear-gradient(to bottom, transparent, var(--accent))",
          opacity: 0.3,
          marginBottom: "4px",
        }} />
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}
        >
          scroll
        </motion.span>
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
