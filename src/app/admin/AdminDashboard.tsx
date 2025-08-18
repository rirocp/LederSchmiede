'use client';

import React, { useState } from 'react';
import GalleryManager from './GalleryManager';
import AdminLangSelector from './components/AdminLangSelector';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('gallery');
  const { lang } = useAdminLang();

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
              <span className="text-[#AA8C5B] font-medium">{tAdmin('gallery', lang)}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                target="_blank"
                className="text-white/80 hover:text-[#AA8C5B] transition-colors duration-300 font-medium"
              >
                {tAdmin('viewSite', lang)}
              </a>
              <AdminLangSelector />
              <button
                onClick={onLogout}
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
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                activeTab === 'settings'
                  ? 'border-[#BF6C3E] text-[#251C17]'
                  : 'border-transparent text-[#444444] hover:text-[#251C17]'
              }`}
            >
              ⚙️ {tAdmin('settings', lang)}
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'gallery' && <GalleryManager />}
        
        {activeTab === 'settings' && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8">
            <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
              {tAdmin('settings', lang)}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[#251C17] mb-4">{tAdmin('loginInfo', lang)}</h3>
                <div className="bg-[#FAF6ED] p-4 rounded-xl border border-[#AA8C5B]/20">
                  <p className="text-[#444444] mb-2">
                    <strong>{tAdmin('adminUrl', lang)} :</strong> https://votre-site.com/admin
                  </p>
                  <p className="text-[#444444] mb-2">
                    <strong>{tAdmin('currentCredentials', lang)} :</strong> admin / lederschmiede2024
                  </p>
                  <p className="text-sm text-[#666666]">
                    {tAdmin('securityWarning', lang)}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#251C17] mb-4">{tAdmin('help', lang)}</h3>
                <div className="space-y-3 text-[#444444]">
                  <p>• <strong>{tAdmin('addPhoto', lang)} :</strong> {tAdmin('addPhotoHelp', lang)}</p>
                  <p>• <strong>{tAdmin('editPhoto', lang)} :</strong> {tAdmin('editPhotoHelp', lang)}</p>
                  <p>• <strong>{tAdmin('deletePhoto', lang)} :</strong> {tAdmin('deletePhotoHelp', lang)}</p>
                  <p>• <strong>{tAdmin('reorder', lang)} :</strong> {tAdmin('reorderHelp', lang)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 