"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleUp, stagger } from "../ui/animations";
import { SHOWCASE_TABS } from "../../data/content";
import { GraphPreview } from "../ui/GraphPreview";

export function AppShowcase() {
  const [activeTab, setActiveTab] = useState(SHOWCASE_TABS[0].id);
  const active = SHOWCASE_TABS.find(t => t.id === activeTab)!;

  return (
    <motion.section
      id="app-showcase"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.span className="mono-label text-accent" variants={fadeUp} style={{ marginBottom: "16px", display: "block" }}>
        // SHOWCASE
      </motion.span>
      <motion.h2
        variants={fadeUp}
        style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px" }}
      >
        See it in action.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-muted"
        style={{ fontSize: "18px", maxWidth: "560px", marginBottom: "48px", lineHeight: 1.6 }}
      >
        A native desktop tool that turns your codebase into a live, interactive dependency graph.
      </motion.p>

      {/* Tab selector */}
      <motion.div variants={fadeUp} style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {SHOWCASE_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 24px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: activeTab === tab.id
                ? "1px solid var(--accent-border)"
                : "1px solid var(--glass-border)",
              background: activeTab === tab.id
                ? "var(--accent-subtle)"
                : "var(--surface)",
              color: activeTab === tab.id
                ? "var(--accent)"
                : "var(--text-subtle)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Screenshot frame */}
      <motion.div variants={scaleUp}>
        <div style={{
          position: "relative",
          width: "100%",
          borderRadius: "20px",
          border: "1px solid var(--glass-border)",
          background: "var(--surface)",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          {/* macOS-style window chrome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 20px",
            borderBottom: "1px solid var(--glass-border)",
            background: "var(--surface)",
          }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
            <span style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "11px",
              color: "var(--text-faint)",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}>
              Dataflow Visualiser
            </span>
          </div>

          {/* Live canvas / Image container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", height: "100%" }}
            >
              {["graph", "blast", "trace"].includes(active.id) ? (
                <GraphPreview mode={active.id as "graph" | "blast" | "trace"} />
              ) : (
                <img
                  src={active.image}
                  alt={active.label}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: "20px",
              fontSize: "14px",
              color: "var(--text-subtle)",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            {active.caption}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
