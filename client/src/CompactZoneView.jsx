import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchZonesData, clearError } from "./store/zonesSlice";

/* Zone selector with dynamic icons based on zone names */
const getZoneIcon = (zoneName) => {
  const zoneIcons = {
    'north': '❄️',
    'south': '🌴',
    'east': '🌅',
    'west': '🌄',
    'default': '🏢'
  };

  const lowerZone = zoneName.toLowerCase();
  if (lowerZone.includes('north')) return zoneIcons.north;
  if (lowerZone.includes('south')) return zoneIcons.south;
  if (lowerZone.includes('east')) return zoneIcons.east;
  if (lowerZone.includes('west')) return zoneIcons.west;
  return zoneIcons.default;
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
        {zones && Object.keys(zones).map((zoneName) => (
          <option key={zoneName} value={zoneName}>
            {getZoneIcon(zoneName)} {zoneName}
          </option>
        ))}
      </select>
    </label>
  );
};

/* Outlet item with enhanced information */
const OutletItem = React.memo(({ outlet }) => {
  const statusClasses = "bg-green-100 text-green-800 border border-green-200";

  const getFootfallIcon = (footfallType) => {
    const icons = {
      'urban': '🏙️',
      'highway': '🛣️',
      'rural': '🌾',
      'default': '🏬'
    };
    return icons[footfallType] || icons.default;
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-lg">{getFootfallIcon(outlet.footfallType)}</span>
        <div className="flex-1 min-w-0">
          <div className="text-base font-medium text-gray-800 truncate">
            {outlet.name}
          </div>
          <div className="text-sm text-gray-500 truncate">
            Code: {outlet.code} • {outlet.footfallType}
          </div>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses}`}>
        Active
      </span>
    </div>
  );
});

/* List with empty state */
const OutletList = ({ outlets }) => {
  const safeOutlets = Array.isArray(outlets) ? outlets : [];

  if (safeOutlets.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-lg text-gray-500 mb-2">No outlets in this zone</div>
        <div className="text-sm text-gray-400">Try selecting a different zone</div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {safeOutlets.map((o) => (
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
        className={`px-3 py-1 border rounded-lg text-sm font-medium ${currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50"
          }`}
      >
        Prev
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-lg text-sm font-medium ${currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-blue-600 border-gray-300 hover:bg-blue-50"
          }`}
      >
        Next
      </button>
    </div>
  </div>
);

/* Loading Skeleton */
const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((item) => (
      <div key={item} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
      </div>
    ))}
  </div>
);

/* Main component */
const CompactZoneView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { zones, loading, error } = useSelector((state) => state.zones);

  // Get available zones or default to empty object
  const availableZones = zones || {};
  const zoneNames = Object.keys(availableZones);

  const defaultZone = useMemo(() => zoneNames[0] || "", [zoneNames]);
  const [selectedZone, setSelectedZone] = useState(defaultZone);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchZonesData());
  }, [dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Update selected zone when zones load
  useEffect(() => {
    if (zoneNames.length > 0 && !zoneNames.includes(selectedZone)) {
      setSelectedZone(zoneNames[0]);
    }
  }, [zoneNames, selectedZone]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedZone]);

  // Safely get outlets for selected zone
  const outlets = useMemo(() => {
    if (!selectedZone || !availableZones[selectedZone]) return [];
    return Array.isArray(availableZones[selectedZone]) ? availableZones[selectedZone] : [];
  }, [availableZones, selectedZone]);

  // Safely calculate pagination
  const totalPages = Math.max(1, Math.ceil(outlets.length / itemsPerPage));

  // Safely paginate outlets
  const paginatedOutlets = useMemo(() => {
    if (!Array.isArray(outlets) || outlets.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return outlets.slice(startIndex, startIndex + itemsPerPage);
  }, [outlets, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchZonesData());
  };

  // Error state
  if (error && !error.includes('401')) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full mx-auto">
        <div className="text-center py-8">
          <div className="text-lg text-red-600 mb-2">Error Loading Data</div>
          <div className="text-sm text-gray-500 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 w-full mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 text-center sm:text-left justify-center sm:justify-start">
          <span className="hidden sm:inline">{getZoneIcon(selectedZone)}</span>
          Zone Outlets
        </h2>

        {/* Zone Selector */}
        {loading ? (
          <div className="text-sm sm:text-base text-gray-500 text-center sm:text-left">
            Loading zones...
          </div>
        ) : (
          zoneNames.length > 0 && (
            <div className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 w-full">

                {/* Mobile Title */}
                <div className="text-sm font-medium text-gray-700 text-center sm:hidden">
                  Select Zone
                </div>

                {/* Desktop Label */}


                {/* Selector */}
                <div className="w-full sm:w-auto">
                  <ZoneSelector
                    value={selectedZone}
                    onChange={setSelectedZone}
                    zones={availableZones}
                    className="w-full sm:w-52"
                  />
                </div>

              </div>
            </div>
          )
        )}
      </div>

      {/* Zone Info */}
      {zoneNames.length > 0 && (
        <div className="mb-3 sm:mb-4 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 capitalize mb-1 flex items-center justify-center sm:justify-start gap-2">
            <span className="hidden sm:inline">{getZoneIcon(selectedZone)}</span>
            {selectedZone}
          </h3>
          <div className="text-xs sm:text-sm text-gray-500">
            {outlets.length} outlet{outlets.length !== 1 ? "s" : ""} in this zone
          </div>
        </div>
      )}

      {/* Outlet List */}
      {loading ? (
        <LoadingSkeleton />
      ) : zoneNames.length === 0 ? (
        <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-base sm:text-lg text-gray-500 mb-2">No zones available</div>
          <div className="text-xs sm:text-sm text-gray-400">
            Check if outlets are properly assigned to zones
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedOutlets.map((outlet, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition"
              >
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                    {outlet.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Code: {outlet.code} • {outlet.footfallType}
                  </p>
                </div>

                <div className="mt-2 sm:mt-0">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full text-center w-full sm:w-auto">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>

          {outlets.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Manage Button */}
      <button
        type="button"
        className="w-full mt-4 sm:mt-6 text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
        aria-label="Manage all outlets"
        onClick={() => handleNavigate('/zone')}
      >
        <span>Manage All Outlets</span>
        <span>➡️</span>
      </button>

    </div>



  );
};

export default CompactZoneView;