'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function DatenschutzPage() {
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
                <span className="text-[#AA8C5B] font-medium">Datenschutz</span>
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

      {/* Hero Section */}
      <div className="relative py-16 lg:py-24 bg-[#FAF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6 leading-tight">
              Datenschutz
            </h1>
            
            {/* Ligne décorative */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#AA8C5B] to-transparent mx-auto mb-8"></div>
            
            <p className="text-xl lg:text-2xl font-[var(--font-cormorant)] text-[#444444] leading-relaxed max-w-3xl mx-auto">
              Ihre Privatsphäre ist uns wichtig. Hier erfahren Sie, wie wir Ihre Daten schützen und verarbeiten.
            </p>
          </div>
        </div>
      </div>

      {/* Section Contenu */}
      <div className="relative py-16 bg-[#FAF6ED]">
        {/* Démarcation supérieure */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#AA8C5B] to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8 lg:p-12">
            
            {/* 1. Verantwortlicher */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                1. Verantwortlicher für die Datenverarbeitung
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>
                  <strong>Leder Schmiede - Sarah Röttig</strong><br />
                  Industriegebiet 5<br />
                  66453 Gersheim<br />
                  Deutschland
                </p>
                <p>
                  <strong>Kontakt:</strong><br />
                  Telefon: 0151 46363797<br />
                  E-Mail: lederschmiede@gmx.net
                </p>
              </div>
            </section>

            {/* 2. Erhebung und Verarbeitung personenbezogener Daten */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                2. Erhebung und Verarbeitung personenbezogener Daten
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>
                  Wir erheben und verarbeiten personenbezogene Daten nur im notwendigen Umfang und ausschließlich für die folgenden Zwecke:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Zur Bearbeitung Ihrer Anfragen und Aufträge</li>
                  <li>Zur Kommunikation mit Ihnen</li>
                  <li>Zur Erfüllung gesetzlicher Verpflichtungen</li>
                  <li>Zur Verbesserung unserer Dienstleistungen</li>
                </ul>
              </div>
            </section>

            {/* 3. Arten der verarbeiteten Daten */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                3. Arten der verarbeiteten Daten
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>Wir verarbeiten folgende Arten von Daten:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Kontaktdaten:</strong> Name, E-Mail-Adresse, Telefonnummer, Adresse</li>
                  <li><strong>Auftragsdaten:</strong> Informationen zu Ihren Projekten und Anfragen</li>
                  <li><strong>Kommunikationsdaten:</strong> E-Mails, Nachrichten, Telefonate</li>
                  <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Informationen (bei Website-Nutzung)</li>
                </ul>
              </div>
            </section>

            {/* 4. Rechtsgrundlagen */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                4. Rechtsgrundlagen der Datenverarbeitung
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Bei freiwilliger Kontaktaufnahme</li>
                  <li><strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Zur Bearbeitung Ihrer Aufträge</li>
                  <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Zur Verbesserung unserer Dienstleistungen</li>
                  <li><strong>Gesetzliche Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO):</strong> Zur Erfüllung rechtlicher Pflichten</li>
                </ul>
              </div>
            </section>

            {/* 5. Speicherdauer */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                5. Speicherdauer
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>Ihre Daten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Kontaktdaten:</strong> Bis zur Beendigung der Geschäftsbeziehung oder Widerruf der Einwilligung</li>
                  <li><strong>Auftragsdaten:</strong> Mindestens 10 Jahre nach Abschluss des Auftrags (gesetzliche Aufbewahrungspflicht)</li>
                  <li><strong>Kommunikationsdaten:</strong> 3 Jahre nach letztem Kontakt</li>
                  <li><strong>Technische Daten:</strong> Maximal 30 Tage (bei Website-Nutzung)</li>
                </ul>
              </div>
            </section>

            {/* 6. Ihre Rechte */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                6. Ihre Rechte
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über die verarbeiteten Daten verlangen</li>
                  <li><strong>Berichtigungsrecht:</strong> Sie können falsche Daten berichtigen lassen</li>
                  <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                  <li><strong>Einschränkungsrecht:</strong> Sie können die Verarbeitung einschränken lassen</li>
                  <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung widersprechen</li>
                  <li><strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten Format erhalten</li>
                </ul>
              </div>
            </section>

            {/* 7. Kontakt */}
            <section className="mb-12">
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                7. Kontakt bei Fragen zum Datenschutz
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed space-y-4">
                <p>
                  Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden:
                </p>
                <div className="bg-[#FAF6ED] p-6 rounded-2xl border border-[#AA8C5B]/20">
                  <p className="font-semibold">Leder Schmiede - Sarah Röttig</p>
                  <p>E-Mail: lederschmiede@gmx.net</p>
                  <p>Telefon: 0151 46363797</p>
                </div>
              </div>
            </section>

            {/* 8. Änderungen */}
            <section>
              <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-6">
                8. Änderungen dieser Datenschutzerklärung
              </h2>
              <div className="text-[#444444] font-[var(--font-cormorant)] text-lg leading-relaxed">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Die jeweils aktuelle Version ist auf unserer Website verfügbar. Stand: {new Date().toLocaleDateString('de-DE')}
                </p>
              </div>
            </section>

          </div>
        </div>
        
        {/* Démarcation inférieure */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#AA8C5B] to-transparent"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 