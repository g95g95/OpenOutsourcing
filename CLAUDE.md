# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with code in this repository.

# Best Practice
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY.
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.

# OpenOutsourcing.AI - Project Brief

## 🎯 Panoramica Progetto

Sito web professionale per consulenza anti-esternalizzazione. Il business model propone di sostituire costose esternalizzazioni aziendali con soluzioni basate su AI Agents e vibe-coding, con un modello di pricing "success fee" (50% del risparmio generato).

**URL Target**: openoutsourcing.ai
**Stack**: React 18 + Vite + Tailwind CSS 3.x + Framer Motion

---

## 💼 Value Proposition

> "Sostituisco le esternalizzazioni costose con AI Agents e automazioni. Primo consulto gratuito. Paghi solo il 50% di quello che risparmi."

Target: PMI, Enterprise, Pubblica Amministrazione italiana.

---

## 🏗️ Architettura Sito

### Pagine
- **Home** (single page con sezioni scroll)
- **/thank-you-download** (post lead magnet)
- **/thank-you-consultation** (post richiesta consulenza)
- **/privacy-policy**

### Sezioni Home (in ordine)
1. **Hero** - Headline d'impatto + 2 CTA (consulenza / download guida)
2. **Problem** - I danni dell'outsourcing con stats animate
3. **Solution** - AI Agents e vibe-coding spiegati semplice
4. **LeadMagnet** - Banner download PDF "5 Segnali"
5. **About** - Storia professionale + timeline carriera
6. **Pricing** - Consulto gratuito + Success Fee 50% + Simulatore risparmio
7. **PublicSector** - Focus PA e danno pubblico interesse
8. **Contact** - Form consulenza + info contatto

---

## 📧 Sistema Form (3 form distinti)

### 1. Lead Magnet Form
**Scopo**: Download PDF gratuito
**Campi**: nome*, email*, azienda, settore (select), privacy*, newsletter
**Action**: Formspree → redirect /thank-you-download
**Output**: PDF "5 Segnali che Stai Sprecando Soldi in Outsourcing"

### 2. Contact Form
**Scopo**: Richieste info generiche
**Campi**: nome*, email*, telefono, messaggio*, privacy*
**Action**: Formspree → toast success

### 3. Consultation Form
**Scopo**: Prenotazione consulenza gratuita
**Campi**: nome*, email*, telefono*, azienda*, settore, budget_outsourcing (select), esigenza*, fonte (select), privacy*
**Action**: Formspree → redirect /thank-you-consultation

**Validazione**: Zod + React Hook Form
**Gestione errori**: Inline, non perdere dati form

---

## 🎨 Design System
```
Colori:
- Primary: #0F172A (slate-900)
- Accent/Success: #10B981 (emerald-500)  
- Warning: #F59E0B (amber-500)
- Background: #F8FAFC (slate-50)
- Text: #1E293B (slate-800)

Font: Inter (system fallback)
Border Radius: 8px (rounded-lg)
Spacing: 8px grid system
```

**Stile**: Moderno, professionale, pulito. Animazioni sottili on-scroll. Cards con hover effect. Gradient mesh nel hero.

---

## 📁 Struttura Directory
```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout
│   ├── sections/      # Hero, Problem, Solution, About, Pricing, Contact...
│   ├── forms/         # LeadMagnetForm, ContactForm, ConsultationForm
│   └── ui/            # Button, Card, Input, Modal, Select, Toast, Accordion
├── pages/             # Home, ThankYouDownload, ThankYouConsultation, Privacy
├── hooks/             # useFormSubmit
├── utils/             # validation.js (Zod schemas)
├── assets/
│   ├── images/
│   └── pdf/           # 5-segnali-spreco-outsourcing.pdf
└── styles/
    └── globals.css
```

---

## 🔧 Dipendenze Chiave
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^10.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x",
  "lucide-react": "latest"
}
```

---

## ✅ Funzionalità Prioritarie

### Must Have (MVP)
- [ ] Landing page responsive completa
- [ ] 3 form funzionanti con Formspree
- [ ] Lead magnet flow (form → thank you → download)
- [ ] Simulatore risparmio interattivo
- [ ] SEO base (meta tags, OG)

### Nice to Have
- [ ] Dark mode toggle
- [ ] Calendly embed alternativo a form
- [ ] Google Analytics 4 events
- [ ] Animazioni scroll avanzate

---

## 📝 Contenuti Placeholder

Usare testi placeholder realistici in italiano. Il cliente fornirà:
- Bio professionale
- Foto
- Dati statistici verificati
- PDF completo lead magnet
- Privacy policy

---

## 🚀 Comandi Sviluppo
```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## 📌 Note Importanti

1. **Lingua**: Tutto in italiano
2. **Mobile-first**: Design responsive, breakpoints Tailwind standard
3. **Accessibilità**: ARIA labels, contrasto colori WCAG AA
4. **Performance**: Lazy load immagini, code splitting per routes
5. **Form UX**: Loading states, error handling graceful, success feedback chiaro
6. **Copy tone**: Professionale ma diretto, leggermente provocatorio sui problemi outsourcing

---

## 🔗 Risorse Esterne

- Formspree: https://formspree.io (setup 3 form)
- Icons: Lucide React
- Fonts: Inter via Google Fonts o system
- Hosting target: Vercel / Netlify

---

## Esempio Headline/Copy

**Hero**: "Le aziende bruciano milioni in outsourcing inutile. Io li fermo."

**Subtitle**: "Sostituisco consulenti esterni con AI Agents. Primo consulto gratis. Paghi solo se risparmi."

**CTA Primary**: "Prenota Consulenza Gratuita"
**CTA Secondary**: "Scarica la Guida: 5 Segnali di Spreco"

**Pricing tagline**: "Rischio zero. Guadagno garantito."