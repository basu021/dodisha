"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DISTRICT_NODES, ODISHA_BOUNDARY } from "@/data/odishaDistricts";

export default function OdishaMap({ activeDistrict, isDark }) {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const c = {
    bg:       isDark ? "#161f2e" : "#f8fafc",
    state:    isDark ? "#1e2d42" : "#e8f0fe",
    stroke:   isDark ? "#334155" : "#bfdbfe",
    dot:      isDark ? "#475569" : "#94a3b8",
    dotHov:   "#3b82f6",
    dotAct:   "#1e40af",
    label:    isDark ? "#64748b" : "#94a3b8",
    labelAct: isDark ? "#93c5fd" : "#1e40af",
    card:     isDark ? "#1e2839" : "#ffffff",
    cardBdr:  isDark ? "#334155" : "#e2e8f0",
    text:     isDark ? "#f1f5f9" : "#0f172a",
    muted:    isDark ? "#94a3b8" : "#64748b",
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
      <svg
        viewBox="0 0 560 440"
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Odisha district map"
      >
        {/* State background */}
        <path
          d={ODISHA_BOUNDARY}
          fill={c.state}
          stroke={c.stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Grid lines for context */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#ffffff08" : "#00000006"} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="560" height="440" fill="url(#grid)" />

        {/* District nodes */}
        {DISTRICT_NODES.map((d) => {
          const isActive  = d.id === activeDistrict;
          const isHovered = d.id === hovered;
          const r = isActive ? 9 : isHovered ? 7 : 5;
          const fill = isActive ? c.dotAct : isHovered ? c.dotHov : c.dot;

          return (
            <g
              key={d.id}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/odisha/${d.id}`)}
              onMouseEnter={(e) => {
                setHovered(d.id);
                const svg = e.currentTarget.closest("svg");
                const rect = svg.getBoundingClientRect();
                setTooltip({ x: d.x, y: d.y });
              }}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring for active */}
              {isActive && (
                <circle cx={d.x} cy={d.y} r={14} fill="none" stroke={c.dotAct} strokeWidth="1.5" opacity="0.35" />
              )}
              <circle cx={d.x} cy={d.y} r={r} fill={fill} opacity={isActive ? 1 : isHovered ? 0.9 : 0.6} />

              {/* Labels for active + hovered */}
              {(isActive || isHovered) && (
                <text
                  x={d.x}
                  y={d.y - 14}
                  textAnchor="middle"
                  fontSize={isActive ? "9" : "8"}
                  fontWeight={isActive ? "700" : "600"}
                  fill={isActive ? c.labelAct : c.dotHov}
                  fontFamily="Inter, sans-serif"
                >
                  {d.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Bay of Bengal label */}
        <text x="500" y="300" textAnchor="middle" fontSize="8" fill={c.muted} fontFamily="Inter, sans-serif" opacity="0.5" transform="rotate(-40 500 300)">Bay of Bengal</text>
      </svg>

      {/* Hover tooltip */}
      {hovered && hovered !== activeDistrict && (
        <div style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: c.card,
          border: `1px solid ${c.cardBdr}`,
          borderRadius: 8,
          padding: "8px 14px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.8rem", color: c.text }}>
            {DISTRICT_NODES.find(d => d.id === hovered)?.name}
          </p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: c.muted }}>Click to explore district</p>
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "center" }}>
        {[
          { color: c.dotAct, label: "Current district" },
          { color: c.dotHov, label: "Hover to explore" },
          { color: c.dot,    label: "Other districts" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: "0.65rem", color: c.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
