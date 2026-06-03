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
          {ECOSYSTEMS.slice(0, 3).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(3, 5).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
        <div className="hex-row">
          {ECOSYSTEMS.slice(5, 8).map((eco) => <HexBadge key={eco.name} eco={eco} />)}
        </div>
      </motion.div>

    </motion.section>
  );
}
