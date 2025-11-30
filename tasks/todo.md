# Piano: Implementazione Consulenza Gratuita + Pricing

## Obiettivo
Implementare la sezione Pricing e il form di richiesta consulenza gratuita con invio email automatico.

---

## Todo List

### 1. Sezione Pricing
- [ ] Creare componente `Pricing.jsx` in `src/components/sections/`
- [ ] Contenuti pricing:
  - Tariffa oraria variabile: 50-150 euro/ora
  - Success fee: 20% del risparmio annuo (una tantum)
  - Pagamento dopo 1 mese di test efficacia
  - Primo consulto gratuito

### 2. Form Consulenza
- [ ] Creare nuovo schema Zod in `validation.js` per il nuovo form
- [ ] Creare componente `ConsultationForm.jsx` in `src/components/forms/`
- [ ] Campi form:
  - Nome e cognome (required)
  - Nome azienda (required)
  - Codice ATECO (opzionale)
  - Fascia fatturato: <100k, 100k-500k, 500k-1M, 1M-5M, 5M-10M, 10M-50M, 50M-100M, >100M
  - Problema intaccato (select con funzionalita IT)
  - Livello esternalizzazione (alto, medio, basso)
  - Privacy checkbox (required)

### 3. Invio Email
- [ ] Configurare Formspree per inviare a: oiluig.illenob@gmail.com
- [ ] Oggetto email: [Nome azienda][Nome persona][Fatturato]
- [ ] Usare campo `_subject` di Formspree per oggetto dinamico

### 4. Integrazione
- [ ] Aggiornare `Home.jsx` con nuove sezioni
- [ ] Collegare sezione Pricing con form consulenza
- [ ] Testare il flusso completo

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
**In attesa di conferma utente**
