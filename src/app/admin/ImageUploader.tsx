'use client';

import React, { useState, useRef } from 'react';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

interface ImageUploaderProps {
  onSave: (item: GalleryItem | Omit<GalleryItem, 'id' | 'order'>) => void;
  onCancel: () => void;
  mode: 'add' | 'edit';
  item?: GalleryItem;
}

const categories = [
  'Innenausstattung',
  'Reparaturen',
  'Anpassungen',
  'Fahrzeugsattlerei',
  'Motorrad',
  'Dachhimmel',
  'Lenkrad',
  'Autositze'
];

export default function ImageUploader({ onSave, onCancel, mode, item }: ImageUploaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Innenausstattung');
  const [imageSrc, setImageSrc] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { lang } = useAdminLang();

  // Mettre à jour les valeurs quand item change
  React.useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setCategory(item.category || 'Innenausstattung');
      setImageSrc(item.src || '');
    } else {
      // Réinitialiser pour une nouvelle image
      setTitle('');
      setDescription('');
      setCategory('Innenausstattung');
      setImageSrc('');
    }
  }, [item]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simuler l'upload d'une image
      // En production, il faudrait envoyer le fichier au serveur
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
    
    if (!imageSrc || !description.trim()) {
      alert(tAdmin('error', lang));
      return;
    }

    if (mode === 'add') {
      onSave({
        src: imageSrc,
        title: title.trim(),
        description: description.trim(),
        category
      });
    } else if (item) {
      onSave({
        ...item,
        src: imageSrc,
        title: title.trim(),
        description: description.trim(),
        category
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#AA8C5B]/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17]">
              {mode === 'add' ? 'Ajouter une photo' : 'Modifier la photo'}
            </h2>
            <button
              onClick={onCancel}
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
          {/* Upload d'image */}
          <div>
            <label className="block text-sm font-medium text-[#251C17] mb-3">
              {tAdmin('image', lang)}
            </label>
            
            {imageSrc ? (
              <div className="relative">
                <img 
                  src={imageSrc} 
                  alt="Aperçu" 
                  className="w-full h-64 object-cover rounded-xl border border-[#AA8C5B]/30"
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

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#251C17] mb-2">
              {tAdmin('photoDescription', lang)} *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 resize-none bg-white text-[#251C17] placeholder-[#666666]"
              placeholder={tAdmin('placeholderPhotoDesc', lang)}
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#251C17] mb-2">
              {tAdmin('category', lang)}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#AA8C5B]/40 rounded-xl focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white text-[#251C17]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-[#AA8C5B]/40 text-[#251C17] rounded-xl hover:bg-[#AA8C5B]/10 transition-all duration-300 font-medium"
            >
              {tAdmin('cancel', lang)}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#BF6C3E] text-white rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              {mode === 'add' ? tAdmin('add', lang) : tAdmin('edit', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 