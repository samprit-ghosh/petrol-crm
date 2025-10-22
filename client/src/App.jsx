


import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import SalesDataForm from './SalesDataForm'
// import OutletDetailsModal from './OutletDetailsModal'
import './App.css'
import FuelStationForm from './FuelStationForm'

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Main dashboard/page */}
        <Route path="/" element={<FuelStationForm />} />
        
        {/* Sales data form page */}
        {/* <Route path="/sales" element={<SalesDataForm />} /> */}
        
        {/* Outlet details page */}
        {/* <Route path="/outlet/:id" element={<OutletDetailsModal />} /> */}
        
        {/* Optional: Add a 404 page for undefined routes */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App