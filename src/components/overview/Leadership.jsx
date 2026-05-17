"use client";

const PARTY_COLORS = {
  BJP: { bg: "#fff7ed", text: "#9a3412", bdr: "#fed7aa" },
  INC: { bg: "#eff6ff", text: "#1d4ed8", bdr: "#bfdbfe" },
  BJD: { bg: "#fdf4ff", text: "#7e22ce", bdr: "#e9d5ff" },
  AAP: { bg: "#f0fdf4", text: "#166534", bdr: "#bbf7d0" },
};

function Avatar({ name, size = 44, isDark }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("");
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: isDark ? "#273142" : "#e8f0fe",
      color: "#1e40af", fontWeight: 800,
      fontSize: size * 0.35,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, border: "2px solid #bfdbfe",
    }}>
      {initials}
    </div>
  );
}

function PersonCard({ name, role, party, sub, isDark }) {
  const c = {
    card:  isDark ? "#273142" : "#f8fafc",
    bdr:   isDark ? "#334155" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
  };
  const pc = party ? (PARTY_COLORS[party] || PARTY_COLORS.BJP) : null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 10, padding: "12px 14px" }}>
      <Avatar name={name} isDark={isDark} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: "0.83rem", color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ fontSize: "0.7rem", color: c.muted, marginTop: 2 }}>{role}</div>
        <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
          {party && (
            <span style={{ fontSize: "0.6rem", fontWeight: 700, background: isDark ? "#1e2839" : pc.bg, color: isDark ? "#94a3b8" : pc.text, border: `1px solid ${isDark ? "#334155" : pc.bdr}`, borderRadius: 4, padding: "1px 6px" }}>
              {party}
            </span>
          )}
          {sub && <span style={{ fontSize: "0.6rem", color: c.muted }}>{sub}</span>}
        </div>
      </div>
    </div>
  );
}

export default function Leadership({ data, name, isDark }) {
  const c = {
    card:  isDark ? "#1e2839" : "#ffffff",
    bdr:   isDark ? "#252f3f" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
    sec:   isDark ? "#64748b" : "#94a3b8",
  };

  if (!data) return null;

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>👥 Leadership & Governance</h2>
        <p style={{ margin: "3px 0 0", fontSize: "0.75rem", color: c.muted }}>{name} district administration</p>
      </div>

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.sec, margin: "0 0 8px" }}>Administration</p>
        <PersonCard name={data.collector.name} role={data.collector.designation} sub={`Since ${data.collector.since}`} isDark={isDark} />
      </div>

      {data.mla?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.sec, margin: "0 0 8px" }}>Members of Legislative Assembly</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.mla.map((m) => (
              <PersonCard key={m.name} name={m.name} role={`MLA · ${m.constituency}`} party={m.party} sub={`Since ${m.since}`} isDark={isDark} />
            ))}
          </div>
        </div>
      )}

      {data.mp && (
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.sec, margin: "0 0 8px" }}>Parliament</p>
          <PersonCard name={data.mp.name} role={data.mp.constituency} party={data.mp.party} sub={`Since ${data.mp.since}`} isDark={isDark} />
        </div>
      )}

      <p style={{ margin: "14px 0 0", fontSize: "0.65rem", color: c.muted, borderTop: `1px solid ${c.bdr}`, paddingTop: 10 }}>
        Source: Election Commission of India · Odisha government directory · ADR MyNeta
      </p>
    </div>
  );
}
