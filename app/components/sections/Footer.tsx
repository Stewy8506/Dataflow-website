"use client";

import { FaGithub, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { usePlatform } from "../../hooks/usePlatform";
import { DOWNLOADS } from "../../data/content";

export function Footer() {
  const platform = usePlatform();
  const primaryDownload = DOWNLOADS[platform].primary;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" style={{ flexDirection: "column", gap: "32px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
      {/* 3-column grid */}
      <div className="footer-grid">
        {/* Column 1: Brand + tagline + newsletter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a href="#" className="brand-mark interactive" style={{ marginBottom: "4px" }}>
            <div className="g-glyph">d</div>
            <span className="name">dataflow</span>
          </a>
          <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.6, margin: 0, maxWidth: "300px" }}>
            Understand the structure before you break it.
          </p>
          <span className="built-with" style={{ fontSize: "12px", color: "var(--muted)", opacity: 0.6 }}>Built with Tauri + React + Rust</span>

          {/* Newsletter CTA */}
          <div style={{ marginTop: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Stay updated</span>
            <div className="footer-input-group">
              <input
                type="email"
                placeholder="you@email.com"
                className="footer-input"
                aria-label="Email for newsletter"
              />
              <button className="footer-input-btn" type="button">
                Notify
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Navigation</span>
          <div className="footer-nav" style={{ flexDirection: "column", gap: "10px" }}>
            <a href="#">Top</a>
            <a href="#workflow">Workflow</a>
            <a href="#features">Features</a>
            <a href="#engine">Engine</a>
            <a href="#privacy">Privacy</a>
            <a href="#download">Download</a>
          </div>
        </div>

        {/* Column 3: Social + Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>Connect</span>

          <div className="footer-social-links">
            <a
              href="https://github.com/Stewy8506/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
            >
              <FaSquareXTwitter size={16} />
            </a>
            <a
              href="#"
              aria-label="Discord"
            >
              <FaDiscord size={16} />
            </a>
          </div>

          <a
            href="https://github.com/Stewy8506/Repository-Visualiser"
            target="_blank"
            rel="noopener noreferrer"
            className="github-star"
            style={{ fontSize: "13px", marginTop: "8px" }}
          >
            ★ Star on GitHub
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", background: "var(--border)" }} />

      {/* Bottom bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "16px" }}>
        <span style={{ fontSize: "12px", color: "var(--muted)", opacity: 0.4 }}>
          © {year} Dataflow Visualiser. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
          <span className="mono-label" style={{ color: "var(--text-faint)" }}>TAURI</span>
          <span className="mono-label" style={{ color: "var(--text-faint)" }}>REACT</span>
          <span className="mono-label" style={{ color: "var(--text-faint)" }}>RUST</span>
          <span className="mono-label" style={{ color: "var(--text-faint)" }}>WEBGL</span>
        </div>
      </div>
    </footer>
  );
}
