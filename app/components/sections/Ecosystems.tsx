"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { HexBadge } from "../ui/HexBadge";
import { ECOSYSTEMS } from "../../data/content";

export function Ecosystems() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
    >
      <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px" }}>
        Supported ecosystems.
      </motion.h2>
      <motion.p variants={fadeUp} className="text-muted" style={{ fontSize: "18px", maxWidth: "600px", marginBottom: "16px" }}>
        Not just icons. Deep, framework-specific parsing that understands your architecture.
      </motion.p>
      <motion.div className="honeycomb-container" variants={stagger()}>
        <div className="hex-row">
          {ECOSYSTEMS.slice(0, 2).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(2, 5).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(5, 8).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
      </motion.div>

      {/* Depth descriptions */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "12px",
          width: "100%",
          maxWidth: "900px",
          marginTop: "48px",
          textAlign: "left",
        }}
      >
        {ECOSYSTEMS.map(eco => {
          const Icon = eco.icon;
          return (
            <div key={eco.name} style={{
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
            }}>
              <Icon
                size={18}
                style={{ color: eco.color, flexShrink: 0, marginTop: "2px" }}
              />
              <div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", display: "block", marginBottom: "4px" }}>
                  {eco.name}
                </span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                  {eco.depth}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
