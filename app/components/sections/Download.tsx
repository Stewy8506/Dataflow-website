"use client";

import { motion } from "framer-motion";
import { Download as DownloadIcon } from "lucide-react";
import { fadeUp, stagger } from "../ui/animations";
import { DOWNLOADS, RELEASE_DETAILS, CHANGELOG } from "../../data/content";
import { MagneticButton } from "../ui/MagneticButton";
import { usePlatform } from "../../hooks/usePlatform";

export function Download() {
  const platform = usePlatform();
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

      <motion.div className="download-meta" variants={fadeUp}>
        {details.map((item, i) => (
          <div key={i} className="meta-item">
            <span className="mono-label text-muted">{item.label}</span>
            <span className="val">{item.value}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="actions" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} variants={fadeUp}>
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
      </motion.div>

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
