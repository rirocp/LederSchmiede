'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWithFallback from '../../components/ImageWithFallback';
import { Service } from '../../data/servicesData';

// Fonction pour obtenir l'icône du service
function getServiceIcon(title: string) {
  const iconMap: { [key: string]: React.JSX.Element } = {
    'Sitze & Polster': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ),
    'Armaturen': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    'Dachhimmel': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
      </svg>
    ),
    'Sonnenblenden': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    ),
    'Lenkräder': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    ),
    'Verkleidungen': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
      </svg>
    ),
    'Teppiche': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
    ),
    'Fußmatten': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
    ),
    'Schaltsack': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
      </svg>
    ),
    'Pflege und Reinigung': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    'Taschen': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
      </svg>
    ),
    'Gürtel': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    'Portemonnaies': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
    ),
    'Handschuhe': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"></path>
      </svg>
    ),
    'Möbel': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>
    ),
    'Dekoration': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      </svg>
    ),
    'Reparaturen': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    'Restaurierung': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    ),
    'Beratung': (
      <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  };

  return iconMap[title] || (
    <svg className="w-10 h-10 text-[#AA8C5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  );
}

interface ServicePageContentProps {
  slug: string;
}

export default function ServicePageContent({ slug }: ServicePageContentProps) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les services depuis localStorage
  useEffect(() => {
    const loadService = () => {
      const savedServices = localStorage.getItem('services_data');
      console.log('ServicePageContent - Services chargés:', savedServices);
      
      if (savedServices) {
        const services = JSON.parse(savedServices);
        // Chercher par slug d'abord, puis par id comme fallback
        const foundService = services.find((s: Service) => 
          (s.slug && s.slug === slug) || s.id === slug
        );
        console.log('ServicePageContent - Recherche pour slug:', slug);
        console.log('ServicePageContent - Service trouvé:', foundService);
        setService(foundService || null);
      } else {
        // Données par défaut si rien n'est sauvegardé
        const defaultServices: Service[] = [
          {
            id: "innenausstattung",
            title: "Innenausstattung",
            description: "Komplette Innenausstattung für Fahrzeuge aller Art - von der Planung bis zur Fertigstellung mit hochwertigen Materialien und traditioneller Handwerkskunst.",
            imageSrc: "/images/services/service-interieur-auto.jpg",
            altText: "Luxuriöse Innenausstattung eines Fahrzeugs mit hochwertigen Lederpolstern",
            ctaText: "Beratung anfragen",
            ctaLink: "/services/innenausstattung",
            longDescription: "Ich biete eine vollständige Innenausstattung für alle Fahrzeugtypen. Von der ersten Beratung bis zur finalen Fertigstellung verwende ich ausschließlich hochwertige Materialien und traditionelle Handwerkstechniken.",
            details: [
              { id: "sitze-polster", title: "Sitze & Polster" },
              { id: "armaturen", title: "Armaturen" },
              { id: "dachhimmel", title: "Dachhimmel" },
              { id: "sonnenblenden", title: "Sonnenblenden" },
              { id: "lenkraeder", title: "Lenkräder" },
              { id: "verkleidungen", title: "Verkleidungen" },
              { id: "teppiche", title: "Teppiche" },
              { id: "fussmatten", title: "Fußmatten" },
              { id: "schaltsack", title: "Schaltsack" },
              { id: "pflege-reinigung", title: "Pflege und Reinigung" }
            ]
          }
        ];
        
        const foundService = defaultServices.find(s => s.id === slug);
        setService(foundService || null);
      }
      setIsLoading(false);
    };

    loadService();

    // Écouter les mises à jour des services
    const handleServicesUpdate = () => {
      console.log('ServicePageContent - Mise à jour détectée');
      loadService();
    };

    window.addEventListener('servicesUpdated', handleServicesUpdate);
    return () => window.removeEventListener('servicesUpdated', handleServicesUpdate);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#AA8C5B] mx-auto"></div>
          <p className="mt-4 text-[#251C17] font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#251C17] mb-4">Service non trouvé</h1>
          <p className="text-[#666666] mb-6">Le service demandé n'existe pas.</p>
          <Link href="/" className="px-6 py-3 bg-[#BF6C3E] text-white rounded-lg hover:bg-[#AA8C5B] transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6ED]">
      {/* Nouveau bandeau de navigation pour les services */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#251C17]/95 backdrop-blur-sm border-b border-[#AA8C5B]/30">
        {/* Barre de contact supérieure */}
        <div className="bg-[#251C17] text-white text-xs py-3">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-[#AA8C5B] transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
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
                <span className="text-[#AA8C5B] font-medium">{service.title}</span>
                

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
      <div className="pt-16"></div>

      {/* Hero Section avec fond crème */}
      <div className="relative overflow-hidden bg-[#FAF6ED]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image avec effets modernes */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                <ImageWithFallback
                  src={service.imageSrc}
                  alt={service.altText}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority={true}
                />
                {/* Overlay élégant */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#BF6C3E]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#BF6C3E] to-[#AA8C5B] rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#AA8C5B] to-[#BF6C3E] rounded-full opacity-10 blur-2xl"></div>
            </div>

            {/* Contenu avec typographie moderne */}
            <div className="space-y-12">
              <div className="space-y-8">
                {/* Titre principal */}
                <h1 className="text-5xl lg:text-7xl font-[var(--font-cinzel)] font-bold text-[#251C17] leading-tight">
                  {service.title}
                </h1>
                
                {/* Ligne décorative animée */}
                <div className="relative">
                  <div className="w-32 h-1" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
                  <div className="absolute top-0 left-0 w-32 h-1 animate-pulse" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
                </div>
                
                {/* Description élégante */}
                <p className="text-xl lg:text-2xl font-[var(--font-cormorant)] text-[#444444] leading-relaxed max-w-2xl">
                  {service.longDescription}
                </p>
              </div>

              {/* CTA moderne */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/#contact"
                  className="group px-8 py-4 bg-[#BF6C3E] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#AA8C5B]"
                >
                  <span>{service.ctaText}</span>
                </Link>
                
                <Link
                  href="/#services"
                  className="group px-8 py-4 border-2 border-[#AA8C5B]/50 text-[#251C17] rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-[#AA8C5B]/10 hover:border-[#AA8C5B] transition-all duration-300 hover:scale-105"
                >
                  <span className="group-hover:text-[#AA8C5B] transition-colors duration-300">Alle Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Services Details - Design sobre et élégant */}
      {service.details && service.details.length > 0 && (
        <div className="relative py-16 bg-[#FAF6ED]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Grille de services avec visuels attrayants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.details.map((detail) => (
                <div
                  key={detail.id}
                  className="group bg-white rounded-xl overflow-hidden border border-[#AA8C5B]/30 hover:border-[#AA8C5B]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                  {/* Section visuelle */}
                  <div className="relative h-48 bg-gradient-to-br from-[#AA8C5B]/10 to-[#BF6C3E]/10">
                    {detail.imageSrc ? (
                      <div className="relative w-full h-full">
                        <ImageWithFallback
                          src={detail.imageSrc}
                          alt={detail.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#AA8C5B]/20 to-[#BF6C3E]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {getServiceIcon(detail.title)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-3 group-hover:text-[#BF6C3E] transition-colors duration-300">
                      {detail.title}
                    </h3>
                    {detail.description && (
                      <p className="text-[#444444] font-[var(--font-cormorant)] leading-relaxed text-sm">
                        {detail.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section CTA finale avec fond crème */}
      <div className="relative py-24 bg-[#FAF6ED]">
        {/* Démarcation supérieure simple */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="w-full h-1" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                <Link
                  href="/#contact"
                  className="px-10 py-5 bg-[#BF6C3E] text-white rounded-2xl font-medium text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#BF6C3E]/25 hover:bg-[#AA8C5B]"
                >
                  <span className="flex items-center">
                    Persönliche Beratung
                    <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </Link>
                
                <Link
                  href="/#services"
                  className="px-10 py-5 border-2 border-[#AA8C5B] text-[#251C17] rounded-2xl font-medium text-xl hover:bg-[#AA8C5B] hover:text-white transition-all duration-300"
                >
                  <span>Galerie ansehen</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Démarcation inférieure simple */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="w-full h-1" style={{background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)", filter: "blur(0.5px)"}}></div>
        </div>
      </div>
    </div>
  );
} 