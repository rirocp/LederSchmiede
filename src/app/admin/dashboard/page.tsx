'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GalleryManager from '../GalleryManager';
import ServicePageManager from '../ServicePageManager';
import HeroManager from '../HeroManager';
import ThemeManager from '../ThemeManager';
import AdminLangSelector from '../components/AdminLangSelector';
import { useAdminLang } from '../components/AdminLangContext';
import { tAdmin } from '../components/admin-i18n';

interface AdminSession {
  token: string;
  email: string;
  authenticatedAt: number;
  expiresAt: number;
}

export default function SecureDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [isHeroManagerOpen, setIsHeroManagerOpen] = useState(false);
  const router = useRouter();
  const { lang } = useAdminLang();

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const sessionStr = localStorage.getItem('admin_session');
        if (!sessionStr) {
          router.push('/admin/secure');
          return;
        }

        const session: AdminSession = JSON.parse(sessionStr);
        
        // Vérifier si la session n'a pas expiré
        if (Date.now() > session.expiresAt) {
          localStorage.removeItem('admin_session');
          router.push('/admin/secure');
          return;
        }

        setAdminSession(session);
        setIsAuthenticated(true);
      } catch (error) {
        router.push('/admin/secure');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/secure');
  };

  const extendSession = () => {
    if (adminSession) {
      const extendedSession = {
        ...adminSession,
        expiresAt: adminSession.expiresAt + (8 * 60 * 60 * 1000) // 8 heures à partir de l'expiration actuelle
      };
      localStorage.setItem('admin_session', JSON.stringify(extendedSession));
      setAdminSession(extendedSession);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto mb-4"></div>
          <p className="text-[#251C17] font-[var(--font-cormorant)] text-lg">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-[#FAF6ED]">
      {/* Header */}
      <div className="bg-[#251C17] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-[var(--font-cinzel)] font-bold">
                {tAdmin('admin', lang)}
              </h1>
              <div className="h-6 w-px bg-white/20"></div>
              <span className="text-[#AA8C5B] font-medium">{tAdmin('secureSession', lang)}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-white/80">
                <span>{tAdmin('connected', lang)} : {adminSession?.email}</span>
                <br />
                <span>{tAdmin('expires', lang)} : {adminSession ? new Date(adminSession.expiresAt).toLocaleString(lang === 'de' ? 'de-DE' : 'fr-FR') : ''}</span>
              </div>
              
              <button
                onClick={extendSession}
                className="text-white/80 hover:text-[#AA8C5B] transition-colors duration-300 text-sm"
                title={tAdmin('extendSessionTitle', lang)}
              >
                ⏰ {tAdmin('extend', lang)}
              </button>
              
              <a 
                href="/" 
                target="_blank"
                className="text-white/80 hover:text-[#AA8C5B] transition-colors duration-300 font-medium"
              >
                {tAdmin('viewSite', lang)}
              </a>
              <AdminLangSelector />
              <button
                onClick={handleLogout}
                className="bg-[#BF6C3E] text-white px-4 py-2 rounded-lg hover:bg-[#AA8C5B] transition-all duration-300 font-medium"
              >
                {tAdmin('logout', lang)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-[#AA8C5B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('hero')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'hero'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              🏠 {tAdmin('homePage', lang)}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'services'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              📄 {tAdmin('servicePages', lang)}
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'gallery'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              📸 {tAdmin('galleryManagement', lang)}
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'themes'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              🎨 {tAdmin('themes', lang)}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'security'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              🔒 {tAdmin('security', lang)}
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'hero' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8">
            <div className="text-center">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                {tAdmin('heroManagement', lang)}
              </h2>
              
              <div className="max-w-2xl mx-auto space-y-6">
                              <p className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed">
                {tAdmin('homepageModificationDesc', lang)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#FAF6ED] p-6 rounded-xl border border-[#AA8C5B]/20">
                  <div className="text-4xl mb-4">🖼️</div>
                  <h3 className="text-xl font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-2">
                    {tAdmin('backgroundImage', lang)}
                  </h3>
                  <p className="text-[#666666] text-sm">
                    {tAdmin('homepageBackgroundImageDesc', lang)}
                  </p>
                </div>
                
                <div className="bg-[#FAF6ED] p-6 rounded-xl border border-[#AA8C5B]/20">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-2">
                    {tAdmin('presentationSection', lang)}
                  </h3>
                  <p className="text-[#666666] text-sm">
                    {tAdmin('presentationSectionDesc', lang)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setIsHeroManagerOpen(true)}
                className="bg-[#BF6C3E] text-white px-8 py-4 rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ✏️ {tAdmin('modifyHomepage', lang)}
              </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'gallery' && <GalleryManager />}
        
        {activeTab === 'services' && <ServicePageManager />}
        
        {activeTab === 'themes' && <ThemeManager />}
        
        {activeTab === 'security' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8">
            <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
              {tAdmin('security', lang)}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#251C17] mb-4">{tAdmin('currentSession', lang)}</h3>
                <div className="bg-[#FAF6ED] p-4 rounded-xl border border-[#AA8C5B]/20">
                  <p className="text-[#444444] mb-2">
                    <strong>{tAdmin('email', lang)} :</strong> {adminSession?.email}
                  </p>
                  <p className="text-[#444444] mb-2">
                    <strong>{tAdmin('connectedSince', lang)} :</strong> {adminSession ? new Date(adminSession.authenticatedAt).toLocaleString(lang === 'de' ? 'de-DE' : 'fr-FR') : ''}
                  </p>
                  <p className="text-[#444444] mb-2">
                    <strong>{tAdmin('expiresOn', lang)} :</strong> {adminSession ? new Date(adminSession.expiresAt).toLocaleString(lang === 'de' ? 'de-DE' : 'fr-FR') : ''}
                  </p>
                  <p className="text-sm text-[#666666]">
                    {tAdmin('sessionExpiresWarning', lang)}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#251C17] mb-4">{tAdmin('systemSecurity', lang)}</h3>
                <div className="space-y-3 text-[#444444]">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{tAdmin('secureEmailAuth', lang)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{tAdmin('singleUseLinks', lang)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{tAdmin('tempSession', lang)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{tAdmin('noPasswordStored', lang)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{tAdmin('bruteForceProtection', lang)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#251C17] mb-4">{tAdmin('recommendations', lang)}</h3>
                <div className="space-y-3 text-[#444444]">
                  <p>• <strong>{tAdmin('neverShareLinks', lang)}</strong></p>
                  <p>• <strong>{tAdmin('closeBrowserAfterUse', lang)}</strong></p>
                  <p>• <strong>{tAdmin('usePrivateDevice', lang)}</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Manager Modal */}
      <HeroManager 
        isOpen={isHeroManagerOpen} 
        onClose={() => setIsHeroManagerOpen(false)} 
      />
    </div>
  );
} 