'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ImageWithFallback from '../components/ImageWithFallback';
import Footer from '../components/Footer';
import { galleryData, getGalleryByCategory, getGalleryCategories, GalleryItem } from '../data/galleryData';

// Note: Métadonnées SEO gérées par le layout parent

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  
  // Utiliser les données statiques directement
  const filteredData = getGalleryByCategory(selectedCategory);
  const categories = getGalleryCategories();

  return (
    <div className="min-h-screen bg-[#FAF6ED]">
      {/* Header fixe avec navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#251C17]/95 backdrop-blur-sm border-b border-[#AA8C5B]/30">
        {/* Barre de contact supérieure */}
        <div className="bg-[#251C17] text-white text-xs py-3">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <a href="https://www.instagram.com/leder_schmiede?igsh=NWx5ZDA5MjBndm42&utm_source=qr" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-[#AA8C5B] transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
              </a>
            </div>
            <div className="flex items-center space-x-8">
              <a href="tel:+4915146363797" className="flex items-center space-x-2 hover:text-[#AA8C5B] transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span className="font-light tracking-wide">0151 46363797</span>
              </a>
              <a href="mailto:lederschmiede@gmx.net" className="flex items-center space-x-2 hover:text-[#AA8C5B] transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="font-light tracking-wide">lederschmiede@gmx.net</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation principale */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* Côté gauche - Bouton retour et indication de page */}
            <div className="flex items-center space-x-6">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 font-medium group"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Zurück</span>
              </Link>
              <div className="h-6 w-px bg-white/20"></div>
              <div className="flex items-center space-x-3">
                <span className="text-white/60 text-sm">Aktuell:</span>
                <span className="text-[#AA8C5B] font-medium">Galerie</span>
              </div>
            </div>

            {/* Côté droit - Navigation et boutons */}
            <div className="flex items-center space-x-8">
              {/* Navigation desktop */}
              <div className="hidden lg:flex space-x-8">
                <Link href="/#hero" className="text-white/90 hover:text-[#AA8C5B] transition-colors duration-300 font-medium">
                  Home
                </Link>
                <Link href="/#services" className="text-white/90 hover:text-[#AA8C5B] transition-colors duration-300 font-medium">
                  Leistungen
                </Link>
                <Link href="/#gallery" className="text-white/90 hover:text-[#AA8C5B] transition-colors duration-300 font-medium">
                  Galerie
                </Link>
                <Link href="/#about" className="text-white/90 hover:text-[#AA8C5B] transition-colors duration-300 font-medium">
                  Über Mich
                </Link>
              </div>
              
              {/* Boutons CTA */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/#services"
                  className="px-6 py-3 border-2 border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                >
                  Alle Services
                </Link>
                <Link
                  href="/#contact"
                  className="px-6 py-3 bg-[#BF6C3E] text-white rounded-full font-medium hover:bg-[#AA8C5B] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Kontakt
                </Link>
              </div>

              {/* Bouton menu mobile */}
              <button className="lg:hidden text-white hover:text-[#AA8C5B] transition-colors duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Espace pour le bandeau fixe */}
      <div className="pt-32"></div>

      {/* Hero Section Galerie */}
      <div className="relative py-16 lg:py-24 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6 leading-tight">
              Galerie
            </h1>
            
            {/* Ligne décorative */}
            <div className="w-32 h-1 mx-auto mb-8" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
            
            <p className="text-xl lg:text-2xl font-[var(--font-cormorant)] text-[#444444] leading-relaxed max-w-3xl mx-auto">
              Entdecken Sie meine handwerklichen Arbeiten. Jedes Projekt erzählt eine Geschichte von Qualität, 
              Tradition und Liebe zum Detail.
            </p>
          </div>
        </div>
      </div>

      {/* Section Galerie avec filtres */}
      <div className="relative py-16 bg-[#FAF6ED]">
        {/* Démarcation supérieure */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="w-full h-1" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres */}
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setSelectedCategory('Alle')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'Alle'
                    ? 'bg-[#BF6C3E] text-white'
                    : 'border-2 border-[#AA8C5B]/30 text-[#251C17] hover:bg-[#AA8C5B] hover:text-white'
                }`}
              >
                Alle
              </button>
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#BF6C3E] text-white'
                      : 'border-2 border-[#AA8C5B]/30 text-[#251C17] hover:bg-[#AA8C5B] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grille de la galerie */}
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredData.map((item, index) => (
                <div 
                  key={item.id}
                  className="group relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#AA8C5B]/20 hover:border-[#BF6C3E]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#BF6C3E]/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={item.src}
                      alt={item.description}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#BF6C3E]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-2 group-hover:text-[#BF6C3E] transition-colors duration-300">
                      {item.title || item.description}
                    </h3>
                    <p className="text-[#444444] font-[var(--font-cormorant)] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Élément décoratif */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#BF6C3E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-[#AA8C5B]/20 p-12">
                <h3 className="text-2xl font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
                  Keine Projekte in dieser Kategorie
                </h3>
                <p className="text-[#444444] font-[var(--font-cormorant)] text-lg mb-6">
                  Für die Kategorie &quot;{selectedCategory}&quot; sind noch keine Projekte verfügbar.
                </p>
                <button 
                  onClick={() => setSelectedCategory('Alle')}
                  className="px-6 py-3 bg-[#BF6C3E] text-white rounded-full font-medium hover:bg-[#AA8C5B] transition-all duration-300"
                >
                  Alle Projekte anzeigen
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Démarcation inférieure */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="w-full h-1" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
        </div>
      </div>

      {/* Section CTA */}
      <div className="relative py-24 bg-[#FAF6ED]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            {/* Fond avec effets */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,108,62,0.1),transparent_70%)] rounded-3xl"></div>
            
            {/* Contenu */}
            <div className="relative p-12 lg:p-16">
              <h3 className="text-3xl lg:text-4xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                Haben Sie ein ähnliches Projekt?
              </h3>
              <p className="text-xl text-[#444444] font-[var(--font-cormorant)] mb-10 max-w-3xl mx-auto leading-relaxed">
                Lassen Sie mich gemeinsam mit Ihnen Ihr individuelles Vorhaben besprechen und umsetzen. 
                Jedes Projekt ist einzigartig und verdient meine volle Aufmerksamkeit.
              </p>
              
              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/#contact"
                  className="px-10 py-5 bg-[#BF6C3E] text-white rounded-2xl font-medium text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#BF6C3E]/25 hover:bg-[#AA8C5B]"
                >
                  <span className="flex items-center">
                    Kontakt aufnehmen
                    <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </Link>
                
                <Link
                  href="/#services"
                  className="px-10 py-5 border-2 border-[#AA8C5B] text-[#251C17] rounded-2xl font-medium text-xl hover:bg-[#AA8C5B] hover:text-white transition-all duration-300"
                >
                  <span>Alle Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 