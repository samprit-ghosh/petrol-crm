import React, { useState, useRef } from 'react';
import {
  FileSpreadsheet,
  CloudUpload,
  Download,
  Layers,
  FileText,
  Eye,
  Table,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Database,
  FileCheck,
  FileSearch
} from 'lucide-react';

const CsvUploadForm = () => {
  const [csvData, setCsvData] = useState(null);
  const [csvFileName, setCsvFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const fileInputRef = useRef(null);

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFileName(file.name);
      setUploadStatus('uploading');

      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;
        // Simulate CSV parsing
        setTimeout(() => {
          const simulatedData = parseCSVData(csvText);
          setCsvData({
            fileName: file.name,
            fileSize: (file.size / 1024).toFixed(2) + ' KB',
            rowCount: simulatedData.length,
            preview: csvText.split('\n').slice(0, 6).join('\n'),
            parsedData: simulatedData
          });
          setParsedData(simulatedData);
          setUploadStatus('success');
        }, 1500);
      };
      reader.readAsText(file);
    } else {
      setUploadStatus('error');
    }
  };

  const parseCSVData = (csvText) => {
    // Simulate CSV parsing - in real app, use a proper CSV parser
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1, 6).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      return {
        id: index + 1,
        date: values[0] || '2024-01-15',
        productType: values[1] || 'standardPetrol',
        volume: values[2] || '25.5',
        amount: values[3] || '2550.00',
        paymentMethod: values[4] || 'cash',
        customerType: values[5] || 'existing'
      };
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleCsvUpload({ target: { files } });
    }
  };

  const handleCsvSubmit = () => {
    if (csvData) {
      setUploadStatus('processing');
      // Simulate processing
      setTimeout(() => {
        console.log('CSV data processed:', csvData);
        setUploadStatus('completed');
      }, 2000);
    }
  };

  const clearCsvData = () => {
    setCsvData(null);
    setCsvFileName('');
    setUploadStatus('');
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadTemplate = () => {
    const template = `Date,ProductType,Volume,Amount,PaymentMethod,CustomerType
2024-01-15,standardPetrol,25.5,2550.00,cash,existing
2024-01-15,standardDiesel,40.2,3216.00,hpPay,new
2024-01-15,premiumProducts,15.0,1800.00,other,existing
2024-01-15,lube,2,600.00,cash,new
2024-01-15,additives,1,250.00,hpPay,existing`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fuel_station_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* CSV Upload Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">CSV Bulk Upload</h3>
              <p className="text-green-100">Upload your sales data in CSV format for multiple customers</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-200">Supported Format</div>
            <div className="text-lg font-bold">.CSV</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <CloudUpload className="w-5 h-5 mr-2 text-blue-600" />
                Upload CSV File
              </h4>
              {csvData && (
                <button
                  onClick={clearCsvData}
                  className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </button>
              )}
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragging
                ? 'border-blue-400 bg-blue-50 scale-105'
                : uploadStatus === 'success'
                  ? 'border-green-300 bg-green-50'
                  : uploadStatus === 'error'
                    ? 'border-red-300 bg-red-50'
                    : uploadStatus === 'uploading'
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCsvUpload}
                accept=".csv"
                className="hidden"
              />

              {uploadStatus === 'uploading' ? (
                <div className="animate-pulse">
                  <RefreshCw className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-spin" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing File...</h4>
                  <p className="text-gray-600 mb-4">Reading and validating your CSV data</p>
                </div>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">File Uploaded Successfully!</h4>
                  <p className="text-gray-600 mb-2">{csvFileName}</p>
                  <p className="text-sm text-green-600 font-medium">
                    {csvData?.rowCount} records found • {csvData?.fileSize}
                  </p>
                </>
              ) : uploadStatus === 'error' ? (
                <>
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Failed</h4>
                  <p className="text-gray-600 mb-4">Please upload a valid CSV file</p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </>
              ) : (
                <>
                  <CloudUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h4>
                  <p className="text-gray-600 mb-4">
                    Drag & drop your CSV file here or click to browse
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Browse Files
                  </button>
                  <p className="text-xs text-gray-500 mt-3">Supports .csv files only</p>
                </>
              )}
            </div>

            {/* Upload Stats */}
            {csvData && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <FileCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-blue-900">{csvData.rowCount}</div>
                  <div className="text-xs text-blue-600">Records</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <Database className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-green-900">{csvData.fileSize}</div>
                  <div className="text-xs text-green-600">File Size</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <FileSearch className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-purple-900">Ready</div>
                  <div className="text-xs text-purple-600">Status</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}



        </div>

        {/* Instructions & Preview */}
        <div className="space-y-6">



          <div className="flex justify-center w-full">
            <button
              type="button"
              onClick={downloadTemplate}
              className="flex items-center justify-center p-4 
             bg-gradient-to-r from-green-400 via-emerald-100 to-teal-400 
             text-white font-semibold rounded-xl 
             shadow-md hover:shadow-lg 
             hover:from-emerald-300 hover:to-green-300 
             transition-all duration-300 ease-in-out 
             group w-full max-w-md"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-all">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Download Template</div>
                <div className="text-sm text-gray-600">Get CSV format template</div>
              </div>
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              CSV Format Requirements
            </h4>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Column Headers</h5>
                  <p className="text-sm text-gray-600">Date, ProductType, Volume, Amount, PaymentMethod, CustomerType</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Date Format</h5>
                  <p className="text-sm text-gray-600">YYYY-MM-DD (e.g., 2024-01-15)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-purple-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Product Types</h5>
                  <p className="text-sm text-gray-600">standardPetrol, standardDiesel, premiumProducts, lube, additives</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-orange-600 text-sm font-bold">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Payment Methods</h5>
                  <p className="text-sm text-gray-600">cash, hpPay, other</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-red-600 text-sm font-bold">5</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Customer Types</h5>
                  <p className="text-sm text-gray-600">existing, new</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Preview */}

        </div>
      </div>

      <div>
        {parsedData && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-purple-600" />
              Data Preview
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Product</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Volume</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Amount</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Payment</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase border-b">Customer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parsedData.slice(0, 5).map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-900">{row.date}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${row.productType === 'standardPetrol' ? 'bg-green-100 text-green-800' :
                          row.productType === 'standardDiesel' ? 'bg-blue-100 text-blue-800' :
                            row.productType === 'premiumProducts' ? 'bg-purple-100 text-purple-800' :
                              row.productType === 'lube' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                          }`}>
                          {row.productType}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-900">{row.volume}</td>
                      <td className="px-3 py-2 text-gray-900">₹{row.amount}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${row.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' :
                          row.paymentMethod === 'hpPay' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                          {row.paymentMethod}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${row.customerType === 'existing' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                          }`}>
                          {row.customerType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Showing first 5 records of {parsedData.length}
            </p>
          </div>
        )}

        {/* Sample Data */}
        {!parsedData && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm w-full w-full mx-auto">
            <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center flex-wrap text-center md:text-left justify-center md:justify-start">
              <Table className="w-5 h-5 mr-2 text-orange-600" />
              Data Preview
            </h4>

            <div className="bg-gray-50 rounded-lg p-4 border overflow-x-auto">
              <pre className="text-[10px] sm:text-xs md:text-sm text-gray-700 whitespace-pre-wrap sm:whitespace-pre text-center md:text-left">
                {`Date,ProductType,Volume,Amount,PaymentMethod,CustomerType
2024-01-15,standardPetrol,25.5,2550.00,cash,existing
2024-01-15,standardDiesel,40.2,3216.00,hpPay,new
2024-01-15,premiumProducts,15.0,1800.00,other,existing
2024-01-15,lube,2,600.00,cash,new
2024-01-15,additives,1,250.00,hpPay,existing`}
              </pre>
            </div>
          </div>
        )}

      </div>




      {/* Submit Button for CSV */}
      {csvData && uploadStatus === 'success' && (
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={clearCsvData}
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCsvSubmit}
            disabled={uploadStatus === 'processing'}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-xl hover:from-green-700 hover:to-blue-800 disabled:opacity-50 transition-all"
          >
            {uploadStatus === 'processing' ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Database className="w-5 h-5 mr-2" />
            )}
            {uploadStatus === 'processing' ? 'Processing...' : 'Import to Database'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvUploadForm;