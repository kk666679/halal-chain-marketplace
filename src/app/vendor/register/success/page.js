'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationSuccessPage from '@/app/register/success/page';

export default function VendorRegistrationSuccessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // This is just a wrapper that uses the main success page component
    // The main component will detect it's a vendor registration from the URL
  }, []);

  return <RegistrationSuccessPage />;
}