import React from 'react';

// Responsive Chart Components
const PieChart = ({ data, colors, size = 'md' }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const chartSize = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-56 h-56'
  };

  const textSize = {
    sm: { main: 'text-sm', sub: 'text-[10px]' },
    md: { main: 'text-lg', sub: 'text-xs' },
    lg: { main: 'text-xl', sub: 'text-sm' }
  };

  return (
    <div className={`relative ${chartSize[size]} mx-auto`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const x1 = 50 + 50 * Math.cos(currentAngle * Math.PI / 180);
          const y1 = 50 + 50 * Math.sin(currentAngle * Math.PI / 180);
          currentAngle += angle;
          const x2 = 50 + 50 * Math.cos(currentAngle * Math.PI / 180);
          const y2 = 50 + 50 * Math.sin(currentAngle * Math.PI / 180);

          return (
            <path
              key={item.name}
              d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`}
              fill={colors[index % colors.length]}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            />
          );
        })}
        <circle cx="50" cy="50" r={size === 'sm' ? 25 : 30} fill="white" />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className={`${textSize[size].main} font-bold text-gray-800`}>{total}</span>
        <span className={`${textSize[size].sub} text-gray-500`}>Total</span>
      </div>
    </div>
  );
};

const BarChart = ({ data, colors, height = 'md' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const chartHeight = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-72'
  };

  return (
    <div className={`w-full ${chartHeight[height]}`}>
      <div className={`flex items-end justify-between ${height === 'sm' ? 'h-32 space-x-1' : 'h-48 space-x-2'}`}>
        {data.map((item, index) => (
          <div key={item.name} className="flex flex-col items-center flex-1">
            <div className={`${height === 'sm' ? 'text-[10px]' : 'text-xs'} text-gray-500 mb-1 text-center`}>
              {item.value > 1000 ? `${(item.value/1000).toFixed(0)}K` : item.value}
            </div>
            <div
              className="w-full rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: colors[index % colors.length],
                minHeight: height === 'sm' ? '12px' : '20px'
              }}
            />
            <div className={`${height === 'sm' ? 'text-[10px]' : 'text-xs'} text-gray-600 mt-2 text-center font-medium ${height === 'sm' ? 'truncate w-full' : ''}`}>
              {height === 'sm' && item.name.length > 4 ? item.name.slice(0,3) : item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, colors, height = 'md' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (item.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  const chartHeight = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-72'
  };

  return (
    <div className={`w-full ${chartHeight[height]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Line */}
        <polyline
          fill="none"
          stroke={colors[0]}
          strokeWidth={height === 'sm' ? '1.5' : '2'}
          points={points}
          className="transition-all duration-500"
        />
        
        {/* Points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (item.value / maxValue) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={height === 'sm' ? '1.5' : '2'}
              fill={colors[0]}
              className="transition-all duration-300 hover:r-3 cursor-pointer"
            />
          );
        })}
      </svg>
    </div>
  );
};

// Responsive Dashboard Components
const StatCard = ({ title, value, change, icon, color, size = 'md' }) => {
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
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${style.padding} hover:shadow-md transition-shadow duration-300 ${size === 'sm' ? 'min-w-0' : ''}`}>
      <div className="flex items-center justify-between">
        <div className={size === 'sm' ? 'min-w-0 flex-1' : ''}>
          <p className={`${style.title} font-medium text-gray-600 ${size === 'sm' ? 'truncate' : ''}`}>{title}</p>
          <p className={`${style.value} font-bold text-gray-900 mt-1 ${size === 'sm' ? 'truncate' : ''}`}>{value}</p>
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
        </div>
        <div className={`rounded-full ${color} bg-opacity-10 ${style.iconContainer} ${size === 'sm' ? 'ml-2 flex-shrink-0' : ''}`}>
          {React.cloneElement(icon, { className: `${icon.props.className} ${style.icon}` })}
        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children, action, size = 'md' }) => {
  const sizes = {
    sm: {
      padding: 'p-4',
      title: 'text-sm',
      action: 'text-xs',
      margin: 'mb-4'
    },
    md: {
      padding: 'p-6',
      title: 'text-lg',
      action: 'text-sm',
      margin: 'mb-6'
    }
  };

  const style = sizes[size];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${style.padding} hover:shadow-md transition-shadow duration-300`}>
      <div className={`flex items-center justify-between ${style.margin}`}>
        <h3 className={`${style.title} font-semibold text-gray-900 ${size === 'sm' ? 'truncate' : ''}`}>{title}</h3>
        {action && (
          <button className={`${style.action} text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 ${size === 'sm' ? 'flex-shrink-0 ml-2' : ''}`}>
            {size === 'sm' ? 'View' : action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

// Main Responsive Graph Component
function Graph() {
  // Dummy data for charts
  const outletStatusData = [
    { name: 'Active', value: 75 },
    { name: 'Inactive', value: 15 },
    { name: 'Maintenance', value: 10 }
  ];

  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 72000 }
  ];

  const zonePerformanceData = [
    { name: 'North', value: 85 },
    { name: 'South', value: 72 },
    { name: 'East', value: 68 },
    { name: 'West', value: 79 }
  ];

  const customerGrowthData = [
    { name: 'Q1', value: 1200 },
    { name: 'Q2', value: 1800 },
    { name: 'Q3', value: 2200 },
    { name: 'Q4', value: 3100 }
  ];

  const chartColors = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6'];

  // Statistics data
  const stats = [
    {
      title: 'Total Outlets',
      value: '142',
      change: 12,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'bg-blue-100'
    },
    {
      title: 'Active Zones',
      value: '8',
      change: 5,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      color: 'bg-green-100'
    },
    {
      title: 'Monthly Revenue',
      value: '$72K',
      change: 18,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      color: 'bg-purple-100'
    },
    {
      title: 'Customer Visits',
      value: '12.4K',
      change: -2,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Outlet Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive overview of your outlet performance and metrics</p>
        </div>

        {/* Desktop View - Hidden on mobile */}
        <div className="hidden sm:block">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
                size="md"
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Outlet Status Pie Chart */}
            <ChartCard title="Outlet Status Distribution" action="View Details" size="md">
              <div className="flex flex-col md:flex-row items-center">
                <PieChart data={outletStatusData} colors={chartColors} size="md" />
                <div className="mt-4 md:mt-0 md:ml-6 space-y-3 flex-1">
                  {outletStatusData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: chartColors[index] }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            {/* Revenue Bar Chart */}
            <ChartCard title="Monthly Revenue Trends" action="View Report" size="md">
              <BarChart data={revenueData} colors={chartColors} height="md" />
            </ChartCard>
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Zone Performance */}
            <ChartCard title="Zone Performance Score" action="Compare" size="md">
              <BarChart data={zonePerformanceData} colors={chartColors} height="md" />
            </ChartCard>

            {/* Customer Growth */}
            <ChartCard title="Customer Growth Quarterly" action="Analyze" size="md">
              <LineChart data={customerGrowthData} colors={['#8B5CF6']} height="md" />
            </ChartCard>
          </div>
        </div>

        {/* Mobile View - Only shows on small screens */}
        <div className="sm:hidden">
          <div className="space-y-4">
            {/* Compact Stats for Mobile */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon}
                  color={stat.color}
                  size="sm"
                />
              ))}
            </div>

            {/* Compact Charts for Mobile */}
            <ChartCard title="Outlet Status" action="View" size="sm">
              <div className="flex flex-col items-center">
                <PieChart data={outletStatusData.map(item => 
                  ({ ...item, name: item.name.length > 4 ? item.name.slice(0,3) : item.name })
                )} colors={chartColors} size="sm" />
                <div className="mt-3 space-y-1 w-full">
                  {outletStatusData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: chartColors[index] }}
                        ></div>
                        <span className="font-medium text-gray-700 truncate">{item.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Revenue Trends" action="View" size="sm">
              <BarChart data={revenueData} colors={chartColors} height="sm" />
            </ChartCard>

            <ChartCard title="Zone Performance" action="View" size="sm">
              <BarChart data={zonePerformanceData} colors={chartColors} height="sm" />
            </ChartCard>

            <ChartCard title="Customer Growth" action="View" size="sm">
              <LineChart data={customerGrowthData} colors={['#8B5CF6']} height="sm" />
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;