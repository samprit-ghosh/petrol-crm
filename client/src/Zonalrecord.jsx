import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchZonesData, clearError } from './store/zonesSlice';
import axiosInstance from '../src/utils/axiosConfig';

const ZoneOutletManagement = () => {
  const dispatch = useDispatch();
  const { zones: zonesData, loading, error } = useSelector((state) => state.zones);

  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddOutletModal, setShowAddOutletModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [newOutlet, setNewOutlet] = useState({
    name: '',
    code: '',
    address: '',
    phone: '',
    manager: '',
    revenue: '',
    footfallType: ''
  });

  const outletsPerPage = 1;

  useEffect(() => {
    dispatch(fetchZonesData());
  }, [dispatch]);

  const zoneData = zonesData || {};

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

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleAddOutlet = () => {
    if (!selectedZone) {
      showNotification('Please select a zone first', 'warning');
      return;
    }
    setShowAddOutletModal(true);
  };

  const handleSubmitOutlet = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      const firstOutletInZone = zoneData[selectedZone]?.[0];
      const zoneId = firstOutletInZone?.zone?._id;

      if (!zoneId) {
        showNotification('Could not find zone ID. Please try again.', 'error');
        return;
      }

      const outletData = {
        name: newOutlet.name,
        code: newOutlet.code || `OUT${Date.now().toString().slice(-6)}`,
        zone: zoneId,
        footfallType: newOutlet.footfallType,
        address: newOutlet.address,
        phone: newOutlet.phone,
        manager: newOutlet.manager,
        revenue: newOutlet.revenue ? parseInt(newOutlet.revenue) : 0
      };

      console.log('Submitting outlet data:', outletData);

      const response = await axiosInstance.post('/outlets', outletData);

      dispatch(fetchZonesData());

      setNewOutlet({
        name: '',
        code: '',
        address: '',
        phone: '',
        manager: '',
        revenue: '',
        footfallType: ''
      });
      setShowAddOutletModal(false);

      showNotification('Outlet added successfully!', 'success');

    } catch (error) {
      console.error('Error adding outlet:', error);
      showNotification('Failed to add outlet. Please try again.', 'error');
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

  const getFilteredOutlets = () => {
    if (!selectedZone || !zoneData[selectedZone]) return [];

    let outlets = zoneData[selectedZone];

    if (searchTerm) {
      outlets = outlets.filter(outlet =>
        outlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (outlet.address && outlet.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (outlet.manager && outlet.manager.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (outlet.code && outlet.code.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

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

    if (!footfallType) {
      return '🏬 Unknown';
    }

    const normalizedType = footfallType.toLowerCase().trim();
    return icons[normalizedType] || '🏬 Unknown';
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

  useEffect(() => {
    if (selectedZone && zoneData[selectedZone] && zoneData[selectedZone].length > 0) {
      console.log('First outlet in selected zone:', zoneData[selectedZone][0]);
      console.log('Footfall type of first outlet:', zoneData[selectedZone][0].footfallType);
    }
  }, [selectedZone, zoneData]);

  if (error && !error.includes('401')) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
          <div className="text-lg text-red-600 mb-2">Error Loading Data</div>
          <div className="text-sm text-gray-500 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Notification System */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ${notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
          <div className={`rounded-xl shadow-lg border-l-4 p-4 ${notification.type === 'success'
            ? 'bg-green-50 border-green-500 text-green-800'
            : notification.type === 'error'
              ? 'bg-red-50 border-red-500 text-red-800'
              : 'bg-yellow-50 border-yellow-500 text-yellow-800'
            }`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${notification.type === 'success' ? 'text-green-500' :
                notification.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                }`}>
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : notification.type === 'error' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification({ show: false, message: '', type: '' })}
                className="ml-auto inline-flex text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

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

                <button
                  onClick={handleAddOutlet}
                  disabled={!selectedZone || loading}
                  className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${selectedZone && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  + Add New Outlet
                </button>

                <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
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
              <div className="p-6 rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {getZoneIcon(selectedZone)} {selectedZone} Outlets
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Page {currentPage} of {totalPages} • Showing {currentOutlets.length} of {filteredOutlets.length} outlets
                    </p>
                  </div>
                  <button
                    onClick={handleAddOutlet}
                    disabled={loading}
                    className="mt-3 sm:mt-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-5 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button
                      onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                      className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200"
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
                      <div key={outlet.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 bg-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{outlet.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Code: {outlet.code} • {getFootfallIcon(outlet.footfallType)}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${outlet.status === 'active'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {outlet.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="w-4 h-4 mr-3 text-gray-400 mt-0.5 flex-shrink-0">📍</div>
                              <div>
                                <span className="font-medium text-gray-900">Outlet Id:</span>
                                <p className="mt-1 text-md max-[350px]:text-xs">{outlet.id || 'Not specified'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">📞</div>
                              <div>
                                <span className="font-medium text-gray-900">SAP:</span>
                                <p className="mt-1">{outlet.code || 'Not specified'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">👤</div>
                              <div>
                                <span className="font-medium text-gray-900">Manager:</span>
                                <p className="mt-1">{outlet.address || 'Not assigned'}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0">🏢</div>
                              <div>
                                <span className="font-medium text-gray-900">Footfall Type:</span>
                                <p className="mt-1">{getFootfallIcon(outlet.footfallType)}</p>
                              </div>

                            </div>

                          </div>

                        </div>
                        <div className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-center mt-5">
                          <span className="font-medium text-gray-900 whitespace-nowrap">
                            🏢 Description:
                          </span>
                          <p className="mt-1 md:mt-0 md:flex-1 text-gray-700">
                            {outlet.zone?.description || "Not specified"}
                          </p>
                        </div>


                        <div className="flex gap-3 mt-6">
                          <button className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-sm font-medium border border-gray-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}

        {totalPages > 1 && (
  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 gap-4 w-full">

    {/* Showing Info */}
    <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
      Showing outlet {startIndex + 1} of {filteredOutlets.length}
    </div>

    {/* Pagination Section */}
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">

      {/* Page Buttons + Prev/Next */}
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-center">

        {/* Prev Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition w-full sm:w-auto
            ${currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
        >
          Prev
        </button>

        {/* Page Buttons */}
        <div className="flex flex-wrap justify-center gap-1">
          {currentPage > 3 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm"
              >
                1
              </button>
              <span className="text-gray-500 px-2">...</span>
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 3), currentPage + 2)
            .map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium transition
                  ${currentPage === number
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
              >
                {number}
              </button>
            ))}

          {currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-500 px-2">...</span>
              <button
                onClick={() => goToPage(totalPages)}
                className="px-3 py-1 rounded-full border bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition w-full sm:w-auto
            ${currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
            }`}
        >
          Next
        </button>
      </div>
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
                      className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm font-medium"
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
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          {/* Modern Gradient Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>

          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative z-10 transform transition-all duration-300 scale-100">
            {/* Modal Header with Gradient and Close Button */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl relative">
              <button
                onClick={() => setShowAddOutletModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 group"
              >
                <svg
                  className="w-4 h-4 text-white group-hover:text-white/90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-white pr-10">Add New Outlet</h2>
              <p className="text-blue-100 mt-1 pr-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter outlet name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Code *</label>
                <input
                  type="text"
                  name="code"
                  value={newOutlet.code}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="e.g., 41045279"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manager *</label>
                <input
                  name="address"
                  value={newOutlet.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footfall Type *</label>
                <select
                  name="footfallType"
                  value={newOutlet.footfallType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select footfall type</option>
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
                  className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium disabled:from-blue-400 disabled:to-blue-500 disabled:cursor-not-allowed shadow-sm"
                >
                  {submitLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    'Add Outlet'
                  )}
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