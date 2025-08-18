'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdminLang } from './AdminLangContext';

export default function AdminLangSelector() {
  const { lang, setLang } = useAdminLang();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(l => l.code === lang);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium">{currentLang?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#AA8C5B]/20 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setLang(language.code as 'fr' | 'de');
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#FAF6ED] transition-colors duration-200 ${
                lang === language.code ? 'bg-[#FAF6ED] text-[#BF6C3E]' : 'text-[#251C17]'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {lang === language.code && (
                <svg className="w-4 h-4 ml-auto text-[#BF6C3E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 