# Café 't Veerhuys — Website

Moderne website voor Café 't Veerhuys in Puttershoek.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v3**
- **React Router v6**
- **Framer Motion** (animaties)
- **Phosphor Icons**

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Bouwen voor productie

```bash
npm run build
npm run preview   # preview van de build
```

## Structuur

```
src/
  data/
    siteData.ts        ← alle bedrijfsgegevens (adres, tijden, etc.) — pas hier aan
  components/
    Navigation.tsx
    Footer.tsx
    ui/
      Button.tsx
      SectionLabel.tsx
  pages/
    HomePage.tsx
    TerrasPage.tsx
    AgendaPage.tsx
    NKSprietlopenPage.tsx
    HuisregelsPage.tsx
    ContactPage.tsx
```

## TODO's

- [ ] Vervang placeholder-foto's (picsum.photos) door echte foto's van het café en terras
- [ ] Voeg Google Maps embed in bij Contact en Homepage
- [ ] Koppel contactformulier aan e-mailservice (bijv. Resend, Formspree of Netlify Forms)
- [ ] Voeg favicon toe (vervang `/public/vite.svg`)
- [ ] Actualiseer NK Sprietlopen datum/info jaarlijks in `src/data/siteData.ts`
- [ ] Overweeg fontsource-paketten voor Playfair Display en Plus Jakarta Sans (geen Google Fonts CDN-afhankelijkheid)
- [ ] Stel Google Analytics of Plausible in voor bezoekersstatistieken (optioneel)
- [ ] Controleer openingstijden bij elke seizoenswisseling

## Bedrijfsgegevens aanpassen

Pas `src/data/siteData.ts` aan. Alle pagina's gebruiken deze centrale data.

## Foto's toevoegen

Zet foto's in `/public/images/` en update de URLs in `src/data/siteData.ts`:

```ts
export const images = {
  heroPlaceholder: '/images/hero.jpg',
  terrasSfeer:     '/images/terras.jpg',
  // ...
}
```
