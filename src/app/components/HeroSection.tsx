'use client';

import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImage, setHeroImage] = useState('/images/hero/hero.jpg');

  useEffect(() => {
    setIsLoaded(true);
    
    // Charger l'image du hero depuis localStorage
    const savedData = localStorage.getItem('hero_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.heroImage) {
        setHeroImage(data.heroImage);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen bg-cover bg-center text-white overflow-hidden" 
      style={{ 
        backgroundImage: `url('${heroImage}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay avec effet de profondeur - Brun Cuir Fumé */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#251C17]/80 via-[#251C17]/60 to-[#251C17]/40 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Lignes décoratives simplifiées - Or Brossé */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#AA8C5B]/30 to-transparent transition-all duration-700 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}></div>
        <div className={`absolute top-3/4 right-0 w-32 h-px bg-gradient-to-l from-transparent via-[#AA8C5B]/30 to-transparent transition-all duration-700 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}></div>
      </div>

      {/* Contenu principal avec animations */}
      <div className="relative px-4 h-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-6xl mx-auto">
          {/* Titre principal avec police artisanale */}
          <h1 className={`text-7xl md:text-[10rem] font-[var(--font-cinzel)] font-black mb-8 tracking-wider transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
            <span className="bg-gradient-to-r from-white via-[#AA8C5B] to-white bg-clip-text text-transparent drop-shadow-lg">
              Leder Schmiede
            </span>
          </h1>

          {/* Nom avec style élégant et animation */}
          <div className={`mb-10 transition-all duration-500 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-3xl md:text-5xl font-[var(--font-cinzel)] font-medium text-white tracking-wider">
              Sarah Röttig
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#AA8C5B] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Boutons d'action simplifiés */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-500 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button 
              onClick={() => scrollToSection('services')}
              className="group px-10 py-5 bg-[#BF6C3E] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#AA8C5B]"
            >
              <span>Meine Leistungen</span>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="group px-10 py-5 border-2 border-[#AA8C5B]/50 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-[#AA8C5B]/10 hover:border-[#AA8C5B] transition-all duration-300 hover:scale-105"
            >
              <span className="group-hover:text-[#AA8C5B] transition-colors duration-300">Kontakt aufnehmen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transition fluide vers la section suivante - Crème de Lin */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF6ED]/80 via-[#FAF6ED]/40 to-transparent"></div>
      
      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#AA8C5B]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#AA8C5B]/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
