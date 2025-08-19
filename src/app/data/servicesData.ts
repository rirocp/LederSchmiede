export interface SubService {
  id: string;
  title: string;
  description?: string;
  imageSrc?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  ctaText: string;
  ctaLink: string;
  slug?: string;
  details?: SubService[];
  longDescription?: string;
}

export const servicesData: Service[] = [
  {
    id: "innenausstattung",
    title: "Innenausstattung",
    description: "Ob sportlich, elegant, oder klassisch – ich gestalte Fahrzeuginnenräume nach deinen Wünschen. Dazu gehören unter anderem Sitze, Türverkleidungen, Armaturen, Lenkräder.",
    imageSrc: "/images/services/service-interieur-auto.jpg",
    altText: "Luxuriöse Innenausstattung eines Fahrzeugs mit hochwertigen Lederpolstern",
    ctaText: "Beratung anfragen",
    ctaLink: "/services/innenausstattung",
    slug: "innenausstattung",
    longDescription: "Ob sportlich, elegant, oder klassisch – ich gestalte Fahrzeuginnenräume nach deinen Wünschen. Dazu gehören unter anderem Sitze, Türverkleidungen, Armaturen, Lenkräder.",
    details: [
      { id: "sitze-polster", title: "Sitze & Polster" },
      { id: "armaturen", title: "Armaturen" },
      { id: "dachhimmel", title: "Dachhimmel" },
      { id: "sonnenblenden", title: "Sonnenblenden" },
      { id: "lenkraeder", title: "Lenkräder" },
      { id: "verkleidungen", title: "Verkleidungen" },
      { id: "teppiche", title: "Teppiche" },
      { id: "fussmatten", title: "Fußmatten" },
      { id: "schaltsack", title: "Schaltsack" },
      { id: "pflege-reinigung", title: "Pflege und Reinigung" }
    ]
  },
  {
    id: "motorradsitzbaenke",
    title: "Motorradsitzbänke",
    description: "Ob neu gepolstert, bezogen oder komplett umgestaltet – ich verleihe deiner Sitzbank den perfekten Look und Sitzkomfort ganz nach persönlichem Wunsch. Jede Sitzbank ist ein Unikat – maßgeschneidert für dich und dein Bike.",
    imageSrc: "/images/services/service-motorrad.jpg",
    altText: "Motorradsitzbank und Innenausstattung in professioneller Qualität",
    ctaText: "Sitzbank bearbeiten",
    ctaLink: "/services/motorradsitzbaenke",
    slug: "motorradsitzbaenke",
    longDescription: "Ob neu gepolstert, bezogen oder komplett umgestaltet – ich verleihe deiner Sitzbank den perfekten Look und Sitzkomfort ganz nach persönlichem Wunsch. Jede Sitzbank ist ein Unikat – maßgeschneidert für dich und dein Bike.",
    details: [
      { id: "sitzbank", title: "Sitzbank" },
      { id: "tanktasche", title: "Tanktasche" },
      { id: "rucksack", title: "Rucksack" },
      { id: "handschuhe", title: "Handschuhe" },
      { id: "weste", title: "Weste" }
    ]
  },
  {
    id: "reparatur",
    title: "Reparatur",
    description: "Nicht immer muss es gleich eine komplette Neuausstattung sein, oft reicht eine fachgerechte Reparatur. Ich behebe Abnutzungen, Risse, Löcher oder beschädigte Nähte zuverlässig.",
    imageSrc: "/images/services/serivce-reparatur.jpg",
    altText: "Professionelle Reparatur von Lederpolstern und Innenausstattung",
    ctaText: "Reparatur anfragen",
    ctaLink: "/services/reparatur",
    slug: "reparatur",
    longDescription: "Nicht immer muss es gleich eine komplette Neuausstattung sein, oft reicht eine fachgerechte Reparatur. Ich behebe Abnutzungen, Risse, Löcher oder beschädigte Nähte zuverlässig.",
    details: [
      { id: "leder-reparatur", title: "Leder Reparatur" },
      { id: "polster-reparatur", title: "Polster Reparatur" },
      { id: "naehte-reparatur", title: "Nähte Reparatur" },
      { id: "farben-reparatur", title: "Farben Reparatur" },
      { id: "struktur-reparatur", title: "Struktur Reparatur" }
    ]
  },
  {
    id: "polstermoebel",
    title: "Polstermöbel und Kleinmöbel",
    description: "Jedes Möbelstück erzählt eine Geschichte - ich helfe dabei, sie zu bewahren und neu erlebbar zu machen.",
    imageSrc: "/images/services/service-sofa.jpg",
    altText: "Polstermöbel und Kleinmöbel in professioneller Qualität",
    ctaText: "Möbel bearbeiten",
    ctaLink: "/services/polstermoebel",
    slug: "polstermoebel",
    longDescription: "Jedes Möbelstück erzählt eine Geschichte - ich helfe dabei, sie zu bewahren und neu erlebbar zu machen.",
    details: [
      { id: "sofas", title: "Sofas" },
      { id: "sessel", title: "Sessel" },
      { id: "stuehle", title: "Stühle" },
      { id: "kleinmoebel", title: "Kleinmöbel" },
      { id: "restaurierung", title: "Restaurierung" }
    ]
  },
  {
    id: "sonderanfertigungen",
    title: "Einzel- Sonderanfertigungen",
    description: "Gemeinsam machen wir aus deiner Idee ein handgemachtes Einzelstück – langlebig, durchdacht und mit Charakter.",
    imageSrc: "/images/services/service-massanfertigung.jpg",
    altText: "Individuelle Sonderanfertigungen in professioneller Qualität",
    ctaText: "Sonderanfertigung planen",
    ctaLink: "/services/sonderanfertigungen",
    slug: "sonderanfertigungen",
    longDescription: "Gemeinsam machen wir aus deiner Idee ein handgemachtes Einzelstück – langlebig, durchdacht und mit Charakter.",
    details: [
      { id: "design-planung", title: "Design & Planung" },
      { id: "material-auswahl", title: "Material Auswahl" },
      { id: "farben-gestaltung", title: "Farben & Gestaltung" },
      { id: "naehte-muster", title: "Nähte & Muster" },
      { id: "veredelung", title: "Veredelung" }
    ]
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const getAllServices = (): Service[] => {
  return servicesData;
}; 