import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchZonesData } from './store/zonesSlice';
import axiosInstance from "./utils/axiosConfig";

// Move helper functions to the top
const getZoneIcon = (zoneName) => {
  const zoneIcons = {
    'north': '❄️',
    'south': '🌴',
    'east': '🌅',
    'west': '🌄',
    'default': '🏢'
  };
  
  if (!zoneName) return zoneIcons.default;
  
  const lowerZone = zoneName.toLowerCase();
  if (lowerZone.includes('north')) return zoneIcons.north;
  if (lowerZone.includes('south')) return zoneIcons.south;
  if (lowerZone.includes('east')) return zoneIcons.east;
  if (lowerZone.includes('west')) return zoneIcons.west;
  return zoneIcons.default;
};

const getFootfallIcon = (footfallType) => {
  const icons = {
    'urban': '🏙️',
    'highway': '🛣️',
    'rural': '🌾',
    'default': '🏬'
  };
  return icons[footfallType?.toLowerCase()] || icons.default;
};

function EditUser({ user, onClose = () => {}, onUserUpdated }) {
  const dispatch = useDispatch();
  const { zones: zonesData, loading: zonesLoading, error: zonesError } = useSelector((state) => state.zones);

  const [formData, setFormData] = useState({
    role: "",
    outletId: "",
    outlet: "",
    zone: "",
    outletName: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableOutlets, setAvailableOutlets] = useState([]);

  // Fetch zones data on component mount
  useEffect(() => {
    dispatch(fetchZonesData());
  }, [dispatch]);

  // Transform zones data for dropdown - useMemo to prevent recreation on every render
  const zones = useMemo(() => {
    const zoneData = zonesData || {};
    return Object.keys(zoneData).map(zoneName => ({
      value: zoneName,
      label: `${getZoneIcon(zoneName)} ${zoneName} Zone`,
      outlets: zoneData[zoneName] || []
    }));
  }, [zonesData]); // Only recreate when zonesData changes

  // Initialize form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role || "",
        outletId: user.outletId || "",
        outlet: "",
        zone: user.zone || "",
        outletName: user.outletName || ""
      });
    }
  }, [user]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Update available outlets when zone changes - FIXED: removed zones from dependencies
  useEffect(() => {
    if (formData.zone && formData.role === "data_outlet") {
      const selectedZone = zones.find(zone => zone.value === formData.zone);
      if (selectedZone && selectedZone.outlets) {
        const outlets = selectedZone.outlets.map(outlet => ({
          value: outlet.id || outlet._id,
          label: `${getFootfallIcon(outlet.footfallType)} ${outlet.name} (${outlet.code})`,
          outletData: outlet
        }));
        setAvailableOutlets(outlets);
        
        // Auto-select the outlet if user already has one
        if (user?.outletId && !formData.outlet) {
          const userOutlet = outlets.find(outlet => outlet.value === user.outletId);
          if (userOutlet) {
            setFormData(prev => ({
              ...prev,
              outlet: userOutlet.value
            }));
          }
        }
      } else {
        setAvailableOutlets([]);
      }
    } else {
      setAvailableOutlets([]);
    }
  }, [formData.zone, formData.role, user?.outletId]); // Removed zones from dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-fill outlet ID when outlet is selected
    if (name === 'outlet' && value) {
      const selectedOutlet = availableOutlets.find(outlet => outlet.value === value);
      if (selectedOutlet && selectedOutlet.outletData) {
        const outletId = selectedOutlet.outletData.id || selectedOutlet.outletData._id;
        setFormData(prev => ({
          ...prev,
          outletId: outletId || ""
        }));
      }
    }

    // Reset dependent fields when role changes
    if (name === 'role') {
      setFormData(prev => ({
        ...prev,
        zone: "",
        outlet: "",
        outletId: "",
        outletName: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation for data_outlet role
    if (formData.role === "data_outlet") {
      if (!formData.zone) {
        setError("Please select a zone for Data Outlet role");
        setLoading(false);
        return;
      }
      if (!formData.outlet) {
        setError("Please select an outlet for Data Outlet role");
        setLoading(false);
        return;
      }
    }

    // Validation for data_report role
    if (formData.role === "data_report") {
      if (!formData.zone) {
        setError("Please select a zone for Data + Report role");
        setLoading(false);
        return;
      }
      if (!formData.outletName) {
        setError("Please enter outlet name for Data + Report role");
        setLoading(false);
        return;
      }
    }

    try {
      // Prepare update data - only send changed fields
      const updateData = {
        role: formData.role
      };

      // Add outlet data for data_outlet role
      if (formData.role === "data_outlet") {
        updateData.outletId = formData.outletId;
      }

      // For data_report role, add zone and outletName
      if (formData.role === "data_report") {
        updateData.outletName = formData.outletName.trim();
      }

      // Add zone for both data_outlet and data_report roles
      if (formData.role === "data_outlet" || formData.role === "data_report") {
        updateData.zone = formData.zone;
      }

      // Clear outletId if role is not data_outlet
      if (formData.role !== "data_outlet") {
        updateData.outletId = "";
      }

      console.log('Updating user with data:', updateData);
      console.log('User ID:', user?.id);

      // Make the PATCH API call to update user role
      const response = await axiosInstance.patch(`/users/${user?.id}/role`, updateData);

      const updatedUser = response.data;

      console.log('User updated successfully:', updatedUser);

      if (onUserUpdated) onUserUpdated(updatedUser);
      if (onClose) onClose();
      
    } catch (err) {
      console.error('Error updating user:', err);
      console.error('Error details:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.response?.data?.message
      });
      
      // Detailed error handling
      if (err.response?.status === 404) {
        setError("User update endpoint not found (404). Please check if the server is running.");
      } else if (err.response?.status === 401) {
        setError("Unauthorized. Please check your authentication token.");
      } else if (err.response?.status === 403) {
        setError("Forbidden. You don't have permission to update users.");
      } else if (err.response?.status === 400) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || "Please check your input data";
        setError(`Bad request: ${errorMsg}`);
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (err.code === 'NETWORK_ERROR') {
        setError("Network error. Please check your connection.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          err.response?.data?.error ||
          err.message ||
          "Failed to update user. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const showOutletFields = formData.role === "data_outlet";
  const showZoneField = formData.role === "data_report";

  const roles = [
    { value: "data_outlet", label: "Data Outlet", icon: "🏪" },
    { value: "report", label: "Report Viewer", icon: "📊" },
    { value: "data_report", label: "Data + Report", icon: "👨‍💼" },
    { value: "admin", label: "Administrator", icon: "👑" }
  ];

  if (!user) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* MODAL CONTENT */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-y-auto border border-white/20 max-h-[90vh]">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-500 via-blue-800 to-teal-400 rounded-t-2xl p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10  bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">Edit User Role</h2>
                <p className="text-blue-100 text-sm mt-1">
                  Update role and permissions for {user.name}
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON - Fixed positioning */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-blue-100 rounded-full hover:bg-white/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 bg-green-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* USER INFO */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Current Role: <span className="font-medium capitalize">{user.role?.replace('_', ' ')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-3">
            <span className="text-red-500 text-lg">❌</span>
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ROLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.icon} {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* DATA OUTLET FIELDS - Only for data_outlet role */}
          {showOutletFields && (
            <>
              {/* ZONE SELECTION */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Select Zone *
                </label>
                <select
                  name="zone"
                  required={showOutletFields}
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none"
                  disabled={zonesLoading}
                >
                  <option value="">{zonesLoading ? "Loading zones..." : "Select Zone"}</option>
                  {zones.map((zone) => (
                    <option key={zone.value} value={zone.value}>
                      {zone.label} ({zone.outlets.length} outlets)
                    </option>
                  ))}
                </select>
              </div>

              {/* OUTLET SELECTION - Only shows when zone is selected */}
              {formData.zone && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Select Outlet *
                  </label>
                  <select
                    name="outlet"
                    required={showOutletFields && formData.zone}
                    value={formData.outlet}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none"
                  >
                    <option value="">Select Outlet</option>
                    {availableOutlets.map((outlet) => (
                      <option key={outlet.value} value={outlet.value}>
                        {outlet.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* OUTLET ID (Auto-filled) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  Outlet ID
                </label>
                <input
                  type="text"
                  name="outletId"
                  value={formData.outletId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400"
                  placeholder="Outlet ID will be auto-filled"
                  readOnly
                />
              </div>
            </>
          )}

          {/* DATA + REPORT FIELDS - Only for data_report role */}
          {showZoneField && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Select Zone *
                </label>
                <select
                  name="zone"
                  required={showZoneField}
                  value={formData.zone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white appearance-none"
                  disabled={zonesLoading}
                >
                  <option value="">{zonesLoading ? "Loading zones..." : "Select Zone"}</option>
                  {zones.map((zone) => (
                    <option key={zone.value} value={zone.value}>
                      {zone.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Outlet Name *
                </label>
                <input
                  type="text"
                  name="outletName"
                  required={showZoneField}
                  value={formData.outletName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white placeholder-gray-400"
                  placeholder="Enter outlet name"
                />
              </div>
            </>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-400 text-white py-3 rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-teal-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating User...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Role
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;