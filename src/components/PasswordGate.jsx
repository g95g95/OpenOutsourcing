import { useState, useEffect } from 'react'
import { Lock, AlertTriangle } from 'lucide-react'

const CORRECT_PASSWORD = 'Mellon9594!'
const MAX_ATTEMPTS = 3
const STORAGE_KEY = 'site_authenticated'

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [error, setError] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    // Check if already authenticated this session
    const authenticated = sessionStorage.getItem(STORAGE_KEY)
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setPassword('')

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true)
        // Try to close the tab
        window.close()
        // If window.close() doesn't work (most browsers block it),
        // the blocked state will show a permanent block message
      } else {
        setError(`Password errata. Tentativi rimasti: ${MAX_ATTEMPTS - newAttempts}`)
      }
    }
  }

  // If authenticated, show the site
  if (isAuthenticated) {
    return children
  }

  // If blocked after 3 attempts
  if (isBlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Accesso Bloccato</h1>
          <p className="text-slate-600">
            Hai superato il numero massimo di tentativi. Chiudi questa pagina.
          </p>
        </div>
      </div>
    )
  }

  // Password form
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">
          Area Riservata
        </h1>
        <p className="text-slate-600 text-center mb-6">
          Inserisci la password per accedere al sito
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  )
}
