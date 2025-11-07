import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../lib/theme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg transition-colors ${
          isActive ? "text-inherit" : "text-black/70 dark:text-white/70"
        } hover:bg-black/5 dark:hover:bg-white/10`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-950/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-400 to-lime-300" />
          <span className="text-sm font-semibold tracking-wide">
            Top Tier Customs
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Item to="/">Home</Item>
          <Item to="/shop">Shop</Item>
          <Item to="/services">Services</Item>
          <Item to="/contact">Contact</Item>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <Link
            to="/cart"
            className="h-9 w-9 rounded-lg border border-black/10 dark:border-white/10 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Cart"
          >
            🛒
          </Link>
        </div>
      </div>
    </header>
  );
}
