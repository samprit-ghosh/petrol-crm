import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import FuelStationForm from './FuelStationForm';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Dashboard from './OutletDetailsModal';
import ZoneOutletManagement from './Zonalrecord';
import UserManagement from './UserManagement';
import FuelSalesDashboard from "./FuelSalesDashboard";
import Datacomparision from "./Datacomparision"

function Loader() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Option 1: Modern Spinner with Gradient */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-purple-200"></div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-purple-600 border-r-blue-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
      </div>

 

      <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent tracking-wide">
        Please Wait Some Time...
      </p>
      <p className="text-sm text-gray-500 animate-pulse">
        Please wait while we verify your credentials
      </p>
    </div>
  );
}

function PrivateRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const timer = setTimeout(() => setChecking(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (checking) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/reports" element={
          <PrivateRoute>
            <FuelSalesDashboard/>
          </PrivateRoute>
        } />

       <Route path="/sales" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />


       <Route path="/comparision" element={
          <PrivateRoute>
            <Datacomparision/>
          </PrivateRoute>
        } />
        <Route path="/" element={
          <PrivateRoute>
            <FuelStationForm />
          </PrivateRoute>
        } />


        <Route path="/usermanagement" element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        } />

        <Route path="/zone" element={
          <PrivateRoute>
            <ZoneOutletManagement />
          </PrivateRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
