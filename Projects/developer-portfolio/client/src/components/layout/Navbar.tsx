import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "./Container";

const items = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <Container className="h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-semibold tracking-tight"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
          Sami
        </Link>
        <nav className="relative hidden md:flex items-center gap-2 p-1 rounded-xl bg-white/[.04] border border-white/10">
          {items.map((n) => {
            const active = n.end
              ? pathname === n.to
              : pathname.startsWith(n.to);
            return (
              <NavLink
                key={n.to}
                end={n.end}
                to={n.to}
                className={
                  "relative px-3 py-1.5 text-sm rounded-lg transition-colors " +
                  (active
                    ? "text-black bg-[#22D3EE]"
                    : "text-white/80 hover:text-white")
                }
              >
                {n.label}
              </NavLink>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
