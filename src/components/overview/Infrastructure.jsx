"use client";

const TYPE_COLORS = {
  Urban:         { bg: "#eff6ff", text: "#1d4ed8", bdr: "#bfdbfe" },
  Roads:         { bg: "#f0fdf4", text: "#166534", bdr: "#bbf7d0" },
  "Flood Control":{ bg: "#fff7ed", text: "#9a3412", bdr: "#fed7aa" },
  Health:        { bg: "#fdf4ff", text: "#7e22ce", bdr: "#e9d5ff" },
  Education:     { bg: "#fffbeb", text: "#92400e", bdr: "#fde68a" },
  Rail:          { bg: "#f0f9ff", text: "#0c4a6e", bdr: "#bae6fd" },
  Default:       { bg: "#f8fafc", text: "#475569", bdr: "#e2e8f0" },
};

function statusStyle(status, isDark) {
  if (status === "On Track")  return { color: "#059669", bg: isDark ? "#052e16" : "#dcfce7" };
  if (status === "Delayed")   return { color: "#dc2626", bg: isDark ? "#450a0a" : "#fee2e2" };
  if (status === "Completed") return { color: "#0891b2", bg: isDark ? "#0c1a2e" : "#e0f2fe" };
  return { color: "#64748b", bg: isDark ? "#1e2839" : "#f1f5f9" };
}

export default function Infrastructure({ projects, isDark }) {
  const c = {
    card:  isDark ? "#1e2839" : "#ffffff",
    bdr:   isDark ? "#252f3f" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
    track: isDark ? "#273142" : "#f1f5f9",
  };

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>🏗️ Infrastructure Tracker</h2>
        <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: c.muted }}>Active projects · budget · completion status</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((p, i) => {
          const typeStyle = TYPE_COLORS[p.type] || TYPE_COLORS.Default;
          const st = statusStyle(p.status, isDark);
          const barColor = p.status === "Delayed" ? "#dc2626" : p.progress > 75 ? "#059669" : "#3b82f6";

          return (
            <div key={i} style={{ border: `1px solid ${c.bdr}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: c.text, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, background: isDark ? "#273142" : typeStyle.bg, color: isDark ? "#94a3b8" : typeStyle.text, borderRadius: 4, padding: "2px 7px", border: `1px solid ${isDark ? "#334155" : typeStyle.bdr}` }}>
                      {p.type}
                    </span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, background: st.bg, color: st.color, borderRadius: 4, padding: "2px 7px" }}>
                      {p.status}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 800, color: c.text }}>{p.budget}</div>
                  <div style={{ fontSize: "0.65rem", color: c.muted }}>📅 {p.deadline}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 6, background: c.track, borderRadius: 99 }}>
                  <div style={{ height: "100%", width: `${p.progress}%`, background: barColor, borderRadius: 99, transition: "width 0.6s" }} />
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: barColor, minWidth: 32 }}>{p.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ margin: "14px 0 0", fontSize: "0.65rem", color: c.muted, borderTop: `1px solid ${c.bdr}`, paddingTop: 10 }}>
        Source: PMGSY dashboard · Smart City Mission portal · State PWD · Updated monthly
      </p>
    </div>
  );
}
