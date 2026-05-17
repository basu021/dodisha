"use client";

const CAT_STYLE = {
  Infrastructure: { bg: "#eff6ff", text: "#1d4ed8" },
  Health:         { bg: "#fdf4ff", text: "#7e22ce" },
  Flood:          { bg: "#fff7ed", text: "#9a3412" },
  Politics:       { bg: "#fef2f2", text: "#991b1b" },
  Economy:        { bg: "#f0fdf4", text: "#166534" },
  Governance:     { bg: "#fffbeb", text: "#92400e" },
  Education:      { bg: "#f8fafc", text: "#475569" },
};

export default function NewsIntel({ news, name, isDark }) {
  const c = {
    card:  isDark ? "#1e2839" : "#ffffff",
    bdr:   isDark ? "#252f3f" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
    row:   isDark ? "#273142" : "#f8fafc",
    rowBdr:isDark ? "#334155" : "#e2e8f0",
  };

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>📰 News Intelligence</h2>
          <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: c.muted }}>AI-categorised · {name} district feed</p>
        </div>
        <span style={{ fontSize: "0.65rem", background: isDark ? "#1e2839" : "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 4, padding: "3px 8px", fontWeight: 600 }}>
          AI Sorted
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {news.map((item, i) => {
          const cs = CAT_STYLE[item.category] || CAT_STYLE.Education;
          return (
            <div key={i} style={{
              borderBottom: i < news.length - 1 ? `1px solid ${c.rowBdr}` : "none",
              padding: "12px 0",
            }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
                <span style={{
                  fontSize: "0.6rem", fontWeight: 700,
                  background: isDark ? "#273142" : cs.bg,
                  color: isDark ? "#94a3b8" : cs.text,
                  borderRadius: 4, padding: "2px 6px",
                  flexShrink: 0,
                }}>
                  {item.category}
                </span>
                <span style={{ fontSize: "0.65rem", color: c.muted }}>{item.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.83rem", fontWeight: 600, color: c.text, lineHeight: 1.5 }}>{item.title}</p>
              <p style={{ margin: "3px 0 0", fontSize: "0.68rem", color: c.muted }}>📎 {item.source}</p>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10, borderTop: `1px solid ${c.bdr}`, paddingTop: 10 }}>
        <p style={{ margin: 0, fontSize: "0.65rem", color: c.muted }}>
          Stories aggregated from verified sources · Categorised by AI · Not editorially curated · Dodisha is not responsible for source content
        </p>
      </div>
    </div>
  );
}
