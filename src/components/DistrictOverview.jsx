"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import OdishaMap        from "@/components/overview/OdishaMap";
import { WeatherCard, DamCard, CropCard, AlertCard, SchemeCard } from "@/components/overview/LiveData";
import ScoreBoard      from "@/components/overview/ScoreBoard";
import Infrastructure   from "@/components/overview/Infrastructure";
import Leadership       from "@/components/overview/Leadership";
import NewsIntel        from "@/components/overview/NewsIntel";
import AIAssistant      from "@/components/overview/AIAssistant";
import { getDistrictData, ODISHA_STATE } from "@/data/odishaDistricts";

function formatName(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ── Stat chip ── */
function StatChip({ label, value, isDark }) {
  return (
    <div style={{
      background: isDark ? "#273142" : "#f8fafc",
      border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      borderRadius: 8, padding: "10px 16px", textAlign: "center",
    }}>
      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: isDark ? "#f1f5f9" : "#0f172a" }}>{value}</div>
      <div style={{ fontSize: "0.65rem", color: isDark ? "#64748b" : "#94a3b8", marginTop: 2, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

/* ── Section heading ── */
function SectionHeading({ title, sub, isDark }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1.05rem", color: isDark ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.3px" }}>{title}</h2>
      {sub && <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: isDark ? "#64748b" : "#94a3b8" }}>{sub}</p>}
    </div>
  );
}

/* ── Trend chart ── */
function MiniTrend({ data, dataKey, label, color, isDark }) {
  const c = { card: isDark ? "#1e2839" : "#fff", bdr: isDark ? "#252f3f" : "#e2e8f0", text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8" };
  const latest = data[data.length - 1]?.[dataKey];
  const prev   = data[data.length - 2]?.[dataKey];
  const change = prev ? (((latest - prev) / prev) * 100).toFixed(1) : null;

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: c.muted }}>{label}</span>
        {change && <span style={{ fontSize: "0.7rem", fontWeight: 700, color: parseFloat(change) >= 0 ? "#059669" : "#dc2626" }}>
          {parseFloat(change) >= 0 ? "▲" : "▼"} {Math.abs(change)}%
        </span>}
      </div>
      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: color, marginBottom: 10, lineHeight: 1 }}>{latest}</div>
      <div style={{ height: 48 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.18} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" hide />
            <Tooltip contentStyle={{ fontSize: "0.7rem", padding: "4px 8px", borderRadius: 6 }} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function DistrictOverview({ district }) {
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
  const name   = formatName(district);
  const data   = getDistrictData(district);

  /* ── Colour tokens ── */
  const C = {
    page:   isDark ? "#111827" : "#f0f4f8",
    card:   isDark ? "#1e2839" : "#ffffff",
    bdr:    isDark ? "#1f2937" : "#e2e8f0",
    text:   isDark ? "#f1f5f9" : "#0f172a",
    muted:  isDark ? "#64748b" : "#94a3b8",
    hero:   isDark ? "#161f2e" : "#ffffff",
    heroBdr:isDark ? "#1f2937" : "#e2e8f0",
    sub:    isDark ? "#273142" : "#f1f5f9",
  };

  const section = { marginBottom: 28 };
  const grid2   = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 };
  const grid3   = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 };

  return (
    <div style={{ background: C.page, minHeight: "100vh", color: C.text, fontFamily: "'Inter',sans-serif" }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <div style={{ background: C.hero, borderBottom: `1px solid ${C.heroBdr}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 28px 0" }}>

          {/* Breadcrumb + live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: C.muted, marginBottom: 20 }}>
            <a href="/" style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "none" }}>Dodisha</a>
            <span>›</span>
            <span style={{ color: C.muted }}>Odisha</span>
            <span>›</span>
            <span style={{ fontWeight: 600, color: C.text }}>{name}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669", display: "inline-block" }} />
              <span style={{ color: "#059669", fontWeight: 600 }}>Live</span>
            </span>
          </div>

          {/* ① District name + Odia script */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 6 }}>
            <h1 style={{
              margin: 0,
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-1.5px",
              color: C.text,
              lineHeight: 1,
            }}>
              {name}
            </h1>
            <span style={{
              fontSize: "1.3rem",
              color: C.muted,
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}>
              {data.odia}
            </span>
          </div>

          {/* ② Tagline */}
          <p style={{
            margin: "0 0 18px",
            fontSize: "1rem",
            color: isDark ? "#94a3b8" : "#64748b",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}>
            "{data.tagline}" &mdash; Odisha, India
          </p>

          {/* ③ Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {data.tags.map(t => (
              <span key={t} style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                background: isDark ? "#1e2839" : "#f1f5f9",
                border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                borderRadius: 6,
                padding: "4px 12px",
                color: isDark ? "#94a3b8" : "#374151",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* ④ Awards */}
          {data.awards?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
              {data.awards.map(a => (
                <span key={a} style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: isDark ? "#1c2a1c" : "#f0fdf4",
                  border: `1px solid ${isDark ? "#14532d" : "#bbf7d0"}`,
                  borderRadius: 6,
                  padding: "4px 12px",
                  color: isDark ? "#4ade80" : "#166534",
                }}>
                  {a}
                </span>
              ))}
            </div>
          )}

          {/* ⑤ Stats strip — key metrics */}
          <div style={{ borderTop: `1px solid ${C.heroBdr}`, display: "flex", flexWrap: "wrap" }}>
            {[
              { icon: "👥", label: "Population",   value: data.pop },
              { icon: "📐", label: "Total Area",    value: data.area },
              { icon: "📚", label: "Literacy Rate", value: data.lit },
              { icon: "📊", label: "Dev Index",     value: `${data.devScore}/100` },
            ].map(({ icon, label, value }, i, arr) => (
              <div key={label} style={{
                flex: "1 1 140px", padding: "14px 20px",
                borderRight: i < arr.length - 1 ? `1px solid ${C.heroBdr}` : "none",
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                <span style={{ fontSize: "0.65rem", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {icon} {label}
                </span>
                <span style={{
                  fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.3px", lineHeight: 1.2,
                  color: label === "Dev Index" ? (data.devScore >= 70 ? "#059669" : "#d97706") : C.text,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ⑥ Admin units strip */}
          <div style={{ borderTop: `1px solid ${C.heroBdr}`, display: "flex", flexWrap: "wrap", background: isDark ? "#161f2e" : "#fafbfc" }}>
            {[
              { icon: "🗂️", label: "Subdivisions",        value: data.subdivisions ?? "—" },
              { icon: "🏘️", label: "Blocks",              value: data.blocks ?? "—" },
              { icon: "📋", label: "Tahasils",            value: data.tehsils ?? "—" },
              { icon: "🚔", label: "Police Stations",     value: data.policeStations ?? "—" },
              { icon: "🗳️", label: "Gram Panchayats",     value: data.gps?.toLocaleString() ?? "—" },
              { icon: "🏙️", label: "Municipalities",      value: data.municipalities ?? "—" },
              { icon: "🏛️", label: "NACs",                value: data.nacs ?? "—" },
              { icon: "🏢", label: "Municipal Corps",     value: data.municipalCorps ?? "—" },
            ].map(({ icon, label, value }, i, arr) => (
              <div key={label} style={{
                flex: "1 1 100px", padding: "10px 16px",
                borderRight: i < arr.length - 1 ? `1px solid ${C.heroBdr}` : "none",
                display: "flex", flexDirection: "column", gap: 1,
              }}>
                <span style={{ fontSize: "0.6rem", color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {icon} {label}
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: C.text, letterSpacing: "-0.2px", lineHeight: 1.3 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ BODY ══════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 28px 48px" }}>

        {/* ── Trend charts ── */}
        <div style={{ ...section, ...grid2 }}>
          <MiniTrend data={data.population_trend} dataKey="pop" label="Population (Millions)" color="#3b82f6" isDark={isDark} />
          <MiniTrend data={data.budget_trend}     dataKey="alloc" label="Budget Allocation (₹ Cr)" color="#0891b2" isDark={isDark} />
        </div>

        {/* ── Map ── */}
        <div style={{ ...section }}>
          <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <SectionHeading title="📍 District on Odisha Map" sub="Click any district dot to navigate · Hover for name" isDark={isDark} />
            <OdishaMap activeDistrict={district} isDark={isDark} />
          </div>
        </div>

        {/* ── Score Board ── */}
        <div style={{ ...section }}>
          <ScoreBoard scores={data.scores} isDark={isDark} />
        </div>

        {/* ── Live data row ── */}
        <div style={{ ...section }}>
          <SectionHeading title="⚡ Live District Intelligence" sub="Real-time data from official portals · Auto-refreshes every 5–30 min" isDark={isDark} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
            <WeatherCard data={data.weather}   isDark={isDark} />
            <DamCard     dams={data.dams}      isDark={isDark} />
            <CropCard    crops={data.crops}    isDark={isDark} />
            <AlertCard   alerts={data.alerts}  isDark={isDark} />
            <SchemeCard  schemes={data.schemes} isDark={isDark} />
          </div>
        </div>

        {/* ── Infrastructure + Leadership ── */}
        <div style={{ ...section, ...grid2 }}>
          <Infrastructure projects={data.infra}       isDark={isDark} />
          <Leadership      data={data.leadership} name={name} isDark={isDark} />
        </div>

        {/* ── News + AI ── */}
        <div style={{ ...section, ...grid2 }}>
          <NewsIntel  news={data.news} name={name} isDark={isDark} />
          <AIAssistant name={name}               isDark={isDark} />
        </div>

        {/* ── Data attribution footer ── */}
        <div style={{
          background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 14,
          padding: "20px 24px", marginTop: 8,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: "0.72rem", color: C.muted, lineHeight: 1.7, maxWidth: 600 }}>
              ⚖️ All data sourced from publicly available government portals — census.gov.in, pfms.nic.in, enam.gov.in, imd.gov.in, OSDMA, and Odisha DISHA portal — under India's Open Data Policy (NDSAP) and RTI Act 2005.
              Dodisha is an independent civic platform, <strong>not affiliated with</strong> the Government of Odisha.
              Data accuracy depends on source portals. Verify critical information from official sources.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["About", "Disclaimer", "Data Sources", "Contribute"].map(l => (
                <a key={l} href="#" style={{ fontSize: "0.7rem", color: "#3b82f6", textDecoration: "none", fontWeight: 500 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
