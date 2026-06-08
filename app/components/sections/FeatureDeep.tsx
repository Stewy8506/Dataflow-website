"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURE_GROUPS } from "../../data/content";
import { SpotlightCard } from "../ui/SpotlightCard";
import { ChevronDown, AlertTriangle, ArrowRight, Play, Check } from "lucide-react";

export function FeatureDeep() {
  const [showAll, setShowAll] = useState(false);
  const [blastLevel, setBlastLevel] = useState(2);
  const [aiStage, setAiStage] = useState(0); // 0: initial, 1: refactoring, 2: completed

  // Extract all features
  const allFeatures = FEATURE_GROUPS.flatMap(group => group.features);

  // Top showcased features for Bento
  const bentoIds = [
    "Blast-Radius Simulation",
    "2D + 3D Canvas",
    "Executable Refactoring",
    "Git Churn Heatmap",
    "Complexity Heatmap",
    "Circular Dependency Detection"
  ];

  const topFeatures = bentoIds.map(title => allFeatures.find(f => f.title === title)!).filter(Boolean);
  const remainingFeatures = allFeatures.filter(f => !bentoIds.includes(f.title));

  // Capitalized icon components for JSX parsing
  const Icon0 = topFeatures[0]?.icon;
  const Icon1 = topFeatures[1]?.icon;
  const Icon2 = topFeatures[2]?.icon;
  const Icon3 = topFeatures[3]?.icon;
  const Icon4 = topFeatures[4]?.icon;
  const Icon5 = topFeatures[5]?.icon;

  // Blast radius mock database
  const blastNodes = [
    { id: "main.rs", risk: 0 },
    { id: "router.rs", risk: 1 },
    { id: "auth.rs", risk: 2 },
    { id: "db.rs", risk: 3 },
    { id: "config.rs", risk: 4 }
  ];

  // Git churn mockup grid
  const churnCells = Array.from({ length: 24 }, (_, i) => ({
    val: Math.sin(i * 0.4) * 5 + Math.cos(i * 0.7) * 5 + 4,
  }));

  // Code Diff mock for AI Refactor
  const aiCodeBefore = `fn process_user(id: u64) {
  let user = get_user(id);
  // Synchronous database write
  save_session(user);
}`;
  const aiCodeAfter = `async fn process_user(id: u64) {
  let user = get_user(id).await?;
  // Non-blocking async write
  save_session(user).await?;
}`;

  return (
    <motion.section
      id="features"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={stagger()}
      style={{ position: "relative" }}
    >
      <motion.span className="mono-label text-accent font-mono" variants={fadeUp} style={{ marginBottom: "16px", display: "block" }}>
        // DEEP CAPABILITIES
      </motion.span>
      <motion.h2
        variants={fadeUp}
        style={{ fontSize: "clamp(32px, 5vw, 64px)", marginBottom: "16px", fontFamily: "var(--font-display)", fontWeight: 800 }}
      >
        Deep capabilities.
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="text-muted"
        style={{ fontSize: "17px", maxWidth: "560px", marginBottom: "56px", lineHeight: 1.6 }}
      >
        Built for developers who need to index complex systems, simulate structural change risk, and refactor with confidence.
      </motion.p>

      {/* Bento Layout Grid */}
      <motion.div variants={fadeUp} className="bento-grid">
        
        {/* Card 1: Blast Radius (7 Columns) */}
        <div className="bento-card span-7 flex flex-col justify-between" style={{ minHeight: "360px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                {Icon0 && <Icon0 size={16} />}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Blast-Radius Simulation</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0, maxWidth: "450px" }}>
              Drag the slider to select a file node. Watch breaking risk and structural dependency updates fan out downstream.
            </p>
          </div>

          {/* Interactive Widget */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px", marginTop: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span className="font-mono text-muted" style={{ fontSize: "10px" }}>simulating: router.rs</span>
              <span className="font-mono" style={{ fontSize: "10px", color: blastLevel > 2 ? "var(--accent)" : "#00ff80" }}>
                {blastLevel > 2 ? "CRITICAL RISK" : "STABLE FLOW"}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px" }}>
              {blastNodes.map(node => {
                const isActive = node.risk <= blastLevel;
                return (
                  <div key={node.id} style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: isActive ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                    background: isActive ? "rgba(255, 107, 0, 0.08)" : "transparent",
                    color: isActive ? "var(--accent)" : "var(--text-subtle)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />}
                    {node.id}
                  </div>
                );
              })}
            </div>
            {/* Slider control */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
              <input 
                type="range" 
                min="0" 
                max="4" 
                value={blastLevel}
                onChange={(e) => setBlastLevel(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: "var(--accent)", cursor: "pointer" }} 
              />
              <span className="font-mono" style={{ fontSize: "12px", width: "16px" }}>{blastLevel}</span>
            </div>
          </div>
        </div>

        {/* Card 2: 2D & 3D Canvas (5 Columns) */}
        <div className="bento-card span-5 flex flex-col justify-between" style={{ minHeight: "360px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                {Icon1 && <Icon1 size={16} />}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>2D + 3D Canvas</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
              Seamlessly swap from structured block layouts to a fully orbiting 3D force-directed node web.
            </p>
          </div>

          {/* Interactive Widget */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.01)", border: "1px dashed var(--border)", borderRadius: "16px", height: "160px", marginTop: "20px", overflow: "hidden", position: "relative" }}>
            {/* Tiny Canvas particles floating */}
            <div style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.2, background: "radial-gradient(circle at center, var(--accent) 0%, transparent 60%)" }} />
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ zIndex: 1, filter: "drop-shadow(0 0 8px rgba(255,107,0,0.2))" }}>
              <circle cx="50" cy="50" r="4" fill="var(--fg)" />
              <line x1="50" y1="50" x2="25" y2="25" stroke="var(--accent)" strokeWidth="1" />
              <line x1="50" y1="50" x2="75" y2="30" stroke="var(--accent)" strokeWidth="1" />
              <line x1="50" y1="50" x2="30" y2="70" stroke="var(--accent)" strokeWidth="1" />
              <line x1="50" y1="50" x2="70" y2="75" stroke="var(--accent)" strokeWidth="1" />
              <circle cx="25" cy="25" r="3" fill="var(--accent)" />
              <circle cx="75" cy="30" r="3" fill="var(--accent)" />
              <circle cx="30" cy="70" r="3" fill="var(--accent)" />
              <circle cx="70" cy="75" r="3" fill="var(--accent)" />
            </svg>
            <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "6px" }}>
              <span style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "99px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}>2D Flow</span>
              <span style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "99px", background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}>3D WebGL</span>
            </div>
          </div>
        </div>

        {/* Card 3: AI Refactor (4 Columns) */}
        <div className="bento-card span-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                {Icon2 && <Icon2 size={16} />}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Executable Refactoring</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "13.5px", lineHeight: 1.5, margin: 0 }}>
              AI directly rewrites affected files and outputs code changes to disk safely.
            </p>
          </div>

          {/* Interactive Widget */}
          <div style={{ background: "rgba(10,9,8,0.7)", border: "1px solid var(--border)", borderRadius: "12px", padding: "12px", marginTop: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px", marginBottom: "6px" }}>
              <span className="font-mono text-muted" style={{ fontSize: "9px" }}>refactor: process.rs</span>
              <button 
                onClick={() => setAiStage((prev) => (prev + 1) % 3)}
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", background: "var(--accent)", color: "#fff", border: "none", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}
              >
                {aiStage === 0 ? <><Play size={8} /> Run</> : aiStage === 1 ? "Applying..." : <><Check size={8} /> Done</>}
              </button>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", overflow: "hidden", whiteSpace: "pre", flex: 1, padding: "4px 0", color: aiStage === 0 ? "var(--text-subtle)" : aiStage === 1 ? "var(--accent)" : "#00ff80", transition: "color 0.3s ease" }}>
              {aiStage === 0 ? aiCodeBefore : aiCodeAfter}
            </div>
          </div>
        </div>

        {/* Card 4: Churn Heatmap (4 Columns) */}
        <div className="bento-card span-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                {Icon3 && <Icon3 size={16} />}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Git Churn Heatmap</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "13.5px", lineHeight: 1.5, margin: 0 }}>
              Plots file update frequency over last 100 commits to paint a codebase stability volatility map.
            </p>
          </div>

          {/* Interactive Churn Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "6px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px", marginTop: "16px" }}>
            {churnCells.map((cell, idx) => {
              const bg = cell.val > 6 
                ? "rgba(255, 107, 0, 0.9)" 
                : cell.val > 4 
                ? "rgba(255, 107, 0, 0.5)" 
                : cell.val > 2 
                ? "rgba(255, 107, 0, 0.2)" 
                : "rgba(255, 255, 255, 0.05)";
              return (
                <div 
                  key={idx} 
                  style={{ 
                    aspectRatio: "1", 
                    borderRadius: "4px", 
                    background: bg,
                    transition: "all 0.3s ease",
                    border: cell.val > 6 ? "1px solid rgba(255,107,0,0.8)" : "none"
                  }} 
                />
              );
            })}
          </div>
        </div>

        {/* Card 5: Complexity Heatmap (4 Columns) */}
        <div className="bento-card span-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                {Icon4 && <Icon4 size={16} />}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Complexity Heatmap</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "13.5px", lineHeight: 1.5, margin: 0 }}>
              Visually highlights hotspots using file size, coupling metrics, and syntax tokens.
            </p>
          </div>

          {/* Graphical Mock */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", marginTop: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
                <span>compiler.rs</span>
                <span>92% complexity</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "92%", height: "100%", background: "linear-gradient(to right, var(--accent), #ff3c00)", borderRadius: "4px" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}>
                <span>ast.rs</span>
                <span>45% complexity</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "45%", height: "100%", background: "var(--accent)", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Circular Dependency loops (12 Columns) */}
        <div className="bento-card span-12" style={{ minHeight: "260px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="md:grid-cols-2">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                  {Icon5 && <Icon5 size={16} />}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Circular Dependency Detection</h3>
              </div>
              <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Detects import loops across folders, mapping files in bright crimson line loops so you can structure codebase imports correctly.
              </p>
            </div>

            {/* Interactive Loop Visual */}
            <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", background: "rgba(255,107,0,0.03)", border: "1px solid var(--accent-border)", borderRadius: "16px", padding: "16px", position: "relative", minHeight: "130px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", zIndex: 2 }}>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--accent-border)", background: "rgba(25, 24, 22, 0.7)", color: "var(--accent)" }}>auth.ts</span>
                <ArrowRight size={12} color="var(--accent)" />
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--accent-border)", background: "rgba(25, 24, 22, 0.7)", color: "var(--accent)" }}>db.ts</span>
                <ArrowRight size={12} color="var(--accent)" />
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--accent-border)", background: "rgba(25, 24, 22, 0.7)", color: "var(--accent)" }}>auth.ts</span>
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: "6px", color: "var(--accent)" }}>
                <AlertTriangle size={12} />
                <span className="font-mono" style={{ fontSize: "9px", fontWeight: "bold" }}>IMPORT LOOP DETECTED</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Expandable Section */}
      <div style={{ textAlign: "center", marginTop: "40px", position: "relative", zIndex: 10 }}>
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--fg)",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent-border)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          {showAll ? "View Less Features" : "View All Capabilities"}
          <motion.div
            animate={{ rotate: showAll ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden", marginTop: "32px", textAlign: "left" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ padding: "8px 0" }}>
                {remainingFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <SpotlightCard key={feat.title}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "var(--accent-subtle)",
                          border: "1px solid var(--accent-border)",
                          color: "var(--accent)",
                          flexShrink: 0
                        }}>
                          <Icon size={14} />
                        </div>
                        <h4 style={{ fontSize: "15px", fontWeight: "bold", margin: 0, color: "var(--fg)" }}>
                          {feat.title}
                        </h4>
                      </div>
                      <p style={{ fontSize: "12.5px", color: "var(--text-subtle)", lineHeight: 1.6, margin: 0 }}>
                        {feat.desc}
                      </p>
                    </SpotlightCard>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
