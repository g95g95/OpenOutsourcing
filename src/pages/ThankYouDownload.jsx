import { Link } from 'react-router-dom'
import { Download, ArrowLeft } from 'lucide-react'

function ThankYouDownload() {
  return (
    <div className="pt-16 min-h-screen flex items-center">
      <div className="container-custom text-center py-20">
        <div className="max-w-lg mx-auto">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="text-accent" size={32} />
          </div>
          <h1 className="heading-2 text-primary">Grazie per aver scaricato la guida!</h1>
          <p className="text-body mt-4">
            Il download dovrebbe partire automaticamente. Se non parte, clicca il pulsante qui sotto.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pdf/5-segnali-spreco-outsourcing.pdf"
              download
              className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Scarica PDF
            </a>
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

export default ThankYouDownload
