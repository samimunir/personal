import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Search,
  X,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  CreditCard,
  Wrench,
  Zap,
  Star,
  Tag,
} from "lucide-react";

// Mock services data matching your schema
const mockServices = [
  {
    _id: "1",
    slug: "performance-tune-stage-1",
    title: "Stage 1 Performance Tune",
    description:
      "ECU remapping for significant power gains. Increase horsepower by 20-30% and torque by 25-35%. Includes dyno testing and optimization for your specific vehicle.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Stage+1+Tune",
    ],
    durationMinutes: 180,
    basePrice: 599.99,
    requiresDeposit: true,
    depositAmount: 150,
    visible: true,
    tags: ["performance", "tuning", "ecu", "featured"],
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    slug: "custom-exhaust-installation",
    title: "Custom Exhaust Installation",
    description:
      "Professional installation of aftermarket exhaust systems. Includes removal of stock system, fitment, welding if needed, and sound testing.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Exhaust+Install",
    ],
    durationMinutes: 240,
    basePrice: 450,
    requiresDeposit: false,
    depositAmount: 0,
    visible: true,
    tags: ["installation", "exhaust", "performance"],
    createdAt: "2024-01-20",
  },
  {
    _id: "3",
    slug: "coilover-suspension-install",
    title: "Coilover Suspension Installation",
    description:
      "Complete coilover suspension installation with corner balancing and alignment. Lower your vehicle and improve handling with precise setup.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Suspension+Install",
    ],
    durationMinutes: 300,
    basePrice: 550,
    requiresDeposit: true,
    depositAmount: 200,
    visible: true,
    tags: ["installation", "suspension", "handling", "featured"],
    createdAt: "2024-02-01",
  },
  {
    _id: "4",
    slug: "full-vehicle-wrap",
    title: "Complete Vehicle Wrap",
    description:
      "Transform your vehicle with a professional vinyl wrap. Choose from hundreds of colors and finishes. Includes full wrap, trimming, and heat application.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Vehicle+Wrap",
    ],
    durationMinutes: 1440,
    basePrice: 2499.99,
    requiresDeposit: true,
    depositAmount: 500,
    visible: true,
    tags: ["exterior", "wrap", "cosmetic", "featured"],
    createdAt: "2024-01-25",
  },
  {
    _id: "5",
    slug: "brake-system-upgrade",
    title: "Big Brake System Installation",
    description:
      "Upgrade to high-performance brake calipers and rotors. Includes installation, brake fluid flush, and bedding procedure.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Brake+Upgrade",
    ],
    durationMinutes: 360,
    basePrice: 800,
    requiresDeposit: true,
    depositAmount: 250,
    visible: true,
    tags: ["installation", "brakes", "performance", "safety"],
    createdAt: "2024-02-05",
  },
  {
    _id: "6",
    slug: "interior-detail-premium",
    title: "Premium Interior Detailing",
    description:
      "Deep cleaning and restoration of your interior. Steam cleaning, leather conditioning, stain removal, and odor elimination.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Interior+Detail",
    ],
    durationMinutes: 240,
    basePrice: 299.99,
    requiresDeposit: false,
    depositAmount: 0,
    visible: true,
    tags: ["detailing", "interior", "cleaning"],
    createdAt: "2024-02-08",
  },
  {
    _id: "7",
    slug: "turbo-installation",
    title: "Turbocharger Installation",
    description:
      "Complete turbo kit installation including all piping, intercooler, wastegate, and oil lines. Includes initial tune and testing.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Turbo+Install",
    ],
    durationMinutes: 720,
    basePrice: 1999.99,
    requiresDeposit: true,
    depositAmount: 600,
    visible: true,
    tags: ["installation", "turbo", "performance", "featured"],
    createdAt: "2024-01-30",
  },
  {
    _id: "8",
    slug: "ceramic-coating",
    title: "Ceramic Paint Coating",
    description:
      "5-year ceramic coating protection. Paint correction, decontamination, and professional ceramic application for ultimate shine and protection.",
    images: [
      "https://via.placeholder.com/600x400/1a1a1a/dc2626?text=Ceramic+Coating",
    ],
    durationMinutes: 480,
    basePrice: 1299.99,
    requiresDeposit: true,
    depositAmount: 300,
    visible: true,
    tags: ["detailing", "exterior", "protection", "featured"],
    createdAt: "2024-02-10",
  },
];

// Mock available time slots
const generateTimeSlots = (date) => {
  const slots = [];
  const hours = [9, 10, 11, 13, 14, 15, 16];
  hours.forEach((hour) => {
    slots.push({
      time: `${hour}:00`,
      available: Math.random() > 0.3,
    });
  });
  return slots;
};

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Booking state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStep, setBookingStep] = useState(1); // 1: Date/Time, 2: Confirmation
  const [customerMessage, setCustomerMessage] = useState("");

  const allTags = [...new Set(services.flatMap((s) => s.tags))];

  // Filter and sort services
  useEffect(() => {
    let filtered = [...services];

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((s) =>
        selectedTags.some((tag) => s.tags.includes(tag))
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "duration-short":
        filtered.sort((a, b) => a.durationMinutes - b.durationMinutes);
        break;
      case "duration-long":
        filtered.sort((a, b) => b.durationMinutes - a.durationMinutes);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          const aFeatured = a.tags.includes("featured") ? 1 : 0;
          const bFeatured = b.tags.includes("featured") ? 1 : 0;
          return bFeatured - aFeatured;
        });
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedTags, sortBy, services]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const openBookingModal = (service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
    setBookingStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerMessage("");
  };

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const changeMonth = (delta) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1)
    );
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const selectDate = (day) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setSelectedDate(selected);
      setAvailableSlots(generateTimeSlots(selected));
      setSelectedTime(null);
    }
  };

  const handleBooking = () => {
    // This would integrate with your backend API
    alert(
      `Booking confirmed!\nService: ${
        selectedService.title
      }\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTime}\n${
        selectedService.requiresDeposit
          ? `Deposit: £${selectedService.depositAmount}`
          : ""
      }`
    );
    setIsBookingModalOpen(false);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
                <a
                  href="/shop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </a>
                <a href="/services" className="text-red-600 font-semibold">
                  Services
                </a>
              </nav>
            </div>

            <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105">
              My Bookings
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            PROFESSIONAL <span className="text-red-600">SERVICES</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Expert automotive services from certified technicians. Book your
            appointment and experience excellence.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="sticky top-20 z-30 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-short">Duration: Shortest</option>
                <option value="duration-long">Duration: Longest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="sm:hidden bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

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

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No services found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service._id}
                  className="group bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-gray-800 hover:border-red-600 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
                >
                  {/* Service Image */}
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {service.tags.includes("featured") && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        FEATURED
                      </div>
                    )}
                    {service.requiresDeposit && (
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                        <CreditCard className="w-3 h-3" />
                        <span>Deposit Required</span>
                      </div>
                    )}
                  </div>

                  {/* Service Info */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-bold text-xl mb-3 group-hover:text-red-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(service.durationMinutes)}</span>
                      </div>
                      <div className="text-2xl font-black text-red-600">
                        £{service.basePrice.toFixed(2)}
                      </div>
                    </div>

                    {service.requiresDeposit && (
                      <div className="mb-4 text-xs text-gray-400 bg-gray-800/50 rounded px-3 py-2">
                        Deposit: £{service.depositAmount} required
                      </div>
                    )}

                    <button
                      onClick={() => openBookingModal(service)}
                      className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-red-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">
                    {selectedService.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDuration(selectedService.durationMinutes)}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-red-600">
                      £{selectedService.basePrice.toFixed(2)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      bookingStep >= 1 ? "bg-red-600" : "bg-gray-800"
                    } font-bold`}
                  >
                    {bookingStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                  </div>
                  <div
                    className={`h-1 w-16 ${
                      bookingStep >= 2 ? "bg-red-600" : "bg-gray-800"
                    }`}
                  />
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      bookingStep >= 2 ? "bg-red-600" : "bg-gray-800"
                    } font-bold`}
                  >
                    2
                  </div>
                </div>
              </div>

              {bookingStep === 1 && (
                <>
                  {/* Calendar */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">
                      Select Date & Time
                    </h3>

                    {/* Calendar Header */}
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => changeMonth(-1)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                          disabled={
                            currentMonth.getMonth() === today.getMonth() &&
                            currentMonth.getFullYear() === today.getFullYear()
                          }
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h4 className="text-lg font-bold">
                          {currentMonth.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </h4>
                        <button
                          onClick={() => changeMonth(1)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-xs font-semibold text-gray-400 py-2"
                            >
                              {day}
                            </div>
                          )
                        )}

                        {[...Array(startingDayOfWeek)].map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}

                        {[...Array(daysInMonth)].map((_, i) => {
                          const day = i + 1;
                          const date = new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                          );
                          const isPast = date < today;
                          const isSelected =
                            selectedDate &&
                            date.getDate() === selectedDate.getDate() &&
                            date.getMonth() === selectedDate.getMonth() &&
                            date.getFullYear() === selectedDate.getFullYear();

                          return (
                            <button
                              key={day}
                              onClick={() => selectDate(day)}
                              disabled={isPast}
                              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                                isPast
                                  ? "text-gray-600 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-red-600 text-white scale-110"
                                  : "bg-gray-800 hover:bg-gray-700 text-white"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="font-bold mb-3">
                          Available Times for{" "}
                          {selectedDate.toLocaleDateString()}
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {availableSlots.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() =>
                                slot.available && setSelectedTime(slot.time)
                              }
                              disabled={!slot.available}
                              className={`py-3 rounded-lg text-sm font-semibold transition-all ${
                                !slot.available
                                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                  : selectedTime === slot.time
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-800 hover:bg-gray-700 text-white"
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Message */}
                  <div className="mb-6">
                    <label className="block font-bold mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={customerMessage}
                      onChange={(e) => setCustomerMessage(e.target.value)}
                      placeholder="Any specific requirements or questions?"
                      rows="4"
                      className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed py-4 rounded-lg font-bold text-lg transition-all"
                  >
                    Continue to Confirmation
                  </button>
                </>
              )}

              {bookingStep === 2 && (
                <>
                  {/* Confirmation */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-6">
                      Confirm Your Booking
                    </h3>

                    <div className="bg-gray-900 rounded-lg p-6 mb-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-gray-400">Service:</span>
                        <span className="font-semibold text-right">
                          {selectedService.title}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-400">Date:</span>
                        <span className="font-semibold">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-400">Time:</span>
                        <span className="font-semibold">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-semibold">
                          {formatDuration(selectedService.durationMinutes)}
                        </span>
                      </div>
                      {customerMessage && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400">Notes:</span>
                          <span className="font-semibold text-right max-w-xs">
                            {customerMessage}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="bg-gray-900 rounded-lg p-6 mb-6">
                      <h4 className="font-bold mb-4">Payment Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Service Price:</span>
                          <span className="font-semibold">
                            £{selectedService.basePrice.toFixed(2)}
                          </span>
                        </div>
                        {selectedService.requiresDeposit && (
                          <>
                            <div className="flex justify-between text-red-600">
                              <span>Deposit Required Today:</span>
                              <span className="font-bold">
                                £{selectedService.depositAmount.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                              <span>Remaining Balance:</span>
                              <span>
                                £
                                {(
                                  selectedService.basePrice -
                                  selectedService.depositAmount
                                ).toFixed(2)}
                              </span>
                            </div>
                          </>
                        )}
                        <div className="border-t border-gray-800 pt-3 flex justify-between text-xl font-black">
                          <span>Total Due:</span>
                          <span className="text-red-600">
                            £
                            {selectedService.requiresDeposit
                              ? selectedService.depositAmount.toFixed(2)
                              : selectedService.basePrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Important Info */}
                    {selectedService.requiresDeposit && (
                      <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 mb-6 flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-red-600 mb-1">
                            Deposit Required
                          </p>
                          <p className="text-gray-300">
                            A deposit of £
                            {selectedService.depositAmount.toFixed(2)} is
                            required to secure your booking. The remaining
                            balance of £
                            {(
                              selectedService.basePrice -
                              selectedService.depositAmount
                            ).toFixed(2)}{" "}
                            will be due upon completion of service.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 py-4 rounded-lg font-bold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBooking}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-lg font-bold transition-all hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Confirm & Pay</span>
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    You will be redirected to our secure payment processor to
                    complete your booking.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              WHY CHOOSE <span className="text-red-600">TTC</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Excellence in every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 border-2 border-red-600/30 rounded-full mb-4">
                <Wrench className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Technicians</h3>
              <p className="text-gray-400">
                ASE certified professionals with years of experience in
                high-performance automotive work.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 border-2 border-red-600/30 rounded-full mb-4">
                <Star className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-400">
                All work backed by our satisfaction guarantee and comprehensive
                warranty coverage.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 border-2 border-red-600/30 rounded-full mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Turnaround</h3>
              <p className="text-gray-400">
                Efficient service without compromising quality. We respect your
                time and your vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
            READY TO UPGRADE?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Book your service today and experience the Top Tier Customs
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Browse Services</span>
            </button>
            <a
              href="tel:+442012345678"
              className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Call Us: +44 20 1234 5678</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-3xl font-black mb-4">
            <span className="text-white">TT</span>
            <span className="text-red-600">C</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            London's premier automotive customization specialists.
          </p>
          <div className="text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Top Tier Customs LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
