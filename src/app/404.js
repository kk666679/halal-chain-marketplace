'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a fallback for older Next.js versions or direct access to /404
export default function Custom404() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the not-found page
    router.replace('/not-found');
  }, [router]);
  
  return null;
}