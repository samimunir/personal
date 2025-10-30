import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "./Container";
import BrandMark from "../brand/BrandMark";

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
    <header className="sticky top-0 z-50">
      {/* frosted shell */}
      <div className="backdrop-blur-md bg-black/40 border-b border-white/10">
        <Container className="h-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <BrandMark className="w-5 h-5" />
            <span className="font-semibold tracking-tight">Sami</span>
            <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
              · Zephiron
            </span>
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
                  {/* underline hover accent */}
                  {!active && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 origin-left bg-[#22D3EE]/70 group-hover:scale-x-100 transition-transform" />
                  )}
                </NavLink>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#contact"
              className="rounded-xl px-4 py-2 text-sm bg-[#22D3EE]/20 hover:bg-[#22D3EE]/30 transition-colors"
            >
              Hire Me
            </a>
            <a
              href="#zephiron"
              className="rounded-xl px-3 py-2 text-xs border border-white/10 text-white/70 hover:text-white"
            >
              Zephiron
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
