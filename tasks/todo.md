# Piano: Implementazione Consulenza Gratuita + Pricing

## Obiettivo
Implementare la sezione Pricing e il form di richiesta consulenza gratuita con invio email automatico.

---

## Todo List

### 1. Sezione Pricing
- [x] Creare componente `Pricing.jsx` in `src/components/sections/`
- [x] Contenuti pricing:
  - Tariffa oraria variabile: 50-150 euro/ora
  - Success fee: 20% del risparmio annuo (una tantum)
  - Pagamento dopo 1 mese di test efficacia
  - Primo consulto gratuito

### 2. Form Consulenza
- [x] Creare nuovo schema Zod in `validation.js` per il nuovo form
- [x] Creare componente `ConsultationForm.jsx` in `src/components/forms/`
- [x] Campi form:
  - Nome e cognome (required)
  - Nome azienda (required)
  - Codice ATECO (opzionale)
  - Fascia fatturato: <100k, 100k-500k, 500k-1M, 1M-5M, 5M-10M, 10M-50M, 50M-100M, >100M
  - Problema intaccato (select con funzionalita IT)
  - Livello esternalizzazione (alto, medio, basso)
  - Privacy checkbox (required)

### 3. Invio Email
- [x] Configurare Formspree per inviare a: oiluig.illenob@gmail.com
- [x] Oggetto email: [Nome azienda][Nome persona][Fatturato]
- [x] Usare campo `_subject` di Formspree per oggetto dinamico

### 4. Integrazione
- [x] Aggiornare `Home.jsx` con nuove sezioni
- [x] Collegare sezione Pricing con form consulenza
- [ ] Testare il flusso completo (richiede ID Formspree)

---

## Note Tecniche

### Formspree
- Servizio gratuito per invio form via email
- Supporta campo `_subject` per oggetto personalizzato
- Endpoint: https://formspree.io/f/{FORM_ID}
- L'utente dovra creare un form su formspree.io e inserire l'ID

### Opzioni Problema IT (scrollbar)
- Gestione infrastruttura IT
- Sviluppo software
- Manutenzione applicazioni
- Help desk / Supporto tecnico
- Cybersecurity
- Cloud e hosting
- Data analytics / BI
- ERP / CRM
- E-commerce
- Marketing digitale
- Altro

---

## Status
**COMPLETATO**

---

## Review

### File Modificati/Creati
1. `src/utils/validation.js` - Aggiunto schema `freeConsultationSchema`
2. `src/components/sections/Pricing.jsx` - Nuovo componente sezione pricing
3. `src/components/forms/ConsultationForm.jsx` - Nuovo form consulenza
4. `src/pages/Home.jsx` - Integrazione componenti

### Funzionalita Implementate
- **Sezione Pricing**: Card con tariffa oraria (50-150 EUR) e success fee (20%)
- **Form Consulenza**: 6 campi + privacy checkbox
- **Invio Email**: Formspree con oggetto `[Azienda][Nome][Fatturato]`
- **Validazione**: Zod schema per tutti i campi

### Prossimi Passi
1. Creare account Formspree su https://formspree.io
2. Creare nuovo form e copiare l'ID (es. `xyzabcde`)
3. Sostituire `YOUR_FORM_ID` in `ConsultationForm.jsx` riga 10
4. Testare il flusso completo
