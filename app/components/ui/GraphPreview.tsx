"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";

const NODES = [
  { id: "auth",    x: 50,  y: 120, label: "auth.rs",       main: true  },
  { id: "session", x: 200, y: 50,  label: "session.rs",    warn: true  },
  { id: "user",    x: 200, y: 190, label: "user.rs",       warn: true  },
  { id: "db",      x: 350, y: 120, label: "db.rs",         warn: true  },
  { id: "api",     x: 350, y: 20,  label: "api.rs",        dim: true   },
  { id: "cache",   x: 480, y: 80,  label: "cache.rs",      dim: true   },
  { id: "routes",  x: 480, y: 200, label: "routes.rs",     dim: true   },
  { id: "main",    x: 620, y: 120, label: "main.rs",       dim: true   },
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
];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function GraphPreview() {
  const containerRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const edgeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.2, delay: i * 0.08, ease: "easeInOut" as const },
    }),
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20, delay: 0.3 + i * 0.06 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      style={{
        width: "100%",
        marginTop: "64px",
        padding: "32px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "1.5rem",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        position: "relative",
        overflow: "visible", // Tooltips need to escape
      }}
    >
      {/* Header label */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
        <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "monospace" }}>
          blast-radius · auth.rs modified
        </span>
      </div>

      <div style={{ position: "relative", width: "100%" }}>
        <svg
          ref={containerRef}
          viewBox="0 0 700 240"
          style={{ width: "100%", height: "auto", overflow: "visible", cursor: "crosshair" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,107,0,0.5)" />
            </marker>
            <marker id="arrowhead-dim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.15)" />
            </marker>
            <filter id="glow-orange">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-red">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Soft gradient for pulse trail */}
            <linearGradient id="pulseTrail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,107,0,0)" />
              <stop offset="100%" stopColor="rgba(255,107,0,1)" />
            </linearGradient>
          </defs>

          {/* Edges */}
          {EDGES.map((edge, i) => {
            const a = getNode(edge.from);
            const b = getNode(edge.to);
            const isWarm = a.main || a.warn || b.warn;
            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={isWarm ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.08)"}
                strokeWidth={isWarm ? 1.5 : 1}
                markerEnd={isWarm ? "url(#arrowhead)" : "url(#arrowhead-dim)"}
                custom={i}
                variants={edgeVariants}
              />
            );
          })}

          {/* Pulse Trails on warm paths */}
          {EDGES.filter(e => getNode(e.from).main || getNode(e.from).warn).map((edge, i) => {
            const a = getNode(edge.from);
            const b = getNode(edge.to);
            return (
              <motion.line
                key={`pulse-${i}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="url(#pulseTrail)"
                strokeWidth={3}
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{ pathLength: [0, 0.2, 0.2], pathOffset: [0, 0, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                filter="url(#glow-orange)"
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const isHovered = hoveredNode === node.id;
            
            // Calculate magnetic pull based on real mouse position
            // We need to scale mousePos from physical pixels to SVG coordinates (700x240)
            const bounds = containerRef.current?.getBoundingClientRect();
            let pullX = 0;
            let pullY = 0;
            if (bounds && mousePos.x > 0) {
              const svgX = (mousePos.x / bounds.width) * 700;
              const svgY = (mousePos.y / bounds.height) * 240;
              const dx = svgX - node.x;
              const dy = svgY - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 40) { // Magnetic radius
                pullX = dx * 0.15;
                pullY = dy * 0.15;
              }
            }

            const x = node.x + pullX;
            const y = node.y + pullY;

            const color = node.main
              ? "#ff6b00"
              : node.warn
              ? "#ef4444"
              : "rgba(255,255,255,0.15)";
            const textColor = node.main || node.warn ? "#fff" : "rgba(255,255,255,0.4)";
            const glowFilter = node.main ? "url(#glow-orange)" : node.warn ? "url(#glow-red)" : "none";

            return (
              <motion.g 
                key={node.id} 
                custom={i} 
                variants={nodeVariants}
                onMouseEnter={() => setHoveredNode(node.id)}
                className="interactive"
                animate={{ x: pullX, y: pullY }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Ripple ring on main node */}
                {node.main && (
                  <motion.circle
                    cx={node.x} cy={node.y} r={16}
                    fill="none"
                    stroke="rgba(255,107,0,0.3)"
                    strokeWidth={1.5}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                
                {/* Invisible larger hit area for easier hovering */}
                <circle cx={node.x} cy={node.y} r={24} fill="transparent" />

                <motion.circle
                  cx={node.x} cy={node.y} r={isHovered ? 16 : 14}
                  fill={node.main ? "rgba(255,107,0,0.2)" : node.warn ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)"}
                  stroke={color}
                  strokeWidth={node.main ? 2 : isHovered ? 2 : 1}
                  filter={glowFilter}
                  style={{ cursor: "pointer" }}
                />
                <text
                  x={node.x} y={node.y + (isHovered ? 34 : 30)}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isHovered ? "#fff" : textColor}
                  fontFamily="monospace"
                  style={{ transition: "all 0.2s ease" }}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* HTML Tooltip overlay */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: "absolute",
                left: mousePos.x,
                top: mousePos.y - 40,
                transform: "translate(-50%, -100%)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                padding: "8px 12px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                zIndex: 100,
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--fg)", fontFamily: "monospace" }}>
                {getNode(hoveredNode).label}
              </span>
              <span style={{ 
                fontSize: "10px", 
                textTransform: "uppercase", 
                letterSpacing: "0.05em",
                color: getNode(hoveredNode).main ? "var(--accent)" : getNode(hoveredNode).warn ? "#ef4444" : "var(--muted)" 
              }}>
                {getNode(hoveredNode).main ? "Modified Source" : getNode(hoveredNode).warn ? "Impacted Dependency" : "Unaffected"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "24px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
        {[
          { color: "#ff6b00", label: "Modified file" },
          { color: "#ef4444", label: "Impacted (blast radius)" },
          { color: "rgba(255,255,255,0.2)", label: "Unaffected" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "monospace" }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
