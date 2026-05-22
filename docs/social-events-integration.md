# Social Events Integration — Technische Analyse
**Café 't Veerhuys · Vite + React SPA op Vercel**
_Datum: mei 2026 · Auteur: Claude Code_

---

## 1. Huidige situatie

De site is een pure **client-side Vite/React SPA** zonder eigen backend. Alle evenementendata staat hardcoded in `AgendaPage.tsx`. Er is al een TODO-comment:

```tsx
{/* TODO: vervang door dynamische evenementen zodra agenda-beheer beschikbaar is */}
```

De eigenaar beheert speciale evenementen via Facebook/Instagram. Het doel is dat hij nieuwe evenementen kan publiceren **zonder de code of Vercel aan te hoeven raken**.

**Technische randvoorwaarden:**
- Geen scraping — alleen officiële APIs/embeds
- Tokens nooit client-side zichtbaar (→ Vercel serverless function als proxy)
- Hardcoded content blijft als fallback
- Modulaire `EventsProvider` abstractie voor uitbreidbaarheid

---

## Optie 1 — Social feed tonen op de agenda-pagina

### Wat het is
Toon de laatste Instagram- of Facebook-posts van de pagina direct op de website, als sfeerblock onder de agenda.

### Varianten

**A. Third-party embed (Behold.so, ElfSight, SnapWidget)**
- Geen eigen token-beheer — de dienst handelt OAuth af
- Kosten: ~€15–€25/maand na gratis tier
- Implementatie: één `<script>`-tag of `<iframe>`
- ✅ Geen onderhoud, werkt altijd, GDPR-compliant (via toestemming)
- ⚠️ Vendor lock-in, styling beperkt aanpasbaar

**B. Meta Graph API — Instagram Business posts**
- Instagram-account moet gekoppeld zijn aan een Facebook Business Page
- Benodigde scope: `instagram_basic`, `pages_read_engagement`
- Long-lived Page Access Token (60 dagen, verlengbaar)
- Server-side Vercel Function als proxy
- ✅ Officieel, gratis
- ⚠️ Token refresh vereist beheer, posts zijn geen gestructureerde agenda

### Beoordeling
Posts bevatten **geen gestructureerde datum/tijd/titelvelden**. Bruikbaar als sfeerblock ("Laatste updates"), maar **niet als volwaardige agenda**. Alleen inzetten als aanvullende sectie, niet als vervanger voor gestructureerde evenementen.

---

## Optie 2 — Facebook Events via Meta Graph API

### Wat het is
Facebook Events van de pagina ophalen en als agenda tonen via de officiële Meta Graph API.

### Vereiste permissions
| Permission | Doel | App Review nodig? |
|---|---|---|
| `pages_read_engagement` | Posts + basis page-data lezen | Nee (eigen page) |
| `pages_read_user_content` | Page events lezen | Nee (eigen page) |

### Token-flow
1. Eigenaar logt in via Facebook Login (eenmalig)
2. Short-lived User Access Token (1 uur) omwisselen voor Long-lived token (60 dagen)
3. Via `/me/accounts` een **Page Access Token** ophalen (never-expiring als de user token lang genoeg is)
4. Token opslaan als Vercel Environment Variable
5. Vercel Function ruilt token automatisch op via `fb_exchange_token` vóór verlopen

### Vercel implementatie (schets)
```
/api/events.ts          ← serverless function, token zit in env vars
GET /api/events         ← frontend roept dit aan
```

Endpoint intern:
```
GET https://graph.facebook.com/v20.0/{page-id}/events
  ?fields=name,start_time,end_time,description,cover,place
  &access_token={PAGE_ACCESS_TOKEN}
```

### Beoordeling
| | |
|---|---|
| ✅ | Volledig gratis, officieel |
| ✅ | Evenementen hebben naam, datum, tijd, beschrijving |
| ✅ | Eigenaar post op Facebook → website bijgewerkt |
| ⚠️ | Token-beheer complex (verlopen, refresh, opslaan in Vercel) |
| ⚠️ | Meta API versies lopen af (~2 jaar per major versie) |
| ⚠️ | Fragiel bij Facebook-account of pagina-instellingen wijziging |
| ⛔ | Te complex voor kleine horeca-site zonder technische beheerder |

**Conclusie:** Technisch haalbaar, maar te kwetsbaar als enige bron. Wel geschikt als **optionele extra laag** bovenop een CMS (d.w.z. data komt uit CMS, maar kan later optioneel gespiegeld worden vanuit Facebook Events).

---

## Optie 3 — CMS-gebaseerde evenementen (aanbevolen)

### Vergelijking van CMS-opties

| Oplossing | Prijs | Technisch niveau eigenaar | Implementatie-complexiteit | Opmerkingen |
|---|---|---|---|---|
| **Google Sheets** | Gratis | Laag (Excel-achtig) | Laag | Gepubliceerde CSV, geen token nodig |
| **Airtable** | Gratis tier | Laag | Laag | Nette UI, stabiele REST API |
| **Notion** | Gratis | Gemiddeld | Gemiddeld | API is goed, maar Notion kan traag zijn |
| **Sanity** | Gratis (klein) | Hoog | Hoog | Overkill voor één pagina |
| **Decap CMS** | Gratis | Gemiddeld | Gemiddeld | Git-based, vergt GitHub kennis |
| **JSON in repo** | Gratis | Hoog | Laag | Vereist commit/push voor elke update |

### Aanbevolen: Google Sheets (MVP) of Airtable (upgradepad)

**Google Sheets voordelen:**
- Eigenaar kent spreadsheets
- "Publiceren als CSV" — geen tokens nodig voor publieke sheet
- Vercel Function parst CSV → stuurt JSON naar frontend
- Gratis, geen account-aanmaak vereist

**Airtable voordelen:**
- Nettere tabel-UI, betere validatie
- REST API met API-key (server-side env var)
- Goed geschikt als het gebruik groeit

### Datamodel evenementen
```
titel         string     "Carnaval Party"
datum         date       "2026-02-14"
tijdVan       time       "22:30"
tijdTot       time       "03:00"
beschrijving  text       "Verkleed komen = gratis entree"
afbeeldingUrl string     "https://..."   (optioneel)
label         string     "Feest"         (bijv. Feest / Live / DJ / Oud & Nieuw)
socialUrl     string     "https://fb.com/events/..."   (optioneel)
gepubliceerd  boolean    true
```

---

## Optie 4 — Automatisering via Zapier / Make / n8n

### Scenario's

**A. Google Sheets → Facebook/Instagram post**
```
Nieuwe rij in sheet → Zapier/Make → Facebook post aanmaken + Instagram story
```
- Voordeel: eigenaar vult sheet in, social media gaat automatisch
- Nadeel: Instagram automatisch posten vereist Meta Business Account + approved permissions

**B. Facebook Event → concept-item voor website**
```
Nieuw Facebook Event → Webhook → rij toevoegen aan Google Sheets
```
- Eigenaar post op Facebook → website-agenda wordt automatisch bijgewerkt als concept
- Voordeel: bron van waarheid blijft Facebook
- Nadeel: token-beheer, fragiel bij API-wijzigingen

**C. Nieuw evenement aangemaakt via Airtable automations**
- Airtable heeft ingebouwde automations voor berichten naar Slack/email
- Kan eigenaar notificeren als een event bijna is maar nog niet gepubliceerd

### Beoordeling
| | |
|---|---|
| ✅ | Geen codeer-werk voor eigenaar |
| ✅ | Verbindt CMS met social media in beide richtingen |
| ⚠️ | Zapier/Make kosten geld na gratis tier |
| ⚠️ | n8n is zelf te hosten (technischer) |
| ⚠️ | Fragiel bij API-versiewijzigingen van Meta |

**Conclusie:** Goed als **tweede fase** nadat het CMS stabiel draait. Niet als MVP.

---

## Aanbeveling MVP

### Fase 1 — Google Sheets als EventsProvider (nu)

```
Eigenaar vult Google Sheets in
  ↓
Google Sheets "publiceren als CSV" (eenmalig instellen)
  ↓
Vercel API Route /api/events.ts parst CSV → JSON
  ↓
EventsProvider hook in frontend fetcht /api/events
  ↓
AgendaPage toont dynamische events + hardcoded fallback
```

**Waarom dit werkt voor Veerhuys:**
- Eigenaar hoeft alleen een spreadsheet bij te houden
- Geen tokens, geen OAuth, geen verlopen keys
- Zero kosten
- Vercel Function is server-side → veilig
- Hardcoded content blijft onveranderd als fallback

### Fase 2 — Instagram "Laatste updates" sectie (optioneel)

Gebruik **Behold.so** of een vergelijkbare dienst voor een simpele Instagram feed embed onderaan de agenda. Eigenaar hoeft niets te doen — feed update automatisch.

Alternatief: een sfeer-sectie met alleen een link + screenshot-afbeelding en een "Volg ons op Instagram" CTA (geen API nodig, geen onderhoud).

### Fase 3 — Meta Graph API (later, optioneel)

Zodra de eigenaar structureel Facebook Events aanmaakt, kan de `EventsProvider` worden uitgebreid met een `FacebookEventsProvider` die als primaire bron fungeert (met Google Sheets als fallback/override).

---

## Technische architectuur

### EventsProvider abstractie

```typescript
// src/providers/types.ts
export interface CalendarEvent {
  id: string
  title: string
  date: string        // "2026-02-14"
  timeFrom?: string   // "22:30"
  timeTo?: string     // "03:00"
  description?: string
  imageUrl?: string
  label?: string      // "Feest" | "Live" | "DJ" | etc.
  socialUrl?: string
}

export interface EventsProvider {
  getEvents(): Promise<CalendarEvent[]>
}
```

```
src/
  providers/
    types.ts                   ← CalendarEvent + EventsProvider interface
    GoogleSheetsProvider.ts    ← Fase 1
    FacebookEventsProvider.ts  ← Fase 3 (stub, later invullen)
    StaticEventsProvider.ts    ← Huidige hardcoded data als fallback
  hooks/
    useEvents.ts               ← React hook, roept /api/events aan
api/
  events.ts                    ← Vercel serverless function
```

### Vercel API route (server-side, token veilig)

```typescript
// api/events.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

const SHEET_CSV_URL = process.env.GOOGLE_SHEET_CSV_URL  // env var op Vercel

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(SHEET_CSV_URL!)
    const csv = await response.text()
    const events = parseEventsFromCsv(csv)
    res.setHeader('Cache-Control', 's-maxage=300')       // 5 min cache op CDN
    res.json(events)
  } catch {
    res.status(500).json({ error: 'Could not fetch events' })
  }
}
```

### Frontend hook met fallback

```typescript
// src/hooks/useEvents.ts
import { useState, useEffect } from 'react'
import type { CalendarEvent } from '../providers/types'
import { FALLBACK_EVENTS } from '../data/siteData'   // huidige hardcoded data

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(FALLBACK_EVENTS)
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<'api' | 'fallback'>('fallback')

  useEffect(() => {
    fetch('/api/events')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: CalendarEvent[]) => {
        setEvents(data)
        setSource('api')
      })
      .catch(() => setSource('fallback'))
      .finally(() => setLoading(false))
  }, [])

  return { events, loading, source }
}
```

---

## Setup instructies (fase 1 — Google Sheets)

### Eenmalige setup door ontwikkelaar

1. **Google Sheets aanmaken** met kolommen:
   `id | titel | datum | tijdVan | tijdTot | beschrijving | afbeeldingUrl | label | socialUrl | gepubliceerd`

2. **Publiceren als CSV:**
   Sheet → Bestand → Publiceren op internet → Kies blad → CSV → URL kopiëren

3. **Vercel env var instellen:**
   Vercel Dashboard → Project → Settings → Environment Variables:
   ```
   GOOGLE_SHEET_CSV_URL = https://docs.google.com/spreadsheets/d/.../export?format=csv
   ```

4. **Vercel node runtime inschakelen** (nodig voor serverless function):
   `vercel.json` aanmaken met:
   ```json
   { "functions": { "api/**/*.ts": { "runtime": "nodejs20.x" } } }
   ```

5. Deploy → test via `https://veerhuys.vercel.app/api/events`

### Beheerflow voor eigenaar (dagelijks gebruik)

```
1. Open Google Sheets (bookmark)
2. Voeg rij toe met evenement-gegevens
3. Zet "gepubliceerd" op TRUE
4. Website is binnen 5 minuten bijgewerkt (CDN-cache)
```

Geen code. Geen Vercel. Geen GitHub.

---

## Omgevingsvariabelen overzicht

| Variabele | Waarde | Wanneer nodig |
|---|---|---|
| `GOOGLE_SHEET_CSV_URL` | Gepubliceerde CSV-URL van Google Sheet | Fase 1 |
| `AIRTABLE_API_KEY` | Personal Access Token | Alternatief fase 1 |
| `AIRTABLE_BASE_ID` | Base ID uit Airtable | Alternatief fase 1 |
| `FB_PAGE_ACCESS_TOKEN` | Long-lived Page Token | Fase 3 |
| `FB_PAGE_ID` | Numeriek page-ID | Fase 3 |

**Alle variabelen zijn uitsluitend server-side beschikbaar** via Vercel Environment Variables. Nooit via `VITE_` prefix — dan worden ze client-side gebundeld en zichtbaar in de browser.

---

## Risico's en mitigaties

| Risico | Kans | Impact | Mitigatie |
|---|---|---|---|
| Google Sheet CSV-URL wijzigt | Laag | Hoog | Fallback naar hardcoded data |
| Meta API breekt / token verloopt | Hoog | Gemiddeld | Google Sheets blijft primaire bron |
| Eigenaar vergeet sheet bij te houden | Gemiddeld | Laag | Hardcoded vaste evenementen (DJ Danzz) blijven altijd zichtbaar |
| Vercel Function cold start | Laag | Laag | `Cache-Control: s-maxage=300` op CDN |
| Google publiceert sheet-format anders | Laag | Hoog | Overstap naar Airtable is modulair |

---

## Samenvatting aanbeveling

| Fase | Wat | Wanneer |
|---|---|---|
| **1 (MVP)** | Google Sheets als EventsProvider + Vercel API route | Nu |
| **2 (optioneel)** | Instagram "Laatste updates" via Behold.so embed of CTA-sectie | Na fase 1 |
| **3 (later)** | FacebookEventsProvider als aanvullende data-laag | Zodra eigenaar structureel Facebook Events gebruikt |
| **4 (optioneel)** | Zapier/Make: sheet → social media posting | Als eigenaar niet meer handmatig wil posten |

De architectuur is modulair: de `EventsProvider` interface garandeert dat je de databron kunt wisselen zonder de UI aan te raken.
