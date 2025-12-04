import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, Eye, EyeOff, HelpCircle, Loader2, AlertCircle } from 'lucide-react'
import { useHandTracking } from '../../hooks/gesture/useHandTracking'
import { useGestureRecognition } from '../../hooks/gesture/useGestureRecognition'
import HandTrackingOverlay from '../gesture/HandTrackingOverlay'
import GestureCard from '../gesture/GestureCard'
import GestureInstructions from '../gesture/GestureInstructions'
import biography from '../../data/biography.json'

/**
 * About section with gesture control capabilities
 * Users can navigate and expand/contract biography sections using hand gestures
 */
function AboutGesture() {
  // Gesture mode state
  const [gestureMode, setGestureMode] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [hasSeenInstructions, setHasSeenInstructions] = useState(false)

  // Section state
  const [expandedSections, setExpandedSections] = useState(
    biography.sections.reduce((acc, s) => ({ ...acc, [s.id]: s.expanded || false }), {})
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Refs
  const containerRef = useRef(null)
  const lastPinchRef = useRef(false)
  const lastSwipeRef = useRef(null)

  // Hand tracking
  const {
    isLoading,
    isTracking,
    error,
    handData,
    videoElement,
    startTracking,
    stopTracking
  } = useHandTracking({ enabled: gestureMode })

  // Gesture recognition
  const {
    gesture,
    palmPosition,
    isPinching,
    isSwipingLeft,
    isSwipingRight
  } = useGestureRecognition({ handData, enabled: gestureMode && isTracking })

  // Toggle gesture mode
  const toggleGestureMode = useCallback(() => {
    if (!gestureMode) {
      // Turning on
      if (!hasSeenInstructions) {
        setShowInstructions(true)
        setHasSeenInstructions(true)
      }
      setGestureMode(true)
    } else {
      // Turning off
      setGestureMode(false)
    }
  }, [gestureMode, hasSeenInstructions])

  // Handle pinch gesture for expand/contract
  useEffect(() => {
    if (!gestureMode || !isTracking) return

    // Detect pinch start (transition from not pinching to pinching)
    if (isPinching && !lastPinchRef.current) {
      const currentSection = biography.sections[selectedIndex]
      if (currentSection) {
        setExpandedSections(prev => ({
          ...prev,
          [currentSection.id]: !prev[currentSection.id]
        }))
      }
    }

    lastPinchRef.current = isPinching
  }, [isPinching, gestureMode, isTracking, selectedIndex])

  // Handle swipe gesture for navigation
  useEffect(() => {
    if (!gestureMode || !isTracking) return

    if (isSwipingRight && lastSwipeRef.current !== 'right') {
      setSelectedIndex(prev => Math.min(prev + 1, biography.sections.length - 1))
      lastSwipeRef.current = 'right'
    } else if (isSwipingLeft && lastSwipeRef.current !== 'left') {
      setSelectedIndex(prev => Math.max(prev - 1, 0))
      lastSwipeRef.current = 'left'
    } else if (!isSwipingLeft && !isSwipingRight) {
      lastSwipeRef.current = null
    }
  }, [isSwipingLeft, isSwipingRight, gestureMode, isTracking])

  // Update selected index based on palm position (when not swiping)
  useEffect(() => {
    if (!gestureMode || !isTracking || !palmPosition) return
    if (gesture === 'swipe-left' || gesture === 'swipe-right') return

    // Map vertical palm position to section index
    const sectionCount = biography.sections.length
    const newIndex = Math.min(
      Math.floor(palmPosition.y * sectionCount * 1.5),
      sectionCount - 1
    )

    if (newIndex >= 0 && newIndex !== selectedIndex) {
      setSelectedIndex(newIndex)
    }
  }, [palmPosition, gestureMode, isTracking, selectedIndex, gesture])

  // Toggle section expansion (for non-gesture mode)
  const toggleExpand = useCallback((sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }, [])

  return (
    <section
      id="about"
      className="section-padding bg-white relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="heading-2 text-primary">Chi Sono</h2>
          <p className="text-body mt-2 text-slate-600 max-w-2xl mx-auto">
            {biography.name} - {biography.title}
          </p>
        </motion.div>

        {/* Gesture Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-4 bg-slate-50 rounded-full p-2 pr-4">
            <button
              onClick={toggleGestureMode}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all
                ${gestureMode
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }
                ${isLoading ? 'opacity-70 cursor-wait' : ''}
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : gestureMode ? (
                <Eye className="w-5 h-5" />
              ) : (
                <Hand className="w-5 h-5" />
              )}
              {isLoading ? 'Caricamento...' : gestureMode ? 'Gesture Attivo' : 'Attiva Gesture'}
            </button>

            {gestureMode && (
              <button
                onClick={() => setShowInstructions(true)}
                className="p-2 text-slate-500 hover:text-slate-700 transition-colors"
                title="Mostra istruzioni"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 max-w-xl mx-auto"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">Errore webcam</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className="relative max-w-3xl mx-auto">
          {/* Gesture overlay (when active) */}
          {gestureMode && isTracking && (
            <HandTrackingOverlay
              handData={handData}
              gesture={gesture}
              isTracking={isTracking}
              containerRef={containerRef}
              videoElement={videoElement}
              showWebcam={false}
            />
          )}

          {/* Profile photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-center"
          >
            <div className={`
              w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/40
              flex items-center justify-center text-5xl
              transition-all duration-300
              ${gestureMode && isTracking ? 'ring-4 ring-accent ring-offset-4' : ''}
            `}>
              👨‍🔬
            </div>
          </motion.div>

          {/* Biography sections */}
          <div className="space-y-6">
            {biography.sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GestureCard
                  section={section}
                  isSelected={gestureMode && isTracking && selectedIndex === index}
                  isExpanded={expandedSections[section.id]}
                  onToggleExpand={() => toggleExpand(section.id)}
                  palmPosition={palmPosition}
                  gestureMode={gestureMode && isTracking}
                />
              </motion.div>
            ))}
          </div>

          {/* Gesture mode info */}
          <AnimatePresence>
            {gestureMode && isTracking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-slate-500">
                  Sezione {selectedIndex + 1} di {biography.sections.length} selezionata
                </p>
                <button
                  onClick={() => setGestureMode(false)}
                  className="mt-2 text-accent hover:text-accent/80 text-sm font-medium inline-flex items-center gap-1"
                >
                  <EyeOff className="w-4 h-4" />
                  Torna alla visualizzazione normale
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions modal */}
      <GestureInstructions
        isVisible={showInstructions}
        onDismiss={() => setShowInstructions(false)}
      />
    </section>
  )
}

export default AboutGesture
