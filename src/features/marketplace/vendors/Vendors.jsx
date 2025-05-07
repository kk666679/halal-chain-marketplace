import React, { useEffect, useState } from 'react';
import VendorCard from '../../../components/VendorCard';
import { fetchVendors } from '../../../utils/api';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const loadVendors = async () => {
      const data = await fetchVendors();
      setVendors(data);
    };
    loadVendors();
  }, []);

  return (
    <div className="vendors-list">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};

export default Vendors;