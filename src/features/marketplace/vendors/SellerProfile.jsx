import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorProfile } from '../../../utils/api';

const SellerProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      const data = await getVendorProfile(vendorId);
      setVendor(data);
    };
    fetchVendor();
  }, [vendorId]);

  return (
    <div className="seller-profile">
      {vendor && (
        <>
          <h2>{vendor.businessName}</h2>
          <p>Certification ID: {vendor.certificationId}</p>
          {/* Profile details */}
        </>
      )}
    </div>
  );
};

export default SellerProfile;