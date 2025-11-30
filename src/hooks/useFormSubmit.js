import { useState } from 'react'

const FORMSPREE_ENDPOINTS = {
  leadMagnet: 'YOUR_FORMSPREE_ID_HERE',
  contact: 'YOUR_FORMSPREE_ID_HERE',
  consultation: 'YOUR_FORMSPREE_ID_HERE',
}

export function useFormSubmit(formType, options = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const submit = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_ENDPOINTS[formType]}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error('Errore durante l\'invio. Riprova.')
      }

      setIsSuccess(true)

      if (options.onSuccess) {
        options.onSuccess(data)
      }

      return true
    } catch (err) {
      setError(err.message)
      if (options.onError) {
        options.onError(err)
      }
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setIsSuccess(false)
  }

  return {
    submit,
    isLoading,
    error,
    isSuccess,
    reset,
  }
}
