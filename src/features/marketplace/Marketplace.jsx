import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DeveloperTools from './developer/DeveloperTools';
import Agencies from './government/Agencies';
import Vendors from './vendors/Vendors';
import SellerProfile from './vendors/SellerProfile';

const Marketplace = () => (
  <div className="marketplace-layout">
    <Routes>
      <Route path="developer" element={<DeveloperTools />} />
      <Route path="government" element={<Agencies />} />
      <Route path="vendors" element={<Vendors />} />
      <Route path="vendors/:vendorId" element={<SellerProfile />} />
    </Routes>
  </div>
);

export default Marketplace;