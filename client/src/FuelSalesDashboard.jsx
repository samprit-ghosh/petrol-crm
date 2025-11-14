import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerformanceData, clearError } from './store/performanceSlice';
import { fetchZonesData } from './store/zonesSlice';

// Helper function to remove duplicate CSA entries
const removeDuplicateCSAs = (data) => {
  const uniqueCSAs = new Map();
  
  data.forEach(item => {
    const csaName = item.csa?.name;
    if (csaName && !uniqueCSAs.has(csaName)) {
      uniqueCSAs.set(csaName, item);
    }
  });
  
  return Array.from(uniqueCSAs.values());
};

// Helper function to convert liters to KL
const convertToKL = (liters) => {
  return (liters / 1000).toFixed(1);
};

// Helper function to get zone from outlet data using zones data
const getZoneFromOutlet = (outlet, zonesData) => {
  if (!outlet || !outlet._id || !zonesData) return 'Unknown Zone';
  
  // Search through all zones to find the outlet and get its zone name
  for (const [zoneName, outlets] of Object.entries(zonesData)) {
    const foundOutlet = outlets.find(out => out._id === outlet._id);
    if (foundOutlet) {
      return zoneName;
    }
  }
  
  return 'Unknown Zone';
};

// Helper function to get ROs for a specific zone
const getROsForZone = (zone, zonesData, csaData) => {
  if (!zone || !zonesData) {
    // If no zone selected, get all unique RO names from csaData
    return [...new Set(csaData.map(item => item.outlet?.name))].filter(Boolean);
  }
  
  // Get outlets for the selected zone from zonesData
  const zoneOutlets = zonesData[zone] || [];
  const zoneOutletIds = zoneOutlets.map(outlet => outlet._id);
  
  // Get RO names from csaData that belong to this zone
  const roNames = csaData
    .filter(item => zoneOutletIds.includes(item.outlet?._id))
    .map(item => item.outlet?.name)
    .filter(Boolean);
  
  return [...new Set(roNames)];
};

// Simple Chart Component - Mobile Optimized
const SimpleBarChart = ({ title, data, dataKey, height = 300 }) => {
  const values = data.map(item => {
    // Handle nested metrics structure
    if (dataKey.includes('.')) {
      const keys = dataKey.split('.');
      return keys.reduce((obj, key) => obj?.[key], item) || 0;
    }
    return item[dataKey] || 0;
  });
  
  const maxValue = Math.max(...values, 10);
  const barHeight = height - 80;
  const isMobile = window.innerWidth < 768;

  const calculateBarHeight = (value) => {
    return (value / maxValue) * barHeight;
  };

  const getBarColor = (index) => {
    const colors = [
      'bg-purple-600', 'bg-blue-600', 'bg-green-600',
      'bg-orange-600', 'bg-red-600', 'bg-pink-600',
      'bg-indigo-600', 'bg-teal-600', 'bg-cyan-600',
      'bg-amber-600', 'bg-lime-600'
    ];
    return colors[index % colors.length];
  };

  const generateYAxisLabels = () => {
    const steps = isMobile ? 3 : 5;
    const labels = [];
    for (let i = steps; i >= 0; i--) {
      const value = Math.round((i / steps) * maxValue);
      labels.push(value);
    }
    return labels;
  };

  const yAxisLabels = generateYAxisLabels();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">{title}</h3>

      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis with labels - hidden on very small screens */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 flex flex-col justify-between items-end pr-1 sm:pr-2">
          {yAxisLabels.map((value, index) => (
            <div key={index} className="flex items-center justify-end w-full">
              <span className="text-xs font-semibold text-gray-600 hidden xs:inline">
                {value.toLocaleString()}
              </span>
              <div className="w-2 h-px bg-gray-300 ml-1"></div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-8 sm:ml-12 h-full flex items-end justify-between space-x-1 sm:space-x-2 overflow-x-auto">
          {data.map((item, index) => {
            // Get value based on nested structure
            let value;
            if (dataKey.includes('.')) {
              const keys = dataKey.split('.');
              value = keys.reduce((obj, key) => obj?.[key], item) || 0;
            } else {
              value = item[dataKey] || 0;
            }
            
            const barHeightValue = calculateBarHeight(value);
            
            return (
              <div key={item._id || index} className="flex flex-col items-center flex-1 min-w-[40px] sm:min-w-0">
                {/* Bar value label */}
                <div className="text-xs font-bold text-gray-700 mb-1 text-center">
                  {isMobile && value > 0 ? '•' : value.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  className={`${getBarColor(index)} w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative group`}
                  style={{ 
                    height: `${barHeightValue}px`, 
                    minHeight: value > 0 ? '4px' : '0px' 
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block">
                    {item.csa?.name || 'Unknown'}: {value.toLocaleString()}L
                  </div>
                </div>

                {/* X-axis label */}
                <div className="text-xs font-semibold text-gray-700 mt-1.5 text-center truncate w-full">
                  {isMobile ?
                    (item.csa?.name?.split(' ')[0]?.substring(0, 3) || 'N/A') :
                    (item.csa?.name?.split(' ')[0] || 'N/A')
                  }
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis line */}
        <div className="ml-8 sm:ml-12 h-px bg-gray-400 absolute bottom-8 left-0 right-0"></div>
      </div>

      {/* Summary */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-base sm:text-lg font-bold text-blue-600">
              {data.reduce((sum, item) => {
                let value;
                if (dataKey.includes('.')) {
                  const keys = dataKey.split('.');
                  value = keys.reduce((obj, key) => obj?.[key], item) || 0;
                } else {
                  value = item[dataKey] || 0;
                }
                return sum + value;
              }, 0).toLocaleString()} L
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-base sm:text-lg font-bold text-purple-600">
              {Math.round(data.reduce((sum, item) => {
                let value;
                if (dataKey.includes('.')) {
                  const keys = dataKey.split('.');
                  value = keys.reduce((obj, key) => obj?.[key], item) || 0;
                } else {
                  value = item[dataKey] || 0;
                }
                return sum + value;
              }, 0) / (data.length || 1)).toLocaleString()} L
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// RO Comparison Chart Component - Mobile Optimized
const ROComparisonChart = ({ data, height = 400 }) => {
  const roAggregatedData = data.reduce((acc, item) => {
    const roName = item.outlet?.name || 'Unknown RO';
    if (!acc[roName]) {
      acc[roName] = {
        'RO Name': roName,
        'Normal Petrol': 0,
        'Normal Diesel': 0,
        'Premium Petrol': 0,
        'HP Pay': 0
      };
    }

    acc[roName]['Normal Petrol'] += item.metrics?.normalPetrol || 0;
    acc[roName]['Normal Diesel'] += item.metrics?.normalDiesel || 0;
    acc[roName]['Premium Petrol'] += item.metrics?.premiumPetrol || 0;
    acc[roName]['HP Pay'] += item.metrics?.hpPay || 0;

    return acc;
  }, {});

  const roData = Object.values(roAggregatedData);
  const isMobile = window.innerWidth < 768;

  const maxValue = Math.max(
    ...roData.flatMap(ro => [ro['Normal Petrol'], ro['Normal Diesel'], ro['Premium Petrol']])
  );

  const barHeight = height - 120;

  const calculateBarHeight = (value) => {
    return (value / maxValue) * barHeight;
  };

  const generateYAxisLabels = () => {
    const steps = isMobile ? 3 : 5;
    const labels = [];
    for (let i = steps; i >= 0; i--) {
      const value = Math.round((i / steps) * maxValue);
      labels.push(value);
    }
    return labels;
  };

  const yAxisLabels = generateYAxisLabels();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">RO-wise Sales Comparison</h3>

      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis with labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 flex flex-col justify-between items-end pr-1 sm:pr-2">
          {yAxisLabels.map((value, index) => (
            <div key={index} className="flex items-center justify-end w-full">
              <span className="text-xs font-semibold text-gray-600 hidden xs:inline">
                {value.toLocaleString()}
              </span>
              <div className="w-2 h-px bg-gray-300 ml-1"></div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="ml-8 sm:ml-12 h-full flex items-end justify-between space-x-2 sm:space-x-4 overflow-x-auto">
          {roData.map((ro, index) => (
            <div key={ro['RO Name']} className="flex flex-col items-center flex-1 min-w-[100px] sm:min-w-0">
              {/* Bars container */}
              <div className="flex items-end justify-center space-x-1 w-full mb-2" style={{ height: `${barHeight}px` }}>
                {/* Normal Petrol */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-bold text-gray-700 mb-1 hidden sm:block">
                    {ro['Normal Petrol'].toLocaleString()}
                  </div>
                  <div
                    className="bg-blue-600 w-4 sm:w-6 rounded-t-lg transition-all duration-300 hover:opacity-80 relative group"
                    style={{ height: `${calculateBarHeight(ro['Normal Petrol'])}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block">
                      Normal Petrol: {ro['Normal Petrol'].toLocaleString()}L
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 mt-1 hidden xs:inline">Petrol</div>
                </div>

                {/* Normal Diesel */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-bold text-gray-700 mb-1 hidden sm:block">
                    {ro['Normal Diesel'].toLocaleString()}
                  </div>
                  <div
                    className="bg-green-600 w-4 sm:w-6 rounded-t-lg transition-all duration-300 hover:opacity-80 relative group"
                    style={{ height: `${calculateBarHeight(ro['Normal Diesel'])}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block">
                      Normal Diesel: {ro['Normal Diesel'].toLocaleString()}L
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-green-600 mt-1 hidden xs:inline">Diesel</div>
                </div>

                {/* Premium Petrol */}
                <div className="flex flex-col items-center">
                  <div className="text-xs font-bold text-gray-700 mb-1 hidden sm:block">
                    {ro['Premium Petrol'].toLocaleString()}
                  </div>
                  <div
                    className="bg-orange-600 w-4 sm:w-6 rounded-t-lg transition-all duration-300 hover:opacity-80 relative group"
                    style={{ height: `${calculateBarHeight(ro['Premium Petrol'])}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block">
                      Premium Petrol: {ro['Premium Petrol'].toLocaleString()}L
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-orange-600 mt-1 hidden xs:inline">Premium</div>
                </div>
              </div>

              {/* RO Name */}
              <div className="text-xs font-bold text-gray-800 mt-4 text-center truncate w-full">
                {isMobile ?
                  (ro['RO Name']?.split(' ')[0] || 'N/A') :
                  ro['RO Name']
                }
              </div>

              {/* HP Pay Transactions */}
              <div className="text-xs font-semibold text-purple-600 mt-2 text-center">
                HP: {ro['HP Pay'].toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* X-axis line */}
        <div className="ml-8 sm:ml-12 h-px bg-gray-400 absolute bottom-15.5 left-0 right-0 "></div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded mr-1 sm:mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-700">Petrol</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded mr-1 sm:mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-700">Diesel</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-600 rounded mr-1 sm:mr-2"></div>
          <span className="text-xs sm:text-sm text-gray-700">Premium</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div>
            <div className="text-xs sm:text-sm text-gray-600">Total Petrol</div>
            <div className="text-sm sm:text-lg font-bold text-blue-600">
              {convertToKL(roData.reduce((sum, ro) => sum + ro['Normal Petrol'], 0))} KL
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-600">Total Diesel</div>
            <div className="text-sm sm:text-lg font-bold text-green-600">
              {convertToKL(roData.reduce((sum, ro) => sum + ro['Normal Diesel'], 0))} KL
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-600">Total Premium</div>
            <div className="text-sm sm:text-lg font-bold text-orange-600">
              {convertToKL(roData.reduce((sum, ro) => sum + ro['Premium Petrol'], 0))} KL
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-600">Total HP Pay</div>
            <div className="text-sm sm:text-lg font-bold text-purple-600">
              {roData.reduce((sum, ro) => sum + ro['HP Pay'], 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sales Distribution Chart - Mobile Optimized
const SalesDistributionChart = ({ data, height = 400 }) => {
  const totals = {
    normalPetrol: data.reduce((sum, item) => sum + (item.metrics?.normalPetrol || 0), 0),
    normalDiesel: data.reduce((sum, item) => sum + (item.metrics?.normalDiesel || 0), 0),
    premiumPetrol: data.reduce((sum, item) => sum + (item.metrics?.premiumPetrol || 0), 0),
  };

  const totalSales = totals.normalPetrol + totals.normalDiesel + totals.premiumPetrol;
  const isMobile = window.innerWidth < 768;

  if (totalSales === 0) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">Sales Distribution</h3>
        <div className="text-center text-gray-500 py-8">No sales data available</div>
      </div>
    );
  }

  const percentages = {
    normalPetrol: (totals.normalPetrol / totalSales) * 100,
    normalDiesel: (totals.normalDiesel / totalSales) * 100,
    premiumPetrol: (totals.premiumPetrol / totalSales) * 100,
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 min-h-[460px] sm:min-h-[460px] flex flex-col justify-between">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 text-center">
        Sales Distribution
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-grow">
        {/* Pie Chart Visualization */}
        <div className="relative w-40 h-40 sm:w-56 sm:h-56">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgb(37, 99, 235)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${percentages.normalPetrol} ${100 - percentages.normalPetrol}`}
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgb(22, 163, 74)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${percentages.normalDiesel} ${100 - percentages.normalDiesel}`}
              strokeDashoffset={-percentages.normalPetrol}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgb(234, 88, 12)"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${percentages.premiumPetrol} ${100 - percentages.premiumPetrol}`}
              strokeDashoffset={-(percentages.normalPetrol + percentages.normalDiesel)}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-gray-800">
                {convertToKL(totalSales)} KL
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4 flex-1 max-w-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-3"></div>
              <span className="text-sm font-medium text-gray-700">Petrol</span>
            </div>
            <div className="text-sm font-bold text-gray-800 text-right">
              {percentages.normalPetrol.toFixed(1)}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-3"></div>
              <span className="text-sm font-medium text-gray-700">Diesel</span>
            </div>
            <div className="text-sm font-bold text-gray-800 text-right">
              {percentages.normalDiesel.toFixed(1)}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-600 rounded mr-3"></div>
              <span className="text-sm font-medium text-gray-700">Premium</span>
            </div>
            <div className="text-sm font-bold text-gray-800 text-right">
              {percentages.premiumPetrol.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function FuelSalesDashboard() {
  const dispatch = useDispatch();
  const { data: csaData, loading, error, lastFetched } = useSelector((state) => state.performance);
  const { zones: zonesData, loading: zonesLoading } = useSelector((state) => state.zones);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRO, setFilterRO] = useState('');
  const [filterZone, setFilterZone] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    console.log('🚀 Component mounted, fetching performance data...');
    dispatch(fetchPerformanceData());
    dispatch(fetchZonesData());
  }, [dispatch]);

  // Auto-refresh data every 2 minutes
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (!loading) {
        console.log('🔄 Auto-refreshing data...');
        dispatch(fetchPerformanceData());
      }
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(interval);
  }, [dispatch, loading, autoRefresh]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Reset RO filter when zone changes
  useEffect(() => {
    setFilterRO('');
  }, [filterZone]);

  // Get unique Zones from zones data
  const zones = zonesData ? Object.keys(zonesData).filter(Boolean) : [];

  // Get ROs based on selected zone
  const roNames = getROsForZone(filterZone, zonesData, csaData);

  // Filter data based on search term, RO filter, and zone filter
  const filteredData = csaData.filter(item => {
    const csaName = item.csa?.name || '';
    const outletName = item.outlet?.name || '';
    const zoneName = getZoneFromOutlet(item.outlet, zonesData);
    
    const matchesSearch = 
      csaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zoneName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRO = filterRO ? outletName === filterRO : true;
    const matchesZone = filterZone ? zoneName === filterZone : true;
    
    return matchesSearch && matchesRO && matchesZone;
  });

  // Remove duplicates for display in charts and tables
  const uniqueFilteredData = removeDuplicateCSAs(filteredData);

  // Calculate totals from database data - use filteredData for accurate totals
  const totals = {
    normalPetrol: filteredData.reduce((sum, item) => sum + (item.metrics?.normalPetrol || 0), 0),
    normalDiesel: filteredData.reduce((sum, item) => sum + (item.metrics?.normalDiesel || 0), 0),
    premiumPetrol: filteredData.reduce((sum, item) => sum + (item.metrics?.premiumPetrol || 0), 0),
    hpPayTransactions: filteredData.reduce((sum, item) => sum + (item.metrics?.hpPay || 0), 0),
    googleReviews: filteredData.reduce((sum, item) => sum + (item.metrics?.googleReviews || 0), 0),
    newCustomers: filteredData.reduce((sum, item) => sum + (item.metrics?.newCustomers || 0), 0),
    complaintsResolved: filteredData.reduce((sum, item) => sum + (item.metrics?.complaintsResolved || 0), 0),
    lubeSales: filteredData.reduce((sum, item) => sum + (item.metrics?.lubeSales || 0), 0),
    additiveSales: filteredData.reduce((sum, item) => sum + (item.metrics?.additiveSales || 0), 0),
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Show loading state
  if (loading && csaData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Performance Data...</h2>
          <p className="text-gray-500 mt-2">Fetching from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="w-full mx-auto">
        {/* Header with Status */}
        <header className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Fuel Sales Analytics Dashboard</h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-4">
            Live data from database • {uniqueFilteredData.length} CSAs loaded
            {lastFetched && (
              <span className="block text-xs opacity-75 mt-1">
                Last updated: {new Date(lastFetched).toLocaleTimeString()}
              </span>
            )}
          </p>
          
          {/* Error Banner */}
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 mx-auto max-w-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">⚠️</span>
                  <span>Database Error: {error}</span>
                </div>
                <button
                  onClick={() => dispatch(clearError())}
                  className="text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Refresh Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <button
              onClick={() => {
                dispatch(fetchPerformanceData());
                dispatch(fetchZonesData());
              }}
              disabled={loading}
              className={`bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Refreshing...
                </>
              ) : (
                '🔄 Refresh Data'
              )}
            </button>

            {/* Auto Refresh Toggle */}
            <div className="flex items-center gap-2 bg-white text-black bg-opacity-20 px-4 py-2 rounded-lg">
              <span className="text-sm">Auto Refresh:</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRefresh ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm">{autoRefresh ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </header>

        {/* Performance Graphs Section */}
        <section className="mb-8 sm:mb-12">
          {/* Search & Filters Section */}
          <div className="rounded-2xl p-5 sm:p-7 bg-white shadow-lg mb-6">
            <h3 className="text-lg sm:text-2xl font-bold mb-5 text-black tracking-wide">
              🔍 Search & Filter
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search by CSA Name, RO Name, or Zone..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Zone Filter Dropdown */}
              <div className="sm:w-48 lg:w-64 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  🗺️
                </span>
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 hover:shadow-md appearance-none"
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  disabled={zonesLoading || !zonesData}
                >
                  <option value="">All Zones</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                {zonesLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  </div>
                )}
              </div>

              {/* RO Filter Dropdown - Now shows ROs based on selected zone */}
              <div className="sm:w-48 lg:w-64 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ⛽
                </span>
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 hover:shadow-md appearance-none"
                  value={filterRO}
                  onChange={(e) => setFilterRO(e.target.value)}
                  disabled={filterZone && roNames.length === 0}
                >
                  <option value="">All ROs {filterZone ? `in ${filterZone}` : ''}</option>
                  {roNames.map((roName) => (
                    <option key={roName} value={roName}>
                      {roName}
                    </option>
                  ))}
                </select>
                {filterZone && roNames.length === 0 && !zonesLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    !
                  </div>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-5 text-center">
              <span className="px-5 py-2 rounded-full font-semibold text-sm sm:text-base text-black shadow-lg bg-white">
                Showing {uniqueFilteredData.length} of {csaData.length} CSAs
                {filterZone && ` in ${filterZone}`}
                {filterRO && ` • RO: ${filterRO}`}
                {loading && <span className="ml-2">(Updating...)</span>}
              </span>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="space-y-4 sm:space-y-6">
              <SimpleBarChart
                title="Normal Petrol Sales"
                data={uniqueFilteredData}
                dataKey="metrics.normalPetrol"
                height={280}
              />
              <SimpleBarChart
                title="Premium Petrol Sales"
                data={uniqueFilteredData}
                dataKey="metrics.premiumPetrol"
                height={280}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <SimpleBarChart
                title="Normal Diesel Sales"
                data={uniqueFilteredData}
                dataKey="metrics.normalDiesel"
                height={280}
              />
              <SalesDistributionChart data={uniqueFilteredData} />
            </div>
          </div>

          {/* RO Comparison Chart */}
          <div className="mb-6 sm:mb-8">
            <ROComparisonChart data={uniqueFilteredData} />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {[
                {
                  title: 'Normal Petrol',
                  kl: convertToKL(totals.normalPetrol),
                  liters: formatNumber(totals.normalPetrol),
                  color: 'blue',
                },
                {
                  title: 'Normal Diesel',
                  kl: convertToKL(totals.normalDiesel),
                  liters: formatNumber(totals.normalDiesel),
                  color: 'green',
                },
                {
                  title: 'Premium Petrol',
                  kl: convertToKL(totals.premiumPetrol),
                  liters: formatNumber(totals.premiumPetrol),
                  color: 'orange',
                },
                {
                  title: 'HP Pay Transactions',
                  kl: formatNumber(totals.hpPayTransactions),
                  liters: 'Total Transactions',
                  color: 'purple',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`text-center p-3 sm:p-4 bg-${item.color}-50 border border-${item.color}-200 rounded-xl shadow-sm hover:shadow-lg hover:bg-${item.color}-100 transition-all duration-300`}
                >
                  <h4 className={`font-bold text-${item.color}-700 mb-2 text-xs sm:text-sm uppercase tracking-wide`}>
                    {item.title}
                  </h4>
                  <div className={`text-lg sm:text-2xl font-extrabold text-${item.color}-600`}>
                    {item.kl} {idx < 3 ? 'KL' : ''}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {idx < 3 ? `${item.liters} L` : item.liters}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CSA Data Section */}
        <section>
          <div className="text-center mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">CSA Performance Data</h2>
            <p className="text-sm sm:text-base text-gray-600">Detailed breakdown by Customer Service Attendant</p>
            {filterZone && (
              <p className="text-sm text-blue-600 mt-1">Currently viewing: {filterZone}</p>
            )}
            {filterRO && (
              <p className="text-sm text-green-600 mt-1">RO: {filterRO}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
            {/* Totals Summary */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  title: 'Total CSAs',
                  value: uniqueFilteredData.length,
                  color: 'bg-purple-600',
                },
                {
                  title: 'Normal Petrol',
                  value: `${convertToKL(totals.normalPetrol)} KL`,
                  color: 'bg-blue-600',
                },
                {
                  title: 'Normal Diesel',
                  value: `${convertToKL(totals.normalDiesel)} KL`,
                  color: 'bg-green-600',
                },
                {
                  title: 'Premium Petrol',
                  value: `${convertToKL(totals.premiumPetrol)} KL`,
                  color: 'bg-orange-600',
                },
                {
                  title: 'HP Pay',
                  value: formatNumber(totals.hpPayTransactions),
                  color: 'bg-red-600',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.color} text-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200`}
                >
                  <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase opacity-90">
                    {item.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-xl shadow-md">
              <table className="w-full border-collapse text-lg text-center">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
                  <tr>
                    {[
                      'Sl No',
                      'CSA Name',
                      'RO Name',
                      'Zone',
                      'Petrol (L)',
                      'Diesel (L)',
                      'Premium (L)',
                      'HP Pay',
                      'Reviews',
                      'New Customers',
                      'Complaints Resolved'
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className={`px-4 py-3 font-semibold uppercase border-r border-gray-300
                          ${header === 'RO Name' ? 'hidden sm:table-cell' : ''}
                          ${header === 'Zone' ? 'hidden md:table-cell' : ''}
                          ${header === 'Diesel (L)' ? 'hidden xs:table-cell' : ''}
                          ${header === 'Premium (L)' ? 'hidden md:table-cell' : ''}
                          ${header === 'HP Pay' ? 'hidden lg:table-cell' : ''}
                          ${header === 'New Customers' ? 'hidden xl:table-cell' : ''}
                          ${header === 'Complaints Resolved' ? 'hidden xl:table-cell' : ''}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-300 bg-white">
                  {uniqueFilteredData.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                      <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-200">
                        {index + 1}
                      </td>

                      {/* CSA Name + RO (mobile) */}
                      <td className="px-4 py-3 border-r border-gray-200">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900">{item.csa?.name || 'N/A'}</span>
                          <span className="text-gray-600 sm:hidden text-sm mt-1">
                            {item.outlet?.name || 'N/A'}
                          </span>
                          <span className="text-gray-500 md:hidden text-xs mt-1">
                            {getZoneFromOutlet(item.outlet, zonesData)}
                          </span>
                        </div>
                      </td>

                      {/* RO Name */}
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200 hidden sm:table-cell">
                        {item.outlet?.name || 'N/A'}
                      </td>

                      {/* Zone */}
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200 hidden md:table-cell">
                        {getZoneFromOutlet(item.outlet, zonesData)}
                      </td>

                      {/* Petrol */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200">
                        {formatNumber(item.metrics?.normalPetrol || 0)}
                      </td>

                      {/* Diesel */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden xs:table-cell">
                        {formatNumber(item.metrics?.normalDiesel || 0)}
                      </td>

                      {/* Premium */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden md:table-cell">
                        {formatNumber(item.metrics?.premiumPetrol || 0)}
                      </td>

                      {/* HP Pay */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden lg:table-cell">
                        {formatNumber(item.metrics?.hpPay || 0)}
                      </td>

                      {/* Reviews */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200">
                        {item.metrics?.googleReviews || 0}
                      </td>

                      {/* New Customers */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden xl:table-cell">
                        {item.metrics?.newCustomers || 0}
                      </td>

                      {/* Complaints Resolved */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden xl:table-cell">
                        {item.metrics?.complaintsResolved || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {uniqueFilteredData.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                <div className="text-3xl mb-3">🔍</div>
                <p className="text-lg font-bold">No data found</p>
                <p className="text-sm mt-1">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FuelSalesDashboard;