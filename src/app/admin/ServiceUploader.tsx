'use client';

import React, { useState, useRef } from 'react';
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

interface ServiceUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  editingItem: Service | null;
}

export default function ServiceUploader({ isOpen, onClose, onSave, editingItem }: ServiceUploaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [altText, setAltText] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaLink, setCtaLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { lang } = useAdminLang();

  // Mettre à jour les valeurs quand editingItem change
  React.useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || '');
      setDescription(editingItem.description || '');
      setLongDescription(editingItem.longDescription || '');
      setImageSrc(editingItem.imageSrc || '');
      setAltText(editingItem.altText || '');
      setCtaText(editingItem.ctaText || '');
      setCtaLink(editingItem.ctaLink || '');
      setEditingService(editingItem);
    } else {
      // Réinitialiser pour un nouveau service
      setTitle('');
      setDescription('');
      setLongDescription('');
      setImageSrc('');
      setAltText('');
      setCtaText('');
      setCtaLink('');
      setEditingService(null);
    }
  }, [editingItem]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simuler l'upload d'une image
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageSrc(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageSrc || !title.trim() || !description.trim() || !ctaText.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedService: Service = {
      id: editingItem?.id || 'service-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      imageSrc,
      altText: altText.trim() || title.trim(),
      ctaText: ctaText.trim(),
      ctaLink: ctaLink.trim(),
      details: editingService?.details || editingItem?.details || []
    };

    onSave(updatedService);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#AA8C5B]/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17]">
              {editingItem ? 'Modifier le service' : 'Ajouter un service'}
            </h2>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-[#251C17] transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Contenu */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche - Image et infos de base */}
            <div className="space-y-6">
              {/* Upload d'image */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-3">
                  Image du service *
                </label>
                
                {imageSrc ? (
                  <div className="relative">
                    <img 
                      src={imageSrc} 
                      alt="Aperçu" 
                      className="w-full h-48 object-cover rounded-xl border border-[#AA8C5B]/30"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#251C17] p-2 rounded-lg hover:bg-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#AA8C5B]/50 rounded-xl p-8 text-center cursor-pointer hover:border-[#BF6C3E] transition-colors duration-300"
                  >
                    {isUploading ? (
                      <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E] mx-auto"></div>
                        <p className="text-[#666666]">Upload en cours...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <svg className="w-12 h-12 text-[#AA8C5B] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <div>
                          <p className="text-[#251C17] font-medium">Cliquez pour sélectionner une image</p>
                          <p className="text-sm text-[#666666] mt-1">JPG, PNG, GIF jusqu&apos;à 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Titre */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('serviceTitle', lang)} *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                  placeholder={tAdmin('placeholderServiceTitle', lang)}
                  required
                />
              </div>

              {/* Texte alternatif */}
              <div>
                <label htmlFor="altText" className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('imageAltText', lang)}
                </label>
                <input
                  id="altText"
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                  placeholder={tAdmin('placeholderImageAlt', lang)}
                />
              </div>
            </div>

            {/* Colonne droite - Descriptions et CTA */}
            <div className="space-y-6">
              {/* Description courte */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('shortDescription', lang)} *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666]"
                  placeholder={tAdmin('placeholderShortDesc', lang)}
                  required
                />
              </div>

              {/* Description longue */}
              <div>
                <label htmlFor="longDescription" className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('longDescription', lang)}
                </label>
                <textarea
                  id="longDescription"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666]"
                  placeholder={tAdmin('placeholderLongDesc', lang)}
                />
              </div>

              {/* Bouton CTA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ctaText" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('ctaButton', lang)} *
                  </label>
                  <input
                    id="ctaText"
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('enterCtaText', lang)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ctaLink" className="block text-sm font-medium text-[#251C17] mb-2">
                    {tAdmin('buttonLink', lang)}
                  </label>
                  <input
                    id="ctaLink"
                    type="text"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17] placeholder-[#666666]"
                    placeholder={tAdmin('enterButtonLink', lang)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Sous-services */}
          <div className="border-t border-[#AA8C5B]/20 pt-6">
            <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
              {tAdmin('subServicesDetails', lang)}
            </h3>
            <p className="text-sm text-[#666666] mb-6">
              {tAdmin('subServicesDescription', lang)}
            </p>
            
            <div className="space-y-4">
              {editingService?.details?.map((detail, index) => (
                <div key={detail.id} className="bg-[#FAF6ED] rounded-xl p-4 border border-[#AA8C5B]/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#251C17]">{detail.title}</h4>
                    <span className="text-xs text-[#666666] bg-white px-2 py-1 rounded-full">
                      {tAdmin('subService', lang)} {index + 1}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Image du sous-service */}
                    <div>
                      <label className="block text-sm font-medium text-[#251C17] mb-2">
                        {tAdmin('optionalImage', lang)}
                      </label>
                      <div 
                                                 onClick={() => {
                           const input = document.createElement('input');
                           input.type = 'file';
                           input.accept = 'image/*';
                           input.onchange = (e) => {
                             const file = (e.target as HTMLInputElement).files?.[0];
                             if (file && editingService) {
                               const reader = new FileReader();
                               reader.onload = (e) => {
                                 const result = e.target?.result as string;
                                 // Mettre à jour l'image du sous-service
                                 const updatedDetails = [...(editingService.details || [])];
                                 updatedDetails[index] = { ...detail, imageSrc: result };
                                 // Mettre à jour le service
                                 const updatedService = { ...editingService, details: updatedDetails };
                                 // Sauvegarder temporairement
                                 setEditingService(updatedService);
                               };
                               reader.readAsDataURL(file);
                             }
                           };
                           input.click();
                         }}
                        className="border-2 border-dashed border-[#AA8C5B]/50 rounded-lg p-4 text-center cursor-pointer hover:border-[#BF6C3E] transition-colors duration-300 bg-white"
                      >
                        {detail.imageSrc ? (
                          <div className="relative">
                            <img 
                              src={detail.imageSrc} 
                              alt={detail.title} 
                              className="w-full h-24 object-cover rounded-lg"
                            />
                                                         <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                               <span className="text-white text-sm font-medium">{tAdmin('changeImage', lang)}</span>
                             </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <svg className="w-8 h-8 text-[#AA8C5B] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-xs text-[#666666]">{tAdmin('addImage', lang)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Description du sous-service */}
                    <div>
                      <label className="block text-sm font-medium text-[#251C17] mb-2">
                        {tAdmin('optionalDescription', lang)}
                      </label>
                      <textarea
                        value={detail.description || ''}
                        onChange={(e) => {
                          if (editingService) {
                            const updatedDetails = [...(editingService.details || [])];
                            updatedDetails[index] = { ...detail, description: e.target.value };
                            const updatedService = { ...editingService, details: updatedDetails };
                            setEditingService(updatedService);
                          }
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border-2 border-[#AA8C5B]/40 rounded-lg focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666] text-sm"
                        placeholder={tAdmin('placeholderShortDesc', lang)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-[#AA8C5B]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-[#AA8C5B]/30 text-[#251C17] rounded-xl hover:bg-[#AA8C5B]/10 transition-all duration-300 font-medium"
            >
              {tAdmin('cancel', lang)}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#BF6C3E] text-white rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              {editingItem ? tAdmin('edit', lang) : tAdmin('create', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 