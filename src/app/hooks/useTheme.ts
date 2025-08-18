'use client';

import { useEffect } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  border: string;
}

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  isCustom?: boolean;
}

const defaultTheme: Theme = {
  id: 'artisan',
  name: 'Artisan (Actuel)',
  description: 'Thème chaleureux avec des tons marron et beige',
  colors: {
    primary: '#251C17',
    secondary: '#AA8C5B',
    accent: '#BF6C3E',
    background: '#FAF6ED',
    text: '#251C17',
    textLight: '#666666',
    border: '#AA8C5B'
  }
};

export function useTheme() {
  useEffect(() => {
    // Charger le thème depuis localStorage
    const savedTheme = localStorage.getItem('site_theme');
    let theme: Theme;
    
    if (savedTheme) {
      try {
        theme = JSON.parse(savedTheme);
      } catch {
        theme = defaultTheme;
      }
    } else {
      theme = defaultTheme;
    }

    // Appliquer le thème
    applyTheme(theme);
    
    // Surveiller les changements de localStorage pour les thèmes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'site_theme') {
        try {
          const newTheme = JSON.parse(e.newValue || '');
          applyTheme(newTheme);
        } catch {
          applyTheme(defaultTheme);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const applyTheme = (theme: Theme) => {
    // Sauvegarder le thème
    localStorage.setItem('site_theme', JSON.stringify(theme));
    
    // Créer ou mettre à jour le style CSS
    let styleElement = document.getElementById('theme-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'theme-styles';
      document.head.appendChild(styleElement);
    }

    // Générer les styles CSS avec les couleurs du thème
    const css = `
      :root {
        --color-primary: ${theme.colors.primary};
        --color-secondary: ${theme.colors.secondary};
        --color-accent: ${theme.colors.accent};
        --color-background: ${theme.colors.background};
        --color-text: ${theme.colors.text};
        --color-text-light: ${theme.colors.textLight};
        --color-border: ${theme.colors.border};
      }

      /* Remplacer les couleurs codées en dur par les variables CSS */
      .bg-\\[\\#FAF6ED\\] { background-color: ${theme.colors.background} !important; }
      .bg-\\[\\#251C17\\] { background-color: ${theme.colors.primary} !important; }
      .bg-\\[\\#BF6C3E\\] { background-color: ${theme.colors.accent} !important; }
      .bg-\\[\\#AA8C5B\\] { background-color: ${theme.colors.secondary} !important; }
      
      .text-\\[\\#251C17\\] { color: ${theme.colors.text} !important; }
      .text-\\[\\#666666\\] { color: ${theme.colors.textLight} !important; }
      .text-\\[\\#BF6C3E\\] { color: ${theme.colors.accent} !important; }
      .text-\\[\\#AA8C5B\\] { color: ${theme.colors.secondary} !important; }
      
      .border-\\[\\#AA8C5B\\] { border-color: ${theme.colors.border} !important; }
      .border-\\[\\#BF6C3E\\] { border-color: ${theme.colors.accent} !important; }
      
      /* Hover states */
      .hover\\:bg-\\[\\#AA8C5B\\]:hover { background-color: ${theme.colors.secondary} !important; }
      .hover\\:bg-\\[\\#BF6C3E\\]:hover { background-color: ${theme.colors.accent} !important; }
      .hover\\:text-\\[\\#AA8C5B\\]:hover { color: ${theme.colors.secondary} !important; }
      .hover\\:text-\\[\\#BF6C3E\\]:hover { color: ${theme.colors.accent} !important; }
      
      /* Focus states */
      .focus\\:ring-\\[\\#BF6C3E\\]:focus { --tw-ring-color: ${theme.colors.accent} !important; }
      .focus\\:border-\\[\\#BF6C3E\\]:focus { border-color: ${theme.colors.accent} !important; }
      
      /* Gradients */
      .from-\\[\\#AA8C5B\\] { --tw-gradient-from: ${theme.colors.secondary} !important; }
      .to-\\[\\#BF6C3E\\] { --tw-gradient-to: ${theme.colors.accent} !important; }
      .via-\\[\\#AA8C5B\\] { --tw-gradient-stops: var(--tw-gradient-from), ${theme.colors.secondary}, var(--tw-gradient-to) !important; }
      
      /* Opacity variants */
      .border-\\[\\#AA8C5B\\]\\/20 { border-color: ${theme.colors.border}33 !important; }
      .border-\\[\\#AA8C5B\\]\\/30 { border-color: ${theme.colors.border}4D !important; }
      .border-\\[\\#AA8C5B\\]\\/40 { border-color: ${theme.colors.border}66 !important; }
      .border-\\[\\#AA8C5B\\]\\/50 { border-color: ${theme.colors.border}80 !important; }
      .border-\\[\\#AA8C5B\\]\\/60 { border-color: ${theme.colors.border}99 !important; }
      
      .bg-\\[\\#AA8C5B\\]\\/10 { background-color: ${theme.colors.secondary}1A !important; }
      .bg-\\[\\#AA8C5B\\]\\/20 { background-color: ${theme.colors.secondary}33 !important; }
      .bg-\\[\\#BF6C3E\\]\\/10 { background-color: ${theme.colors.accent}1A !important; }
      .bg-\\[\\#BF6C3E\\]\\/20 { background-color: ${theme.colors.accent}33 !important; }
      
      /* Header/Bandeau specific opacity variants */
      .bg-\\[\\#251C17\\]\\/90 { background-color: ${theme.colors.primary}E6 !important; }
      .bg-\\[\\#251C17\\]\\/95 { background-color: ${theme.colors.primary}F2 !important; }
      
      /* Header specific classes - all states */
      .bg-\\[\\#251C17\\] { background-color: ${theme.colors.primary} !important; }
      .bg-\\[\\#251C17\\]\\/95 { background-color: ${theme.colors.primary}F2 !important; }
      .bg-\\[\\#251C17\\]\\/90 { background-color: ${theme.colors.primary}E6 !important; }
      
      /* Border opacity variants for header */
      .border-\\[\\#AA8C5B\\]\\/30 { border-color: ${theme.colors.border}4D !important; }
      .border-\\[\\#BF6C3E\\]\\/30 { border-color: ${theme.colors.accent}4D !important; }
      .border-b { border-bottom-width: 1px !important; }
      .border-t { border-top-width: 1px !important; }
      
      /* Additional opacity variants that might be used */
      .bg-\\[\\#AA8C5B\\]\\/50 { background-color: ${theme.colors.secondary}80 !important; }
      .border-\\[\\#AA8C5B\\]\\/50 { border-color: ${theme.colors.border}80 !important; }
      .border-white\\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
      .border-white\\/30 { border-color: rgba(255, 255, 255, 0.3) !important; }
      
      .text-white\\/80 { color: rgba(255, 255, 255, 0.8) !important; }
      .text-white\\/90 { color: rgba(255, 255, 255, 0.9) !important; }
      .bg-white\\/80 { background-color: rgba(255, 255, 255, 0.8) !important; }
      .bg-white\\/90 { background-color: rgba(255, 255, 255, 0.9) !important; }
      .bg-black\\/20 { background-color: rgba(0, 0, 0, 0.2) !important; }
      .bg-black\\/50 { background-color: rgba(0, 0, 0, 0.5) !important; }
    `;

    styleElement.textContent = css;
    
    // Forcer la mise à jour des styles en ajoutant un timestamp
    styleElement.setAttribute('data-timestamp', Date.now().toString());
  };

  const forceThemeUpdate = () => {
    // Recharger le thème depuis localStorage et l'appliquer
    const savedTheme = localStorage.getItem('site_theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
        
        // Forcer la mise à jour de tous les éléments avec les classes de couleur
        const elements = document.querySelectorAll('[class*="bg-[#"], [class*="text-[#"], [class*="border-[#"]');
        elements.forEach(element => {
          // Forcer le re-rendu en modifiant temporairement la classe
          const originalClass = element.className;
          element.className = originalClass + ' ';
          setTimeout(() => {
            element.className = originalClass;
          }, 10);
        });
        
        // Forcer spécifiquement la mise à jour du Header
        const headerElements = document.querySelectorAll('header, nav, [class*="bg-[#251C17]"]');
        headerElements.forEach(element => {
          const originalClass = element.className;
          element.className = originalClass + ' ';
          setTimeout(() => {
            element.className = originalClass;
          }, 5);
        });
      } catch {
        applyTheme(defaultTheme);
      }
    }
  };

  return { applyTheme, forceThemeUpdate };
} 