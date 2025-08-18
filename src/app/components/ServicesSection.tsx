'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';

interface SubService {
  id: string;
  title: string;
  description?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  ctaText: string;
  ctaLink: string;
  slug?: string;
  details?: SubService[];
  longDescription?: string;
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  // Charger les services depuis localStorage
  useEffect(() => {
    const loadServices = () => {
      const savedServices = localStorage.getItem('services_data');
      console.log('Services chargés depuis localStorage:', savedServices);
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        console.log('Services parsés:', parsedServices);
        setServices(parsedServices);
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
            slug: "innenausstattung",
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
          },
          {
            id: "reparaturen",
            title: "Reparaturen aller Art",
            description: "Professionelle Reparatur und Restauration von Polstermöbeln - ich gebe Ihren Lieblingsstücken ein zweites Leben mit handwerklicher Perfektion.",
            imageSrc: "/images/services/service-reparatur.jpg",
            altText: "Handwerker bei der sorgfältigen Reparatur eines Polstermöbels",
            ctaText: "Reparatur anfragen",
            ctaLink: "/services/reparaturen",
            longDescription: "Meine Reparaturarbeiten umfassen die professionelle Wiederherstellung und Restauration von Polstermöbeln aller Art. Mit jahrelanger Erfahrung und handwerklicher Perfektion gebe ich Ihren Lieblingsstücken ein zweites Leben.",
            details: [
              { id: "sessel", title: "Sessel" },
              { id: "sofa-couchs", title: "Sofa und Couchs" },
              { id: "stuehle", title: "Stühle" }
            ]
          },
          {
            id: "individuelle-anpassungen",
            title: "Individuelle Anpassungen",
            description: "Maßgeschneiderte Lösungen nach Ihren individuellen Wünschen - von der ersten Skizze bis zum fertigen Unikat, gefertigt mit Liebe zum Detail.",
            imageSrc: "/images/services/service-massanfertigung.jpg",
            altText: "Maßgeschneiderte Polsterarbeiten in verschiedenen Stadien der Fertigung",
            ctaText: "Unikat planen",
            ctaLink: "/services/individuelle-anpassungen",
            longDescription: "Jedes Projekt ist einzigartig. Von der ersten Idee bis zur Fertigstellung arbeite ich eng mit Ihnen zusammen, um maßgeschneiderte Lösungen zu entwickeln, die genau Ihren Vorstellungen entsprechen.",
            details: [
              { id: "massanfertigungen", title: "Individuelle Anpassungen und Sonderanfertigungen" }
            ]
          },
          {
            id: "motorradsitzbaenke",
            title: "Motorradsitzbänke",
            description: "Maßgefertigte Sitzbänke für Motorräder aller Marken - optimaler Komfort und individuelle Gestaltung für Ihre einzigartige Fahrt.",
            imageSrc: "/images/services/service-motorrad.jpg",
            altText: "Maßgefertigte Motorradsitzbank mit hochwertiger Verarbeitung",
            ctaText: "Sitzbank konfigurieren",
            ctaLink: "/services/motorradsitzbaenke",
            longDescription: "Ich spezialisiere mich auf die Herstellung maßgefertigter Motorradsitzbänke für alle Marken und Modelle. Jede Sitzbank wird individuell angepasst für optimalen Komfort und Ihre persönlichen Vorlieben.",
            details: [
              { id: "auf-ab-polstern", title: "Auf- und Ab- polstern" },
              { id: "schaumstoff-anpassen", title: "Schaumstoff anpassen im Härtegrad" },
              { id: "bezuege-umaendern", title: "Bezüge umändern auf Wunschvorstellung" }
            ]
          },
          {
            id: "fahrzeugsattlerei",
            title: "Fahrzeugsattlerei",
            description: "Neubezug und Reparatur von Autositzen und Fahrzeugpolstern - ich verwandle Ihr Fahrzeug mit handwerklicher Meisterschaft.",
            imageSrc: "/images/services/service-autositze.jpg",
            altText: "Neubezogene Autositze mit edlem Leder und perfekter Verarbeitung",
            ctaText: "Sitze renovieren",
            ctaLink: "/services/fahrzeugsattlerei",
            longDescription: "Meine Fahrzeugsattlerei umfasst den kompletten Neubezug und die Reparatur von Autositzen und Fahrzeugpolstern. Mit handwerklicher Meisterschaft verwandle ich Ihr Fahrzeug in ein einzigartiges Schmuckstück.",
            details: [
              { id: "polster-moebel", title: "Polster und Bezüge Möbel und Kleinmöbel" }
            ]
          }
        ];
        setServices(defaultServices);
      }
    };

    loadServices();

    // Écouter les changements de localStorage
    const handleStorageChange = () => {
      loadServices();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Écouter les événements personnalisés pour les changements de services
    window.addEventListener('servicesUpdated', loadServices);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('servicesUpdated', loadServices);
    };
  }, []);

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
