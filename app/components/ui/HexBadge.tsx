"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

export function HexBadge({ eco }: { eco: { name: string; icon: IconType; color: string } }) {
  const Icon = eco.icon;
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div variants={fadeUp} style={{ "--eco-color": eco.color } as React.CSSProperties}>
      <div className="hex-drop-shadow">
        <div className="hex-wrap">
          <div className="hex-content">
            <Icon className="eco-icon" />
            <span style={{ opacity: 1 }}>{eco.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
