import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearError } from "./store/authSlice";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle
} from "lucide-react";

// ✅ use simple SVGs for Google & GitHub logos
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4">
    <path fill="#EA4335" d="M488 261.8c0-17.4-1.4-34.2-4-50.5H249v95.7h135c-5.8 31.3-23 57.8-49 75.5v62h79.2c46.4-42.7 73-105.6 73-182.7z" />
    <path fill="#34A853" d="M249 492c66 0 121.3-21.8 161.7-59.5l-79.2-62c-22 14.8-50.1 23.5-82.5 23.5-63.5 0-117.3-42.8-136.4-100.4h-82.8v63.2C70.7 440.4 152.3 492 249 492z" />
    <path fill="#4A90E2" d="M112.6 293.6c-4.8-14.8-7.6-30.4-7.6-46.6s2.8-31.8 7.6-46.6v-63.2h-82.8C11.3 182 0 214.4 0 247s11.3 65 29.8 90.2l82.8-63.6z" />
    <path fill="#FBBC05" d="M249 97.5c36 0 68.2 12.4 93.8 36.6l70.3-70.3C370.3 26.4 315 4 249 4 152.3 4 70.7 55.6 29.8 156.8l82.8 63.2C131.7 140.3 185.5 97.5 249 97.5z" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
    <path
      fill="currentColor"
      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-2.9 0-5.2-1.6-5.2-3.6 0-2 2.3-3.6 5.2-3.6 2.9 0 5.2 1.6 5.2 3.6zm-33.6-6.8c-.7 1.6-2.6 2.2-4.1 1.4-1.5-.8-2.1-2.7-1.4-4.2.7-1.6 2.6-2.2 4.1-1.4 1.5.8 2.1 2.6 1.4 4.2zm25.5 8.3c-1.1 1.5-3.4 1.3-5-.5-1.6-1.8-1.8-4.4-.7-5.9 1.1-1.5 3.4-1.3 5 .5 1.6 1.8 1.8 4.4.7 5.9zm29.7 2.7c0 1.8-2.3 3.2-5.2 3.2s-5.2-1.4-5.2-3.2c0-1.8 2.3-3.2 5.2-3.2s5.2 1.4 5.2 3.2zM244 8C109.2 8 0 117.8 0 252.6c0 108.3 69.8 200.4 166.5 232.8 12.2 2.3 16.5-5.3 16.5-11.7 0-5.8-.2-25.1-.4-45.6-67.7 14.7-82-29.1-82-29.1-11.1-28.5-27.1-36.1-27.1-36.1-22.1-15.1 1.7-14.8 1.7-14.8 24.4 1.7 37.2 25.2 37.2 25.2 21.7 37.2 56.9 26.4 70.8 20.2 2.2-15.7 8.5-26.4 15.4-32.5-54-6.1-110.8-27.3-110.8-121.6 0-26.9 9.6-48.9 25.4-66.1-2.6-6.2-11-31.1 2.4-64.9 0 0 20.6-6.6 67.4 25.2a233.74 233.74 0 0 1 122.8 0c46.8-31.8 67.4-25.2 67.4-25.2 13.4 33.8 5 58.7 2.4 64.9 15.8 17.2 25.4 39.2 25.4 66.1 0 94.6-56.9 115.4-111 121.4 8.8 7.6 16.6 22.5 16.6 45.4 0 32.8-.3 59.2-.3 67.2 0 6.4 4.3 14.1 16.7 11.7C426.2 453 496 360.9 496 252.6 496 117.8 386.8 8 252 8z"
    />
  </svg>
);

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    // Clear errors when user starts typing
    if (localError) setLocalError("");
    if (error) dispatch(clearError());
  }

  function validate() {
    if (!form.email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email";
    if (!form.password) return "Password is required";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Clear previous errors
    setLocalError("");
    dispatch(clearError());

    // Validate form
    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    // Dispatch login action
    dispatch(loginUser({
      email: form.email,
      password: form.password
    }));
  }

  // Log user data and redirect on successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("🎉 LOGIN SUCCESSFUL!");
      console.log("=== USER DATA ===");
      console.log("User Object:", user);
      console.log("Email:", user.email);
      console.log("Name:", user.name || user.username || "Not provided");
      console.log("Role:", user.role || "Not specified");
      console.log("User ID:", user.id || user._id || "Not available");
      console.log("Token:", token ? `${token.substring(0, 20)}...` : "No token");
      console.log("=== ADDITIONAL USER PROPERTIES ===");
      
      // Log all properties of the user object
      if (user) {
        Object.keys(user).forEach(key => {
          console.log(`${key}:`, user[key]);
        });
      }
      
      console.log("=== STORED DATA ===");
      console.log("LocalStorage Token:", localStorage.getItem('token'));
      console.log("LocalStorage User:", localStorage.getItem('user'));
      
      // Navigate to /sales route after successful login
      setTimeout(() => {
        navigate('/sales');
      }, 1000); // Small delay to see the console logs
    }
  }, [isAuthenticated, user, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-emerald-50 p-6">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
                <p className="text-sm text-slate-500">Sign in to your account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <label className="block">
                <span className="text-sm text-slate-600">Email</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    disabled={loading}
                  />
                </div>
              </label>

              {/* Password field */}
              <label className="block">
                <span className="text-sm text-slate-600">Password</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-12 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    disabled={loading}
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-emerald-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Error Messages */}
              {(localError || error) && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
                  <p className="text-rose-600 text-sm text-center">
                    {localError || error}
                  </p>
                </div>
              )}

              {/* Success Message - Show briefly before redirect */}
              {isAuthenticated && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-600">
                    <CheckCircle className="w-5 h-5" />
                    <div>Logged in successfully — redirecting to sales!</div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Social buttons */}
            <div className="my-6 flex items-center text-sm text-slate-400">
              <div className="flex-1 h-px bg-slate-100" />
              <div className="px-3">Or continue with</div>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 bg-white hover:shadow-sm transition-shadow duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <GoogleIcon />
                <span className="text-sm">Google</span>
              </button>
              <button 
                type="button"
                className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 bg-white hover:shadow-sm transition-shadow duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <GithubIcon />
                <span className="text-sm">GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="#" className="text-emerald-600 font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-slate-400">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}