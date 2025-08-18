'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AdminLang = 'fr' | 'de';

interface AdminLangContextProps {
  lang: AdminLang;
  setLang: (lang: AdminLang) => void;
}

const AdminLangContext = createContext<AdminLangContextProps | undefined>(undefined);

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<AdminLang>('de');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('admin_lang') : null;
    if (stored === 'fr' || stored === 'de') setLangState(stored);
  }, []);

  const setLang = (newLang: AdminLang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') localStorage.setItem('admin_lang', newLang);
  };

  return (
    <AdminLangContext.Provider value={{ lang, setLang }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  const ctx = useContext(AdminLangContext);
  if (!ctx) throw new Error('useAdminLang must be used within AdminLangProvider');
  return ctx;
} 