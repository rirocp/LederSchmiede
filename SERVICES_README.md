# Section "Meine Leistungen" - Documentation

## Vue d'ensemble

Cette section présente les services de l'artisan sellier Sarah Röttig avec un design élégant et moderne, reflétant la noblesse et l'authenticité de l'artisanat.

## Structure des fichiers

```
src/app/
├── components/
│   ├── ServicesSection.tsx      # Composant principal de la section
│   ├── ServiceCard.tsx          # Carte individuelle de service
│   └── ImageWithFallback.tsx    # Composant image avec fallback
├── data/
│   └── servicesData.ts          # Données des services
└── layout.tsx                   # Configuration des polices

public/
└── images/
    └── services/                # Images des services
        ├── service-interieur-auto.jpg
        ├── service-reparatur.jpg
        ├── service-massanfertigung.jpg
        ├── service-motorrad.jpg
        ├── service-autositze.jpg
        └── placeholder-service.jpg (optionnel)
```

## Fonctionnalités

### 🎨 Design élégant
- **Palette de couleurs nobles** : Tons ambrés, beiges et gris sophistiqués
- **Typographie raffinée** : Cinzel pour les titres, Cormorant pour le texte
- **Animations fluides** : Transitions et effets hover subtils
- **Espacement généreux** : Design minimaliste avec beaucoup d'espace blanc

### 📱 Responsive Design
- **Mobile-first** : 1 colonne sur mobile
- **Tablette** : 2 colonnes sur tablette
- **Desktop** : 3 colonnes sur desktop
- **Adaptatif** : S'adapte parfaitement à tous les écrans

### 🖼️ Gestion des images
- **Optimisation** : Utilisation de `next/image` pour les performances
- **Fallback** : Placeholder élégant si l'image est manquante
- **Lazy loading** : Chargement optimisé des images
- **Responsive** : Tailles d'images adaptées selon l'écran

## Configuration des services

### Structure des données

Chaque service dans `servicesData.ts` contient :

```typescript
interface Service {
  id: string;              // Identifiant unique
  title: string;           // Titre du service
  description: string;     // Description détaillée
  imageSrc: string;        // Chemin vers l'image
  altText: string;         // Texte alternatif pour l'accessibilité
  ctaText: string;         // Texte du bouton d'action
  ctaLink: string;         // Lien vers la section contact
}
```

### Ajouter un nouveau service

1. Ajoutez l'objet service dans `src/app/data/servicesData.ts`
2. Placez l'image correspondante dans `public/images/services/`
3. Le service apparaîtra automatiquement dans la grille

### Exemple d'ajout :

```typescript
{
  id: "nouveau-service",
  title: "Nouveau Service",
  description: "Description détaillée du nouveau service...",
  imageSrc: "/images/services/nouveau-service.jpg",
  altText: "Description de l'image pour l'accessibilité",
  ctaText: "Service anfragen",
  ctaLink: "#contact"
}
```

## Images requises

Placez les images suivantes dans `public/images/services/` :

- `service-interieur-auto.jpg` - Innenausstattung
- `service-reparatur.jpg` - Reparaturen aller Art
- `service-massanfertigung.jpg` - Individuelle Anpassungen
- `service-motorrad.jpg` - Motorradsitzbänke
- `service-autositze.jpg` - Fahrzeugsattlerei
- `placeholder-service.jpg` - Image de fallback (optionnel)

## Organisation des images

### Structure recommandée :
```
public/images/
├── services/              # Images des services
├── hero/                  # Images de la section hero
├── about/                 # Images de la section à propos
├── gallery/               # Images de la galerie
└── contact/               # Images de la section contact
```

### Avantages de cette organisation :
- **Clarté** : Chaque section a son propre dossier
- **Maintenance** : Facile de trouver et remplacer les images
- **Évolutivité** : Structure extensible pour de futures sections
- **Performance** : Organisation logique pour l'optimisation

## Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.js` :

- **Noble** : Palette de tons ambrés sophistiqués
- **Luxury** : Gris neutres élégants
- **Warm** : Tons chauds et accueillants

### Polices

Les polices sont configurées dans `layout.tsx` :

- **Cinzel** : Titres principaux (serif élégant)
- **Cormorant** : Corps de texte (serif lisible)
- **Playfair Display** : Titres secondaires

### Animations

Animations personnalisées disponibles :

- `animate-fade-in` : Apparition en fondu
- `animate-slide-up` : Glissement vers le haut
- `animate-scale-in` : Apparition avec zoom

## Performance

### Optimisations incluses

- **Images optimisées** : Compression automatique avec Next.js
- **Lazy loading** : Chargement différé des images
- **Fallback intelligent** : Gestion gracieuse des images manquantes
- **CSS optimisé** : Classes Tailwind purgées en production

### Bonnes pratiques

- Utilisez des images de haute qualité (minimum 800x600px)
- Optimisez les images avant de les placer dans `public/images/services/`
- Testez sur différents appareils pour vérifier la responsivité

## Accessibilité

### Fonctionnalités incluses

- **Textes alternatifs** : Pour toutes les images
- **Navigation clavier** : Boutons accessibles au clavier
- **Contraste suffisant** : Respect des standards WCAG
- **Structure sémantique** : Balises HTML appropriées

## Support technique

### Dépendances requises

- Next.js 13+ avec App Router
- Tailwind CSS v4
- React 18+
- TypeScript

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

## Maintenance

### Mise à jour des services

1. Modifiez `servicesData.ts` pour changer les informations
2. Remplacez les images dans `public/images/services/` si nécessaire
3. Testez la responsivité sur différents appareils

### Ajout de nouvelles fonctionnalités

Le code est modulaire et extensible. Vous pouvez facilement :
- Ajouter de nouveaux types de cartes
- Modifier les animations
- Personnaliser les couleurs
- Ajouter des interactions supplémentaires 