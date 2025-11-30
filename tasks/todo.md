# Piano di Sviluppo - OpenOutsourcing.AI

## Fase 1: Setup Progetto
- [x] Inizializzare progetto Vite + React
- [x] Installare dipendenze (Tailwind, Framer Motion, React Router, etc.)
- [x] Configurare Tailwind con design system
- [x] Creare struttura cartelle

## Fase 2: Componenti UI Base
- [x] Button component
- [x] Card component
- [x] Input component
- [x] Select component
- [x] Toast component
- [x] Accordion component

## Fase 3: Layout
- [x] Navbar responsive con menu mobile
- [x] Footer con social e CTA
- [x] Layout wrapper

## Fase 4: Sezioni Home
- [ ] Hero section (placeholder creato)
- [x] Problem section - contenuti forniti (outsourcing e impatto fatturato)
- [x] Solution section - contenuti forniti (AI agents e vibe-coding)
- [ ] LeadMagnet section
- [ ] About section
- [ ] Pricing section con simulatore
- [ ] PublicSector section
- [ ] Contact section

## Fase 5: Form
- [x] Setup validazione Zod
- [x] useFormSubmit hook
- [ ] LeadMagnetForm
- [ ] ContactForm
- [ ] ConsultationForm

## Fase 6: Pagine
- [x] Home page (struttura base)
- [x] ThankYouDownload page
- [x] ThankYouConsultation page
- [x] Privacy Policy page

## Fase 7: Ottimizzazioni
- [x] SEO meta tags (base)
- [ ] Responsive finale
- [ ] Test form con Formspree

---

## Review

### Setup Completato (Fase 1-3)

**File creati:**
- `package.json` - Dipendenze configurate
- `vite.config.js` - Configurazione Vite con alias @
- `tailwind.config.js` - Design system con colori custom (primary, accent, warning)
- `postcss.config.js` - PostCSS per Tailwind
- `index.html` - Con meta tags SEO e Google Fonts
- `.eslintrc.cjs` - ESLint per React
- `.gitignore` - File da ignorare

**Struttura src/:**
```
src/
├── main.jsx
├── App.jsx
├── styles/globals.css
├── components/
│   ├── layout/ (Layout, Navbar, Footer)
│   ├── ui/ (Button, Card, Input, Select, Toast, Accordion)
│   ├── sections/
│   └── forms/
├── pages/ (Home, ThankYouDownload, ThankYouConsultation, Privacy)
├── hooks/ (useFormSubmit)
├── utils/ (validation.js con Zod schemas)
└── assets/
    ├── images/
    └── pdf/
```

**Prossimi passi:** Implementare le sezioni della Home e i form completi.

---

### Sezioni Problem e Solution Completate

**Data:** 2025-11-30

**File creati:**
- `src/components/sections/Problem.jsx` - Sezione "Il Problema" con contenuti sull'outsourcing
- `src/components/sections/Solution.jsx` - Sezione "La Soluzione" con AI agents e vibe-coding

**File modificati:**
- `src/pages/Home.jsx` - Aggiunto import e utilizzo dei nuovi componenti

**Contenuti sezione Problem:**
- Introduzione all'esternalizzazione e forme (offshore, onshore, nearshoring, BPO, ITO)
- Mercato outsourcing Italia: 19 mld €, ~30.000 imprese, 200.000 addetti
- Benefici: risparmi fino al 70% sui costi personale, flessibilità, competenze
- Rischi: costi nascosti, perdita controllo, limiti differenziazione
- Caso studio Boeing 787 Dreamliner: -16% azioni in 5 settimane
- Impatto fatturato: quando aumenta e quando diminuisce
- Raccomandazioni strategiche

**Contenuti sezione Solution:**
- Agent AI come forza lavoro digitale (20-200€/mese, 24/7)
- Vibe-coding: sviluppo senza scrivere codice
- Vantaggi: aziende più snelle, rapide, sicure, scalabili
- 12 attività riportabili in-house in meno di 90 giorni
- Impatto pratico: da team esterni 30-50€/h a 1-2 persone con IA

**Caratteristiche tecniche:**
- Animazioni Framer Motion per effetti on-scroll
- Accordion espandibili per contenuti dettagliati
- Card statistiche con icone Lucide
- Grid responsive per dispositivi mobili
- Stile coerente con design system (colori primary, accent, warning)
