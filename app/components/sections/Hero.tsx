"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const platform = usePlatform();
  const primaryDownload = DOWNLOADS[platform].primary;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero" style={{ position: "relative", minHeight: "90vh", padding: "12vh 0 6vh" }}>
      {/* CSS Keyframes for pulse flow lines */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .pulse-path {
          stroke-dasharray: 8, 8;
          animation: dash 1.5s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        .float-badge-1 {
          animation: float 6s ease-in-out infinite;
        }
        .float-badge-2 {
          animation: float 7s ease-in-out infinite 1s;
        }
        .float-badge-3 {
          animation: float 5s ease-in-out infinite 0.5s;
        }
      `}</style>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.1)}
        style={{ y: y1, opacity, position: "relative", zIndex: 1, width: "100%" }}
      >
        <div className="hero-grid">
          
          {/* Left Column - Typography and CTAs */}
          <div className="hero-left">
            <motion.span className="mono-label text-accent font-mono" variants={fadeUp} style={{ marginBottom: "16px", display: "block" }}>
              // NATIVE SPEED CODEBASE MAPS
            </motion.span>
            
            <motion.h1 
              variants={fadeUp}
              style={{ 
                fontSize: "clamp(42px, 5.8vw, 80px)", 
                fontFamily: "var(--font-display)", 
                fontWeight: 800, 
                lineHeight: 0.88, 
                marginBottom: "20px", 
                letterSpacing: "-0.04em" 
              }}
            >
              <span style={{ display: "block" }}>Understand your</span>
              <span style={{ display: "block" }}>
                codebase{" "}
                <span style={{ 
                  color: "#fff", 
                  background: "var(--accent)", 
                  borderRadius: "12px", 
                  padding: "0px 14px 6px", 
                  display: "inline-block", 
                  transform: "rotate(-1.5deg)", 
                  boxShadow: "0 8px 24px rgba(255, 107, 0, 0.3)" 
                }}>
                  visually.
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted tagline"
              style={{ fontSize: "16px", maxWidth: "520px", marginBottom: "36px", lineHeight: 1.55 }}
            >
              Index, visualize, and analyze local repositories at native speed. Simulate blast-radius, trace dependency loops, and refactor using private or cloud AI.
            </motion.p>

            <motion.div className="actions" variants={fadeUp} style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <MagneticButton>
                <a 
                  href={primaryDownload.url} 
                  className="btn primary interactive"
                  style={{ 
                    padding: "16px 32px", 
                    background: "var(--fg)", 
                    color: "var(--bg)", 
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  Download for {platform === "mac" ? "Mac" : platform === "linux" ? "Linux" : "Windows"}
                  <span style={{ transition: "transform 0.2s" }} className="arrow">→</span>
                </a>
              </MagneticButton>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className="mono-label text-muted font-mono" style={{ fontSize: "11px" }}>V1.0.0</span>
                <span style={{ color: "var(--text-faint)", fontSize: "11px" }}>·</span>
                <a
                  href="https://github.com/Stewy8506/Repository-Visualiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label font-mono"
                  style={{ color: "var(--muted)", fontSize: "11px", textDecoration: "none", opacity: 0.7 }}
                >
                  MIT · Open Source
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-faint)" }}>
              <span>*free macOS beta · Apple Silicon & Intel</span>
            </motion.div>
          </div>

          {/* Right Column - Desktop Mockup Scene */}
          <div className="hero-right">
            
            {/* SVG Connecting cables */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
              <path d="M 50 80 Q 140 100, 160 170" fill="none" stroke="rgba(255, 107, 0, 0.12)" strokeWidth="1.5" />
              <path d="M 330 90 Q 260 140, 240 180" fill="none" stroke="rgba(255, 107, 0, 0.12)" strokeWidth="1.5" />
              <path d="M 80 340 Q 130 300, 180 260" fill="none" stroke="rgba(255, 107, 0, 0.12)" strokeWidth="1.5" />
            </svg>

            {/* Floating Badge 1: Speed */}
            <div className="badge interactive float-badge-1" style={{ position: "absolute", top: "20px", left: "-10px", zIndex: 10 }}>
              <span className="stat-dot" style={{ background: "#00ff80", position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%" }} />
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div className="av xs" style={{ background: "rgba(0, 255, 128, 0.1)", color: "#00ff80", borderRadius: "5px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>⚡</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="b-name" style={{ fontSize: "12px", fontWeight: "bold" }}>142,500 l/s</span>
                  <span className="b-role" style={{ fontSize: "9px", opacity: 0.6 }}>Rust indexer speed</span>
                </div>
              </div>
            </div>

            {/* Floating Badge 2: Blast Radius */}
            <div className="badge interactive float-badge-2" style={{ position: "absolute", top: "50px", right: "-10px", zIndex: 10 }}>
              <div className="stat-dot busy" style={{ background: "var(--accent)", position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%" }} />
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div className="av xs" style={{ background: "rgba(255, 107, 0, 0.1)", color: "var(--accent)", borderRadius: "5px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>🎯</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="b-name" style={{ fontSize: "12px", fontWeight: "bold" }}>Blast Radius</span>
                  <span className="b-role" style={{ fontSize: "9px", opacity: 0.6 }}>Downstream analyzer</span>
                </div>
              </div>
            </div>

            {/* Floating Badge 3: 100% Local */}
            <div className="badge interactive float-badge-3" style={{ position: "absolute", bottom: "30px", left: "20px", zIndex: 10 }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div className="av xs" style={{ background: "rgba(255, 255, 255, 0.08)", color: "var(--fg)", borderRadius: "5px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>🔒</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="b-name" style={{ fontSize: "12px", fontWeight: "bold" }}>100% Offline</span>
                  <span className="b-role" style={{ fontSize: "9px", opacity: 0.6 }}>Zero code leaves PC</span>
                </div>
              </div>
            </div>

            {/* Handwritten Note Annotation */}
            <div className="hand-tag" style={{ bottom: "50px", right: "20px", transform: "rotate(-8deg)" }}>
              Native desktop app ↘
            </div>

            {/* Central Mockup Window */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "82%",
              aspectRatio: "1.32",
              borderRadius: "20px",
              border: "1px solid var(--glass-border)",
              background: "var(--surface)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.06)",
              overflow: "hidden",
              zIndex: 5,
            }}>
              {/* Header bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 18px", borderBottom: "1px solid var(--glass-border)", background: "rgba(255, 255, 255, 0.01)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
                <span style={{ marginLeft: "auto", marginRight: "auto", fontSize: "10px", color: "var(--text-faint)", fontFamily: "monospace", letterSpacing: "0.05em" }}>workspace.json</span>
              </div>

              {/* Dependency Graph Canvas */}
              <div style={{ width: "100%", height: "calc(100% - 32px)", position: "relative", background: "radial-gradient(circle at center, rgba(255, 107, 0, 0.04) 0%, transparent 75%)" }}>
                <svg width="100%" height="100%" style={{ display: "block" }}>
                  {/* Animated flow lines */}
                  <path d="M 60 140 Q 130 90, 200 85" fill="none" stroke="rgba(255, 107, 0, 0.15)" strokeWidth="1.5" />
                  <path d="M 60 140 Q 130 90, 200 85" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="pulse-path" />
                  
                  <path d="M 60 140 Q 120 180, 180 175" fill="none" stroke="rgba(255, 107, 0, 0.15)" strokeWidth="1.5" />
                  
                  <path d="M 200 85 Q 230 130, 250 140" fill="none" stroke="rgba(255, 107, 0, 0.15)" strokeWidth="1.5" />
                  
                  <path d="M 180 175 Q 220 160, 250 140" fill="none" stroke="rgba(255, 107, 0, 0.15)" strokeWidth="1.5" />
                  <path d="M 180 175 Q 220 160, 250 140" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="pulse-path" />

                  {/* Nodes */}
                  <g>
                    <circle cx="60" cy="140" r="9" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
                    <text x="60" y="123" textAnchor="middle" fill="var(--fg)" fontSize="8" fontFamily="var(--font-mono)">main.rs</text>
                  </g>
                  
                  <g>
                    <circle cx="200" cy="85" r="11" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
                    <text x="200" y="67" textAnchor="middle" fill="var(--fg)" fontSize="8" fontFamily="var(--font-mono)">parser.rs</text>
                  </g>
                  
                  <g>
                    <circle cx="180" cy="175" r="8" fill="var(--bg)" stroke="var(--text-faint)" strokeWidth="1.5" />
                    <text x="180" y="193" textAnchor="middle" fill="var(--text-subtle)" fontSize="8" fontFamily="var(--font-mono)">graph.rs</text>
                  </g>
                  
                  <g>
                    <circle cx="250" cy="140" r="9" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
                    <text x="250" y="123" textAnchor="middle" fill="var(--fg)" fontSize="8" fontFamily="var(--font-mono)">ai.rs</text>
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <div style={{
          width: "1px",
          height: "24px",
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
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--muted)", opacity: 0.4 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
