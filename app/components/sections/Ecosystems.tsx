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
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "120px" }}
    >
      <motion.h2 variants={fadeUp as any} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px" }}>
        Supported ecosystems.
      </motion.h2>
      <motion.p variants={fadeUp as any} className="text-muted" style={{ fontSize: "18px", maxWidth: "600px" }}>
        First-class support for the frameworks and languages your team already uses.
      </motion.p>
      <motion.div className="honeycomb-container" variants={stagger()}>
        <div className="hex-row">
          {ECOSYSTEMS.slice(0, 2).map((eco) => <HexBadge key={eco.name} eco={eco as any} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(2, 5).map((eco) => <HexBadge key={eco.name} eco={eco as any} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(5, 7).map((eco) => <HexBadge key={eco.name} eco={eco as any} />)}
        </div>
      </motion.div>
    </motion.section>
  );
}
