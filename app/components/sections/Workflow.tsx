"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { WORKFLOW_STEPS } from "../../data/content";

// --- Dynamic Mockup Previews ---

const FileTreePreview = () => {
  return (
    <div className="file-tree">
      <div className="file-item" style={{ paddingLeft: "10px" }}>📁 node_modules</div>
      <div className="file-item" style={{ paddingLeft: "10px" }}>📁 app</div>
      <div className="file-item" style={{ paddingLeft: "25px" }}>📁 components</div>
      <div className="file-item" style={{ paddingLeft: "40px" }}>📁 sections</div>
      <div className="file-item selected" style={{ paddingLeft: "55px" }}>📄 Workflow.tsx</div>
      <div className="file-item" style={{ paddingLeft: "40px" }}>📄 page.tsx</div>
      <div className="file-item" style={{ paddingLeft: "10px" }}>📁 src</div>
      <div className="file-item selected" style={{ paddingLeft: "25px" }}>📄 parser.rs</div>
      <div className="file-item" style={{ paddingLeft: "10px" }}>📄 Cargo.toml</div>
    </div>
  );
};

const TerminalPreview = () => {
  return (
    <div className="terminal-view">
      <div className="terminal-info">$ cargo run --bin indexer -- --watch</div>
      <div><span className="terminal-success">✔</span> Found 1,842 files in workspace</div>
      <div><span className="terminal-info">⏳</span> Indexing AST dependencies...</div>
      <div>[1/12] parsing <span className="terminal-warning">src/main.rs</span>...</div>
      <div>[2/12] parsing <span className="terminal-warning">src/parser.rs</span> (942 lines)</div>
      <div>[6/12] parsing <span className="terminal-warning">app/components/sections/Workflow.tsx</span> (112 lines)</div>
      <div>[12/12] parsing <span className="terminal-warning">Cargo.toml</span></div>
      <div className="terminal-success" style={{ marginTop: "10px", fontWeight: "bold" }}>
        ✔ Build completed in 1.72s (142,500 lines/sec)
      </div>
      <div className="terminal-info" style={{ marginTop: "4px" }}>
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
    <div className="ai-view">
      <div className="ai-code-wrapper">
        <span style={{ color: "#d97757" }}>impl</span> <span style={{ color: "#5c8aa8" }}>SessionManager</span> {"{"}
        <br />
        &nbsp;&nbsp;<span style={{ color: "#d97757" }}>pub fn</span> <span style={{ color: "#c89534" }}>validate</span>(&self) -&gt; <span style={{ color: "#5c8aa8" }}>bool</span> {"{"}
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;self.token.is_valid()
        <br />
        &nbsp;&nbsp;{"}"}
        <br />
        {"}"}
      </div>
      <div className="ai-chat-bubble">
        <strong>✨ Dataflow AI Assistant:</strong>
        <br />
        <span style={{ fontSize: "11px", color: "var(--text-subtle)", display: "block", marginTop: "4px" }}>
          This function checks token validation in the <code>SessionManager</code> struct. Changing its signature impacts 24 downstream routing modules, including <code>router.ts</code> and <code>auth.ts</code>.
        </span>
      </div>
    </div>
  );
};

const RefactorPreview = () => {
  return (
    <div className="diff-view" style={{ position: "relative", height: "100%" }}>
      <div className="diff-line del">- pub fn validate(&self) -&gt; bool {"{"}</div>
      <div className="diff-line del">-   self.token.is_valid()</div>
      <div className="diff-line del">- {"}"}</div>
      <div className="diff-line add">+ pub fn validate_secure(&self) -&gt; Result&lt;Session, AuthError&gt; {"{"}</div>
      <div className="diff-line add">+   if self.token.is_expired() {"{"}</div>
      <div className="diff-line add">+     return Err(AuthError::Expired);</div>
      <div className="diff-line add">+   {"}"}</div>
      <div className="diff-line add">+   Ok(Session::new(self.token.decrypt()?))</div>
      <div className="diff-line add">+ {"}"}</div>
      <div className="diff-line normal">&nbsp;&nbsp;pub fn renew(&mut self) {"{"} ... {"}"}</div>
      
      <motion.div 
        className="diff-stamp"
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
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
        <div className="workbench-steps">
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
              <div className="step-num-badge">
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
