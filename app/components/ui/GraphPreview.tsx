"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, MouseEvent, useMemo } from "react";
import { Cpu, FileCode, Layout, Package, Activity, BarChart3, ChevronLeft } from "lucide-react";

interface NodeData {
  id: string;
  x: number;
  y: number;
  label: string;
  dir: string;
  type: "RS" | "TS" | "TSX" | "EXT";
  isBackend?: boolean;
  isExternal?: boolean;
  gitStatus?: "Modified" | "Added" | "Untracked";
  coverage?: number;
  deadCode?: boolean;
  vulnerabilities?: number;
}

const NODES: NodeData[] = [
  { id: "auth",    x: 80,  y: 120, label: "auth.rs",      dir: "src/auth/",       type: "RS",  isBackend: true, gitStatus: "Modified", coverage: 88 },
  { id: "session", x: 240, y: 50,  label: "session.ts",   dir: "src/auth/",       type: "TS",  coverage: 72 },
  { id: "user",    x: 240, y: 190, label: "user.tsx",     dir: "src/components/", type: "TSX", coverage: 94 },
  { id: "db",      x: 400, y: 120, label: "db.rs",        dir: "src/database/",   type: "RS",  isBackend: true, coverage: 45 },
  { id: "api",     x: 400, y: 20,  label: "api.ts",       dir: "src/api/",        type: "TS",  deadCode: true },
  { id: "sqlx",    x: 400, y: 200, label: "sqlx",         dir: "crates/",         type: "EXT", isExternal: true, vulnerabilities: 2 },
  { id: "cache",   x: 560, y: 70,  label: "cache.ts",     dir: "src/utils/",      type: "TS",  coverage: 65 },
  { id: "routes",  x: 560, y: 170, label: "routes.ts",    dir: "src/api/",        type: "TS",  coverage: 80 },
  { id: "main",    x: 670, y: 120, label: "main.rs",      dir: "src/",            type: "RS",  isBackend: true, coverage: 90 },
];

const EDGES = [
  { from: "auth",    to: "session" },
  { from: "auth",    to: "user"    },
  { from: "auth",    to: "db"      },
  { from: "session", to: "api"     },
  { from: "user",    to: "db"      },
  { from: "db",      to: "cache"   },
  { from: "db",      to: "routes"  },
  { from: "api",     to: "main"    },
  { from: "routes",  to: "main"    },
  { from: "db",      to: "sqlx"    },
];

function getLanguageAccent(type: string, isExternal?: boolean) {
  if (isExternal) return { color: '#d946ef', bg: 'rgba(217, 70, 239, 0.15)', name: "External" }; // Fuchsia
  if (type === 'RS') return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', name: "Rust" }; // Green
  if (type === 'TSX') return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', name: "React" }; // Blue
  return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', name: "TypeScript" }; // Amber
}

interface GraphPreviewProps {
  mode?: "graph" | "blast" | "trace";
}

export function GraphPreview({ mode = "graph" }: GraphPreviewProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Blast radius mapping for simulated triggers
  const blastRadius = useMemo(() => {
    if (mode !== "blast") return null;
    return {
      trigger: "auth",
      tiers: {
        "auth": 0,
        "session": 1,
        "user": 1,
        "db": 1,
        "api": 2,
        "sqlx": 2,
        "cache": 2,
        "routes": 2,
        "main": 3,
      } as Record<string, number>
    };
  }, [mode]);

  // Prop trace mapping: Traces property "sessionToken"
  const propTrace = useMemo(() => {
    if (mode !== "trace") return null;
    return {
      propName: "sessionToken",
      involved: ["auth", "session", "user", "db"]
    };
  }, [mode]);

  const edgeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.05, ease: "easeInOut" },
    }),
  };

  return (
    <div 
      style={{ 
        position: "relative",
        width: "100%",
        height: "100%",
        background: "rgba(10, 10, 15, 0.95)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        backdropFilter: "blur(24px)",
        padding: "24px",
        overflow: "hidden",
        boxSizing: "border-box"
      }}
    >
      {/* Glow Effects */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "40%", height: "40%", borderRadius: "50%", background: "rgba(255, 107, 0, 0.03)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40%", height: "40%", borderRadius: "50%", background: "rgba(6, 182, 212, 0.03)", filter: "blur(80px)", pointerEvents: "none" }} />

      {/* Mode Banner Indicator */}
      <div 
        style={{ 
          position: "absolute", 
          top: "16px", 
          left: "16px", 
          zIndex: 20, 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          background: "rgba(16, 16, 24, 0.9)", 
          border: "1px solid rgba(255, 255, 255, 0.05)", 
          borderRadius: "999px", 
          padding: "6px 14px", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
        }}
      >
        <div 
          className={mode === "blast" || mode === "trace" ? "animate-pulse" : ""}
          style={{ 
            width: "8px", 
            height: "8px", 
            borderRadius: "50%", 
            background: mode === "blast" ? "#ef4444" : mode === "trace" ? "#22d3ee" : "#4ade80" 
          }} 
        />
        <span style={{ fontSize: "10px", fontFamily: "var(--font-mono), monospace", textTransform: "none", letterSpacing: "0.08em", color: "var(--muted)" }}>
          {mode === "blast" ? "simulating: auth.rs modified (blast radius)" : mode === "trace" ? "prop trace: sessionToken" : "interactive dependency graph"}
        </span>
      </div>

      {/* Expandable Stats Panel Overlay (Accurate to desktop app) */}
      <div style={{ position: "absolute", left: "16px", bottom: "16px", zIndex: 20 }}>
        {!isStatsExpanded ? (
          <button
            onClick={() => setIsStatsExpanded(true)}
            style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "12px", 
              background: "rgba(18, 18, 26, 0.95)", 
              border: "1px solid rgba(255, 255, 255, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer", 
              transition: "all 0.2s",
              color: "#a39e93"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#a39e93"}
            title="Show Codebase Metrics"
          >
            <BarChart3 size={16} />
          </button>
        ) : (
          <div style={{ width: "256px", background: "rgba(13, 13, 20, 0.98)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                <Activity size={14} style={{ color: "#ff6b00" }} />
                <span style={{ fontSize: "10px", fontWeight: "bold", color: "#f5f4f0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Codebase Metrics</span>
              </div>
              <button
                onClick={() => setIsStatsExpanded(false)}
                style={{ background: "transparent", border: "none", padding: "4px", color: "#807b6e", cursor: "pointer", display: "flex", alignItems: "center" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#f5f4f0"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#807b6e"}
              >
                <ChevronLeft size={14} />
              </button>
            </div>

            {/* Grid Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "9px", color: "#807b6e", textTransform: "uppercase" }}>Files</span>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "#f5f4f0", marginTop: "2px" }}>9</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "9px", color: "#807b6e", textTransform: "uppercase" }}>Relations</span>
                <span style={{ fontSize: "14px", fontWeight: 900, color: "#f5f4f0", marginTop: "2px" }}>10</span>
              </div>
              <div style={{ background: mode === "trace" ? "rgba(255,255,255,0.03)" : "rgba(239, 68, 68, 0.05)", border: mode === "trace" ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column", color: mode === "trace" ? "#f5f4f0" : "#f87171" }}>
                <span style={{ fontSize: "9px", color: "#807b6e", textTransform: "uppercase" }}>Circular</span>
                <span style={{ fontSize: "14px", fontWeight: 900, marginTop: "2px" }}>{mode === "trace" ? "0" : "1"}</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column", color: "#fbbf24" }}>
                <span style={{ fontSize: "9px", color: "#807b6e", textTransform: "uppercase" }}>Dead Code</span>
                <span style={{ fontSize: "14px", fontWeight: 900, marginTop: "2px" }}>11%</span>
              </div>
            </div>

            {/* Language Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#807b6e", textTransform: "uppercase" }}>Languages</span>
              <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden", display: "flex" }}>
                <div style={{ background: "#10b981", width: "33%" }} title="Rust: 3 files (33%)" />
                <div style={{ background: "#f59e0b", width: "56%" }} title="TypeScript/TSX: 5 files (56%)" />
                <div style={{ background: "#d946ef", width: "11%" }} title="External: 1 file (11%)" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", fontSize: "8px", color: "#a39e93" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                  <span>RS (33%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f59e0b" }} />
                  <span>TS/TSX (56%)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SVG Canvas Area */}
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" } as React.CSSProperties}>
        <svg
          ref={containerRef}
          viewBox="0 0 760 250"
          style={{ width: "100%", height: "auto", overflow: "visible", cursor: "crosshair" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <defs>
            <marker id="arrowhead-std" markerWidth="6" markerHeight="6" refX="58" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.15)" />
            </marker>
            <marker id="arrowhead-blast" markerWidth="6" markerHeight="6" refX="58" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
            </marker>
            <marker id="arrowhead-trace" markerWidth="6" markerHeight="6" refX="58" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" />
            </marker>
            <filter id="glow-red">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Animated Edge Pulse Trails */}
            <linearGradient id="traceTrail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0)" />
              <stop offset="100%" stopColor="rgba(6,182,212,1)" />
            </linearGradient>
            <linearGradient id="blastTrail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(239,68,68,0)" />
              <stop offset="100%" stopColor="rgba(239,68,68,1)" />
            </linearGradient>
          </defs>

          {/* Edges layer */}
          {EDGES.map((edge, i) => {
            const a = NODES.find(n => n.id === edge.from)!;
            const b = NODES.find(n => n.id === edge.to)!;

            let isBlastPath = false;
            if (blastRadius && blastRadius.tiers[edge.from] !== undefined && blastRadius.tiers[edge.to] !== undefined) {
              isBlastPath = true;
            }

            let isTracePath = false;
            if (propTrace && propTrace.involved.includes(edge.from) && propTrace.involved.includes(edge.to)) {
              isTracePath = true;
            }

            const isDimmed = (propTrace && !isTracePath) || (blastRadius && !isBlastPath);

            let strokeColor = "rgba(255, 255, 255, 0.08)";
            let marker = "url(#arrowhead-std)";
            let strokeWidth = 1.2;

            if (isTracePath) {
              strokeColor = "#06b6d4";
              marker = "url(#arrowhead-trace)";
              strokeWidth = 2.5;
            } else if (isBlastPath) {
              strokeColor = "#ef4444";
              marker = "url(#arrowhead-blast)";
              strokeWidth = 2.0;
            }

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <motion.line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  markerEnd={marker}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isDimmed ? 0.04 : 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Animated pulse overlay on active paths */}
                {isTracePath && (
                  <motion.line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="url(#traceTrail)"
                    strokeWidth={4}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 0.2, 0.2], pathOffset: [0, 0, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow-cyan)"
                  />
                )}

                {isBlastPath && (
                  <motion.line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="url(#blastTrail)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 0.2, 0.2], pathOffset: [0, 0, 1], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    filter="url(#glow-red)"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes layer */}
          {NODES.map((node, i) => {
            const isHovered = hoveredNode === node.id;
            const accent = getLanguageAccent(node.type, node.isExternal);

            let isDimmed = false;
            let glowColor: string | null = null;
            let glowRadius: number = 0;
            let displayBadge: string | null = null;

            if (propTrace) {
              if (propTrace.involved.includes(node.id)) {
                glowColor = "#06b6d4";
                glowRadius = 15;
              } else {
                isDimmed = true;
              }
            } else if (blastRadius) {
              const tier = blastRadius.tiers[node.id];
              if (tier !== undefined) {
                if (tier === 0) {
                  glowColor = "#ef4444";
                  glowRadius = 25;
                  displayBadge = "Trigger";
                } else if (tier === 1) {
                  glowColor = "#ef4444";
                  glowRadius = 18;
                  displayBadge = "Tier 1";
                } else if (tier === 2) {
                  glowColor = "#f97316";
                  glowRadius = 12;
                  displayBadge = "Tier 2";
                } else if (tier === 3) {
                  glowColor = "#eab308";
                  glowRadius = 8;
                  displayBadge = "Tier 3";
                }
              }
            }

            // Magnetic Pull vector
            let pullX = 0;
            let pullY = 0;
            const bounds = containerRef.current?.getBoundingClientRect();
            if (bounds && mousePos.x > 0 && !isDimmed) {
              const svgX = (mousePos.x / bounds.width) * 760;
              const svgY = (mousePos.y / bounds.height) * 250;
              const dx = svgX - node.x;
              const dy = svgY - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 50) {
                pullX = dx * 0.15;
                pullY = dy * 0.15;
              }
            }

            return (
              <g key={node.id}>
                {/* Simulated Halo Glowing Rings */}
                {glowColor && (
                  <circle
                    cx={node.x + pullX}
                    cy={node.y + pullY}
                    r={36}
                    fill="none"
                    stroke={glowColor}
                    strokeWidth={2}
                    opacity={0.3}
                    style={{ filter: glowColor === "#ef4444" ? "url(#glow-red)" : "url(#glow-cyan)" }}
                  />
                )}

                {/* Main Card body */}
                <foreignObject
                  x={node.x - 65 + pullX}
                  y={node.y - 24 + pullY}
                  width="130"
                  height="48"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  style={{ overflow: "visible", transition: "transform 0.1s ease-out" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "6px",
                      height: "100%",
                      width: "100%",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderTopColor: glowColor || (isHovered ? accent.color : "rgba(255,255,255,0.06)"),
                      borderRightColor: glowColor || (isHovered ? accent.color : "rgba(255,255,255,0.06)"),
                      borderBottomColor: glowColor || (isHovered ? accent.color : "rgba(255,255,255,0.06)"),
                      borderLeftColor: accent.color,
                      borderLeftWidth: "3px",
                      background: "#111116",
                      opacity: isDimmed ? 0.15 : 1,
                      pointerEvents: isDimmed ? "none" : "all",
                      transform: isHovered ? "scale(1.04) translateY(-1px)" : "none",
                      boxShadow: glowColor ? `0 0 16px ${glowColor}30` : isHovered ? `0 4px 14px ${accent.color}20` : "0 4px 12px rgba(0,0,0,0.3)",
                      transition: "all 0.25s ease",
                      position: "relative",
                      boxSizing: "border-box"
                    }}
                  >
                    {/* Status indicators (CVE, coverage, git status) */}
                    <div style={{ position: "absolute", top: "-6px", right: "-4px", display: "flex", gap: "2px", transform: "scale(0.75)", transformOrigin: "top right", zIndex: 20 }}>
                      {node.gitStatus && (
                        <span style={{ padding: "2px 6px", background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "4px", fontWeight: "bold", fontSize: "8px", textTransform: "uppercase" } as React.CSSProperties}>
                          {node.gitStatus}
                        </span>
                      )}
                      {node.coverage && mode === "graph" && (
                        <span style={{ padding: "2px 6px", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "4px", fontWeight: "bold", fontSize: "8px", textTransform: "uppercase" } as React.CSSProperties}>
                          🧪 {node.coverage}%
                        </span>
                      )}
                      {node.deadCode && (
                        <span style={{ padding: "2px 6px", background: "#3f0c0c", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "4px", fontWeight: "bold", fontSize: "8px", textTransform: "uppercase", display: "flex", alignItems: "center" } as React.CSSProperties}>
                          💀 Unused
                        </span>
                      )}
                      {node.vulnerabilities && (
                        <span style={{ padding: "2px 6px", background: "#3f0c0c", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "4px", fontWeight: "bold", fontSize: "8px", textTransform: "uppercase" } as React.CSSProperties}>
                          🛡️ {node.vulnerabilities} CVEs
                        </span>
                      )}
                      {displayBadge && (
                        <span style={{ padding: "2px 6px", background: "rgba(15, 15, 20, 0.9)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", fontWeight: "black", fontSize: "8px", textTransform: "uppercase", color: glowColor || "#fff" } as React.CSSProperties}>
                          {displayBadge}
                        </span>
                      )}
                    </div>

                    {/* Card Content Row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
                      {/* Icon */}
                      <div style={{ width: "24px", height: "24px", borderRadius: "4px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {node.type === "RS" ? (
                          <Cpu size={11} style={{ color: accent.color }} />
                        ) : node.type === "TSX" ? (
                          <Layout size={11} style={{ color: accent.color }} />
                        ) : node.type === "EXT" ? (
                          <Package size={11} style={{ color: accent.color }} />
                        ) : (
                          <FileCode size={11} style={{ color: accent.color }} />
                        )}
                      </div>

                      {/* Text details */}
                      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: "7px", color: "#807b6e", fontFamily: "var(--font-mono), monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "normal" }}>{node.dir}</span>
                        <span style={{ fontSize: "10px", fontWeight: "bold", color: node.deadCode ? "#f87171" : "#f5f4f0", textDecoration: node.deadCode ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "2px" }}>{node.label}</span>
                      </div>
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Floating Code Info Tooltip Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: "absolute",
                left: mousePos.x,
                top: mousePos.y - 12,
                transform: "translate(-50%, -100%)",
                zIndex: 100,
                pointerEvents: "none",
                background: "rgba(11, 11, 16, 0.98)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "12px",
                width: "220px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              }}
            >
              {(() => {
                const node = NODES.find(n => n.id === hoveredNode)!;
                const accent = getLanguageAccent(node.type, node.isExternal);
                return (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent.color }} />
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#f5f4f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{node.label}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "9px", color: "#a39e93", fontFamily: "var(--font-mono), monospace" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#807b6e" }}>Language:</span>
                        <span>{accent.name}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#807b6e" }}>Location:</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}>{node.dir}{node.label}</span>
                      </div>
                      {node.coverage && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#807b6e" }}>Coverage:</span>
                          <span style={{ color: "#10b981", fontWeight: "bold" }}>{node.coverage}%</span>
                        </div>
                      )}
                      {node.gitStatus && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "#807b6e" }}>Git Status:</span>
                          <span style={{ color: "#fbbf24", fontWeight: "bold" }}>Uncommitted</span>
                        </div>
                      )}
                      {node.deadCode && (
                        <div style={{ display: "flex", flexDirection: "column", color: "#f87171", gap: "2px", marginTop: "4px", paddingTop: "4px", borderTop: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-sans), sans-serif", fontSize: "8px", lineHeight: 1.25 }}>
                          <span style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em" }}>💀 Dead Code Warning</span>
                          <span>This file has no imports and can be safely deleted.</span>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Legend bar (matching desktop app) */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "24px", 
          flexWrap: "wrap", 
          borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
          paddingTop: "12px", 
          marginTop: "12px",
          fontSize: "10px", 
          color: "#a39e93", 
          fontFamily: "var(--font-mono), monospace" 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#10b981", flexShrink: 0 }} />
          <span style={{ textTransform: "none", letterSpacing: "normal" }}>Rust (Backend)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#f59e0b", flexShrink: 0 }} />
          <span style={{ textTransform: "none", letterSpacing: "normal" }}>TS / TSX</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#d946ef", flexShrink: 0 }} />
          <span style={{ textTransform: "none", letterSpacing: "normal" }}>Packages</span>
        </div>
        {mode === "blast" && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px", borderLeft: "1px solid rgba(255,255,255,0.05)", paddingLeft: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ textTransform: "none", letterSpacing: "normal" }}>Tier 1 (Critical)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f97316" }} />
              <span style={{ textTransform: "none", letterSpacing: "normal" }}>Tier 2 (Medium)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
