"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Terminal } from "lucide-react";

export function TerminalDemo() {
  return (
    <motion.div
      className="terminal-demo card"
      style={{ padding: "16px", fontFamily: "monospace", fontSize: "14px", background: "#050505", border: "1px solid var(--border)", borderRadius: "8px", width: "100%", overflow: "hidden", marginTop: "32px", textAlign: "left" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <div style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", marginLeft: "16px" }}>
          <Terminal size={14} /> Parser Engine PTY
        </div>
      </div>

      <div style={{ color: "var(--fg)", lineHeight: "1.6", whiteSpace: "pre-wrap", overflowX: "auto", minHeight: "96px" }}>
        <span style={{ color: "var(--accent)" }}>~ </span>
        <TypeAnimation
          sequence={[
            'dv scan ./core --blast-radius',
            800,
            'dv scan ./core --blast-radius\n[INFO] Scanning 4,281 files via oxc-parser...\n[OK] AST built in 14ms.\n[WARN] Modifying \'auth.rs\' impacts 12 dependencies.',
            2000,
            'dv ai refactor auth.rs --use-jwt',
            800,
            'dv ai refactor auth.rs --use-jwt\n[AI] Semantic mapping complete. Generating Rust code...\n[OK] Refactored. 3 files updated safely.',
            4000,
            '',
          ]}
          wrapper="span"
          speed={60}
          style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
    </motion.div>
  );
}
