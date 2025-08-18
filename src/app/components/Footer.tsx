'use client';

import React from 'react';
import Link from 'next/link';
import { MapPinIcon, PhoneIcon, MailIcon, FacebookIcon, InstagramIcon } from './IconAssets';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <footer className="bg-[#251C17] text-white pt-16 pb-8">
      <div className="px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="text-xl font-[var(--font-cinzel)] font-semibold mb-6 text-[#AA8C5B]">Leder Schmiede</h4>
            <p className="text-sm text-white mb-4 font-[var(--font-cormorant)]">Sarah Röttig</p>
            <div className="flex items-start space-x-3 mb-4">
              <MapPinIcon className="w-5 h-5 mt-1 text-[#AA8C5B] flex-shrink-0" />
              <span className="text-white">Industriegebiet 5<br />66453 Gersheim</span>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <a href="tel:+4915146363797" className="flex items-center space-x-3 hover:text-[#AA8C5B] transition-colors">
                <PhoneIcon className="w-5 h-5 text-[#AA8C5B]" />
                <span className="text-white">0151 46363797</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <a href="mailto:lederschmiede@gmx.net" className="flex items-center space-x-3 hover:text-[#AA8C5B] transition-colors">
                <MailIcon className="w-5 h-5 text-[#AA8C5B]" />
                <span className="text-white">lederschmiede@gmx.net</span>
              </a>
            </div>
            <p className="text-sm text-white/80 mt-4 font-[var(--font-cormorant)]">Termin nach Anfrage</p>
          </div>
          <div>
            <h4 className="text-xl font-[var(--font-cinzel)] font-semibold mb-6 text-[#AA8C5B]">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">
                  Leistungen
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">
                  Galerie
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">
                  Über Mich
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-[var(--font-cinzel)] font-semibold mb-6 text-[#AA8C5B]">Rechtliches</h4>
            <ul className="space-y-3 mb-8">
              <li><a href="#" className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">Impressum</a></li>
              <li><Link href="/datenschutz" className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">Datenschutz</Link></li>
                              <li><Link href="/admin/secure" className="text-white hover:text-[#AA8C5B] transition-colors font-[var(--font-cormorant)]">Administration</Link></li>
            </ul>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#AA8C5B] transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/leder_schmiede?igsh=NWx5ZDA5MjBndm42&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#AA8C5B] transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#AA8C5B]/30 pt-8 text-center">
          <p className="text-sm text-white/80 font-[var(--font-cormorant)]">&copy; {new Date().getFullYear()} Leder Schmiede - Sarah Röttig. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
