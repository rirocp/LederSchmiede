'use client';

import React, { useState, useEffect } from 'react';
import ServiceUploader from './ServiceUploader';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface SubService {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  ctaText: string;
  ctaLink: string;
  details?: SubService[];
  longDescription?: string;
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { lang } = useAdminLang();

  // Charger les services depuis localStorage ou données par défaut
  useEffect(() => {
    const savedServices = localStorage.getItem('services_data');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Données par défaut
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
      localStorage.setItem('services_data', JSON.stringify(defaultServices));
    }
    setIsLoading(false);
  }, []);

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setIsAddingNew(false);
    setShowImageUploader(true);
  };

  const handleAddNewService = () => {
    setEditingService(null);
    setIsAddingNew(true);
    setShowImageUploader(true);
  };

  const handleSaveService = (updatedService: Service) => {
    if (isAddingNew) {
      // Ajouter un nouveau service
      const newServices = [...services, updatedService];
      setServices(newServices);
      localStorage.setItem('services_data', JSON.stringify(newServices));
    } else {
      // Modifier un service existant
      const updatedServices = services.map(service => 
        service.id === updatedService.id ? updatedService : service
      );
      setServices(updatedServices);
      localStorage.setItem('services_data', JSON.stringify(updatedServices));
    }
    setShowImageUploader(false);
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setShowImageUploader(false);
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleReorderServices = (fromIndex: number, toIndex: number) => {
    const newServices = [...services];
    const [movedService] = newServices.splice(fromIndex, 1);
    newServices.splice(toIndex, 0, movedService);
    setServices(newServices);
    localStorage.setItem('services_data', JSON.stringify(newServices));
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm(tAdmin('confirmDeleteService', lang))) {
      const updatedServices = services.filter(service => service.id !== serviceId);
      setServices(updatedServices);
      localStorage.setItem('services_data', JSON.stringify(updatedServices));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BF6C3E]"></div>
      </div>
    );
  }

  if (showImageUploader && editingService) {
    return (
      <ServiceUploader
        isOpen={showImageUploader}
        onClose={handleCancelEdit}
        onSave={handleSaveService}
        editingItem={editingService}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17]">
          {tAdmin('serviceManagement', lang)}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-[#666666]">
            {services.length} {tAdmin('service', lang)}{services.length > 1 ? 's' : ''} {tAdmin('configured', lang)}
          </div>
          <button
            onClick={handleAddNewService}
            className="bg-[#BF6C3E] text-white px-4 py-2 rounded-lg hover:bg-[#AA8C5B] transition-all duration-300 text-sm font-medium flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>{tAdmin('addService', lang)}</span>
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-6">
        <div className="grid gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-[#FAF6ED] rounded-2xl border border-[#AA8C5B]/20 p-6 hover:border-[#BF6C3E]/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#AA8C5B]/20">
                    <img
                      src={service.imageSrc}
                      alt={service.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17]">
                      {service.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {/* Boutons de réorganisation */}
                      {index > 0 && (
                        <button
                          onClick={() => handleReorderServices(index, index - 1)}
                          className="p-1 text-[#AA8C5B] hover:text-[#BF6C3E] transition-colors"
                          title={tAdmin('moveUp', lang)}
                        >
                          ↑
                        </button>
                      )}
                      {index < services.length - 1 && (
                        <button
                          onClick={() => handleReorderServices(index, index + 1)}
                          className="p-1 text-[#AA8C5B] hover:text-[#BF6C3E] transition-colors"
                          title={tAdmin('moveDown', lang)}
                        >
                          ↓
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[#444444] text-sm mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  
                                     <div className="flex items-center justify-between">
                     <div className="text-xs text-[#666666]">
                       CTA: &quot;{service.ctaText}&quot;
                     </div>
                     
                     <div className="flex items-center space-x-2">
                       <button
                         onClick={() => handleEditService(service)}
                         className="bg-[#BF6C3E] text-white px-4 py-2 rounded-lg hover:bg-[#AA8C5B] transition-all duration-300 text-sm font-medium"
                       >
                         {tAdmin('edit', lang)}
                       </button>
                       <button
                         onClick={() => handleDeleteService(service.id)}
                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm font-medium"
                         title={tAdmin('deleteService', lang)}
                       >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                         </svg>
                       </button>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

            <div className="bg-[#FAF6ED] border border-[#AA8C5B]/30 rounded-xl p-4">
        <h3 className="text-sm font-medium text-[#251C17] mb-2">{tAdmin('tips', lang)}</h3>
        <ul className="text-xs text-[#444444] space-y-1">
          <li>• {tAdmin('tipsEditService', lang)}</li>
          <li>• {tAdmin('tipsReorder', lang)}</li>
          <li>• {tAdmin('tipsAddService', lang)}</li>
          <li>• {tAdmin('tipsDelete', lang)}</li>
          <li>• {tAdmin('tipsAutoSave', lang)}</li>
          <li>• {tAdmin('tipsImageFormat', lang)}</li>
        </ul>
      </div>
    </div>
  );
} 