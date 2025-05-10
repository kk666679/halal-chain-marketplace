'use client';

import React from 'react';
import Spinner from './Spinner';

const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
      <Spinner size="lg" color="primary" />
      <p className="mt-4 text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default PageLoader;