"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);

    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const isDark = theme === "dark";

  const nav = {
    background: isDark ? "#1e2839ee" : "#ffffffee",
    borderBottom: isDark ? "1px solid #252f3f" : "1px solid #e5e7eb",
    backdropFilter: "blur(14px)",
    position: "sticky",
    top: 0,
    zIndex: 200,
    padding: "0 1.25rem",
    boxShadow: scrolled
      ? isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.07)"
      : "none",
    transition: "box-shadow 0.2s",
  };

  const inner = {
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    gap: 12,
  };

  const logoStyle = {
    fontWeight: 800,
    fontSize: "1.2rem",
    color: "#3b82f6",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: 7,
    textDecoration: "none",
    flexShrink: 0,
  };

  const linkStyle = {
    color: isDark ? "#94a3b8" : "#6b7280",
    textDecoration: "none",
    fontSize: "0.83rem",
    fontWeight: 500,
    transition: "color .15s",
    whiteSpace: "nowrap",
  };

  const themeBtn = {
    background: isDark ? "#273142" : "#f1f5f9",
    border: `1px solid ${isDark ? "#323d4e" : "#e5e7eb"}`,
    borderRadius: 8,
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: isDark ? "#e2e8f0" : "#334155",
    flexShrink: 0,
  };

  const ghBtn = {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: isDark ? "#273142" : "#f1f5f9",
    border: `1px solid ${isDark ? "#323d4e" : "#e5e7eb"}`,
    borderRadius: 8,
    padding: "5px 10px",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: isDark ? "#94a3b8" : "#6b7280",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  return (
    <header style={nav}>
      <div style={inner}>
        {/* Logo */}
        <Link href="/" style={logoStyle}>
          <span>🏛️</span>
          <span>Dodisha</span>
        </Link>

        {/* Centre nav links — hidden on small screens */}
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }} className="d-none d-md-flex">
          <Link href="/#districts"   style={linkStyle}>Districts</Link>
          <Link href="/#modules"     style={linkStyle}>Modules</Link>
          <Link href="/#legal"       style={linkStyle}>Transparency</Link>
          <Link href="/#contribute"  style={linkStyle}>Contribute</Link>
        </nav>

        {/* Right actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a
            href="https://github.com/jayanthmb14/forthepeople"
            target="_blank"
            rel="noopener noreferrer"
            style={ghBtn}
            className="d-none d-sm-flex"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>

          <button onClick={toggleTheme} style={themeBtn} title="Toggle theme">
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link
            href="/#districts"
            style={{
              background: "linear-gradient(135deg,#3b82f6,#6366f1)",
              color: "#fff",
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            className="d-none d-sm-inline-block"
          >
            Explore →
          </Link>
        </div>
      </div>
    </header>
  );
}
