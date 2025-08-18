'use client';

import React, { useState, useEffect } from 'react';
import ServicePageUploader from './ServicePageUploader';
import { checkStorageQuota, clearOldData } from '../utils/imageOptimizer';
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
  slug?: string;
  details?: SubService[];
  longDescription?: string;
}

export default function ServicePageManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
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
          slug: "reparaturen-aller-art",
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
          slug: "individuelle-anpassungen",
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
          slug: "motorradsitzbaenke",
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
          slug: "fahrzeugsattlerei",
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
    setShowUploader(true);
  };

  const handleAddNewService = () => {
    setEditingService(null);
    setIsAddingNew(true);
    setShowUploader(true);
  };

  const handleSaveService = (updatedService: Service) => {
    try {
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
      
      // Déclencher un événement personnalisé pour mettre à jour les services
      window.dispatchEvent(new CustomEvent('servicesUpdated'));
      
      setShowUploader(false);
      setEditingService(null);
      setIsAddingNew(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Erreur: L\'espace de stockage est plein. Veuillez supprimer des données ou réduire la taille des images.');
      } else {
        alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
    }
  };

  const handleCancelEdit = () => {
    setShowUploader(false);
    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleReorderServices = (fromIndex: number, toIndex: number) => {
    try {
      const newServices = [...services];
      const [movedService] = newServices.splice(fromIndex, 1);
      newServices.splice(toIndex, 0, movedService);
      setServices(newServices);
      localStorage.setItem('services_data', JSON.stringify(newServices));
      
      // Déclencher un événement personnalisé pour mettre à jour les services
      window.dispatchEvent(new CustomEvent('servicesUpdated'));
    } catch (error) {
      console.error('Erreur lors du réordonnancement:', error);
      alert('Erreur lors du réordonnancement. Veuillez réessayer.');
    }
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.')) {
      try {
        const updatedServices = services.filter(service => service.id !== serviceId);
        setServices(updatedServices);
        localStorage.setItem('services_data', JSON.stringify(updatedServices));
        
        // Déclencher un événement personnalisé pour mettre à jour les services
        window.dispatchEvent(new CustomEvent('servicesUpdated'));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression. Veuillez réessayer.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BF6C3E]"></div>
      </div>
    );
  }

  if (showUploader) {
    return (
      <ServicePageUploader
        isOpen={showUploader}
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
          {tAdmin('servicePagesManagement', lang)}
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              const quota = checkStorageQuota();
              const usedMB = (quota.used / (1024 * 1024)).toFixed(2);
              const availableMB = (quota.available / (1024 * 1024)).toFixed(2);
              alert(`${tAdmin('storageInfo', lang)}:\n${tAdmin('usedMB', lang).replace('{used}', usedMB)}\n${tAdmin('availableMB', lang).replace('{available}', availableMB)}`);
            }}
            className="bg-[#AA8C5B] text-white px-4 py-2 rounded-lg hover:bg-[#BF6C3E] transition-all duration-300 text-sm"
          >
            📊 {tAdmin('space', lang)}
          </button>
          <button
            onClick={() => {
              if (confirm(tAdmin('confirmDelete', lang))) {
                clearOldData();
                alert(tAdmin('success', lang));
              }
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm"
          >
            🧹 {tAdmin('clean', lang)}
          </button>
          <button
            onClick={handleAddNewService}
            className="bg-[#BF6C3E] text-white px-6 py-3 rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            ➕ {tAdmin('createNewService', lang)}
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-6">
        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#FAF6ED] rounded-xl p-6 border border-[#AA8C5B]/20 hover:border-[#AA8C5B]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#AA8C5B]/30">
                    <img
                      src={service.imageSrc}
                      alt={service.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-[var(--font-cinzel)] font-semibold text-[#251C17]">
                      {service.title}
                    </h3>
                    <p className="text-[#666666] text-sm mt-1">
                      {service.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-[#666666]">
                      <span>📄 {service.details?.length || 0} {tAdmin('subServices', lang)}</span>
                      <span>🔗 /services/{service.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <a
                    href={`/services/${service.id}`}
                    target="_blank"
                    className="text-[#BF6C3E] hover:text-[#AA8C5B] transition-colors duration-300"
                    title={tAdmin('viewSite', lang)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                  <button
                    onClick={() => handleEditService(service)}
                    className="text-[#BF6C3E] hover:text-[#AA8C5B] transition-colors duration-300"
                    title={tAdmin('edit', lang)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    title={tAdmin('delete', lang)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FAF6ED] rounded-xl p-6 border border-[#AA8C5B]/20">
        <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
          📋 {tAdmin('serviceDetails', lang)}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#666666]">
          <div>
            <h4 className="font-medium text-[#251C17] mb-2">{tAdmin('availableFeatures', lang)} :</h4>
            <ul className="space-y-1">
              <li>• {tAdmin('createServices', lang)}</li>
              <li>• {tAdmin('modifyServices', lang)}</li>
              <li>• {tAdmin('addSubServices', lang)}</li>
              <li>• {tAdmin('manageDescriptions', lang)}</li>
              <li>• {tAdmin('customizeButtons', lang)}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#251C17] mb-2">{tAdmin('customizableElements', lang)} :</h4>
            <ul className="space-y-1">
              <li>• {tAdmin('mainImage', lang)}</li>
              <li>• {tAdmin('titlesDescriptions', lang)}</li>
              <li>• {tAdmin('subServiceCards', lang)}</li>
              <li>• {tAdmin('subServiceImages', lang)}</li>
              <li>• {tAdmin('buttonsLinks', lang)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 