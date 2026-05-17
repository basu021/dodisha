import DistrictOverview from "@/components/DistrictOverview";

export function generateMetadata({ params }) {
  const name = params.district
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${name} District — Dodisha`,
    description: `Real-time civic data dashboard for ${name} district, Odisha.`,
  };
}

export default function DistrictPage({ params }) {
  return <DistrictOverview district={params.district} />;
}
