import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Hand, ChevronLeft, ChevronRight } from 'lucide-react'
import * as Icons from 'lucide-react'

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
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-accent/20"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: [null, Math.random() * window.innerWidth],
                  y: [null, Math.random() * window.innerHeight],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear',
                }}
              />
            ))}
          </div>

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
                    {gesture === 'pinch' ? 'Espandi/Chiudi' : gesture === 'palm' ? 'Naviga' : gesture}
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
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
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
              transition={{ delay: 3, duration: 1 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 text-white text-sm"
            >
              Muovi la mano per navigare • Pinch per espandere/chiudere • ESC per uscire
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GestureFullscreen
