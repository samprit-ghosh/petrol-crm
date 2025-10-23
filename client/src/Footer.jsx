import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          
          {/* Left Section - Brand Info */}
          <div className="flex items-start md:items-center gap-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 ring-1 ring-white/20 shadow-sm"
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

            <div>
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
          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div>
              <h4 className="font-medium text-white/95 mb-2">Product</h4>
              <ul className="space-y-1 text-white/90">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white/95 mb-2">Company</h4>
              <ul className="space-y-1 text-white/90">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-white/95 mb-2">Legal</h4>
              <ul className="space-y-1 text-white/90">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Right Section - Newsletter & Social */}
          <div className="flex flex-col items-start gap-4 w-full md:w-auto">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-white/10 rounded-md px-2 py-1 w-full md:w-auto"
              aria-label="Subscribe form"
            >
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="bg-transparent placeholder-white/70 text-white text-sm outline-none px-2 py-2 flex-1"
              />
              <button
                type="submit"
                className="bg-white text-emerald-600 px-3 py-2 rounded-md text-sm font-medium hover:opacity-95 transition"
              >
                Join
              </button>
            </form>

            <div className="flex items-center gap-3">
              <a
                href="mailto:support@fueltracker.com"
                aria-label="Email"
                title="Email"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-white/95" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Github className="w-4 h-4 text-white/95" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition transform hover:-translate-y-0.5"
              >
                <Linkedin className="w-4 h-4 text-white/95" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/80 flex flex-col sm:flex-row gap-3 justify-between">
          <span>Built with ❤️ for reliable station operations.</span>
          <span className="text-white/70">Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
