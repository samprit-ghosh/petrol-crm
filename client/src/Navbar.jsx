import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close mobile menu after navigation
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 shadow-sm">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-800 text-lg">
            Fuel Station Tracker
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button
            onClick={() => handleNavigate("/sales")}
            className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>

          <button
            onClick={() => handleNavigate("/login")}
            className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <Users className="w-4 h-4" />
            Login
          </button>

          <button
            onClick={() => handleNavigate("/")}
            className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <Users className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => handleNavigate("/reports")}
            className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Reports
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavigate("/logout")}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-fadeIn">
          <nav className="flex flex-col py-2 text-gray-700">
            <button
              onClick={() => handleNavigate("/sales")}
              className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50"
            >
              <Users className="w-4 h-4" /> Login
            </button>
            <button
              onClick={() => handleNavigate("/reports")}
              className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50"
            >
              <BarChart3 className="w-4 h-4" /> Reports
            </button>
            <button
              onClick={() => handleNavigate("/settings")}
              className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <hr className="my-2" />
            <button
              onClick={() => handleNavigate("/logout")}
              className="flex items-center gap-2 px-6 py-2 text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
