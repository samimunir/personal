import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/top-tier-customs-llc-logo.JPG";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-red-600/20 shadow-2xl shadow-red-600/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            {/* TTC Logo  */}
            <div className="relative w-12 h-12 flex items-center justify-center group">
              <div className="absolute inset-0 bg-red-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={logo}
                onClick={() => navigate("/")}
                alt="Top Tier Customs Logo"
                className="relative rounded-full w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-black tracking-tight">
                <span className="text-white">TOP TIER</span>{" "}
                <span className="text-red-600">CUSTOMS</span>
              </div>
              <div className="text-xs text-gray-400 tracking-widest">
                EXCELLENCE IN MOTION
              </div>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-300 hover:text-red-500 transition-all duration-300 font-medium relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-red-500 transition-all duration-300 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#gallery"
              className="text-gray-300 hover:text-red-500 transition-all duration-300 font-medium relative group"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-red-500 transition-all duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button className="relative bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 overflow-hidden group">
              <span className="relative z-10 flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Now</span>
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Glassmorphism */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-red-600/20">
          <div className="px-4 py-6 space-y-4">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <a
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${
                    path.pathname === "/dashboard"
                      ? "text-red-600 bg-white/5"
                      : "hover:text-red-600 text-gray-300"
                  } block transition-colors py-3 px-4 rounded-lg hover:bg-white/5`}
                  // className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  Dashboard
                </a>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className={`text-gray-300 hover:text-red-600 font-medium block transition-colors py-3 px-4 rounded-lg hover:bg-white/5`}
                  // className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Login
              </a>
            )}
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              About
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Contact
            </a>
            <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-red-600/50 flex items-center justify-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Shop Now</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
