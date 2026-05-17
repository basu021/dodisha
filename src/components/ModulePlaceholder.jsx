"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const MODULE_META = {
  "my-responsibility":  { icon: "🌱", title: "My Responsibility",   desc: "Your civic duties, rights, and how to engage with local governance." },
  "leadership":         { icon: "👥", title: "Leadership",           desc: "Elected representatives, officials, and their contact details for this district." },
  "finance-budget":     { icon: "💰", title: "Finance & Budget",     desc: "District budget allocations, expenditure reports, and financial transparency data." },
  "infrastructure":     { icon: "🏗️", title: "Infrastructure",       desc: "Roads, bridges, buildings, and public works project status." },
  "govt-tenders":       { icon: "📑", title: "Govt. Tenders",        desc: "Active tenders, awarded contracts, and project completion status." },
  "local-industries":   { icon: "🏭", title: "Local Industries",     desc: "Major industries, employment data, and industrial zone information." },
  "water-supply":       { icon: "💧", title: "Water Supply (JJM)",   desc: "Jal Jeevan Mission progress, household connections, and water quality reports." },
  "power-outages":      { icon: "⚡", title: "Power & Outages",      desc: "Live power supply status, outage reports, and electrification data." },
  "transport":          { icon: "🚌", title: "Transport",            desc: "Bus routes, rail connectivity, and local transport infrastructure." },
  "health":             { icon: "🏥", title: "Health",               desc: "Hospitals, PHCs, health schemes, and district health statistics." },
  "schools":            { icon: "🎓", title: "Schools",              desc: "Government schools, enrollment data, and education outcomes." },
  "housing-schemes":    { icon: "🏠", title: "Housing Schemes",      desc: "PMAY beneficiary lists, construction progress, and housing allocation data." },
  "police-traffic":     { icon: "👮", title: "Police & Traffic",     desc: "Police stations, crime statistics, and traffic management data." },
  "courts":             { icon: "⚖️", title: "Courts",              desc: "District court listings, pending case data, and legal aid services." },
  "file-rti":           { icon: "📜", title: "File RTI",             desc: "Step-by-step guide to filing RTI applications for this district." },
  "rti-tracker":        { icon: "🏛️", title: "RTI Tracker",          desc: "Track submitted RTI applications and response timelines." },
  "contributors":       { icon: "🤝", title: "Contributors",         desc: "People and organisations who support and contribute to this district's data." },
  "govt-schemes":       { icon: "📋", title: "Gov. Schemes",         desc: "Central and state government schemes active in this district." },
  "services-guide":     { icon: "📋", title: "Services Guide",       desc: "How to access government services — certificates, licences, and more." },
  "exams-jobs":         { icon: "📝", title: "Exams & Jobs",         desc: "Government job notifications, exam schedules, and employment exchange data." },
  "elections":          { icon: "📊", title: "Elections",            desc: "Voter turnout, constituency data, and election results history." },
  "famous-people":      { icon: "🌟", title: "Famous People",        desc: "Notable personalities from this district across arts, sports, politics, and science." },
  "local-alerts":       { icon: "⚠️", title: "Local Alerts",         desc: "Live alerts — cyclone, flood, fire, and civic emergency notices." },
  "offices-services":   { icon: "🏢", title: "Offices & Services",   desc: "Government office addresses, phone numbers, and working hours." },
  "citizen-corner":     { icon: "🤝", title: "Citizen Corner",       desc: "Community notices, public hearings, and citizen feedback." },
  "news":               { icon: "📰", title: "News & Updates",       desc: "Latest district news aggregated from verified local sources." },
  "data-sources":       { icon: "🔗", title: "Data Sources",         desc: "All data sources used for this district — fully attributed and linked." },
  "update-log":         { icon: "🕒", title: "Update Log",           desc: "When each data module was last updated and from which source." },
  "map":                { icon: "🗺️", title: "Interactive Map",      desc: "District boundary map with block, GP, and infrastructure overlays." },
  "population":         { icon: "📈", title: "Population",           desc: "Census data, demographic breakdown, and population trends." },
  "weather":            { icon: "🌦️", title: "Weather & Rainfall",   desc: "Live weather from IMD and historical rainfall pattern data." },
  "crop-prices":        { icon: "🌾", title: "Crop Prices",          desc: "Live APMC mandi prices for major crops from eNAM and state portals." },
  "gram-panchayat":     { icon: "🏘️", title: "Gram Panchayat",       desc: "GP-level expenditure, MGNREGA works, and local governance data." },
  "farm-advisory":      { icon: "🌾", title: "Farm Advisory",        desc: "Kharif and Rabi crop calendar, soil health, and agri-extension advice." },
  "water-dams":         { icon: "🚰", title: "Water & Dams",         desc: "Reservoir levels, dam capacity, and irrigation data." },
};

function formatSlug(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function ModulePlaceholder({ district, module: mod }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") || "light")
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === "dark";
  const meta = MODULE_META[mod] || { icon: "📊", title: formatSlug(mod), desc: "This module is being built." };
  const districtName = formatSlug(district);
  const base = `/odisha/${district}`;

  const bg    = isDark ? "#1b2431" : "#f8fafc";
  const card  = isDark ? "#273142" : "#ffffff";
  const bdr   = isDark ? "#323d4e" : "#e5e7eb";
  const text  = isDark ? "#f1f5f9" : "#111827";
  const muted = isDark ? "#94a3b8" : "#6b7280";

  return (
    <div style={{ background: bg, minHeight: "100%", color: text, fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        background: isDark ? "#273142" : "#fff",
        borderBottom: `1px solid ${bdr}`,
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.4rem" }}>{meta.icon}</span>
            <h1 style={{ fontWeight: 800, fontSize: "1.2rem", margin: 0, letterSpacing: "-0.3px" }}>
              {meta.title}
            </h1>
          </div>
          <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: muted }}>
            {districtName} District · Odisha
          </p>
        </div>
        <span style={{
          background: isDark ? "#1e2839" : "#fef3c7",
          color: isDark ? "#fbbf24" : "#92400e",
          borderRadius: 6,
          padding: "4px 12px",
          fontSize: "0.72rem",
          fontWeight: 700,
        }}>
          🏗️ Coming Soon
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 28px", maxWidth: 720 }}>
        {/* Module description card */}
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: muted, margin: 0 }}>
            {meta.desc}
          </p>
        </div>

        {/* What's coming */}
        <div style={{ background: card, border: `1px solid ${bdr}`, borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
          <h2 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 16 }}>📋 What will be here</h2>
          <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Real-time data sourced from official Odisha government portals",
              "Historical trend charts with 5-year comparisons",
              "Block and GP-level drill-down views",
              "Direct source links — every number is traceable",
              "Download as CSV / JSON for research use",
            ].map((item) => (
              <li key={item} style={{ fontSize: "0.83rem", color: muted, lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div style={{
          background: isDark ? "#1e3a5f" : "#eff6ff",
          border: `1px solid ${isDark ? "#1e4d8c" : "#bfdbfe"}`,
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", margin: "0 0 4px", color: isDark ? "#93c5fd" : "#1d4ed8" }}>
              🗳️ Speed up this module
            </p>
            <p style={{ fontSize: "0.78rem", color: isDark ? "#60a5fa" : "#3b82f6", margin: 0 }}>
              Vote to prioritise {meta.title} for {districtName}
            </p>
          </div>
          <Link href="/vote" style={{
            background: "#3b82f6",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 18px",
            fontSize: "0.82rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Vote →
          </Link>
        </div>

        <p style={{ marginTop: 20, fontSize: "0.72rem", color: isDark ? "#334155" : "#cbd5e1", lineHeight: 1.6 }}>
          ⚖️ All data will be sourced from publicly available government portals under NDSAP and RTI Act 2005.
          Dodisha is not affiliated with the Government of Odisha.
        </p>
      </div>
    </div>
  );
}
