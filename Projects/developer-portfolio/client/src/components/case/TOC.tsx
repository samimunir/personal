import { useEffect, useState } from "react";

export default function TOC({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState<string>(sections[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <nav
      className="hidden lg:block sticky top-24 self-start w-[260px] shrink-0 pr-4 max-h-[calc(100vh-7rem)] overflow-auto"
      aria-label="On this page"
    >
      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={
                (active === s.id
                  ? "text-[#22D3EE]"
                  : "text-white/70 hover:text-white") +
                " text-sm transition-colors"
              }
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ──────────────────────────────────────────────────────────────
// OPTIONAL: To move TOC to the right rail instead, swap the child order
// inside the BODY grid and change the template to:
//   grid lg:grid-cols-[minmax(0,1fr)_280px]
// This will place the TOC on the outer edge with the same stickiness.
