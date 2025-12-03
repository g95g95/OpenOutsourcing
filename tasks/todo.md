# Piano: Calendario Prenotazioni, PDF Migliorato e Fix Accenti

## Obiettivo
1. Aggiungere sistema di calendario per prenotare consulenze con slot di 30 minuti
2. Migliorare l'esportazione PDF del quiz rendendola più accattivante
3. Sistemare gli accenti rotti nel file OutsourcingQuiz.jsx

---

## Todo List

### 1. Fix Accenti (Quick Win)
- [x] Correggere encoding in OutsourcingQuiz.jsx:
  - "più" corretto (linee 7, 10)
  - "difficoltà" corretto (linea 9)
  - "opportunità" corretto (linea 29)
  - "È" corretto (linea 36)
  - "Sì" corretto (linea 160)
- [x] Correggere encoding in ConsultationForm.jsx:
  - "attività" corretto (linee 40-42)

### 2. Sistema Calendario Prenotazioni
- [x] Creare componente `CalendarBooking.jsx` con:
  - Selezione data (date picker)
  - Slot orari di 30 minuti (9:00-18:00)
  - Blocco slot già prenotati (localStorage)
  - Solo Lun-Ven (weekend disabilitati)
- [x] Definire orari disponibili (9:00-18:00)
- [x] Salvare prenotazioni e bloccare slot già presi
- [x] Integrare calendario nella sezione Contact

### 3. Miglioramento PDF Export
- [x] Rendere PDF più accattivante:
  - Header con banda colorata emerald e branding
  - Box colorato per risultato principale (verde/giallo/rosso)
  - Barra progresso visuale del punteggio
  - Box per ogni risposta con indicatori colorati (OK/!)
  - Sezione CTA con sfondo emerald
  - Footer con contatti e info
  - Data generazione dinamica nel nome file

---

## Note Tecniche

### Calendario
- Slot: 30 minuti
- Orari: 9:00 - 18:00 (configurabile)
- Giorni: Lun-Ven (no weekend)
- Storage: localStorage per MVP (può evolvere a backend)
- La data/ora selezionata viene inviata insieme al form

### File Creati
1. `src/components/ui/CalendarBooking.jsx` - Nuovo componente calendario prenotazioni

### File Modificati
1. `src/components/sections/OutsourcingQuiz.jsx`:
   - Fix encoding accenti nelle domande
   - PDF export completamente riscritto con design moderno

2. `src/components/forms/ConsultationForm.jsx`:
   - Fix encoding "attività"
   - Integrazione CalendarBooking
   - Data/ora appuntamento inviata via email
   - Prenotazione salvata in localStorage dopo invio

### Funzionalità Implementate

#### Calendario Prenotazioni
- **Date Picker**: Navigazione mese per mese
- **Slot 30 min**: 9:00, 9:30, 10:00... fino alle 17:30
- **Solo giorni lavorativi**: Lun-Ven (weekend disabilitati)
- **Blocco slot prenotati**: localStorage persiste le prenotazioni
- **UI moderna**: Header verde, stati hover, riepilogo selezione

#### PDF Migliorato
- **Header brandizzato**: Banda emerald con titolo e tagline
- **Box risultato**: Sfondo colorato in base al punteggio
- **Barra progresso**: Visuale del punteggio 0-7
- **Risposte stilizzate**: Box per ogni domanda con badge OK/!
- **CTA finale**: Banner verde per prenotare consulenza
- **Footer informativo**: Contatti e data generazione

### Note Tecniche
- Il calendario usa localStorage per MVP (ogni browser ha le sue prenotazioni)
- Per un sistema condiviso servirebbe un backend
- Il PDF include la data nel nome file per organizzazione
