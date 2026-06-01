"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Eye, Bot } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 16 }} />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg)" }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Eye size={16} /> : <Bot size={16} />}
    </button>
  );
}
