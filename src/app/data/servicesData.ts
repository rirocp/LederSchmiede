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
    description: "Komplette Innenausstattung für Fahrzeuge aller Art - von der Planung bis zur Fertigstellung mit hochwertigen Materialien und traditioneller Handwerkskunst.",
    imageSrc: "/images/services/service-interieur-auto.jpg",
    altText: "Luxuriöse Innenausstattung eines Fahrzeugs mit hochwertigen Lederpolstern",
    ctaText: "Beratung anfragen",
    ctaLink: "/services/innenausstattung",
    slug: "innenausstattung",
    longDescription: "Ich biete eine vollständige Innenausstattung für alle Fahrzeugtypen. Von der ersten Beratung bis zur finalen Fertigstellung verwende ich ausschließlich hochwertige Materialien und traditionelle Handwerkstechniken.",
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
    id: "reparaturen",
    title: "Reparaturen aller Art",
    description: "Professionelle Reparatur und Restauration von Polstermöbeln - ich gebe Ihren Lieblingsstücken ein zweites Leben mit handwerklicher Perfektion.",
    imageSrc: "/images/services/service-reparatur.jpg",
    altText: "Handwerker bei der sorgfältigen Reparatur eines Polstermöbels",
    ctaText: "Reparatur anfragen",
    ctaLink: "/services/reparaturen",
    slug: "reparaturen-aller-art",
    longDescription: "Meine Reparaturarbeiten umfassen die professionelle Wiederherstellung und Restauration von Polstermöbeln aller Art. Mit jahrelanger Erfahrung und handwerklicher Perfektion gebe ich Ihren Lieblingsstücken ein zweites Leben.",
    details: [
      { id: "sessel", title: "Sessel" },
      { id: "sofa-couchs", title: "Sofa und Couchs" },
      { id: "stuehle", title: "Stühle" }
    ]
  },
  {
    id: "individuelle-anpassungen",
    title: "Individuelle Anpassungen",
    description: "Maßgeschneiderte Lösungen nach Ihren individuellen Wünschen - von der ersten Skizze bis zum fertigen Unikat, gefertigt mit Liebe zum Detail.",
    imageSrc: "/images/services/service-massanfertigung.jpg",
    altText: "Maßgeschneiderte Polsterarbeiten in verschiedenen Stadien der Fertigung",
    ctaText: "Unikat planen",
    ctaLink: "/services/individuelle-anpassungen",
    slug: "individuelle-anpassungen",
    longDescription: "Jedes Projekt ist einzigartig. Von der ersten Idee bis zur Fertigstellung arbeite ich eng mit Ihnen zusammen, um maßgeschneiderte Lösungen zu entwickeln, die genau Ihren Vorstellungen entsprechen.",
    details: [
      { id: "massanfertigungen", title: "Individuelle Anpassungen und Sonderanfertigungen" }
    ]
  },
  {
    id: "motorradsitzbaenke",
    title: "Motorradsitzbänke",
    description: "Maßgefertigte Sitzbänke für Motorräder aller Marken - optimaler Komfort und individuelle Gestaltung für Ihre einzigartige Fahrt.",
    imageSrc: "/images/services/service-motorrad.jpg",
    altText: "Maßgefertigte Motorradsitzbank mit hochwertiger Verarbeitung",
    ctaText: "Sitzbank konfigurieren",
    ctaLink: "/services/motorradsitzbaenke",
    slug: "motorradsitzbaenke",
    longDescription: "Ich spezialisiere mich auf die Herstellung maßgefertigter Motorradsitzbänke für alle Marken und Modelle. Jede Sitzbank wird individuell angepasst für optimalen Komfort und Ihre persönlichen Vorlieben.",
    details: [
      { id: "auf-ab-polstern", title: "Auf- und Ab- polstern" },
      { id: "schaumstoff-anpassen", title: "Schaumstoff anpassen im Härtegrad" },
      { id: "bezuege-umaendern", title: "Bezüge umändern auf Wunschvorstellung" }
    ]
  },
  {
    id: "fahrzeugsattlerei",
    title: "Fahrzeugsattlerei",
    description: "Neubezug und Reparatur von Autositzen und Fahrzeugpolstern - ich verwandle Ihr Fahrzeug mit handwerklicher Meisterschaft.",
    imageSrc: "/images/services/service-autositze.jpg",
    altText: "Neubezogene Autositze mit edlem Leder und perfekter Verarbeitung",
    ctaText: "Sitze renovieren",
    ctaLink: "/services/fahrzeugsattlerei",
    slug: "fahrzeugsattlerei",
    longDescription: "Meine Fahrzeugsattlerei umfasst den kompletten Neubezug und die Reparatur von Autositzen und Fahrzeugpolstern. Mit handwerklicher Meisterschaft verwandle ich Ihr Fahrzeug in ein einzigartiges Schmuckstück.",
    details: [
      { id: "polster-moebel", title: "Polster und Bezüge Möbel und Kleinmöbel" }
    ]
  }
]; 