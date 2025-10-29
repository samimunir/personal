import Section from "../components/ui/Section";
import ProjectCard from "../components/cards/ProjectCard";
import { useState } from "react";

const ALL = ["All", "SaaS", "Systems", "Simulation", "UI/UX"] as const;

type Filter = (typeof ALL)[number];

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const projects = [
    { title: "CareerNest", blurb: "Job‑tracking SaaS", tags: ["MERN", "SaaS"] },
    { title: "Vectra", blurb: "Analytics platform", tags: ["MERN", "Systems"] },
    {
      title: "ATC Simulator",
      blurb: "Real‑time sim",
      tags: ["Python", "Simulation"],
    },
  ];
  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));
  return (
    <>
      <Section>
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {ALL.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={
                (filter === t
                  ? "bg-[#22D3EE] text-black"
                  : "bg-white/[.06] text-white/80 hover:text-white") +
                " border border-white/10 rounded-full px-3 py-1.5 text-sm transition-colors"
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shown.map((p) => (
            <ProjectCard
              key={p.title}
              title={p.title}
              blurb={p.blurb}
              tags={p.tags}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
