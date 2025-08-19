'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData, Service } from '../data/servicesData';

export default function ServicesSection() {
  // Utiliser les données statiques directement
  const services = servicesData;

  return (
    <section id="services" className="relative min-h-screen">
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
      
      {/* Background avec la nouvelle palette artisanale */}
      <div className="absolute inset-0 bg-[#FAF6ED]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(191,108,62,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(170,140,91,0.05),transparent_50%)]"></div>
      
      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header avec design moderne */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6 leading-tight">
            Meine Leistungen
          </h2>
          
          {/* Ligne décorative simple */}
          <div className="w-32 h-1 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-8"></div>
          
          <p className="text-lg lg:text-xl font-[var(--font-cormorant)] text-[#444444] leading-relaxed max-w-3xl mx-auto">
            Ich biete Ihnen ein breites Spektrum an Sattler- und Polsterarbeiten. 
            Qualität und traditionelle Handwerkskunst stehen bei mir an erster Stelle.
          </p>
        </div>

        {/* Grille de services dynamique */}
        <div className="space-y-12">
          {/* Affichage de tous les services en grille responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service: Service, index: number) => (
              <div 
                key={service.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Section CTA finale avec design premium */}
        <div className="text-center mt-16">
          <div className="relative">
            {/* Fond avec effets */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,108,62,0.1),transparent_70%)] rounded-3xl"></div>
            
            {/* Contenu */}
            <div className="relative p-12 lg:p-16">
              <h3 className="text-3xl lg:text-4xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                Haben Sie ein spezielles Projekt?
              </h3>
              <p className="text-xl text-[#444444] font-[var(--font-cormorant)] mb-10 max-w-3xl mx-auto leading-relaxed">
                Lassen Sie mich gemeinsam mit Ihnen Ihr individuelles Vorhaben besprechen und umsetzen. 
                Jedes Projekt ist einzigartig und verdient meine volle Aufmerksamkeit.
              </p>
              
              {/* Boutons CTA modernes */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-10 py-5 bg-[#BF6C3E] text-white rounded-2xl font-medium text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#BF6C3E]/25 hover:bg-[#AA8C5B]"
                >
                  Persönliche Beratung
                </button>
                
                <button
                  onClick={() => {
                    const element = document.getElementById('gallery');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-10 py-5 border-2 border-[#AA8C5B] text-[#251C17] rounded-2xl font-medium text-xl hover:bg-[#AA8C5B] hover:text-white transition-all duration-300"
                >
                  Galerie ansehen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Éléments décoratifs flottants subtils */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#BF6C3E] to-[#AA8C5B] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#AA8C5B] to-[#BF6C3E] rounded-full opacity-5 blur-3xl"></div>
      
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
