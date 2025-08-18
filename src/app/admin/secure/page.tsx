'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminLang } from '../components/AdminLangContext';
import { tAdmin } from '../components/admin-i18n';

const ADMIN_EMAIL = 'schneider.romain3@gmail.com'; // Email de l'administrateur

export default function SecureAdminPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { lang } = useAdminLang();

  const generateSecureToken = () => {
    // Générer un token sécurisé de 64 caractères
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (email !== ADMIN_EMAIL) {
      setMessage(tAdmin('unauthorizedEmail', lang));
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      // Générer un token sécurisé
      const token = generateSecureToken();
      const expiresAt = Date.now() + (15 * 60 * 1000); // 15 minutes

      // Sauvegarder le token temporairement
      const secureData = {
        token,
        expiresAt,
        email
      };
      localStorage.setItem('admin_secure_token', JSON.stringify(secureData));

      // Simuler l'envoi d'email (en production, utilisez un vrai service d'email)
      console.log('=== EMAIL SIMULATION ===');
      console.log(`To: ${email}`);
      console.log('Subject: Accès Administration - Leder Schmiede');
      console.log(`Body: Cliquez sur ce lien pour accéder à l'administration (valide 15 minutes):`);
      console.log(`${window.location.origin}/admin/verify?token=${token}`);
      console.log('========================');

      setIsSuccess(true);
      setMessage(tAdmin('linkSent', lang).replace('{email}', email));
      
      // En production, remplacez ceci par un vrai envoi d'email
      // await fetch('/api/send-admin-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, token })
      // });

    } catch (error) {
      setMessage(tAdmin('sendError', lang));
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-4">
            {tAdmin('secureAccess', lang)}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-4"></div>
          <p className="text-[#444444] font-[var(--font-cormorant)] text-lg">
            {tAdmin('admin', lang)}
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8 shadow-2xl">
          {!isSuccess ? (
            <form onSubmit={sendMagicLink} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('adminEmail', lang)}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="schneider.romain3@gmail.com"
                  required
                />
              </div>

              {message && !isSuccess && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#BF6C3E] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#AA8C5B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {tAdmin('sending', lang)}
                  </div>
                ) : (
                  tAdmin('sendLoginLink', lang)
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                {message}
              </div>
              
              <div className="bg-[#FAF6ED] p-4 rounded-xl border border-[#AA8C5B]/20">
                <h3 className="text-sm font-medium text-[#251C17] mb-2">{tAdmin('instructions', lang)} :</h3>
                <ol className="text-xs text-[#444444] space-y-1 list-decimal list-inside">
                  <li>{tAdmin('checkEmail', lang)}</li>
                  <li>{tAdmin('clickLink', lang)}</li>
                  <li>{tAdmin('linkExpires', lang)}</li>
                  <li>{tAdmin('neverShare', lang)}</li>
                </ol>
              </div>

              <button
                onClick={() => {
                  setIsSuccess(false);
                  setMessage('');
                }}
                className="w-full border border-[#AA8C5B]/30 text-[#251C17] py-3 px-6 rounded-xl font-medium hover:bg-[#AA8C5B]/10 transition-all duration-300"
              >
                {tAdmin('sendNewLink', lang)}
              </button>
            </div>
          )}
        </div>

        {/* Retour au site */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="text-[#BF6C3E] hover:text-[#AA8C5B] transition-colors duration-300 font-[var(--font-cormorant)]"
          >
            {tAdmin('backToSite', lang)}
          </Link>
        </div>
      </div>
    </div>
  );
} 