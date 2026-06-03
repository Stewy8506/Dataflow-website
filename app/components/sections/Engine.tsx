"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { TerminalDemo } from "../ui/TerminalDemo";
import { NumberCounter } from "../ui/NumberCounter";
import { ArrowRight } from "lucide-react";

const ARCH_LAYERS = [
  { label: "Rust Engine", sublabel: "oxc-parser · Tree-Sitter · SQLite", color: "#ef4444" },
  { label: "IPC Bridge", sublabel: "Tauri v2 · Low-latency commands", color: "#f97316" },
  { label: "React UI", sublabel: "WebGL · Framer Motion · Three.js", color: "#3b82f6" },
];

export function Engine() {
  return (
    <motion.section
      id="engine"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.div className="engine-panel relative overflow-hidden" variants={fadeUp}>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>Built with Rust.<br /><span className="font-light">Rendered in React.</span></h2>
        </motion.div>

        <p style={{ maxWidth: "600px", fontSize: "18px", opacity: 0.8 }} className="mb-12">
          Dataflow Visualiser strictly separates the sandboxed UI layer from the native systems engine, communicating over a low-latency IPC bridge.
        </p>

        {/* Architecture diagram */}
        <motion.div
          variants={fadeUp}
          style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "48px", flexWrap: "wrap" }}
        >
          {ARCH_LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 0 }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: `1px solid ${layer.color}30`,
                  background: `${layer.color}10`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  textAlign: "center",
                  minWidth: "160px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "14px", color: layer.color, marginBottom: "4px", fontFamily: "monospace" }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4, fontFamily: "monospace" }}>
                  {layer.sublabel}
                </div>
              </div>
              {i < ARCH_LAYERS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  style={{ display: "flex", alignItems: "center", padding: "0 8px" }}
                >
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="engine-stats relative z-10">
          <div className="engine-stat">
            <h4><NumberCounter to={50} suffix="x" /></h4>
            <p>Faster parsing via oxc-parser</p>
          </div>
          <div className="engine-stat">
            <h4><NumberCounter to={100} suffix="%" /></h4>
            <p>Local execution &amp; privacy</p>
          </div>
          <div className="engine-stat">
            <h4><NumberCounter to={2} suffix=".0" /></h4>
            <p>Tauri: Explicit boundary scopes</p>
          </div>
        </div>

        <div className="mt-16">
          <TerminalDemo />
        </div>
      </motion.div>
    </motion.section>
  );
}
