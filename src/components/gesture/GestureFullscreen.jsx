import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Hand, ChevronLeft, ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'

// Gargantua-style black hole component
function GargantuaBlackHole() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Outer glow - gravitational lensing effect */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-transparent via-orange-500/5 to-transparent animate-pulse"
           style={{ animationDuration: '4s' }} />

      {/* Accretion disk - outer ring */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'conic-gradient(from 0deg, transparent 0%, rgba(251, 146, 60, 0.3) 25%, rgba(251, 191, 36, 0.4) 50%, rgba(251, 146, 60, 0.3) 75%, transparent 100%)',
               filter: 'blur(20px)',
             }} />
      </motion.div>

      {/* Accretion disk - inner bright ring */}
      <motion.div
        className="absolute w-[400px] h-[400px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'conic-gradient(from 180deg, rgba(253, 224, 71, 0.1) 0%, rgba(251, 146, 60, 0.5) 25%, rgba(253, 224, 71, 0.6) 50%, rgba(251, 146, 60, 0.5) 75%, rgba(253, 224, 71, 0.1) 100%)',
               filter: 'blur(10px)',
             }} />
      </motion.div>

      {/* Event horizon - the black center */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-black shadow-2xl"
           style={{
             boxShadow: '0 0 100px 50px rgba(0, 0, 0, 0.8), inset 0 0 50px 25px rgba(0, 0, 0, 1)',
           }} />

      {/* Photon sphere - thin bright ring at event horizon */}
      <div className="absolute w-[210px] h-[210px] rounded-full border border-orange-400/50"
           style={{ filter: 'blur(2px)' }} />

      {/* Gravitational particles being pulled in */}
      {[...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2
        const radius = 250 + Math.random() * 150
        return (
          <motion.div
            key={`grav-${i}`}
            className="absolute w-1 h-1 rounded-full bg-orange-300"
            initial={{
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 0.8,
              scale: 1,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeIn',
            }}
          />
        )
      })}
    </div>
  )
}

/**
 * Fullscreen immersive gesture navigation experience
 * Users navigate through biography sections using hand gestures
 */
function GestureFullscreen({
  isActive,
  onClose,
  sections,
  selectedIndex,
  expandedSections,
  palmPosition,
  gesture,
  isTracking,
  onToggleExpand
}) {
  const containerRef = useRef(null)

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isActive) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, onClose])

  // Lock body scroll when active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isActive])

  // Get icon component by name
  const getIcon = useCallback((iconName) => {
    const IconComponent = Icons[iconName]
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null
  }, [])

  const currentSection = sections[selectedIndex]

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-primary overflow-hidden"
        >
          {/* Gargantua Black Hole Background */}
          <GargantuaBlackHole />

          {/* Hand cursor indicator */}
          {isTracking && palmPosition && (
            <motion.div
              className="absolute z-40 pointer-events-none"
              animate={{
                left: `${palmPosition.x * 100}%`,
                top: `${palmPosition.y * 100}%`,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                {/* Outer ring */}
                <motion.div
                  className="w-16 h-16 rounded-full border-2 border-accent"
                  animate={{
                    scale: gesture === 'pinch' ? 0.6 : 1,
                    borderColor: gesture === 'pinch' ? '#10B981' : 'rgba(16, 185, 129, 0.5)',
                  }}
                />
                {/* Inner dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent" />
                {/* Gesture indicator */}
                {gesture && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full whitespace-nowrap"
                  >
                    {gesture === 'fist-from-palm' || gesture === 'palm-from-fist' ? '✊↔️✋ Toggle' :
                     gesture === 'palm' ? '✋ Mano aperta' :
                     gesture === 'fist' ? '✊ Pugno chiuso' :
                     gesture === 'pointing-index' ? '☝️ Muovi per avanzare!' :
                     gesture === 'pointing-nav-forward' ? '☝️ Avanti →' :
                     gesture === 'thumb-gesture' ? '👍 Muovi per tornare!' :
                     gesture === 'thumb-nav-backward' ? '← Indietro 👍' :
                     gesture === 'thumbs-up' ? '👍 Pollice su' :
                     gesture}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Section navigation indicators */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-accent scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                animate={{
                  scale: index === selectedIndex ? 1.5 : 1,
                }}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <motion.div
              className="flex items-center gap-2 text-white/60 text-sm"
              animate={{ opacity: selectedIndex > 0 ? 1 : 0.3 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Precedente</span>
            </motion.div>
            <div className="w-px h-6 bg-white/30" />
            <motion.div
              className="flex items-center gap-2 text-white/60 text-sm"
              animate={{ opacity: selectedIndex < sections.length - 1 ? 1 : 0.3 }}
            >
              <span>Successivo</span>
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Main content area */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection?.id}
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  filter: { duration: 0.8 }
                }}
                className="max-w-3xl w-full"
              >
                {/* Section card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                      {getIcon(currentSection?.icon)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {currentSection?.title}
                      </h2>
                      <p className="text-white/60 text-sm">
                        Sezione {selectedIndex + 1} di {sections.length}
                      </p>
                    </div>
                  </div>

                  {/* Preview */}
                  <p className="text-accent font-medium text-lg mb-4">
                    {currentSection?.preview}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedSections[currentSection?.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/80 leading-relaxed">
                          {currentSection?.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand hint */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Hand className="w-4 h-4" />
                      <span>
                        {expandedSections[currentSection?.id]
                          ? 'Pinch per chiudere'
                          : 'Pinch per espandere'}
                      </span>
                    </div>
                    <button
                      onClick={() => onToggleExpand(currentSection?.id)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                    >
                      {expandedSections[currentSection?.id] ? 'Chiudi' : 'Espandi'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Instructions overlay (shown briefly) */}
          {isTracking && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 4, duration: 1 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 text-white text-sm text-center"
            >
              ☝️ Indice + movimento = Avanti • 👍 Pollice + movimento = Indietro • ✊↔️✋ Pugno/Mano aperta = Espandi • ESC per uscire
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GestureFullscreen
