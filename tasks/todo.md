# Piano: Protezione Password Sito

## Obiettivo
Aggiungere una schermata di protezione password all'accesso del sito. Dopo 3 tentativi sbagliati, la pagina si chiude.

---

## Todo List

### 1. Componente PasswordGate
- [x] Creare componente `PasswordGate.jsx` in `src/components/`
- [x] Form con campo password
- [x] Contatore tentativi (max 3)
- [x] Chiusura tab dopo 3 errori
- [x] Salvare autenticazione in sessionStorage

### 2. Integrazione in App
- [x] Wrappare il contenuto di App.jsx con PasswordGate
- [x] Mostrare il sito solo se autenticato

---

## Status
**COMPLETATO**

---

## Review

### File Creati/Modificati
1. `src/components/PasswordGate.jsx` - Nuovo componente gate password
2. `src/App.jsx` - Integrazione PasswordGate wrapper

### Funzionalità Implementate
- **Form password**: Schermata a tutto schermo con campo password
- **Max 3 tentativi**: Contatore che blocca dopo 3 errori
- **Chiusura tab**: Tenta `window.close()`, altrimenti mostra blocco permanente
- **Persistenza sessione**: Usa `sessionStorage` (si resetta chiudendo browser)

### Note
- `window.close()` funziona solo su tab aperte via JavaScript
- Se non funziona, viene mostrato un messaggio "Accesso Bloccato" permanente
- La sessione dura finché il browser è aperto
