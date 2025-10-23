import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          
          {/* Left Section - Brand Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 ring-1 ring-white/20 shadow-sm flex-shrink-0"
              aria-hidden
            >
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3v18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">
                Fuel Station Tracker
              </h3>
              <p className="text-sm text-white/90 mt-1">
                Smart monitoring & simple reporting for stations.
              </p>
              <p className="text-xs text-white/80 mt-2">
                © {new Date().getFullYear()} Fuel Station Tracker · Developed by{" "}
                <span className="font-medium text-white">Ashish Patel</span>
              </p>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full lg:w-auto">
            <div>
              <h4 className="font-medium text-white/95 mb-3 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-white/90 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors block py-1">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white/95 mb-3 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-white/90 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors block py-1">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Contact</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-medium text-white/95 mb-3 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-white/90 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors block py-1">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors block py-1">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Right Section - Newsletter & Social */}
          <div className="flex flex-col items-start gap-4 w-full lg:w-auto">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/10 rounded-md px-3 py-2 w-full"
              aria-label="Subscribe form"
            >
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                required
                className="bg-transparent placeholder-white/70 text-white text-sm outline-none py-2 flex-1 min-w-0"
              />
              <button
                type="submit"
                className="bg-white text-emerald-600 px-4 py-2 rounded-md text-sm font-medium hover:opacity-95 transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            <div className="flex items-center gap-3 w-full justify-center sm:justify-start">
              <a
                href="mailto:support@fueltracker.com"
                aria-label="Email"
                title="Email"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-white/95" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Github className="w-5 h-5 text-white/95" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Linkedin className="w-5 h-5 text-white/95" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-10 border-t border-white/10 pt-6 text-xs text-white/80 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <span className="text-center sm:text-left">Built with ❤️ for reliable station operations.</span>
          <span className="text-white/70">Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}