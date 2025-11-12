
// src/App.jsx
import React, { useState } from 'react';


const csaData = [

  {
    "Sl": 1,
    "CSA Name": "BABASAHEB KHARAT",
    "RO Name": "HP Service Centre, Harsul",
    "Volume of Normal Petrol sales (in litres)": 0,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 412,
    "How many HP pay transactions done?": 5797,
    "Number of google reviews": 1,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },


  {
    "Sl": 2,
    "CSA Name": "ABHIJIT WAHUL",
    "RO Name": "HP Service Centre, Harsul",
    "Volume of Normal Petrol sales (in litres)": 634,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 119,
    "How many HP pay transactions done?": 3658,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 3,
    "CSA Name": "RAVI GAIKWAD",
    "RO Name": "HP Service Centre, Harsul",
    "Volume of Normal Petrol sales (in litres)": 814,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 0,
    "How many HP pay transactions done?": 1425,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 4,
    "CSA Name": "GATKHANE",
    "RO Name": "HP Service Centre, Harsul",
    "Volume of Normal Petrol sales (in litres)": 1442,
    "Volume of Normal Diesel sales (in litres)": 2364,
    "Volume of Premium Petrol sales (Power95) (in litres)": 0,
    "How many HP pay transactions done?": 35978,
    "Number of google reviews": 1,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 5,
    "CSA Name": "SWAPNIL BANLODE",
    "RO Name": "HP Service Centre, Harsul",
    "Volume of Normal Petrol sales (in litres)": 414,
    "Volume of Normal Diesel sales (in litres)": 1000,
    "Volume of Premium Petrol sales (Power95) (in litres)": 0,
    "How many HP pay transactions done?": 1200,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 6,
    "CSA Name": "PRIYANKA CHATE",
    "RO Name": "Hind Super",
    "Volume of Normal Petrol sales (in litres)": 200,
    "Volume of Normal Diesel sales (in litres)": 1200,
    "Volume of Premium Petrol sales (Power95) (in litres)": 0,
    "How many HP pay transactions done?": 0,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 7,
    "CSA Name": "KAVITA SUGRANKAR",
    "RO Name": "Hind Super",
    "Volume of Normal Petrol sales (in litres)": 600,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 150,
    "How many HP pay transactions done?": 250,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 8,
    "CSA Name": "IMRAN FARUKI",
    "RO Name": "Hind Super",
    "Volume of Normal Petrol sales (in litres)": 0,
    "Volume of Normal Diesel sales (in litres)": 2000,
    "Volume of Premium Petrol sales (Power95) (in litres)": 300,
    "How many HP pay transactions done?": 0,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 9,
    "CSA Name": "SAYYED ABBAS",
    "RO Name": "Narmada",
    "Volume of Normal Petrol sales (in litres)": 1120,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 21,
    "How many HP pay transactions done?": 200,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 10,
    "CSA Name": "KAYYUM KHAN",
    "RO Name": "Narmada",
    "Volume of Normal Petrol sales (in litres)": 560,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 45,
    "How many HP pay transactions done?": 0,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  },
  {
    "Sl": 11,
    "CSA Name": "UIKEY GAWAL",
    "RO Name": "Narmada",
    "Volume of Normal Petrol sales (in litres)": 712,
    "Volume of Normal Diesel sales (in litres)": 0,
    "Volume of Premium Petrol sales (Power95) (in litres)": 55,
    "How many HP pay transactions done?": 0,
    "Number of google reviews": 0,
    "Number of new customers onboarded": 0,
    "Number of complaints resolved": 0,
    "Quantity of Lube sales": 0,
    "Quantity of Additive sales": 0
  }
];


// Simple Chart Component - Mobile Optimized
const SimpleBarChart = ({ title, data, dataKey, height = 300 }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]), 10);
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
            const value = item[dataKey];
            const height = calculateBarHeight(value);
            return (
              <div key={item.Sl} className="flex flex-col items-center flex-1 min-w-[40px] sm:min-w-0">
                {/* Bar value label */}
                <div className="text-xs font-bold text-gray-700 mb-1 text-center">
                  {isMobile && value > 0 ? '•' : value.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  className={`${getBarColor(index)} w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative group`}
                  style={{ height: `${height}px`, minHeight: value > 0 ? '4px' : '0px' }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block">
                    {item['CSA Name']}: {value.toLocaleString()}L
                  </div>
                </div>

                {/* X-axis label */}
                <div className="text-xs font-semibold text-gray-700 mt-1.5 text-center truncate w-full">
                  {isMobile ?
                    item['CSA Name'].split(' ')[0].substring(0, 3) :
                    item['CSA Name'].split(' ')[0]
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
              {data.reduce((sum, item) => sum + item[dataKey], 0).toLocaleString()} L
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Average</div>
            <div className="text-base sm:text-lg font-bold text-purple-600">
              {Math.round(data.reduce((sum, item) => sum + item[dataKey], 0) / data.length).toLocaleString()} L
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
    const roName = item['RO Name'];
    if (!acc[roName]) {
      acc[roName] = {
        'RO Name': roName,
        'Normal Petrol': 0,
        'Normal Diesel': 0,
        'Premium Petrol': 0,
        'HP Pay': 0
      };
    }

    acc[roName]['Normal Petrol'] += item['Volume of Normal Petrol sales (in litres)'];
    acc[roName]['Normal Diesel'] += item['Volume of Normal Diesel sales (in litres)'];
    acc[roName]['Premium Petrol'] += item['Volume of Premium Petrol sales (Power95) (in litres)'];
    acc[roName]['HP Pay'] += item['How many HP pay transactions done?'];

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
                  ro['RO Name'].split(' ')[0] :
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
const SalesDistributionChart = ({ data, height = 400  }) => {
  const totals = {
    normalPetrol: data.reduce((sum, item) => sum + item['Volume of Normal Petrol sales (in litres)'], 0),
    normalDiesel: data.reduce((sum, item) => sum + item['Volume of Normal Diesel sales (in litres)'], 0),
    premiumPetrol: data.reduce((sum, item) => sum + item['Volume of Premium Petrol sales (Power95) (in litres)'], 0),
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

// Helper function to convert liters to KL
const convertToKL = (liters) => {
  return (liters / 1000).toFixed(1);
};

function FuelSalesDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRO, setFilterRO] = useState('');

  // Get unique RO Names for filter
  const roNames = [...new Set(csaData.map(item => item['RO Name']))];

  // Filter data based on search term and RO filter
  const filteredData = csaData.filter(item => {
    const matchesSearch = item['CSA Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item['RO Name'].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRO = filterRO ? item['RO Name'] === filterRO : true;
    return matchesSearch && matchesRO;
  });

  // Calculate totals from JSON data
  const totals = {
    normalPetrol: filteredData.reduce((sum, item) => sum + item['Volume of Normal Petrol sales (in litres)'], 0),
    normalDiesel: filteredData.reduce((sum, item) => sum + item['Volume of Normal Diesel sales (in litres)'], 0),
    premiumPetrol: filteredData.reduce((sum, item) => sum + item['Volume of Premium Petrol sales (Power95) (in litres)'], 0),
    hpPayTransactions: filteredData.reduce((sum, item) => sum + item['How many HP pay transactions done?'], 0),
    googleReviews: filteredData.reduce((sum, item) => sum + item['Number of google reviews'], 0),
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="w-full mx-auto">
        {/* Header with Filters */}
        <header className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Fuel Sales Analytics Dashboard</h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90">Comprehensive performance tracking for Customer Service Attendants</p>

          {/* Filters Section */}

        </header>

        {/* Performance Graphs Section */}
        <section className="mb-8 sm:mb-12">
          {/* Header Section */}


          <div className="rounded-2xl p-5 sm:p-7">
            <h3 className="text-lg sm:text-2xl font-bold mb-5 text-black tracking-wide drop-shadow">
              🔍 Search & Filter
            </h3>






            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search by CSA Name or RO Name..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg  text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* RO Filter Dropdown */}
              <div className="sm:w-48 lg:w-64 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </span>
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg  text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 hover:shadow-md appearance-none"
                  value={filterRO}
                  onChange={(e) => setFilterRO(e.target.value)}
                >
                  <option value="">All RO Names</option>
                  {roNames.map((roName) => (
                    <option key={roName} value={roName}>
                      {roName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-5 text-center">
              <span className=" px-5 py-2 rounded-full font-semibold text-sm sm:text-base text-black shadow-lg ">
                Showing {filteredData.length} of {csaData.length} CSAs
              </span>
            </div>
          </div>



          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 mt-6">
            <div className="space-y-4 sm:space-y-6">
              <SimpleBarChart
                title="Normal Petrol Sales"
                data={filteredData}
                dataKey="Volume of Normal Petrol sales (in litres)"
                height={280}
              />
              <SimpleBarChart
                title="Premium Petrol Sales"
                data={filteredData}
                dataKey="Volume of Premium Petrol sales (Power95) (in litres)"
                height={280}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <SimpleBarChart
                title="Normal Diesel Sales"
                data={filteredData}
                dataKey="Volume of Normal Diesel sales (in litres)"
                height={280}
              />
              <SalesDistributionChart data={filteredData}
          
               />
            </div>
          </div>

          {/* RO Comparison Chart */}
          <div className="mb-6 sm:mb-8">
            <ROComparisonChart data={filteredData} />
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
          </div>

          <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
            {/* Totals Summary */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                {
                  title: 'Total CSAs',
                  value: filteredData.length,
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
                      'Petrol (L)',
                      'Diesel (L)',
                      'Premium (L)',
                      'HP Pay',
                      'Reviews',
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className={`px-4 py-3 font-semibold uppercase border-r border-gray-300
            ${header === 'RO Name' ? 'hidden sm:table-cell' : ''}
            ${header === 'Diesel (L)' ? 'hidden xs:table-cell' : ''}
            ${header === 'Premium (L)' ? 'hidden md:table-cell' : ''}
            ${header === 'HP Pay' ? 'hidden lg:table-cell' : ''}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-300 bg-white">
                  {filteredData.map((item, index) => (
                    <tr
                      key={item.Sl}
                      className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                      <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-200">
                        {item.Sl}
                      </td>

                      {/* CSA Name + RO (mobile) */}
                      <td className="px-4 py-3 border-r border-gray-200">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-gray-900">{item['CSA Name']}</span>
                          <span className="text-gray-600 sm:hidden text-sm mt-1">
                            {item['RO Name']}
                          </span>
                        </div>
                      </td>

                      {/* RO Name */}
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200 hidden sm:table-cell">
                        {item['RO Name']}
                      </td>

                      {/* Petrol */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200">
                        {formatNumber(item['Volume of Normal Petrol sales (in litres)'])}
                      </td>

                      {/* Diesel */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden xs:table-cell">
                        {formatNumber(item['Volume of Normal Diesel sales (in litres)'])}
                      </td>

                      {/* Premium */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden md:table-cell">
                        {formatNumber(item['Volume of Premium Petrol sales (Power95) (in litres)'])}
                      </td>

                      {/* HP Pay */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200 hidden lg:table-cell">
                        {formatNumber(item['How many HP pay transactions done?'])}
                      </td>

                      {/* Reviews */}
                      <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200">
                        {item['Number of google reviews'] ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>


            {filteredData.length === 0 && (
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