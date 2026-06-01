"use client";

import { motion } from "framer-motion";
import { Download as DownloadIcon } from "lucide-react";
import { fadeUp, stagger } from "../ui/animations";

const primaryDownload = "/downloads/dataflow-visualiser_1.0.0_x64-setup.exe";
const msiDownload = "/downloads/dataflow-visualiser_1.0.0_x64_en-US.msi";

const releaseDetails = [
  { label: "Version", value: "1.0.0" },
  { label: "Platform", value: "Windows x64" },
  { label: "Setup EXE", value: "3.8 MB" },
  { label: "MSI package", value: "5.2 MB" },
  { label: "Released", value: "May 29, 2026" },
];

const changelog = [
  "Tauri desktop bundles for Windows x64",
  "2D and 3D dependency map workspace",
  "Blast-radius preview and graph snapshot diffing",
  "Gemini and local OpenAI-compatible provider support",
];

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
        {releaseDetails.map((detail) => (
          <div key={detail.label} className="meta-item">
            <span className="mono-label text-muted">{detail.label}</span>
            <span className="val">{detail.value}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className="actions" style={{ justifyContent: "center" }} variants={fadeUp as any}>
        <a href={primaryDownload} className="btn primary">
          <DownloadIcon size={16} /> Windows Setup
        </a>
        <a href={msiDownload} className="btn secondary">
          MSI Package
        </a>
      </motion.div>

      <motion.div className="changelog-list" variants={fadeUp as any}>
        <h4>What's in 1.0.0</h4>
        <ul>
          {changelog.map((item, i) => (
            <li key={i}>
              <span className="text-accent">•</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
}
