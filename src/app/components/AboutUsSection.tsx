'use client';

import React from 'react';
import { aboutData } from '../data/aboutData';

export default function AboutUsSection() {
  return (
    <section id="about" className="relative py-20">
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
      
      <div className="relative px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              {/* Bordure luxueuse subtile autour de l'image */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] rounded-2xl opacity-15 blur-sm"></div>
              <div className="relative bg-white p-2 rounded-xl shadow-2xl">
                <img 
                  src={aboutData.image} 
                  alt="Werkstatt der Leder Schmiede" 
                  className="rounded-lg w-full"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/800x600/251C17/BF6C3E?text=Werkstatt'; }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#251C17]/20 to-transparent rounded-xl"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-[var(--font-cinzel)] font-bold mb-6 text-[#251C17]">{aboutData.title}</h2>
            
            {/* Ligne décorative simple */}
            <div className="w-32 h-0.5 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mb-8"></div>
            
            <p className="text-[#444444] mb-6 font-[var(--font-cormorant)] text-lg leading-relaxed">
              {aboutData.paragraph1}
            </p>
            <p className="text-[#444444] mb-8 font-[var(--font-cormorant)] text-lg leading-relaxed">
              {aboutData.paragraph2}
            </p>
            
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-[#BF6C3E] text-white px-8 py-4 rounded-full hover:bg-[#AA8C5B] transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
            >
              {aboutData.buttonText}
            </button>
          </div>
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
