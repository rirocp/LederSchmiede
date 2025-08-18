'use client';

import React from 'react';
export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-[#FAF6ED]">
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
      
      <div className="px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-[var(--font-cinzel)] font-bold mb-4 text-[#251C17]">Kontaktieren Sie mich</h2>
          
          {/* Ligne décorative simple */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-8"></div>
          
          <p className="text-[#444444] mb-12 font-[var(--font-cormorant)] text-lg leading-relaxed">Haben Sie Fragen oder wünschen ein unverbindliches Angebot? Schreiben Sie mir eine Nachricht!</p>
        </div>
        
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#AA8C5B]/30">
          <form onSubmit={(e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.');
          }}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">Name</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">E-Mail</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50" />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">Nachricht</label>
              <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50 resize-none"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-[#BF6C3E] text-white px-8 py-4 rounded-full hover:bg-[#AA8C5B] transition-all duration-300 transform hover:scale-105 font-semibold w-full shadow-lg hover:shadow-xl">
                Nachricht Senden
              </button>
            </div>
          </form>
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
