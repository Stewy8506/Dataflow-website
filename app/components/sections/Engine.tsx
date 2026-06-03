"use client";

import React from "react";
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

        {/* Clean, Horizontal Architecture Pipeline */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6 mb-16 w-full max-w-5xl mx-auto"
        >
          {ARCH_LAYERS.map((layer, i) => (
            <React.Fragment key={layer.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 lg:p-10 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                {/* Sleek top border accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2" 
                  style={{ background: layer.color }} 
                />
                
                {/* Clean spotlight effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
                  style={{ background: `radial-gradient(circle at top, ${layer.color}, transparent 80%)` }} 
                />

                <h3 className="text-xl lg:text-2xl font-bold mb-3 tracking-tight" style={{ color: layer.color }}>
                  {layer.label}
                </h3>
                <p className="text-sm lg:text-base opacity-60 leading-relaxed max-w-[220px]">
                  {layer.sublabel}
                </p>
              </motion.div>

              {i < ARCH_LAYERS.length - 1 && (
                <div className="hidden lg:flex items-center justify-center opacity-30 shrink-0">
                  <ArrowRight size={32} />
                </div>
              )}
            </React.Fragment>
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
