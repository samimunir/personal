import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-red-600/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="text-3xl font-black group">
              <span className="text-white group-hover:text-red-600 transition-colors">
                TT
              </span>
              <span className="text-red-600">C</span>
            </a>
            <span className="hidden sm:block text-sm font-bold text-gray-300">
              TOP TIER CUSTOMS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-red-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-gray-300 hover:text-red-600 transition-colors font-medium"
            >
              Shop
            </a>
            <a
              href="/services"
              className="text-gray-300 hover:text-red-600 transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="/about"
              className="text-gray-300 hover:text-red-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-red-600 transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <a
              href="/cart"
              className="relative p-2 text-gray-300 hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </a>

            {/* User/Login */}
            <a href="/login" className="hidden md:block">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50">
                Sign In
              </button>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <a
              href="/"
              className="block text-gray-300 hover:text-red-600 transition-colors py-2 font-medium"
            >
              Home
            </a>
            <a
              href="/shop"
              className="block text-gray-300 hover:text-red-600 transition-colors py-2 font-medium"
            >
              Shop
            </a>
            <a
              href="/services"
              className="block text-gray-300 hover:text-red-600 transition-colors py-2 font-medium"
            >
              Services
            </a>
            <a
              href="/about"
              className="block text-gray-300 hover:text-red-600 transition-colors py-2 font-medium"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-gray-300 hover:text-red-600 transition-colors py-2 font-medium"
            >
              Contact
            </a>
            <a href="/login" className="block">
              <button className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Sign In
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
