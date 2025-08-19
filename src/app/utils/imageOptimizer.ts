// Utilitaire pour optimiser les images avant sauvegarde localStorage

export function optimizeImageForStorage(base64String: string, maxWidth: number = 800, quality: number = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Impossible de créer le contexte canvas'));
        return;
      }

      // Calculer les nouvelles dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Convertir en base64 avec compression
      const optimizedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(optimizedBase64);
    };

    img.onerror = () => {
      reject(new Error('Impossible de charger l\'image'));
    };

    img.src = base64String;
  });
}

export function estimateStorageSize(data: unknown): number {
  const jsonString = JSON.stringify(data);
  return new Blob([jsonString]).size;
}

export function checkStorageQuota(): { used: number; available: number } {
  let used = 0;
  let available = 0;

  try {
    // Estimation de l'espace utilisé
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          used += new Blob([value]).size;
        }
      }
    }

    // Estimation de l'espace disponible (approximatif)
    // localStorage a généralement une limite de 5-10MB
    available = 5 * 1024 * 1024 - used; // 5MB - utilisé
  } catch (error) {
    console.warn('Impossible de calculer l\'espace de stockage:', error);
  }

  return { used, available };
}

export function clearOldData(): void {
  try {
    // Supprimer les anciennes données non essentielles
    const keysToKeep = ['services_data', 'gallery_data', 'theme_data'];
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !keysToKeep.includes(key)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log(`Nettoyage terminé: ${keysToRemove.length} clés supprimées`);
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  }
} 