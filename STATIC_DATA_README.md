# Structure de Données Statiques - Leder Schmiede

## 🎯 **Objectif**
Remplacer le localStorage par des données statiques pour garantir que toutes les informations soient visibles pour tous les visiteurs du site publié.

## 📁 **Structure des Fichiers**

### **1. Données de la Galerie**
- **Fichier** : `src/app/data/galleryData.ts`
- **Contenu** : Photos, descriptions, catégories
- **Utilisation** : Page galerie, section galerie, gestionnaire admin

### **2. Données des Services**
- **Fichier** : `src/app/data/servicesData.ts`
- **Contenu** : Services, descriptions, sous-services
- **Utilisation** : Section services, pages de services, gestionnaire admin

### **3. Données des Thèmes**
- **Fichier** : `src/app/data/themeData.ts`
- **Contenu** : Thèmes prédéfinis, couleurs
- **Utilisation** : Gestionnaire de thèmes, personnalisation

### **4. Données du Hero**
- **Fichier** : `src/app/data/heroData.ts`
- **Contenu** : Image principale, titre, sous-titre
- **Utilisation** : Section hero, gestionnaire admin

## 🔄 **Composants Modifiés**

### **Galerie**
- `src/app/gallery/page.tsx` - Page galerie
- `src/app/components/GallerySection.tsx` - Section galerie
- `src/app/admin/GalleryManager.tsx` - Gestionnaire admin

### **Services**
- `src/app/components/ServicesSection.tsx` - Section services
- `src/app/services/[slug]/page.tsx` - Pages de services

### **Hero**
- `src/app/components/HeroSection.tsx` - Section hero

## ✅ **Avantages de la Nouvelle Structure**

1. **Visibilité garantie** : Toutes les données sont visibles pour tous les visiteurs
2. **Performance** : Pas de chargement depuis localStorage
3. **Maintenance** : Données centralisées et faciles à modifier
4. **Déploiement** : Fonctionne immédiatement sur tous les serveurs
5. **SEO** : Contenu indexable par les moteurs de recherche

## 🚀 **Pour Ajouter de Nouvelles Données**

### **Ajouter une nouvelle photo à la galerie :**
```typescript
// Dans src/app/data/galleryData.ts
export const galleryData: GalleryItem[] = [
  // ... photos existantes
  {
    id: '9',
    src: "/images/gallery/nouvelle-photo.jpg",
    description: "Description de la nouvelle photo",
    category: "Nouvelle Catégorie",
    order: 9
  }
];
```

### **Ajouter un nouveau service :**
```typescript
// Dans src/app/data/servicesData.ts
export const servicesData: Service[] = [
  // ... services existants
  {
    id: "nouveau-service",
    title: "Nouveau Service",
    description: "Description du nouveau service",
    // ... autres propriétés
  }
];
```

## 📝 **Notes Importantes**

- **Images** : Toutes les images doivent être placées dans `/public/images/`
- **Données** : Modifier uniquement les fichiers dans `/src/app/data/`
- **Déploiement** : Après modification, commiter et pousser sur GitHub
- **Cache** : Les modifications sont immédiatement visibles

## 🔧 **Migration Complète**

La migration du localStorage vers les données statiques est maintenant terminée. Tous les composants utilisent les données statiques et le site fonctionnera parfaitement une fois publié. 