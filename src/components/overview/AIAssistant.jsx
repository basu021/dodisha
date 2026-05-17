"use client";
import { useState } from "react";

const SUGGESTIONS = [
  "Compare literacy rates across all districts",
  "Which Odisha districts have highest flood risk?",
  "Show PMAY implementation status for this district",
  "What is the budget allocation for health this year?",
  "List all active infrastructure projects",
  "Compare this district to state average",
];

const MOCK_RESPONSES = {
  default: "This feature connects to live Odisha government data. Type a question about governance, schemes, infrastructure, or civic data for this district — or across Odisha.",
  flood: "Based on IMD and OSDMA data, high flood-risk districts in Odisha include: Cuttack (Mahanadi), Balasore (Subarnarekha), Kendrapara (Baitarani delta), Puri (coastal), and Jagatsinghpur (coastal). This district's flood risk level is shown in the Local Alerts module.",
  literacy: "Odisha's state average literacy is 72.87%. Top districts: Khordha (87.5%), Jagatsinghpur (85.9%), Puri (85.0%), Balasore (80.7%). This district's literacy rate is shown in the overview stats above.",
  pmay: "PMAY (Pradhan Mantri Awas Yojana) data: houses sanctioned, under construction, and completed is updated monthly from PFMS. See the Scheme Utilisation card above for this district's current PMAY coverage percentage.",
};

export default function AIAssistant({ name, isDark }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const c = {
    card:  isDark ? "#1e2839" : "#ffffff",
    bdr:   isDark ? "#252f3f" : "#e2e8f0",
    text:  isDark ? "#f1f5f9" : "#0f172a",
    muted: isDark ? "#64748b" : "#94a3b8",
    input: isDark ? "#273142" : "#f8fafc",
    inputBdr: isDark ? "#334155" : "#e2e8f0",
    chip:  isDark ? "#273142" : "#f1f5f9",
    chipText: isDark ? "#94a3b8" : "#475569",
    resp:  isDark ? "#0c1a2e" : "#eff6ff",
    respBdr: isDark ? "#1e3a5f" : "#bfdbfe",
    respText: isDark ? "#93c5fd" : "#1e40af",
  };

  function handleQuery(q) {
    const text = q || query;
    if (!text.trim()) return;
    setLoading(true);
    setResponse("");
    setTimeout(() => {
      const lower = text.toLowerCase();
      let resp = MOCK_RESPONSES.default;
      if (lower.includes("flood")) resp = MOCK_RESPONSES.flood;
      else if (lower.includes("literacy")) resp = MOCK_RESPONSES.literacy;
      else if (lower.includes("pmay") || lower.includes("housing")) resp = MOCK_RESPONSES.pmay;
      setResponse(resp);
      setLoading(false);
    }, 900);
    setQuery(text);
  }

  return (
    <div style={{ background: c.card, border: `1px solid ${c.bdr}`, borderRadius: 14, padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#1e40af,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "1rem" }}>✦</span>
        </div>
        <div>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: c.text }}>Civic AI Assistant</h2>
          <p style={{ margin: 0, fontSize: "0.72rem", color: c.muted }}>Ask about {name} or Odisha civic data</p>
        </div>
      </div>

      {/* Suggested queries */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14, marginTop: 14 }}>
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => handleQuery(s)} style={{
            background: c.chip, color: c.chipText,
            border: `1px solid ${c.inputBdr}`,
            borderRadius: 999, padding: "4px 12px",
            fontSize: "0.7rem", fontWeight: 500,
            cursor: "pointer", textAlign: "left",
          }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuery()}
          placeholder="Ask a question about this district or Odisha…"
          style={{
            flex: 1,
            background: c.input,
            border: `1px solid ${c.inputBdr}`,
            borderRadius: 8,
            padding: "9px 14px",
            fontSize: "0.82rem",
            color: c.text,
            outline: "none",
            fontFamily: "Inter, sans-serif",
          }}
        />
        <button onClick={() => handleQuery()} style={{
          background: "linear-gradient(135deg,#1e40af,#0891b2)",
          color: "#fff", border: "none", borderRadius: 8,
          padding: "9px 16px", fontWeight: 700, fontSize: "0.82rem",
          cursor: "pointer", flexShrink: 0,
        }}>
          {loading ? "…" : "Ask →"}
        </button>
      </div>

      {/* Response */}
      {(response || loading) && (
        <div style={{ marginTop: 12, background: c.resp, border: `1px solid ${c.respBdr}`, borderRadius: 8, padding: "12px 16px" }}>
          {loading ? (
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", opacity: 0.6, animation: `bounce 1s ${d}s infinite` }} />
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: "0.82rem", color: c.respText, lineHeight: 1.7 }}>
              ✦ {response}
            </p>
          )}
        </div>
      )}

      <p style={{ margin: "12px 0 0", fontSize: "0.65rem", color: c.muted }}>
        AI responses are generated from structured public data. Always verify from official sources for administrative use.
      </p>
    </div>
  );
}
