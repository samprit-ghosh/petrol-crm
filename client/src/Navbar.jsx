import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportMenuOpen, setReportMenuOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reportMenuRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { zones } = useSelector((state) => state.zones);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
    setReportMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  // ✅ Close the reports dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reportMenuRef.current && !reportMenuRef.current.contains(event.target)) {
        setReportMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const protectedRoutes = ["/sales", "/reports", "/settings", "/dashboard"];
    if (!isAuthenticated && protectedRoutes.includes(currentPath)) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 relative">
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavigate("/sales")}
                className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>

              {/* Reports Dropdown */}
              <div className="relative" ref={reportMenuRef}>
                <button
                  onClick={() => setReportMenuOpen((prev) => !prev)}
                  className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Reports
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform ${
                      reportMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {reportMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn p-2 z-50">
                    <button
                      onClick={() => handleNavigate("/reports")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md"
                    >
                      📘 Pre Data Training
                    </button>
                    <button
                      onClick={() => handleNavigate("/comparision")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md"
                    >
                      📊 Comparison Report
                    </button>

                    {/* Zone Dropdown */}
             
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigate("/")}
                className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <Users className="w-4 h-4" />
                Data Upload
              </button>

              {/* User Info */}
              {user && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                  <User className="w-3 h-3 text-gray-600" />
                  <span className="text-xs text-gray-700">
                    {user.name || user.email}
                  </span>
                </div>
              )}
            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-fadeIn">
          <nav className="flex flex-col py-2 text-gray-700">
            {isAuthenticated ? (
              <>
                {user && (
                  <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.name || user.email}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => handleNavigate("/sales")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>

                <details className="group">
                  <summary className="flex items-center gap-2 px-6 py-2 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                    <BarChart3 className="w-4 h-4" />
                    Reports
                    <ChevronDown className="w-4 h-4 ml-auto group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-12 flex flex-col gap-1 pb-2">
                    <button
                      onClick={() => handleNavigate("/reports/pre")}
                      className="text-left py-1 text-sm text-gray-700 hover:text-emerald-700"
                    >
                      📘 Pre Data Training
                    </button>
                    <button
                      onClick={() => handleNavigate("/reports/comparison")}
                      className="text-left py-1 text-sm text-gray-700 hover:text-emerald-700"
                    >
                      📊 Comparison Report
                    </button>

                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="mt-2 border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 text-sm w-44 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="">Select Zone</option>
                      {zones?.map((zone) => (
                        <option key={zone.id} value={zone.name}>
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </details>

                <button
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4" /> Data Upload
                </button>

                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/login")}
                className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
              >
                <Users className="w-4 h-4" /> Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
