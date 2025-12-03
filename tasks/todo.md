# Piano: Calendario Prenotazioni, PDF Migliorato e Fix Accenti

## Obiettivo
1. Aggiungere sistema di calendario per prenotare consulenze con slot di 30 minuti
2. Migliorare l'esportazione PDF del quiz rendendola più accattivante
3. Sistemare gli accenti rotti nel file OutsourcingQuiz.jsx

---

## Todo List

### 1. Fix Accenti (Quick Win)
- [ ] Correggere encoding in OutsourcingQuiz.jsx:
  - "pi�" → "più" (linee 7, 10)
  - "difficolt�" → "difficoltà" (linea 9)
  - "opportunit�" → "opportunità" (linea 29)
  - "�" → "È" (linea 36)
  - "S�" → "Sì" (linea 160)
  - "attivita" → "attività" (linee 40-42 in ConsultationForm.jsx)

### 2. Sistema Calendario Prenotazioni
- [ ] Creare componente `CalendarBooking.jsx` con:
  - Selezione data (date picker)
  - Slot orari di 30 minuti (es: 9:00, 9:30, 10:00...)
  - Stato per slot già prenotati (localStorage per MVP)
  - Integrazione con form consulenza
- [ ] Definire orari disponibili (es: Lun-Ven 9:00-18:00)
- [ ] Salvare prenotazioni e bloccare slot già presi
- [ ] Integrare calendario nella sezione Contact

### 3. Miglioramento PDF Export
- [ ] Rendere PDF più accattivante:
  - Aggiungere logo/header grafico
  - Migliorare layout con box colorati
  - Aggiungere icone/simboli per Sì/No
  - Includere grafico visuale del punteggio
  - Footer con contatti e social
  - Design più moderno e professionale

---

## Note Tecniche

### Calendario
- Slot: 30 minuti
- Orari: 9:00 - 18:00 (configurabile)
- Giorni: Lun-Ven (no weekend)
- Storage: localStorage per MVP (può evolvere a backend)
- La data/ora selezionata viene inviata insieme al form

### PDF
- Libreria: jsPDF già installato
- Miglioramenti: colori, layout, info aggiuntive

---

## Status
**IN ATTESA DI APPROVAZIONE**
