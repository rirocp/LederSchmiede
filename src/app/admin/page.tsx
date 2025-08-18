'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  // Rediriger vers le système sécurisé
  useEffect(() => {
    router.push('/admin/secure');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto mb-4"></div>
        <p className="text-[#251C17] font-[var(--font-cormorant)] text-lg">Redirection vers le système sécurisé...</p>
      </div>
    </div>
  );
} 