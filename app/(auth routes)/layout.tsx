'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AuthProps = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: AuthProps) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return children;
}
