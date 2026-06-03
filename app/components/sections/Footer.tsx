"use client";

import { Download } from "lucide-react";
import { usePlatform } from "../../hooks/usePlatform";
import { DOWNLOADS } from "../../data/content";

export function Footer() {
  const platform = usePlatform();
  const primaryDownload = DOWNLOADS[platform].primary;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" style={{ flexDirection: "column", gap: "32px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
      {/* Top row: brand + CTA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <strong style={{ color: "var(--fg)", fontSize: "18px" }}>Dataflow Visualiser</strong>
          <span className="built-with" style={{ fontSize: "12px", color: "var(--muted)", opacity: 0.6 }}>Built with Tauri + React + Rust</span>
        </div>


      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", background: "var(--border)" }} />

      {/* Bottom row: nav + social + copyright */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "16px" }}>
        <div className="footer-nav" style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <a href="#">Top</a>
          <a href="#workflow">Workflow</a>
          <a href="#engine">Engine</a>
          <a href="#privacy">Privacy</a>
          <a href="#download">Download</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Social links */}
          <a
            href="https://github.com/Stewy8506/Repository-Visualiser"
            target="_blank"
            rel="noopener noreferrer"
            className="github-star"
            style={{ fontSize: "13px" }}
          >
            ★ Star on GitHub
          </a>

          <span style={{ fontSize: "12px", color: "var(--muted)", opacity: 0.4 }}>
            © {year} Dataflow Visualiser
          </span>
        </div>
      </div>
    </footer>
  );
}
