"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger } from "../ui/animations";
import { TerminalDemo } from "../ui/TerminalDemo";
import { NumberCounter } from "../ui/NumberCounter";
import { ChevronRight, ChevronDown, Activity, Box, Terminal as TerminalIcon } from "lucide-react";

const ARCH_LAYERS = [
  { id: "rust", label: "Rust Engine", sublabel: "oxc-parser · Tree-Sitter · SQLite", color: "#ef4444", icon: Box },
  { id: "ipc", label: "IPC Bridge", sublabel: "Tauri v2 · Low-latency commands", color: "#f97316", icon: Activity },
  { id: "react", label: "React UI", sublabel: "WebGL · Framer Motion · Three.js", color: "#3b82f6", icon: TerminalIcon },
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
      <motion.div className="engine-panel" variants={fadeUp}>

        <motion.span className="mono-label" variants={fadeUp} style={{ marginBottom: "16px", display: "block", color: "var(--accent)" }}>
          // ENGINE
        </motion.span>

        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Built with Rust.<br /><span className="font-light">Rendered in React.</span>
          </h2>
        </motion.div>

        <p style={{ maxWidth: "560px", fontSize: "18px", color: "var(--muted)", opacity: 0.7, marginBottom: "64px", lineHeight: 1.6 }}>
          Dataflow Visualiser strictly separates the sandboxed UI layer from the native systems engine, communicating over a low-latency IPC bridge.
        </p>

        {/* ── Responsive Architecture Grid ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
          {ARCH_LAYERS.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <React.Fragment key={layer.id}>
                <motion.div
                  className="engine-arch-block"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.2, ease: "easeOut" }}
                  whileHover={{ 
                    x: -2, 
                    y: -2, 
                    boxShadow: `10px 10px 0px 0px ${layer.color}90, 0 0 30px ${layer.color}20`,
                    borderColor: layer.color
                  }}
                  style={{
                    flex: 1,
                    boxShadow: `8px 8px 0px 0px ${layer.color}30`,
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Subtle top glare */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                    background: "linear-gradient(90deg, transparent 0%, var(--glass-border) 50%, transparent 100%)",
                  }} />

                  {/* Icon Badge */}
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "var(--surface)",
                    border: "1px solid var(--glass-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 var(--glass-border)",
                    marginBottom: "20px"
                  }}>
                    <Icon size={22} color={layer.color} strokeWidth={1.5} />
                  </div>

                  {/* Label + sublabel */}
                  <div>
                    <h3 style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--fg)",
                      letterSpacing: "-0.02em",
                      margin: "0 0 10px",
                      lineHeight: 1.2,
                    }}>
                      {layer.label}
                    </h3>
                    <p style={{
                      fontSize: "12px",
                      color: "var(--text-subtle)",
                      fontWeight: 400,
                      margin: 0,
                      lineHeight: 1.6,
                      fontFamily: "var(--font-mono), monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}>
                      {layer.sublabel}
                    </p>
                  </div>
                </motion.div>

                {/* Desktop connector (chevron between blocks) */}
                {i < ARCH_LAYERS.length - 1 && (
                  <div className="engine-arch-connector hidden lg:flex" style={{ alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    >
                      <ChevronRight size={28} color="var(--accent)" strokeWidth={2.5} style={{ opacity: 0.8 }} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Stats ── */}
        <div className="engine-stats" style={{ marginTop: "72px" }}>
          <motion.div className="engine-stat" variants={fadeIn}>
            <h4><NumberCounter to={50} suffix="x" /></h4>
            <p>Faster parsing via oxc-parser</p>
          </motion.div>
          <motion.div className="engine-stat" variants={fadeIn}>
            <h4><NumberCounter to={100} suffix="%" /></h4>
            <p>Local execution &amp; privacy</p>
          </motion.div>
          <motion.div className="engine-stat" variants={fadeIn}>
            <h4><NumberCounter to={2} suffix=".0" /></h4>
            <p>Tauri: Explicit boundary scopes</p>
          </motion.div>
        </div>

        <div style={{ marginTop: "64px" }}>
          <TerminalDemo />
        </div>

      </motion.div>
    </motion.section>
  );
}
