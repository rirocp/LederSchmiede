'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useAdminLang();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Pour cet exemple, on utilise des identifiants simples
    // En production, il faudrait une vraie authentification côté serveur
    if (username === 'admin' && password === 'lederschmiede2024') {
      // Simuler un délai de connexion
      setTimeout(() => {
        onLogin('admin_token_' + Date.now());
        setIsLoading(false);
      }, 1000);
    } else {
      setError(tAdmin('incorrectCredentials', lang));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-4">
            {tAdmin('administration', lang)}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-4"></div>
          <p className="text-[#444444] font-[var(--font-cormorant)] text-lg">
            {tAdmin('galleryManagementSubtitle', lang)}
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#251C17] mb-2">
                {tAdmin('username', lang)}
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder={tAdmin('enterUsername', lang)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#251C17] mb-2">
                {tAdmin('password', lang)}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                placeholder={tAdmin('enterPassword', lang)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
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
                  {tAdmin('loggingIn', lang)}
                </div>
              ) : (
                tAdmin('login', lang)
              )}
            </button>
          </form>

          {/* Informations de connexion */}
          <div className="mt-6 p-4 bg-[#FAF6ED] rounded-xl border border-[#AA8C5B]/20">
            <h3 className="text-sm font-medium text-[#251C17] mb-2">{tAdmin('testCredentials', lang)} :</h3>
            <p className="text-xs text-[#444444]">
              <strong>{tAdmin('user', lang)} :</strong> admin<br />
              <strong>{tAdmin('password', lang)} :</strong> lederschmiede2024
            </p>
          </div>
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