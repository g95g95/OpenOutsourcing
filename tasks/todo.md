# Piano: Protezione Password Sito

## Obiettivo
Aggiungere una schermata di protezione password all'accesso del sito. Dopo 3 tentativi sbagliati, la pagina si chiude.

---

## Todo List

### 1. Componente PasswordGate
- [ ] Creare componente `PasswordGate.jsx` in `src/components/`
- [ ] Form con campo password
- [ ] Contatore tentativi (max 3)
- [ ] Chiusura tab dopo 3 errori
- [ ] Salvare autenticazione in sessionStorage

### 2. Integrazione in App
- [ ] Wrappare il contenuto di App.jsx con PasswordGate
- [ ] Mostrare il sito solo se autenticato

---

## Note Tecniche
- Password: Mellon9594!
- sessionStorage per persistere sessione (si resetta chiudendo browser)
- window.close() per chiudere tab (funziona solo su tab aperte via JS in alcuni browser)

---

## Status
**IN CORSO**
