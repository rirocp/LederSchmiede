export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  category: string;
  order: number;
}

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    src: "/images/gallery/Innenaussatattung1.jpeg",
    title: "",
    description: "",
    category: "Innenausstattung",
    order: 1
  },
  {
    id: '2',
    src: "/images/gallery/Innenaussatattung2.jpeg",
    title: "",
    description: "",
    category: "Innenausstattung",
    order: 2
  },
  {
    id: '3',
    src: "/images/gallery/Innenaussatattung3.jpeg",
    title: "",
    description: "",
    category: "Innenausstattung",
    order: 3
  },
  {
    id: '4',
    src: "/images/gallery/Motorrad.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 4
  },
  {
    id: '5',
    src: "/images/gallery/Motorrad2.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 5
  },
  {
    id: '6',
    src: "/images/gallery/Motorrad3.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 6
  },
  {
    id: '7',
    src: "/images/gallery/Motorrad4.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 7
  },
  {
    id: '8',
    src: "/images/gallery/Motorrad5.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 8
  },
  {
    id: '9',
    src: "/images/gallery/Motorrad6.jpeg",
    title: "",
    description: "",
    category: "Motorrad",
    order: 9
  },
  {
    id: '10',
    src: "/images/gallery/Sitzbänke1.jpeg",
    title: "",
    description: "",
    category: "Sitzbänke",
    order: 10
  },
  {
    id: '11',
    src: "/images/gallery/Sitzbänke2.jpeg",
    title: "",
    description: "",
    category: "Sitzbänke",
    order: 11
  },
  {
    id: '12',
    src: "/images/gallery/Sitzbänke3.jpeg",
    title: "",
    description: "",
    category: "Sitzbänke",
    order: 12
  },
  {
    id: '13',
    src: "/images/gallery/Sonderanfertigung1.jpeg",
    title: "",
    description: "",
    category: "Sonderanfertigung",
    order: 13
  },
  {
    id: '14',
    src: "/images/gallery/Sonderanfertigung2.jpeg",
    title: "",
    description: "",
    category: "Sonderanfertigung",
    order: 14
  },
  {
    id: '15',
    src: "/images/gallery/Sonderanfertigung3.jpeg",
    title: "",
    description: "",
    category: "Sonderanfertigung",
    order: 15
  },
  {
    id: '16',
    src: "/images/gallery/Sonderanfertigung4.jpeg",
    title: "",
    description: "",
    category: "Sonderanfertigung",
    order: 16
  }
];

export const getGalleryByCategory = (category: string): GalleryItem[] => {
  if (category === 'Alle') {
    return galleryData;
  }
  return galleryData.filter(item => item.category === category);
};

export const getGalleryCategories = (): string[] => {
  const categories = galleryData.map(item => item.category);
  return ['Alle', ...Array.from(new Set(categories))];
}; 