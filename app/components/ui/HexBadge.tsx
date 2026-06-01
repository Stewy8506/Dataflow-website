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
    <motion.div className="hex-drop-shadow" variants={fadeUp} style={{ "--eco-color": eco.color } as React.CSSProperties}>
      <div className="hex-wrap">
        <div className="hex-content">
          <Icon className="eco-icon" />
          <span>{eco.name}</span>
        </div>
      </div>
    </motion.div>
  );
}
