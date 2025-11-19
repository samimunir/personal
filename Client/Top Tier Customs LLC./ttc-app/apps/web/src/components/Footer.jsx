import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
// import TTCLogo from '../assets/ttc-logo.png'; // Uncomment and adjust path when you add your logo

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-black to-gray-900 border-t border-white/10 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo Section */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Optional: Uncomment to use actual logo image */}
                {/* <img 
                  src={TTCLogo} 
                  alt="Top Tier Customs Logo" 
                  className="w-full h-full object-contain"
                /> */}

                {/* Placeholder Logo (remove when using actual image) */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 rounded-lg transform rotate-45 opacity-20"></div>
                <div className="relative text-xl font-black">
                  <span className="text-white">TT</span>
                  <span className="text-red-600">C</span>
                </div>
              </div>

              <div className="text-lg font-black">
                <span className="text-white">TOP TIER</span>
                <br />
                <span className="text-red-600">CUSTOMS</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              London's premier automotive customization specialists delivering
              excellence since 2010.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 text-red-600 text-lg">Quick Links</h3>
            <div className="space-y-3">
              {["Services", "About Us", "Gallery", "Shop", "Careers"].map(
                (link, i) => (
                  <a
                    key={i}
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="block text-gray-400 hover:text-red-600 transition-colors text-sm group"
                  >
                    <span className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{link}</span>
                    </span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4 text-red-600 text-lg">Contact</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                <span>
                  123 Custom Street
                  <br />
                  London, United Kingdom
                  <br />
                  SW1A 1AA
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-red-600" />
                <a
                  href="tel:+442012345678"
                  className="hover:text-red-600 transition-colors"
                >
                  +44 20 1234 5678
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-red-600" />
                <a
                  href="mailto:info@toptiercustoms.com"
                  className="hover:text-red-600 transition-colors"
                >
                  info@toptiercustoms.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-bold mb-4 text-red-600 text-lg">
              Business Hours
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="text-white font-semibold">9AM - 6PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-semibold">10AM - 4PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-gray-500">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>
              &copy; {currentYear} Top Tier Customs LLC. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-red-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
