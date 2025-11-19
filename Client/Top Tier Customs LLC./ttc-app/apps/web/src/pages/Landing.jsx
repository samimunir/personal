import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Wrench,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Award,
  Users,
  Phone,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Performance Tuning",
      description:
        "Unlock your vehicle's true potential with our expert ECU remapping and performance upgrades.",
      features: ["ECU Remapping", "Turbo Upgrades", "Exhaust Systems"],
      popular: true,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Custom Bodywork",
      description:
        "Transform your ride with bespoke body kits, wraps, and aerodynamic enhancements.",
      features: ["Body Kits", "Vinyl Wraps", "Aerodynamics"],
      popular: false,
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Interior Styling",
      description:
        "Premium interior modifications including custom upholstery, lighting, and electronics.",
      features: ["Custom Upholstery", "LED Lighting", "Audio Systems"],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "James Mitchell",
      vehicle: "BMW M3",
      text: "Top Tier Customs transformed my M3 into an absolute beast. The attention to detail is unmatched!",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      vehicle: "Audi RS6",
      text: "Professional service from start to finish. My RS6 has never looked or performed better.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      vehicle: "Mercedes AMG GT",
      text: "These guys are the real deal. Best custom work in London, hands down.",
      rating: 5,
    },
  ];

  const gallery = [
    { title: "BMW M5 Stage 3", category: "Performance", year: "2023" },
    { title: "Audi RS7 Carbon Kit", category: "Bodywork", year: "2024" },
    { title: "Mercedes C63 Interior", category: "Interior", year: "2023" },
    { title: "Porsche 911 Turbo", category: "Complete Build", year: "2024" },
  ];

  const stats = [
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Projects Completed",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "98%",
      label: "Client Satisfaction",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "5.0",
      label: "Average Rating",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

          {/* Parallax layer 1 - Slow moving */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-800 rounded-full blur-3xl opacity-20"></div>
          </div>

          {/* Parallax layer 2 - Medium speed */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-600 rounded-full animate-pulse"
                style={{
                  width: Math.random() * 4 + 1 + "px",
                  height: Math.random() * 4 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  animationDuration: Math.random() * 3 + 2 + "s",
                }}
              />
            ))}
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div
            className="animate-fade-in-up"
            style={{
              animation: "fadeInUp 1s ease-out forwards",
            }}
          >
            {/* Floating badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-red-600/30 rounded-full px-6 py-2 mb-8 hover:border-red-600/50 transition-all">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-300">
                Award-Winning Automotive Specialists
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white">
                ELEVATE YOUR
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse">
                RIDE
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              London's premier destination for{" "}
              <span className="text-red-500 font-semibold">
                high-performance
              </span>{" "}
              automotive customization and{" "}
              <span className="text-red-500 font-semibold">
                luxury modifications
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative bg-red-600 hover:bg-red-700 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Your Build</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>

              <button className="group px-10 py-4 rounded-xl font-bold text-lg bg-white/5 backdrop-blur-md border-2 border-white/20 hover:border-red-600/50 transition-all duration-300 hover:scale-105">
                <span className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-bounce">
              <div className="w-6 h-10 border-2 border-red-600/50 rounded-full mx-auto relative">
                <div className="w-1.5 h-3 bg-red-600 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="relative py-20 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="stats"
            data-animate
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
              isVisible.stats
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-red-600/50 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/20"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-red-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Scroll Animations */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="services-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["services-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              OUR <span className="text-red-600">SERVICES</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From performance upgrades to complete custom builds, we deliver
              excellence in every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                id={`service-${i}`}
                data-animate
                className={`group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 hover:border-red-600/50 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 ${
                  isVisible[`service-${i}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}

                <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center space-x-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-white/5 hover:bg-red-600 border border-white/20 hover:border-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105">
                  Learn More
                </button>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              id="about-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible["about-content"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
                WHY CHOOSE <span className="text-red-600">TTC?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With over 15 years of experience in the automotive customization
                industry, Top Tier Customs has established itself as London's
                premier destination for luxury vehicle modifications and
                performance upgrades.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">
                      Expert Craftsmanship
                    </h3>
                    <p className="text-gray-400">
                      Our team of certified technicians brings decades of
                      combined experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
                    <p className="text-gray-400">
                      We use only the finest materials and cutting-edge
                      technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">
                      Lifetime Warranty
                    </h3>
                    <p className="text-gray-400">
                      All our work is backed by comprehensive warranty coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="about-logo"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible["about-logo"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 rounded-3xl p-12 hover:border-red-600/50 transition-all group">
                <div className="text-center">
                  {/* Large TTC Logo Display */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative text-9xl font-black mb-6">
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                        TT
                      </span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-br from-red-600 to-red-800">
                        C
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xl font-semibold tracking-widest">
                    EXCELLENCE IN MOTION
                  </div>
                  <div className="mt-6 text-sm text-gray-500">
                    Est. 2010 • London, UK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Glassmorphism */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="testimonials-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["testimonials-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              CLIENT <span className="text-red-600">REVIEWS</span>
            </h2>
            <p className="text-gray-400">What our customers say about us</p>
          </div>

          <div className="relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl hover:border-red-600/50 transition-all">
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[activeTestimonial].rating)].map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-red-600 fill-red-600 mx-1"
                  />
                )
              )}
            </div>
            <p className="text-xl sm:text-2xl text-gray-300 text-center mb-8 italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>
            <div className="text-center">
              <div className="font-bold text-xl mb-1">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-red-600 text-sm font-semibold">
                {testimonials[activeTestimonial].vehicle}
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? "bg-red-600 w-12"
                      : "bg-gray-600 w-2 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section with Hover Effects */}
      <section id="gallery" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="gallery-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["gallery-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              FEATURED <span className="text-red-600">BUILDS</span>
            </h2>
            <p className="text-gray-400 text-lg">
              A showcase of our finest work and latest projects
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, i) => (
              <div
                key={i}
                id={`gallery-${i}`}
                data-animate
                className={`group relative aspect-square bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 ${
                  isVisible[`gallery-${i}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.title.split(" ")[0]}
                  </div>
                  <div className="text-lg font-semibold text-gray-400 mb-2">
                    {item.title.split(" ").slice(1).join(" ")}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {item.category}
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2">
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Year badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            id="cta"
            data-animate
            className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center transition-all duration-1000 hover:border-red-600/50 ${
              isVisible.cta ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              READY TO TRANSFORM YOUR RIDE?
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Book a consultation today and let's discuss your project. Your
              dream build is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50 flex items-center justify-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Schedule Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-red-600/50 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>Call Us Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
