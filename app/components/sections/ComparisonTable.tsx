"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { COMPARISON } from "../../data/content";
import { Check, X } from "lucide-react";

export function ComparisonTable() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.span className="mono-label text-accent" variants={fadeUp} style={{ marginBottom: "16px", display: "block" }}>
        // COMPARISON
      </motion.span>
      <motion.h2
        variants={fadeUp}
        style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px" }}
      >
        Why not just use X?
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-muted"
        style={{ fontSize: "18px", maxWidth: "600px", marginBottom: "56px", lineHeight: 1.6 }}
      >
        Existing tools solve pieces of the puzzle. Dataflow Visualiser is the only one that puts them all together — locally, privately, at native speed.
      </motion.p>

      <motion.div 
        variants={fadeUp} 
        className="comparison-table-wrapper"
        style={{
          border: "1px solid var(--border)",
          background: "rgba(15, 14, 12, 0.4)",
          boxShadow: "var(--card-shadow)",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        {/* Tauri / IDE Window Header Mockup */}
        <div style={{
          background: "rgba(20, 19, 17, 0.7)",
          borderBottom: "1px solid var(--border)",
          padding: "12px 24px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* File/Editor Tabs */}
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{
              padding: "10px 16px",
              background: "var(--surface)",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              borderLeft: "1px solid var(--border)",
              borderRight: "1px solid var(--border)",
              borderTop: "2px solid var(--accent)",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              color: "var(--fg)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "-1px"
            }}>
              <span>📊</span>
              <span>comparison.csv</span>
            </div>
            <div style={{
              padding: "10px 16px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-faint)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer"
            }}>
              <span>⚙️</span>
              <span>rules.json</span>
            </div>
          </div>
          {/* Mock Window Controls */}
          <div style={{ display: "flex", gap: "6px", paddingBottom: "10px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", opacity: 0.8 }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", opacity: 0.8 }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", opacity: 0.8 }} />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                {["Tool", "What it does", "What it misses"].map((h) => (
                  <th key={h} style={{
                    padding: "16px 24px",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--text-subtle)",
                    borderBottom: "1px solid var(--border)",
                    background: "rgba(20, 19, 17, 0.2)"
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.tool}>
                  <td style={{ fontWeight: 600, color: "var(--fg)", whiteSpace: "nowrap", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--border)" }} />
                      {row.tool}
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <span style={{ color: "#00ff80", marginTop: "3px", display: "inline-flex" }}><Check size={14} strokeWidth={2.5} /></span>
                      <span>{row.does}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--accent)", opacity: 0.85 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <span style={{ color: "#ff5f56", marginTop: "3px", display: "inline-flex" }}><X size={14} strokeWidth={2.5} /></span>
                      <span>{row.misses}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Dataflow Visualiser row — the hero */}
              <tr className="dataflow-highlight-row">
                <td style={{
                  fontWeight: 700,
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  verticalAlign: "middle"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)" }} />
                    Dataflow Visualiser
                  </div>
                </td>
                <td style={{
                  color: "var(--fg)",
                  fontWeight: 500,
                  opacity: 0.95,
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "var(--accent)", marginTop: "3px", display: "inline-flex" }}><Check size={14} strokeWidth={3} /></span>
                    <span>Native-speed local parsing, interactive 2D/3D canvas, blast-radius simulation, deep AI engine, headless CI export — all in one desktop app.</span>
                  </div>
                </td>
                <td>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: "var(--accent-subtle)",
                    color: "var(--accent)",
                    letterSpacing: "0.04em",
                    border: "1px solid var(--accent-border)",
                    boxShadow: "0 0 12px rgba(255,107,0,0.15)",
                  }}>
                    <Check size={14} strokeWidth={3} /> Nothing.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.section>
  );
}
