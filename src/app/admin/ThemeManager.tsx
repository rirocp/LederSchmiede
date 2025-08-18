'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAdminLang } from './components/AdminLangContext';
import { tAdmin } from './components/admin-i18n';

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

const predefinedThemes: Theme[] = [
  {
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
  },
  {
    id: 'elegant',
    name: 'Élégant',
    description: 'Thème sophistiqué avec des tons noirs et dorés',
    colors: {
      primary: '#1a1a1a',
      secondary: '#D4AF37',
      accent: '#B8860B',
      background: '#f8f8f8',
      text: '#1a1a1a',
      textLight: '#666666',
      border: '#D4AF37'
    }
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Thème naturel avec des tons verts et bruns',
    colors: {
      primary: '#2F4F2F',
      secondary: '#8FBC8F',
      accent: '#556B2F',
      background: '#F5F5DC',
      text: '#2F4F2F',
      textLight: '#666666',
      border: '#8FBC8F'
    }
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Thème contemporain avec des tons gris et bleus',
    colors: {
      primary: '#2C3E50',
      secondary: '#3498DB',
      accent: '#E74C3C',
      background: '#ECF0F1',
      text: '#2C3E50',
      textLight: '#7F8C8D',
      border: '#3498DB'
    }
  },
  {
    id: 'warm',
    name: 'Chaleureux',
    description: 'Thème chaleureux avec des tons orange et marron',
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#FF8C00',
      background: '#FFF8DC',
      text: '#8B4513',
      textLight: '#A0522D',
      border: '#D2691E'
    }
  },
  {
    id: 'luxury',
    name: 'Luxe',
    description: 'Thème luxueux avec des tons pourpres et dorés',
    colors: {
      primary: '#4B0082',
      secondary: '#FFD700',
      accent: '#9370DB',
      background: '#F0F8FF',
      text: '#4B0082',
      textLight: '#696969',
      border: '#FFD700'
    }
  }
];

export default function ThemeManager() {
  const { applyTheme, forceThemeUpdate } = useTheme();
  const { lang } = useAdminLang();
  const [currentTheme, setCurrentTheme] = useState<Theme>(predefinedThemes[0]);
  const [customTheme, setCustomTheme] = useState<Theme>({
    id: 'custom',
    name: tAdmin('customizeTheme', lang),
    description: tAdmin('customizeTheme', lang),
    colors: { ...predefinedThemes[0].colors },
    isCustom: true
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Charger le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('site_theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      if (theme.isCustom) {
        setCustomTheme(theme);
        setCurrentTheme(theme);
      } else {
        const predefined = predefinedThemes.find(t => t.id === theme.id);
        if (predefined) {
          setCurrentTheme(predefined);
        }
      }
    }
  }, []);

  // Appliquer le thème
  const applyThemeLocal = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const handleThemeSelect = (theme: Theme) => {
    applyThemeLocal(theme);
    // Appliquer immédiatement le thème
    setTimeout(() => {
      forceThemeUpdate();
    }, 50);
  };

  const handleCustomColorChange = (colorKey: keyof ThemeColors, value: string) => {
    const updatedCustomTheme = {
      ...customTheme,
      colors: {
        ...customTheme.colors,
        [colorKey]: value
      }
    };
    setCustomTheme(updatedCustomTheme);
  };

  const saveCustomTheme = () => {
    applyThemeLocal(customTheme);
    setIsCustomizing(false);
    // Appliquer immédiatement le thème
    setTimeout(() => {
      forceThemeUpdate();
    }, 50);
  };

  // Fonction pour obtenir les thèmes traduits
  const getTranslatedThemes = (): Theme[] => {
    return predefinedThemes.map(theme => ({
      ...theme,
      name: theme.id === 'artisan' ? `${tAdmin('artisan', lang)} (${tAdmin('current', lang)})` : tAdmin(theme.id as any, lang),
      description: tAdmin(`${theme.id}Desc` as any, lang)
    }));
  };

  const resetToDefault = () => {
    const defaultTheme = predefinedThemes[0];
    applyThemeLocal(defaultTheme);
    setCustomTheme({
      id: 'custom',
      name: tAdmin('customizeTheme', lang),
      description: tAdmin('customizeTheme', lang),
      colors: { ...defaultTheme.colors },
      isCustom: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-[var(--font-cinzel)] font-bold text-[#251C17]">
          {tAdmin('themeManagement', lang)}
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-[#BF6C3E] text-white px-4 py-2 rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium"
          >
            {showPreview ? tAdmin('hidePreview', lang) : tAdmin('showPreview', lang)} {tAdmin('themePreview', lang)}
          </button>
          <button
            onClick={() => {
              applyThemeLocal(currentTheme);
              // Forcer la mise à jour immédiate du thème
              setTimeout(() => {
                forceThemeUpdate();
              }, 100);
            }}
            className="bg-[#AA8C5B] text-white px-4 py-2 rounded-xl hover:bg-[#BF6C3E] transition-all duration-300 font-medium"
          >
            🔄 {tAdmin('applyTheme', lang)}
          </button>
          <button
            onClick={() => {
              forceThemeUpdate();
            }}
            className="bg-[#BF6C3E] text-white px-4 py-2 rounded-xl hover:bg-[#AA8C5B] transition-all duration-300 font-medium"
          >
            ⚡ {tAdmin('forceUpdate', lang)}
          </button>
          <button
            onClick={resetToDefault}
            className="border border-[#AA8C5B]/30 text-[#251C17] px-4 py-2 rounded-xl hover:bg-[#AA8C5B]/10 transition-all duration-300 font-medium"
          >
            {tAdmin('resetToDefault', lang)}
          </button>
        </div>
      </div>

      {/* Aperçu du thème actuel */}
      {showPreview && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-6">
          <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
            {tAdmin('themePreview', lang)} : {currentTheme.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte de service */}
            <div className="bg-white rounded-xl p-4 border border-[#AA8C5B]/30 shadow-lg">
              <div className="w-full h-32 bg-gradient-to-br from-[#AA8C5B]/20 to-[#BF6C3E]/20 rounded-lg mb-3"></div>
              <h4 className="font-semibold text-[#251C17] mb-2">Service Example</h4>
              <p className="text-[#666666] text-sm mb-3">Description courte du service...</p>
              <button className="bg-[#BF6C3E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#AA8C5B] transition-colors">
                En savoir plus
              </button>
            </div>

            {/* Boutons */}
            <div className="space-y-3">
              <button className="w-full bg-[#BF6C3E] text-white px-4 py-2 rounded-lg hover:bg-[#AA8C5B] transition-colors">
                Bouton Principal
              </button>
              <button className="w-full border border-[#AA8C5B]/30 text-[#251C17] px-4 py-2 rounded-lg hover:bg-[#AA8C5B]/10 transition-colors">
                Bouton Secondaire
              </button>
            </div>

            {/* Texte */}
            <div className="space-y-2">
              <h4 className="text-[#251C17] font-semibold">Titre Principal</h4>
              <p className="text-[#666666] text-sm">Texte de description avec la couleur secondaire</p>
              <div className="text-[#BF6C3E] text-sm">Accent color</div>
            </div>
          </div>
        </div>
      )}

      {/* Thèmes prédéfinis */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-6">
        <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
          {tAdmin('themeManagement', lang)}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getTranslatedThemes().map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeSelect(theme)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                currentTheme.id === theme.id
                  ? 'border-[#BF6C3E] bg-[#FAF6ED]'
                  : 'border-[#AA8C5B]/30 bg-white hover:border-[#AA8C5B]/60'
              }`}
            >
              {/* Indicateur de sélection */}
              {currentTheme.id === theme.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#BF6C3E] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              <h4 className="font-semibold text-[#251C17] mb-2">{theme.name}</h4>
              <p className="text-[#666666] text-sm mb-3">{theme.description}</p>
              
              {/* Aperçu des couleurs */}
              <div className="flex space-x-2">
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.primary }}
                  title="Couleur principale"
                ></div>
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.secondary }}
                  title="Couleur secondaire"
                ></div>
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.accent }}
                  title="Couleur d'accent"
                ></div>
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: theme.colors.background }}
                  title="Couleur de fond"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personnalisation des couleurs */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#AA8C5B]/30 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17]">
            {tAdmin('colorCustomization', lang)}
          </h3>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="bg-[#BF6C3E] text-white px-4 py-2 rounded-lg hover:bg-[#AA8C5B] transition-all duration-300 font-medium"
          >
            {isCustomizing ? tAdmin('close', lang) : tAdmin('customize', lang)}
          </button>
        </div>

        {isCustomizing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Couleur principale */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('primaryColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.primary}
                    onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.primary}
                    onChange={(e) => handleCustomColorChange('primary', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#251C17"
                  />
                </div>
              </div>

              {/* Couleur secondaire */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('secondaryColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.secondary}
                    onChange={(e) => handleCustomColorChange('secondary', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#AA8C5B"
                  />
                </div>
              </div>

              {/* Couleur d'accent */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('accentColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.accent}
                    onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.accent}
                    onChange={(e) => handleCustomColorChange('accent', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#BF6C3E"
                  />
                </div>
              </div>

              {/* Couleur de fond */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('backgroundColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.background}
                    onChange={(e) => handleCustomColorChange('background', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.background}
                    onChange={(e) => handleCustomColorChange('background', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#FAF6ED"
                  />
                </div>
              </div>

              {/* Couleur de texte */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('textColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.text}
                    onChange={(e) => handleCustomColorChange('text', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.text}
                    onChange={(e) => handleCustomColorChange('text', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#251C17"
                  />
                </div>
              </div>

              {/* Couleur de bordure */}
              <div>
                <label className="block text-sm font-medium text-[#251C17] mb-2">
                  {tAdmin('borderColor', lang)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={customTheme.colors.border}
                    onChange={(e) => handleCustomColorChange('border', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-[#AA8C5B]/30 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customTheme.colors.border}
                    onChange={(e) => handleCustomColorChange('border', e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#AA8C5B]/30 rounded-lg text-sm"
                    placeholder="#AA8C5B"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-[#AA8C5B]/20">
              <button
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 border border-[#AA8C5B]/30 text-[#251C17] rounded-lg hover:bg-[#AA8C5B]/10 transition-all duration-300 font-medium"
              >
                {tAdmin('cancel', lang)}
              </button>
              <button
                onClick={saveCustomTheme}
                className="px-4 py-2 bg-[#BF6C3E] text-white rounded-lg hover:bg-[#AA8C5B] transition-all duration-300 font-medium"
              >
                {tAdmin('saveCustomTheme', lang)}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="bg-[#FAF6ED] rounded-xl p-6 border border-[#AA8C5B]/20">
        <h3 className="text-lg font-[var(--font-cinzel)] font-semibold text-[#251C17] mb-4">
          💡 {tAdmin('themeTips', lang)}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#666666]">
          <div>
            <h4 className="font-medium text-[#251C17] mb-2">{tAdmin('colorUsage', lang)} :</h4>
            <ul className="space-y-1">
              <li>{tAdmin('primaryColorUsage', lang)}</li>
              <li>{tAdmin('secondaryColorUsage', lang)}</li>
              <li>{tAdmin('accentColorUsage', lang)}</li>
              <li>{tAdmin('backgroundColorUsage', lang)}</li>
              <li>{tAdmin('textColorUsage', lang)}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#251C17] mb-2">{tAdmin('themeTips', lang)} :</h4>
            <ul className="space-y-1">
              <li>{tAdmin('chooseContrastedColors', lang)}</li>
              <li>{tAdmin('testTheme', lang)}</li>
              <li>{tAdmin('customThemesSaved', lang)}</li>
              <li>{tAdmin('returnToDefault', lang)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 