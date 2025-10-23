import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Simple custom hook: can be replaced with real fetch logic */
function useZones(initialData = null) {
  const [zones, setZones] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return;
    let mounted = true;
    setLoading(true);
    setTimeout(() => {
      if (!mounted) return;
      setZones({
        east: [
          { id: 1, name: "Downtown Mall", status: "active" },
          { id: 2, name: "Riverside Plaza", status: "active" },
          { id: 3, name: "Eastgate Center", status: "active" },
          { id: 4, name: "Central Plaza", status: "active" },
          { id: 5, name: "Hilltop Market", status: "inactive" }
        ],
        west: [
          { id: 6, name: "Westwood Mall", status: "active" },
          { id: 7, name: "Mountain View", status: "active" },
          { id: 8, name: "Sunset Plaza", status: "inactive" }
        ],
        north: [
          { id: 9, name: "North Point Mall", status: "active" },
          { id: 10, name: "Highland Park", status: "active" },
          { id: 11, name: "Pine Valley", status: "active" },
          { id: 12, name: "Evergreen Plaza", status: "inactive" }
        ],
        south: [
          { id: 13, name: "Southside Center", status: "active" },
          { id: 14, name: "Bayview Plaza", status: "active" },
          { id: 15, name: "Palm Grove", status: "inactive" }
        ]
      });
      setLoading(false);
    }, 400);
    return () => {
      mounted = false;
    };
  }, [initialData]);

  return { zones, setZones, loading, error };
}

/* Zone selector with hardcoded icons */
const zoneIcons = {
  east: "🌅",
  west: "🌄",
  north: "❄️",
  south: "🌴"
};

const ZoneSelector = ({ value, onChange, zones }) => {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Select Zone:</span>
      <select
        aria-label="Select zone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-base border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
      >
        {Object.keys(zones).map((z) => (
          <option key={z} value={z}>
            {zoneIcons[z]} {z[0].toUpperCase() + z.slice(1)} Zone
          </option>
        ))}
      </select>
    </label>
  );
};

/* Outlet item with hardcoded icon */
const OutletItem = React.memo(({ outlet }) => {
  const statusClasses =
    outlet.status === "active"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-red-100 text-red-800 border border-red-200";

  const outletIcon = "🏬"; // Hardcoded building icon for all outlets

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-2 flex-1 truncate">
        <span className="text-lg">{outletIcon}</span>
        <span className="text-base font-medium text-gray-800 truncate" title={outlet.name}>
          {outlet.name}
        </span>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses}`}>
        {outlet.status === "active" ? "Active" : "Inactive"}
      </span>
    </div>
  );
});

/* List with empty state */
const OutletList = ({ outlets }) => {
  if (!outlets || outlets.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-lg text-gray-500 mb-2">No outlets in this zone</div>
        <div className="text-sm text-gray-400">Try selecting a different zone</div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {outlets.map((o) => (
        <OutletItem key={o.id} outlet={o} />
      ))}
    </div>
  );
};

/* Pagination controls */
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-4">
    <div className="text-sm text-gray-700">
      Page {currentPage} of {totalPages}
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-lg text-sm font-medium ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50"
        }`}
      >
        Prev
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-lg text-sm font-medium ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50"
        }`}
      >
        Next
      </button>
    </div>
  </div>
);

/* Main component */
const CompactZoneView = ({ initialZones = null }) => {
  const { zones, loading } = useZones(initialZones);
  const navigate = useNavigate();

  const defaultZone = useMemo(() => (zones ? Object.keys(zones)[0] : "east"), [zones]);
  const [selectedZone, setSelectedZone] = useState(defaultZone);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    if (zones && !zones[selectedZone]) {
      setSelectedZone(Object.keys(zones)[0]);
    }
  }, [zones, selectedZone]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedZone]);

  const outlets = useMemo(() => (zones ? zones[selectedZone] || [] : []), [zones, selectedZone]);
  const totalPages = Math.ceil(outlets.length / itemsPerPage);
  const paginatedOutlets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return outlets.slice(startIndex, startIndex + itemsPerPage);
  }, [outlets, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0 flex items-center gap-2">
          {zoneIcons[selectedZone]} Zone Outlets
        </h2>
        {loading ? (
          <div className="text-base text-gray-500">Loading zones...</div>
        ) : (
          <ZoneSelector value={selectedZone} onChange={setSelectedZone} zones={zones} />
        )}
      </div>

      <div className="mb-2">
        <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
          {zoneIcons[selectedZone]} {selectedZone} Zone
        </h3>
        <div className="text-sm text-gray-500 mb-4">
          {outlets.length} outlet{outlets.length !== 1 ? "s" : ""} in this zone
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-lg text-gray-500">Loading outlets...</div>
          <div className="mt-2 text-sm text-gray-400">Please wait a moment</div>
        </div>
      ) : (
        <>
          <OutletList outlets={paginatedOutlets} />
          {outlets.length > 3 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}

      <button
        type="button"
        className="w-full mt-6 text-base font-medium text-blue-600 hover:text-blue-800 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
        aria-label="Manage all outlets"
        onClick={() => handleNavigate("/zone")}
      >
        <span>Manage All Outlets</span>
        <span>➡️</span>
      </button>
    </div>
  );
};

export default CompactZoneView;
