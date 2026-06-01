"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "../ui/SpotlightCard";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURES } from "../../data/content";

import { GraphPreview } from "../ui/GraphPreview";

export function ProductShowcase() {
  return (
    <motion.section
      id="product"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "24px" }}>
        Understand the structure<br />before you break it.
      </motion.h2>

      <motion.div className="card-grid" variants={fadeUp}>
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <SpotlightCard key={feature.num}>
              <span className="mono-label">{feature.num}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Icon className="icon" size={24} />
            </SpotlightCard>
          );
        })}
      </motion.div>

      <motion.div className="graph-container" variants={fadeUp}>
        <GraphPreview />
      </motion.div>
    </motion.section>
  );
}
