import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { freeConsultationSchema } from '../../utils/validation'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'

// Formspree endpoint - sostituire con ID reale
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnnejabr'

const fasceFatturato = [
  { value: '<100k', label: 'Meno di 100.000 euro' },
  { value: '100k-500k', label: '100.000 - 500.000 euro' },
  { value: '500k-1M', label: '500.000 - 1 milione euro' },
  { value: '1M-5M', label: '1 - 5 milioni euro' },
  { value: '5M-10M', label: '5 - 10 milioni euro' },
  { value: '10M-50M', label: '10 - 50 milioni euro' },
  { value: '50M-100M', label: '50 - 100 milioni euro' },
  { value: '>100M', label: 'Oltre 100 milioni euro' },
]

const problemiIT = [
  { value: 'infrastruttura', label: 'Gestione infrastruttura IT' },
  { value: 'sviluppo-software', label: 'Sviluppo software' },
  { value: 'manutenzione', label: 'Manutenzione applicazioni' },
  { value: 'helpdesk', label: 'Help desk / Supporto tecnico' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'cloud', label: 'Cloud e hosting' },
  { value: 'data-analytics', label: 'Data analytics / Business Intelligence' },
  { value: 'erp-crm', label: 'ERP / CRM' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'marketing', label: 'Marketing digitale' },
  { value: 'altro', label: 'Altro' },
]

const livelliEsternalizzazione = [
  { value: 'alto', label: 'Alto - Molte attivita esternalizzate' },
  { value: 'medio', label: 'Medio - Alcune attivita esternalizzate' },
  { value: 'basso', label: 'Basso - Poche attivita esternalizzate' },
]

function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(freeConsultationSchema),
    defaultValues: {
      nomeCognome: '',
      nomeAzienda: '',
      codiceAteco: '',
      fasciaFatturato: '',
      problemaIT: '',
      livelloEsternalizzazione: '',
      privacy: false,
    },
  })

  const watchedValues = watch(['nomeAzienda', 'nomeCognome', 'fasciaFatturato'])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Costruisci oggetto email: [Nome azienda][Nome persona][Fatturato]
    const emailSubject = `[${data.nomeAzienda}][${data.nomeCognome}][${data.fasciaFatturato}]`

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: emailSubject,
          'Nome e Cognome': data.nomeCognome,
          'Nome Azienda': data.nomeAzienda,
          'Codice ATECO': data.codiceAteco || 'Non specificato',
          'Fascia Fatturato': data.fasciaFatturato,
          'Problema IT': data.problemaIT,
          'Livello Esternalizzazione': data.livelloEsternalizzazione,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Errore invio')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-accent/10 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-primary mb-2">
          Richiesta Inviata!
        </h3>
        <p className="text-slate-600">
          Ti contattero entro 24 ore per fissare la tua consulenza gratuita.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setSubmitStatus(null)}
        >
          Invia un'altra richiesta
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-6 md:p-8 border border-slate-200"
    >
      <h3 className="text-xl font-semibold text-primary mb-6">
        Richiedi Consulenza Gratuita
      </h3>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">
            Errore durante l'invio. Riprova o contattami direttamente.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Nome e Cognome"
          placeholder="Mario Rossi"
          {...register('nomeCognome')}
          error={errors.nomeCognome?.message}
          required
        />

        <Input
          label="Nome Azienda"
          placeholder="Azienda S.r.l."
          {...register('nomeAzienda')}
          error={errors.nomeAzienda?.message}
          required
        />

        <Input
          label="Codice ATECO"
          placeholder="Es. 62.01 (opzionale)"
          {...register('codiceAteco')}
          error={errors.codiceAteco?.message}
        />

        <Select
          label="Fascia di Fatturato"
          options={fasceFatturato}
          placeholder="Seleziona fascia..."
          {...register('fasciaFatturato')}
          error={errors.fasciaFatturato?.message}
          required
        />

        <Select
          label="Area IT da Ottimizzare"
          options={problemiIT}
          placeholder="Seleziona area..."
          {...register('problemaIT')}
          error={errors.problemaIT?.message}
          required
        />

        <Select
          label="Livello di Esternalizzazione Attuale"
          options={livelliEsternalizzazione}
          placeholder="Seleziona livello..."
          {...register('livelloEsternalizzazione')}
          error={errors.livelloEsternalizzazione?.message}
          required
        />

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('privacy')}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            <span className="text-sm text-slate-600">
              Accetto la{' '}
              <a href="/privacy-policy" className="text-accent hover:underline">
                privacy policy
              </a>{' '}
              e acconsento al trattamento dei miei dati. *
            </span>
          </label>
          {errors.privacy && (
            <p className="mt-1 text-sm text-red-500">{errors.privacy.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full mt-6"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        <Send className="w-4 h-4" />
        Invia Richiesta
      </Button>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Ti contattero entro 24 ore lavorative
      </p>
    </motion.form>
  )
}

export default ConsultationForm
