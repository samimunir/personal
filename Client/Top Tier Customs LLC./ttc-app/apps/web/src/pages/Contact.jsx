import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Custom Lane", "London, UK", "W1A 1AA"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+44 20 1234 5678", "+44 20 8765 4321", "Mon-Sat: 9AM-6PM"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: [
        "info@toptiercustoms.com",
        "service@toptiercustoms.com",
        "sales@toptiercustoms.com",
      ],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9AM - 6PM",
        "Saturday: 10AM - 4PM",
        "Sunday: Closed",
      ],
    },
  ];

  const serviceTypes = [
    "Performance Tuning",
    "Custom Bodywork",
    "Interior Styling",
    "Suspension & Handling",
    "Exhaust Systems",
    "Electronics & Retrofits",
    "General Inquiry",
    "Other",
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity. Simple installations may take 1-2 days, while complete builds can take 4-8 weeks. We'll provide a detailed timeline during consultation.",
    },
    {
      question: "Do you offer financing options?",
      answer:
        "Yes, we partner with several financing providers to offer flexible payment plans for larger projects. Contact us to discuss available options.",
    },
    {
      question: "What brands do you work with?",
      answer:
        "We specialize in German platforms (BMW, Audi, Mercedes, Porsche) but work with all major automotive brands. We source OEM and premium aftermarket parts.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <p className="uppercase tracking-widest text-xs text-gray-400">
              Get in touch
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
              Let's bring your{" "}
              <span className="text-red-600">vision to life</span>
            </h1>
            <p className="mt-5 text-gray-400 text-lg">
              Whether you're ready to start a build or just exploring options,
              our team is here to help. Reach out and let's discuss your
              project.
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
      </section>

      {/* Contact Info Cards */}
      <section className="border-b border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <article
                key={i}
                className="group rounded-xl border-2 border-gray-800 hover:border-red-600 transition-all bg-gradient-to-br from-gray-900 to-black p-6 hover:shadow-2xl hover:shadow-red-600/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 group-hover:border-red-600 transition text-red-500">
                  {info.icon}
                </div>
                <h3 className="mt-4 font-bold text-lg group-hover:text-red-500 transition-colors">
                  {info.title}
                </h3>
                <div className="mt-3 space-y-1">
                  {info.details.map((detail, j) => (
                    <p key={j} className="text-sm text-gray-400">
                      {detail}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form + Map */}
      <section className="border-b border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-black">
                  Send us a message
                </h2>
              </div>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours during business days.
              </p>

              {submitted ? (
                <div className="rounded-xl border-2 border-green-600 bg-green-600/10 p-8 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thank you for contacting us. We'll respond shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Vehicle
                      </label>
                      <input
                        type="text"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition"
                        placeholder="e.g., BMW M3 2020"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Service Type
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition"
                    >
                      <option value="">Select a service...</option>
                      {serviceTypes.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-red-600 focus:outline-none transition resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full px-6 py-4 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold inline-flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-red-600/30"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-4">
                  Find us
                </h2>
                <p className="text-gray-400">
                  Visit our workshop to see builds in progress and discuss your
                  project in person. Drop-ins welcome during business hours.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 bg-gray-900 aspect-video">
                {/* Replace with actual map embed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-400">Map integration</p>
                    <p className="text-sm text-gray-500">
                      123 Custom Lane, London W1A 1AA
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 p-6">
                <h3 className="font-bold text-lg mb-4">
                  Prefer to call instead?
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Speak directly with our team to discuss your project, get a
                  quote, or schedule a consultation.
                </p>
                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  +44 20 1234 5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 hover:border-red-600 transition-all p-6"
              >
                <summary className="cursor-pointer font-bold text-lg list-none flex items-center justify-between">
                  {faq.question}
                  <ArrowRight className="w-5 h-5 text-red-500 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-b border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Follow our builds
          </h2>
          <p className="text-gray-400 mb-8">
            See our latest projects and behind-the-scenes content on social
            media.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-600 hover:bg-red-600/10 transition text-gray-400 hover:text-red-500"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-600 hover:bg-red-600/10 transition text-gray-400 hover:text-red-500"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 border border-gray-800 hover:border-red-600 hover:bg-red-600/10 transition text-gray-400 hover:text-red-500"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black">
            Ready to get started?
          </h2>
          <p className="mt-3 text-gray-400">
            Book a consultation or browse our services to see what we can do for
            your build.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="/services"
              className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold inline-flex items-center gap-2"
            >
              View Services <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/shop"
              className="px-5 py-3 rounded-lg border border-gray-800 hover:border-red-600 transition"
            >
              Shop Products
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-white/50 border-t border-gray-800">
        © {new Date().getFullYear()} Top Tier Customs LLC
      </footer>
    </div>
  );
}
