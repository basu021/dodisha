"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

/* ─── Odisha's 30 districts ─── */
const DISTRICTS = [
  { name: "Angul", tag: "Industrial · Coal · Steel", emoji: "⚙️" },
  { name: "Balangir", tag: "Agriculture · Textile · Heritage", emoji: "🌾" },
  { name: "Balasore", tag: "Coastal · ISRO Range · Tourism", emoji: "🚀" },
  { name: "Bargarh", tag: "Rice Bowl · Dhanu Jatra · Weaving", emoji: "🎭" },
  { name: "Bhadrak", tag: "Trade · Industry · River Delta", emoji: "🏭" },
  { name: "Boudh", tag: "Forest · Tribal Culture · Rivers", emoji: "🌿" },
  { name: "Cuttack", tag: "Silver Filigree · Historic · Commerce", emoji: "🏙️" },
  { name: "Deogarh", tag: "Tribal · Handicrafts · Wildlife", emoji: "🐾" },
  { name: "Dhenkanal", tag: "Education · Forest · Oil Refinery", emoji: "📚" },
  { name: "Gajapati", tag: "Tribal · Coffee · Scenic Hills", emoji: "☕" },
  { name: "Ganjam", tag: "Olive Ridley · Cashew · Handicrafts", emoji: "🐢" },
  { name: "Jagatsinghpur", tag: "Port · Petrochemicals · Coast", emoji: "⚓" },
  { name: "Jajpur", tag: "Industry · Chrome Mines · Temples", emoji: "⛏️" },
  { name: "Jharsuguda", tag: "Energy Capital · Aluminium · Air Hub", emoji: "✈️" },
  { name: "Kalahandi", tag: "Agriculture · Marble · Waterfalls", emoji: "💎" },
  { name: "Kandhamal", tag: "Organic Turmeric · Tribal · Hills", emoji: "🌾" },
  { name: "Kendrapara", tag: "Chilika · Mangroves · Fisheries", emoji: "🐟" },
  { name: "Keonjhar", tag: "Iron Ore · Mining · Tribal Culture", emoji: "⛰️" },
  { name: "Khordha", tag: "State Capital · IT Hub · Culture", emoji: "🏛️" },
  { name: "Koraput", tag: "Tribal Heritage · Coffee · Waterfalls", emoji: "🌊" },
  { name: "Malkangiri", tag: "Tribal · Agriculture · Chitrakonda", emoji: "🌄" },
  { name: "Mayurbhanj", tag: "Simlipal · Tribal Culture · Chhau", emoji: "🐯" },
  { name: "Nabarangpur", tag: "Tribal · Forest · Cotton", emoji: "🌳" },
  { name: "Nayagarh", tag: "Agriculture · Handicrafts · Forests", emoji: "🌿" },
  { name: "Nuapada", tag: "Agriculture · Tribal · Limestone", emoji: "🏔️" },
  { name: "Puri", tag: "Jagannath · Konark · Sea Beach", emoji: "🛕" },
  { name: "Rayagada", tag: "Tribal · Bauxite · Waterfalls", emoji: "💧" },
  { name: "Sambalpur", tag: "Hirakud Dam · Sambalpuri · Industry", emoji: "🌊" },
  { name: "Sonepur", tag: "Cattle Fair · Agriculture · Rivers", emoji: "🐂" },
  { name: "Sundargarh", tag: "Steel · Tribal · Football Culture", emoji: "⚽" },
];

/* ─── Dashboard module categories ─── */
const MODULES = [
  {
    category: "Live Data",
    color: "#3b82f6",
    bg: "#eff6ff",
    items: [
      { icon: "🗺️", name: "Overview" },
      { icon: "💧", name: "Water & Dams" },
      { icon: "🌾", name: "Crop Prices" },
      { icon: "🌦️", name: "Weather & Rainfall" },
      { icon: "💰", name: "Finance & Budget" },
      { icon: "📡", name: "Interactive Map" },
    ],
  },
  {
    category: "Governance",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    items: [
      { icon: "👤", name: "Leadership" },
      { icon: "🚔", name: "Police & Traffic" },
      { icon: "🏫", name: "Schools" },
      { icon: "⚖️", name: "Courts" },
      { icon: "📋", name: "RTI Tracker" },
      { icon: "🏘️", name: "Gram Panchayat" },
      { icon: "🏥", name: "Health" },
    ],
  },
  {
    category: "Services",
    color: "#10b981",
    bg: "#f0fdf4",
    items: [
      { icon: "📜", name: "Govt Schemes" },
      { icon: "🛂", name: "Services Guide" },
      { icon: "🗳️", name: "Elections" },
      { icon: "🚌", name: "Transport" },
      { icon: "🚰", name: "JJM Water Supply" },
      { icon: "🏠", name: "Housing" },
      { icon: "⚡", name: "Power Supply" },
    ],
  },
  {
    category: "Community",
    color: "#f59e0b",
    bg: "#fffbeb",
    items: [
      { icon: "🔔", name: "Local Alerts" },
      { icon: "🏢", name: "Offices" },
      { icon: "👥", name: "Citizen Corner" },
      { icon: "🌟", name: "Famous Personalities" },
      { icon: "📰", name: "News" },
      { icon: "📊", name: "Data Sources" },
    ],
  },
];

/* ─── Legal / differentiator features ─── */
const LEGAL_FEATURES = [
  {
    icon: "📂",
    title: "Fully Attributed Data",
    desc: "Every data point links directly to its official source — no modification, no curation. We are a transparent relay, not a publisher.",
  },
  {
    icon: "🔓",
    title: "Open Data Policy (NDSAP)",
    desc: "All data sourced from publicly available government portals under India's National Data Sharing and Accessibility Policy.",
  },
  {
    icon: "📰",
    title: "RTI Act 2005 Aligned",
    desc: "Aggregating information that citizens already have the right to access under Article 19(1)(a) and the Right to Information Act, 2005.",
  },
  {
    icon: "🚫",
    title: "Non-Commercial & Non-Affiliated",
    desc: "Dodisha is not affiliated with, endorsed by, or partnered with the Government of Odisha or any government body.",
  },
  {
    icon: "🍪",
    title: "Cookieless & Privacy-First",
    desc: "No cookies, no tracking pixels, no personal data collection. Analytics via Plausible (cookieless, GDPR-compliant).",
  },
  {
    icon: "⚠️",
    title: "Accuracy Disclaimer",
    desc: "Data accuracy depends on source portals. Dodisha does not guarantee completeness or timeliness. Verify critical information from official sources.",
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: "30", label: "Districts of Odisha", icon: "🗺️" },
  { value: "29+", label: "Dashboard Modules", icon: "📊" },
  { value: "5–30m", label: "Data Refresh Cycle", icon: "⏱️" },
  { value: "100%", label: "Open Source", icon: "🔓" },
];

export default function LandingLayer() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const isDark = theme === "dark";

  /* ─── Inline style tokens ─── */
  const s = {
    page: {
      fontFamily: "'Inter', sans-serif",
      background: isDark ? "#1b2431" : "#f8fafc",
      color: isDark ? "#f1f5f9" : "#1e293b",
      minHeight: "100vh",
    },
    // Hero
    hero: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "80px 1.5rem 60px",
      textAlign: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: isDark ? "#1e3a5f" : "#dbeafe",
      color: isDark ? "#93c5fd" : "#1d4ed8",
      borderRadius: 999,
      padding: "5px 14px",
      fontSize: "0.8rem",
      fontWeight: 600,
      marginBottom: 24,
    },
    h1: {
      fontSize: "clamp(2rem, 5vw, 3.5rem)",
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: "-1px",
      marginBottom: 20,
    },
    heroSub: {
      fontSize: "clamp(1rem, 2vw, 1.2rem)",
      color: isDark ? "#94a3b8" : "#64748b",
      maxWidth: 620,
      margin: "0 auto 36px",
      lineHeight: 1.7,
    },
    heroBtns: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap",
    },
    btnPrimary: {
      background: "linear-gradient(135deg, #3b82f6, #6366f1)",
      color: "#fff",
      borderRadius: 10,
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "0.95rem",
      textDecoration: "none",
      display: "inline-block",
      boxShadow: "0 4px 15px rgba(59,130,246,0.35)",
      transition: "transform .15s",
    },
    btnSecondary: {
      background: isDark ? "#323d4e" : "#f1f5f9",
      color: isDark ? "#e2e8f0" : "#334155",
      borderRadius: 10,
      padding: "12px 28px",
      fontWeight: 600,
      fontSize: "0.95rem",
      textDecoration: "none",
      display: "inline-block",
    },
    // Legal banner
    legalBanner: {
      background: isDark ? "#1e2d1e" : "#f0fdf4",
      border: isDark ? "1px solid #166534" : "1px solid #bbf7d0",
      borderRadius: 10,
      padding: "10px 18px",
      margin: "32px auto 0",
      maxWidth: 740,
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      fontSize: "0.78rem",
      color: isDark ? "#86efac" : "#166534",
      lineHeight: 1.6,
    },
    // Sections
    section: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "60px 1.5rem",
    },
    sectionTitle: {
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      fontWeight: 800,
      marginBottom: 8,
      letterSpacing: "-0.5px",
    },
    sectionSub: {
      color: isDark ? "#94a3b8" : "#64748b",
      marginBottom: 40,
      fontSize: "0.95rem",
    },
    // Stats
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 16,
      margin: "40px 0",
    },
    statCard: {
      background: isDark ? "#273142" : "#fff",
      border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      borderRadius: 14,
      padding: "24px 20px",
      textAlign: "center",
      boxShadow: isDark ? "none" : "0 1px 8px rgba(0,0,0,0.06)",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: 800,
      color: "#3b82f6",
      display: "block",
      lineHeight: 1,
    },
    statLabel: {
      fontSize: "0.8rem",
      color: isDark ? "#94a3b8" : "#64748b",
      marginTop: 6,
    },
    // Districts
    districtGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 12,
    },
    districtCard: {
      background: isDark ? "#273142" : "#fff",
      border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      borderRadius: 12,
      padding: "14px 16px",
      cursor: "pointer",
      transition: "border-color .15s, transform .15s",
      textDecoration: "none",
      color: "inherit",
      display: "block",
    },
    // Modules
    tabBar: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 24,
    },
    tab: (active) => ({
      padding: "7px 18px",
      borderRadius: 999,
      fontWeight: 600,
      fontSize: "0.85rem",
      cursor: "pointer",
      border: "none",
      background: active ? "#3b82f6" : isDark ? "#323d4e" : "#f1f5f9",
      color: active ? "#fff" : isDark ? "#94a3b8" : "#64748b",
      transition: "all .15s",
    }),
    moduleGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 10,
    },
    moduleCard: (color, bg) => ({
      background: isDark ? "#273142" : bg,
      border: `1px solid ${isDark ? "#323d4e" : color + "40"}`,
      borderRadius: 10,
      padding: "14px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: "0.875rem",
      fontWeight: 500,
    }),
    // Legal features grid
    legalGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 16,
    },
    legalCard: {
      background: isDark ? "#273142" : "#fff",
      border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      borderRadius: 14,
      padding: "24px",
    },
    // Disclaimer box
    disclaimerBox: {
      background: isDark ? "#1e1e2e" : "#fefce8",
      border: isDark ? "1px solid #44334a" : "1px solid #fde047",
      borderRadius: 12,
      padding: "20px 24px",
      margin: "0 auto",
      maxWidth: 900,
    },
    // Footer
    footer: {
      borderTop: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      padding: "40px 1.5rem 24px",
      marginTop: 40,
    },
    footerInner: {
      maxWidth: 1200,
      margin: "0 auto",
    },
  };

  return (
    <div style={s.page}>
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Non-affiliation banner ── */}
      <div style={{
        background: isDark ? "#1e293b" : "#fff7ed",
        borderBottom: isDark ? "1px solid #323d4e" : "1px solid #fed7aa",
        textAlign: "center",
        padding: "7px 16px",
        fontSize: "0.75rem",
        color: isDark ? "#fb923c" : "#9a3412",
        fontWeight: 500,
      }}>
        ⚠️ Dodisha is an independent citizen initiative. Not affiliated with, endorsed by, or representing the Government of Odisha or any government body.
      </div>

      {/* ── Hero ── */}
      <div style={s.hero}>
        <div style={s.badge}>
          <span>🌊</span> Built for Odisha, by Odisha citizens
        </div>

        <h1 style={s.h1}>
          Your District.{" "}
          <span style={{ color: "#3b82f6" }}>Your Data.</span>
          <br />
          Your Right. 🇮🇳
        </h1>

        <p style={s.heroSub}>
          Free, real-time, district-level civic transparency for all 30 districts
          of Odisha — powered by official government data and community contributors.
          No login. No cost. No compromise.
        </p>

        <div style={s.heroBtns}>
          <a href="#districts" style={s.btnPrimary}>🗺️ Explore Districts</a>
          <a href="#modules" style={s.btnSecondary}>📊 View Dashboards</a>
          <a href="#contribute" style={s.btnSecondary}>🤝 Contribute</a>
        </div>

        {/* Legal micro-banner in hero */}
        <div style={s.legalBanner}>
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>✅</span>
          <span>
            All data sourced from publicly available government portals under{" "}
            <strong>India's Open Data Policy (NDSAP)</strong> and the{" "}
            <strong>Right to Information Act, 2005</strong> (Art. 19(1)(a)).
            Dodisha does not modify, sell, or commercially exploit any government data.
            Every data point is traceable to its official source.
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={s.statsGrid}>
          {STATS.map((st) => (
            <div key={st.label} style={s.statCard}>
              <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 6 }}>{st.icon}</span>
              <span style={s.statValue}>{st.value}</span>
              <p style={s.statLabel}>{st.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Districts ── */}
      <div id="districts" style={s.section}>
        <h2 style={s.sectionTitle}>🗺️ All 30 Districts of Odisha</h2>
        <p style={s.sectionSub}>
          Click any district to view its real-time civic dashboard. Data refreshes every 5–30 minutes
          from official portals.
        </p>

        <div style={s.districtGrid}>
          {DISTRICTS.map((d) => (
            <a
              key={d.name}
              href={`/odisha/${d.name.toLowerCase().replace(/\s/g, "-")}`}
              style={s.districtCard}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: "1.4rem" }}>{d.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{d.name}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: isDark ? "#94a3b8" : "#64748b", margin: 0, lineHeight: 1.5 }}>
                {d.tag}
              </p>
            </a>
          ))}
        </div>

        <p style={{
          marginTop: 20,
          fontSize: "0.78rem",
          color: isDark ? "#64748b" : "#94a3b8",
          textAlign: "center",
        }}>
          * District dashboards go live progressively. Vote for your district below.
        </p>
      </div>

      {/* ── Modules ── */}
      <div id="modules" style={{
        background: isDark ? "#1e2839" : "#f8fafc",
        borderTop: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
        borderBottom: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      }}>
        <div style={s.section}>
          <h2 style={s.sectionTitle}>📊 29 Dashboard Modules</h2>
          <p style={s.sectionSub}>
            Every district gets the same comprehensive set of civic dashboards — from live crop prices
            to budget transparency to Gram Panchayat records.
          </p>

          <div style={s.tabBar}>
            {MODULES.map((m, i) => (
              <button
                key={m.category}
                style={s.tab(activeTab === i)}
                onClick={() => setActiveTab(i)}
              >
                {m.category}
              </button>
            ))}
          </div>

          <div style={s.moduleGrid}>
            {MODULES[activeTab].items.map((item) => (
              <div
                key={item.name}
                style={s.moduleCard(
                  MODULES[activeTab].color,
                  MODULES[activeTab].bg
                )}
              >
                <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                <span style={{ fontWeight: 500 }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Extra Features (Dodisha-specific) ── */}
      <div style={s.section}>
        <h2 style={s.sectionTitle}>🌟 What Makes Dodisha Different</h2>
        <p style={s.sectionSub}>
          Built specifically for Odisha with features that go beyond data aggregation.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {[
            {
              icon: "🌊", title: "Cyclone & Flood Tracker",
              desc: "Real-time alerts from IMD and Odisha SDMA — critical for a cyclone-prone coast.",
            },
            {
              icon: "🌾", title: "Kharif & Rabi Crop Calendar",
              desc: "Odisha-specific crop cycle, MSP updates, and APMC mandi prices from eNAM.",
            },
            {
              icon: "🛕", title: "Heritage & Tourism Index",
              desc: "ASI-listed monuments, temple trusts, and tourism board data in one place.",
            },
            {
              icon: "🐘", title: "Wildlife & Forest Watch",
              desc: "Elephant corridor alerts, forest fire maps, and Simlipal reserve updates.",
            },
            {
              icon: "🏗️", title: "PMGSY & Infrastructure Tracker",
              desc: "Road construction, bridge, and PMGSY project status per district.",
            },
            {
              icon: "🎓", title: "Scholarship & Education Board",
              desc: "PRERANA, post-matric SC/ST scholarships, and BSE/CHSE result archives.",
            },
          ].map((f) => (
            <div key={f.title} style={{
              background: isDark ? "#273142" : "#fff",
              border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
              borderRadius: 14,
              padding: "20px",
              display: "flex",
              gap: 14,
            }}>
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{f.icon}</span>
              <div>
                <p style={{ fontWeight: 700, marginBottom: 4, fontSize: "0.95rem" }}>{f.title}</p>
                <p style={{ fontSize: "0.82rem", color: isDark ? "#94a3b8" : "#64748b", margin: 0, lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transparency & Legal ── */}
      <div id="legal" style={{
        background: isDark ? "#1e2839" : "#f8fafc",
        borderTop: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
        borderBottom: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
      }}>
        <div style={s.section}>
          <h2 style={s.sectionTitle}>⚖️ Transparency & Legal Safeguards</h2>
          <p style={s.sectionSub}>
            We take legal clarity seriously. Here is exactly how we handle data, attribution, and your rights.
          </p>

          <div style={s.legalGrid}>
            {LEGAL_FEATURES.map((lf) => (
              <div key={lf.title} style={s.legalCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: "1.5rem" }}>{lf.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{lf.title}</span>
                </div>
                <p style={{ fontSize: "0.83rem", color: isDark ? "#94a3b8" : "#64748b", margin: 0, lineHeight: 1.7 }}>
                  {lf.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Full disclaimer box */}
          <div style={{ ...s.disclaimerBox, marginTop: 32 }}>
            <p style={{
              fontWeight: 700,
              fontSize: "0.88rem",
              marginBottom: 10,
              color: isDark ? "#fde047" : "#854d0e",
            }}>
              ⚠️ Important Disclaimer
            </p>
            <p style={{
              fontSize: "0.8rem",
              color: isDark ? "#d1d5db" : "#713f12",
              margin: 0,
              lineHeight: 1.8,
            }}>
              Dodisha is an independent, non-commercial, citizen-built platform. It is{" "}
              <strong>not</strong> affiliated with, sponsored by, or representative of the Government
              of Odisha, the Government of India, or any public authority. All data displayed is
              sourced from publicly accessible official portals and is provided "as-is" without any
              warranty of accuracy, completeness, or fitness for a particular purpose. Users must
              independently verify all information before making any legal, financial, medical, or
              administrative decisions. Dodisha assumes no liability for decisions made based on
              information displayed on this platform. Government data is reproduced under India's
              Open Data Policy (NDSAP) for non-commercial, public-interest informational purposes
              only. All third-party trademarks, logos, and government seals remain the property of
              their respective owners.
            </p>
          </div>
        </div>
      </div>

      {/* ── Contribute ── */}
      <div id="contribute" style={s.section}>
        <h2 style={s.sectionTitle}>🤝 Join the Movement</h2>
        <p style={s.sectionSub}>
          Dodisha is powered by volunteers, developers, and citizens who care about Odisha.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}>
          {[
            { icon: "💻", title: "Contribute Code", link: "#", cta: "View on GitHub" },
            { icon: "🗳️", title: "Vote on Features", link: "#", cta: "Feature Roadmap" },
            { icon: "📍", title: "Vote Your District", link: "#", cta: "Add My District" },
            { icon: "💬", title: "Share Feedback", link: "#", cta: "Give Feedback" },
            { icon: "💰", title: "Support the Project", link: "#", cta: "Contribute ₹" },
          ].map((c) => (
            <div key={c.title} style={{
              background: isDark ? "#273142" : "#fff",
              border: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
              borderRadius: 14,
              padding: "24px 20px",
              textAlign: "center",
            }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: 10 }}>{c.icon}</span>
              <p style={{ fontWeight: 700, marginBottom: 12, fontSize: "0.95rem" }}>{c.title}</p>
              <a href={c.link} style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                color: "#fff",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
              }}>
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 32,
            marginBottom: 32,
          }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: "1.1rem", color: "#3b82f6", marginBottom: 8 }}>
                🏛️ Dodisha
              </p>
              <p style={{ fontSize: "0.82rem", color: isDark ? "#64748b" : "#94a3b8", lineHeight: 1.7 }}>
                Civic transparency for Odisha.
                Built with ❤️ by citizens, for citizens.
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 10, fontSize: "0.875rem" }}>Platform</p>
              {["Districts", "Modules", "Data Sources", "API"].map((l) => (
                <a key={l} href="#" style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: isDark ? "#64748b" : "#94a3b8",
                  marginBottom: 6,
                  textDecoration: "none",
                }}>{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 10, fontSize: "0.875rem" }}>Community</p>
              {["Contribute", "Feature Requests", "Vote District", "Feedback"].map((l) => (
                <a key={l} href="#" style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: isDark ? "#64748b" : "#94a3b8",
                  marginBottom: 6,
                  textDecoration: "none",
                }}>{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 10, fontSize: "0.875rem" }}>Legal</p>
              {["Disclaimer", "Privacy Policy", "Data Attribution", "Open Data License", "Terms of Use"].map((l) => (
                <a key={l} href="#" style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: isDark ? "#64748b" : "#94a3b8",
                  marginBottom: 6,
                  textDecoration: "none",
                }}>{l}</a>
              ))}
            </div>
          </div>

          <div style={{
            borderTop: isDark ? "1px solid #323d4e" : "1px solid #e2e8f0",
            paddingTop: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}>
            <p style={{ fontSize: "0.78rem", color: isDark ? "#475569" : "#94a3b8", margin: 0 }}>
              © {new Date().getFullYear()} Dodisha. Open-source under MIT License.
              Not affiliated with any government body.
            </p>
            <p style={{ fontSize: "0.78rem", color: isDark ? "#475569" : "#94a3b8", margin: 0, maxWidth: 500, textAlign: "right" }}>
              Data reproduced from official govt portals under{" "}
              <strong>NDSAP</strong> & <strong>RTI Act 2005</strong> for
              non-commercial public-interest use. Accuracy not guaranteed — verify
              critical information from official sources.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
