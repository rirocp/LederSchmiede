'use client';

import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

interface GalleryItem {
  id: string;
  src: string;
  description: string;
  category: string;
  order: number;
}

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useAdminLang();

  // Simuler le chargement des données depuis localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('gallery_items');
    if (savedItems) {
      setGalleryItems(JSON.parse(savedItems));
    } else {
      // Données par défaut
      const defaultItems: GalleryItem[] = [
        { id: '1', src: '/images/gallery/innenausstattung-1.jpg', description: 'Innenausstattung - Luxuriöse Fahrzeugpolster', category: 'Innenausstattung', order: 1 },
        { id: '2', src: '/images/gallery/sofa-1.jpg', description: 'Sofa Restauration - Professionelle Wiederherstellung', category: 'Reparaturen', order: 2 },
        { id: '3', src: '/images/gallery/sessel-1.jpg', description: 'Sessel Arbeit - Individuelle Anpassungen', category: 'Anpassungen', order: 3 },
        { id: '4', src: '/images/gallery/autositze-1.jpg', description: 'Autositze - Neubezug und Reparatur', category: 'Fahrzeugsattlerei', order: 4 },
        { id: '5', src: '/images/gallery/motorrad-1.jpg', description: 'Motorradsitzbänke - Maßgefertigte Lösungen', category: 'Motorrad', order: 5 },
        { id: '6', src: '/images/gallery/couch-1.jpg', description: 'Couch Restauration - Traditionelle Handwerkskunst', category: 'Reparaturen', order: 6 },
        { id: '7', src: '/images/gallery/lenkrad-1.jpg', description: 'Lenkrad - Individuelle Gestaltung', category: 'Innenausstattung', order: 7 },
        { id: '8', src: '/images/gallery/dachhimmel-1.jpg', description: 'Dachhimmel - Komplette Innenausstattung', category: 'Innenausstattung', order: 8 },
      ];
      setGalleryItems(defaultItems);
      localStorage.setItem('gallery_items', JSON.stringify(defaultItems));
    }
    setIsLoading(false);
  }, []);

  const saveGalleryItems = (items: GalleryItem[]) => {
    setGalleryItems(items);
    localStorage.setItem('gallery_items', JSON.stringify(items));
  };

  const handleAddImage = (newItem: Omit<GalleryItem, 'id' | 'order'>) => {
    const newGalleryItem: GalleryItem = {
      ...newItem,
      id: Date.now().toString(),
      order: galleryItems.length + 1,
    };
    const updatedItems = [...galleryItems, newGalleryItem];
    saveGalleryItems(updatedItems);
    setIsAddingImage(false);
  };

  const handleEditImage = (updatedItem: GalleryItem | Omit<GalleryItem, 'id' | 'order'>) => {
    if ('id' in updatedItem) {
      const updatedItems = galleryItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      );
      saveGalleryItems(updatedItems);
      setEditingItem(null);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm(tAdmin('confirmDeletePhoto', lang))) {
      const updatedItems = galleryItems.filter(item => item.id !== id);
      saveGalleryItems(updatedItems);
    }
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = galleryItems.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= galleryItems.length) return;

    const updatedItems = [...galleryItems];
    [updatedItems[currentIndex], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[currentIndex]];
    
    // Mettre à jour l'ordre
    updatedItems.forEach((item, index) => {
      item.order = index + 1;
    });
    
    saveGalleryItems(updatedItems);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF6C3E]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-2">
            {tAdmin('galleryManagement', lang)}
          </h2>
          <p className="text-[#444444] font-[var(--font-cormorant)] text-lg">
            {tAdmin('gallery', lang)}
          </p>
        </div>
        
        <button
          onClick={() => setIsAddingImage(true)}
          className="bg-[#BF6C3E] text-white px-6 py-3 rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          + {tAdmin('addPhoto', lang)}
        </button>
      </div>

      {/* Modal d'ajout d'image */}
      {isAddingImage && (
        <ImageUploader
          onSave={handleAddImage}
          onCancel={() => setIsAddingImage(false)}
          mode="add"
        />
      )}

      {/* Modal de modification */}
      {editingItem && (
        <ImageUploader
          onSave={handleEditImage}
          onCancel={() => setEditingItem(null)}
          mode="edit"
          item={editingItem}
        />
      )}

      {/* Liste des images */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-8">
        <div className="grid gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 bg-[#FAF6ED] rounded-xl border border-[#AA8C5B]/20">
              {/* Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.src} 
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informations */}
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-[#251C17] truncate">{item.description}</h3>
                <p className="text-sm text-[#666666]">{tAdmin('category', lang)}: {item.category}</p>
                <p className="text-xs text-[#888888]">{tAdmin('reorder', lang)}: {item.order}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {/* Boutons de réorganisation */}
                <button
                  onClick={() => moveItem(item.id, 'up')}
                  disabled={item.order === 1}
                  className="p-2 text-[#BF6C3E] hover:bg-[#BF6C3E]/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  title={tAdmin('moveUp', lang)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </button>
                
                <button
                  onClick={() => moveItem(item.id, 'down')}
                  disabled={item.order === galleryItems.length}
                  className="p-2 text-[#BF6C3E] hover:bg-[#BF6C3E]/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  title={tAdmin('moveDown', lang)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {/* Bouton modifier */}
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-[#AA8C5B] hover:bg-[#AA8C5B]/10 rounded-lg transition-all duration-300"
                  title={tAdmin('edit', lang)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>

                {/* Bouton supprimer */}
                <button
                  onClick={() => handleDeleteImage(item.id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  title={tAdmin('delete', lang)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666] font-[var(--font-cormorant)] text-lg">
              {tAdmin('noImagesInGallery', lang)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 