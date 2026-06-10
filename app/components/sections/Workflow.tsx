"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { WORKFLOW_STEPS } from "../../data/content";

// --- Dynamic Mockup Previews ---

const FileTreePreview = () => {
  return (
    <div className="file-tree" style={{ padding: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", color: "var(--text-subtle)", fontSize: "13px" }}>
        <span>📂</span> <span>node_modules</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", color: "var(--fg)", fontSize: "13px" }}>
        <span>📂</span> <span>app</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px 6px 24px", borderRadius: "6px", color: "var(--text-subtle)", fontSize: "13px" }}>
        <span>📂</span> <span>components</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px 6px 36px", borderRadius: "6px", color: "var(--text-subtle)", fontSize: "13px" }}>
        <span>📂</span> <span>sections</span>
      </div>
      <div className="file-item selected" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px 6px 48px", borderRadius: "8px", color: "var(--accent)", fontSize: "13px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", margin: "2px 0" }}>
        <span>📄</span> <span style={{ fontWeight: 600 }}>Workflow.tsx</span>
        <span style={{ marginLeft: "auto", fontSize: "10px", background: "var(--accent)", color: "#fff", padding: "1px 5px", borderRadius: "4px" }}>M</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px 6px 36px", borderRadius: "6px", color: "var(--text-subtle)", fontSize: "13px" }}>
        <span>📄</span> <span>page.tsx</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", color: "var(--fg)", fontSize: "13px" }}>
        <span>📂</span> <span>src</span>
      </div>
      <div className="file-item selected" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px 6px 24px", borderRadius: "8px", color: "var(--accent)", fontSize: "13px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", margin: "2px 0" }}>
        <span>📄</span> <span style={{ fontWeight: 600 }}>parser.rs</span>
        <span style={{ marginLeft: "auto", fontSize: "10px", background: "#38bdf8", color: "#0a0908", padding: "1px 5px", borderRadius: "4px", fontWeight: "bold" }}>A</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", borderRadius: "6px", color: "var(--text-subtle)", fontSize: "13px" }}>
        <span>📄</span> <span>Cargo.toml</span>
      </div>
    </div>
  );
};

const TerminalPreview = () => {
  return (
    <div className="terminal-view" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6", color: "var(--text-subtle)" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
        <span style={{ color: "#d97757", fontWeight: "bold" }}>$</span>
        <span style={{ color: "var(--fg)" }}>cargo run --bin indexer -- --watch</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span className="terminal-success" style={{ color: "#00ff80" }}>✔</span>
        <span>Found <span style={{ color: "var(--fg)", fontWeight: 600 }}>1,842</span> files in workspace</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "#38bdf8" }}>⏳</span>
        <span>Indexing AST dependencies...</span>
      </div>
      <div style={{ paddingLeft: "16px", borderLeft: "2px solid rgba(255, 255, 255, 0.06)", margin: "6px 0", display: "flex", flexDirection: "column", gap: "2px" }}>
        <div>[1/12] parsing <span style={{ color: "var(--accent)" }}>src/main.rs</span>...</div>
        <div>[2/12] parsing <span style={{ color: "var(--accent)" }}>src/parser.rs</span> <span style={{ color: "var(--text-faint)" }}>(942 lines)</span></div>
        <div>[6/12] parsing <span style={{ color: "var(--accent)" }}>app/components/sections/Workflow.tsx</span> <span style={{ color: "var(--text-faint)" }}>(112 lines)</span></div>
        <div>[12/12] parsing <span style={{ color: "var(--text-subtle)" }}>Cargo.toml</span></div>
      </div>
      <div className="terminal-success" style={{ marginTop: "12px", fontWeight: "bold", background: "rgba(0, 255, 128, 0.06)", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(0, 255, 128, 0.15)", display: "inline-flex", alignItems: "center", gap: "8px", color: "#00ff80" }}>
        <span>✔</span> Build completed in 1.72s (142,500 lines/sec)
      </div>
      <div style={{ marginTop: "8px", color: "var(--text-faint)", fontSize: "11px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", animation: "pulse-d 2s infinite" }}></span>
        Watching filesystem for changes...
      </div>
    </div>
  );
};

const GraphPreview = () => {
  return (
    <div className="mini-graph-view">
      <svg width="100%" height="280px" viewBox="0 0 300 220" style={{ display: "block" }}>
        {/* Connection paths */}
        <motion.path 
          d="M 60 110 L 150 60" 
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="2" 
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "4, 4" }}
        />
        <motion.path 
          d="M 60 110 L 150 160" 
          fill="none" 
          stroke="#ff5f56" 
          strokeWidth="2"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "4, 4" }}
        />
        <motion.path 
          d="M 150 60 L 240 110" 
          fill="none" 
          stroke="var(--accent)" 
          strokeWidth="1.5" 
        />
        <motion.path 
          d="M 150 160 L 240 110" 
          fill="none" 
          stroke="#ff5f56" 
          strokeWidth="2"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "4, 4" }}
        />

        {/* Nodes */}
        <g>
          <circle cx="60" cy="110" r="12" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="60" cy="110" r="20" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
          <text x="60" y="85" textAnchor="middle" fill="var(--fg)" fontSize="9" fontFamily="var(--font-mono)">main.rs</text>
        </g>
        
        <g>
          <circle cx="150" cy="60" r="10" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="150" y="40" textAnchor="middle" fill="var(--fg)" fontSize="9" fontFamily="var(--font-mono)">parser.rs</text>
        </g>
        
        <g>
          <circle cx="150" cy="160" r="12" fill="var(--bg)" stroke="#ff5f56" strokeWidth="2.5" />
          <motion.circle 
            cx="150" cy="160" r="12" 
            fill="none" 
            stroke="#ff5f56" 
            strokeWidth="1"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <text x="150" y="185" textAnchor="middle" fill="#ff5f56" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">auth.ts ⚠️</text>
        </g>
        
        <g>
          <circle cx="240" cy="110" r="10" fill="var(--bg)" stroke="#ff5f56" strokeWidth="2" />
          <text x="240" y="90" textAnchor="middle" fill="var(--fg)" fontSize="9" fontFamily="var(--font-mono)">router.ts</text>
        </g>
      </svg>
    </div>
  );
};

const AIPreview = () => {
  return (
    <div className="ai-view" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="ai-code-wrapper" style={{ background: "rgba(0, 0, 0, 0.25)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", fontSize: "12px", lineHeight: "1.6", fontFamily: "var(--font-mono)" }}>
        <div style={{ color: "var(--text-faint)", fontSize: "10px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "4px" }}>Active Buffer: session.rs</div>
        <span style={{ color: "#ff7b72" }}>impl</span> <span style={{ color: "#79c0ff" }}>SessionManager</span> {"{"}
        <br />
        &nbsp;&nbsp;<span style={{ color: "#ff7b72" }}>pub fn</span> <span style={{ color: "#d2a8ff" }}>validate</span>(&self) -&gt; <span style={{ color: "#79c0ff" }}>bool</span> {"{"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;self.token.is_valid()
        <br />
        &nbsp;&nbsp;{"}"}
        <br />
        {"}"}
      </div>
      <div className="ai-chat-bubble" style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", borderRadius: "12px", padding: "14px 18px", fontSize: "13px", color: "var(--fg)", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", marginBottom: "6px", color: "var(--accent)" }}>
          <span>✨</span>
          <span>Dataflow AI Assistant</span>
        </div>
        <span style={{ color: "var(--text-subtle)", display: "block" }}>
          This function checks token validation in the <code style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "rgba(255,255,255,0.04)", padding: "2px 6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.06)" }}>SessionManager</code> struct. Changing its signature impacts <span style={{ color: "var(--fg)", fontWeight: 600 }}>24 downstream routing modules</span>, including <code style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>router.ts</code> and <code style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>auth.ts</code>.
        </span>
      </div>
    </div>
  );
};

const RefactorPreview = () => {
  return (
    <div className="diff-view" style={{ position: "relative", height: "100%", fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6" }}>
      <div style={{ color: "var(--text-faint)", fontSize: "10px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "4px" }}>Diff View: session.rs</div>
      <div className="diff-line del" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255, 95, 87, 0.08)", color: "#ff6b6b", marginBottom: "2px" }}>- pub fn validate(&self) -&gt; bool {"{"}</div>
      <div className="diff-line del" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255, 95, 87, 0.08)", color: "#ff6b6b", marginBottom: "6px" }}>-   self.token.is_valid()</div>
      <div className="diff-line del" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255, 95, 87, 0.08)", color: "#ff6b6b", marginBottom: "6px" }}>- {"}"}</div>
      
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "2px" }}>+ pub fn validate_secure(&self) -&gt; Result&lt;Session, AuthError&gt; {"{"}</div>
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "2px" }}>+   if self.token.is_expired() {"{"}</div>
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "2px" }}>+     return Err(AuthError::Expired);</div>
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "2px" }}>+   {"}"}</div>
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "2px" }}>+   Ok(Session::new(self.token.decrypt()?))</div>
      <div className="diff-line add" style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(0, 255, 128, 0.08)", color: "#00ff80", marginBottom: "6px" }}>+ {"}"}</div>
      
      <div className="diff-line normal" style={{ padding: "4px 12px", color: "var(--text-faint)" }}>&nbsp;&nbsp;pub fn renew(&mut self) {"{"} ... {"}"}</div>
      
      <motion.div 
        className="diff-stamp"
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ type: "spring", damping: 12, stiffness: 120, delay: 0.2 }}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          border: "2px solid #00ff80",
          color: "#00ff80",
          fontFamily: "var(--font-display)",
          fontSize: "14px",
          fontWeight: 800,
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: "8px",
          transform: "rotate(-10deg)",
          boxShadow: "0 8px 24px rgba(0, 255, 128, 0.15)",
          background: "rgba(10, 9, 8, 0.8)",
          backdropFilter: "blur(4px)",
          zIndex: 10
        }}
      >
        Refactored
      </motion.div>
    </div>
  );
};

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto transition steps every 4 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const previewComponents = [
    <FileTreePreview key="0" />,
    <TerminalPreview key="1" />,
    <GraphPreview key="2" />,
    <AIPreview key="3" />,
    <RefactorPreview key="4" />
  ];

  const previewTitles = [
    "workspace/src/select",
    "workspace/src/index",
    "workspace/src/simulate",
    "workspace/src/enrich",
    "workspace/src/refactor"
  ];

  return (
    <motion.section
      id="workflow"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
      style={{ position: "relative", width: "100%", padding: "100px 0" }}
    >
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <motion.span className="mono-label text-accent font-mono" variants={fadeUp} style={{ marginBottom: "16px", display: "block" }}>
          // DEV WORKFLOW
        </motion.span>
        <motion.h2
          variants={fadeUp}
          style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px", fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          Plan, check, then ship.
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted tagline"
          style={{ fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}
        >
          Dataflow integrates with your filesystem to build visual graphs and analyze edits in real-time.
        </motion.p>
      </div>

      <div className="workbench-grid">
        {/* Left Column - Steps */}
        <div className="workbench-steps" style={{ position: "relative" }}>
          {/* Vertical connection line */}
          <div 
            className="workbench-timeline-line"
            style={{
              position: "absolute",
              left: "42px",
              top: "40px",
              bottom: "40px",
              width: "2px",
              background: "linear-gradient(to bottom, var(--border), var(--accent) 20%, var(--accent) 80%, var(--border))",
              opacity: 0.15,
              pointerEvents: "none",
              zIndex: 0
            }}
          />
          {WORKFLOW_STEPS.map((step, index) => (
            <div
              key={step.num}
              className={`workbench-step-card ${activeStep === index ? "active" : ""}`}
              onMouseEnter={() => {
                setIsHovered(true);
                setActiveStep(index);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="step-num-badge" style={{ position: "relative", zIndex: 2 }}>
                0{step.num}
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                  {step.title}
                </h3>
                <p className="text-muted" style={{ fontSize: "13px", lineHeight: 1.55, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Developer Client Mockup */}
        <div className="workbench-preview-panel">
          <div className="workbench-preview-header">
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            <span className="workbench-preview-title">
              {previewTitles[activeStep]}
            </span>
          </div>
          <div className="workbench-preview-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ height: "100%" }}
              >
                {previewComponents[activeStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
