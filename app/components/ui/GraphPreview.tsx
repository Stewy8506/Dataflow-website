"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function GraphPreview() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    { id: "App", cx: 150, cy: 200, r: 16, color: "var(--border)", label: "App.tsx" },
    { id: "Core", cx: 500, cy: 200, r: 28, color: "var(--accent)", label: "CoreEngine.ts" },
    { id: "DB", cx: 850, cy: 120, r: 18, color: "var(--border)", label: "Database.ts" },
    { id: "UI", cx: 850, cy: 280, r: 18, color: "var(--border)", label: "UIComponents.tsx" }
  ];

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 1000 400" role="img" aria-label="Animated dependency graph preview">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Edges */}
        <motion.path 
          id="e1" className="edge" d="M150,200 C300,100 400,200 500,200" strokeWidth="2" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} 
        />
        <motion.path 
          id="e2" className="edge" d="M150,200 C250,320 400,320 500,200" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path 
          id="e3" className="edge" d="M500,200 C650,200 700,120 850,120" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.path 
          id="e4" className="edge" d="M500,200 C600,380 750,280 850,280" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Pulses */}
        <circle r="5" fill="var(--accent)" filter="url(#glow)">
          <animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#e1" /></animateMotion>
        </circle>
        <circle r="5" fill="var(--accent)" filter="url(#glow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" begin="1s"><mpath href="#e2" /></animateMotion>
        </circle>
        <circle r="5" fill="#00ffcc" filter="url(#glow)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.5s"><mpath href="#e3" /></animateMotion>
        </circle>
        <circle r="5" fill="#ff4060" filter="url(#glow)">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="1.5s"><mpath href="#e4" /></animateMotion>
        </circle>

        {/* Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="var(--bg)"
            stroke={node.color}
            strokeWidth="3"
            filter={node.id === "Core" ? "url(#glow)" : ""}
            whileHover={{ scale: 1.3, stroke: "var(--accent)" }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            className="cursor-pointer interactive transition-colors"
          />
        ))}
        
        {/* Animated center core */}
        <circle cx="500" cy="200" r="28" fill="transparent" stroke="var(--accent)" strokeWidth="1" filter="url(#glow)" pointerEvents="none">
          <animate attributeName="r" values="28;36;28" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* Tooltips */}
      {hoveredNode && (
        <div 
          className="absolute pointer-events-none bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-sm font-mono backdrop-blur-md"
          style={{
            left: `${(nodes.find(n => n.id === hoveredNode)!.cx / 1000) * 100}%`,
            top: `${(nodes.find(n => n.id === hoveredNode)!.cy / 400) * 100}%`,
            transform: 'translate(-50%, -180%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
        >
          {nodes.find(n => n.id === hoveredNode)?.label}
        </div>
      )}
    </div>
  );
}
