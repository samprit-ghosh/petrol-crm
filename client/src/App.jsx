


import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import SalesDataForm from './SalesDataForm'

import './App.css'
import FuelStationForm from './FuelStationForm'
import Navbar from './Navbar'
import Footer from './Footer'
import Login from './Login';
import Dashboard from './OutletDetailsModal';
import ZoneOutletManagement from './Zonalrecord';
import UserManagement from './UserManagement';


function App() {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        {/* Main dashboard/page */}
        <Route path="/" element={<FuelStationForm />} />
        
        {/* Sales data form page */}
        <Route path="/sales" element={<Dashboard />} />
         <Route path="/usermanagement" element={<UserManagement />} />
        {/* Outlet details page */}
        <Route path="/login" element={<Login />} />

          <Route path="/zone" element={<ZoneOutletManagement />} />
        
        {/* Optional: Add a 404 page for undefined routes */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App