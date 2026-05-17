"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const CATEGORIES = [
  { key: "governance",     label: "Governance",     icon: "🏛️" },
  { key: "education",      label: "Education",      icon: "🎓" },
  { key: "healthcare",     label: "Healthcare",     icon: "🏥" },
  { key: "infrastructure", label: "Infrastructure", icon: "🏗️" },
  { key: "water",          label: "Water Access",   icon: "💧" },
  { key: "economy",        label: "Economy",        icon: "💰" },
  { key: "safety",         label: "Safety",         icon: "👮" },
  { key: "agriculture",    label: "Agriculture",    icon: "🌾" },
  { key: "digital",        label: "Digital",        icon: "📱" },
  { key: "welfare",        label: "Welfare",        icon: "🤝" },
  { key: "environment",    label: "Environment",    icon: "🌿" },
  { key: "connectivity",   label: "Connectivity",   icon: "🚌" },
  { key: "livelihood",     label: "Livelihood",     icon: "💼" },
  { key: "sanitation",     label: "Sanitation",     icon: "🧹" },
];

function scoreColor(v) {
  if (v >= 80) return "#059669";
  if (v >= 65) return "#0891b2";
  if (v >= 50) return "#d97706";
  return "#dc2626";
}

function scoreLabel(v) {
  if (v >= 80) return "Excellent";
  if (v >= 65) return "Good";
  if (v >= 50) return "Average";
  return "Needs Attention";
}

export default function DevelopmentScore({ data, devScore, name, isDark }) {
  const c = {
    card:  isDark ? "#1e2839" : "#ffffff",
    bdr:   isDark ? "#252f3f" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
    bg:    isDark ? "#161f2e" : "#f8fafc",
    track: isDark ? "#1e2839" : "#f1f5f9",
  };

  const radialData = [{ name: "Score", value: devScore, fill: scoreColor(devScore) }];

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
        {/* Left: label */}
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>Development Index</h2>
          <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: c.muted }}>Composite score across 14 civic dimensions</p>
        </div>

        {/* Right: dial */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 80, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius={28} outerRadius={40} data={[{ value: devScore }]} startAngle={90} endAngle={90 - 3.6 * devScore}>
                <RadialBar dataKey="value" fill={scoreColor(devScore)} cornerRadius={4} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: "2rem", color: scoreColor(devScore), lineHeight: 1 }}>{devScore}</div>
            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: scoreColor(devScore), marginTop: 2 }}>{scoreLabel(devScore)}</div>
            <div style={{ fontSize: "0.65rem", color: c.muted, marginTop: 2 }}>of 100</div>
          </div>
        </div>
      </div>

      {/* Category bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CATEGORIES.map(({ key, label, icon }) => {
          const val = data?.[key] ?? 0;
          const col = scoreColor(val);
          return (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: "0.8rem" }}>{icon}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: c.text }}>{label}</span>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: col }}>{val}</span>
              </div>
              <div style={{ height: 5, background: c.track, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${val}%`, background: col, borderRadius: 99, transition: "width 0.6s ease" }} />
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ margin: "14px 0 0", fontSize: "0.65rem", color: c.muted, lineHeight: 1.6, borderTop: `1px solid ${c.bdr}`, paddingTop: 10 }}>
        Scores derived from official data: census, NITI Aayog SDG index, DISHA portal, and Odisha state dashboards. Updated quarterly.
      </p>
    </div>
  );
}
