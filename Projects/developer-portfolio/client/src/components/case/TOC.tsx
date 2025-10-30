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
    <nav className="sticky top-24 hidden lg:block">
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
