import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Privacy() {
  return (
    <div className="pt-16">
      <div className="container-custom py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="text-slate-600 hover:text-primary transition-colors inline-flex items-center gap-2 mb-8"
          >
            <ArrowLeft size={20} />
            Torna alla Home
          </Link>

          <h1 className="heading-2 text-primary">Privacy Policy</h1>

          <div className="mt-8 prose prose-slate max-w-none">
            <p className="text-body">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <h2 className="heading-3 mt-8">1. Titolare del Trattamento</h2>
            <p className="text-body">
              Il titolare del trattamento dei dati personali è OpenOutsourcing.AI.
            </p>

            <h2 className="heading-3 mt-8">2. Dati Raccolti</h2>
            <p className="text-body">
              Raccogliamo i seguenti dati personali attraverso i nostri form:
            </p>
            <ul className="list-disc list-inside text-body mt-4">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono (opzionale)</li>
              <li>Nome azienda (opzionale)</li>
              <li>Settore di attività (opzionale)</li>
            </ul>

            <h2 className="heading-3 mt-8">3. Finalità del Trattamento</h2>
            <p className="text-body">
              I dati raccolti vengono utilizzati per:
            </p>
            <ul className="list-disc list-inside text-body mt-4">
              <li>Rispondere alle richieste di informazioni</li>
              <li>Fornire il servizio di consulenza richiesto</li>
              <li>Inviare comunicazioni commerciali (solo con consenso)</li>
            </ul>

            <h2 className="heading-3 mt-8">4. Base Giuridica</h2>
            <p className="text-body">
              Il trattamento dei dati è basato sul consenso esplicito dell'utente.
            </p>

            <h2 className="heading-3 mt-8">5. Conservazione dei Dati</h2>
            <p className="text-body">
              I dati vengono conservati per il tempo necessario a fornire il servizio richiesto.
            </p>

            <h2 className="heading-3 mt-8">6. Diritti dell'Interessato</h2>
            <p className="text-body">
              Hai il diritto di accedere, rettificare, cancellare i tuoi dati personali contattandoci all'indirizzo email indicato.
            </p>

            <h2 className="heading-3 mt-8">7. Contatti</h2>
            <p className="text-body">
              Per qualsiasi domanda relativa alla privacy, contattaci a: info@openoutsourcing.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
