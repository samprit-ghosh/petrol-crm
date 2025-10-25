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

      const registerResponse = await axiosInstance.post(
        "/auth/register",
        registerData
      );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

    {/* MODAL CONTENT */}
      <div
        onClick={(e) => e.stopPropagation()} // ✅ prevent background click
        className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md overflow-y-auto border border-white/20"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-5 text-white relative">
          <h2 className="text-xl font-bold">Add New User</h2>
          <p className="text-blue-100 text-sm mt-1">
            Create a new user with permissions
          </p>

          {/* CLOSE BUTTON ✅ FIXED */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-blue-100 p-1 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mx-5 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              minLength="6"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full mt-1 p-3 border rounded-xl"
            >
              <option value="data_outlet">Data Outlet</option>
              <option value="report">Report Viewer</option>
              <option value="data_report">Data + Report</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* OUTLET & ZONE FIELDS */}
          {showOutletFields && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">Outlet ID</label>
                <input
                  type="text"
                  name="outletId"
                  value={formData.outletId}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border rounded-xl"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Assigned Outlet *
                </label>
                <select
                  name="outlet"
                  required
                  value={formData.outlet}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border rounded-xl"
                >
                  <option value="">Select Outlet</option>
                  <option value="OUT001">Outlet A</option>
                  <option value="OUT002">Outlet B</option>
                </select>
              </div>
            </>
          )}

          {showZoneField && (
            <>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Select Zone *
                </label>
                <select
                  name="zone"
                  required
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border rounded-xl"
                >
                  <option value="">Select Zone</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Outlet Name *</label>
                <input
                  type="text"
                  name="outletName"
                  required
                  value={formData.outletName || ""}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>
            </>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create User"}
            </button>

            {/* ✅ CANCEL FIXED */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewUser;
