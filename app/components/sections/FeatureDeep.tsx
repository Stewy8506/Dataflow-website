"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../ui/animations";
import { FEATURE_GROUPS } from "../../data/content";
import { SpotlightCard } from "../ui/SpotlightCard";
import { 
  ChevronDown, 
  AlertTriangle, 
  ArrowRight, 
  Play, 
  Check, 
  Cpu, 
  FileCode, 
  Layout, 
  Package, 
  Sparkles, 
  RefreshCw, 
  Scissors,
  Layers,
  History
} from "lucide-react";

export function FeatureDeep() {
  const [showAll, setShowAll] = useState(false);

  // Card 1: Blast Radius Simulation state
  const [blastTrigger, setBlastTrigger] = useState<string>("auth");

  // Card 3: AI Refactor state
  const [aiStage, setAiStage] = useState<'idle' | 'planning' | 'coding' | 'reviewing' | 'complete'>('idle');
  const [selectedRefactorFile, setSelectedRefactorFile] = useState<string>("auth.rs");

  // Card 4: Git Churn state
  const [hoveredChurn, setHoveredChurn] = useState<string | null>(null);

  // Card 6: Circular Dependency state
  const [isPruned, setIsPruned] = useState(false);

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

  const IconBlast = topFeatures[0]?.icon || Sparkles;
  const IconCanvas = topFeatures[1]?.icon || Layers;
  const IconRefactor = topFeatures[2]?.icon || Play;
  const IconChurn = topFeatures[3]?.icon || History;
  const IconComplexity = topFeatures[4]?.icon || Cpu;
  const IconCircular = topFeatures[5]?.icon || AlertTriangle;

  // 1. Blast Radius Math & Nodes
  const blastNodes = useMemo(() => {
    const nodes = [
      { id: "auth", label: "auth.rs", type: "RS", x: 60, y: 70 },
      { id: "session", label: "session.ts", type: "TS", x: 190, y: 30 },
      { id: "db", label: "db.rs", type: "RS", x: 190, y: 110 },
      { id: "api", label: "api.ts", type: "TS", x: 320, y: 30 },
      { id: "main", label: "main.rs", type: "RS", x: 450, y: 70 },
    ];

    // Determine warning tiers
    return nodes.map(n => {
      let tier = -1; // Unaffected
      if (blastTrigger === "auth") {
        if (n.id === "auth") tier = 0;
        else if (n.id === "session" || n.id === "db") tier = 1;
        else if (n.id === "api") tier = 2;
        else if (n.id === "main") tier = 3;
      } else if (blastTrigger === "session") {
        if (n.id === "session") tier = 0;
        else if (n.id === "api") tier = 1;
        else if (n.id === "main") tier = 2;
      } else if (blastTrigger === "db") {
        if (n.id === "db") tier = 0;
        else if (n.id === "main") tier = 1;
      } else if (blastTrigger === "api") {
        if (n.id === "api") tier = 0;
        else if (n.id === "main") tier = 1;
      } else if (n.id === blastTrigger) {
        tier = 0;
      }
      return { ...n, tier };
    });
  }, [blastTrigger]);

  const getBlastTierColor = (tier: number) => {
    if (tier === 0) return { border: "#ef4444", text: "#f87171", bg: "rgba(239, 68, 68, 0.12)", label: "Trigger" };
    if (tier === 1) return { border: "#f97316", text: "#fb923c", bg: "rgba(249, 115, 22, 0.08)", label: "Tier 1 (Critical)" };
    if (tier === 2) return { border: "#f59e0b", text: "#fbbf24", bg: "rgba(245, 158, 11, 0.05)", label: "Tier 2 (Indirect)" };
    if (tier === 3) return { border: "#eab308", text: "#fef08a", bg: "rgba(234, 179, 8, 0.03)", label: "Tier 3" };
    return { border: "rgba(255, 255, 255, 0.06)", text: "#807b6e", bg: "transparent", label: "Stable" };
  };

  // 3. AI Refactor Diffs Data
  const refactorFiles = [
    { name: "auth.rs", changes: "+12", desc: "Convert session writes to async tasks" },
    { name: "db.rs", changes: "+8", desc: "Update pool query executors" },
    { name: "routes.ts", changes: "+2", desc: "Update controller route mappings" },
  ];

  const originalCode = {
    "auth.rs": `fn authenticate(user: &str) -> Session {
  let token = generate_token();
  save_session_sync(&token);
  Session::new(token)
}`,
    "db.rs": `fn query_db(q: &str) -> Result {
  let mut conn = get_connection();
  conn.execute(q)
}`,
    "routes.ts": `router.post('/login', (req, res) => {
  const result = auth(req.body);
  res.json(result);
});`
  };

  const modifiedCode = {
    "auth.rs": `async fn authenticate(user: &str) -> Session {
  let token = generate_token();
- save_session_sync(&token);
+ save_session_async(&token).await?;
  Session::new(token)
}`,
    "db.rs": `async fn query_db(q: &str) -> Result {
- let mut conn = get_connection();
+ let mut conn = get_connection_async().await?;
  conn.execute(q).await
}`,
    "routes.ts": `router.post('/login', async (req, res) => {
- const result = auth(req.body);
+ const result = await auth_async(req.body);
  res.json(result);
});`
  };

  const triggerRefactorCycle = () => {
    if (aiStage === 'idle') {
      setAiStage('planning');
      setTimeout(() => {
        setAiStage('coding');
        setTimeout(() => {
          setAiStage('reviewing');
        }, 1200);
      }, 1000);
    } else if (aiStage === 'reviewing') {
      setAiStage('complete');
    } else if (aiStage === 'complete') {
      setAiStage('idle');
    }
  };

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
        <div className="bento-card span-7 flex flex-col justify-between" style={{ minHeight: "390px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                <IconBlast size={16} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Blast-Radius Simulation</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0, maxWidth: "550px" }}>
              Click any file node in the graph below to set it as the modified target. Watch structural dependency warning colors fan out downstream tier-by-tier.
            </p>
          </div>

          {/* Interactive Graph Canvas Widget */}
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px", marginTop: "24px", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span className="font-mono text-muted" style={{ fontSize: "10px" }}>Active Trigger: <span style={{ color: "#fff", fontWeight: "bold" }}>{blastTrigger}.rs</span></span>
              <span className="font-mono" style={{ fontSize: "10px", color: blastTrigger === "auth" ? "#ef4444" : "#f59e0b" }}>
                {blastTrigger === "auth" ? "CRITICAL SYSTEM PROPAGATION" : "PARTIAL IMPACT"}
              </span>
            </div>

            {/* SVG mini interactive node graph layout */}
            <div style={{ width: "100%", height: "150px", position: "relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 520 150" style={{ overflow: "visible" }}>
                <defs>
                  <marker id="blast-arrow-std" markerWidth="6" markerHeight="6" refX="28" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.15)" />
                  </marker>
                  <marker id="blast-arrow-active" markerWidth="6" markerHeight="6" refX="28" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
                  </marker>
                </defs>

                {/* Edges */}
                {[
                  { from: "auth", to: "session" },
                  { from: "auth", to: "db" },
                  { from: "session", to: "api" },
                  { from: "db", to: "main" },
                  { from: "api", to: "main" },
                ].map(edge => {
                  const src = blastNodes.find(n => n.id === edge.from)!;
                  const dst = blastNodes.find(n => n.id === edge.to)!;
                  const isActive = src.tier >= 0 && dst.tier >= 0;
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={src.x} y1={src.y}
                      x2={dst.x} y2={dst.y}
                      stroke={isActive ? "var(--accent)" : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isActive ? 1.5 : 1}
                      markerEnd={isActive ? "url(#blast-arrow-active)" : "url(#blast-arrow-std)"}
                      style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                    />
                  );
                })}

                {/* Nodes */}
                {blastNodes.map(node => {
                  const styleColors = getBlastTierColor(node.tier);
                  const isTrigger = node.tier === 0;
                  return (
                    <g key={node.id} onClick={() => setBlastTrigger(node.id)} style={{ cursor: "pointer" }}>
                      {isTrigger && (
                        <circle
                          cx={node.x} cy={node.y} r="22"
                          fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.4"
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}
                      <rect
                        x={node.x - 30} y={node.y - 14}
                        width="60" height="28" rx="6"
                        fill={styleColors.bg}
                        stroke={styleColors.border}
                        strokeWidth={node.tier >= 0 ? "2px" : "1px"}
                        style={{ background: "#111116", transition: "all 0.3s ease" }}
                      />
                      <text
                        x={node.x} y={node.y + 3}
                        fill={node.tier >= 0 ? styleColors.text : "#807b6e"}
                        fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle"
                        style={{ transition: "fill 0.3s ease" }}
                      >
                        {node.label}
                      </text>
                      {node.tier >= 0 && (
                        <rect
                          x={node.x - 24} y={node.y - 20}
                          width="48" height="8" rx="2"
                          fill="rgba(11, 11, 16, 0.9)"
                          stroke={styleColors.border}
                          strokeWidth="0.5"
                        />
                      )}
                      {node.tier >= 0 && (
                        <text
                          x={node.x} y={node.y - 14}
                          fill={styleColors.text}
                          fontSize="5" fontFamily="var(--font-mono)" fontWeight="black" textAnchor="middle"
                        >
                          {styleColors.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: 2D Canvas & Directory Clustering (5 Columns) */}
        <div className="bento-card span-5 flex flex-col justify-between" style={{ minHeight: "390px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                <IconCanvas size={16} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>2D Interactive Canvas</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
              Groups codebase modules inside directory bounding box clusters. Click and drag the nodes to test the physical force-directed wiring constraints.
            </p>
          </div>

          {/* Interactive Bounding Box Clustering Widget */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px", marginTop: "20px", position: "relative", minHeight: "190px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "10px", right: "12px", display: "flex", gap: "6px", zIndex: 10 }}>
              <span style={{ fontSize: "8px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}>2D Flow</span>
              <span style={{ fontSize: "8px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}>3D Mode (Soon)</span>
            </div>

            <div style={{ display: "flex", gap: "12px", height: "100%", width: "100%", marginTop: "12px" }}>
              {/* Directory Cluster 1 */}
              <div style={{ flex: 1, border: "1px dashed rgba(255, 107, 0, 0.2)", background: "rgba(255,107,0,0.02)", borderRadius: "12px", padding: "10px", display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
                <span style={{ fontSize: "7px", fontFamily: "var(--font-mono)", color: "var(--accent)", textTransform: "uppercase" }}>src/auth/</span>
                
                <motion.div 
                  drag dragMomentum={false} dragConstraints={{ left: -10, right: 30, top: -10, bottom: 40 }}
                  whileDrag={{ scale: 1.05 }}
                  style={{ padding: "6px 8px", background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid #f59e0b", borderRadius: "6px", cursor: "grab", fontSize: "10px", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px", color: "#f5f4f0" }}
                >
                  <FileCode size={10} style={{ color: "#f59e0b" }} /> session.ts
                </motion.div>

                <motion.div 
                  drag dragMomentum={false} dragConstraints={{ left: -10, right: 30, top: -10, bottom: 40 }}
                  whileDrag={{ scale: 1.05 }}
                  style={{ padding: "6px 8px", background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid #10b981", borderRadius: "6px", cursor: "grab", fontSize: "10px", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px", color: "#f5f4f0" }}
                >
                  <Cpu size={10} style={{ color: "#10b981" }} /> auth.rs
                </motion.div>
              </div>

              {/* Directory Cluster 2 */}
              <div style={{ flex: 1, border: "1px dashed rgba(6, 182, 212, 0.2)", background: "rgba(6,182,212,0.02)", borderRadius: "12px", padding: "10px", display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
                <span style={{ fontSize: "7px", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase" }}>src/database/</span>
                
                <motion.div 
                  drag dragMomentum={false} dragConstraints={{ left: -30, right: 10, top: -10, bottom: 40 }}
                  whileDrag={{ scale: 1.05 }}
                  style={{ padding: "6px 8px", background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid #10b981", borderRadius: "6px", cursor: "grab", fontSize: "10px", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px", color: "#f5f4f0" }}
                >
                  <Cpu size={10} style={{ color: "#10b981" }} /> db.rs
                </motion.div>

                <motion.div 
                  drag dragMomentum={false} dragConstraints={{ left: -30, right: 10, top: -10, bottom: 40 }}
                  whileDrag={{ scale: 1.05 }}
                  style={{ padding: "6px 8px", background: "#111116", border: "1px solid rgba(255,255,255,0.08)", borderLeft: "3px solid #d946ef", borderRadius: "6px", cursor: "grab", fontSize: "10px", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px", color: "#f5f4f0" }}
                >
                  <Package size={10} style={{ color: "#d946ef" }} /> sqlx
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: AI Refactor (12 Columns) */}
        <div className="bento-card span-12 flex flex-col justify-between" style={{ minHeight: "390px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                <IconRefactor size={16} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Executable AI Refactoring & Split Diff</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0, maxWidth: "700px" }}>
              Compute refactoring changes. The Gemini-powered AI engine will draft exact file edits, showing them inside a split Monaco Diff Editor layout. Click Run to simulate this native workflow.
            </p>
          </div>

          {/* Interactive Split Diff IDE Widget */}
          <div style={{ display: "flex", flexDirection: "column", height: "260px", background: "rgba(10,9,8,0.7)", border: "1px solid var(--border)", borderRadius: "16px", marginTop: "20px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "8px 16px", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="font-mono text-muted" style={{ fontSize: "9px" }}>refactor: rename_session</span>
                <span style={{ padding: "2px 8px", fontSize: "7px", fontWeight: "bold", background: "rgba(6, 182, 212, 0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)", borderRadius: "4px", textTransform: "uppercase" } as React.CSSProperties}>
                  AI Refactor Preview
                </span>
              </div>
              <button 
                onClick={triggerRefactorCycle}
                style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", background: aiStage === 'complete' ? '#10b981' : 'var(--accent)', color: "#fff", border: "none", padding: "4px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                {aiStage === 'idle' ? <><Play size={10} /> Draft Refactor</> :
                 aiStage === 'planning' ? <><RefreshCw size={10} className="animate-spin" /> Planning...</> :
                 aiStage === 'coding' ? <><RefreshCw size={10} className="animate-spin" /> Generating Code...</> :
                 aiStage === 'reviewing' ? <><Check size={10} /> Approve & Apply</> :
                 <><Check size={10} /> Reset Demo</>}
              </button>
            </div>

            {/* Split Panel */}
            <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
              {/* Sidebar: Affected Files List */}
              <div style={{ width: "160px", borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "7px", fontWeight: "bold", color: "#807b6e", textTransform: "uppercase", paddingLeft: "4px", marginBottom: "4px" }}>Affected Files</span>
                {refactorFiles.map(file => (
                  <button
                    key={file.name}
                    onClick={() => setSelectedRefactorFile(file.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "6px",
                      borderRadius: "6px",
                      background: selectedRefactorFile === file.name ? "rgba(255,107,0,0.08)" : "transparent",
                      border: selectedRefactorFile === file.name ? "1px solid var(--accent-border)" : "1px solid transparent",
                      color: selectedRefactorFile === file.name ? "var(--accent)" : "#a39e93",
                      fontSize: "10px",
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span>{file.name}</span>
                    <span style={{ fontSize: "8px", background: "rgba(255,255,255,0.05)", padding: "1px 4px", borderRadius: "3px" }}>{file.changes}</span>
                  </button>
                ))}
              </div>

              {/* Code Editor Container */}
              <div style={{ flex: 1, display: "flex", minHeight: 0, position: "relative" }}>
                {/* Loader states */}
                <AnimatePresence>
                  {(aiStage === 'planning' || aiStage === 'coding') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ position: "absolute", inset: 0, background: "rgba(10,9,8,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 10 }}
                    >
                      <RefreshCw size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
                      <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                        {aiStage === 'planning' ? "Mapping references & calculating impact..." : "Gemini is rewriting code streams..."}
                      </span>
                    </motion.div>
                  )}
                  {aiStage === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ position: "absolute", inset: 0, background: "rgba(10,9,8,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 10 }}
                    >
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981" }}>
                        <Check size={20} />
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: "bold", color: "#f5f4f0" }}>Refactoring Applied!</span>
                      <span style={{ fontSize: "10px", color: "var(--muted)" }}>Changes saved to local codebase index.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Diff Viewer representation */}
                <div style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}>
                  {/* Left Pane: Original */}
                  <div style={{ flex: 1, borderRight: "1px solid rgba(255,255,255,0.04)", padding: "10px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "8px", fontFamily: "var(--font-mono)", color: "#807b6e", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "4px", marginBottom: "4px" }}>ORIGINAL CODE</div>
                    <pre style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "#a39e93", lineHeight: "1.45", margin: 0, whiteSpace: "pre-wrap" }}>
                      {originalCode[selectedRefactorFile as keyof typeof originalCode]}
                    </pre>
                  </div>

                  {/* Right Pane: Modified */}
                  <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.005)" }}>
                    <div style={{ fontSize: "8px", fontFamily: "var(--font-mono)", color: aiStage === 'reviewing' ? "#10b981" : "#807b6e", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "4px", marginBottom: "4px" }}>
                      {aiStage === 'reviewing' ? "AI GENERATED DRAFT" : "MODIFIED CODE"}
                    </div>
                    <pre style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: aiStage === 'reviewing' ? "#f5f4f0" : "#807b6e", lineHeight: "1.45", margin: 0, whiteSpace: "pre-wrap" }}>
                      {aiStage === 'reviewing' 
                        ? modifiedCode[selectedRefactorFile as keyof typeof modifiedCode] 
                        : "Click 'Draft Refactor' above to generate."}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Churn Heatmap (4 Columns) */}
        <div className="bento-card span-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                <IconChurn size={16} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Git Churn Heatmap</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "13.5px", lineHeight: 1.5, margin: 0 }}>
              Overlays commit modifications on nodes to trace highly volatile, bug-prone files.
            </p>
          </div>

          {/* Interactive Churn Nodes Layout */}
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", padding: "12px", marginTop: "16px", minHeight: "150px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px", position: "relative" }}>
            {[
              { file: "auth.rs", commits: 32, glow: "#ef4444", status: "Critical Churn" },
              { file: "db.rs", commits: 15, glow: "#f97316", status: "High Churn" },
              { file: "session.ts", commits: 6, glow: "#eab308", status: "Medium Churn" },
              { file: "main.rs", commits: 1, glow: "#fcd34d", status: "Low Churn" },
            ].map(item => (
              <div
                key={item.file}
                onMouseEnter={() => setHoveredChurn(item.file)}
                onMouseLeave={() => setHoveredChurn(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "#111116",
                  border: `1px solid ${item.glow}`,
                  boxShadow: `0 0 10px ${item.glow}15`,
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  cursor: "help",
                  transition: "all 0.2s ease"
                }}
              >
                <span style={{ color: "#f5f4f0", fontWeight: "bold" }}>{item.file}</span>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "9px", color: item.glow }}>{item.status}</span>
                  <span style={{ fontSize: "8px", background: "rgba(255,255,255,0.05)", padding: "1px 5px", borderRadius: "4px", color: "#a39e93" }}>
                    {item.commits} commits
                  </span>
                </div>
              </div>
            ))}

            {/* Hover Tooltip display */}
            <AnimatePresence>
              {hoveredChurn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(10,9,8,0.98)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "9px",
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                    zIndex: 10,
                    textAlign: "center",
                    pointerEvents: "none"
                  }}
                >
                  Node git history: {hoveredChurn} modified in {hoveredChurn === "auth.rs" ? "32" : hoveredChurn === "db.rs" ? "15" : hoveredChurn === "session.ts" ? "6" : "1"} commits
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Card 5: Complexity Heatmap (4 Columns) */}
        <div className="bento-card span-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                <IconComplexity size={16} />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Complexity Heatmap</h3>
            </div>
            <p className="text-muted" style={{ fontSize: "13.5px", lineHeight: 1.5, margin: 0 }}>
              Visualizes codebase syntax token densities using color-coded complexity grades.
            </p>
          </div>

          {/* Interactive Complexity Cards Layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "12px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border)", borderRadius: "16px", marginTop: "16px", minHeight: "150px", justifyContent: "center" }}>
            {[
              { file: "compiler.rs", badge: "Cx: High", bg: "rgba(239,68,68,0.1)", border: "#ef4444", text: "#f87171" },
              { file: "parser.rs", badge: "Cx: Medium", bg: "rgba(245,158,11,0.1)", border: "#f59e0b", text: "#fbbf24" },
              { file: "ast.rs", badge: "Cx: Low", bg: "rgba(16,185,129,0.1)", border: "#10b981", text: "#a7f3d0" },
            ].map(item => (
              <div
                key={item.file}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "#111116",
                  border: `1px solid ${item.border}`,
                  boxShadow: `0 0 10px ${item.border}10`
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.border }} />
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#f5f4f0", fontWeight: "bold" }}>{item.file}</span>
                </div>
                <span style={{
                  padding: "2px 6px",
                  background: item.bg,
                  border: `1px solid ${item.border}30`,
                  color: item.text,
                  fontSize: "8px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "bold",
                  borderRadius: "4px"
                }}>
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 6: Circular Dependency loops (12 Columns) */}
        <div className="bento-card span-12" style={{ minHeight: "260px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="md:grid-cols-2">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid var(--accent-border)", padding: "8px", borderRadius: "10px", color: "var(--accent)" }}>
                  <IconCircular size={16} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>Circular Dependency Detection</h3>
              </div>
              <p className="text-muted" style={{ fontSize: "14px", lineHeight: 1.5, margin: 0 }}>
                Detects import loops and cycles. Highlights cyclic dependencies in bright rose/crimson trails. Click the button to prune the cycle and restore linear dependency structure.
              </p>
            </div>

            {/* Interactive Loop Visual */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", justifyContent: "center", background: isPruned ? "rgba(16,185,129,0.02)" : "rgba(244,63,94,0.02)", border: isPruned ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(244,63,94,0.2)", borderRadius: "16px", padding: "20px", position: "relative", minHeight: "150px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", zIndex: 2 }}>
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "#111116", color: isPruned ? "#10b981" : "#f43f5e" }}>auth.ts</span>
                <ArrowRight size={12} color={isPruned ? "#10b981" : "#f43f5e"} style={{ transition: "color 0.3s ease" }} />
                <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "#111116", color: isPruned ? "#10b981" : "#f43f5e" }}>db.ts</span>
                <ArrowRight size={12} color={isPruned ? "#10b981" : "#f43f5e"} style={{ transition: "color 0.3s ease" }} />
                
                {isPruned ? (
                  <>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.1)", color: "#10b981" }}>types.d.ts</span>
                    <ArrowRight size={12} color="#10b981" />
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "#111116", color: "#10b981" }}>auth.ts</span>
                  </>
                ) : (
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", background: "#111116", color: "#f43f5e" }}>auth.ts</span>
                )}
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setIsPruned(!isPruned)}
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  background: isPruned ? "rgba(255,255,255,0.04)" : "rgba(244,63,94,0.12)",
                  color: isPruned ? "#a39e93" : "#f43f5e",
                  border: isPruned ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(244,63,94,0.3)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "all 0.2s"
                }}
              >
                {isPruned ? "Reintroduce Import Loop" : <><Scissors size={10} /> Prune Loop (Acyclic Flow)</>}
              </button>

              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: "6px", color: isPruned ? "#10b981" : "#f43f5e", transition: "color 0.3s ease" }}>
                {isPruned ? <Check size={12} /> : <AlertTriangle size={12} />}
                <span className="font-mono" style={{ fontSize: "9px", fontWeight: "bold" }}>
                  {isPruned ? "DEPENDENCY STRUCTURE CLEAN" : "IMPORT CYCLE DETECTED"}
                </span>
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
