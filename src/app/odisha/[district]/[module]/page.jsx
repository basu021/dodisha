import ModulePlaceholder from "@/components/ModulePlaceholder";

export function generateMetadata({ params }) {
  const name = params.district
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const mod = params.module
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${mod} — ${name} · Dodisha`,
    description: `${mod} data for ${name} district, Odisha.`,
  };
}

export default function ModulePage({ params }) {
  return <ModulePlaceholder district={params.district} module={params.module} />;
}
