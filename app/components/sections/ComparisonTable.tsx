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

      <motion.div variants={fadeUp} style={{ width: "100%", overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontSize: "14px",
        }}>
          <thead>
            <tr>
              {["Tool", "What it does", "What it misses"].map((h, i) => (
                <th key={h} style={{
                  textAlign: "left",
                  padding: "14px 20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
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
              <tr key={row.tool}>
                <td style={{
                  padding: "18px 20px",
                  fontWeight: 600,
                  color: "#fff",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  whiteSpace: "nowrap",
                }}>
                  {row.tool}
                </td>
                <td style={{
                  padding: "18px 20px",
                  color: "rgba(255,255,255,0.55)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  lineHeight: 1.5,
                }}>
                  {row.does}
                </td>
                <td style={{
                  padding: "18px 20px",
                  color: "rgba(255,107,0,0.8)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  lineHeight: 1.5,
                }}>
                  {row.misses}
                </td>
              </tr>
            ))}

            {/* Dataflow Visualiser row — the hero */}
            <tr>
              <td style={{
                padding: "20px 20px",
                fontWeight: 700,
                color: "var(--accent)",
                borderTop: "2px solid rgba(255,107,0,0.3)",
                background: "rgba(255,107,0,0.04)",
                whiteSpace: "nowrap",
              }}>
                Dataflow Visualiser
              </td>
              <td style={{
                padding: "20px 20px",
                color: "rgba(255,255,255,0.7)",
                borderTop: "2px solid rgba(255,107,0,0.3)",
                background: "rgba(255,107,0,0.04)",
                lineHeight: 1.5,
                fontWeight: 500,
              }}>
                Native-speed local parsing, interactive 2D/3D canvas, blast-radius simulation, deep AI engine, headless CI export — all in one desktop app.
              </td>
              <td style={{
                padding: "20px 20px",
                borderTop: "2px solid rgba(255,107,0,0.3)",
                background: "rgba(255,107,0,0.04)",
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  background: "rgba(255,107,0,0.15)",
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
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
