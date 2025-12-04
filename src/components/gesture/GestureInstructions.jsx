import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Move, Maximize2 } from 'lucide-react'

/**
 * Instructions overlay for gesture controls
 */
function GestureInstructions({ isVisible, onDismiss }) {
  const instructions = [
    {
      icon: Hand,
      gesture: '☝️ Indice esteso',
      action: 'Avanza di sezione',
      description: 'Indice esteso + pugno chiuso, muovi la mano'
    },
    {
      icon: Hand,
      gesture: '👍 Pollice esteso',
      action: 'Torna indietro',
      description: 'Pollice esteso + pugno chiuso, muovi la mano'
    },
    {
      icon: Maximize2,
      gesture: '✊↔️✋ Pugno/Mano',
      action: 'Espandi/Contrai sezione',
      description: 'Alterna tra pugno chiuso e mano aperta'
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-primary text-center mb-2">
              Controllo Gesture Attivo
            </h3>
            <p className="text-slate-600 text-center text-sm mb-6">
              Usa le mani per interagire con questa sezione
            </p>

            <div className="space-y-3">
              {instructions.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="text-2xl w-10 text-center">{item.gesture.split(' ')[0]}</div>
                  <div className="flex-1">
                    <div className="font-medium text-primary">{item.action}</div>
                    <div className="text-sm text-slate-500">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400 text-center mb-4">
                🔒 La webcam viene usata solo localmente. Nessun video viene inviato a server esterni.
              </p>
              <button
                onClick={onDismiss}
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Ho capito, inizia!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GestureInstructions
