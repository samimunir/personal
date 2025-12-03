import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Collections", "Sunglasses", "Cutlery", "About", "Contact"];

  const products = [
    {
      category: "Sunglasses",
      name: "Obsidian Edge",
      price: "$189",
      image: "🕶️",
      description: "Precision-crafted titanium frames with polarized lenses",
    },
    {
      category: "Cutlery",
      name: "Damascus Artisan",
      price: "$349",
      image: "🔪",
      description: "Hand-forged Damascus steel with walnut handle",
    },
    {
      category: "Sunglasses",
      name: "Apex Vision",
      price: "$249",
      image: "🕶️",
      description: "Aerospace-grade aluminum with adaptive lenses",
    },
    {
      category: "Cutlery",
      name: "Carbon Elite",
      price: "$279",
      image: "🔪",
      description: "High-carbon steel with ergonomic grip design",
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans overflow-x-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(59,130,246,.03) 35px, rgba(59,130,246,.03) 70px)`,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold tracking-wider uppercase mb-8">
              Craftsmanship Refined
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none"
          >
            <span className="bg-gradient-to-r from-zinc-100 via-blue-100 to-zinc-100 bg-clip-text text-transparent">
              Precision.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Artistry.
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-transparent">
              Excellence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the intersection of form and function with our curated
            collection of
            <span className="text-blue-400 font-semibold">
              {" "}
              premium sunglasses
            </span>{" "}
            and
            <span className="text-blue-400 font-semibold">
              {" "}
              hand-forged Damascus steel cutlery
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/30 transition-all duration-300"
            >
              Explore Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-zinc-700 text-zinc-100 font-bold text-lg rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-zinc-600 text-xs uppercase tracking-widest mb-2">
                Scroll
              </span>
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Products Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-zinc-100 to-blue-400 bg-clip-text text-transparent">
                Featured Collection
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Meticulously crafted pieces that embody precision, durability, and
              timeless design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-8xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                      {product.image}
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-black mt-2 mb-2 text-zinc-100">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-black text-blue-400">
                        {product.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-blue-500 text-blue-400 font-bold text-lg rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              View Full Collection
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-transparent via-zinc-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "⚡",
                title: "Premium Quality",
                description:
                  "Every piece is crafted with the finest materials and attention to detail",
              },
              {
                icon: "🛡️",
                title: "Lifetime Warranty",
                description:
                  "We stand behind our products with comprehensive lifetime coverage",
              },
              {
                icon: "🚚",
                title: "Free Shipping",
                description:
                  "Complimentary express shipping on all orders worldwide",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-6xl mb-6 inline-block filter grayscale group-hover:grayscale-0 transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-black mb-4 text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              MaraveX
            </span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2024 MaraveX. All rights reserved. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
