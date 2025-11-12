import React, { useState } from "react";
import axiosInstance from "./utils/axiosConfig";

function AddNewUser({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "data_outlet",
    outletId: "",
    outlet: "",
    zone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isActive: true,
      };

      const registerResponse = await axiosInstance.post("/auth/register", registerData);
      const newUser = registerResponse.data;

      if (formData.role === "data_outlet" && formData.outletId) {
        try {
          await axiosInstance.patch(`/users/${newUser._id || newUser.id}/role`, {
            role: formData.role,
            outletId: formData.outletId,
          });
        } catch (updateError) {
          console.warn("User created but role update failed:", updateError);
        }
      }

      if (onUserAdded) onUserAdded(newUser);
      if (onClose) onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create user. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const showOutletFields = formData.role === "data_outlet";
  const showZoneField = formData.role === "data_report";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white/80 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.3s_ease]"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Add New User</h2>
            <p className="text-sm text-blue-100 mt-1">
              Create and assign user permissions
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Component */}
            {[
              { label: "Full Name", name: "name", type: "text", required: true },
              { label: "Email", name: "email", type: "email", required: true },
              { label: "Password", name: "password", type: "password", required: true },
            ].map((input) => (
              <div key={input.name} className="relative">
                <input
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleInputChange}
                  required={input.required}
                  className="peer w-full px-3 pt-5 pb-2 border border-gray-300 rounded-xl bg-white/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-transparent"
                  placeholder={input.label}
                />
                <label
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  {input.label} *
                </label>
              </div>
            ))}

            {/* ROLE SELECT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400"
              >
                <option value="data_outlet">Data Outlet</option>
                <option value="report">Report Viewer</option>
                <option value="data_report">Data + Report</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {/* OUTLET FIELDS */}
            {showOutletFields && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outlet ID
                  </label>
                  <input
                    type="text"
                    name="outletId"
                    value={formData.outletId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Outlet *
                  </label>
                  <select
                    name="outlet"
                    required
                    value={formData.outlet}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Outlet</option>
                    <option value="OUT001">Outlet A</option>
                    <option value="OUT002">Outlet B</option>
                  </select>
                </div>
              </div>
            )}

            {/* ZONE FIELDS */}
            {showZoneField && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Zone *
                  </label>
                  <select
                    name="zone"
                    required
                    value={formData.zone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Zone</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Outlet Name *
                  </label>
                  <input
                    type="text"
                    name="outletName"
                    required
                    value={formData.outletName || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create User"}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewUser;
