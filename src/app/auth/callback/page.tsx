'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.replace('/account');
    }, 100); 

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return <div>Loading...</div>;
}