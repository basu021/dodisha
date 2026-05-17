"use client";

const PARAMETERS = [
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

function scoreGrade(v) {
  if (v >= 80) return "A";
  if (v >= 65) return "B";
  if (v >= 50) return "C";
  return "D";
}

export default function ScoreBoard({ scores, isDark }) {
  const c = {
    card: isDark ? "#1e2839" : "#ffffff",
    bdr:  isDark ? "#252f3f" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    muted:isDark ? "#64748b" : "#94a3b8",
    tile: isDark ? "#273142" : "#f8fafc",
    tileBdr: isDark ? "#334155" : "#e2e8f0",
    track: isDark ? "#1e2839" : "#e2e8f0",
  };

  const avg = scores
    ? Math.round(PARAMETERS.reduce((s, p) => s + (scores[p.key] ?? 0), 0) / PARAMETERS.length * 10) / 10
    : 0;

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>📊 District Score Board</h2>
          <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: c.muted }}>14-parameter civic performance index · updated quarterly</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.65rem", color: c.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Composite avg</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: scoreColor(avg), lineHeight: 1 }}>{avg}</div>
          </div>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: scoreColor(avg),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.2rem", color: "#fff",
          }}>
            {scoreGrade(avg)}
          </div>
        </div>
      </div>

      {/* Tile grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 10,
      }}>
        {PARAMETERS.map(({ key, label, icon }) => {
          const val = scores?.[key] ?? 0;
          const col = scoreColor(val);
          return (
            <div key={key} style={{
              background: c.tile,
              border: `1px solid ${c.tileBdr}`,
              borderRadius: 10,
              padding: "14px 14px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{icon}</span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: c.muted, lineHeight: 1.3, marginTop: 2 }}>{label}</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 900, color: col, lineHeight: 1 }}>{val}</span>
                <span style={{ fontSize: "0.6rem", color: c.muted, fontWeight: 500 }}>/100</span>
              </div>
              {/* Bar */}
              <div style={{ height: 3, background: c.track, borderRadius: 99, marginTop: 4 }}>
                <div style={{ height: "100%", width: `${val}%`, background: col, borderRadius: 99, transition: "width 0.8s ease" }} />
              </div>
              {/* Grade badge */}
              <span style={{
                alignSelf: "flex-start",
                fontSize: "0.55rem", fontWeight: 800,
                background: col + "20",
                color: col,
                borderRadius: 4,
                padding: "1px 5px",
                marginTop: 2,
                letterSpacing: "0.04em",
              }}>
                Grade {scoreGrade(val)}
              </span>
            </div>
          );
        })}
      </div>

      <p style={{ margin: "14px 0 0", fontSize: "0.65rem", color: c.muted, lineHeight: 1.6, borderTop: `1px solid ${c.bdr}`, paddingTop: 10 }}>
        Scores derived from NITI Aayog SDG index, DISHA portal, Census data, and Odisha state dashboards. Grades: A ≥80 · B ≥65 · C ≥50 · D &lt;50.
      </p>
    </div>
  );
}
