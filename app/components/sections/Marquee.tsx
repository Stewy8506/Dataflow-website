"use client";

const stack = ["Rust", "Tauri v2", "React 19", "WebGL", "oxc-parser", "Tree-Sitter", "Gemini API", "Local LLMs", "TypeScript"];

export function Marquee() {
  return (
    <section style={{ padding: 0 }}>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...stack, ...stack, ...stack, ...stack].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
