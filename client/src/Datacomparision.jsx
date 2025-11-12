import React, { useState } from 'react';

// Base pre-data (single snapshot before intervention)
const preData = [
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
    "CSA Name": "kali BANLODE",
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
    "Sl": 7,
    "CSA Name": "kalu BANLODE",
    "RO Name": "HP Service Centre, kol",
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
];

// Weekly post data only (progressive improvement after intervention)
const weeklyPostData = {
  "Week 1 (Oct 1-7)": [
    {
      "Sl": 1,
      "CSA Name": "BABASAHEB KHARAT",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 0,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 450,
      "How many HP pay transactions done?": 6000,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 1,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 2,
      "CSA Name": "ABHIJIT WAHUL",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 700,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 130,
      "How many HP pay transactions done?": 3800,
      "Number of google reviews": 1,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 3,
      "CSA Name": "RAVI GAIKWAD",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 900,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1600,
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
      "Volume of Normal Petrol sales (in litres)": 1500,
      "Volume of Normal Diesel sales (in litres)": 2500,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 36500,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 5,
      "CSA Name": "SWAPNIL BANLODE",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 450,
      "Volume of Normal Diesel sales (in litres)": 1100,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1300,
      "Number of google reviews": 0,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    }
  ],
  "Week 2 (Oct 8-14)": [
    {
      "Sl": 1,
      "CSA Name": "BABASAHEB KHARAT",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 0,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 480,
      "How many HP pay transactions done?": 6200,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 1,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 2,
      "CSA Name": "ABHIJIT WAHUL",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 750,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 140,
      "How many HP pay transactions done?": 4000,
      "Number of google reviews": 1,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 3,
      "CSA Name": "RAVI GAIKWAD",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 950,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1700,
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
      "Volume of Normal Petrol sales (in litres)": 1600,
      "Volume of Normal Diesel sales (in litres)": 2600,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 37000,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 5,
      "CSA Name": "SWAPNIL BANLODE",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 480,
      "Volume of Normal Diesel sales (in litres)": 1150,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1400,
      "Number of google reviews": 0,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    }
  ],
  "Week 3 (Oct 15-21)": [
    {
      "Sl": 1,
      "CSA Name": "BABASAHEB KHARAT",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 0,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 500,
      "How many HP pay transactions done?": 6400,
      "Number of google reviews": 3,
      "Number of new customers onboarded": 1,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 2,
      "CSA Name": "ABHIJIT WAHUL",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 800,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 150,
      "How many HP pay transactions done?": 4200,
      "Number of google reviews": 1,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 3,
      "CSA Name": "RAVI GAIKWAD",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 1000,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1800,
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
      "Volume of Normal Petrol sales (in litres)": 1700,
      "Volume of Normal Diesel sales (in litres)": 2700,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 37500,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 5,
      "CSA Name": "SWAPNIL BANLODE",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 500,
      "Volume of Normal Diesel sales (in litres)": 1200,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1500,
      "Number of google reviews": 0,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    }
  ],
  "Week 4 (Oct 22-28)": [
    {
      "Sl": 1,
      "CSA Name": "BABASAHEB KHARAT",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 0,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 520,
      "How many HP pay transactions done?": 6600,
      "Number of google reviews": 3,
      "Number of new customers onboarded": 1,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 2,
      "CSA Name": "ABHIJIT WAHUL",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 850,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 160,
      "How many HP pay transactions done?": 4400,
      "Number of google reviews": 1,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 3,
      "CSA Name": "RAVI GAIKWAD",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 1050,
      "Volume of Normal Diesel sales (in litres)": 0,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1900,
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
      "Volume of Normal Petrol sales (in litres)": 1800,
      "Volume of Normal Diesel sales (in litres)": 2800,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 38000,
      "Number of google reviews": 2,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    },
    {
      "Sl": 5,
      "CSA Name": "SWAPNIL BANLODE",
      "RO Name": "HP Service Centre, Harsul",
      "Volume of Normal Petrol sales (in litres)": 520,
      "Volume of Normal Diesel sales (in litres)": 1250,
      "Volume of Premium Petrol sales (Power95) (in litres)": 0,
      "How many HP pay transactions done?": 1600,
      "Number of google reviews": 0,
      "Number of new customers onboarded": 0,
      "Number of complaints resolved": 0,
      "Quantity of Lube sales": 0,
      "Quantity of Additive sales": 0
    }
  ],
};

// Available metrics
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

// Safe percentage calculation function
const calculatePercentageChange = (preValue, postValue) => {
  if (preValue === 0 && postValue === 0) return 0;
  if (preValue === 0) return 100; // If starting from 0, any positive value is 100% improvement
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

// CSA-RO Relationship Table Component
const CSARelationshipTable = ({ preData }) => {
  // Group CSAs by RO Name
  const groupCSAsByRO = (data) => {
    const grouped = {};
    
    data.forEach(csa => {
      const roName = csa["RO Name"];
      if (!grouped[roName]) {
        grouped[roName] = [];
      }
      
      // Avoid duplicates
      if (!grouped[roName].find(item => item["CSA Name"] === csa["CSA Name"])) {
        grouped[roName].push(csa);
      }
    });
    
    return grouped;
  };

  const roGroups = groupCSAsByRO(preData);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
          CSA - RO Relationship Mapping
        </h3>
        <div className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded-lg">
          Total ROs: {Object.keys(roGroups).length}
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
                      Employee ID
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
                      key={csa.Sl} 
                      className={csaIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-sm font-bold">
                              {csa["CSA Name"].charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {csa["CSA Name"]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">#{csa.Sl}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa["Volume of Normal Petrol sales (in litres)"]} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa["Volume of Normal Diesel sales (in litres)"]} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa["Volume of Premium Petrol sales (Power95) (in litres)"]} L
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {csa["How many HP pay transactions done?"].toLocaleString()}
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
                    {csas.reduce((sum, csa) => sum + (csa["Volume of Normal Petrol sales (in litres)"] || 0), 0)} L
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total Diesel:</span>
                  <span className="font-semibold text-gray-800">
                    {csas.reduce((sum, csa) => sum + (csa["Volume of Normal Diesel sales (in litres)"] || 0), 0)} L
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total HP Pay:</span>
                  <span className="font-semibold text-gray-800">
                    {csas.reduce((sum, csa) => sum + (csa["How many HP pay transactions done?"] || 0), 0).toLocaleString()}
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
            <div className="text-2xl font-bold text-green-600">{preData.length}</div>
            <div className="text-sm text-gray-600">Total CSAs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {preData.reduce((sum, csa) => sum + (csa["Volume of Normal Petrol sales (in litres)"] || 0), 0)} L
            </div>
            <div className="text-sm text-gray-600">Total Petrol Sales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {preData.reduce((sum, csa) => sum + (csa["How many HP pay transactions done?"] || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total HP Pay Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact CSA-RO View for smaller displays
const CompactCSARelationshipView = ({ preData }) => {
  const roGroups = preData.reduce((acc, csa) => {
    const roName = csa["RO Name"];
    if (!acc[roName]) acc[roName] = [];
    if (!acc[roName].find(item => item["CSA Name"] === csa["CSA Name"])) {
      acc[roName].push(csa);
    }
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 tracking-wide mb-6">
        CSA - RO Relationship
      </h3>

      <div className="space-y-4">
        {Object.entries(roGroups).map(([roName, csas]) => (
          <div key={roName} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800 text-sm">{roName}</h4>
              <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                {csas.length} CSA{csas.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {csas.map(csa => (
                <div 
                  key={csa.Sl}
                  className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center space-x-2"
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">
                      {csa["CSA Name"].charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {csa["CSA Name"].split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Single Row Petrol Sales Comparison
const PetrolSalesComparisonRow = ({ preData, postData, selectedWeek }) => {
  const salesData = [
    { name: "BABASAHEB", pre: 1500, post: 1590, change: "+6.0%" },
    { name: "ABHIJIT", pre: 1125, post: 1242, change: "+10.4%" },
    { name: "RAVI", pre: 739, post: 819, change: "+10.8%" },
    { name: "GATKHANE", pre: 375, post: 390, change: "+4.0%" },
    { name: "SWAPNIL", pre: 0, post: 0, change: "+8.7%" },
    { name: "KALI", pre: 0, post: 0, change: "+100.0%" },
    { name: "KALU", pre: 0, post: 0, change: "+100.0%" }
  ];

  const netChanges = [216, 236, 358, 106, 106, 114];

};

// Enhanced Post Data Trend Sparklines with modified tooltip
const PostTrendSparklines = ({ preData, weeklyPostData, selectedMetric }) => {
  const postWeeks = Object.keys(weeklyPostData);
  
  return (
<div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
    Post-Intervention Weekly Trends
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {preData.map((preItem, csaIndex) => {
      const preValue = preItem[selectedMetric] || 0;
      const postWeeklyValues = postWeeks.map((week) => {
        const weekData = weeklyPostData[week].find(
          (item) => item["CSA Name"] === preItem["CSA Name"]
        );
        return weekData ? weekData[selectedMetric] || 0 : 0;
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
              <div className="font-semibold mb-1">{preItem["CSA Name"]}</div>
              <div>Baseline: <strong>{preValue}</strong></div>
              <div>Week {postWeeks.length}: <strong>{currentWeekValue}</strong></div>
              <div className={isPositive ? "text-green-400" : "text-red-400"}>
                Change: {percentageChange >= 0 ? "+" : ""}
                {percentageChange.toFixed(1)}%
              </div>
              <div>
                Net: {currentWeekValue - preValue >= 0 ? "+" : ""}
                {currentWeekValue - preValue}
              </div>
            </div>
          }
        >
          <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5">
            {/* CSA Info */}
            <div className="flex flex-col w-1/3">
              <span className="text-sm font-semibold text-gray-800 truncate">
                {preItem["CSA Name"]}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {preItem["RO Name"]}
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
                Base W1 W2 W3 W4
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
    Post-Intervention Timeline (Baseline → Weekly Progress)
  </div>
</div>

  );
};

// Weekly Post Progress Chart - Shows only post-intervention weekly progress
const WeeklyPostProgressChart = ({ preData, weeklyPostData, selectedMetric, selectedCSA, onCSASelect }) => {
  const postWeeks = Object.keys(weeklyPostData);
  
  const csaPreData = preData.find(item => item["CSA Name"] === selectedCSA);
  if (!csaPreData) return null;

  const preValue = csaPreData[selectedMetric] || 0;

  // Get weekly values for post-intervention period only
  const postWeeklyValues = postWeeks.map(week => {
    const weekData = weeklyPostData[week].find(item => item["CSA Name"] === selectedCSA);
    return weekData ? weekData[selectedMetric] || 0 : 0;
  });

  const allValues = [preValue, ...postWeeklyValues];
  const maxValue = Math.max(...allValues) || 1;
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
          Weekly Post-Intervention Progress
        </h3>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">CSA:</span>
          <select
            value={selectedCSA}
            onChange={(e) => onCSASelect(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {preData.map((csa) => (
              <option key={csa.Sl} value={csa["CSA Name"]}>
                {csa["CSA Name"]}
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
                <div className="text-xs text-gray-600 mb-2">W{index + 1}</div>
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
        Post-Intervention Timeline (Weeks)
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center shadow-sm border border-blue-100">
          <div className="text-sm text-blue-600 font-medium">Baseline</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{preValue}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center shadow-sm border border-green-100">
          <div className="text-sm text-green-600 font-medium">Current Week</div>
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

// Enhanced Comparison Bar Chart
const ComparisonBarChart = ({ title, preData, postData, dataKey, selectedWeek }) => {
  const allValues = [...preData.map(item => item[dataKey] || 0), ...postData.map(item => item[dataKey] || 0)];
  const maxValue = Math.max(...allValues, 10);
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <div className="text-sm text-gray-600 mb-6">{selectedWeek}</div>
      
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
          {preData.map((preItem, index) => {
            const postItem = postData[index];
            const preValue = preItem[dataKey] || 0;
            const postValue = postItem ? postItem[dataKey] || 0 : 0;
            const preHeight = (preValue / maxValue) * chartHeight;
            const postHeight = (postValue / maxValue) * chartHeight;
            const percentageChange = calculatePercentageChange(preValue, postValue);

            return (
              <div key={index} className="flex flex-col items-center space-y-4 min-w-[80px]">
                <div className="flex items-end space-x-2">
                  {/* Pre Bar */}
                  <Tooltip content={`${preItem["CSA Name"]} - Pre: ${preValue}`}>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${preHeight}px`, minHeight: '2px' }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-1">Pre</span>
                    </div>
                  </Tooltip>
                  
                  {/* Post Bar */}
                  <Tooltip content={`${preItem["CSA Name"]} - Post: ${postValue}`}>
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
                    {preItem["CSA Name"].split(" ")[0]}
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
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [selectedWeek, setSelectedWeek] = useState(Object.keys(weeklyPostData)[0]);
  const [selectedCSA, setSelectedCSA] = useState(preData[0]["CSA Name"]);
  const [showCSATable, setShowCSATable] = useState(false);

  const postWeeks = Object.keys(weeklyPostData);
  const currentPostData = weeklyPostData[selectedWeek];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-8">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Post-Intervention Weekly Progress Dashboard
          </h1>
          <p className="text-gray-600">
            Tracking weekly performance improvements after intervention
          </p>
        </div>

        {/* Toggle for CSA-RO Table */}
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

        {/* CSA-RO Relationship Table */}
        {showCSATable && (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block">
              <CSARelationshipTable preData={preData} />
            </div>
            {/* Mobile View */}
            <div className="block lg:hidden">
              <CompactCSARelationshipView preData={preData} />
            </div>
          </>
        )}

        {/* Petrol Sales Comparison Row */}
        <PetrolSalesComparisonRow 
          preData={preData}
          postData={currentPostData}
          selectedWeek={selectedWeek}
        />

        {/* Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Week Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Week
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
          </div>
        </div>

        {/* Charts Grid */}
        <div className="space-y-6">
          {/* Weekly Post Progress */}
          <WeeklyPostProgressChart
            preData={preData}
            weeklyPostData={weeklyPostData}
            selectedMetric={selectedMetric}
            selectedCSA={selectedCSA}
            onCSASelect={setSelectedCSA}
          />

          {/* Comparison and Trends */}
          <div className="flex flex-col gap-6">
            <ComparisonBarChart
              title={`${getMetricDisplayName(selectedMetric)} - Weekly Comparison`}
              preData={preData}
              postData={currentPostData}
              dataKey={selectedMetric}
              selectedWeek={selectedWeek}
            />
            <PostTrendSparklines
              preData={preData}
              weeklyPostData={weeklyPostData}
              selectedMetric={selectedMetric}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Tracking post-intervention progress from {postWeeks[0]} to {postWeeks[postWeeks.length - 1]}
        </div>
      </div>
    </div>
  );
}