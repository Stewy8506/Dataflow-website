"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import { useState } from "react";



export function HexBadge({ eco }: { eco: { name: string; icon: IconType; color: string; depth?: string } }) {
  const Icon = eco.icon;
  const [hovered, setHovered] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={fadeUp}
      style={{ "--eco-color": eco.color, position: "relative" } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="hex-drop-shadow">
        {/* Pulse ring */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.35, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "4px",
                border: `2px solid ${eco.color}`,
                pointerEvents: "none",
                zIndex: 20,
              }}
            />
          )}
        </AnimatePresence>

        <div className="hex-wrap">
          <div className="hex-content">
            <Icon className="eco-icon" />
            <span style={{ opacity: 1 }}>{eco.name}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${eco.color}40`,
              borderRadius: "8px",
              padding: "8px 12px",
              whiteSpace: "nowrap",
              zIndex: 100,
              fontSize: "11px",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "monospace",
              boxShadow: `0 0 16px ${eco.color}25`,
            }}
          >
            {eco.depth ?? eco.name}
            {/* Arrow */}
            <div style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0, height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `5px solid ${eco.color}40`,
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
