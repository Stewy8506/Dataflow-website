"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURE_GROUPS } from "../../data/content";

export function FeatureDeep() {
  const [activeGroup, setActiveGroup] = useState(FEATURE_GROUPS[0].id);
  const group = FEATURE_GROUPS.find(g => g.id === activeGroup)!;

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
        Everything you need.<br /><span className="font-light">Nothing you don't.</span>
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-muted"
        style={{ fontSize: "18px", maxWidth: "560px", marginBottom: "56px", lineHeight: 1.6 }}
      >
        30+ features built for developers who need to understand, refactor, and ship with confidence.
      </motion.p>

      {/* Group tabs */}
      <motion.div variants={fadeUp} style={{ display: "flex", gap: "6px", marginBottom: "40px", flexWrap: "wrap" }}>
        {FEATURE_GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            style={{
              padding: "10px 22px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: activeGroup === g.id
                ? "1px solid rgba(255,107,0,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              background: activeGroup === g.id
                ? "rgba(255,107,0,0.1)"
                : "rgba(255,255,255,0.03)",
              color: activeGroup === g.id
                ? "var(--accent)"
                : "rgba(255,255,255,0.5)",
            }}
          >
            {g.title}
          </button>
        ))}
      </motion.div>

      {/* Feature list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <p style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "32px",
            fontStyle: "italic",
          }}>
            {group.subtitle}
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {group.features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  style={{
                    padding: "28px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,107,0,0.08)",
                      border: "1px solid rgba(255,107,0,0.15)",
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="var(--accent)" strokeWidth={2} />
                    </div>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", margin: 0 }}>
                      {feat.title}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
