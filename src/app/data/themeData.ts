export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export const defaultTheme: Theme = {
  id: 'default',
  name: 'Classique Leder',
  description: 'Thème classique avec des tons de cuir traditionnels',
  primaryColor: '#251C17',
  secondaryColor: '#AA8C5B',
  accentColor: '#BF6C3E',
  backgroundColor: '#FAF6ED',
  textColor: '#444444'
};

export const predefinedThemes: Theme[] = [
  {
    id: 'classic',
    name: 'Classique Leder',
    description: 'Thème classique avec des tons de cuir traditionnels',
    primaryColor: '#251C17',
    secondaryColor: '#AA8C5B',
    accentColor: '#BF6C3E',
    backgroundColor: '#FAF6ED',
    textColor: '#444444'
  },
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design contemporain avec des couleurs vives',
    primaryColor: '#1a1a1a',
    secondaryColor: '#4a90e2',
    accentColor: '#f39c12',
    backgroundColor: '#ffffff',
    textColor: '#333333'
  },
  {
    id: 'warm',
    name: 'Chaleureux',
    description: 'Palette chaleureuse et accueillante',
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    accentColor: '#FF8C00',
    backgroundColor: '#FFF8DC',
    textColor: '#654321'
  },
  {
    id: 'elegant',
    name: 'Élégant',
    description: 'Style sophistiqué et raffiné',
    primaryColor: '#2C3E50',
    secondaryColor: '#34495E',
    accentColor: '#E74C3C',
    backgroundColor: '#ECF0F1',
    textColor: '#2C3E50'
  }
];

export const getThemeById = (id: string): Theme => {
  const theme = predefinedThemes.find(t => t.id === id);
  return theme || defaultTheme;
};

export const getAllThemes = (): Theme[] => {
  return predefinedThemes;
}; 