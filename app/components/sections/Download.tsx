"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download as DownloadIcon, Monitor, Apple, Terminal as TerminalIcon } from "lucide-react";
import { fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS, RELEASE_DETAILS, CHANGELOG } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";

const PLATFORMS = [
  { id: "windows", label: "Windows", icon: Monitor },
  { id: "mac", label: "macOS", icon: Apple },
  { id: "linux", label: "Linux", icon: TerminalIcon },
] as const;

type PlatformKey = "windows" | "mac" | "linux";

export function Download() {
  const detectedPlatform = usePlatform();
  const [platform, setPlatform] = useState<PlatformKey>(detectedPlatform);
  const primaryDownload = DOWNLOADS[platform].primary;
  const secondaryDownload = DOWNLOADS[platform].secondary;
  const details = RELEASE_DETAILS[platform];

  return (
    <motion.section
      id="download"
      className="download-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.h2 variants={fadeUp}>
        Download<br /><span className="font-light">the app.</span>
      </motion.h2>

      {/* Platform tabs */}
      <motion.div variants={fadeUp} style={{ display: "flex", gap: "6px", marginBottom: "32px", justifyContent: "center" }}>
        {PLATFORMS.map(p => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: platform === p.id
                  ? "1px solid rgba(255,107,0,0.4)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: platform === p.id
                  ? "rgba(255,107,0,0.1)"
                  : "rgba(255,255,255,0.03)",
                color: platform === p.id
                  ? "var(--accent)"
                  : "rgba(255,255,255,0.5)",
              }}
            >
              <Icon size={14} />
              {p.label}
            </button>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={platform}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="download-meta" style={{ marginBottom: "32px" }}>
            {details.map((item, i) => (
              <div key={i} className="meta-item">
                <span className="mono-label text-muted">{item.label}</span>
                <span className="val">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="actions" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <MagneticButton>
              <a href={primaryDownload.url} className="btn primary">
                <DownloadIcon size={16} /> {primaryDownload.label}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href={secondaryDownload.url} className="btn secondary">
                {secondaryDownload.label}
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div className="changelog-list" variants={fadeUp}>
        <h4>What's in 1.0.0</h4>
        <ul>
          {CHANGELOG.map((item, i) => (
            <li key={i}>
              <span className="text-accent">•</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}
