import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for recognizing gestures from hand tracking data
 * Detects: pinch, open palm, closed fist, swipe
 */
export function useGestureRecognition({ handData, enabled = true }) {
  const [gesture, setGesture] = useState(null)
  const [pinchDistance, setPinchDistance] = useState(1)
  const [palmPosition, setPalmPosition] = useState({ x: 0.5, y: 0.5 })

  const historyRef = useRef([])
  const lastGestureRef = useRef(null)
  const lastGestureTimeRef = useRef(0)
  const lastThumbsNavTimeRef = useRef(0)

  // Calculate distance between two 3D points
  const calculateDistance = useCallback((p1, p2) => {
    if (!p1 || !p2) return 1
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const dz = (p1.z || 0) - (p2.z || 0)
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }, [])

  // Check if finger is extended (tip is above base)
  const isFingerExtended = useCallback((landmarks, fingerBase, fingerTip) => {
    if (!landmarks || !landmarks[fingerBase] || !landmarks[fingerTip]) return false
    // In MediaPipe, y increases downward, so extended finger has lower y
    return landmarks[fingerTip].y < landmarks[fingerBase].y - 0.02
  }, [])

  // Detect pinch gesture (thumb and index close together)
  const detectPinch = useCallback((handData) => {
    if (!handData?.thumbTip || !handData?.indexTip) return { isPinching: false, distance: 1 }

    const distance = calculateDistance(handData.thumbTip, handData.indexTip)
    const isPinching = distance < 0.08 // Threshold for pinch

    return { isPinching, distance }
  }, [calculateDistance])

  // Detect open palm (all fingers extended)
  const detectOpenPalm = useCallback((handData) => {
    if (!handData?.landmarks) return false

    const landmarks = handData.landmarks

    // Check if all fingers are extended
    const indexExtended = isFingerExtended(landmarks, 5, 8)
    const middleExtended = isFingerExtended(landmarks, 9, 12)
    const ringExtended = isFingerExtended(landmarks, 13, 16)
    const pinkyExtended = isFingerExtended(landmarks, 17, 20)

    return indexExtended && middleExtended && ringExtended && pinkyExtended
  }, [isFingerExtended])

  // Detect closed fist (all fingers curled)
  const detectClosedFist = useCallback((handData) => {
    if (!handData?.landmarks) return false

    const landmarks = handData.landmarks

    // Check if all fingers are NOT extended
    const indexExtended = isFingerExtended(landmarks, 5, 8)
    const middleExtended = isFingerExtended(landmarks, 9, 12)
    const ringExtended = isFingerExtended(landmarks, 13, 16)
    const pinkyExtended = isFingerExtended(landmarks, 17, 20)

    return !indexExtended && !middleExtended && !ringExtended && !pinkyExtended
  }, [isFingerExtended])

  // Detect thumbs-up gesture (fist with thumb extended upward)
  const detectThumbsUp = useCallback((handData) => {
    if (!handData?.landmarks) return false

    const landmarks = handData.landmarks

    // Thumb should be extended (tip above base, pointing up)
    const thumbTip = landmarks[4]
    const thumbBase = landmarks[2]
    const wrist = landmarks[0]

    if (!thumbTip || !thumbBase || !wrist) return false

    // Thumb tip should be significantly above thumb base (pointing up)
    const thumbPointingUp = thumbTip.y < thumbBase.y - 0.05

    // All other fingers should be curled (closed fist)
    const indexExtended = isFingerExtended(landmarks, 5, 8)
    const middleExtended = isFingerExtended(landmarks, 9, 12)
    const ringExtended = isFingerExtended(landmarks, 13, 16)
    const pinkyExtended = isFingerExtended(landmarks, 17, 20)

    const fingersCurled = !indexExtended && !middleExtended && !ringExtended && !pinkyExtended

    return thumbPointingUp && fingersCurled
  }, [isFingerExtended])

  // Detect thumbs-up navigation (fast horizontal movement with thumbs-up)
  const detectThumbsNavigation = useCallback(() => {
    const history = historyRef.current
    if (history.length < 5) return null

    const now = Date.now()
    // Cooldown between thumbs navigation gestures
    if (now - lastThumbsNavTimeRef.current < 500) return null

    const recent = history.slice(-5)
    const oldest = recent[0]
    const newest = recent[recent.length - 1]

    const dx = newest.x - oldest.x
    const timeDiff = newest.timestamp - oldest.timestamp

    // Calculate horizontal velocity
    const velocityX = dx / timeDiff * 1000

    // Threshold for fast movement (right-hand rule navigation)
    const navThreshold = 2.0

    if (Math.abs(velocityX) > navThreshold) {
      lastThumbsNavTimeRef.current = now
      // Note: velocityX is in screen space, so positive = right on screen
      // Since we mirror the x position, we need to invert:
      // User moves hand forward (away from body) = right on mirrored screen = negative dx = backward
      // User moves hand backward (toward body) = left on mirrored screen = positive dx = forward
      return velocityX > 0 ? 'thumbs-nav-backward' : 'thumbs-nav-forward'
    }

    return null
  }, [])

  // Detect swipe from position history
  const detectSwipe = useCallback(() => {
    const history = historyRef.current
    if (history.length < 5) return null

    const recent = history.slice(-5)
    const oldest = recent[0]
    const newest = recent[recent.length - 1]

    const dx = newest.x - oldest.x
    const dy = newest.y - oldest.y
    const timeDiff = newest.timestamp - oldest.timestamp

    // Calculate velocity
    const velocityX = dx / timeDiff * 1000
    const velocityY = dy / timeDiff * 1000

    const swipeThreshold = 1.5 // Minimum velocity for swipe

    if (Math.abs(velocityX) > swipeThreshold && Math.abs(velocityX) > Math.abs(velocityY)) {
      return velocityX > 0 ? 'swipe-right' : 'swipe-left'
    }

    if (Math.abs(velocityY) > swipeThreshold && Math.abs(velocityY) > Math.abs(velocityX)) {
      return velocityY > 0 ? 'swipe-down' : 'swipe-up'
    }

    return null
  }, [])

  // Process hand data and detect gestures
  useEffect(() => {
    if (!enabled || !handData) {
      setGesture(null)
      return
    }

    const now = Date.now()

    // Update palm position
    if (handData.palmCenter) {
      setPalmPosition({
        x: 1 - handData.palmCenter.x, // Mirror for intuitive control
        y: handData.palmCenter.y
      })

      // Add to history for swipe detection
      historyRef.current.push({
        x: handData.palmCenter.x,
        y: handData.palmCenter.y,
        timestamp: now
      })

      // Keep only last 10 positions
      if (historyRef.current.length > 10) {
        historyRef.current = historyRef.current.slice(-10)
      }
    }

    // Detect pinch
    const { isPinching, distance } = detectPinch(handData)
    setPinchDistance(distance)

    // Detect gestures with debounce
    const minGestureInterval = 200 // ms between gesture changes

    if (now - lastGestureTimeRef.current < minGestureInterval) {
      return
    }

    let detectedGesture = null

    if (isPinching) {
      detectedGesture = 'pinch'
    } else if (detectThumbsUp(handData)) {
      // Check for thumbs-up navigation (fast movement with thumb up)
      const thumbsNav = detectThumbsNavigation()
      if (thumbsNav) {
        detectedGesture = thumbsNav
        historyRef.current = [] // Clear history after navigation
      } else {
        detectedGesture = 'thumbs-up'
      }
    } else if (detectClosedFist(handData)) {
      detectedGesture = 'fist'
    } else if (detectOpenPalm(handData)) {
      // Check for swipe while palm is open
      const swipe = detectSwipe()
      if (swipe) {
        detectedGesture = swipe
        historyRef.current = [] // Clear history after swipe
      } else {
        detectedGesture = 'palm'
      }
    } else {
      detectedGesture = 'pointing'
    }

    if (detectedGesture !== lastGestureRef.current) {
      lastGestureRef.current = detectedGesture
      lastGestureTimeRef.current = now
      setGesture(detectedGesture)
    }

  }, [enabled, handData, detectPinch, detectOpenPalm, detectClosedFist, detectSwipe])

  // Clear state when disabled
  useEffect(() => {
    if (!enabled) {
      setGesture(null)
      setPinchDistance(1)
      setPalmPosition({ x: 0.5, y: 0.5 })
      historyRef.current = []
    }
  }, [enabled])

  return {
    gesture,
    pinchDistance,
    palmPosition,
    isPinching: gesture === 'pinch',
    isOpenPalm: gesture === 'palm',
    isClosedFist: gesture === 'fist',
    isSwipingLeft: gesture === 'swipe-left',
    isSwipingRight: gesture === 'swipe-right',
    isThumbsUp: gesture === 'thumbs-up',
    isThumbsNavForward: gesture === 'thumbs-nav-forward',
    isThumbsNavBackward: gesture === 'thumbs-nav-backward'
  }
}

export default useGestureRecognition
