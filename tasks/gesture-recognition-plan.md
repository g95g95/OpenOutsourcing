# Piano: Gesture Recognition per la Sezione "Chi Sono"

## 🎯 Obiettivo
Creare un'esperienza interattiva touchless nella sezione "Chi Sono" dove l'utente può:
- Controllare la biografia con gesti delle mani
- Espandere/contrarre sezioni usando pinch gesture
- Navigare tra elementi con swipe
- Vedere effetti di dissolve/ricomposizione fluidi
- Tornare alla modalità "normale" in qualsiasi momento

---

## 🛠️ Stack Tecnico

### Libreria Principale: **MediaPipe Hands**
- Google's ML-powered hand tracking
- 21 landmark points per mano
- Funziona nel browser (no server)
- Markerless - solo webcam, nessun sensore
- ~30 FPS su hardware moderno

### Alternative considerate:
- `handtrack.js` - più semplice ma meno preciso
- `tensorflow.js + handpose` - più pesante

### Dipendenze da aggiungere:
```json
{
  "@mediapipe/hands": "^0.4.x",
  "@mediapipe/camera_utils": "^0.3.x",
  "@mediapipe/drawing_utils": "^0.3.x"
}
```

---

## 📋 Todo List

### Fase 1: Setup Infrastruttura (Base)
- [ ] Installare MediaPipe Hands e dipendenze
- [ ] Creare hook `useHandTracking.js` per gestire webcam e detection
- [ ] Creare componente `HandTrackingOverlay.jsx` per visualizzare la mano
- [ ] Testare detection base in pagina di test

### Fase 2: Gesture Recognition Engine
- [ ] Implementare riconoscimento **Pinch Gesture** (pollice + indice)
- [ ] Implementare riconoscimento **Open Palm** (mano aperta)
- [ ] Implementare riconoscimento **Closed Fist** (pugno chiuso)
- [ ] Implementare **Swipe Detection** (velocità + direzione)
- [ ] Creare sistema di smoothing per evitare jitter

### Fase 3: Componente About con Gesture
- [ ] Creare `AboutGesture.jsx` - versione interattiva della sezione
- [ ] Strutturare la biografia in "cards" espandibili
- [ ] Implementare sistema di focus/selezione tramite posizione mano
- [ ] Aggiungere effetti dissolve/recompose con Framer Motion

### Fase 4: UI/UX della Modalità Gesture
- [ ] Toggle visibile "Attiva Controllo Gesture" / "Torna a Normale"
- [ ] Overlay semi-trasparente con video webcam piccolo nell'angolo
- [ ] Feedback visivo per gesture riconosciute (pulse, glow)
- [ ] Istruzioni on-screen per i gesti disponibili
- [ ] Indicatore di stato "Tracciamento Attivo"

### Fase 5: Animazioni e Polish
- [ ] Dissolve effect quando si passa alla card successiva
- [ ] Recompose effect con particelle che si assemblano
- [ ] Transizioni fluide tra stati
- [ ] Fallback graceful se webcam non disponibile

### Fase 6: Integrazione e Test
- [ ] Integrare in Home.jsx con switch tra About normale e AboutGesture
- [ ] Test su diversi browser (Chrome, Firefox, Safari)
- [ ] Test performance su dispositivi meno potenti
- [ ] Aggiungere fallback per mobile (no webcam gesture su mobile)

---

## 🎨 Design delle Interazioni

### Gesti Supportati:

| Gesto | Azione | Feedback Visivo |
|-------|--------|-----------------|
| **Pinch In** (pollice+indice si avvicinano) | Contrae/chiude sezione | Card si rimpicciolisce con blur |
| **Pinch Out** (pollice+indice si allontanano) | Espande sezione | Card si espande con glow |
| **Open Palm + Move** | Naviga/seleziona | Cursore virtuale segue la mano |
| **Closed Fist** | Conferma selezione | Flash di conferma |
| **Swipe Left/Right** | Card precedente/successiva | Dissolve + Recompose |
| **Palm facing camera** | Pausa/riprendi | Icona pausa |

### Layout Sezione "Chi Sono" in Gesture Mode:

```
┌─────────────────────────────────────────────────┐
│  [Toggle: Gesture Mode ✓]    [🎥 webcam mini]   │
├─────────────────────────────────────────────────┤
│                                                 │
│     ┌──────────────┐                           │
│     │              │   ← Card Foto (espandibile)│
│     │    PHOTO     │                           │
│     │              │                           │
│     └──────────────┘                           │
│                                                 │
│   ┌─────────────────────────────────────────┐  │
│   │ Estratto Bio 1                          │  │
│   │ "Dal 2008 sviluppo software..."         │  │ ← Card selezionabile
│   └─────────────────────────────────────────┘  │
│                                                 │
│   ┌─────────────────────────────────────────┐  │
│   │ Estratto Bio 2 (collapsed)              │  │
│   └─────────────────────────────────────────┘  │
│                                                 │
│     👋 Muovi la mano per navigare              │
│     🤏 Pinch per espandere/contrarre           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📁 Struttura File

```
src/
├── components/
│   ├── sections/
│   │   ├── About.jsx              # Versione normale (nuova)
│   │   └── AboutGesture.jsx       # Versione gesture (nuova)
│   ├── gesture/
│   │   ├── HandTrackingProvider.jsx   # Context per stato tracking
│   │   ├── HandTrackingOverlay.jsx    # Canvas overlay per visualizzare mano
│   │   ├── GestureCard.jsx            # Card che risponde ai gesti
│   │   └── GestureInstructions.jsx    # Overlay istruzioni
│   └── ui/
│       └── GestureToggle.jsx          # Toggle per attivare/disattivare
├── hooks/
│   ├── useHandTracking.js         # Hook principale tracking
│   ├── useGestureRecognition.js   # Hook per interpretare gesti
│   └── usePinchGesture.js         # Hook specifico per pinch
└── data/
    └── biography.json             # Estratti bio strutturati
```

---

## 🔧 Note Tecniche

### Performance:
- MediaPipe runs on GPU via WebGL
- ~30-60 FPS tracking
- Canvas 2D per overlay (leggero)
- Debounce gesture recognition (200ms)

### Compatibilità:
- Chrome: ✓ Pieno supporto
- Firefox: ✓ Pieno supporto
- Safari: ⚠️ Richiede HTTPS + permission esplicita
- Mobile: ❌ Disabilitato (UX non adatta)

### Privacy:
- Video webcam NEVER inviato a server
- Tutto il processing è client-side
- Chiaro messaggio privacy prima di attivare

---

## ⚠️ Rischi e Mitigazioni

| Rischio | Mitigazione |
|---------|-------------|
| Webcam non disponibile | Fallback elegante a versione normale |
| Performance bassa | Opzione per ridurre framerate |
| Gesti non riconosciuti | Controlli manuali sempre visibili |
| Utente confuso | Tutorial on-boarding al primo accesso |

---

## 📊 Metriche Successo

- [ ] Tracking funziona su 3+ browser moderni
- [ ] Latenza gesture < 200ms
- [ ] Transizioni a 60fps
- [ ] Fallback graceful in tutti i casi edge
- [ ] Utente può sempre tornare a modalità normale

---

## Review

### Implementazione Completata: 2025-12-04

#### File Creati:
- `src/hooks/gesture/useHandTracking.js` - Hook per webcam + MediaPipe Hands
- `src/hooks/gesture/useGestureRecognition.js` - Riconoscimento gesti (pinch, swipe, palm, fist)
- `src/hooks/gesture/index.js` - Export hooks
- `src/components/gesture/HandTrackingOverlay.jsx` - Canvas overlay con skeleton mano
- `src/components/gesture/GestureCard.jsx` - Card interattive per biografia
- `src/components/gesture/GestureInstructions.jsx` - Modal istruzioni primo accesso
- `src/components/gesture/index.js` - Export componenti
- `src/components/sections/AboutGesture.jsx` - Sezione principale con gesture control
- `src/data/biography.json` - Contenuti biografia strutturati

#### Funzionalità Implementate:
- [x] Hand tracking con MediaPipe Hands (21 landmark points)
- [x] Pinch gesture per expand/contract delle sezioni
- [x] Swipe gesture per navigare tra le sezioni
- [x] Palm position tracking per selezione sezione
- [x] Overlay visivo con skeleton della mano
- [x] Preview webcam nell'angolo (piccola, non invasiva)
- [x] Toggle tra modalità gesture e normale
- [x] Modal istruzioni al primo utilizzo
- [x] Debounce per evitare jitter (200ms)
- [x] Privacy: tutto il processing è client-side

#### Note per Miglioramenti Futuri:
- Aggiungere particle effects per dissolve/recompose più elaborato
- Testare su Safari con HTTPS
- Aggiungere detection per mobile e disabilitare automaticamente
- Possibile ottimizzazione bundle size (MediaPipe è pesante)
