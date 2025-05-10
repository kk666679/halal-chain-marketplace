'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function CertificationManagement() {
  // Mock data - in a real app, this would come from API
  const initialCertifications = [
    { 
      id: 'CERT-123', 
      product: 'Organic Honey', 
      vendor: 'Natural Foods Co.', 
      type: 'halal', 
      status: 'approved', 
      submittedDate: '2023-11-20',
      approvedDate: '2023-11-22',
      expiryDate: '2024-11-22',
      certifier: 'Global Halal Authority'
    },
    { 
      id: 'CERT-124', 
      product: 'Halal Beef Cuts', 
      vendor: 'Premium Meats Ltd.', 
      type: 'halal', 
      status: 'pending', 
      submittedDate: '2023-11-22',
      approvedDate: null,
      expiryDate: null,
      certifier: null
    },
    { 
      id: 'CERT-125', 
      product: 'Natural Dates', 
      vendor: 'Desert Farms', 
      type: 'organic', 
      status: 'approved', 
      submittedDate: '2023-11-24',
      approvedDate: '2023-11-26',
      expiryDate: '2024-11-26',
      certifier: 'Organic Certification Board'
    },
    { 
      id: 'CERT-126', 
      product: 'Spice Mix', 
      vendor: 'Global Spices Inc.', 
      type: 'halal', 
      status: 'rejected', 
      submittedDate: '2023-11-26',
      approvedDate: null,
      expiryDate: null,
      certifier: 'Global Halal Authority'
    },
    { 
      id: 'CERT-127', 
      product: 'Olive Oil', 
      vendor: 'Mediterranean Goods', 
      type: 'halal', 
      status: 'approved', 
      submittedDate: '2023-11-15',
      approvedDate: '2023-11-18',
      expiryDate: '2024-11-18',
      certifier: 'Global Halal Authority'
    },
    { 
      id: 'CERT-128', 
      product: 'Vegan Protein Bars', 
      vendor: 'Health First', 
      type: 'vegan', 
      status: 'pending', 
      submittedDate: '2023-11-27',
      approvedDate: null,
      expiryDate: null,
      certifier: null
    },
    { 
      id: 'CERT-129', 
      product: 'Gluten-Free Bread', 
      vendor: 'Healthy Bakery', 
      type: 'glutenFree', 
      status: 'approved', 
      submittedDate: '2023-11-10',
      approvedDate: '2023-11-14',
      expiryDate: '2024-11-14',
      certifier: 'Gluten-Free Certification Program'
    },
    { 
      id: 'CERT-130', 
      product: 'Organic Milk', 
      vendor: 'Farm Fresh Dairy', 
      type: 'organic', 
      status: 'pending', 
      submittedDate: '2023-11-28',
      approvedDate: null,
      expiryDate: null,
      certifier: null
    },
  ];

  const [certifications, setCertifications] = useState(initialCertifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const certificationsPerPage = 5;

  // Filter certifications based on search term, type, and status
  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = 
      cert.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cert.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || cert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCertifications.length / certificationsPerPage);
  const indexOfLastCert = currentPage * certificationsPerPage;
  const indexOfFirstCert = indexOfLastCert - certificationsPerPage;
  const currentCertifications = filteredCertifications.slice(indexOfFirstCert, indexOfLastCert);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleViewCertification = (cert) => {
    setSelectedCertification(cert);
    setIsViewModalOpen(true);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'halal':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'organic':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'vegan':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'glutenFree':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500 mr-1" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-rose-500 mr-1" />;
      default:
        return null;
    }
  };

  const formatCertificationType = (type) => {
    switch (type) {
      case 'halal':
        return 'Halal';
      case 'organic':
        return 'Organic';
      case 'vegan':
        return 'Vegan';
      case 'glutenFree':
        return 'Gluten-Free';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Certification Management
        </h2>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            New Certification
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by product, vendor or ID"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Certification Type
            </label>
            <select
              id="type"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={typeFilter}
              onChange={handleTypeFilter}
            >
              <option value="all">All Types</option>
              <option value="halal">Halal</option>
              <option value="organic">Organic</option>
              <option value="vegan">Vegan</option>
              <option value="glutenFree">Gluten-Free</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certifications Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vendor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentCertifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{cert.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{cert.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">{cert.vendor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(cert.type)}`}>
                      {formatCertificationType(cert.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                      {getStatusIcon(cert.status)}
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(cert.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewCertification(cert)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{indexOfFirstCert + 1}</span> to{' '}
                <span className="font-medium">
                  {indexOfLastCert > filteredCertifications.length ? filteredCertifications.length : indexOfLastCert}
                </span>{' '}
                of <span className="font-medium">{filteredCertifications.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === number + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-300'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* View Certification Modal */}
      {isViewModalOpen && selectedCertification && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 sm:mx-0 sm:h-10 sm:w-10">
                    <FileCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Certification Details
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCertification.id}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Product</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCertification.product}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vendor</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedCertification.vendor}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                          <p className="mt-1 text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(selectedCertification.type)}`}>
                              {formatCertificationType(selectedCertification.type)}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                          <p className="mt-1 text-sm">
                            <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedCertification.status)}`}>
                              {getStatusIcon(selectedCertification.status)}
                              {selectedCertification.status.charAt(0).toUpperCase() + selectedCertification.status.slice(1)}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted Date</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {new Date(selectedCertification.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved Date</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedCertification.approvedDate ? new Date(selectedCertification.approvedDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Expiry Date</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedCertification.expiryDate ? new Date(selectedCertification.expiryDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifier</p>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">
                            {selectedCertification.certifier || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      {selectedCertification.status === 'pending' && (
                        <div className="mt-6 flex justify-center space-x-3">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}