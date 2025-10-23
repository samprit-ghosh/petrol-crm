import React, { useState, useEffect } from 'react';

const ZoneOutletManagement = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const outletsPerPage = 1;

  // Hardcoded zone data
  const zoneData = {
    east: [
      { id: 1, name: "Downtown Mall", address: "123 Main Street, Downtown", phone: "+1-555-0101", status: "active", joinedDate: "2023-01-15", manager: "John Smith", revenue: "$125,000" },
      { id: 2, name: "Riverside Plaza", address: "456 River Road, Eastside", phone: "+1-555-0102", status: "active", joinedDate: "2023-02-20", manager: "Sarah Johnson", revenue: "$98,500" },
      { id: 3, name: "Eastgate Center", address: "789 Eastern Avenue", phone: "+1-555-0103", status: "active", joinedDate: "2023-03-10", manager: "Mike Chen", revenue: "$87,200" },
    ],
    west: [
      { id: 4, name: "Westwood Mall", address: "987 Western Avenue", phone: "+1-555-0201", status: "active", joinedDate: "2023-01-08", manager: "Jennifer Lee", revenue: "$143,000" },
      { id: 5, name: "Mountain View", address: "753 Hilltop Road", phone: "+1-555-0202", status: "active", joinedDate: "2023-02-14", manager: "Robert Taylor", revenue: "$91,800" },
    ],
    north: [
      { id: 6, name: "North Point Mall", address: "258 Northern Lights Road", phone: "+1-555-0301", status: "active", joinedDate: "2023-01-22", manager: "Emily Davis", revenue: "$134,500" },
      { id: 7, name: "Highland Park", address: "753 Highland Avenue", phone: "+1-555-0302", status: "active", joinedDate: "2023-02-28", manager: "James Wilson", revenue: "$88,900" },
    ],
    south: [
      { id: 8, name: "Southside Center", address: "741 Southern Avenue", phone: "+1-555-0401", status: "active", joinedDate: "2023-01-30", manager: "Ashley Thompson", revenue: "$118,600" },
      { id: 9, name: "Bayview Plaza", address: "852 Bayview Road", phone: "+1-555-0402", status: "active", joinedDate: "2023-02-25", manager: "Matthew Harris", revenue: "$94,200" },
    ]
  };

  // Simple zone stats
  const zoneStats = {
    east: { total: 3, active: 3, inactive: 0 },
    west: { total: 2, active: 2, inactive: 0 },
    north: { total: 2, active: 2, inactive: 0 },
    south: { total: 2, active: 2, inactive: 0 }
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Get filtered outlets - SIMPLIFIED
  const getFilteredOutlets = () => {
    if (!selectedZone) return [];

    console.log('Selected Zone:', selectedZone);
    console.log('Zone Data:', zoneData[selectedZone]);

    let outlets = zoneData[selectedZone];

    // Apply search filter
    if (searchTerm) {
      outlets = outlets.filter(outlet =>
        outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        outlet.manager.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      outlets = outlets.filter(outlet => outlet.status === statusFilter);
    }

    console.log('Filtered Outlets:', outlets);
    return outlets;
  };

  // Use filtered outlets directly
  const filteredOutlets = getFilteredOutlets();

  // Pagination calculations
  const totalPages = Math.ceil(filteredOutlets.length / outletsPerPage);
  const startIndex = (currentPage - 1) * outletsPerPage;
  const endIndex = startIndex + outletsPerPage;
  const currentOutlets = filteredOutlets.slice(startIndex, endIndex);

  console.log('Pagination Info:', {
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    currentOutlets: currentOutlets.length,
    filteredOutlets: filteredOutlets.length
  });

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, selectedZone]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Zone & Outlet Management</h1>
        <p className="text-gray-600">Select a zone to view and manage its outlets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Zone Selection Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Zone</h2>

            <div className="space-y-3">
              {['east', 'west', 'north', 'south'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => handleZoneSelect(zone)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedZone === zone
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize">{zone} Zone</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {zoneStats[zone].total} outlets ({zoneStats[zone].active} active)
                      </p>
                    </div>
                    {selectedZone === zone && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Zone Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Zone Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Zones:</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Outlets:</span>
                  <span className="font-semibold">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Outlets:</span>
                  <span className="font-semibold text-green-600">9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outlet Management Panel */}
        <div className="lg:col-span-3">
          {selectedZone ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Zone Header */}
              <div className="p-6 rounded-t-xl bg-blue-50 border-b border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 capitalize">{selectedZone} Zone Outlets</h2>
                    <p className="text-gray-600 mt-1">
                      Page {currentPage} of {totalPages} • Showing {currentOutlets.length} of {filteredOutlets.length} outlets
                    </p>
                  </div>
                </div>
              </div>

              {/* Outlet Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search outlets by name, address, or manager..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                      className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Outlets Display - Single Outlet per Page */}
              <div className="p-6">
                {currentOutlets.length > 0 ? (
                  <div className="space-y-6">
                    {/* Single Outlet Card */}
                    {currentOutlets.map((outlet) => (
                      <div key={outlet.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{outlet.name}</h3>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-4 h-4 mr-3 text-gray-400 mt-0.5 flex-shrink-0">📍</div>
                              <div>
                                <span className="font-medium text-gray-900">Address:</span>
                                <p className="mt-1">{outlet.address}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">📞</div>
                              <div>
                                <span className="font-medium text-gray-900">Phone:</span>
                                <p className="mt-1">{outlet.phone}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">👤</div>
                              <div>
                                <span className="font-medium text-gray-900">Manager:</span>
                                <p className="mt-1">{outlet.manager}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">💰</div>
                              <div>
                                <span className="font-medium text-gray-900">Revenue:</span>
                                <p className="mt-1">{outlet.revenue}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">📅</div>
                              <div>
                                <span className="font-medium text-gray-900">Joined Date:</span>
                                <p className="mt-1">{outlet.joinedDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                            Edit Outlet
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-3 sm:gap-0">
                        {/* Showing Text */}
                        <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                          Showing outlet {startIndex + 1} of {filteredOutlets.length}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:space-x-2">
                          {/* Previous Button */}
                          <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                              }`}
                          >
                            Prev
                          </button>

                          {/* Page Numbers */}
                          <div className="flex flex-wrap justify-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                              <button
                                key={number}
                                onClick={() => goToPage(number)}
                                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium min-w-[28px] sm:min-w-10 ${currentPage === number
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                  }`}
                              >
                                {number}
                              </button>
                            ))}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                              }`}
                          >
                            Next
                          </button>
                        </div>
                      </div>

                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🏢</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No outlets found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      No outlets match your current search criteria. Try adjusting your filters or search term.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Empty State
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Zone</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose a zone from the left panel to view and manage its outlets.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoneOutletManagement;