import Navbar from "@/components/Navbar";
import DistrictSidebar from "@/components/DistrictSidebar";

export default function DistrictLayout({ children, params }) {
  const { district } = params;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Shared navbar — sticky at top */}
      <Navbar />

      {/* Sidebar + content */}
      <div style={{ display: "flex", flex: 1 }}>
        <DistrictSidebar district={district} />
        <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
