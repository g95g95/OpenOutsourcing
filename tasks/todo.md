# Task: Implementare Quiz Esporta PDF

## Obiettivo
Creare un quiz interattivo con 7 domande Sì/No per valutare se ha senso liberarsi dell'esternalizzazione, con possibilità di esportare il risultato in PDF.

## Le 7 Domande
1. Spendi più del 5% del tuo fatturato in consulenti o fornitori esterni?
2. I tuoi processi esternalizzati sono ripetitivi e prevedibili?
3. Hai difficoltà a ottenere modifiche rapide dai tuoi fornitori?
4. Ti senti "ostaggio" di uno o più fornitori esterni?
5. I costi di outsourcing sono aumentati negli ultimi 2 anni?
6. Condividi dati sensibili aziendali con fornitori esterni?
7. Il tuo team interno ha smesso di sviluppare competenze chiave?

## Logica Punteggio
- 0-2 Sì → Basso potenziale di risparmio
- 3-4 Sì → Medio potenziale di risparmio
- 5-7 Sì → Alto potenziale di risparmio

## Todo
- [x] Creare piano
- [x] Installare jspdf
- [x] Creare componente OutsourcingQuiz
- [x] Implementare funzione esportaPDF
- [x] Integrare nella Home
- [x] Testare

## Review

### Modifiche effettuate:
1. **Installata dipendenza jspdf** per generazione PDF client-side
2. **Creato componente `OutsourcingQuiz.jsx`** in `src/components/sections/`
   - Quiz interattivo con 7 domande Sì/No
   - Bottoni colorati (rosso=Sì, verde=No)
   - Calcolo automatico punteggio
   - 3 livelli di risultato (Basso/Medio/Alto)
   - Funzione `esportaPDF()` che genera PDF scaricabile
3. **Integrato nella Home** dopo la sezione Solution

### File modificati:
- `package.json` (nuova dipendenza jspdf)
- `src/components/sections/OutsourcingQuiz.jsx` (nuovo)
- `src/pages/Home.jsx` (import + componente)

### Note:
- Build completato con successo
- Warning su chunk size (jspdf è una libreria pesante) - non bloccante
