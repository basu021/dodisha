/* Odisha district centroids — projected to SVG viewBox 0 0 560 480
   Projection: x = 20 + (lon - 81.3) * 83.9 | y = 20 + (22.6 - lat) * 91.7 */
export const DISTRICT_NODES = [
  { id: "angul",          name: "Angul",          x: 339, y: 181 },
  { id: "balangir",       name: "Balangir",        x: 209, y: 194 },
  { id: "balasore",       name: "Balasore",        x: 493, y: 123 },
  { id: "bargarh",        name: "Bargarh",         x: 215, y: 135 },
  { id: "bhadrak",        name: "Bhadrak",         x: 458, y: 159 },
  { id: "boudh",          name: "Boudh",           x: 272, y: 213 },
  { id: "cuttack",        name: "Cuttack",         x: 404, y: 216 },
  { id: "deogarh",        name: "Deogarh",         x: 308, y: 118 },
  { id: "dhenkanal",      name: "Dhenkanal",       x: 381, y: 199 },
  { id: "gajapati",       name: "Gajapati",        x: 262, y: 330 },
  { id: "ganjam",         name: "Ganjam",          x: 322, y: 307 },
  { id: "jagatsinghpur",  name: "Jagatsinghpur",   x: 429, y: 234 },
  { id: "jajpur",         name: "Jajpur",          x: 441, y: 182 },
  { id: "jharsuguda",     name: "Jharsuguda",      x: 246, y: 89  },
  { id: "kalahandi",      name: "Kalahandi",       x: 186, y: 266 },
  { id: "kandhamal",      name: "Kandhamal",       x: 280, y: 249 },
  { id: "kendrapara",     name: "Kendrapara",      x: 475, y: 213 },
  { id: "keonjhar",       name: "Keonjhar",        x: 379, y: 109 },
  { id: "khordha",        name: "Khordha",         x: 381, y: 243 },
  { id: "koraput",        name: "Koraput",         x: 157, y: 367 },
  { id: "malkangiri",     name: "Malkangiri",      x: 70,  y: 410 },
  { id: "mayurbhanj",     name: "Mayurbhanj",      x: 442, y: 75  },
  { id: "nabarangpur",    name: "Nabarangpur",     x: 127, y: 329 },
  { id: "nayagarh",       name: "Nayagarh",        x: 339, y: 247 },
  { id: "nuapada",        name: "Nuapada",         x: 125, y: 199 },
  { id: "puri",           name: "Puri",            x: 400, y: 275 },
  { id: "rayagada",       name: "Rayagada",        x: 198, y: 334 },
  { id: "sambalpur",      name: "Sambalpur",       x: 243, y: 124 },
  { id: "sonepur",        name: "Sonepur",         x: 239, y: 182 },
  { id: "sundargarh",     name: "Sundargarh",      x: 290, y: 64  },
];

/* Odisha state boundary — simplified polygon (clockwise, real coordinates) */
export const ODISHA_BOUNDARY =
  "M 205,29 L 289,29 L 372,29 L 456,38 L 515,93 L 540,147 L 523,193 L 498,238 L 481,257 L 456,303 L 397,312 L 372,330 L 347,340 L 305,376 L 272,403 L 239,422 L 205,422 L 163,403 L 121,394 L 79,367 L 37,349 L 29,312 L 37,257 L 79,193 L 121,147 L 163,101 L 188,55 Z";

/* Per-district rich data (mock, realistic) */
export const DISTRICT_DATA = {
  cuttack: {
    odia: "କଟକ", tagline: "Silver City of Odisha",
    tags: ["🥈 Filigree Work", "🏙️ Millennium City", "⚔️ Historic Capital"],
    pop: "2.62M", area: "3,932 km²", lit: "82.36%", blocks: 14,
    devScore: 74,
    scores: { governance: 78, education: 80, healthcare: 72, infrastructure: 76, water: 68, economy: 79, safety: 71, agriculture: 60, digital: 73, welfare: 75 },
    weather: { temp: "34°C", condition: "Partly Cloudy", humidity: "72%", wind: "12 km/h", rain: "0 mm", forecast: "Thunderstorm expected by evening" },
    dams: [{ name: "Mahanadi Barrage", level: 68, capacity: "5,800 cusecs", status: "Normal" }, { name: "Mundali Weir", level: 54, capacity: "3,200 cusecs", status: "Normal" }],
    crops: [{ crop: "Paddy", price: "₹2,183/qtl", change: "+1.2%", trend: "up" }, { crop: "Maize", price: "₹1,962/qtl", change: "-0.4%", trend: "down" }, { crop: "Groundnut", price: "₹5,840/qtl", change: "+2.1%", trend: "up" }, { crop: "Mustard", price: "₹5,200/qtl", change: "+0.8%", trend: "up" }],
    alerts: [{ type: "Flood Watch", level: "Yellow", msg: "Mahanadi water level rising — Cuttack Sadar block on watch", time: "2h ago" }, { type: "Health", level: "Info", msg: "Dengue surveillance intensified in 6 wards", time: "5h ago" }],
    schemes: { pmay: 87, jjm: 94, pmgsy: 76, midday: 98, ayushman: 82 },
    infra: [
      { name: "Cuttack Smart City Phase II", type: "Urban", budget: "₹420 Cr", progress: 62, status: "On Track", deadline: "Dec 2025" },
      { name: "NH-316 Widening (Cuttack–Bhubaneswar)", type: "Roads", budget: "₹285 Cr", progress: 81, status: "On Track", deadline: "Sep 2025" },
      { name: "Mahanadi Flood Embankment", type: "Flood Control", budget: "₹180 Cr", progress: 45, status: "Delayed", deadline: "Mar 2026" },
      { name: "SCB Medical College Expansion", type: "Health", budget: "₹340 Cr", progress: 38, status: "On Track", deadline: "Jun 2026" },
    ],
    leadership: {
      collector: { name: "Dattatraya Bhausaheb Shinde", designation: "District Collector & DM", since: "Mar 2024", img: null },
      mla: [{ name: "Mohammed Moquim", constituency: "Cuttack", party: "INC", since: "2019" }, { name: "Sashibhusan Behera", constituency: "Choudwar", party: "BJP", since: "2024" }],
      mp: { name: "Bhartruhari Mahtab", constituency: "Cuttack (LS)", party: "BJP", since: "2024" },
    },
    news: [
      { title: "Cuttack Smart City gets ₹85 Cr central grant for road upgrade", category: "Infrastructure", time: "3h ago", source: "Odisha Bytes" },
      { title: "SCB Hospital performs 500th liver transplant, sets state record", category: "Health", time: "6h ago", source: "New Indian Express" },
      { title: "Mahanadi water level at 12.5 ft — below danger mark of 16 ft", category: "Flood", time: "1h ago", source: "IMD Odisha" },
      { title: "Municipal election results: BJD wins 31 of 59 wards in Cuttack", category: "Politics", time: "Yesterday", source: "The Hindu" },
      { title: "MSME cluster at Choudwar gets ₹42 Cr SFURTI grant", category: "Economy", time: "2 days ago", source: "Business Standard" },
    ],
    population_trend: [
      { year: "2001", pop: 2.1 }, { year: "2006", pop: 2.25 }, { year: "2011", pop: 2.41 },
      { year: "2016", pop: 2.51 }, { year: "2021", pop: 2.62 }, { year: "2026", pop: 2.71 },
    ],
    budget_trend: [
      { year: "2020", alloc: 1840 }, { year: "2021", alloc: 1920 }, { year: "2022", alloc: 2150 },
      { year: "2023", alloc: 2380 }, { year: "2024", alloc: 2640 }, { year: "2025", alloc: 2890 },
    ],
  },

  puri: {
    odia: "ପୁରୀ", tagline: "City of Lord Jagannath",
    tags: ["🛕 Jagannath Temple", "🏖️ Sea Beach", "🎡 Rath Yatra"],
    pop: "1.50M", area: "3,051 km²", lit: "85.02%", blocks: 11,
    devScore: 71,
    scores: { governance: 72, education: 82, healthcare: 68, infrastructure: 70, water: 65, economy: 74, safety: 69, agriculture: 71, digital: 68, welfare: 72 },
    weather: { temp: "32°C", condition: "Humid & Sunny", humidity: "83%", wind: "18 km/h", rain: "0 mm", forecast: "Sea breeze, clear skies" },
    dams: [{ name: "Bhargavi Barrage", level: 42, capacity: "2,100 cusecs", status: "Normal" }],
    crops: [{ crop: "Paddy", price: "₹2,160/qtl", change: "+0.9%", trend: "up" }, { crop: "Coconut", price: "₹18/piece", change: "+3.2%", trend: "up" }],
    alerts: [{ type: "Beach Safety", level: "Yellow", msg: "High waves at Puri beach — no-swim zone from 6–9 AM", time: "Morning" }],
    schemes: { pmay: 81, jjm: 89, pmgsy: 70, midday: 96, ayushman: 78 },
    infra: [
      { name: "Puri Heritage Corridor Phase III", type: "Urban", budget: "₹320 Cr", progress: 55, status: "On Track", deadline: "Mar 2026" },
      { name: "Puri–Konark Marine Drive", type: "Roads", budget: "₹210 Cr", progress: 72, status: "On Track", deadline: "Dec 2025" },
    ],
    leadership: {
      collector: { name: "Siddharth Shankar Swain", designation: "District Collector & DM", since: "Jan 2024", img: null },
      mla: [{ name: "Priti Ranjan Ghadei", constituency: "Puri", party: "BJP", since: "2024" }],
      mp: { name: "Sambit Patra", constituency: "Puri (LS)", party: "BJP", since: "2024" },
    },
    news: [
      { title: "Puri Heritage Corridor: 65% work complete, inauguration by March", category: "Infrastructure", time: "4h ago", source: "Odisha Bytes" },
      { title: "Rath Yatra 2025 — security deployment of 12,000 personnel planned", category: "Governance", time: "Yesterday", source: "Times of India" },
    ],
    population_trend: [{ year: "2001", pop: 1.2 }, { year: "2011", pop: 1.38 }, { year: "2021", pop: 1.50 }, { year: "2026", pop: 1.57 }],
    budget_trend: [{ year: "2020", alloc: 1100 }, { year: "2022", alloc: 1350 }, { year: "2024", alloc: 1680 }, { year: "2025", alloc: 1850 }],
  },
};

/* Fallback for districts without full data */
export function getDistrictData(slug) {
  return DISTRICT_DATA[slug] || DISTRICT_DATA["cuttack"];
}

/* State-level summary (always shown) */
export const ODISHA_STATE = {
  pop: "4.65 Cr", districts: 30, lit: "72.87%", villages: "51,349",
  schemes: 142, area: "155707 km²", blocks: 314, gps: 6234,
};
