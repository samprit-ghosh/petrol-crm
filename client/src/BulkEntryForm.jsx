import React, { useState, useRef, useEffect } from 'react';
import {
  CalendarRange,
  Layers,
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  User,
  Fuel,
  Zap,
  Settings,
  Package,
  Send,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Menu,
  X
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';

const BulkEntryForm = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [bulkEntries, setBulkEntries] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCustomerPage, setCurrentCustomerPage] = useState(0);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '', visible: false });
  const [dateError, setDateError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Refs for detecting outside clicks
  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
        setShowStartCalendar(false);
      }
      if (endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
        setShowEndCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text, visible: true });
    setTimeout(() => setMessage({ type: '', text: '', visible: false }), 3000);
  };

  // Validate date range
  const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setDateError('End date cannot be before start date');
      return false;
    }

    setDateError('');
    return true;
  };

  // Generate dates for the selected range
  const getDateRangeArray = () => {
    if (!dateRange.startDate || !dateRange.endDate) return [];

    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);

    if (end < start) {
      setDateError('End date cannot be before start date');
      return [];
    }

    const dates = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date).toISOString().split('T')[0]);
    }

    return dates;
  };

  // Initialize bulk entries for date range with multiple entries per day
  const initializeBulkEntries = () => {
    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) {
      showMessage('warning', '⚠️ Please fix the date range before proceeding!');
      return;
    }

    const dates = getDateRangeArray();

    if (dates.length === 0) {
      showMessage('warning', '⚠️ Please select a valid date range!');
      return;
    }

    const newBulkEntries = {};

    dates.forEach(date => {
      newBulkEntries[date] = [
        {
          id: 1,
          timestamp: new Date(date).toISOString(),
          standardPetrol: { volume: '', amount: '', paymentMethod: '', customerType: '' },
          standardDiesel: { volume: '', amount: '', paymentMethod: '', customerType: '' },
          premiumProducts: { productType: '', volume: '', amount: '', paymentMethod: '', customerType: '' },
          lube: { quantity: '', amount: '', paymentMethod: '', customerType: '' },
          additives: { quantity: '', amount: '', paymentMethod: '', customerType: '' }
        }
      ];
    });

    setBulkEntries(newBulkEntries);
    setCurrentPage(0);
    setCurrentCustomerPage(0);
    showMessage('success', `✅ Initialized ${dates.length} days for bulk entry!`);
  };

  const handleDateRangeChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);

    if (field === 'startDate') {
      setShowStartCalendar(false);
      if (newDateRange.endDate && new Date(newDateRange.endDate) < new Date(value)) {
        setDateRange(prev => ({ ...prev, endDate: '' }));
        setDateError('End date cleared as it was before start date');
      }
    }
    if (field === 'endDate') setShowEndCalendar(false);

    if (newDateRange.startDate && newDateRange.endDate) {
      validateDateRange(newDateRange.startDate, newDateRange.endDate);
    }
  };

  // Mobile-optimized calendar component
  const renderCalendar = (selectedDate, onChange, showCalendar, setShowCalendar, calendarRef, isEndDate = false) => {
    if (!showCalendar) return null;

    const dateValue = selectedDate ? new Date(selectedDate) : new Date();
    const minDate = isEndDate && dateRange.startDate ? new Date(dateRange.startDate) : undefined;

    return (
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={calendarRef}
            className={`fixed md:absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-full md:left-1/2 md:transform md:-translate-x-1/2 mt-3 z-50 bg-white border border-blue-200 rounded-2xl shadow-2xl p-2 ${
              isMobile ? 'w-11/12 max-w-sm' : ''
            }`}
          >
            <Calendar
              onChange={(date) => {
                const formattedDate = date.toISOString().split('T')[0];
                onChange(formattedDate);
                setShowCalendar(false);
              }}
              value={dateValue}
              minDate={minDate}
              className={`rounded-xl ${isMobile ? 'text-sm' : ''}`}
              tileClassName={({ date, view }) => {
                const baseClass = view === 'month' && selectedDate && date.toDateString() === dateValue.toDateString()
                  ? 'bg-blue-500 text-white rounded-lg'
                  : '';

                if (isEndDate && minDate && date < minDate) {
                  return 'text-gray-300 cursor-not-allowed';
                }

                return baseClass;
              }}
              tileDisabled={({ date, view }) => {
                if (view !== 'month') return false;
                return isEndDate && minDate && date < minDate;
              }}
              prevLabel={<ChevronLeft className="w-4 h-4" />}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              prev2Label={null}
              next2Label={null}
            />

            {isEndDate && minDate && (
              <div className="text-xs text-gray-500 text-center mt-2 p-2 bg-blue-50 rounded-lg">
                ⚡ Select date from {minDate.toLocaleDateString()} or after
              </div>
            )}

            {isMobile && (
              <button
                onClick={() => setShowCalendar(false)}
                className="w-full mt-3 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
              >
                Close
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Bulk Entry Handlers
  const addBulkDayEntry = (date) => {
    const dayEntries = bulkEntries[date] || [];
    const newEntry = {
      id: dayEntries.length + 1,
      timestamp: new Date(date).toISOString(),
      standardPetrol: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      standardDiesel: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      premiumProducts: { productType: '', volume: '', amount: '', paymentMethod: '', customerType: '' },
      lube: { quantity: '', amount: '', paymentMethod: '', customerType: '' },
      additives: { quantity: '', amount: '', paymentMethod: '', customerType: '' }
    };

    setBulkEntries(prev => ({
      ...prev,
      [date]: [...dayEntries, newEntry]
    }));

    setCurrentCustomerPage(dayEntries.length);
    showMessage('success', '✅ New customer entry added successfully!');
  };

  const removeBulkDayEntry = (date, entryId) => {
    const dayEntries = bulkEntries[date] || [];
    if (dayEntries.length > 1) {
      const updatedEntries = dayEntries.filter(entry => entry.id !== entryId);
      setBulkEntries(prev => ({
        ...prev,
        [date]: updatedEntries
      }));

      if (currentCustomerPage >= updatedEntries.length) {
        setCurrentCustomerPage(Math.max(0, updatedEntries.length - 1));
      }
      showMessage('success', '🗑️ Customer entry deleted successfully!');
    }
  };

  const handleBulkInputChange = (date, entryId, section, field, value) => {
    if (['volume', 'quantity', 'amount'].includes(field) && value < 0) {
      showMessage('warning', '⚠️ Only positive numbers are allowed!');
      return;
    }

    setBulkEntries(prev => ({
      ...prev,
      [date]: prev[date].map(entry =>
        entry.id === entryId
          ? {
            ...entry,
            [section]: {
              ...entry[section],
              [field]: value
            }
          }
          : entry
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDateRange(dateRange.startDate, dateRange.endDate)) {
      showMessage('warning', '⚠️ Please fix the date range before submitting!');
      return;
    }

    const hasEmpty = Object.values(bulkEntries).some(dayEntries =>
      dayEntries.some(entry =>
        Object.values(entry).some(section =>
          typeof section === 'object' && section !== null &&
          Object.values(section).some(value => value === '')
        )
      )
    );

    if (hasEmpty) {
      showMessage('warning', '⚠️ Please fill all required fields before submitting!');
      return;
    }

    console.log('Bulk entries submitted:', bulkEntries);
    showMessage('success', '✅ Bulk entries submitted successfully!');
    
    setTimeout(() => {
      setDateRange({ startDate: '', endDate: '' });
      setBulkEntries({});
      setCurrentPage(0);
      setCurrentCustomerPage(0);
      setDateError('');
    }, 2000);
  };

  const dates = getDateRangeArray();
  const totalPages = dates.length;
  const currentDate = dates[currentPage];
  const dayEntries = bulkEntries[currentDate] || [];
  const currentCustomer = dayEntries[currentCustomerPage];
  const totalCustomers = dayEntries.length;

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      validateDateRange(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange.startDate, dateRange.endDate]);

  // Mobile Navigation Component
  const MobileNavButtons = () => (
    <div className="flex flex-col space-y-3 md:hidden">
      <button
        type="button"
        onClick={() => {
          setCurrentPage(prev => Math.max(0, prev - 1));
          setCurrentCustomerPage(0);
        }}
        disabled={currentPage === 0}
        className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Previous Day
      </button>

      <button
        type="button"
        onClick={() => {
          setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
          setCurrentCustomerPage(0);
        }}
        disabled={currentPage === totalPages - 1}
        className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next Day
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  if (dates.length === 0) {
    return (
      <div className="space-y-4 md:space-y-6 p-2 md:p-0">
        {/* Toast Message */}
        {message.visible && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-lg text-white text-sm md:text-lg font-medium z-50 transition-all duration-500 ${
              message.type === 'success' ? 'bg-green-600' : 'bg-yellow-500'
            } animate-fadeInDown max-w-[90vw]`}
          >
            <div className="flex items-center space-x-2">
              {message.type === 'success' ? (
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
              )}
              <span className="text-xs md:text-base">{message.text}</span>
            </div>
          </div>
        )}

        {/* Date Range Selection */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-4 md:p-8">
          <div className="flex items-center mb-4 md:mb-6">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mr-3 md:mr-4 border border-blue-200">
              <CalendarRange className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                Select Date Range
              </h3>
              <p className="text-gray-600 text-sm md:text-base">Choose the period for bulk data entry</p>
            </div>
          </div>

          {/* Date Error Message */}
          {dateError && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center">
              <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2 md:mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium text-sm md:text-base">{dateError}</p>
                <p className="text-red-600 text-xs md:text-sm mt-1">
                  Please select an end date that comes after the start date.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3">
                Start Date *
              </label>
              <div className="relative" ref={startCalendarRef}>
                <div
                  className={`bg-white border-2 rounded-2xl p-3 md:p-4 cursor-pointer transition-colors ${
                    dateError ? 'border-red-300' : 'border-gray-300 hover:border-blue-500'
                  }`}
                  onClick={() => setShowStartCalendar(true)}
                >
                  <input
                    type="text"
                    value={dateRange.startDate}
                    readOnly
                    className="w-full bg-transparent border-none focus:outline-none text-base md:text-lg font-semibold text-gray-800 cursor-pointer text-center"
                    placeholder="Click to select date"
                  />
                  <CalendarIcon className={`absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 ${
                    dateError ? 'text-red-500' : 'text-gray-500'
                  }`} />
                </div>
                {renderCalendar(
                  dateRange.startDate,
                  (date) => handleDateRangeChange('startDate', date),
                  showStartCalendar,
                  setShowStartCalendar,
                  startCalendarRef,
                  false
                )}
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3">
                End Date *
              </label>
              <div className="relative" ref={endCalendarRef}>
                <div
                  className={`bg-white border-2 rounded-2xl p-3 md:p-4 cursor-pointer transition-colors ${
                    !dateRange.startDate || dateError ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-blue-500'
                  }`}
                  onClick={() => dateRange.startDate && setShowEndCalendar(true)}
                >
                  <input
                    type="text"
                    value={dateRange.endDate}
                    readOnly
                    className={`w-full bg-transparent border-none focus:outline-none text-base md:text-lg font-semibold text-center ${
                      !dateRange.startDate ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800 cursor-pointer'
                    }`}
                    placeholder={!dateRange.startDate ? "Select start date first" : "Click to select date"}
                  />
                  <CalendarIcon className={`absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 ${
                    !dateRange.startDate || dateError ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                {dateRange.startDate && renderCalendar(
                  dateRange.endDate,
                  (date) => handleDateRangeChange('endDate', date),
                  showEndCalendar,
                  setShowEndCalendar,
                  endCalendarRef,
                  true
                )}
              </div>
            </div>
          </div>

          {!dateRange.startDate && (
            <div className="text-xs text-gray-500 mt-2 text-center p-2 bg-gray-100 rounded-lg">
              🔒 Please select start date first
            </div>
          )}
        </div>

        {/* Empty State */}
        <div className="text-center py-8 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border-2 border-dashed border-gray-300">
          <CalendarRange className="w-16 h-16 md:w-24 md:h-24 text-gray-400 mx-auto mb-4 md:mb-6" />
          <h3 className="text-xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
            {dateError ? 'Date Range Issue' : 'Ready for Bulk Entry'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4 md:mb-8 text-sm md:text-lg px-4">
            {dateError
              ? 'Please select a valid date range where the end date comes after the start date.'
              : 'Select a date range above to start entering data for multiple days at once.'
            }
          </p>
          <div className="text-xs md:text-sm text-gray-500">
            {dateError ? '🔄 Fix dates • 📅 Valid range • ✅ Proceed' : '📅 Select dates • 👥 Multiple customers • ⚡ Quick entry'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative p-2 md:p-0">
      {/* Toast Message */}
{message.visible && (
  <div
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium z-50 transition-all duration-500 ${
      message.type === 'success' ? 'bg-green-600' : 'bg-yellow-500'
    } animate-fadeInDown w-[95vw] max-w-[95vw] md:w-auto md:max-w-md`}
  >
    <div className="flex items-center justify-center">
      <span className="text-sm md:text-base text-center whitespace-nowrap overflow-hidden text-ellipsis">
        {message.text}
      </span>
    </div>
  </div>
)}

      {/* Date Range Selection */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-4 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mr-3 md:mr-4 border border-blue-200">
              <CalendarRange className="w-5 h-5 md:w-7 md:h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                Selected Date Range
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{dates.length} days selected</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-500">Current Page</div>
              <div className="text-base md:text-lg font-bold text-blue-600">
                {currentPage + 1} / {totalPages}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3">
              Start Date *
            </label>
            <div className="relative" ref={startCalendarRef}>
              <div
                className="bg-white border-2 border-gray-300 rounded-2xl p-3 md:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => setShowStartCalendar(true)}
              >
                <input
                  type="text"
                  value={dateRange.startDate}
                  readOnly
                  className="w-full bg-transparent border-none focus:outline-none text-base md:text-lg font-semibold text-gray-800 cursor-pointer text-center"
                />
                <CalendarIcon className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
              {renderCalendar(
                dateRange.startDate,
                (date) => handleDateRangeChange('startDate', date),
                showStartCalendar,
                setShowStartCalendar,
                startCalendarRef,
                false
              )}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2 md:mb-3">
              End Date *
            </label>
            <div className="relative" ref={endCalendarRef}>
              <div
                className="bg-white border-2 border-gray-300 rounded-2xl p-3 md:p-4 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => setShowEndCalendar(true)}
              >
                <input
                  type="text"
                  value={dateRange.endDate}
                  readOnly
                  className="w-full bg-transparent border-none focus:outline-none text-base md:text-lg font-semibold text-gray-800 cursor-pointer text-center"
                />
                <CalendarIcon className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 md:w-6 md:h-6" />
              </div>
              {renderCalendar(
                dateRange.endDate,
                (date) => handleDateRangeChange('endDate', date),
                showEndCalendar,
                setShowEndCalendar,
                endCalendarRef,
                true
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Entry Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center mr-3 md:mr-6 border border-blue-200">
              <Layers className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-3xl font-bold text-white">
                Bulk Customer Entries
              </h3>
              <p className="text-white/90 text-sm md:text-lg mt-1 md:mt-2">
                📅 {dates.length} days • 👥 {totalCustomers} customer{totalCustomers !== 1 ? 's' : ''} today
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-xs md:text-sm">Total Days</div>
            <div className="text-2xl md:text-4xl font-bold text-white">{dates.length}</div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavButtons />

      {/* Day Pagination Controls - Hidden on mobile */}
      <div className="hidden md:block bg-gradient-to-br from-green-500 via-blue-300 to-indigo-500 rounded-3xl p-6 shadow-lg border border-green-200">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentPage(prev => Math.max(0, prev - 1));
              setCurrentCustomerPage(0);
            }}
            disabled={currentPage === 0}
            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous Day
          </button>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {currentDate ? new Date(currentDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'No date selected'}
            </div>
            <div className="text-gray-900 mt-1">
              Day {currentPage + 1} of {totalPages}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
              setCurrentCustomerPage(0);
            }}
            disabled={currentPage === totalPages - 1}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            Next Day
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Customer Pagination Controls */}
      {totalCustomers > 0 && (
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            <button
              type="button"
              onClick={() => setCurrentCustomerPage(prev => Math.max(0, prev - 1))}
              disabled={currentCustomerPage === 0}
              className="flex items-center justify-center w-full md:w-auto px-4 py-3 bg-gray-500 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Previous Customer
            </button>

            <div className="text-center">
              <div className="text-lg md:text-2xl font-bold text-gray-800">
                Customer #{currentCustomerPage + 1}
              </div>
              <div className="text-gray-600 text-sm md:text-base mt-1">
                Customer {currentCustomerPage + 1} of {totalCustomers}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentCustomerPage(prev => Math.min(totalCustomers - 1, prev + 1))}
              disabled={currentCustomerPage === totalCustomers - 1}
              className="flex items-center justify-center w-full md:w-auto px-4 py-3 bg-blue-500 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next Customer
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => addBulkDayEntry(currentDate)}
          className="flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Current Customer Form */}
      {currentCustomer && (
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-200">
          {/* Customer Form Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-2xl flex items-center justify-center shadow-md mr-4 md:mr-6">
                <User className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
              </div>
              <div>
                <h4 className="text-lg md:text-2xl font-bold text-gray-900">
                  Customer #{currentCustomerPage + 1}
                </h4>
                <p className="text-gray-600 text-sm md:text-lg mt-1">
                  Individual transaction details
                </p>
              </div>
            </div>

            {/* Customer Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {totalCustomers > 1 && (
                <button
                  type="button"
                  onClick={() => removeBulkDayEntry(currentDate, currentCustomer.id)}
                  className="flex items-center px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-semibold hover:shadow-lg transition-all w-full md:w-auto justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span className="text-sm md:text-base">Remove Customer</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {['standardPetrol', 'standardDiesel', 'premiumProducts', 'lube', 'additives'].map((section) => {
              const sectionConfig = {
                standardPetrol: { title: 'Petrol', color: 'bg-green-100 border-green-300', icon: <Fuel className="w-4 h-4 md:w-5 md:h-5 text-green-700" /> },
                standardDiesel: { title: 'Diesel', color: 'bg-blue-100 border-blue-300', icon: <Fuel className="w-4 h-4 md:w-5 md:h-5 text-blue-700" /> },
                premiumProducts: { title: 'Premium', color: 'bg-purple-100 border-purple-300', icon: <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-700" /> },
                lube: { title: 'Lube', color: 'bg-yellow-100 border-yellow-300', icon: <Settings className="w-4 h-4 md:w-5 md:h-5 text-yellow-700" /> },
                additives: { title: 'Additives', color: 'bg-red-100 border-red-300', icon: <Package className="w-4 h-4 md:w-5 md:h-5 text-red-700" /> }
              }[section];

              return (
                <div key={section} className={`${sectionConfig.color} rounded-2xl p-4 md:p-5 border-2 shadow-sm`}>
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center mr-2 md:mr-3 border">
                      {sectionConfig.icon}
                    </div>
                    <span className="text-base md:text-lg font-bold text-gray-800">{sectionConfig.title}</span>
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    {section === 'premiumProducts' && (
                      <select
                        value={currentCustomer[section]?.productType || ''}
                        onChange={(e) => handleBulkInputChange(currentDate, currentCustomer.id, section, 'productType', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                      >
                        <option value="">Product Type</option>
                        <option value="premiumPetrol">Premium Petrol</option>
                        <option value="premiumDiesel">Premium Diesel</option>
                      </select>
                    )}

                    <input
                      type="number"
                      min="0"
                      value={currentCustomer[section]?.volume || currentCustomer[section]?.quantity || ''}
                      onChange={(e) => handleBulkInputChange(
                        currentDate,
                        currentCustomer.id,
                        section,
                        section === 'premiumProducts' ? 'volume' : section.includes('Petrol') || section.includes('Diesel') ? 'volume' : 'quantity',
                        e.target.value
                      )}
                      placeholder={section.includes('Petrol') || section.includes('Diesel') || section === 'premiumProducts' ? "Liters" : "Quantity"}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                    />

                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-3 h-3 md:w-4 md:h-4" />
                      <input
                        type="number"
                        min="0"
                        value={currentCustomer[section]?.amount || ''}
                        onChange={(e) => handleBulkInputChange(currentDate, currentCustomer.id, section, 'amount', e.target.value)}
                        placeholder="Amount"
                        className="w-full pl-8 md:pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={currentCustomer[section]?.paymentMethod || ''}
                        onChange={(e) => handleBulkInputChange(currentDate, currentCustomer.id, section, 'paymentMethod', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 text-xs focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Payment</option>
                        <option value="cash">Cash</option>
                        <option value="hpPay">HP Pay</option>
                        <option value="other">Other</option>
                      </select>

                      <select
                        value={currentCustomer[section]?.customerType || ''}
                        onChange={(e) => handleBulkInputChange(currentDate, currentCustomer.id, section, 'customerType', e.target.value)}
                        className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 text-xs focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Customer</option>
                        <option value="existing">Existing</option>
                        <option value="new">New</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4 pt-6 md:pt-8 border-t border-gray-200 mt-6 md:mt-8">
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold w-full md:w-auto"
        >
          <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Submit Bulk Entries
        </button>
      </div>
    </form>
  );
};

export default BulkEntryForm;