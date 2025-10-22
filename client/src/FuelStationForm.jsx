import React, { useState } from "react";
import { Fuel, Building, Activity, Users, Upload, FileSpreadsheet } from "lucide-react";
import SingleEntryForm from "./SingleEntryForm";
import BulkEntryForm from "./BulkEntryForm";
import CsvUploadForm from "./CsvUploadForm";

const FuelStationForm = () => {
  const [mode, setMode] = useState("single");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 lg:p-10">
      <div className="w-full p-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap">
            {/* Left side */}
    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left">
  {/* Icon container - centered on mobile, to the left on desktop */}
  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-md mb-4 md:mb-0 md:mr-6">
    <Fuel className="w-8 h-8 md:w-8 md:h-8 text-white" />
  </div>

  {/* Text content */}
  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ashish Patel</h1>
    
    {/* Building info - icon above on mobile, inline on desktop */}
    <div className="flex flex-col items-center mt-1 md:flex-row md:items-center text-gray-600">
      <div className="mb-1 md:mb-0 md:mr-2 flex justify-center">
        <Building className="w-5 h-5 md:w-4 md:h-4 text-blue-600" />
      </div>
      <span className="text-sm md:text-base text-center md:text-left">
        Retail Outlet: South Nagpur ABCD Petrol Pump
      </span>
    </div>
  </div>
</div>

            {/* Active session badge */}
            <div className="w-full flex justify-center md:justify-end mt-4">
              <div className="flex items-center px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-md
                  md:absolute md:top-20 md:right-14 z-50">
                <Activity className="w-4 h-4 mr-2" />
                <span className="font-semibold">Data Entry Session Active</span>
              </div>
            </div>


          </div>

          {/* Mode Selection */}


          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <ModeButton
              label="Single Day"
              icon={<Fuel className="w-4 h-4 mr-2" />}
              active={mode === "single"}
              onClick={() => setMode("single")}
              gradient="from-blue-600 to-indigo-600"
            />
            <ModeButton
              label="Bulk Entry"
              icon={<Users className="w-4 h-4 mr-2" />}
              active={mode === "bulk"}
              onClick={() => setMode("bulk")}
              gradient="from-emerald-500 to-teal-600"
            />
            <ModeButton
              label="CSV Upload"
              icon={<Upload className="w-4 h-4 mr-2" />}
              active={mode === "csv"}
              onClick={() => setMode("csv")}
              gradient="from-purple-500 to-fuchsia-600"
            />
          </div>

        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {mode === "single" && <SingleEntryForm />}
            {mode === "bulk" && <BulkEntryForm />}
            {mode === "csv" && <CsvUploadForm />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuickStats mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mode Button Component
const ModeButton = ({ label, icon, active, onClick, gradient }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${active
      ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105`
      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
  >
    {icon}
    {label}
  </button>
);

// Quick Stats Component
const QuickStats = ({ mode }) => {
  const stats = {
    single: { customers: 3, sales: "45,670" },
    bulk: { customers: 15, sales: "1,25,430" },
    csv: { customers: 0, sales: "0" },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-blue-600" />
        Quick Stats
      </h3>

      {/* Stats Cards */}
      <div className="space-y-4">
        <StatCard
          title={
            mode === "bulk"
              ? "Total Customers"
              : mode === "csv"
                ? "CSV Records"
                : "Today's Customers"
          }
          value={stats[mode].customers}
          icon={<Users className="w-5 h-5 text-blue-600" />}
          gradient="from-blue-100 to-blue-50"
        />
        <StatCard
          title="Total Sales"
          value={`₹${stats[mode].sales}`}
          icon={<FileSpreadsheet className="w-5 h-5 text-green-600" />}
          gradient="from-green-100 to-emerald-50"
        />
        <StatCard
          title="Active Session"
          value="4h 23m"
          icon={<Activity className="w-5 h-5 text-purple-600" />}
          gradient="from-purple-100 to-pink-50"
        />
      </div>

      {/* Recent Activities */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Recent Activities
        </h4>
        <div className="space-y-3">
          <ActivityItem
            color="green"
            text={
              mode === "bulk"
                ? "Bulk Mode Active"
                : mode === "csv"
                  ? "CSV Upload Ready"
                  : "Single Day Mode"
            }
          />
          <ActivityItem
            color="blue"
            text={
              mode === "bulk"
                ? "Multiple days loaded"
                : mode === "csv"
                  ? "Ready for file upload"
                  : "Multiple customers today"
            }
          />
        </div>
      </div>
    </div>
  );
};

// Reusable stat card
const StatCard = ({ title, value, icon, gradient }) => (
  <div
    className={`p-4 rounded-xl border shadow-sm bg-gradient-to-br ${gradient} hover:shadow-md transition-all`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-white/70 rounded-lg mr-3 shadow-sm">{icon}</div>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
  </div>
);

// Reusable activity item
const ActivityItem = ({ color, text }) => (
  <div className="flex items-center text-sm text-gray-600">
    <div className={`w-2 h-2 bg-${color}-500 rounded-full mr-3`}></div>
    {text}
  </div>
);

export default FuelStationForm;
