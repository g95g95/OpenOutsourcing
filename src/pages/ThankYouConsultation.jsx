import { Link } from 'react-router-dom'
import { CheckCircle, ArrowLeft, Calendar } from 'lucide-react'

function ThankYouConsultation() {
  return (
    <div className="pt-16 min-h-screen flex items-center">
      <div className="container-custom text-center py-20">
        <div className="max-w-lg mx-auto">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-accent" size={32} />
          </div>
          <h1 className="heading-2 text-primary">Richiesta Inviata!</h1>
          <p className="text-body mt-4">
            Grazie per aver richiesto una consulenza gratuita. Ti contatterò entro 24 ore per fissare un appuntamento.
          </p>
          <div className="mt-8 bg-slate-100 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
              <Calendar size={20} />
              <span className="font-medium">Prossimi passi</span>
            </div>
            <ul className="text-sm text-slate-600 text-left space-y-2">
              <li>1. Riceverai una email di conferma</li>
              <li>2. Ti contatterò per fissare la call</li>
              <li>3. Analizzeremo insieme le tue esigenze</li>
              <li>4. Riceverai un preventivo personalizzato</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              to="/"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouConsultation
