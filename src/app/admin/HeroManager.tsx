'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface HeroData {
  heroImage: string;
  logoImage: string;
  aboutImage: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutButtonText: string;
}

interface HeroManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroManager({ isOpen, onClose }: HeroManagerProps) {
  const { lang } = useAdminLang();
  const [heroData, setHeroData] = useState<HeroData>({
    heroImage: '/images/hero/hero.jpg',
    logoImage: '',
    aboutImage: 'https://placehold.co/800x600/251C17/BF6C3E?text=Werkstatt',
    aboutTitle: 'Herzlich Willkommen bei Leder Schmiede',
    aboutParagraph1: 'Seit über 20 Jahren bin ich Ihre kompetente Ansprechpartnerin für hochwertige Sattler- und Polsterarbeiten. In meinem Meisterbetrieb verbinde ich traditionelles Handwerk mit modernen Techniken und Materialien, um individuelle Kundenwünsche zu erfüllen.',
    aboutParagraph2: 'Ob es um die Restauration eines Oldtimer-Innenraums, den Neubezug Ihrer Lieblingscouch oder eine maßgefertigte Motorradsitzbank geht – ich lege größten Wert auf Präzision, Langlebigkeit und Ästhetik.',
    aboutButtonText: 'Mehr über mich'
  });

  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const aboutFileInputRef = useRef<HTMLInputElement>(null);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('hero_data');
    if (savedData) {
      setHeroData(JSON.parse(savedData));
    }
  }, []);

  const handleHeroFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingHero(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setHeroData(prev => ({ ...prev, heroImage: result }));
        setIsUploadingHero(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingLogo(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setHeroData(prev => ({ ...prev, logoImage: result }));
        setIsUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingAbout(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setHeroData(prev => ({ ...prev, aboutImage: result }));
        setIsUploadingAbout(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sauvegarder dans localStorage
    localStorage.setItem('hero_data', JSON.stringify(heroData));
    
    // Déclencher un événement personnalisé pour mettre à jour le logo
    window.dispatchEvent(new CustomEvent('logoUpdated'));
    
    // Fermer le modal
    onClose();
    
    // Recharger la page pour appliquer les changements
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#AA8C5B]/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17]">
              {tAdmin('manageHomepage', lang)}
            </h2>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-[#251C17] transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Contenu */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section Hero */}
          <div className="space-y-6">
            <h3 className="text-xl font-[var(--font-cinzel)] font-bold text-[#251C17] border-b border-[#AA8C5B]/30 pb-2">
              {tAdmin('mainBackgroundImage', lang)}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#251C17] mb-3">
                {tAdmin('homepageBackgroundImage', lang)} *
              </label>
              
              {heroData.heroImage ? (
                <div className="relative">
                  <img 
                    src={heroData.heroImage} 
                    alt="Aperçu hero" 
                    className="w-full h-48 object-cover rounded-xl border-2 border-[#AA8C5B]/40"
                  />
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#251C17] p-2 rounded-lg hover:bg-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => heroFileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#AA8C5B]/50 rounded-xl p-8 text-center cursor-pointer hover:border-[#BF6C3E] transition-colors duration-300"
                >
                  {isUploadingHero ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto"></div>
                      <p className="text-[#666666]">{tAdmin('uploading', lang)}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <svg className="w-12 h-12 text-[#AA8C5B] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <div>
                        <p className="text-[#251C17] font-medium">{tAdmin('clickToSelectImage', lang)}</p>
                        <p className="text-sm text-[#666666] mt-1">{tAdmin('imageFormats', lang)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <input
                ref={heroFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleHeroFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Section Logo */}
          <div className="space-y-6">
            <h3 className="text-xl font-[var(--font-cinzel)] font-bold text-[#251C17] border-b border-[#AA8C5B]/30 pb-2">
              {tAdmin('companyLogo', lang)}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-[#251C17] mb-3">
                {tAdmin('companyLogoDesc', lang)}
              </label>
              
              {heroData.logoImage ? (
                <div className="relative">
                  <img 
                    src={heroData.logoImage} 
                    alt="Aperçu logo" 
                    className="w-32 h-32 object-contain rounded-xl border-2 border-[#AA8C5B]/40 bg-white"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      type="button"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="bg-white/90 backdrop-blur-sm text-[#251C17] p-2 rounded-lg hover:bg-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroData(prev => ({ ...prev, logoImage: '' }))}
                      className="bg-red-500/90 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                      title={tAdmin('removeLogo', lang)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => logoFileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#AA8C5B]/50 rounded-xl p-8 text-center cursor-pointer hover:border-[#BF6C3E] transition-colors duration-300 w-32 h-32 flex items-center justify-center"
                >
                  {isUploadingLogo ? (
                    <div className="space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BF6C3E] mx-auto"></div>
                      <p className="text-xs text-[#666666]">{tAdmin('upload', lang)}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <svg className="w-8 h-8 text-[#AA8C5B] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <div>
                        <p className="text-xs text-[#251C17] font-medium">{tAdmin('logo', lang)}</p>
                        <p className="text-xs text-[#666666]">{tAdmin('logoFormats', lang)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <input
                ref={logoFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoFileSelect}
                className="hidden"
              />
              
              <p className="text-xs text-[#666666] mt-2">
                {tAdmin('logoWillBeDisplayed', lang)}
              </p>
            </div>
          </div>

          {/* Section About Us */}
          <div className="space-y-6">
            <h3 className="text-xl font-[var(--font-cinzel)] font-bold text-[#251C17] border-b border-[#AA8C5B]/30 pb-2">
              {tAdmin('presentationSectionTitle', lang)}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image About */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-3">
                  {tAdmin('presentationImageDesc', lang)}
                </label>
                
                {heroData.aboutImage ? (
                  <div className="relative">
                    <img 
                      src={heroData.aboutImage} 
                      alt="Aperçu about" 
                      className="w-full h-48 object-cover rounded-xl border-2 border-[#AA8C5B]/40"
                    />
                    <button
                      type="button"
                      onClick={() => aboutFileInputRef.current?.click()}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#251C17] p-2 rounded-lg hover:bg-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => aboutFileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#AA8C5B]/50 rounded-xl p-8 text-center cursor-pointer hover:border-[#BF6C3E] transition-colors duration-300"
                  >
                    {isUploadingAbout ? (
                      <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto"></div>
                        <p className="text-[#666666]">{tAdmin('uploading', lang)}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <svg className="w-12 h-12 text-[#AA8C5B] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <div>
                          <p className="text-[#251C17] font-medium">{tAdmin('clickToSelectImage', lang)}</p>
                          <p className="text-sm text-[#666666] mt-1">{tAdmin('imageFormats', lang)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <input
                  ref={aboutFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAboutFileSelect}
                  className="hidden"
                />
              </div>

              {/* Texte About */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="aboutTitle" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('title', lang)} *
                  </label>
                  <input
                    id="aboutTitle"
                    type="text"
                    value={heroData.aboutTitle}
                    onChange={(e) => setHeroData(prev => ({ ...prev, aboutTitle: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('presentationTitle', lang)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="aboutParagraph1" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('firstParagraph', lang)} *
                  </label>
                  <textarea
                    id="aboutParagraph1"
                    value={heroData.aboutParagraph1}
                    onChange={(e) => setHeroData(prev => ({ ...prev, aboutParagraph1: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('firstParagraph', lang)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="aboutParagraph2" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('secondParagraph', lang)} *
                  </label>
                  <textarea
                    id="aboutParagraph2"
                    value={heroData.aboutParagraph2}
                    onChange={(e) => setHeroData(prev => ({ ...prev, aboutParagraph2: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('secondParagraph', lang)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="aboutButtonText" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('buttonText', lang)} *
                  </label>
                  <input
                    id="aboutButtonText"
                    type="text"
                    value={heroData.aboutButtonText}
                    onChange={(e) => setHeroData(prev => ({ ...prev, aboutButtonText: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('buttonText', lang)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-[#AA8C5B]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-[#AA8C5B]/30 text-[#251C17] rounded-xl hover:bg-[#AA8C5B]/10 transition-all duration-300 font-medium"
            >
              {tAdmin('cancel', lang)}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#BF6C3E] text-white rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              {tAdmin('save', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 