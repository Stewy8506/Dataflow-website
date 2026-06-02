"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "../ui/SpotlightCard";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURES } from "../../data/content";

import { GraphPreview } from "../ui/GraphPreview";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName("card");
    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      
      // Make adjacent cards glow slightly
      const el = card.querySelector(".border-spotlight") as HTMLElement;
      if (el) {
        // Find distance from mouse to card center
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2));
        if (dist < 500) {
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName("card");
    for (const card of Array.from(cards)) {
      const el = card.querySelector(".border-spotlight") as HTMLElement;
      if (el) el.style.opacity = "0";
    }
  };

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

      <motion.div 
        className="card-grid group" 
        variants={fadeUp}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <SpotlightCard key={feature.num}>
              <span className="mono-label">{feature.num}</span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <Icon className="icon mt-auto" size={24} />
            </SpotlightCard>
          );
        })}
      </motion.div>

    </motion.section>
  );
}
