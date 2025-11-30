# OpenOutsourcing.AI

Sito web professionale per consulenza anti-esternalizzazione. Propone di sostituire costose esternalizzazioni aziendali con soluzioni basate su AI Agents e vibe-coding.

**URL**: openoutsourcing.ai

---

## Stack Tecnologico

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.x
- **Animazioni**: Framer Motion 10
- **Form**: React Hook Form + Zod validation
- **Icone**: Lucide React
- **PDF Generation**: jsPDF

---

## Installazione Locale

### Prerequisiti

- Node.js >= 18.x
- npm >= 9.x

### Setup

```bash
# Clona il repository
git clone https://github.com/g95g95/OpenOutsourcing.git
cd OpenOutsourcing

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il sito sara disponibile su `http://localhost:5173`

### Comandi Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia server di sviluppo |
| `npm run build` | Build di produzione |
| `npm run preview` | Anteprima build locale |
| `npm run lint` | Esegue ESLint |

---

## Struttura Progetto

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Layout
│   ├── sections/      # Hero, Problem, Solution, Pricing, etc.
│   ├── forms/         # ConsultationForm
│   └── ui/            # Button, Card, Input, Select, Toast, Accordion
├── pages/             # Home, ThankYouDownload, ThankYouConsultation, Privacy
├── hooks/             # useFormSubmit
├── utils/             # validation.js (Zod schemas)
├── assets/
│   ├── images/
│   └── pdf/
└── styles/
    └── globals.css
```

---

## Variabili d'Ambiente

Il progetto attualmente **non richiede variabili d'ambiente obbligatorie** per il deploy base.

### Configurazione Formspree

Gli endpoint Formspree sono configurati direttamente nel codice:

- **ConsultationForm**: `src/components/forms/ConsultationForm.jsx` (linea 12)
- **Hook generico**: `src/hooks/useFormSubmit.js` (linee 3-7)

Per modificare l'endpoint Formspree, aggiorna direttamente il valore in questi file.

> **Nota**: Se preferisci usare variabili d'ambiente, puoi creare un file `.env` con:
>
> ```env
> VITE_FORMSPREE_CONSULTATION_ID=mnnejabr
> VITE_FORMSPREE_CONTACT_ID=your_id_here
> VITE_FORMSPREE_LEADMAGNET_ID=your_id_here
> ```
>
> E modificare il codice per usare `import.meta.env.VITE_FORMSPREE_*`

### Variabili Opzionali (per funzionalita future)

| Variabile | Descrizione | Obbligatoria |
|-----------|-------------|--------------|
| `VITE_GA_TRACKING_ID` | Google Analytics 4 ID | No |
| `VITE_FORMSPREE_CONSULTATION_ID` | ID form consultazione | No |
| `VITE_FORMSPREE_CONTACT_ID` | ID form contatto | No |
| `VITE_FORMSPREE_LEADMAGNET_ID` | ID form lead magnet | No |

---

## Deploy su Render

### 1. Crea un nuovo Static Site

1. Vai su [render.com](https://render.com) e accedi
2. Clicca **New +** > **Static Site**
3. Connetti il tuo repository GitHub

### 2. Configurazione Build

| Campo | Valore |
|-------|--------|
| **Name** | `openoutsourcing` (o nome a scelta) |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3. Variabili d'Ambiente su Render

Vai nella sezione **Environment** del tuo servizio e aggiungi le variabili necessarie.

**Variabili da configurare:**

| Chiave | Valore | Note |
|--------|--------|------|
| `NODE_VERSION` | `18` | Specifica versione Node.js |

> **Importante**: Se decidi di usare variabili d'ambiente per Formspree, aggiungile qui con il prefisso `VITE_` (es. `VITE_FORMSPREE_CONSULTATION_ID`)

### 4. Configurazione Dominio Personalizzato

1. In Render, vai su **Settings** > **Custom Domains**
2. Aggiungi `openoutsourcing.ai`
3. Configura i DNS del tuo dominio:

**Per dominio apex (openoutsourcing.ai):**
```
Tipo: A
Nome: @
Valore: 216.24.57.1
```

**Per www subdomain:**
```
Tipo: CNAME
Nome: www
Valore: openoutsourcing.onrender.com
```

### 5. Redirect Rules (SPA)

Per gestire correttamente il routing React, crea un file `public/_redirects`:

```
/*    /index.html   200
```

Oppure crea `render.yaml` nella root del progetto:

```yaml
services:
  - type: web
    name: openoutsourcing
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 6. Headers (Opzionale - Performance)

Crea `public/_headers` per ottimizzare caching:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## Checklist Pre-Deploy

- [ ] Verificare endpoint Formspree configurato correttamente
- [ ] Testare build locale con `npm run build && npm run preview`
- [ ] Verificare che tutte le pagine funzionino
- [ ] Controllare form di consultazione
- [ ] Testare su mobile (responsive)

---

## Formspree Setup

1. Crea account su [formspree.io](https://formspree.io)
2. Crea un nuovo form
3. Copia l'ID del form (es. `mnnejabr`)
4. Aggiorna l'endpoint in `src/components/forms/ConsultationForm.jsx`

---

## Troubleshooting

### Build fallisce su Render

- Verifica che `NODE_VERSION` sia impostato a `18` o superiore
- Controlla i log di build per errori specifici

### Pagine 404 dopo deploy

- Assicurati di aver configurato i redirect per SPA
- Aggiungi `_redirects` o `render.yaml` come descritto sopra

### Form non funziona

- Verifica l'ID Formspree nel codice
- Controlla che il form sia attivo su Formspree dashboard
- Verifica che l'email di destinazione sia confermata

---

## Licenza

Progetto privato - Tutti i diritti riservati.
