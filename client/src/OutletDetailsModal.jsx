import React, { useEffect } from 'react';

import UserManagement from './UserManagement';
import CompactZoneView from './CompactZoneView';
import Grapgh from './grapgh';
import { fetchZonesData, clearError } from './store/zonesSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, createUser, updateUser, deleteUser } from './store/usersSlice';
const Dashboard = () => {
  // Get user data from Redux store
  const dispatch = useDispatch();
  const { user, isAuthenticated, token, } = useSelector((state) => state.auth);
  const { users: reduxUsers} = useSelector((state) => state.users);
  const { zones: zonesData, loading, error } = useSelector((state) => state.zones);
 const totalUsers = reduxUsers?.length || 0;




 useEffect(() => {
    dispatch(fetchAllUsers());
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



  // Mock data for UI demonstration (fallback if no user data)
  const currentUser = user || {
    name: 'Admin User',
    role: 'admin',
    email: 'admin@company.com'
  };

  const stats = {
    totalUsers: 47,
    activeUsers: 42,
    dataOutletUsers: 25,
    reportUsers: 12,
    dataReportUsers: 8,
    adminUsers: 2
  };

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'created new entry', time: '2 hours ago', type: 'data_entry' },
    { id: 2, user: 'Jane Smith', action: 'viewed zone report', time: '4 hours ago', type: 'report_view' },
    { id: 3, user: 'Admin User', action: 'updated user permissions', time: '1 day ago', type: 'user_management' },
    { id: 4, user: 'Mike Johnson', action: 'edited outlet data', time: '1 day ago', type: 'data_edit' },
    { id: 5, user: 'Sarah Wilson', action: 'generated overall report', time: '2 days ago', type: 'report_generate' }
  ];

  const quickActions = [
    { label: 'Zonal Management', icon: '👥', description: 'Manage all system users', path: '/zone' },
    { label: 'User Management', icon: '💾', description: 'Handle outlet data entries', path: '/usermanagement' },
    { label: 'System Reports', icon: '📈', description: 'View analytics and reports', path: '/comparision' },
  ];


  const getActivityIcon = (type) => {
    const icons = {
      data_entry: '📝',
      report_view: '📊',
      user_management: '👥',
      data_edit: '✏️',
      report_generate: '📈'
    };
    return icons[type] || '🔔';
  };

  const navigate = useNavigate();


  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 py-3">

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
              Admin Dashboard 
            </h1>

            {/* Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3 justify-center sm:justify-end">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                {currentUser.name ? currentUser.name.charAt(0) : 'A'}
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  {currentUser.name || 'Admin User'}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 capitalize">
                  {currentUser.role || 'admin'}
                </span>
                {user && (
                  <span className="text-[10px] text-green-600">
                    ✅ Authenticated
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto px-5 sm:px-6 lg:px-10 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {currentUser.name || 'Admin User'}! 👋 
                {user && <span className="text-green-300 ml-2">(Logged In)</span>}
              </h2>
              <p className="text-blue-100 text-lg">
                {user ? `Logged in as ${user.email}` : "Here's what's happening with your system today."}
              </p>
            </div>
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold">{totalUsers}</div>
                <div className="text-blue-200 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{totalOutlets}</div>
                <div className="text-blue-200 text-sm">Outlets</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-600">Frequently used features</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer hover:border-blue-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Grapgh />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-600">Latest system actions</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CompactZoneView />
        </div>

        <UserManagement />

        {/* Role Permissions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Role Permissions</h3>
            <p className="text-sm text-gray-600">What each role can access</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Data Outlet Role */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">🏪 Data Outlet</h4>
                  <span className="text-sm text-gray-600">{stats.dataOutletUsers} users</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Enter/edit data for assigned outlet
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View own outlet data
                  </li>
                </ul>
              </div>

              {/* Report Viewer Role */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">📊 Report Viewer</h4>
                  <span className="text-sm text-gray-600">{stats.reportUsers} users</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View outlet reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View zone reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View overall reports
                  </li>
                </ul>
              </div>

              {/* Data & Report Role */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">💾 Data & Report</h4>
                  <span className="text-sm text-gray-600">{stats.dataReportUsers} users</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Enter/edit data for any outlet
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    View all report levels
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Access data management
                  </li>
                </ul>
              </div>

              {/* Administrator Role */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">👑 Administrator</h4>
                  <span className="text-sm text-gray-600">{stats.adminUsers} users</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    All Data & Report permissions
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Manage all users
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Activate/deactivate users
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Change user roles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;