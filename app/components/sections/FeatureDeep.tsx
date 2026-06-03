"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURE_GROUPS } from "../../data/content";
import { SpotlightCard } from "../ui/SpotlightCard";

export function FeatureDeep() {
  const [activeGroup, setActiveGroup] = useState(FEATURE_GROUPS[0].id);
  const group = FEATURE_GROUPS.find(g => g.id === activeGroup)!;
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.h2
        variants={fadeUp}
        style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px" }}
      >
        Deep capabilities.
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

          <div 
            className="card-grid group"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {group.features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <SpotlightCard key={feat.title}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
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
                </SpotlightCard>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
