export interface HeroData {
  heroImage: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export const defaultHeroData: HeroData = {
  heroImage: "/images/hero/hero.jpg",
  title: "Leder Schmiede",
  subtitle: "Traditionelle Handwerkskunst für Ihre Fahrzeuge",
  ctaText: "Meine Leistungen entdecken"
};

export const getHeroData = (): HeroData => {
  return defaultHeroData;
}; 