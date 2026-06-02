"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Database } from "lucide-react";
import { fadeUp, stagger } from "../ui/animations";

export function Privacy() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
    >
      <motion.div 
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 0.8, ease: "circOut" }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "40px" }}>
          Privacy by default.
        </h2>
      </motion.div>
      <motion.div className="card-grid privacy-grid" style={{ marginTop: 0 }} variants={stagger()}>
        <motion.div className="card privacy" variants={fadeUp}>
          <ShieldCheck className="watermark" />
          <ShieldCheck className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
          <h3>Local Indexing</h3>
          <p>File access starts from the native directory picker and Tauri capability scopes. No code leaves your machine without consent.</p>
        </motion.div>
        <motion.div className="card privacy" variants={fadeUp}>
          <Lock className="watermark" />
          <Lock className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
          <h3>Provider Choice</h3>
          <p>Use Gemini for cloud assistance or Ollama, LM Studio, vLLM, and compatible local APIs to keep all AI requests on-device.</p>
        </motion.div>
        <motion.div className="card privacy" variants={fadeUp}>
          <EyeOff className="watermark" />
          <EyeOff className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
          <h3>Strict Scopes</h3>
          <p>Rust backend operations explicitly enforce the Tauri fs_scope(). The execution sandbox rejects access to any unauthorized files.</p>
        </motion.div>
        <motion.div className="card privacy" variants={fadeUp}>
          <Database className="watermark" />
          <Database className="icon" style={{ marginTop: 0, marginBottom: "24px" }} size={24} />
          <h3>Offline First</h3>
          <p>Dataflow Visualiser is designed to run entirely air-gapped. Your codebase history, snapshots, and graph data are stored in a local SQLite journal.</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
