import { Link, NavLink } from "react-router-dom";
import Container from "./Container";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/writing", label: "Writing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <Container className="h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold tracking-tight">
          Sami
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              className={({ isActive }) =>
                (isActive ? "text-white" : "text-white/70 hover:text-white") +
                " transition-colors"
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
