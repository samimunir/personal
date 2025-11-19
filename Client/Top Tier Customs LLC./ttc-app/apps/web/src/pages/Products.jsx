import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  X,
  Filter,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  Tag,
  Star,
  ArrowLeft,
  ArrowRight,
  Menu,
} from "lucide-react";

// Mock products data matching your schema
const mockProducts = [
  {
    _id: "1",
    slug: "carbon-fiber-spoiler",
    title: "Carbon Fiber GT Spoiler",
    description:
      "High-quality carbon fiber rear spoiler. Direct bolt-on fitment for most performance vehicles. Adds aggressive styling and improved aerodynamics.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Carbon+Spoiler",
    ],
    price: 899.99,
    sku: "CF-SPOILER-001",
    variants: [
      {
        sku: "CF-SPOILER-001-M",
        attrs: { size: "Medium", finish: "Matte" },
        priceDelta: 0,
        stock: 5,
      },
      {
        sku: "CF-SPOILER-001-G",
        attrs: { size: "Medium", finish: "Glossy" },
        priceDelta: 50,
        stock: 8,
      },
      {
        sku: "CF-SPOILER-001-L",
        attrs: { size: "Large", finish: "Matte" },
        priceDelta: 100,
        stock: 3,
      },
    ],
    visible: true,
    tags: ["exterior", "aerodynamics", "carbon-fiber", "featured"],
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    slug: "performance-exhaust-system",
    title: "Titanium Performance Exhaust",
    description:
      "Premium titanium exhaust system with aggressive sound profile. Increases horsepower and torque while reducing weight.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Exhaust+System",
    ],
    price: 2499.99,
    sku: "TI-EXH-001",
    variants: [],
    visible: true,
    tags: ["performance", "exhaust", "titanium", "featured"],
    createdAt: "2024-02-01",
  },
  {
    _id: "3",
    slug: "racing-seat-bucket",
    title: "Racing Bucket Seat - FIA Approved",
    description:
      "Professional racing bucket seat with FIA certification. Carbon fiber shell with premium Alcantara upholstery.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Racing+Seat",
    ],
    price: 1599.99,
    sku: "RS-SEAT-001",
    variants: [
      {
        sku: "RS-SEAT-001-BLK",
        attrs: { color: "Black" },
        priceDelta: 0,
        stock: 10,
      },
      {
        sku: "RS-SEAT-001-RED",
        attrs: { color: "Red" },
        priceDelta: 0,
        stock: 7,
      },
      {
        sku: "RS-SEAT-001-BLU",
        attrs: { color: "Blue" },
        priceDelta: 0,
        stock: 4,
      },
    ],
    visible: true,
    tags: ["interior", "racing", "seats", "featured"],
    createdAt: "2024-01-20",
  },
  {
    _id: "4",
    slug: "led-headlight-kit",
    title: "LED Headlight Conversion Kit",
    description:
      "Ultra-bright LED headlight kit with plug-and-play installation. 6000K color temperature for maximum visibility.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=LED+Headlights",
    ],
    price: 399.99,
    sku: "LED-HEAD-001",
    variants: [],
    visible: true,
    tags: ["lighting", "exterior", "led"],
    createdAt: "2024-02-10",
  },
  {
    _id: "5",
    slug: "turbo-boost-controller",
    title: "Digital Boost Controller",
    description:
      "Advanced digital boost controller with LCD display. Precise boost control for turbocharged vehicles.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Boost+Controller",
    ],
    price: 449.99,
    sku: "BOOST-CTRL-001",
    variants: [],
    visible: true,
    tags: ["performance", "electronics", "turbo"],
    createdAt: "2024-01-25",
  },
  {
    _id: "6",
    slug: "coilover-suspension-kit",
    title: "Adjustable Coilover Kit",
    description:
      "Fully adjustable coilover suspension system. Height and damping adjustable for the perfect stance and ride quality.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Coilover+Kit",
    ],
    price: 1899.99,
    sku: "COIL-SUSP-001",
    variants: [],
    visible: true,
    tags: ["suspension", "performance", "handling", "featured"],
    createdAt: "2024-02-05",
  },
  {
    _id: "7",
    slug: "carbon-steering-wheel",
    title: "Carbon Fiber Steering Wheel",
    description:
      "Race-inspired carbon fiber steering wheel with Alcantara grip. Complete with quick-release hub adapter.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Steering+Wheel",
    ],
    price: 799.99,
    sku: "CF-WHEEL-001",
    variants: [
      {
        sku: "CF-WHEEL-001-S",
        attrs: { diameter: "320mm" },
        priceDelta: 0,
        stock: 6,
      },
      {
        sku: "CF-WHEEL-001-L",
        attrs: { diameter: "350mm" },
        priceDelta: 50,
        stock: 4,
      },
    ],
    visible: true,
    tags: ["interior", "carbon-fiber", "racing"],
    createdAt: "2024-01-30",
  },
  {
    _id: "8",
    slug: "brake-caliper-kit",
    title: "Big Brake Caliper Kit",
    description:
      "High-performance 6-piston brake caliper kit with slotted rotors. Dramatically improved stopping power.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Brake+Kit",
    ],
    price: 2999.99,
    sku: "BRAKE-KIT-001",
    variants: [
      {
        sku: "BRAKE-KIT-001-RED",
        attrs: { color: "Red" },
        priceDelta: 0,
        stock: 5,
      },
      {
        sku: "BRAKE-KIT-001-BLK",
        attrs: { color: "Black" },
        priceDelta: 0,
        stock: 8,
      },
    ],
    visible: true,
    tags: ["brakes", "performance", "safety", "featured"],
    createdAt: "2024-02-08",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique tags
  const allTags = [...new Set(products.flatMap((p) => p.tags))];

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          const aFeatured = a.tags.includes("featured") ? 1 : 0;
          const bFeatured = b.tags.includes("featured") ? 1 : 0;
          return bFeatured - aFeatured;
        });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedTags, sortBy, products]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addToCart = (product, variant = null) => {
    const cartItem = {
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      basePrice: product.price,
      variant: variant,
      price: variant ? product.price + variant.priceDelta : product.price,
      quantity: 1,
    };

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === cartItem.productId &&
          JSON.stringify(item.variant) === JSON.stringify(cartItem.variant)
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === cartItem.productId &&
          JSON.stringify(item.variant) === JSON.stringify(cartItem.variant)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, cartItem];
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold">
                <span className="text-white">TT</span>
                <span className="text-red-600">C</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
                <a href="/shop" className="text-red-600 font-semibold">
                  Shop
                </a>
                <a
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </a>
              </nav>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-all hover:scale-105"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            PREMIUM <span className="text-red-600">PARTS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Discover our curated selection of high-performance automotive parts
            and accessories. Quality guaranteed.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="sticky top-20 z-30 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Tags Filter */}
          <div className={`mt-4 ${isFilterOpen ? "block" : "hidden sm:block"}`}>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-red-600 text-white"
                      : "bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 hover:border-red-600 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-800 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.tags.includes("featured") && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        FEATURED
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <span className="bg-white text-black px-6 py-2 rounded-lg font-semibold">
                        Quick View
                      </span>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-red-600">
                        £{product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() =>
                          product.variants.length > 0
                            ? setSelectedProduct(product)
                            : addToCart(product)
                        }
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-all hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-red-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="float-right text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="aspect-square bg-gray-800 rounded-xl overflow-hidden">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl font-black mb-4">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="text-4xl font-black text-red-600 mb-6">
                    £{selectedProduct.price.toFixed(2)}
                  </div>

                  {/* Variants */}
                  {selectedProduct.variants.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Select Options:</h3>
                      <div className="space-y-2">
                        {selectedProduct.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              addToCart(selectedProduct, variant);
                              setSelectedProduct(null);
                            }}
                            className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-red-600 rounded-lg p-4 transition-all text-left"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold">
                                  {Object.entries(variant.attrs).map(
                                    ([key, value]) => (
                                      <span key={key} className="mr-2">
                                        {key}: {value}
                                      </span>
                                    )
                                  )}
                                </div>
                                <div className="text-sm text-gray-400">
                                  Stock: {variant.stock} units
                                </div>
                              </div>
                              <div className="text-lg font-bold text-red-600">
                                {variant.priceDelta > 0
                                  ? `+£${variant.priceDelta.toFixed(2)}`
                                  : ""}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  {selectedProduct.variants.length === 0 && (
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  )}

                  <div className="mt-6 text-sm text-gray-400">
                    <p>SKU: {selectedProduct.sku}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 z-50 overflow-y-auto">
            <div className="p-6">
              {/* Cart Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">CART ({cartCount})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="bg-black/50 border border-gray-800 rounded-lg p-4"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            {item.variant && (
                              <p className="text-xs text-gray-400 mb-2">
                                {Object.entries(item.variant.attrs).map(
                                  ([key, value]) => (
                                    <span key={key}>{value} </span>
                                  )
                                )}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 bg-gray-900 rounded-lg">
                                <button
                                  onClick={() => updateCartQuantity(index, -1)}
                                  className="p-2 hover:text-red-600 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(index, 1)}
                                  className="p-2 hover:text-red-600 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(index)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between items-center">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="font-bold text-lg text-red-600">
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Total */}
                  <div className="border-t border-gray-800 pt-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-semibold">
                        £{cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Shipping</span>
                      <span className="font-semibold">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-black mt-4">
                      <span>TOTAL</span>
                      <span className="text-red-600">
                        £{cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 mb-4">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
