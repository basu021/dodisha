"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function formatDistrict(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const QUICK_STATS = [
  { icon: "👥", label: "Population", value: "—", sub: "Census 2011" },
  { icon: "📐", label: "Area", value: "—", sub: "sq. km" },
  { icon: "🏘️", label: "Blocks", value: "—", sub: "administrative" },
  { icon: "🏫", label: "GP Count", value: "—", sub: "gram panchayats" },
];

const QUICK_LINKS = [
  { icon: "💰", label: "Finance & Budget", slug: "finance-budget", color: "#3b82f6" },
  { icon: "🌾", label: "Crop Prices", slug: "crop-prices", color: "#10b981" },
  { icon: "📋", label: "Gov. Schemes", slug: "govt-schemes", color: "#8b5cf6" },
  { icon: "📰", label: "News & Updates", slug: "news", color: "#f59e0b" },
  { icon: "🗺️", label: "Interactive Map", slug: "map", color: "#06b6d4" },
  { icon: "⚠️", label: "Local Alerts", slug: "local-alerts", color: "#ef4444" },
];

export default function DistrictOverview({ district }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const districtName = formatDistrict(district);
  const base = `/odisha/${district}`;

  const s = {
    page: {
      background: isDark ? "#1b2431" : "#f8fafc",
      minHeight: "100vh",
      color: isDark ? "#f1f5f9" : "#1e293b",
    },
    topBar: {
      background: isDark ? "#273142" : "#ffffff",
      borderBottom: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      padding: "16px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
    },
    content: {
      padding: "28px",
      maxWidth: 1000,
    },
    card: {
      background: isDark ? "#273142" : "#ffffff",
      border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      borderRadius: 14,
      padding: "20px 24px",
      boxShadow: isDark ? "none" : "0 1px 6px rgba(0,0,0,0.05)",
    },
    statGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
      gap: 14,
      marginBottom: 28,
    },
    statCard: {
      background: isDark ? "#273142" : "#ffffff",
      border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      borderRadius: 12,
      padding: "18px 16px",
      textAlign: "center",
    },
    quickGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 12,
      marginTop: 20,
    },
    comingSoon: {
      background: isDark ? "#1e2839" : "#f1f5f9",
      border: isDark ? "1px dashed #323d4e" : "1px dashed #cbd5e1",
      borderRadius: 10,
      padding: "32px 20px",
      textAlign: "center",
      color: isDark ? "#475569" : "#94a3b8",
      fontSize: "0.85rem",
      marginTop: 14,
    },
  };

  return (
    <div style={s.page}>
      {/* Top bar */}
      <div style={s.topBar}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "1.4rem", margin: 0, letterSpacing: "-0.5px" }}>
            📊 {districtName} District
          </h1>
          <p style={{ margin: 0, fontSize: "0.78rem", color: isDark ? "#64748b" : "#94a3b8", marginTop: 2 }}>
            Odisha · Real-time civic data · All data from official govt portals
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{
            background: "#dcfce7",
            color: "#166534",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: "0.72rem",
            fontWeight: 600,
          }}>
            ● Live
          </span>
          <span style={{
            background: isDark ? "#323d4e" : "#f1f5f9",
            color: isDark ? "#94a3b8" : "#64748b",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: "0.72rem",
          }}>
            Updated every 5–30 min
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={s.content}>

        {/* Quick stats */}
        <div style={s.statGrid}>
          {QUICK_STATS.map((st) => (
            <div key={st.label} style={s.statCard}>
              <span style={{ fontSize: "1.6rem", display: "block", marginBottom: 6 }}>{st.icon}</span>
              <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "#3b82f6", display: "block" }}>
                {st.value}
              </span>
              <span style={{ fontWeight: 600, fontSize: "0.82rem", display: "block", marginTop: 2 }}>
                {st.label}
              </span>
              <span style={{ fontSize: "0.7rem", color: isDark ? "#64748b" : "#94a3b8" }}>
                {st.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Quick access */}
        <div style={s.card}>
          <h2 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>⚡ Quick Access</h2>
          <p style={{ fontSize: "0.78rem", color: isDark ? "#64748b" : "#94a3b8", margin: 0 }}>
            Jump directly to the most-used dashboards
          </p>
          <div style={s.quickGrid}>
            {QUICK_LINKS.map((ql) => (
              <Link
                key={ql.slug}
                href={`${base}/${ql.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: isDark ? "#1e2839" : `${ql.color}0d`,
                  border: `1px solid ${ql.color}30`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  textDecoration: "none",
                  color: isDark ? "#e2e8f0" : "#1e293b",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  transition: "border-color .15s",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{ql.icon}</span>
                {ql.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Coming soon notice */}
        <div style={{ ...s.card, marginTop: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>
            📋 Overview Dashboard
          </h2>
          <p style={{ fontSize: "0.78rem", color: isDark ? "#64748b" : "#94a3b8", margin: 0, marginBottom: 16 }}>
            District-wide summary of key civic metrics
          </p>
          <div style={s.comingSoon}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>🏗️</span>
            <p style={{ fontWeight: 600, marginBottom: 6, color: isDark ? "#64748b" : "#64748b" }}>
              Overview dashboard coming soon
            </p>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              We are currently aggregating data for {districtName} from official government portals.
              Use the sidebar to explore individual modules that are already live.
            </p>
          </div>
        </div>

        {/* Data attribution */}
        <p style={{
          marginTop: 20,
          fontSize: "0.72rem",
          color: isDark ? "#334155" : "#cbd5e1",
          lineHeight: 1.6,
        }}>
          ⚖️ All data sourced from publicly available government portals under India's Open Data Policy (NDSAP)
          and RTI Act 2005. Dodisha is not affiliated with the Government of Odisha. Verify critical
          information from official sources before acting on it.
        </p>
      </div>
    </div>
  );
}
