"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/* ── District metadata ── */
const DISTRICT_DATA = {
  puri:           { odia: "ପୁରୀ",      tagline: "City of Lord Jagannath", tags: ["🛕 Jagannath Temple", "🏖️ Sea Beach", "🎡 Rath Yatra"], pop: "1.50M", area: "3,051", lit: "85.02%", blocks: 11 },
  cuttack:        { odia: "କଟକ",       tagline: "Silver City of Odisha",  tags: ["🥈 Filigree Work", "🏙️ Millennium City", "⚔️ Historic Capital"], pop: "2.62M", area: "3,932", lit: "82.36%", blocks: 14 },
  khordha:        { odia: "ଖୋର୍ଦ୍ଧା",  tagline: "Gateway to Bhubaneswar", tags: ["🏛️ State Capital", "💻 IT Hub", "🎭 Cultural Centre"], pop: "2.25M", area: "2,813", lit: "87.51%", blocks: 10 },
  ganjam:         { odia: "ଗଞ୍ଜାମ",    tagline: "Land of Olive Ridleys",  tags: ["🐢 Olive Ridley", "🌰 Cashew Hub", "🎨 Pattachitra"], pop: "3.52M", area: "8,206", lit: "73.44%", blocks: 22 },
  mayurbhanj:     { odia: "ମୟୂରଭଞ୍ଜ",  tagline: "Land of Simlipal",      tags: ["🐯 Simlipal Tiger", "💃 Chhau Dance", "🌿 Tribal Heritage"], pop: "2.51M", area: "10,418", lit: "63.18%", blocks: 26 },
  sambalpur:      { odia: "ସମ୍ବଲପୁର",  tagline: "City of Hirakud",       tags: ["🌊 Hirakud Dam", "🧵 Sambalpuri Silk", "🏭 Energy Capital"], pop: "1.04M", area: "6,702", lit: "75.07%", blocks: 9 },
  balasore:       { odia: "ବାଲେଶ୍ୱର",  tagline: "Land of ISRO Range",    tags: ["🚀 Chandipur Range", "🌊 Coastal Belt", "🎣 Fisheries"], pop: "2.32M", area: "3,634", lit: "80.66%", blocks: 12 },
  koraput:        { odia: "କୋରାପୁଟ",   tagline: "Coffee & Waterfall Land",tags: ["☕ Coffee Estates", "💧 Duduma Falls", "🌿 Tribal Culture"], pop: "1.38M", area: "8,807", lit: "49.87%", blocks: 14 },
  sundargarh:     { odia: "ସୁନ୍ଦରଗଡ",  tagline: "Steel & Football Hub",  tags: ["⚽ Football Culture", "🏭 Rourkela Steel", "🌿 Tribal Arts"], pop: "2.09M", area: "9,712", lit: "74.13%", blocks: 17 },
  kalahandi:      { odia: "କଳାହାଣ୍ଡି",  tagline: "Marble & Waterfall Land",tags:["💎 Marble Mines", "💧 Harishankar Falls", "🌾 Agriculture"], pop: "1.57M", area: "7,920", lit: "59.21%", blocks: 13 },
  jharsuguda:     { odia: "ଝାରସୁଗୁଡ",  tagline: "Energy Capital of Odisha",tags:["✈️ Airport", "⚡ Aluminium Hub", "🔋 Power Grid"], pop: "0.58M", area: "2,114", lit: "78.30%", blocks: 5 },
  angul:          { odia: "ଅନୁଗୋଳ",    tagline: "Industrial Powerhouse",  tags: ["⚙️ NALCO", "🔥 Coal & Steel", "🌲 Forest Cover"], pop: "1.27M", area: "6,232", lit: "77.82%", blocks: 8 },
  keonjhar:       { odia: "କେନ୍ଦୁଝର",  tagline: "Mineral Rich Heartland", tags: ["⛏️ Iron Ore", "🌿 Tribal Culture", "🏔️ Scenic Hills"], pop: "1.80M", area: "8,303", lit: "68.00%", blocks: 13 },
  bolangir:       { odia: "ବଲାଙ୍ଗୀର",  tagline: "Agriculture & Textile Hub",tags:["🌾 Agriculture", "🧵 Handloom", "🏛️ Temple Heritage"], pop: "1.65M", area: "6,575", lit: "65.37%", blocks: 14 },
  dhenkanal:      { odia: "ଢେଙ୍କାନାଳ",  tagline: "Forest & Education Hub", tags: ["📚 Education", "🌿 Forest", "⛽ Oil Refinery"], pop: "1.19M", area: "4,452", lit: "79.43%", blocks: 8 },
  jajpur:         { odia: "ଯାଜପୁର",    tagline: "Chrome & Temple District",tags:["⛏️ Chrome Mines", "🛕 Biraja Temple", "🏭 Industries"], pop: "1.83M", area: "2,899", lit: "80.01%", blocks: 10 },
  kendrapara:     { odia: "କେନ୍ଦ୍ରାପଡ଼ା", tagline: "Mangrove & Marine Hub", tags: ["🐟 Fisheries", "🌿 Bhitarkanika", "🌊 Mangroves"], pop: "1.44M", area: "2,644", lit: "84.22%", blocks: 9 },
  jagatsinghpur:  { odia: "ଜଗତ୍‌ସିଂହପୁର", tagline: "Port & Petrochemical Hub",tags:["⚓ Paradip Port", "⛽ Petrochemicals", "🌊 Coast"], pop: "1.14M", area: "1,668", lit: "85.73%", blocks: 8 },
  bhadrak:        { odia: "ଭଦ୍ରକ",     tagline: "Trade & River Delta",    tags: ["🏭 Industries", "🌊 River Delta", "🛕 Akhandalamani"], pop: "1.50M", area: "2,505", lit: "83.51%", blocks: 7 },
  nayagarh:       { odia: "ନୟାଗଡ",     tagline: "Green Hills & Craft",    tags: ["🌿 Forest Cover", "🎨 Handicrafts", "🌾 Agriculture"], pop: "0.96M", area: "3,890", lit: "80.46%", blocks: 8 },
  gajapati:       { odia: "ଗଜପତି",     tagline: "Coffee & Scenic Hills",  tags: ["☕ Coffee Plantations", "⛰️ Eastern Ghats", "🌿 Tribal"], pop: "0.57M", area: "4,325", lit: "52.28%", blocks: 7 },
  kandhamal:      { odia: "କନ୍ଧମାଳ",   tagline: "Organic Turmeric Land",  tags: ["🌾 Organic Turmeric", "⛰️ Hill Stations", "🌿 Tribal Arts"], pop: "0.73M", area: "8,021", lit: "65.28%", blocks: 12 },
  rayagada:       { odia: "ରାୟଗଡ",     tagline: "Bauxite & Waterfall Land",tags:["💧 Waterfalls", "⛏️ Bauxite Mines", "🌿 Tribal Culture"], pop: "0.96M", area: "7,073", lit: "50.87%", blocks: 11 },
  malkangiri:     { odia: "ମାଲକାନଗିରି", tagline: "Tribal & Scenic District",tags:["🌄 Chitrakonda Lake", "🌿 Tribal Heritage", "🌾 Agriculture"], pop: "0.61M", area: "5,791", lit: "49.78%", blocks: 7 },
  nabarangpur:    { odia: "ନବରଙ୍ଗପୁର",  tagline: "Cotton & Forest Land",  tags: ["🌳 Dense Forests", "🌾 Cotton", "🌿 Tribal Culture"], pop: "1.22M", area: "5,291", lit: "51.44%", blocks: 10 },
  nuapada:        { odia: "ନୁଆପଡ଼ା",    tagline: "Agriculture & Limestone", tags: ["🏔️ Limestone Mines", "🌾 Agriculture", "🌿 Tribal Heritage"], pop: "0.61M", area: "3,408", lit: "60.56%", blocks: 5 },
  bargarh:        { odia: "ବରଗଡ",      tagline: "Rice Bowl of Odisha",    tags: ["🌾 Rice Bowl", "🎭 Dhanu Jatra", "🧵 Handloom Weaving"], pop: "1.48M", area: "5,837", lit: "75.15%", blocks: 12 },
  sonepur:        { odia: "ସୋନପୁର",    tagline: "Cattle Fair & River Confluence",tags:["🐂 Cattle Fair", "🌊 River Confluence", "🌾 Agriculture"], pop: "0.65M", area: "2,337", lit: "76.76%", blocks: 6 },
  deogarh:        { odia: "ଦେଓଗଡ",     tagline: "Tribal Crafts & Wildlife",tags:["🎨 Handicrafts", "🌿 Wildlife", "⛏️ Mineral Deposits"], pop: "0.31M", area: "2,940", lit: "72.77%", blocks: 3 },
  boudh:          { odia: "ବୌଦ୍ଧ",      tagline: "Forest & River Valley",  tags: ["🌿 Dense Forests", "🌊 Rivers", "🌾 Agriculture"], pop: "0.44M", area: "3,098", lit: "73.42%", blocks: 3 },
};

const DEFAULT_DATA = { odia: "", tagline: "Odisha District", tags: [], pop: "—", area: "—", lit: "—", blocks: "—" };

/* ── Menu structure ── */
const LIVE_SLUGS = new Set(["crop-prices", "weather", "power-outages", "local-alerts", "news", "water-dams"]);

const MENU = [
  {
    section: "CIVIC DUTY",
    items: [
      { icon: "🌱", label: "My Responsibility", slug: "my-responsibility" },
      { icon: "📊", label: "Overview",           slug: "" },
      { icon: "👥", label: "Leadership",         slug: "leadership" },
    ],
  },
  {
    section: "MONEY & RESOURCES",
    items: [
      { icon: "💰", label: "Finance & Budget",  slug: "finance-budget" },
      { icon: "🏗️", label: "Infrastructure",    slug: "infrastructure" },
      { icon: "📑", label: "Govt. Tenders",     slug: "govt-tenders" },
      { icon: "🏭", label: "Local Industries",  slug: "local-industries" },
    ],
  },
  {
    section: "DAILY SERVICES",
    items: [
      { icon: "💧", label: "Water Supply (JJM)", slug: "water-supply" },
      { icon: "⚡", label: "Power & Outages",    slug: "power-outages" },
      { icon: "🚌", label: "Transport",          slug: "transport" },
      { icon: "🏥", label: "Health",             slug: "health" },
      { icon: "🎓", label: "Schools",            slug: "schools" },
      { icon: "🏠", label: "Housing Schemes",    slug: "housing-schemes" },
    ],
  },
  {
    section: "ACCOUNTABILITY",
    items: [
      { icon: "👮", label: "Police & Traffic",  slug: "police-traffic" },
      { icon: "⚖️", label: "Courts",            slug: "courts" },
      { icon: "📜", label: "File RTI",          slug: "file-rti" },
      { icon: "🏛️", label: "RTI Tracker",       slug: "rti-tracker" },
      { icon: "🤝", label: "Contributors",      slug: "contributors" },
    ],
  },
  {
    section: "ENGAGEMENT",
    items: [
      { icon: "📋", label: "Gov. Schemes",    slug: "govt-schemes" },
      { icon: "📋", label: "Services Guide",  slug: "services-guide" },
      { icon: "📝", label: "Exams & Jobs",    slug: "exams-jobs" },
      { icon: "📊", label: "Elections",       slug: "elections" },
    ],
  },
  {
    section: "LOCAL INFO",
    items: [
      { icon: "🌟", label: "Famous People",     slug: "famous-people" },
      { icon: "⚠️", label: "Local Alerts",      slug: "local-alerts" },
      { icon: "🏢", label: "Offices & Services",slug: "offices-services" },
      { icon: "🤝", label: "Citizen Corner",    slug: "citizen-corner" },
      { icon: "📰", label: "News & Updates",    slug: "news" },
      { icon: "🔗", label: "Data Sources",      slug: "data-sources" },
      { icon: "🕒", label: "Update Log",        slug: "update-log" },
    ],
  },
  {
    section: "MAPS & DATA",
    items: [
      { icon: "🗺️", label: "Interactive Map",   slug: "map" },
      { icon: "📈", label: "Population",         slug: "population" },
      { icon: "🌦️", label: "Weather & Rainfall", slug: "weather" },
      { icon: "🌾", label: "Crop Prices",        slug: "crop-prices" },
      { icon: "🏘️", label: "Gram Panchayat",     slug: "gram-panchayat" },
      { icon: "🌾", label: "Farm Advisory",      slug: "farm-advisory" },
      { icon: "🚰", label: "Water & Dams",       slug: "water-dams" },
    ],
  },
];

function formatDistrict(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function DistrictSidebar({ district }) {
  const pathname  = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const read = () => document.documentElement.getAttribute("data-theme") || "light";
    setTheme(localStorage.getItem("theme") || "light");
    const obs = new MutationObserver(() => setTheme(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const isDark   = theme === "dark";
  const base     = `/odisha/${district}`;
  const info     = DISTRICT_DATA[district] || DEFAULT_DATA;
  const name     = formatDistrict(district);

  const isActive = (slug) => {
    const target = slug === "" ? base : `${base}/${slug}`;
    return pathname === target;
  };

  /* ── colour tokens ── */
  const C = {
    bg:          isDark ? "#161f2e" : "#ffffff",
    border:      isDark ? "#252f3f" : "#e5e7eb",
    textPrimary: isDark ? "#f1f5f9" : "#111827",
    textMuted:   isDark ? "#6b7280" : "#9ca3af",
    textSub:     isDark ? "#94a3b8" : "#6b7280",
    sectionHdr:  isDark ? "#4b5563" : "#9ca3af",
    hoverBg:     isDark ? "#1e2839" : "#f9fafb",
    activeBg:    isDark ? "#1e3a5f" : "#eff6ff",
    activeText:  isDark ? "#60a5fa" : "#1d4ed8",
    divider:     isDark ? "#1f2937" : "#f3f4f6",
    tagBg:       isDark ? "#1e2839" : "#f3f4f6",
    tagText:     isDark ? "#94a3b8" : "#374151",
    liveBg:      isDark ? "#052e16" : "#dcfce7",
    liveText:    isDark ? "#4ade80" : "#166534",
    statsBg:     isDark ? "#1e2839" : "#f9fafb",
    supportGold: isDark ? "#78350f" : "#fef3c7",
    supportText: isDark ? "#fbbf24" : "#92400e",
    legalBg:     isDark ? "#0f172a" : "#f9fafb",
    legalText:   isDark ? "#374151" : "#9ca3af",
  };

  const sidebarStyle = {
    width: 268,
    minWidth: 268,
    background: C.bg,
    borderRight: `1px solid ${C.border}`,
    height: "calc(100vh - 56px)",
    position: "sticky",
    top: 56,
    overflowY: "auto",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    scrollbarWidth: "thin",
    scrollbarColor: `${C.border} transparent`,
  };

  const renderMenuItem = (item) => {
    const active = isActive(item.slug);
    const isLive = LIVE_SLUGS.has(item.slug);
    const href   = item.slug === "" ? base : `${base}/${item.slug}`;

    return (
      <Link
        key={item.label}
        href={href}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          margin: "1px 6px",
          borderRadius: 7,
          fontSize: "0.82rem",
          fontWeight: active ? 600 : 450,
          textDecoration: "none",
          color: active ? C.activeText : C.textPrimary,
          background: active ? C.activeBg : "transparent",
          transition: "background 0.1s",
          borderLeft: active ? `3px solid ${C.activeText}` : "3px solid transparent",
        }}
      >
        <span style={{ fontSize: "0.95rem", flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
        <span style={{ flex: 1, lineHeight: 1.3 }}>{item.label}</span>
        {isLive && (
          <span style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            background: C.liveBg,
            color: C.liveText,
            borderRadius: 4,
            padding: "2px 5px",
            flexShrink: 0,
          }}>
            LIVE
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside style={sidebarStyle}>

      {/* ── Breadcrumb + back ── */}
      <div style={{ padding: "12px 14px 0", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: C.textMuted, marginBottom: 10, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: C.textMuted, textDecoration: "none" }}>🏠 Dodisha</Link>
          <span>›</span>
          <Link href="/#districts" style={{ color: C.textMuted, textDecoration: "none" }}>Odisha</Link>
          <span>›</span>
          <span style={{ color: C.textPrimary, fontWeight: 600 }}>{name}</span>
        </div>

        {/* ── District hero ── */}
        <div style={{ paddingBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: C.textPrimary, letterSpacing: "-0.4px" }}>
              {name}
            </h1>
            <span style={{ fontSize: "0.75rem", color: C.textMuted, fontWeight: 400 }}>{info.odia}</span>
          </div>
          <p style={{ fontSize: "0.72rem", color: C.textSub, margin: "3px 0 8px", fontStyle: "italic" }}>
            "{info.tagline}"
          </p>

          {/* Cultural tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
            {info.tags.map((t) => (
              <span key={t} style={{
                fontSize: "0.65rem",
                background: C.tagBg,
                color: C.tagText,
                borderRadius: 5,
                padding: "2px 7px",
                fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>

          {/* District stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: 4,
            background: C.statsBg,
            borderRadius: 8,
            padding: "8px 6px",
          }}>
            {[
              { val: info.pop,    lbl: "Pop." },
              { val: info.area,   lbl: "km²" },
              { val: info.lit,    lbl: "Lit." },
              { val: info.blocks, lbl: "Blocks" },
            ].map(({ val, lbl }) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: C.textPrimary, lineHeight: 1.2 }}>{val}</div>
                <div style={{ fontSize: "0.6rem", color: C.textMuted, marginTop: 1 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{ flex: 1, padding: "6px 0 4px" }}>
        {MENU.map((group) => (
          <div key={group.section}>
            <p style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.sectionHdr,
              padding: "10px 14px 3px",
              margin: 0,
            }}>
              {group.section}
            </p>
            {group.items.map(renderMenuItem)}
          </div>
        ))}

        {/* ── Divider ── */}
        <div style={{ height: 1, background: C.divider, margin: "10px 14px 6px" }} />

        {/* ── Global links ── */}
        {[
          { icon: "⚖️", label: "Compare Districts", href: "/odisha/compare" },
        ].map(({ icon, label, href }) => (
          <Link key={label} href={href} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 12px", margin: "1px 6px", borderRadius: 7,
            fontSize: "0.82rem", fontWeight: 450, textDecoration: "none",
            color: C.textPrimary, background: "transparent",
            borderLeft: "3px solid transparent",
          }}>
            <span style={{ fontSize: "0.95rem" }}>{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* ── Support tiers ── */}
      <div style={{
        margin: "0 10px 8px",
        background: C.supportGold,
        borderRadius: 9,
        padding: "10px 12px",
      }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: C.supportText, margin: "0 0 6px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          🏆 Supported By
        </p>
        {[
          { tier: "👑 India",    label: "Patron",              price: "₹9,999/mo" },
          { tier: "🌊 Odisha",   label: `Sponsor Odisha`,       price: "₹999/mo" },
          { tier: `🏛️ ${name}`, label: `Champion ${name}`,     price: "₹99/mo" },
        ].map(({ tier, label, price }) => (
          <div key={tier} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontSize: "0.68rem", color: C.supportText, fontWeight: 500 }}>{tier}:</span>
            <Link href="/support" style={{
              fontSize: "0.63rem", color: C.supportText, fontWeight: 600,
              textDecoration: "none", background: "rgba(0,0,0,0.06)",
              borderRadius: 4, padding: "1px 6px",
            }}>
              {price} →
            </Link>
          </div>
        ))}
      </div>

      {/* ── Bottom action links ── */}
      <div style={{ padding: "4px 10px 6px", display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          { icon: "❤️", label: "Support This Project", href: "/support" },
          { icon: "🗳️", label: "Vote on Features",     href: "/vote" },
          { icon: "💬", label: "Spot something wrong?",href: "/feedback" },
        ].map(({ icon, label, href }) => (
          <Link key={label} href={href} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "5px 8px", borderRadius: 6,
            fontSize: "0.78rem", fontWeight: 500,
            color: C.textSub, textDecoration: "none",
          }}>
            <span style={{ fontSize: "0.85rem" }}>{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>

      {/* ── Legal footer ── */}
      <div style={{
        padding: "8px 12px 12px",
        borderTop: `1px solid ${C.border}`,
        background: C.legalBg,
      }}>
        <p style={{ fontSize: "0.6rem", color: C.legalText, margin: "0 0 4px", lineHeight: 1.5 }}>
          ⚠ Independent · NOT an official govt website · NDSAP · Article 19(1)(a)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 8px" }}>
          {["About", "Privacy", "Disclaimer", "Contribute"].map((l) => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{
              fontSize: "0.6rem", color: C.legalText, textDecoration: "none",
            }}>{l}</Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
