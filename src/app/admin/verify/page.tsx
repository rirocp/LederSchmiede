'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminLang } from '../components/AdminLangContext';
import { tAdmin } from '../components/admin-i18n';

function VerifyTokenContent() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useAdminLang();

  useEffect(() => {
    const verifyToken = () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setError(tAdmin('missingToken', lang));
        setIsVerifying(false);
        return;
      }

      try {
        // Récupérer les données sécurisées
        const secureDataStr = localStorage.getItem('admin_secure_token');
        if (!secureDataStr) {
          setError(tAdmin('expiredSession', lang));
          setIsVerifying(false);
          return;
        }

        const secureData = JSON.parse(secureDataStr);
        
        // Vérifier si le token correspond
        if (secureData.token !== token) {
          setError(tAdmin('invalidToken', lang));
          setIsVerifying(false);
          return;
        }

        // Vérifier si le token n'a pas expiré
        if (Date.now() > secureData.expiresAt) {
          setError(tAdmin('expiredToken', lang));
          localStorage.removeItem('admin_secure_token');
          setIsVerifying(false);
          return;
        }

        // Token valide - créer une session d'administration
        const adminSession = {
          token: 'admin_authenticated_' + Date.now(),
          email: secureData.email,
          authenticatedAt: Date.now(),
          expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8 heures
        };

        localStorage.setItem('admin_session', JSON.stringify(adminSession));
        localStorage.removeItem('admin_secure_token'); // Nettoyer le token temporaire

        setIsValid(true);
        
        // Rediriger vers le tableau de bord après 2 secondes
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);

      } catch (error) {
        setError(tAdmin('verificationError', lang));
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [searchParams, router, lang]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto mb-4"></div>
          <p className="text-[#251C17] font-[var(--font-cormorant)] text-lg">{tAdmin('verifying', lang)}</p>
        </div>
      </div>
    );
  }

  if (isValid) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-2">
            {tAdmin('authenticationSuccess', lang)}
          </h2>
          <p className="text-[#444444] font-[var(--font-cormorant)] text-lg">
            {tAdmin('redirectingToDashboard', lang)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-4">
          {tAdmin('accessDenied', lang)}
        </h2>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8 shadow-2xl mb-6">
          <p className="text-[#444444] font-[var(--font-cormorant)] text-lg mb-6">
            {error}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => router.push('/admin/secure')}
              className="w-full bg-[#BF6C3E] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#AA8C5B] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {tAdmin('requestNewLink', lang)}
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="w-full border border-[#AA8C5B]/30 text-[#251C17] py-3 px-6 rounded-xl font-medium hover:bg-[#AA8C5B]/10 transition-all duration-300"
            >
              {tAdmin('backToSite', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyTokenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto mb-4"></div>
          <p className="text-[#251C17] font-[var(--font-cormorant)] text-lg">Chargement...</p>
        </div>
      </div>
    }>
      <VerifyTokenContent />
    </Suspense>
  );
} 