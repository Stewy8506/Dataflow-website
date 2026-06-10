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
      >
        <table className="dashboard-table">
          <thead>
            <tr>
              {["Tool", "What it does", "What it misses"].map((h) => (
                <th key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.tool}>
                <td style={{ fontWeight: 600, color: "var(--fg)", whiteSpace: "nowrap" }}>
                  {row.tool}
                </td>
                <td style={{ color: "var(--muted)" }}>
                  {row.does}
                </td>
                <td style={{ color: "var(--accent)", opacity: 0.85 }}>
                  {row.misses}
                </td>
              </tr>
            ))}

            {/* Dataflow Visualiser row — the hero */}
            <tr className="dataflow-highlight-row">
              <td style={{
                fontWeight: 700,
                color: "var(--accent)",
                whiteSpace: "nowrap",
              }}>
                Dataflow Visualiser
              </td>
              <td style={{
                color: "var(--fg)",
                fontWeight: 500,
                opacity: 0.95,
              }}>
                Native-speed local parsing, interactive 2D/3D canvas, blast-radius simulation, deep AI engine, headless CI export — all in one desktop app.
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
      </motion.div>
    </motion.section>
  );
}
