export function Footer() {
  return (
    <footer className="footer">
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <strong style={{ color: "var(--fg)" }}>DV</strong>
        <span className="built-with">Built with Tauri + React</span>
      </div>
      <div className="footer-nav">
        <a href="#">Top</a>
        <a href="#engine">Engine</a>
        <a href="#download">Download</a>
        <a href="https://github.com/Stewy8506/Repository-Visualiser" target="_blank" rel="noopener noreferrer" className="github-star">★ Star on GitHub</a>
      </div>
    </footer>
  );
}
