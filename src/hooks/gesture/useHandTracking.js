import { useState, useEffect, useRef, useCallback } from 'react'

// Load MediaPipe from CDN dynamically (doesn't work well with bundlers)
const loadMediaPipeScript = (url) => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (url.includes('hands') && window.Hands) {
      resolve()
      return
    }
    if (url.includes('camera_utils') && window.Camera) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const loadMediaPipe = async () => {
  await loadMediaPipeScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js')
  await loadMediaPipeScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js')
}

/**
 * Hook for hand tracking using MediaPipe Hands
 * Returns hand landmarks, tracking status, and control functions
 */
export function useHandTracking({ enabled = false, onResults = null }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState(null)
  const [handData, setHandData] = useState(null)
  const [mediaLoaded, setMediaLoaded] = useState(false)

  const videoRef = useRef(null)
  const handsRef = useRef(null)
  const cameraRef = useRef(null)
  const streamRef = useRef(null)

  // Load MediaPipe scripts on mount
  useEffect(() => {
    loadMediaPipe()
      .then(() => setMediaLoaded(true))
      .catch(err => console.error('Failed to load MediaPipe:', err))
  }, [])

  // Process MediaPipe results
  const processResults = useCallback((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0]
      const handedness = results.multiHandedness?.[0]?.label || 'Unknown'

      // Calculate palm center (average of wrist and middle finger base)
      const palmCenter = {
        x: (landmarks[0].x + landmarks[9].x) / 2,
        y: (landmarks[0].y + landmarks[9].y) / 2,
        z: (landmarks[0].z + landmarks[9].z) / 2
      }

      const data = {
        landmarks,
        handedness,
        palmCenter,
        // Key points for gesture detection
        thumbTip: landmarks[4],
        indexTip: landmarks[8],
        middleTip: landmarks[12],
        ringTip: landmarks[16],
        pinkyTip: landmarks[20],
        wrist: landmarks[0],
        timestamp: Date.now()
      }

      setHandData(data)

      if (onResults) {
        onResults(data)
      }
    } else {
      setHandData(null)
    }
  }, [onResults])

  // Initialize MediaPipe Hands
  const initializeHands = useCallback(async () => {
    if (handsRef.current) return

    // Use window.Hands from CDN script
    const hands = new window.Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      }
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5
    })

    hands.onResults(processResults)

    await hands.initialize()
    handsRef.current = hands
  }, [processResults])

  // Start tracking
  const startTracking = useCallback(async () => {
    if (isTracking || isLoading) return

    // Wait for MediaPipe to load
    if (!window.Hands || !window.Camera) {
      setError('MediaPipe not loaded yet. Please try again.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user'
        }
      })
      streamRef.current = stream

      // Create video element if not exists
      if (!videoRef.current) {
        videoRef.current = document.createElement('video')
        videoRef.current.setAttribute('playsinline', '')
        videoRef.current.style.display = 'none'
        document.body.appendChild(videoRef.current)
      }

      videoRef.current.srcObject = stream

      // Initialize hands
      await initializeHands()

      // Start camera processing (use window.Camera from CDN)
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (handsRef.current && videoRef.current) {
            await handsRef.current.send({ image: videoRef.current })
          }
        },
        width: 640,
        height: 480
      })

      await camera.start()
      cameraRef.current = camera

      setIsTracking(true)
      setIsLoading(false)
    } catch (err) {
      console.error('Hand tracking error:', err)
      setError(err.message || 'Failed to start hand tracking')
      setIsLoading(false)
    }
  }, [isTracking, isLoading, initializeHands])

  // Stop tracking
  const stopTracking = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop()
      cameraRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsTracking(false)
    setHandData(null)
  }, [])

  // Auto start/stop based on enabled prop
  useEffect(() => {
    if (enabled && !isTracking && !isLoading) {
      startTracking()
    } else if (!enabled && isTracking) {
      stopTracking()
    }
  }, [enabled, isTracking, isLoading, startTracking, stopTracking])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking()
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current)
      }
    }
  }, [stopTracking])

  return {
    isLoading,
    isTracking,
    error,
    handData,
    mediaLoaded,
    videoElement: videoRef.current,
    startTracking,
    stopTracking
  }
}

export default useHandTracking
