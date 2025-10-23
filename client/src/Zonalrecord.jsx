import React, { useState } from 'react';

const ZoneOutletManagement = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Hardcoded zone data
  const zoneData = {
    east: [
      { id: 1, name: "Downtown Mall", address: "123 Main Street, Downtown", phone: "+1-555-0101", status: "active", joinedDate: "2023-01-15", manager: "John Smith", revenue: "$125,000" },
      { id: 2, name: "Riverside Plaza", address: "456 River Road, Eastside", phone: "+1-555-0102", status: "active", joinedDate: "2023-02-20", manager: "Sarah Johnson", revenue: "$98,500" },
      { id: 3, name: "Eastgate Center", address: "789 Eastern Avenue", phone: "+1-555-0103", status: "active", joinedDate: "2023-03-10", manager: "Mike Chen", revenue: "$87,200" },
      { id: 4, name: "Harbor View", address: "321 Harbor Drive", phone: "+1-555-0104", status: "inactive", joinedDate: "2022-11-05", manager: "Lisa Wang", revenue: "$64,300" },
      { id: 5, name: "Sunrise Complex", address: "654 Sunrise Boulevard", phone: "+1-555-0105", status: "active", joinedDate: "2023-04-18", manager: "David Brown", revenue: "$112,000" }
    ],
    west: [
      { id: 6, name: "Westwood Mall", address: "987 Western Avenue", phone: "+1-555-0201", status: "active", joinedDate: "2023-01-08", manager: "Jennifer Lee", revenue: "$143,000" },
      { id: 7, name: "Mountain View", address: "753 Hilltop Road", phone: "+1-555-0202", status: "active", joinedDate: "2023-02-14", manager: "Robert Taylor", revenue: "$91,800" },
      { id: 8, name: "Sunset Plaza", address: "159 Sunset Boulevard", phone: "+1-555-0203", status: "inactive", joinedDate: "2022-12-20", manager: "Amanda Clark", revenue: "$76,500" },
      { id: 9, name: "Westgate Center", address: "456 Westgate Drive", phone: "+1-555-0204", status: "active", joinedDate: "2023-03-25", manager: "Kevin Martinez", revenue: "$105,200" }
    ],
    north: [
      { id: 10, name: "North Point Mall", address: "258 Northern Lights Road", phone: "+1-555-0301", status: "active", joinedDate: "2023-01-22", manager: "Emily Davis", revenue: "$134,500" },
      { id: 11, name: "Highland Park", address: "753 Highland Avenue", phone: "+1-555-0302", status: "active", joinedDate: "2023-02-28", manager: "James Wilson", revenue: "$88,900" },
      { id: 12, name: "Pine Valley", address: "369 Pine Street", phone: "+1-555-0303", status: "active", joinedDate: "2023-03-15", manager: "Michelle Garcia", revenue: "$97,300" },
      { id: 13, name: "Northgate Complex", address: "147 Northgate Road", phone: "+1-555-0304", status: "active", joinedDate: "2023-04-02", manager: "Daniel Anderson", revenue: "$121,700" },
      { id: 14, name: "Riverbend Mall", address: "852 Riverbend Drive", phone: "+1-555-0305", status: "inactive", joinedDate: "2022-10-15", manager: "Jessica White", revenue: "$69,800" },
      { id: 15, name: "North Star Plaza", address: "963 Starlight Avenue", phone: "+1-555-0306", status: "active", joinedDate: "2023-05-10", manager: "Christopher Lee", revenue: "$110,400" }
    ],
    south: [
      { id: 16, name: "Southside Center", address: "741 Southern Avenue", phone: "+1-555-0401", status: "active", joinedDate: "2023-01-30", manager: "Ashley Thompson", revenue: "$118,600" },
      { id: 17, name: "Bayview Plaza", address: "852 Bayview Road", phone: "+1-555-0402", status: "active", joinedDate: "2023-02-25", manager: "Matthew Harris", revenue: "$94,200" },
      { id: 18, name: "Palm Grove", address: "963 Palm Street", phone: "+1-555-0403", status: "inactive", joinedDate: "2022-11-18", manager: "Stephanie Martin", revenue: "$71,500" },
      { id: 19, name: "Southgate Mall", address: "159 Southgate Drive", phone: "+1-555-0404", status: "active", joinedDate: "2023-03-08", manager: "Andrew Moore", revenue: "$102,800" },
      { id: 20, name: "Ocean View", address: "357 Ocean Boulevard", phone: "+1-555-0405", status: "active", joinedDate: "2023-04-22", manager: "Nicole Young", revenue: "$129,100" }
    ]
  };

  const zoneStats = {
    east: { total: 5, active: 4, inactive: 1 },
    west: { total: 4, active: 3, inactive: 1 },
    north: { total: 6, active: 5, inactive: 1 },
    south: { total: 5, active: 4, inactive: 1 }
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSearchTerm('');
    setStatusFilter('all');
  };

  const getFilteredOutlets = () => {
    if (!selectedZone) return [];
    
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
    
    return outlets;
  };

  const getZoneColor = (zone) => {
    const colors = {
      east: 'blue',
      west: 'green',
      north: 'purple',
      south: 'orange'
    };
    return colors[zone];
  };

  const filteredOutlets = getFilteredOutlets();

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
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Select Zone
            </h2>
            
            <div className="space-y-3">
              {['east', 'west', 'north', 'south'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => handleZoneSelect(zone)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedZone === zone 
                      ? `border-${getZoneColor(zone)}-500 bg-${getZoneColor(zone)}-50 shadow-md` 
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
                      <div className={`w-3 h-3 bg-${getZoneColor(zone)}-500 rounded-full`}></div>
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
                  <span className="font-semibold">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Outlets:</span>
                  <span className="font-semibold text-green-600">16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inactive Outlets:</span>
                  <span className="font-semibold text-red-600">4</span>
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
              <div className={`p-6 rounded-t-xl ${
                selectedZone === 'east' ? 'bg-blue-50 border-b border-blue-200' :
                selectedZone === 'west' ? 'bg-green-50 border-b border-green-200' :
                selectedZone === 'north' ? 'bg-purple-50 border-b border-purple-200' :
                'bg-orange-50 border-b border-orange-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 capitalize">{selectedZone} Zone Outlets</h2>
                    <p className="text-gray-600 mt-1">
                      {filteredOutlets.length} of {zoneData[selectedZone].length} outlets shown
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex gap-2">
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Outlet
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export
                    </button>
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

              {/* Outlets Grid */}
              <div className="p-6">
                {filteredOutlets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOutlets.map((outlet) => (
                      <div key={outlet.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{outlet.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            outlet.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {outlet.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span className="break-words">{outlet.address}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {outlet.phone}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {outlet.manager}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Revenue: {outlet.revenue}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Since {outlet.joinedDate}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium">
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Zone</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose a zone from the left panel to view and manage its outlets. You can view outlet details, status, and perform various management actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoneOutletManagement;