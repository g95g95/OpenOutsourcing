import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Overlay component that visualizes hand tracking data
 * Shows landmarks, connections, and gesture feedback
 */
function HandTrackingOverlay({
  handData,
  gesture,
  isTracking,
  containerRef,
  showWebcam = true,
  videoElement
}) {
  const canvasRef = useRef(null)

  // Hand landmark connections for drawing skeleton
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index
    [0, 9], [9, 10], [10, 11], [11, 12], // Middle
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
    [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
    [5, 9], [9, 13], [13, 17] // Palm
  ]

  // Draw hand landmarks on canvas
  useEffect(() => {
    if (!canvasRef.current || !handData?.landmarks) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = containerRef?.current?.getBoundingClientRect()

    if (!rect) return

    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const landmarks = handData.landmarks

    // Draw connections
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)' // accent color
    ctx.lineWidth = 2

    connections.forEach(([i, j]) => {
      const p1 = landmarks[i]
      const p2 = landmarks[j]
      if (p1 && p2) {
        ctx.beginPath()
        ctx.moveTo((1 - p1.x) * canvas.width, p1.y * canvas.height)
        ctx.lineTo((1 - p2.x) * canvas.width, p2.y * canvas.height)
        ctx.stroke()
      }
    })

    // Draw landmarks
    landmarks.forEach((point, index) => {
      const x = (1 - point.x) * canvas.width // Mirror
      const y = point.y * canvas.height

      // Highlight fingertips
      const isFingertip = [4, 8, 12, 16, 20].includes(index)
      const radius = isFingertip ? 8 : 4

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)

      if (isFingertip) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.9)'
      } else {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.5)'
      }
      ctx.fill()
    })

    // Draw palm center cursor
    if (handData.palmCenter) {
      const cx = (1 - handData.palmCenter.x) * canvas.width
      const cy = handData.palmCenter.y * canvas.height

      // Outer ring
      ctx.beginPath()
      ctx.arc(cx, cy, 25, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)'
      ctx.lineWidth = 3
      ctx.stroke()

      // Inner dot
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(16, 185, 129, 1)'
      ctx.fill()
    }

  }, [handData, containerRef])

  // Gesture indicator text
  const gestureLabels = {
    'pinch': 'Pinch',
    'palm': 'Navigazione',
    'fist': 'Seleziona',
    'swipe-left': 'Swipe',
    'swipe-right': 'Swipe',
    'pointing': 'Puntamento'
  }

  return (
    <>
      {/* Hand skeleton canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Webcam preview (small, in corner) */}
      <AnimatePresence>
        {showWebcam && isTracking && videoElement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 z-30 rounded-lg overflow-hidden shadow-lg border-2 border-accent/50"
            style={{ width: 160, height: 120 }}
          >
            <video
              ref={(el) => {
                if (el && videoElement) {
                  el.srcObject = videoElement.srcObject
                  el.play().catch(() => {})
                }
              }}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gesture indicator */}
      <AnimatePresence>
        {gesture && isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {gestureLabels[gesture] || gesture}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HandTrackingOverlay
