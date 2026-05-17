"use client";

function LiveBadge({ color = "#059669" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${color}18`, color, borderRadius: 4, padding: "2px 7px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, display: "inline-block", animation: "pulse 1.5s infinite" }} />
      LIVE
    </span>
  );
}

function CardShell({ title, icon, badge, children, isDark, accent = "#3b82f6" }) {
  const c = {
    card: isDark ? "#1e2839" : "#ffffff",
    bdr:  isDark ? "#252f3f" : "#e2e8f0",
    text: isDark ? "#f1f5f9" : "#0f172a",
    sub:  isDark ? "#64748b" : "#94a3b8",
  };
  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", borderTop: `3px solid ${accent}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "1.1rem" }}>{icon}</span>
          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: c.text }}>{title}</span>
        </div>
        {badge}
      </div>
      {children}
    </div>
  );
}

/* ── Weather ── */
function WeatherCard({ data, isDark }) {
  const c = { text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8", tag: isDark ? "#273142" : "#f1f5f9" };
  return (
    <CardShell title="Weather" icon="🌦️" accent="#0891b2" isDark={isDark} badge={<LiveBadge color="#0891b2" />}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: "2.4rem", fontWeight: 800, color: c.text, lineHeight: 1 }}>{data.temp}</span>
        <span style={{ fontSize: "0.8rem", color: c.muted }}>{data.condition}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px" }}>
        {[["💧 Humidity", data.humidity], ["🌬️ Wind", data.wind], ["🌧️ Rain", data.rain]].map(([label, val]) => (
          <div key={label}>
            <span style={{ fontSize: "0.7rem", color: c.muted }}>{label}</span>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: c.text, marginLeft: 4 }}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, background: isDark ? "#273142" : "#f8fafc", borderRadius: 6, padding: "6px 10px", fontSize: "0.72rem", color: c.muted }}>
        📍 {data.forecast}
      </div>
    </CardShell>
  );
}

/* ── Dams ── */
function DamCard({ dams, isDark }) {
  const c = { text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8", track: isDark ? "#273142" : "#f1f5f9" };
  return (
    <CardShell title="Dams & Reservoirs" icon="🚰" accent="#0891b2" isDark={isDark} badge={<LiveBadge color="#0891b2" />}>
      {dams.map((dam) => {
        const col = dam.level > 80 ? "#dc2626" : dam.level > 60 ? "#d97706" : "#059669";
        return (
          <div key={dam.name} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: c.text }}>{dam.name}</span>
              <span style={{ fontSize: "0.72rem", color: col, fontWeight: 700 }}>{dam.level}%</span>
            </div>
            <div style={{ height: 6, background: c.track, borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${dam.level}%`, background: col, borderRadius: 99 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              <span style={{ fontSize: "0.65rem", color: c.muted }}>{dam.capacity}</span>
              <span style={{ fontSize: "0.65rem", color: col }}>{dam.status}</span>
            </div>
          </div>
        );
      })}
    </CardShell>
  );
}

/* ── Mandi prices ── */
function CropCard({ crops, isDark }) {
  const c = { text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8", row: isDark ? "#273142" : "#f8fafc" };
  return (
    <CardShell title="Mandi Prices" icon="🌾" accent="#059669" isDark={isDark} badge={<LiveBadge color="#059669" />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {crops.map((crop) => (
          <div key={crop.crop} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: c.row, borderRadius: 6, padding: "6px 10px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: c.text }}>{crop.crop}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: c.text }}>{crop.price}</div>
              <div style={{ fontSize: "0.65rem", color: crop.trend === "up" ? "#059669" : "#dc2626", fontWeight: 600 }}>
                {crop.trend === "up" ? "▲" : "▼"} {crop.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ margin: "10px 0 0", fontSize: "0.65rem", color: c.muted }}>Source: eNAM · APMC Mandi · Updated every 30 min</p>
    </CardShell>
  );
}

/* ── Alerts ── */
function AlertCard({ alerts, isDark }) {
  const c = { text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8" };
  const levelColor = { Yellow: "#d97706", Orange: "#ea580c", Red: "#dc2626", Info: "#0891b2" };
  return (
    <CardShell title="District Alerts" icon="⚠️" accent="#d97706" isDark={isDark} badge={<span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#d97706" }}>{alerts.length} active</span>}>
      {alerts.length === 0 ? (
        <p style={{ color: "#059669", fontSize: "0.8rem", fontWeight: 600 }}>✅ No active alerts</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ borderLeft: `3px solid ${levelColor[a.level] || "#64748b"}`, paddingLeft: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: levelColor[a.level] }}>{a.type}</span>
                <span style={{ fontSize: "0.65rem", color: c.muted }}>{a.time}</span>
              </div>
              <p style={{ margin: "2px 0 0", fontSize: "0.73rem", color: c.text, lineHeight: 1.5 }}>{a.msg}</p>
            </div>
          ))}
        </div>
      )}
    </CardShell>
  );
}

/* ── Scheme utilisation ── */
function SchemeCard({ schemes, isDark }) {
  const c = { text: isDark ? "#f1f5f9" : "#0f172a", muted: isDark ? "#64748b" : "#94a3b8", track: isDark ? "#273142" : "#f1f5f9" };
  const items = [
    { label: "PMAY Housing", key: "pmay", icon: "🏠" },
    { label: "Jal Jeevan Mission", key: "jjm", icon: "💧" },
    { label: "PMGSY Roads", key: "pmgsy", icon: "🛣️" },
    { label: "Mid-Day Meal", key: "midday", icon: "🍱" },
    { label: "Ayushman Bharat", key: "ayushman", icon: "🏥" },
  ];
  return (
    <CardShell title="Scheme Utilisation" icon="📋" accent="#8b5cf6" isDark={isDark}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map(({ label, key, icon }) => {
          const val = schemes?.[key] ?? 0;
          const col = val >= 90 ? "#059669" : val >= 70 ? "#0891b2" : "#d97706";
          return (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: "0.73rem", color: c.text }}>{icon} {label}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: col }}>{val}%</span>
              </div>
              <div style={{ height: 4, background: c.track, borderRadius: 99 }}>
                <div style={{ height: "100%", width: `${val}%`, background: col, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ margin: "10px 0 0", fontSize: "0.65rem", color: c.muted }}>Source: PFMS · State DISHA portal · Updated monthly</p>
    </CardShell>
  );
}

export { WeatherCard, DamCard, CropCard, AlertCard, SchemeCard };
