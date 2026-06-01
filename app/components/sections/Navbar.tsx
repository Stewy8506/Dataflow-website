"use client";

import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <nav className="nav">
      <a href="#" className="brand">
        DV
      </a>
      <div className="links">
        <a href="#engine">Engine</a>
        <a href="#download">Download</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
