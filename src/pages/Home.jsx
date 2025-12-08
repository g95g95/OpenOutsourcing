import { useEffect } from 'react'
import { Mail, Phone, Linkedin } from 'lucide-react'
import Problem from '../components/sections/Problem'
import Solution from '../components/sections/Solution'
import OutsourcingQuiz from '../components/sections/OutsourcingQuiz'
import Pricing from '../components/sections/Pricing'
import AboutGesture from '../components/sections/AboutGesture'
import ConsultationForm from '../components/forms/ConsultationForm'
import SectionNav from '../components/ui/SectionNav'
import contacts from '../data/contacts.json'

function Home() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pt-16">
      {/* Section Navigation Dots */}
      <SectionNav />

      {/* Hero Section Placeholder */}
      <section id="hero" className="section-padding gradient-mesh">
        <div className="container-custom text-center">
          <h1 className="heading-1 text-primary">
            Riporta le competenze in azienda
            <span className="text-accent"> e liberati degli esterni.</span>
          </h1>
          <p className="text-body mt-6 max-w-2xl mx-auto">
            Aiuto a liberarsi da onerosi fornitori esterni, riducendo i costi e consentendo alle competenze di non uscire dall'azienda.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Prenota Consulenza Gratuita
            </a>
            <a href="#lead-magnet" className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Scarica la Guida: 5 Segnali di Spreco
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <Problem />

      {/* Solution Section */}
      <Solution />

      {/* Quiz Section */}
      <OutsourcingQuiz />

      {/* Lead Magnet Section Placeholder */}
      <section id="lead-magnet" className="section-padding bg-accent/10">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Scarica la Guida Gratuita</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* About Section with Gesture Control */}
      <AboutGesture />

      {/* Pricing Section */}
      <Pricing />

      {/* Public Sector Section Placeholder */}
      <section id="public-sector" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Pubblica Amministrazione</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-primary">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-white mb-12">Inizia Ora</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-6">Contattami Direttamente</h3>
              <p className="text-slate-300 mb-8">
                Preferisci parlare prima? Contattami via email, telefono o LinkedIn.
                Rispondo entro 24 ore.
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <span>{contacts.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contacts.phone}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <span>{contacts.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Linkedin size={20} />
                    </div>
                    <span>{contacts.linkedinName}</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Form */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Prenota una Consulenza Gratuita</h3>
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
