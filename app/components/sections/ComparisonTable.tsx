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
        style={{ 
          width: "100%", 
          overflowX: "auto",
          borderRadius: "16px",
          border: "1px solid var(--glass-border)",
          background: "var(--surface)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 var(--glass-border)",
        }}
      >
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}>
          <thead>
            <tr>
              {["Tool", "What it does", "What it misses"].map((h, i) => (
                <th key={h} style={{
                  textAlign: "left",
                  padding: "18px 24px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--surface-hover)",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => (
              <tr key={row.tool} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-hover)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{
                  padding: "20px 24px",
                  fontWeight: 600,
                  color: "var(--fg)",
                  borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}>
                  {row.tool}
                </td>
                <td style={{
                  padding: "20px 24px",
                  color: "var(--muted)",
                  borderBottom: "1px solid var(--border)",
                  lineHeight: 1.6,
                }}>
                  {row.does}
                </td>
                <td style={{
                  padding: "20px 24px",
                  color: "var(--accent)",
                  borderBottom: "1px solid var(--border)",
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}>
                  {row.misses}
                </td>
              </tr>
            ))}

            {/* Dataflow Visualiser row — the hero */}
            <tr style={{ position: "relative" }}>
              <td colSpan={3} style={{ padding: 0, height: 0 }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--accent-subtle), transparent)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, var(--accent), transparent)" }} />
              </td>
            </tr>
            <tr style={{ background: "var(--accent-subtle)" }}>
              <td style={{
                padding: "24px",
                fontWeight: 700,
                color: "var(--accent)",
                whiteSpace: "nowrap",
              }}>
                Dataflow Visualiser
              </td>
              <td style={{
                padding: "24px",
                color: "var(--fg)",
                lineHeight: 1.6,
                fontWeight: 500,
                opacity: 0.9,
              }}>
                Native-speed local parsing, interactive 2D/3D canvas, blast-radius simulation, deep AI engine, headless CI export — all in one desktop app.
              </td>
              <td style={{
                padding: "24px",
              }}>
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
      </motion.div>
    </motion.section>
  );
}
