'use client';

import React, { useState, useEffect } from 'react';
import { InstagramIcon, PhoneIcon, MailIcon } from './IconAssets';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoData, setLogoData] = useState<{ logoImage: string }>({ logoImage: '' });
  const pathname = usePathname();

  // Vérifier si on est sur une page de service individuelle
  const isServiceDetailPage = pathname?.startsWith('/services/') && pathname !== '/services';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Charger les données du logo depuis localStorage
  useEffect(() => {
    const loadLogoData = () => {
      const savedHeroData = localStorage.getItem('hero_data');
      if (savedHeroData) {
        try {
          const heroData = JSON.parse(savedHeroData);
          setLogoData({ logoImage: heroData.logoImage || '' });
        } catch (error) {
          console.error('Erreur lors du chargement du logo:', error);
        }
      }
    };

    loadLogoData();

    // Écouter les changements de localStorage
    const handleStorageChange = () => {
      loadLogoData();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Écouter les événements personnalisés pour les changements de logo
    window.addEventListener('logoUpdated', loadLogoData);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logoUpdated', loadLogoData);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-[#251C17]/95 backdrop-blur-sm shadow-lg border-b border-[#AA8C5B]/30">
      {/* Barre de contact supérieure */}
      <div className="transition-all duration-300 bg-[#251C17]/90 text-white text-xs py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            
            <a href="https://www.instagram.com/leder_schmiede?igsh=NWx5ZDA5MjBndm42&utm_source=qr" target="_blank" rel="noopener noreferrer" 
               className="hover:text-[#AA8C5B] transition-colors duration-300">
              <InstagramIcon />
            </a>
          </div>
          <div className="flex items-center space-x-8">
            <a href="tel:+4915146363797" className="flex items-center space-x-2 hover:text-[#AA8C5B] transition-colors duration-300">
              <PhoneIcon className="w-4 h-4" />
              <span className="font-light tracking-wide">0151 46363797</span>
            </a>
            <a href="mailto:lederschmiede@gmx.net" className="flex items-center space-x-2 hover:text-[#AA8C5B] transition-colors duration-300">
              <MailIcon className="w-4 h-4" />
              <span className="font-light tracking-wide">lederschmiede@gmx.net</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="transition-all duration-300 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo et nom - masqués sur les pages de services */}
          {!isServiceDetailPage && (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center"
              >
                {logoData.logoImage ? (
                  <div className="transition-all duration-300 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-sm border border-[#BF6C3E]/30 overflow-hidden bg-white">
                    <img 
                      src={logoData.logoImage} 
                      alt="Leder Schmiede Logo" 
                      className="transition-all duration-300 w-10 h-10 object-contain"
                    />
                  </div>
                ) : (
                  <div className="transition-all duration-300 w-12 h-12 bg-[#AA8C5B] rounded-2xl flex items-center justify-center text-white font-bold shadow-xl backdrop-blur-sm border border-[#BF6C3E]/30">
                    <span className="transition-all duration-300 text-lg drop-shadow-lg">LS</span>
                  </div>
                )}
              </button>
              <div className="hidden sm:block">
                <div className="font-[var(--font-cinzel)] font-bold leading-tight transition-all duration-300 text-white text-lg">
                  Leder Schmiede
                </div>
                <div className="font-[var(--font-cormorant)] transition-all duration-300 text-[#AA8C5B] text-xs">
                  Fahrzeugsattlerin Sarah Röttig
                </div>
              </div>
            </div>
          )}

          {/* Navigation desktop */}
          <ul className="hidden lg:flex space-x-10 items-center">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'services', label: 'Leistungen' },
              { id: 'gallery', label: 'Galerie' },
              { id: 'about', label: 'Über Mich' }
            ].map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className={`font-[var(--font-cinzel)] font-medium transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-white hover:text-[#AA8C5B]' 
                      : 'text-white hover:text-[#AA8C5B]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#BF6C3E] text-white px-8 py-3 rounded-full hover:bg-[#AA8C5B] transition-all duration-300 font-[var(--font-cinzel)] font-medium shadow-xl backdrop-blur-sm border border-[#AA8C5B]/30 hover:shadow-2xl"
              >
                Kontakt
              </button>
            </li>
          </ul>

          {/* Bouton menu mobile */}
          <button 
            className={`lg:hidden transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            } hover:text-[#AA8C5B]`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden transition-all duration-300 bg-[#251C17]/95 border-t border-[#AA8C5B]/30">
            <ul className="px-6 py-6 space-y-4">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'services', label: 'Leistungen' },
                { id: 'gallery', label: 'Galerie' },
                { id: 'about', label: 'Über Mich' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-3 font-[var(--font-cinzel)] font-medium transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-white hover:text-[#AA8C5B]' 
                        : 'text-white hover:text-[#AA8C5B]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-left py-3 bg-[#BF6C3E] text-white rounded-full hover:bg-[#AA8C5B] transition-all duration-300 font-[var(--font-cinzel)] font-medium shadow-xl backdrop-blur-sm border border-[#AA8C5B]/30"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
