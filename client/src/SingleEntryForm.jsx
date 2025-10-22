import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  Plus,
  Trash2,
  Receipt,
  Fuel,
  Zap,
  Settings,
  Package,
  Send,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from 'framer-motion';

const SingleEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [singleDayEntries, setSingleDayEntries] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      standardPetrol: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      standardDiesel: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      premiumProducts: { productType: '', volume: '', amount: '', paymentMethod: '', customerType: '' },
      lube: { quantity: '', amount: '', paymentMethod: '', customerType: '' },
      additives: { quantity: '', amount: '', paymentMethod: '', customerType: '' }
    }
  ]);

  const [message, setMessage] = useState({ type: '', text: '', visible: false });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 1;
  const totalPages = Math.ceil(singleDayEntries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = singleDayEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
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

  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);

  const addSingleDayEntry = () => {
    const newEntry = {
      id: singleDayEntries.length + 1,
      timestamp: new Date().toISOString(),
      standardPetrol: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      standardDiesel: { volume: '', amount: '', paymentMethod: '', customerType: '' },
      premiumProducts: { productType: '', volume: '', amount: '', paymentMethod: '', customerType: '' },
      lube: { quantity: '', amount: '', paymentMethod: '', customerType: '' },
      additives: { quantity: '', amount: '', paymentMethod: '', customerType: '' }
    };
    setSingleDayEntries([...singleDayEntries, newEntry]);
    setCurrentPage(totalPages + 1);
    showMessage('success', '✅ New customer entry added successfully!');
  };

  const removeSingleDayEntry = (id) => {
    if (singleDayEntries.length > 1) {
      const updated = singleDayEntries.filter(entry => entry.id !== id);
      setSingleDayEntries(updated);
      setCurrentPage(Math.min(currentPage, Math.ceil(updated.length / entriesPerPage)));
      showMessage('success', '🗑️ Customer entry deleted successfully!');
    }
  };

  const handleSingleInputChange = (entryId, section, field, value) => {
    if (['volume', 'quantity', 'amount'].includes(field) && value < 0) {
      showMessage('warning', '⚠️ Only positive numbers are allowed!');
      return;
    }
    setSingleDayEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, [section]: { ...entry[section], [field]: value } }
          : entry
      )
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmpty = singleDayEntries.some(entry =>
      Object.values(entry).some(section =>
        typeof section === 'object' && Object.values(section).some(value => value === '')
      )
    );

    if (hasEmpty) {
      showMessage('warning', '⚠️ Please fill all required fields before submitting!');
      return;
    }

    console.log('Submitted:', { date: selectedDate, entries: singleDayEntries });
    showMessage('success', '✅ Entries submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative ">

      {/* Toast Message */}
      {message.visible && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white text-lg font-medium z-50 transition-all duration-500 ${message.type === 'success' ? 'bg-green-600' : 'bg-yellow-500'
            } animate-fadeInDown`}
        >
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-6 mb-6 relative">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Select Entry Date</h3>
        </div>

        <div className="relative" ref={calendarRef}>
          <div
            className="bg-white border border-blue-200 rounded-xl p-6 cursor-pointer"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <input
              type="text"
              readOnly
              value={selectedDate.toLocaleDateString()}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold text-center cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100"
            />
          </div>

          {/* Animated Calendar */}
          <AnimatePresence>
            {showCalendar && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 z-50 bg-white border border-blue-200 rounded-2xl shadow-2xl p-2"
              >
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="rounded-xl"
                  tileClassName={({ date, view }) =>
                    view === 'month' && date.toDateString() === selectedDate.toDateString()
                      ? 'bg-blue-500 text-white rounded-lg'
                      : ''
                  }
                  prevLabel={<ChevronLeft className="w-4 h-4 ml-5" />}
                  nextLabel={<ChevronRight className="w-4 h-4" />}
                  prev2Label={null}
                  next2Label={null}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Entries Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Daily Customer Entries</h3>
              <p className="text-green-100">
                {singleDayEntries.length} customer
                {singleDayEntries.length !== 1 ? 's' : ''} for{' '}
                {selectedDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Entry Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <button
          type="button"
          onClick={addSingleDayEntry}
          className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Customer Entry
        </button>
      </div>


      {/* Customer Entries */}
      <div className="space-y-6">
        {currentEntries.map((entry) => (
          <div key={entry.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Customer Entry #{entry.id}
                  </h4>
                  <p className="text-gray-600 text-sm">Individual transaction details</p>
                </div>
              </div>
              {singleDayEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSingleDayEntry(entry.id)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-2xl font-semibold hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  Remove Customer <Trash2 className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            {/* Fuel/Lube/Additives Sections */}
            {['standardPetrol', 'standardDiesel', 'premiumProducts', 'lube', 'additives'].map((section) => {
              const config = {
                standardPetrol: { title: 'Standard Petrol', icon: <Fuel className="w-6 h-6 text-green-600" /> },
                standardDiesel: { title: 'Standard Diesel', icon: <Fuel className="w-6 h-6 text-blue-600" /> },
                premiumProducts: { title: 'Premium Products', icon: <Zap className="w-6 h-6 text-purple-600" /> },
                lube: { title: 'Lube Products', icon: <Settings className="w-6 h-6 text-yellow-600" /> },
                additives: { title: 'Additives', icon: <Package className="w-6 h-6 text-red-600" /> }
              }[section];

              return (
                <div key={section} className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                  <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                    {config.icon}
                    <span className="ml-2">{config.title}</span>
                  </h5>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      {section === 'premiumProducts' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Type
                          </label>
                          <select
                            value={entry[section].productType}
                            onChange={(e) =>
                              handleSingleInputChange(entry.id, section, 'productType', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select product</option>
                            <option value="premiumPetrol">Premium Petrol</option>
                            <option value="premiumDiesel">Premium Diesel</option>
                            <option value="racingFuel">Racing Fuel</option>
                          </select>
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {section.includes('Petrol') ||
                            section.includes('Diesel') ||
                            section === 'premiumProducts'
                            ? 'Sales Volume (Liters)'
                            : 'Quantity'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={entry[section].volume || entry[section].quantity}
                          onChange={(e) =>
                            handleSingleInputChange(
                              entry.id,
                              section,
                              section === 'premiumProducts' ||
                                section.includes('Petrol') ||
                                section.includes('Diesel')
                                ? 'volume'
                                : 'quantity',
                              e.target.value
                            )
                          }
                          placeholder="Enter value"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={entry[section].amount}
                          onChange={(e) =>
                            handleSingleInputChange(entry.id, section, 'amount', e.target.value)
                          }
                          placeholder="Enter amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <select
                          value={entry[section].paymentMethod}
                          onChange={(e) =>
                            handleSingleInputChange(entry.id, section, 'paymentMethod', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select method</option>
                          <option value="cash">Cash</option>
                          <option value="hpPay">HP Pay</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Type
                        </label>
                        <select
                          value={entry[section].customerType}
                          onChange={(e) =>
                            handleSingleInputChange(entry.id, section, 'customerType', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select type</option>
                          <option value="existing">Existing Customer</option>
                          <option value="new">New Customer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg border ${currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg border ${currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100'
              }`}
          >
            Next <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-center sm:justify-end pt-8 border-t border-gray-200 mt-8">
        <button
          type="submit"
          className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 shadow-lg transition-all"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Daily Entries
        </button>
      </div>

    </form>
  );
};

export default SingleEntryForm;