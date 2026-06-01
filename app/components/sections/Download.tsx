"use client";

import { motion } from "framer-motion";
import { Download as DownloadIcon } from "lucide-react";
import { fadeUp, stagger } from "../ui/animations";
import { PRIMARY_DOWNLOAD, MSI_DOWNLOAD, RELEASE_DETAILS, CHANGELOG } from "../../data/content";

export function Download() {
  return (
    <motion.section
      id="download"
      className="download-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.h2 variants={fadeUp as any}>
        Download<br /><span className="font-light">the app.</span>
      </motion.h2>

      <motion.div className="download-meta" variants={fadeUp as any}>
        {RELEASE_DETAILS.map((detail) => (
          <div key={detail.label} className="meta-item">
            <span className="mono-label text-muted">{detail.label}</span>
            <span className="val">{detail.value}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="actions" style={{ justifyContent: "center" }} variants={fadeUp as any}>
        <a href={PRIMARY_DOWNLOAD} className="btn primary">
          <DownloadIcon size={16} /> Windows Setup
        </a>
        <a href={MSI_DOWNLOAD} className="btn secondary">
          MSI Package
        </a>
      </motion.div>

      <motion.div className="changelog-list" variants={fadeUp as any}>
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
