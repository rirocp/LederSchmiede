'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [galleryItems, setGalleryItems] = useState<Array<{src: string, description: string}>>([]);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('gallery_items');
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setGalleryItems(items);
    } else {
      // Données par défaut si rien n'est sauvegardé
      const defaultItems = [
        { src: "/images/gallery/innenausstattung-1.jpg", description: "Innenausstattung - Luxuriöse Fahrzeugpolster" },
        { src: "/images/gallery/sofa-1.jpg", description: "Sofa Restauration - Professionelle Wiederherstellung" },
        { src: "/images/gallery/sessel-1.jpg", description: "Sessel Arbeit - Individuelle Anpassungen" },
        { src: "/images/gallery/autositze-1.jpg", description: "Autositze - Neubezug und Reparatur" },
        { src: "/images/gallery/motorrad-1.jpg", description: "Motorradsitzbänke - Maßgefertigte Lösungen" },
        { src: "/images/gallery/couch-1.jpg", description: "Couch Restauration - Traditionelle Handwerkskunst" },
        { src: "/images/gallery/lenkrad-1.jpg", description: "Lenkrad - Individuelle Gestaltung" },
        { src: "/images/gallery/dachhimmel-1.jpg", description: "Dachhimmel - Komplette Innenausstattung" }
      ];
      setGalleryItems(defaultItems);
    }
  }, []);

  const galleryImages = galleryItems.map(item => item.src);
  const imageDescriptions = galleryItems.map(item => item.description);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="relative py-20 bg-[#FAF6ED]">
      {/* Démarcation supérieure simple */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div
          className="w-full h-1"
          style={{
            background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)",
            filter: "blur(0.5px)",
          }}
        ></div>
      </div>
      
      <div className="px-4 text-center relative">
        <h2 className="text-4xl font-[var(--font-cinzel)] font-bold mb-4 text-[#251C17]">Einblicke in meine Arbeit</h2>
        
        {/* Ligne décorative simple */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-8"></div>
        
        <p className="text-[#444444] mb-16 max-w-3xl mx-auto font-[var(--font-cormorant)] text-lg leading-relaxed">
          Bilder sagen mehr als tausend Worte. Verschaffen Sie sich einen Eindruck von meiner Arbeit und der Qualität meiner Ergebnisse.
        </p>
        
        {/* Carrousel principal */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Image principale */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Bordure luxueuse */}
            <div className="absolute -inset-2 bg-gradient-to-br from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] rounded-2xl opacity-20 blur-sm"></div>
            
                          <div className="relative">
                <img 
                  src={galleryImages[currentIndex]} 
                  alt={imageDescriptions[currentIndex]}
                  className="w-full aspect-[4/3] object-cover transition-all duration-700 ease-in-out"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src=galleryImages[currentIndex]; }}
                />
              
              {/* Overlay avec description */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#251C17]/80 via-[#251C17]/40 to-transparent p-6">
                <h3 className="text-white text-xl md:text-2xl font-[var(--font-cinzel)] font-semibold mb-2">
                  {imageDescriptions[currentIndex]}
                </h3>
                <p className="text-white/90 text-sm md:text-base font-[var(--font-cormorant)]">
                  {currentIndex + 1} von {galleryImages.length}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#251C17] p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
            aria-label="Vorheriges Bild"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-[#251C17] p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-10"
            aria-label="Nächstes Bild"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Bouton play/pause */}
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#251C17] p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10"
            aria-label={isAutoPlaying ? "Pause" : "Play"}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Indicateurs de navigation */}
        <div className="flex justify-center space-x-3 mb-12">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#BF6C3E] scale-125' 
                  : 'bg-[#AA8C5B]/40 hover:bg-[#AA8C5B]/60'
              }`}
              aria-label={`Gehe zu Bild ${index + 1}`}
            />
          ))}
        </div>

        {/* Miniatures */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-12 max-w-4xl mx-auto">
          {galleryImages.map((src, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-[#BF6C3E] scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              <img 
                src={src} 
                alt={`Miniatur ${index + 1}`}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-[#BF6C3E]/20"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/gallery"
            className="inline-block bg-[#BF6C3E] text-white px-8 py-4 rounded-full hover:bg-[#AA8C5B] transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Vollständige Galerie
          </Link>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block bg-transparent border-2 border-[#BF6C3E] text-[#BF6C3E] px-8 py-4 rounded-full hover:bg-[#BF6C3E] hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Kontakt aufnehmen
          </button>
        </div>
      </div>
      
      {/* Démarcation inférieure simple */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div
          className="w-full h-1"
          style={{
            background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)",
            filter: "blur(0.5px)",
          }}
        ></div>
      </div>
    </section>
  );
}
