import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close mobile menu after navigation
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  // Redirect to login if not authenticated and trying to access protected routes
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
        {/* Left: Logo + Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
         
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
          {isAuthenticated ? (
            // Authenticated User Menu
            <>
              <button
                onClick={() => handleNavigate("/sales")}
                className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>

              <button
                onClick={() => handleNavigate("/reports")}
                className="hover:text-emerald-600 flex items-center gap-1 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Reports
              </button>



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
          ) : (
            // Non-Authenticated User Menu
            <>

            </>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            // Authenticated User - Logout Button
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            // Non-Authenticated User - Login Button
            <button
              onClick={() => handleNavigate("/login")}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile menu button */}
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

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-fadeIn">
          <nav className="flex flex-col py-2 text-gray-700">
            {isAuthenticated ? (
              // Authenticated Mobile Menu
              <>
                {/* User Info */}
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
                <button
                  onClick={() => handleNavigate("/reports")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" /> Reports
                </button>
                <button
                  onClick={() => handleNavigate("/settings")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
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
              // Non-Authenticated Mobile Menu
              <>
                <button
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4" /> Home
                </button>
                <button
                  onClick={() => handleNavigate("/login")}
                  className="flex items-center gap-2 px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4" /> Login
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}