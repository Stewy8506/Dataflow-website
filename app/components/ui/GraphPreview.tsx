export function GraphPreview() {
  return (
    <svg viewBox="0 0 1000 400" role="img" aria-label="Animated dependency graph preview">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="1" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Edges */}
      <path id="e1" className="edge" d="M150,200 C300,100 400,200 500,200" strokeWidth="1.5" />
      <path id="e2" className="edge" d="M150,200 C250,300 400,300 500,200" strokeWidth="1.5" />
      <path id="e3" className="edge" d="M500,200 C650,200 700,100 850,150" strokeWidth="1.5" />
      <path id="e4" className="edge" d="M500,200 C600,350 750,300 850,250" strokeWidth="1.5" />

      {/* Pulses */}
      <circle r="4" fill="var(--accent)" filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#e1" /></animateMotion>
      </circle>
      <circle r="4" fill="var(--accent)" filter="url(#glow)">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1s"><mpath href="#e2" /></animateMotion>
      </circle>
      <circle r="4" fill="#00ffcc" filter="url(#glow)">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#e3" /></animateMotion>
      </circle>
      <circle r="4" fill="#ff4060" filter="url(#glow)">
        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.5s"><mpath href="#e4" /></animateMotion>
      </circle>

      {/* Nodes */}
      <circle cx="150" cy="200" r="12" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="500" cy="200" r="24" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" filter="url(#glow)">
        <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="850" cy="150" r="16" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="850" cy="250" r="16" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
    </svg>
  );
}
