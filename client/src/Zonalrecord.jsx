
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchZonesData, clearError } from './store/zonesSlice';
import axiosInstance from '../src/utils/axiosConfig'; // Make sure to import your axios instance

const ZoneOutletManagement = () => {
  const dispatch = useDispatch();
  const { zones: zonesData, loading, error } = useSelector((state) => state.zones);

  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddOutletModal, setShowAddOutletModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newOutlet, setNewOutlet] = useState({
    name: '',
    code: '',
    address: '',
    phone: '',
    manager: '',
    revenue: '',
    footfallType: 'urban'
  });

  const outletsPerPage = 1;

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchZonesData());
  }, [dispatch]);

  // Transform Redux zones data to work with this component
  const zoneData = zonesData || {};

  // Calculate zone stats dynamically
  const zoneStats = Object.keys(zoneData).reduce((stats, zoneName) => {
    const outlets = zoneData[zoneName] || [];
    stats[zoneName] = {
      total: outlets.length,
      active: outlets.filter(outlet => outlet.status === 'active').length,
      inactive: outlets.filter(outlet => outlet.status === 'inactive').length
    };
    return stats;
  }, {});

  const totalOutlets = Object.values(zoneStats).reduce((sum, stat) => sum + stat.total, 0);
  const totalActiveOutlets = Object.values(zoneStats).reduce((sum, stat) => sum + stat.active, 0);

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleAddOutlet = () => {
    if (!selectedZone) {
      alert('Please select a zone first');
      return;
    }
    setShowAddOutletModal(true);
  };

  const handleSubmitOutlet = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitLoading(true);
      
      // Get the first outlet from selected zone to extract zone ID
      const firstOutletInZone = zoneData[selectedZone]?.[0];
      const zoneId = firstOutletInZone?.zone?._id;

      if (!zoneId) {
        alert('Could not find zone ID. Please try again.');
        return;
      }

      // Prepare data for API
      const outletData = {
        name: newOutlet.name,
        code: newOutlet.code || `OUT${Date.now().toString().slice(-6)}`,
        zone: zoneId, // Use the actual zone ID
        footfallType: newOutlet.footfallType,
        address: newOutlet.address,
        phone: newOutlet.phone,
        manager: newOutlet.manager,
        revenue: newOutlet.revenue ? parseInt(newOutlet.revenue) : 0
      };

      console.log('Submitting outlet data:', outletData);

      // Call your API endpoint to create outlet
      const response = await axiosInstance.post('/outlets', outletData);
      
      // Refresh the zones data to include the new outlet
      dispatch(fetchZonesData());
      
      // Reset form and close modal
      setNewOutlet({
        name: '',
        code: '',
        address: '',
        phone: '',
        manager: '',
        revenue: '',
        footfallType: 'urban'
      });
      setShowAddOutletModal(false);
      
      // Show success message
      alert('Outlet added successfully!');
      
    } catch (error) {
      console.error('Error adding outlet:', error);
      alert('Failed to add outlet. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOutlet(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get filtered outlets
  const getFilteredOutlets = () => {
    if (!selectedZone || !zoneData[selectedZone]) return [];

    let outlets = zoneData[selectedZone];

    // Apply search filter
    if (searchTerm) {
      outlets = outlets.filter(outlet =>
        outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (outlet.address && outlet.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (outlet.manager && outlet.manager.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (outlet.code && outlet.code.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      outlets = outlets.filter(outlet => outlet.status === statusFilter);
    }

    return outlets;
  };

  const filteredOutlets = getFilteredOutlets();
  const totalPages = Math.ceil(filteredOutlets.length / outletsPerPage);
  const startIndex = (currentPage - 1) * outletsPerPage;
  const endIndex = startIndex + outletsPerPage;
  const currentOutlets = filteredOutlets.slice(startIndex, endIndex);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, selectedZone]);

  const getFootfallIcon = (footfallType) => {
    const icons = {
      'urban': '🏙️ Urban',
      'highway': '🛣️ Highway',
      'rural': '🌾 Rural'
    };
    return icons[footfallType] || '🏬 Unknown';
  };

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

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchZonesData());
  };

  console.log(zoneData)

  // Show error state if there's an error
  if (error && !error.includes('401')) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
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

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-full p-4 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {Object.keys(zoneData).map((zoneName) => (
                    <button
                      key={zoneName}
                      onClick={() => handleZoneSelect(zoneName)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${selectedZone === zoneName
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {getZoneIcon(zoneName)} {zoneName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {zoneStats[zoneName]?.total || 0} outlets ({zoneStats[zoneName]?.active || 0} active)
                          </p>
                        </div>
                        {selectedZone === zoneName && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Add Outlet Button */}
                <button
                  onClick={handleAddOutlet}
                  disabled={!selectedZone || loading}
                  className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${selectedZone && !loading
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  + Add New Outlet
                </button>

                {/* Zone Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Zone Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Zones:</span>
                      <span className="font-semibold">{Object.keys(zoneData).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Outlets:</span>
                      <span className="font-semibold">{totalOutlets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Outlets:</span>
                      <span className="font-semibold text-green-600">{totalActiveOutlets}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Outlet Management Panel */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading outlets...</p>
            </div>
          ) : selectedZone ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Zone Header */}
              <div className="p-6 rounded-t-xl bg-blue-50 border-b border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {getZoneIcon(selectedZone)} {selectedZone} Zone Outlets
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Page {currentPage} of {totalPages} • Showing {currentOutlets.length} of {filteredOutlets.length} outlets
                    </p>
                  </div>
                  <button
                    onClick={handleAddOutlet}
                    disabled={loading}
                    className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    + Add Outlet
                  </button>
                </div>
              </div>

              {/* Outlet Filters */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search outlets by name, code, address, or manager..."
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

              {/* Outlets Display */}
              <div className="p-6">
                {currentOutlets.length > 0 ? (
                  <div className="space-y-6">
                    {currentOutlets.map((outlet) => (
                      <div key={outlet.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{outlet.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Code: {outlet.code} • {getFootfallIcon(outlet.footfallType)}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {outlet.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-4 h-4 mr-3 text-gray-400 mt-0.5 flex-shrink-0">📍</div>
                              <div>
                                <span className="font-medium text-gray-900">Name:</span>
                                <p className="mt-1">{outlet.name || 'Not specified'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">📞</div>
                              <div>
                                <span className="font-medium text-gray-900">Zone Description:</span>
                                <p className="mt-1">  {outlet.zone?.description || 'No zone description'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">👤</div>
                              <div>
                                <span className="font-medium text-gray-900">Address:</span>
                                <p className="mt-1">{outlet.address || 'Not assigned'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">💰</div>
                              <div>
                                <span className="font-medium text-gray-900">Revenue:</span>
                                <p className="mt-1">{outlet.revenue || 'Not specified'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">📅</div>
                              <div>
                                <span className="font-medium text-gray-900">Joined Date:</span>
                                <p className="mt-1">
                                  {outlet.zone?.createdAt
                                    ? new Date(outlet.zone.createdAt).toLocaleString()
                                    : 'Not specified'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-3 sm:gap-0">
                        <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                          Showing outlet {startIndex + 1} of {filteredOutlets.length}
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:space-x-2">
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
                      {zoneData[selectedZone]?.length === 0
                        ? `No outlets in ${selectedZone} zone. Add the first outlet!`
                        : "No outlets match your current search criteria. Try adjusting your filters or search term."
                      }
                    </p>
                    <button
                      onClick={handleAddOutlet}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      + Add First Outlet
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
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

      {/* Add Outlet Modal */}
      {showAddOutletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Outlet</h2>
              <p className="text-gray-600 mt-1">
                Add a new outlet to {selectedZone} Zone
              </p>
            </div>
            
            <form onSubmit={handleSubmitOutlet} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newOutlet.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter outlet name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Code</label>
                <input
                  type="text"
                  name="code"
                  value={newOutlet.code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., OUT001 (auto-generated if empty)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Address</label>
                <textarea
                  name="address"
                  value={newOutlet.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                />
              </div>
              
       

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footfall Type *</label>
                <select
                  name="footfallType"
                  value={newOutlet.footfallType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="urban">🏙️ Urban</option>
                  <option value="highway">🛣️ Highway</option>
                  <option value="rural">🌾 Rural</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddOutletModal(false)}
                  disabled={submitLoading}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {submitLoading ? 'Adding...' : 'Add Outlet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoneOutletManagement;