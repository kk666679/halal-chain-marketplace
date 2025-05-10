"use client";

import { useState, useRef } from 'react';
import { Upload, X, File, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function FileUpload({
  id,
  name,
  label,
  accept,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className,
  helpText,
  maxSize = 5, // in MB
  multiple = false,
  value,
  preview = true,
  ...props
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(value || []);
  const fileInputRef = useRef(null);
  
  const isImage = (file) => {
    return file.type.startsWith('image/');
  };
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const validateFiles = (fileList) => {
    const validFiles = [];
    const maxSizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes
    
    Array.from(fileList).forEach(file => {
      // Check file size
      if (file.size > maxSizeInBytes) {
        console.error(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
      
      // Check file type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        
        // Check if file type matches any of the accepted types
        const isAccepted = acceptedTypes.some(type => {
          if (type.endsWith('/*')) {
            // Handle wildcards like 'image/*'
            const typePrefix = type.slice(0, -1);
            return fileType.startsWith(typePrefix);
          }
          return type === fileType;
        });
        
        if (!isAccepted) {
          console.error(`File ${file.name} is not an accepted file type.`);
          return;
        }
      }
      
      validFiles.push(file);
    });
    
    return validFiles;
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };
  
  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };
  
  const handleFiles = (fileList) => {
    const validFiles = validateFiles(fileList);
    
    if (validFiles.length === 0) return;
    
    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(newFiles);
    
    // Create a synthetic event for onChange handler
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: newFiles
        }
      };
      onChange(syntheticEvent);
    }
  };
  
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Create a synthetic event for onChange handler
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value: newFiles
        }
      };
      onChange(syntheticEvent);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={id} 
          className={cn(
            "block text-sm font-medium mb-1",
            error ? "text-red-600 dark:text-red-500" : "text-gray-700 dark:text-gray-300"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-md p-4 text-center",
          isDragging ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-gray-300 dark:border-gray-700",
          disabled ? "bg-gray-100 cursor-not-allowed dark:bg-gray-800" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50",
          error ? "border-red-300 dark:border-red-700" : ""
        )}
      >
        <input
          ref={fileInputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          disabled={disabled}
          required={required}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="sr-only"
          {...props}
        />
        
        <div className="space-y-2 py-4">
          <div className="flex justify-center">
            <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={disabled}
              className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 font-medium focus:outline-none"
            >
              Click to upload
            </button>{' '}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept ? `${accept.split(',').join(', ')} • ` : ''}
            Max {maxSize}MB {multiple ? '• Multiple files allowed' : ''}
          </p>
        </div>
      </div>
      
      {/* File preview */}
      {preview && files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                {isImage(file) ? (
                  <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <File className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600 dark:text-red-500">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      )}
    </div>
  );
}