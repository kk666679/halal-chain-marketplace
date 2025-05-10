"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  X,
  Filter,
  Download,
  Loader2,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '../buttons/Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function DataTable({
  columns,
  data,
  isLoading = false,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  currentPage: controlledCurrentPage,
  totalItems: controlledTotalItems,
  onPageChange,
  onPageSizeChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  sortable = true,
  filterable = false,
  filters = [],
  onFilter,
  exportable = false,
  exportOptions = ['csv', 'excel', 'pdf'],
  onExport,
  refreshable = false,
  onRefresh,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
  className,
  ...props
}) {
  // Internal state for uncontrolled mode
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  
  // Initialize column visibility
  useEffect(() => {
    const initialVisibility = {};
    columns.forEach(column => {
      initialVisibility[column.key] = column.defaultVisible !== false;
    });
    setColumnVisibility(initialVisibility);
  }, [columns]);
  
  // Visible columns
  const visibleColumns = useMemo(() => {
    return columns.filter(column => columnVisibility[column.key] !== false);
  }, [columns, columnVisibility]);
  
  // Use controlled or uncontrolled pagination
  const effectiveCurrentPage = controlledCurrentPage !== undefined ? controlledCurrentPage : currentPage;
  
  // Calculate pagination values
  const totalItems = controlledTotalItems !== undefined ? controlledTotalItems : data.length;
  const totalPages = Math.ceil(totalItems / selectedPageSize);
  const startIndex = (effectiveCurrentPage - 1) * selectedPageSize;
  const endIndex = Math.min(startIndex + selectedPageSize, totalItems);
  
  // Get current page data
  const currentData = controlledTotalItems !== undefined 
    ? data 
    : data.slice(startIndex, endIndex);
  
  // Handle sorting
  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    
    if (onPageChange) {
      onPageChange(page);
    } else {
      setCurrentPage(page);
    }
  };
  
  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSelectedPageSize(newSize);
    
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
    
    // Reset to first page when changing page size
    if (onPageChange) {
      onPageChange(1);
    } else {
      setCurrentPage(1);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    
    if (onSearch) {
      onSearch('');
    }
  };
  
  // Handle filter change
  const handleFilterChange = (filterId, value) => {
    const newFilters = {
      ...activeFilters,
      [filterId]: value
    };
    
    if (!value) {
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    
    if (onFilter) {
      onFilter(newFilters);
    }
  };
  
  // Handle export
  const handleExport = (format) => {
    setIsExportMenuOpen(false);
    
    if (onExport) {
      onExport(format, selectedRows.length > 0 ? selectedRows : null);
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };
  
  // Handle row selection
  const handleRowSelection = (rowId) => {
    if (!selectable) return;
    
    setSelectedRows(prev => {
      const isSelected = prev.includes(rowId);
      const newSelection = isSelected
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId];
      
      if (onRowSelect) {
        onRowSelect(newSelection);
      }
      
      return newSelection;
    });
  };
  
  // Handle select all rows
  const handleSelectAll = () => {
    if (!selectable) return;
    
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
      
      if (onRowSelect) {
        onRowSelect([]);
      }
    } else {
      const allRowIds = currentData.map(row => row.id || row._id);
      setSelectedRows(allRowIds);
      setIsAllSelected(true);
      
      if (onRowSelect) {
        onRowSelect(allRowIds);
      }
    }
  };
  
  // Update isAllSelected when selectedRows changes
  useEffect(() => {
    if (currentData.length > 0 && selectedRows.length === currentData.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selectedRows, currentData]);
  
  // Toggle column visibility
  const toggleColumnVisibility = (key) => {
    setColumnVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Sort data if not controlled
  useEffect(() => {
    if (sortConfig.key && !onSearch) {
      // Only sort locally if not using controlled data
    }
  }, [sortConfig, onSearch]);

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden", className)} {...props}>
      {/* Table toolbar */}
      {(searchable || filterable || exportable || refreshable || selectable) && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center space-x-2">
              {searchable && (
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder={searchPlaceholder}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                    </button>
                  )}
                </div>
              )}
              
              {filterable && filters.length > 0 && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={Filter}
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? 'bg-gray-100 dark:bg-gray-700' : ''}
                  >
                    Filters
                    {Object.keys(activeFilters).length > 0 && (
                      <span className="ml-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {Object.keys(activeFilters).length}
                      </span>
                    )}
                  </Button>
                  
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Filters</h3>
                            {Object.keys(activeFilters).length > 0 && (
                              <button
                                onClick={() => {
                                  setActiveFilters({});
                                  if (onFilter) onFilter({});
                                }}
                                className="text-xs text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                              >
                                Clear all
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {filters.map((filter) => (
                              <div key={filter.id} className="space-y-1">
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {filter.label}
                                </label>
                                <select
                                  value={activeFilters[filter.id] || ''}
                                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                  className="block w-full text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                >
                                  <option value="">All</option>
                                  {filter.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Column visibility toggle */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={showColumnSelector ? EyeOff : Eye}
                  onClick={() => setShowColumnSelector(!showColumnSelector)}
                  className={showColumnSelector ? 'bg-gray-100 dark:bg-gray-700' : ''}
                >
                  Columns
                </Button>
                
                <AnimatePresence>
                  {showColumnSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-3 space-y-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Toggle Columns</h3>
                        <div className="space-y-2">
                          {columns.map((column) => (
                            <div key={column.key} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`column-${column.key}`}
                                checked={columnVisibility[column.key] !== false}
                                onChange={() => toggleColumnVisibility(column.key)}
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                disabled={column.required}
                              />
                              <label
                                htmlFor={`column-${column.key}`}
                                className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                              >
                                {column.header}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Export button */}
              {exportable && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={Download}
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    className={isExportMenuOpen ? 'bg-gray-100 dark:bg-gray-700' : ''}
                  >
                    Export
                  </Button>
                  
                  <AnimatePresence>
                    {isExportMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="py-1">
                          {exportOptions.map((format) => (
                            <button
                              key={format}
                              onClick={() => handleExport(format)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              Export as {format.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Refresh button */}
              {refreshable && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  aria-label="Refresh data"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {/* Selection checkbox column */}
              {selectable && (
                <th scope="col" className="px-6 py-3 w-10">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                  </div>
                </th>
              )}
              
              {/* Data columns */}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
                    sortable && column.sortable !== false ? "cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" : "",
                    column.className
                  )}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortable && column.sortable !== false && (
                      <span className="flex flex-col">
                        <ChevronUp 
                          className={cn(
                            "h-3 w-3 -mb-1",
                            sortConfig.key === column.key && sortConfig.direction === 'asc' 
                              ? "text-emerald-500" 
                              : "text-gray-400"
                          )} 
                        />
                        <ChevronDown 
                          className={cn(
                            "h-3 w-3",
                            sortConfig.key === column.key && sortConfig.direction === 'desc' 
                              ? "text-emerald-500" 
                              : "text-gray-400"
                          )} 
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 text-emerald-500 animate-spin mr-2" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : currentData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => {
                const rowId = row.id || row._id || rowIndex;
                const isSelected = selectedRows.includes(rowId);
                
                return (
                  <tr 
                    key={rowId} 
                    className={cn(
                      "hover:bg-gray-50 dark:hover:bg-gray-750",
                      isSelected ? "bg-emerald-50 dark:bg-emerald-900/20" : ""
                    )}
                    onClick={() => selectable && handleRowSelection(rowId)}
                  >
                    {/* Selection checkbox */}
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelection(rowId)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                        </div>
                      </td>
                    )}
                    
                    {/* Data cells */}
                    {visibleColumns.map((column) => (
                      <td 
                        key={`${rowId}-${column.key}`} 
                        className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100", column.cellClassName)}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(effectiveCurrentPage - 1)}
              disabled={effectiveCurrentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(effectiveCurrentPage + 1)}
              disabled={effectiveCurrentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{totalItems > 0 ? startIndex + 1 : 0}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPageSize}
                onChange={handlePageSizeChange}
                className="block border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} per page
                  </option>
                ))}
              </select>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={effectiveCurrentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">First</span>
                  <ChevronsLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(effectiveCurrentPage - 1)}
                  disabled={effectiveCurrentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (effectiveCurrentPage <= 3) {
                    pageNum = i + 1;
                  } else if (effectiveCurrentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = effectiveCurrentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={cn(
                        "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                        effectiveCurrentPage === pageNum
                          ? "z-10 bg-emerald-50 dark:bg-emerald-900 border-emerald-500 dark:border-emerald-600 text-emerald-600 dark:text-emerald-300"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(effectiveCurrentPage + 1)}
                  disabled={effectiveCurrentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={effectiveCurrentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Last</span>
                  <ChevronsRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}