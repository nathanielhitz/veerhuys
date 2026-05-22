// ============================================================
// CENTRALE BEDRIJFSGEGEVENS — pas hier aan voor alle pagina's
// ============================================================

export const CAFE_NAME = "Café 't Veerhuys";
export const CAFE_NAME_SHORT = "Veerhuys";

export const contact = {
  naam: CAFE_NAME,
  adres: "Oosthavenzijde 1",
  postcode: "3297 LD",
  plaats: "Puttershoek",
  telefoon: "078-676-1453",
  telefoonLink: "tel:078-676-1453",
  email: "Veerhuysphoek@gmail.com",
  emailLink: "mailto:Veerhuysphoek@gmail.com",
};

export const social = {
  facebook: "https://www.facebook.com/Veerhuysphoek",
  instagram: "https://www.instagram.com/veerhuysphoek/",
  twitter: "https://twitter.com/veerhuysphoek",
  linktree: "https://linktr.ee/veerhuysphoek",
};

export type DagEntry = {
  dag: string;
  tijden: string;
  zomer?: string;
  gesloten?: boolean;
};

export const openingstijden: DagEntry[] = [
  { dag: "Maandag",   tijden: "15.00 – 21.00" },
  { dag: "Dinsdag",   tijden: "15.00 – 23.00" },
  { dag: "Woensdag",  tijden: "Gesloten", gesloten: true },
  { dag: "Donderdag", tijden: "15.00 – 23.00" },
  { dag: "Vrijdag",   tijden: "15.00 – 02.30" },
  { dag: "Zaterdag",  tijden: "15.00 – 02.30", zomer: "12.00 – 02.30" },
  { dag: "Zondag",    tijden: "Gesloten", gesloten: true, zomer: "11.00 – 19.00" },
];

export const zomeropening = {
  periode: "Mei t/m september",
  zaterdag: "Vanaf 12.00 uur",
  zondag: "11.00 – 19.00 uur",
  slectWeer: "Bij slecht weer: zaterdag vanaf 15.00, zondag gesloten",
  opmerking:
    "Actuele wijzigingen vind je via Google Bedrijfsprofiel of onze social media.",
};

export const nkSprietlopen = {
  jaar: 2026,
  datum: "Zaterdag 22 augustus 2026",
  indrinken: "Vrijdag 21 augustus 2026",
  locatie: "Haven van Puttershoek",
  entree: "Gratis op zaterdag",
  alcoholLeeftijd: "Alcohol uitsluitend voor 18+",
  history:
    "Het NK Sprietlopen kent een rijke traditie die teruggaat tot 1968, ontstaan aan de bar van Café 't Veerhuys.",
  beschrijving:
    "Een boomstam over de haven van Puttershoek. Eerste ronde zonder zeep, tweede ronde mét zeep. Iedereen kan meedoen — inschrijven op de dag zelf bij de jury op het terras.",
};

// TODO: vervang placeholder-URLs door echte foto's zodra aangeleverd
export const images = {
  heroPlaceholder: "/images/achtergrond-homepagina.png",
  terrasSfeer: "https://picsum.photos/seed/veerhuys-terras/900/600",
  avondSfeer: "https://picsum.photos/seed/veerhuys-nacht/900/600",
  nkSpriet: "/images/DSC_3281.jpeg",
  gallerijA: "https://picsum.photos/seed/veerhuys-g1/800/600",
  gallerijB: "https://picsum.photos/seed/veerhuys-g2/800/600",
  gallerijC: "https://picsum.photos/seed/veerhuys-g3/800/600",
  gallerijD: "https://picsum.photos/seed/veerhuys-g4/800/600",
};
