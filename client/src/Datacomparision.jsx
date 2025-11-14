import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerformanceData, clearError } from './store/performanceSlice';
import { fetchZonesData } from './store/zonesSlice';

const metrics = [
  "Volume of Normal Petrol sales (in litres)",
  "Volume of Normal Diesel sales (in litres)",
  "Volume of Premium Petrol sales (Power95) (in litres)",
  "How many HP pay transactions done?",
  "Number of google reviews",
  "Number of new customers onboarded",
  "Number of complaints resolved",
  "Quantity of Lube sales",
  "Quantity of Additive sales"
];

// Helper function to separate preTraining and postTraining data
const separatePrePostTrainingData = (data) => {
  const preTrainingData = [];
  const postTrainingData = [];
  const unknownType = [];
  
  data.forEach(item => {
    const uploadType = item.uploadType?.toString().trim();
    
    if (uploadType === 'preTraining') {
      preTrainingData.push(item);
    } else if (uploadType === 'postTraining') {
      postTrainingData.push(item);
    } else {
      unknownType.push(item);
    }
  });
  
  console.log('📊 Data Analysis:');
  console.log('📊 Total records:', data.length);
  console.log('📊 preTraining data count:', preTrainingData.length);
  console.log('📊 postTraining data count:', postTrainingData.length);
  console.log('📊 Unknown type count:', unknownType.length);
  
  if (unknownType.length > 0) {
    console.log('📊 Unknown upload types found:', [...new Set(unknownType.map(item => item.uploadType))]);
  }
  
  return { preTrainingData, postTrainingData, unknownType };
};

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

// Helper function to get metric display name
const getMetricDisplayName = (metric) => {
  const names = {
    "Volume of Normal Petrol sales (in litres)": "Normal Petrol Sales",
    "Volume of Normal Diesel sales (in litres)": "Normal Diesel Sales", 
    "Volume of Premium Petrol sales (Power95) (in litres)": "Premium Petrol Sales",
    "How many HP pay transactions done?": "HP Pay Transactions",
    "Number of google reviews": "Google Reviews",
    "Number of new customers onboarded": "New Customers",
    "Number of complaints resolved": "Complaints Resolved",
    "Quantity of Lube sales": "Lube Sales",
    "Quantity of Additive sales": "Additive Sales"
  };
  return names[metric] || metric;
};

// Helper function to convert metric display name to metric key
const getMetricKey = (metricDisplayName) => {
  const keyMap = {
    "Normal Petrol Sales": "normalPetrol",
    "Normal Diesel Sales": "normalDiesel",
    "Premium Petrol Sales": "premiumPetrol",
    "HP Pay Transactions": "hpPay",
    "Google Reviews": "googleReviews",
    "New Customers": "newCustomers",
    "Complaints Resolved": "complaintsResolved",
    "Lube Sales": "lubeSales",
    "Additive Sales": "additiveSales"
  };
  return keyMap[metricDisplayName] || metricDisplayName;
};

// Safe percentage calculation function
const calculatePercentageChange = (preValue, postValue) => {
  if (preValue === 0 && postValue === 0) return 0;
  if (preValue === 0) return 100;
  return ((postValue - preValue) / preValue) * 100;
};

// Tooltip Component
const Tooltip = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-10 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
};

// Enhanced Helper function to get zone from outlet data using zones data
const getZoneFromOutlet = (outlet, zonesData) => {
  if (!outlet || !zonesData) return 'Unknown Zone';
  
  // If zonesData is an array of zone objects
  if (Array.isArray(zonesData)) {
    const foundZone = zonesData.find(zone => {
      // Check if zone has outlets array
      if (zone.outlets && Array.isArray(zone.outlets)) {
        return zone.outlets.some(out => out._id === outlet._id);
      }
      // Check if zone has regions array
      if (zone.regions && Array.isArray(zone.regions)) {
        return zone.regions.some(region => region._id === outlet._id);
      }
      return false;
    });
    return foundZone?.name || foundZone?.zoneName || 'Unknown Zone';
  }
  
  // If zonesData is an object with zone names as keys
  if (typeof zonesData === 'object' && !Array.isArray(zonesData)) {
    for (const [zoneName, zoneData] of Object.entries(zonesData)) {
      // If zoneData is an array of outlets
      if (Array.isArray(zoneData)) {
        const foundOutlet = zoneData.find(out => out._id === outlet._id);
        if (foundOutlet) {
          return zoneName;
        }
      }
      // If zoneData is an object with outlets array
      else if (zoneData && typeof zoneData === 'object' && Array.isArray(zoneData.outlets)) {
        const foundOutlet = zoneData.outlets.find(out => out._id === outlet._id);
        if (foundOutlet) {
          return zoneName;
        }
      }
    }
  }
  
  // Fallback to district if available
  if (outlet.district) {
    return outlet.district;
  }
  
  return 'Unknown Zone';
};

// Helper function to convert liters to KL
const convertToKL = (liters) => {
  return (liters / 1000).toFixed(1);
};

// Enhanced Function to calculate weekly data from uploadDate for postTraining data only
const calculateWeeklyPostTrainingData = (postTrainingData) => {
  if (!postTrainingData || postTrainingData.length === 0) {
    console.log('📅 No postTraining data available for weekly calculation');
    return {};
  }

  // Group postTraining data by week based on uploadDate
  const weeklyData = {};
  
  postTrainingData.forEach((item) => {
    if (!item.uploadDate) return;
    
    try {
      const uploadDate = new Date(item.uploadDate);
      
      // Create a consistent week key (Monday as start of week)
      const weekStart = new Date(uploadDate);
      const day = uploadDate.getDay();
      const diff = uploadDate.getDate() - day + (day === 0 ? -6 : 1);
      weekStart.setDate(diff);
      weekStart.setHours(0, 0, 0, 0);
      
      const weekKey = `Week of ${weekStart.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = [];
      }
      
      // Avoid duplicates by checking if CSA already exists in this week
      const existingCSA = weeklyData[weekKey].find(weekItem => 
        weekItem.csa?._id === item.csa?._id
      );
      
      if (!existingCSA) {
        weeklyData[weekKey].push(item);
      }
    } catch (error) {
      console.log('Error processing date:', item.uploadDate, error);
    }
  });
  
  console.log('📅 Weekly postTraining data weeks:', Object.keys(weeklyData));
  return weeklyData;
};

// Debug Info Component
const DebugInfo = ({ performanceData, zonesData, weeklyPostData, selectedZone, allZones, preTrainingData, postTrainingData, unknownType }) => {
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <div className="text-center mb-4">
        <button
          onClick={() => setShowDebug(true)}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          🐛 Show Debug Info
        </button>
      </div>
    );
  }

  const zonesDistribution = {};
  const uploadDates = performanceData?.map(item => item.uploadDate).filter(Boolean) || [];
  const dateRange = uploadDates.length > 0 ? {
    min: new Date(Math.min(...uploadDates.map(d => new Date(d)))),
    max: new Date(Math.max(...uploadDates.map(d => new Date(d))))
  } : null;

  performanceData?.forEach(item => {
    const zone = getZoneFromOutlet(item.outlet, zonesData);
    zonesDistribution[zone] = (zonesDistribution[zone] || 0) + 1;
  });

  const allUploadTypes = performanceData ? [...new Set(performanceData.map(item => item.uploadType))] : [];

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-yellow-800">🐛 Debug Information</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div>
          <strong>Total Records:</strong> {performanceData?.length || 0}
        </div>
        <div>
          <strong>preTraining Records:</strong> {preTrainingData?.length || 0}
        </div>
        <div>
          <strong>postTraining Records:</strong> {postTrainingData?.length || 0}
        </div>
        <div>
          <strong>Unknown Type Records:</strong> {unknownType?.length || 0}
        </div>
        <div>
          <strong>All Upload Types:</strong> {allUploadTypes.join(', ') || 'None'}
        </div>
        <div>
          <strong>All Zones in DB:</strong> {allZones?.join(', ') || 'None'}
        </div>
        <div>
          <strong>Zones with Data:</strong> {Object.keys(zonesDistribution).join(', ') || 'None'}
        </div>
        <div>
          <strong>Weeks Found:</strong> {Object.keys(weeklyPostData).length}
        </div>
        <div>
          <strong>Date Range:</strong> {dateRange ? 
            `${dateRange.min.toLocaleDateString()} to ${dateRange.max.toLocaleDateString()}` : 
            'No dates'
          }
        </div>
        <div>
          <strong>Selected Zone:</strong> {selectedZone || 'All Zones'}
        </div>
      </div>

      <div className="mt-3 text-xs text-yellow-600">
        <div>Upload Types in data: {allUploadTypes.join(', ')}</div>
        <div>Zones in filter: {allZones?.length || 0} total zones from database</div>
      </div>
    </div>
  );
};

// CSA-RO Relationship Table Component
const CSARelationshipTable = ({ data, zonesData, selectedZone }) => {
  // Filter data by selected zone
  const filteredData = selectedZone ? 
    data.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    data;

  // Remove duplicate CSA entries
  const uniqueFilteredData = removeDuplicateCSAs(filteredData);

  // Group CSAs by RO Name
  const groupCSAsByRO = (data) => {
    const grouped = {};
    
    data.forEach(csa => {
      const roName = csa.outlet?.name || 'Unknown RO';
      if (!grouped[roName]) {
        grouped[roName] = [];
      }
      
      if (!grouped[roName].find(item => item.csa?.name === csa.csa?.name)) {
        grouped[roName].push(csa);
      }
    });
    
    return grouped;
  };

  const roGroups = groupCSAsByRO(uniqueFilteredData);

  if (uniqueFilteredData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
        <div className="text-center text-gray-500 py-8">
          No data found for selected zone: {selectedZone}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
          CSA - RO Relationship Mapping
          {selectedZone && <span className="text-blue-600 ml-2">({selectedZone})</span>}
        </h3>
        <div className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-lg">
          Total ROs: {Object.keys(roGroups).length} | CSAs: {uniqueFilteredData.length}
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(roGroups).map(([roName, csas], index) => (
          <div key={roName} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* RO Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h4 className="text-lg font-bold text-white">{roName}</h4>
                  <p className="text-purple-100 text-sm mt-1">
                    {csas.length} Customer Service {csas.length === 1 ? 'Attendant' : 'Attendants'}
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full mt-2 sm:mt-0">
                  <span className="text-black text-sm font-medium">RO #{index + 1}</span>
                </div>
              </div>
            </div>

            {/* CSAs Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CSA Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Normal Petrol
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Normal Diesel
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium Petrol
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HP Pay Transactions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {csas.map((csa, csaIndex) => (
                    <tr 
                      key={csa._id || csaIndex} 
                      className={csaIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-sm font-bold">
                              {csa.csa?.name?.charAt(0) || 'C'}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {csa.csa?.name || 'Unknown CSA'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {getZoneFromOutlet(csa.outlet, zonesData)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          csa.uploadType === 'preTraining' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {csa.uploadType || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa.metrics?.normalPetrol || 0} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa.metrics?.normalDiesel || 0} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa.metrics?.premiumPetrol || 0} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {(csa.metrics?.hpPay || 0).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RO Summary */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total Petrol:</span>
                  <span className="font-semibold text-gray-800">
                    {csas.reduce((sum, csa) => sum + (csa.metrics?.normalPetrol || 0), 0)} L
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total Diesel:</span>
                  <span className="font-semibold text-gray-800">
                    {csas.reduce((sum, csa) => sum + (csa.metrics?.normalDiesel || 0), 0)} L
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total HP Pay:</span>
                  <span className="font-semibold text-gray-800">
                    {csas.reduce((sum, csa) => sum + (csa.metrics?.hpPay || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <h5 className="text-lg font-semibold text-gray-800 mb-3">Overall Summary</h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Object.keys(roGroups).length}</div>
            <div className="text-sm text-gray-600">Retail Outlets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{uniqueFilteredData.length}</div>
            <div className="text-sm text-gray-600">Total CSAs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {convertToKL(uniqueFilteredData.reduce((sum, csa) => sum + (csa.metrics?.normalPetrol || 0), 0))} KL
            </div>
            <div className="text-sm text-gray-600">Total Petrol Sales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {uniqueFilteredData.reduce((sum, csa) => sum + (csa.metrics?.hpPay || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total HP Pay Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// RO-wise Improvement Chart Component
const ROWiseImprovementChart = ({ preTrainingData, postTrainingData, selectedMetric, selectedZone, zonesData }) => {
  // Filter data by selected zone
  const filteredPreData = selectedZone ? 
    preTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    preTrainingData;

  const filteredPostData = selectedZone ? 
    postTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    postTrainingData;

  // Group data by RO and calculate improvement
  const roImprovementData = useMemo(() => {
    const roData = {};
    
    // Process pre-training data
    filteredPreData.forEach(item => {
      const roName = item.outlet?.name || 'Unknown RO';
      if (!roData[roName]) {
        roData[roName] = {
          roName,
          preTotal: 0,
          postTotal: 0,
          csaCount: 0,
          csas: []
        };
      }
      
      const metricValue = item.metrics?.[getMetricKey(selectedMetric)] || 0;
      roData[roName].preTotal += metricValue;
      roData[roName].csaCount++;
      
      // Store CSA data for this RO
      if (!roData[roName].csas.find(csa => csa.name === item.csa?.name)) {
        roData[roName].csas.push({
          name: item.csa?.name,
          preValue: metricValue,
          postValue: 0
        });
      }
    });
    
    // Process post-training data
    filteredPostData.forEach(item => {
      const roName = item.outlet?.name || 'Unknown RO';
      if (!roData[roName]) {
        roData[roName] = {
          roName,
          preTotal: 0,
          postTotal: 0,
          csaCount: 0,
          csas: []
        };
      }
      
      const metricValue = item.metrics?.[getMetricKey(selectedMetric)] || 0;
      roData[roName].postTotal += metricValue;
      
      // Update CSA data for this RO
      const csa = roData[roName].csas.find(csa => csa.name === item.csa?.name);
      if (csa) {
        csa.postValue = metricValue;
      } else {
        roData[roName].csas.push({
          name: item.csa?.name,
          preValue: 0,
          postValue: metricValue
        });
      }
    });
    
    // Calculate improvement percentages and sort by improvement
    const result = Object.values(roData).map(ro => {
      const improvement = calculatePercentageChange(ro.preTotal, ro.postTotal);
      const avgPre = ro.csaCount > 0 ? ro.preTotal / ro.csaCount : 0;
      const avgPost = ro.csaCount > 0 ? ro.postTotal / ro.csaCount : 0;
      const avgImprovement = calculatePercentageChange(avgPre, avgPost);
      
      return {
        ...ro,
        improvement,
        avgImprovement,
        avgPre,
        avgPost
      };
    }).sort((a, b) => b.improvement - a.improvement);
    
    return result;
  }, [filteredPreData, filteredPostData, selectedMetric]);

  if (roImprovementData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          No data available for RO-wise improvement analysis
        </div>
      </div>
    );
  }

  const maxImprovement = Math.max(...roImprovementData.map(ro => Math.abs(ro.improvement)));
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        RO-wise Improvement - {getMetricDisplayName(selectedMetric)}
        {selectedZone && <span className="text-blue-600"> ({selectedZone})</span>}
      </h3>
      <div className="text-sm text-gray-600 mb-6">
        Showing improvement from Pre to Post training across {roImprovementData.length} Retail Outlets
      </div>
      
      <div className="flex h-100">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pr-2 py-4 text-xs text-gray-600">
          <span>+{maxImprovement.toFixed(0)}%</span>
          <span>+{(maxImprovement * 0.5).toFixed(0)}%</span>
          <span>0%</span>
          <span>-{(maxImprovement * 0.5).toFixed(0)}%</span>
          <span>-{maxImprovement.toFixed(0)}%</span>
        </div>

        {/* Chart content */}
        <div className="flex-1 flex items-end justify-center space-x-4 overflow-x-auto">
          {roImprovementData.map((ro, index) => {
            const isPositive = ro.improvement > 0;
            const isNegative = ro.improvement < 0;
            const barHeight = (Math.abs(ro.improvement) / maxImprovement) * (chartHeight * 0.8);
            
            return (
              <div key={ro.roName} className="flex flex-col items-center space-y-4 min-w-[100px]">
                <div className="flex flex-col items-center justify-end h-80">
                  {/* Improvement Bar */}
                  <Tooltip 
                    content={
                      <div className="text-xs">
                        <div className="font-semibold mb-1">{ro.roName}</div>
                        <div>CSAs: {ro.csaCount}</div>
                        <div>Pre Total: {ro.preTotal.toLocaleString()}</div>
                        <div>Post Total: {ro.postTotal.toLocaleString()}</div>
                        <div>Improvement: {ro.improvement >= 0 ? '+' : ''}{ro.improvement.toFixed(1)}%</div>
                        <div>Avg per CSA: {ro.avgImprovement >= 0 ? '+' : ''}{ro.avgImprovement.toFixed(1)}%</div>
                      </div>
                    }
                  >
                    <div
                      className={`w-8 rounded-t-lg transition-all duration-500 hover:opacity-80 ${
                        isPositive 
                          ? 'bg-gradient-to-t from-green-400 to-green-600' 
                          : isNegative 
                            ? 'bg-gradient-to-t from-red-400 to-red-600'
                            : 'bg-gray-400'
                      }`}
                      style={{ 
                        height: `${barHeight}px`,
                        marginBottom: isPositive ? '0' : `${chartHeight * 0.1}px`
                      }}
                    ></div>
                  </Tooltip>
                  
                  {/* Zero line */}
                  <div className="w-full h-0.5 bg-gray-300 my-2"></div>
                  
                  {/* RO Name */}
                  <div className="text-center mt-2">
                    <div className="font-semibold text-gray-800 text-xs mb-1 truncate max-w-[90px]">
                      {ro.roName}
                    </div>
                    <div className={`text-xs font-semibold ${
                      isPositive ? 'text-green-600' : 
                      isNegative ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {ro.improvement >= 0 ? '+' : ''}{ro.improvement.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {ro.csaCount} CSA{ro.csaCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis label */}
      <div className="text-center mt-4 text-sm text-gray-600 font-medium">
        Retail Outlets (ROs)
      </div>

      {/* Y-axis label */}
      {/* <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-gray-600 font-medium whitespace-nowrap">
        Improvement Percentage
      </div> */}

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="text-sm text-blue-600 font-medium">Total ROs</div>
          <div className="text-lg font-bold text-blue-700">{roImprovementData.length}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-3">
          <div className="text-sm text-green-600 font-medium">Improved</div>
          <div className="text-lg font-bold text-green-700">
            {roImprovementData.filter(ro => ro.improvement > 0).length}
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-3">
          <div className="text-sm text-orange-600 font-medium">Avg Improvement</div>
          <div className="text-lg font-bold text-orange-700">
            {(
              roImprovementData.reduce((sum, ro) => sum + ro.improvement, 0) / 
              roImprovementData.length
            ).toFixed(1)}%
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-3">
          <div className="text-sm text-purple-600 font-medium">Top Performer</div>
          <div className="text-lg font-bold text-purple-700">
            +{roImprovementData[0]?.improvement.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Post Data Trend Sparklines
const PostTrendSparklines = ({ preTrainingData, weeklyPostData, selectedMetric, selectedZone, zonesData }) => {
  const postWeeks = Object.keys(weeklyPostData);
  
  // Filter preTraining data by selected zone
  const filteredPreData = selectedZone ? 
    preTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    preTrainingData;

  // Remove duplicate CSA entries
  const uniqueFilteredPreData = removeDuplicateCSAs(filteredPreData);

  if (uniqueFilteredPreData.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          No data available for selected zone: {selectedZone}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Weekly Trends {selectedZone && <span className="text-blue-600">({selectedZone})</span>}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {uniqueFilteredPreData.map((preItem, csaIndex) => {
          const preValue = preItem.metrics?.[getMetricKey(selectedMetric)] || 0;
          const postWeeklyValues = postWeeks.map((week) => {
            const weekData = weeklyPostData[week].find(
              (item) => item.csa?.name === preItem.csa?.name
            );
            return weekData ? weekData.metrics?.[getMetricKey(selectedMetric)] || 0 : 0;
          });

          const allValues = [preValue, ...postWeeklyValues];
          const maxVal = Math.max(...allValues) || 1;
          const minVal = Math.min(...allValues.filter((val) => val > 0)) || 0;
          const range = maxVal - minVal || 1;

          const currentWeekValue = postWeeklyValues[postWeeklyValues.length - 1] || 0;
          const percentageChange = calculatePercentageChange(preValue, currentWeekValue);

          const isPositive = currentWeekValue > preValue;
          const isNegative = currentWeekValue < preValue;

          return (
            <Tooltip
              key={csaIndex}
              content={
                <div className="text-xs">
                  <div className="font-semibold mb-1">{preItem.csa?.name}</div>
                  <div>Zone: {getZoneFromOutlet(preItem.outlet, zonesData)}</div>
                  <div>Pre: <strong>{preValue}</strong></div>
                  <div>Current Week: <strong>{currentWeekValue}</strong></div>
                  <div className={isPositive ? "text-green-400" : "text-red-400"}>
                    Change: {percentageChange >= 0 ? "+" : ""}
                    {percentageChange.toFixed(1)}%
                  </div>
                </div>
              }
            >
              <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5">
                {/* CSA Info */}
                <div className="flex flex-col w-1/3">
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {preItem.csa?.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {preItem.outlet?.name}
                  </span>
                </div>

                {/* Mini Trend Bar */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="flex items-end h-10 gap-1.5">
                    <div
                      className="w-2 rounded-t bg-blue-500"
                      style={{ height: `${((preValue - minVal) / range) * 25 + 6}px` }}
                    ></div>
                    {postWeeklyValues.map((value, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-t bg-green-500"
                        style={{
                          height: `${((value - minVal) / range) * 25 + 6}px`,
                          opacity: i === postWeeklyValues.length - 1 ? 1 : 0.7,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1 font-medium tracking-wide">
                    Base {postWeeks.map((_, i) => `W${i+1}`).join(' ')}
                  </div>
                </div>

                {/* Net Change */}
                <div className="text-right w-20">
                  <div
                    className={`text-sm font-bold ${
                      isPositive
                        ? "text-green-600"
                        : isNegative
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {currentWeekValue > preValue ? "+" : ""}
                    {currentWeekValue - preValue}
                  </div>
                  <div className="text-xs text-gray-500">Net Change</div>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* X-axis Label */}
      <div className="text-center mt-8 text-sm text-gray-600 font-medium">
        Timeline (Pre → Weekly Progress) - {uniqueFilteredPreData.length} CSAs
      </div>
    </div>
  );
};

// Weekly Post Progress Chart
const WeeklyPostProgressChart = ({ preTrainingData, weeklyPostData, selectedMetric, selectedCSA, onCSASelect, selectedZone, zonesData }) => {
  const postWeeks = Object.keys(weeklyPostData);
  
  // Filter preTraining data by selected zone for the dropdown
  const filteredPreData = selectedZone ? 
    preTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    preTrainingData;

  // Remove duplicate CSA entries
  const uniqueFilteredPreData = removeDuplicateCSAs(filteredPreData);

  const csaPreData = uniqueFilteredPreData.find(item => item.csa?.name === selectedCSA);
  if (!csaPreData) {
    // If selected CSA is not in filtered data, select the first available
    if (uniqueFilteredPreData.length > 0) {
      onCSASelect(uniqueFilteredPreData[0].csa?.name);
      return null;
    }
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          No data available for selected zone: {selectedZone}
        </div>
      </div>
    );
  }

  const preValue = csaPreData.metrics?.[getMetricKey(selectedMetric)] || 0;

  // Get weekly values for postTraining period only
  const postWeeklyValues = postWeeks.map(week => {
    const weekData = weeklyPostData[week].find(item => item.csa?.name === selectedCSA);
    return weekData ? weekData.metrics?.[getMetricKey(selectedMetric)] || 0 : 0;
  });

  const allValues = [preValue, ...postWeeklyValues];
  const maxValue = Math.max(...allValues) || 1;
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
          Weekly Progress {selectedZone && <span className="text-blue-600">({selectedZone})</span>}
        </h3>

        <div className="flex items-center space-x-2 mb-10">
          <span className="text-sm font-medium text-gray-700">CSA:</span>
          <select
            value={selectedCSA}
            onChange={(e) => onCSASelect(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {uniqueFilteredPreData.map((csa) => (
              <option key={csa._id} value={csa.csa?.name}>
                {csa.csa?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {/* Y-axis + Bars */}
        <div className="flex-1 flex items-end justify-center relative">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pr-3 text-xs text-gray-500 h-52">
            <span>{maxValue}</span>
            <span>{Math.round(maxValue * 0.75)}</span>
            <span>{Math.round(maxValue * 0.5)}</span>
            <span>{Math.round(maxValue * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Bars */}
          <div className="flex-1 flex justify-around items-end h-52 space-x-4 sm:space-x-6 md:space-x-8">
            {/* Pre Bar */}
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-600 mb-2">Pre</div>
              <div
                className="w-8 bg-blue-500 rounded-t-md transition-all duration-500 hover:opacity-80"
                style={{ height: `${(preValue / maxValue) * 180}px` }}
              ></div>
              <div className="text-sm font-semibold text-gray-800 mt-2">{preValue}</div>
            </div>

            {/* Post Bars */}
            {postWeeks.map((week, index) => (
              <div key={week} className="flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-2">{week}</div>
                <div
                  className="w-8 bg-gradient-to-t from-green-400 to-green-600 rounded-t-md transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(postWeeklyValues[index] / maxValue) * 180}px` }}
                ></div>
                <div className="text-sm font-semibold text-gray-800 mt-2">
                  {postWeeklyValues[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X-axis label */}
      <div className="text-center mt-6 text-sm text-gray-600 font-medium tracking-wide">
        Timeline (Weeks) - Zone: {getZoneFromOutlet(csaPreData.outlet, zonesData)}
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm border border-blue-100">
          <div className="text-sm text-blue-600 font-medium">Baseline (Pre)</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{preValue}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center shadow-sm border border-green-100">
          <div className="text-sm text-green-600 font-medium">Current Week (Post)</div>
          <div className="text-2xl font-bold text-green-700 mt-1">
            {postWeeklyValues[postWeeklyValues.length - 1]}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
          <span className="text-sm font-semibold text-green-600">
            +{calculatePercentageChange(preValue, postWeeklyValues[postWeeklyValues.length - 1]).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(
                100,
                (postWeeklyValues[postWeeklyValues.length - 1] / maxValue) * 100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Comparison Bar Chart - Now properly compares preTraining vs postTraining data
const ComparisonBarChart = ({ title, preTrainingData, postTrainingData, dataKey, selectedWeek, selectedZone, zonesData }) => {
  // Filter preTraining data by selected zone
  const filteredPreData = selectedZone ? 
    preTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    preTrainingData;

  // Remove duplicate CSA entries from preTraining data
  const uniqueFilteredPreData = removeDuplicateCSAs(filteredPreData);

  // Get postTraining data for the selected week and zone
  const filteredPostData = selectedZone ? 
    postTrainingData.filter(item => getZoneFromOutlet(item.outlet, zonesData) === selectedZone) : 
    postTrainingData;

  if (uniqueFilteredPreData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          No data available for selected zone: {selectedZone}
        </div>
      </div>
    );
  }

  const allValues = [
    ...uniqueFilteredPreData.map(item => item.metrics?.[getMetricKey(dataKey)] || 0), 
    ...filteredPostData.map(item => item.metrics?.[getMetricKey(dataKey)] || 0)
  ];
  const maxValue = Math.max(...allValues, 10);
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {title} {selectedZone && <span className="text-blue-600">({selectedZone})</span>}
      </h3>
      <div className="text-sm text-gray-600 mb-6">{selectedWeek} - {uniqueFilteredPreData.length} CSAs</div>
      
      <div className="flex h-100">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pr-2 py-4 text-xs text-gray-600">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Chart content */}
        <div className="flex-1 flex items-end justify-center space-x-4 overflow-x-auto">
          {uniqueFilteredPreData.map((preItem, index) => {
            const postItem = filteredPostData.find(item => item.csa?.name === preItem.csa?.name);
            const preValue = preItem.metrics?.[getMetricKey(dataKey)] || 0;
            const postValue = postItem ? postItem.metrics?.[getMetricKey(dataKey)] || 0 : 0;
            const preHeight = (preValue / maxValue) * chartHeight;
            const postHeight = (postValue / maxValue) * chartHeight;
            const percentageChange = calculatePercentageChange(preValue, postValue);

            return (
              <div key={index} className="flex flex-col items-center space-y-4 min-w-[80px]">
                <div className="flex items-end space-x-2">
                  {/* Pre Bar */}
                  <Tooltip content={`${preItem.csa?.name} - Pre: ${preValue}`}>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${preHeight}px`, minHeight: '2px' }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-1">Pre</span>
                    </div>
                  </Tooltip>
                  
                  {/* Post Bar */}
                  <Tooltip content={`${preItem.csa?.name} - Post: ${postValue}`}>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${postHeight}px`, minHeight: '2px' }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-1">Post</span>
                    </div>
                  </Tooltip>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold text-gray-800 text-xs mb-1 truncate max-w-[70px]">
                    {preItem.csa?.name?.split(" ")[0]}
                  </div>
                  <Tooltip content={`Change: ${percentageChange >= 0 ? '+' : ''}${percentageChange.toFixed(1)}%`}>
                    <div className={`text-xs font-semibold ${
                      percentageChange > 0 ? 'text-green-600' : 
                      percentageChange < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                    </div>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis label */}
      <div className="text-center mt-4 text-sm text-gray-600 font-medium">
        Customer Service Attendants (CSA)
      </div>

      {/* Y-axis label */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-gray-600 font-medium whitespace-nowrap">
        Sales Volume (Litres)
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function PostWeeklyProgressDashboard() {
  const dispatch = useDispatch();
  const { data: performanceData, loading, error } = useSelector((state) => state.performance);
  const { zones: zonesData, loading: zonesLoading } = useSelector((state) => state.zones);
  
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedCSA, setSelectedCSA] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [showCSATable, setShowCSATable] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchPerformanceData());
    dispatch(fetchZonesData());
  }, [dispatch]);

  // Separate preTraining and postTraining data based on uploadType
  const { preTrainingData, postTrainingData, unknownType } = useMemo(() => {
    return separatePrePostTrainingData(performanceData || []);
  }, [performanceData]);

  // Calculate weekly data from postTraining data only
  const weeklyPostData = useMemo(() => {
    return calculateWeeklyPostTrainingData(postTrainingData);
  }, [postTrainingData]);

  // Get ALL zones from zones data (not just zones with performance data)
  const allZones = useMemo(() => {
    if (!zonesData) return [];
    
    const zones = new Set();
    
    // If zonesData is an array of zone objects
    if (Array.isArray(zonesData)) {
      zonesData.forEach(zone => {
        if (zone.name) zones.add(zone.name);
        if (zone.zoneName) zones.add(zone.zoneName);
      });
    }
    // If zonesData is an object with zone names as keys
    else if (typeof zonesData === 'object') {
      Object.keys(zonesData).forEach(zoneName => {
        if (zoneName && zoneName !== 'Unknown Zone') {
          zones.add(zoneName);
        }
      });
    }
    
    const zonesArray = Array.from(zones).sort();
    console.log('🗺️ All zones from database:', zonesArray);
    return zonesArray;
  }, [zonesData]);

  // Get zones that actually have performance data
  const zonesWithData = useMemo(() => {
    if (!performanceData || !zonesData) return [];
    
    const zones = new Set();
    performanceData.forEach(item => {
      const zone = getZoneFromOutlet(item.outlet, zonesData);
      if (zone && zone !== 'Unknown Zone') {
        zones.add(zone);
      }
    });
    
    const zonesArray = Array.from(zones).sort();
    console.log('📊 Zones with performance data:', zonesArray);
    return zonesArray;
  }, [performanceData, zonesData]);

  // Remove duplicate CSA entries from preTraining data for display
  const uniquePreTrainingData = useMemo(() => {
    return removeDuplicateCSAs(preTrainingData || []);
  }, [preTrainingData]);

  // Set default week when data loads
  useEffect(() => {
    const weeks = Object.keys(weeklyPostData);
    if (weeks.length > 0 && !selectedWeek) {
      setSelectedWeek(weeks[weeks.length - 1]);
    }
  }, [weeklyPostData, selectedWeek]);

  // Set default CSA when data loads
  useEffect(() => {
    if (uniquePreTrainingData && uniquePreTrainingData.length > 0 && !selectedCSA) {
      setSelectedCSA(uniquePreTrainingData[0].csa?.name);
    }
  }, [uniquePreTrainingData, selectedCSA]);

  const postWeeks = Object.keys(weeklyPostData);
  const currentPostData = weeklyPostData[selectedWeek] || [];

  // Get all unique upload types for display
  const allUploadTypes = useMemo(() => {
    if (!performanceData) return [];
    return [...new Set(performanceData.map(item => item.uploadType))].filter(Boolean);
  }, [performanceData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Performance Data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Training Progress Dashboard
          </h1>
          <p className="text-gray-600">
            {allZones.length > 0 ? `Tracking across ${allZones.length} zones` : 'Loading zones data...'}
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Pre Data: {preTrainingData.length} records | Post Data: {postTrainingData.length} records
            {unknownType.length > 0 && ` | Unknown Type: ${unknownType.length} records`}
          </div>
        </div>

        {/* Debug Info */}
        <DebugInfo 
          performanceData={performanceData}
          zonesData={zonesData}
          weeklyPostData={weeklyPostData}
          selectedZone={selectedZone}
          allZones={allZones}
          preTrainingData={preTrainingData}
          postTrainingData={postTrainingData}
          unknownType={unknownType}
        />

        {/* Data Availability Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className={`p-3 rounded-lg ${preTrainingData.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="font-semibold">Pre Data</div>
              <div className={preTrainingData.length > 0 ? 'text-green-700' : 'text-red-700'}>
                {preTrainingData.length} records found
              </div>
            </div>
            <div className={`p-3 rounded-lg ${postTrainingData.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="font-semibold">Post Data</div>
              <div className={postTrainingData.length > 0 ? 'text-green-700' : 'text-red-700'}>
                {postTrainingData.length} records found
              </div>
            </div>
            <div className={`p-3 rounded-lg ${unknownType.length > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="font-semibold">Unknown Upload Types</div>
              <div className={unknownType.length > 0 ? 'text-yellow-700' : 'text-gray-700'}>
                {unknownType.length} records
              </div>
            </div>
          </div>
        </div>

        {/* Zone Filter - Show ALL zones from database */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zone Selector - Shows ALL zones from database */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Zone/Region
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Zones</option>
                {allZones.map(zone => (
                  <option key={zone} value={zone}>
                    {zone} {!zonesWithData.includes(zone) && '(No data)'}
                  </option>
                ))}
              </select>
              <div className="text-xs text-gray-500 mt-1">
                {allZones.length} total zones | {zonesWithData.length} with data
              </div>
            </div>

            {/* Metric Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Performance Metric
              </label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {metrics.map(metric => (
                  <option key={metric} value={metric}>
                    {getMetricDisplayName(metric)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Week Selector */}
          {postWeeks.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Week (Post Data)
              </label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              >
                {postWeeks.map(week => (
                  <option key={week} value={week}>{week}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Toggle for CSA-RO Table */}
        {performanceData && performanceData.length > 0 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowCSATable(!showCSATable)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{showCSATable ? 'Hide' : 'Show'} CSA-RO Relationship Table</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${showCSATable ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* CSA-RO Relationship Table - Only show if there's performance data */}
        {showCSATable && performanceData && performanceData.length > 0 && (
          <CSARelationshipTable 
            data={performanceData} 
            zonesData={zonesData} 
            selectedZone={selectedZone}
          />
        )}

        {/* Show message if selected zone has no data */}
        {selectedZone && !zonesWithData.includes(selectedZone) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-yellow-500 mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-yellow-800 font-semibold">No Data Available</h4>
                <p className="text-yellow-600 text-sm">
                  Selected zone "{selectedZone}" exists in the database but has no performance data.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Pre/Post Training Data Message */}
        {(preTrainingData.length === 0 || postTrainingData.length === 0) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Data Configuration Issue</h3>
            <div className="space-y-2 text-red-700">
              <p><strong>Problem:</strong> Cannot perform Pre vs Post comparison because:</p>
              {preTrainingData.length === 0 && <p>• No Pre data found (looking for uploadType: 'preTraining')</p>}
              {postTrainingData.length === 0 && <p>• No Post data found (looking for uploadType: 'postTraining')</p>}
              <p className="text-sm mt-3">
                <strong>Available upload types in your data:</strong> {allUploadTypes.join(', ') || 'None found'}
              </p>
            </div>
          </div>
        )}

        {/* Charts Grid - Only show if there's both preTraining and postTraining data for selected zone */}
        {uniquePreTrainingData && uniquePreTrainingData.length > 0 && postTrainingData.length > 0 && postWeeks.length > 0 && 
         (!selectedZone || zonesWithData.includes(selectedZone)) && (
          <div className="space-y-6">
            {/* RO-wise Improvement Chart */}
            <ROWiseImprovementChart
              preTrainingData={uniquePreTrainingData}
              postTrainingData={postTrainingData}
              selectedMetric={getMetricDisplayName(selectedMetric)}
              selectedZone={selectedZone}
              zonesData={zonesData}
            />

            {/* Weekly Post Progress */}
            <WeeklyPostProgressChart
              preTrainingData={uniquePreTrainingData}
              weeklyPostData={weeklyPostData}
              selectedMetric={getMetricDisplayName(selectedMetric)}
              selectedCSA={selectedCSA}
              onCSASelect={setSelectedCSA}
              selectedZone={selectedZone}
              zonesData={zonesData}
            />

            {/* Comparison and Trends */}
            <div className="flex flex-col gap-6">
              <ComparisonBarChart
                title={`${getMetricDisplayName(selectedMetric)} - Pre vs Post Comparison`}
                preTrainingData={uniquePreTrainingData}
                postTrainingData={currentPostData}
                dataKey={getMetricDisplayName(selectedMetric)}
                selectedWeek={selectedWeek}
                selectedZone={selectedZone}
                zonesData={zonesData}
              />
              <PostTrendSparklines
                preTrainingData={uniquePreTrainingData}
                weeklyPostData={weeklyPostData}
                selectedMetric={getMetricDisplayName(selectedMetric)}
                selectedZone={selectedZone}
                zonesData={zonesData}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          {allZones.length > 0 && (
            <>
              Database has {allZones.length} zone{allZones.length !== 1 ? 's' : ''}
              {performanceData && performanceData.length > 0 && (
                <> | {performanceData.length} total records</>
              )}
              {preTrainingData.length > 0 && (
                <> | {preTrainingData.length} Pre records</>
              )}
              {postTrainingData.length > 0 && (
                <> | {postTrainingData.length} Post records</>
              )}
              {selectedZone && ` | Filtered by: ${selectedZone}`}
            </>
          )}
        </div>
      </div>
    </div>
  );
}