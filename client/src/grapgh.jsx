import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPerformanceData } from './store/performanceSlice';
import { fetchZonesData } from './store/zonesSlice';

// Define all five zones
const ALL_ZONES = ['Aurangabad', 'Mumbai', 'Pune', 'Nagpur', 'Nashik'];

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

// Helper function to get zone from outlet data
const getZoneFromOutlet = (outlet, zonesData) => {
  if (!outlet || !zonesData) return 'Aurangabad';

  if (Array.isArray(zonesData)) {
    const foundZone = zonesData.find(zone => {
      if (zone.outlets && Array.isArray(zone.outlets)) {
        return zone.outlets.some(out => out._id === outlet._id);
      }
      if (zone.regions && Array.isArray(zone.regions)) {
        return zone.regions.some(region => region._id === outlet._id);
      }
      return false;
    });
    return foundZone?.name || foundZone?.zoneName || 'Aurangabad';
  }

  return 'Aurangabad';
};

// Stat Card Component
const StatCard = ({ title, value, change, icon, color, size = 'md', description }) => {
  const isPositive = change >= 0;

  const sizes = {
    sm: {
      padding: 'p-3',
      title: 'text-xs',
      value: 'text-lg',
      change: 'text-xs',
      icon: 'w-4 h-4',
      iconContainer: 'p-2'
    },
    md: {
      padding: 'p-6',
      title: 'text-sm',
      value: 'text-2xl',
      change: 'text-sm',
      icon: 'w-6 h-6',
      iconContainer: 'p-3'
    }
  };

  const style = sizes[size];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${style.padding} hover:shadow-md transition-all duration-300 ${size === 'sm' ? 'min-w-0' : ''}`}>
      <div className="flex items-center justify-between">
        <div className={size === 'sm' ? 'min-w-0 flex-1' : ''}>
          <p className={`${style.title} font-medium text-gray-600 ${size === 'sm' ? 'truncate' : ''}`}>
            {title}
          </p>
          <p className={`${style.value} font-bold text-gray-900 mt-1 ${size === 'sm' ? 'truncate' : ''}`}>
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <svg className={`${style.icon} ${isPositive ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                {isPositive ? (
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                )}
              </svg>
              <span className={`${style.change} font-medium ml-1`}>
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
          )}
          {description && (
            <p className={`${style.title} text-gray-500 mt-1 ${size === 'sm' ? 'truncate' : ''}`}>
              {description}
            </p>
          )}
        </div>
        <div className={`rounded-full ${color} bg-opacity-10 ${style.iconContainer} ${size === 'sm' ? 'ml-2 flex-shrink-0' : ''}`}>
          {React.cloneElement(icon, { className: `${icon.props.className} ${style.icon}` })}
        </div>
      </div>
    </div>
  );
};

// Training Comparison Cards Component
const TrainingComparisonCards = ({ data, zoneName }) => {
  const trainingData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        preTraining: { count: 0, metrics: {} },
        postTraining: { count: 0, metrics: {} }
      };
    }

    const preTraining = data.filter(item => item.uploadType === 'preTraining');
    const postTraining = data.filter(item => item.uploadType === 'postTraining');

    const calculateMetrics = (items) => {
      return items.reduce((acc, item) => {
        if (item.metrics) {
          Object.keys(item.metrics).forEach(key => {
            acc[key] = (acc[key] || 0) + (item.metrics[key] || 0);
          });
        }
        return acc;
      }, {});
    };

    return {
      preTraining: {
        count: preTraining.length,
        metrics: calculateMetrics(preTraining)
      },
      postTraining: {
        count: postTraining.length,
        metrics: calculateMetrics(postTraining)
      }
    };
  }, [data]);

  const getImprovement = (preValue, postValue) => {
    if (!preValue || preValue === 0) return postValue > 0 ? 100 : 0;
    return ((postValue - preValue) / preValue * 100).toFixed(1);
  };

  const formatValue = (value, key) => {
    if (key.includes('Petrol') || key.includes('Diesel')) {
      return `${(value / 1000).toFixed(1)} KL`;
    }
    return value?.toLocaleString() || '0';
  };

  const keyMetrics = [
    { key: 'normalPetrol', label: 'Normal Petrol', icon: '⛽' },
    { key: 'normalDiesel', label: 'Normal Diesel', icon: '⛽' },
    { key: 'premiumPetrol', label: 'Premium Petrol', icon: '⭐' },
    { key: 'hpPay', label: 'HP Pay', icon: '💳' },
    { key: 'googleReviews', label: 'Google Reviews', icon: '⭐' },
    { key: 'newCustomers', label: 'New Customers', icon: '👥' }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Training Performance Comparison</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pre-Training Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-blue-800">Pre-Training Data</h4>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {trainingData.preTraining.count} Records
            </div>
          </div>

          <div className="space-y-3">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{metric.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {formatValue(trainingData.preTraining.metrics[metric.key], metric.key)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {trainingData.preTraining.count === 0 && (
            <div className="text-center py-6 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p>No pre-training data available</p>
            </div>
          )}
        </div>

        {/* Post-Training Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-green-800">Post-Training Data</h4>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {trainingData.postTraining.count} Records
            </div>
          </div>

          <div className="space-y-3">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{metric.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {formatValue(trainingData.postTraining.metrics[metric.key], metric.key)}
                  </div>
                  {trainingData.preTraining.metrics[metric.key] > 0 && (
                    <div className={`text-xs font-medium ${trainingData.postTraining.metrics[metric.key] > trainingData.preTraining.metrics[metric.key]
                      ? 'text-green-600'
                      : 'text-red-600'
                      }`}>
                      {getImprovement(trainingData.preTraining.metrics[metric.key], trainingData.postTraining.metrics[metric.key])}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {trainingData.postTraining.count === 0 && (
            <div className="text-center py-6 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p>No post-training data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Improvement Summary */}
      {(trainingData.preTraining.count > 0 && trainingData.postTraining.count > 0) && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Training Impact Summary</h4>
          <div
            className="
    grid
    grid-cols-1
    xs:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-6
    gap-3 sm:gap-4
  "
          >
            {keyMetrics.map((metric, index) => {
              const improvement = getImprovement(
                trainingData.preTraining.metrics[metric.key],
                trainingData.postTraining.metrics[metric.key]
              );
              const isPositive = parseFloat(improvement) > 0;

              return (
                <div
                  key={index}
                  className="
          text-center
          p-3 sm:p-4
          bg-gray-50
          rounded-xl
          hover:shadow-md
          transition-shadow
        "
                >
                  {/* Icon */}
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                    {metric.icon}
                  </div>

                  {/* Improvement Value */}
                  <div
                    className={`
            font-bold
            text-base sm:text-lg
            ${isPositive ? 'text-green-600' : 'text-red-600'}
            mb-0.5 sm:mb-1
          `}
                  >
                    {isPositive ? '+' : ''}
                    {improvement}%
                  </div>

                  {/* Label */}
                  <div className="text-[10px] sm:text-xs text-gray-600 font-medium">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

// Data Summary Cards Component
const ZoneDataCards = ({ metrics, size = 'md', zoneName }) => {
  const stats = [
    {
      title: 'Total Outlets',
      value: metrics.totalOutlets.toString(),
      change: 0,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'bg-blue-100',
      description: `Retail outlets in ${zoneName}`
    },
    {
      title: 'Total CSAs',
      value: metrics.totalCSAs.toString(),
      change: 0,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-green-100',
      description: 'Customer service attendants'
    },
    {
      title: 'Total Records',
      value: metrics.totalRecords.toString(),
      change: 0,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      color: 'bg-purple-100',
      description: 'All data entries'
    },
    {
      title: 'Petrol Sales',
      value: `${metrics.petrolSalesKL} KL`,
      change: 0,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: 'bg-yellow-100',
      description: 'Total volume sold'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
          description={stat.description}
          size="md"
        />
      ))}
    </div>
  );
};

// CSA List Component
const CSAList = ({ data, zoneName }) => {
  const uniqueCSAs = removeDuplicateCSAs(data || []);

  if (uniqueCSAs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h4 className="text-lg font-medium text-gray-600 mb-1">No CSA Data Available</h4>
          <p className="text-sm text-gray-500">No customer service attendants found for {zoneName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
        Customer Service Attendants ({uniqueCSAs.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {uniqueCSAs.map((csa, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow"
          >
            {/* Top Row */}
            <div className="flex items-center space-x-3">

              {/* Avatar */}
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {csa.csa?.name?.charAt(0) || "C"}
                </span>
              </div>

              {/* Name + Outlet */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                  {csa.csa?.name || "Unknown CSA"}
                </p>
                <p className="text-xs text-gray-500 truncate leading-tight">
                  {csa.outlet?.name || "Unknown Outlet"}
                </p>

                {/* Badge */}
                <span
                  className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full ${csa.uploadType === "preTraining"
                    ? "bg-blue-100 text-blue-800"
                    : csa.uploadType === "postTraining"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {csa.uploadType || "No Type"}
                </span>
              </div>
            </div>

            {/* Metrics */}
            {csa.metrics && (
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="bg-white rounded-md p-2 shadow-sm">
                  <div className="font-semibold text-gray-900 text-sm">
                    {csa.metrics.normalPetrol || 0}
                  </div>
                  <div className="text-[10px] text-gray-500">Petrol (L)</div>
                </div>
                <div className="bg-white rounded-md p-2 shadow-sm">
                  <div className="font-semibold text-gray-900 text-sm">
                    {csa.metrics.normalDiesel || 0}
                  </div>
                  <div className="text-[10px] text-gray-500">Diesel (L)</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

// Outlet List Component
const OutletList = ({ data, zoneName }) => {
  const outlets = useMemo(() => {
    if (!data) return [];
    const uniqueOutlets = new Map();
    data.forEach(item => {
      if (item.outlet?.name) {
        uniqueOutlets.set(item.outlet.name, item.outlet);
      }
    });
    return Array.from(uniqueOutlets.values());
  }, [data]);

  if (outlets.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h4 className="text-lg font-medium text-gray-600 mb-1">No Outlet Data Available</h4>
          <p className="text-sm text-gray-500">No retail outlets found for {zoneName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Retail Outlets ({outlets.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {outlets.map((outlet, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">
                  {outlet.name?.charAt(0) || 'O'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {outlet.name || 'Unknown Outlet'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {zoneName}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {outlet.address || 'No address available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Metrics Summary Component
const MetricsSummary = ({ data, zoneName }) => {
  const metrics = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        normalPetrol: 0,
        normalDiesel: 0,
        premiumPetrol: 0,
        hpPay: 0,
        googleReviews: 0,
        newCustomers: 0,
        complaintsResolved: 0,
        lubeSales: 0,
        additiveSales: 0
      };
    }

    return data.reduce((acc, item) => {
      if (item.metrics) {
        Object.keys(item.metrics).forEach(key => {
          acc[key] = (acc[key] || 0) + (item.metrics[key] || 0);
        });
      }
      return acc;
    }, {});
  }, [data]);

  const metricCards = [
    {
      title: 'Normal Petrol',
      value: `${(metrics.normalPetrol / 1000).toFixed(1)} KL`,
      icon: '⛽',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Normal Diesel',
      value: `${(metrics.normalDiesel / 1000).toFixed(1)} KL`,
      icon: '⛽',
      color: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Premium Petrol',
      value: `${(metrics.premiumPetrol / 1000).toFixed(1)} KL`,
      icon: '⭐',
      color: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'HP Pay',
      value: metrics.hpPay?.toLocaleString() || '0',
      icon: '💳',
      color: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Google Reviews',
      value: metrics.googleReviews?.toLocaleString() || '0',
      icon: '⭐',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'New Customers',
      value: metrics.newCustomers?.toLocaleString() || '0',
      icon: '👥',
      color: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    },
    {
      title: 'Complaints Resolved',
      value: metrics.complaintsResolved?.toLocaleString() || '0',
      icon: '✅',
      color: 'bg-teal-50',
      textColor: 'text-teal-700'
    },
    {
      title: 'Lube Sales',
      value: metrics.lubeSales?.toLocaleString() || '0',
      icon: '🛢️',
      color: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Additive Sales',
      value: metrics.additiveSales?.toLocaleString() || '0',
      icon: '🧪',
      color: 'bg-pink-50',
      textColor: 'text-pink-700'
    }
  ];

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="text-center text-gray-500 py-8">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h4 className="text-lg font-medium text-gray-600 mb-1">No Metrics Data Available</h4>
          <p className="text-sm text-gray-500">No performance metrics found for {zoneName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
        Performance Metrics Summary
      </h3>

      <div className="
      grid 
      grid-cols-1 
      xs:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-5 
      gap-3 sm:gap-4
    "
      >
        {metricCards.map((metric, index) => (
          <div
            key={index}
            className={`${metric.color} rounded-xl p-3 sm:p-4 text-center hover:shadow-md transition-shadow`}
          >
            {/* Icon */}
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
              {metric.icon}
            </div>

            {/* Value */}
            <div className={`text-base sm:text-lg font-bold ${metric.textColor} mb-0.5 sm:mb-1`}>
              {metric.value}
            </div>

            {/* Title */}
            <div className="text-[10px] sm:text-xs text-gray-600 font-medium">
              {metric.title}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

// Main Dashboard Component
export default function MultiZoneDashboard() {
  const dispatch = useDispatch();
  const { data: performanceData, loading, error } = useSelector((state) => state.performance);
  const { zones: zonesData, loading: zonesLoading } = useSelector((state) => state.zones);

  const [selectedZone, setSelectedZone] = useState('Aurangabad');

  // Filter data for selected zone
  const zoneData = useMemo(() => {
    if (!performanceData) return [];
    return performanceData.filter(item => {
      const zone = getZoneFromOutlet(item.outlet, zonesData);
      return zone === selectedZone;
    });
  }, [performanceData, zonesData, selectedZone]);

  // Calculate metrics for selected zone
  const metrics = useMemo(() => {
    if (!zoneData || zoneData.length === 0) {
      return {
        totalOutlets: 0,
        totalCSAs: 0,
        totalRecords: 0,
        petrolSalesKL: '0.0',
        dieselSalesKL: '0.0',
        hpPayTransactions: 0,
        googleReviews: 0,
        newCustomers: 0
      };
    }

    const outlets = new Set(zoneData.map(item => item.outlet?.name).filter(Boolean));
    const csas = new Set(zoneData.map(item => item.csa?.name).filter(Boolean));

    const totalPetrol = zoneData.reduce((sum, item) => sum + (item.metrics?.normalPetrol || 0), 0);
    const totalDiesel = zoneData.reduce((sum, item) => sum + (item.metrics?.normalDiesel || 0), 0);
    const totalHpPay = zoneData.reduce((sum, item) => sum + (item.metrics?.hpPay || 0), 0);
    const totalGoogleReviews = zoneData.reduce((sum, item) => sum + (item.metrics?.googleReviews || 0), 0);
    const totalNewCustomers = zoneData.reduce((sum, item) => sum + (item.metrics?.newCustomers || 0), 0);

    return {
      totalOutlets: outlets.size,
      totalCSAs: csas.size,
      totalRecords: zoneData.length,
      petrolSalesKL: (totalPetrol / 1000).toFixed(1),
      dieselSalesKL: (totalDiesel / 1000).toFixed(1),
      hpPayTransactions: totalHpPay,
      googleReviews: totalGoogleReviews,
      newCustomers: totalNewCustomers
    };
  }, [zoneData]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchPerformanceData());
    dispatch(fetchZonesData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Zone Data...</h2>
        </div>
      </div>
    );
  }

  const hasDataForSelectedZone = zoneData.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="w-full mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Multi-Zone Performance Dashboard
          </h1>
          <p className="text-gray-600">
            View performance data across all zones
          </p>
        </div>

        {/* Zone Selector */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Zone
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {ALL_ZONES.map(zone => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-3 rounded-lg w-full">
                <div><strong>{ALL_ZONES.length}</strong> zones available</div>
                <div className="mt-1 text-blue-600 font-semibold">
                  {zoneData.length} records in {selectedZone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Show data or no data message */}
        {!performanceData || performanceData.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Available</h3>
              <p className="text-gray-600">
                No performance data found in the database.
              </p>
            </div>
          </div>
        ) : hasDataForSelectedZone ? (
          <>
            {/* Training Comparison Cards */}
            <TrainingComparisonCards data={zoneData} zoneName={selectedZone} />

            {/* Zone Data Cards */}
            <ZoneDataCards metrics={metrics} size="md" zoneName={selectedZone} />

            {/* Metrics Summary */}
            <div className="mb-8">
              <MetricsSummary data={zoneData} zoneName={selectedZone} />
            </div>

            {/* CSA List */}
            <div className="mb-8">
              <CSAList data={zoneData} zoneName={selectedZone} />
            </div>

            {/* Outlet List */}
            <div className="mb-8">
              <OutletList data={zoneData} zoneName={selectedZone} />
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data for {selectedZone}</h3>
              <p className="text-gray-600 mb-6">
                No performance data found for <span className="font-semibold">{selectedZone}</span> zone.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-500">
                  Please select a different zone from the dropdown above. Currently, only Aurangabad has data available.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}