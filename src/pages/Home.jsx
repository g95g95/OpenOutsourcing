import Problem from '../components/sections/Problem'
import Solution from '../components/sections/Solution'

function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section Placeholder */}
      <section id="hero" className="section-padding gradient-mesh">
        <div className="container-custom text-center">
          <h1 className="heading-1 text-primary">
            Le aziende bruciano milioni in outsourcing inutile.
            <span className="text-accent"> Io li fermo.</span>
          </h1>
          <p className="text-body mt-6 max-w-2xl mx-auto">
            Sostituisco consulenti esterni con AI Agents. Primo consulto gratis. Paghi solo se risparmi.
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

      {/* Lead Magnet Section Placeholder */}
      <section id="lead-magnet" className="section-padding bg-accent/10">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Scarica la Guida Gratuita</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* About Section Placeholder */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Chi Sono</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* Pricing Section Placeholder */}
      <section id="pricing" className="section-padding">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Pricing</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* Public Sector Section Placeholder */}
      <section id="public-sector" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-primary">Pubblica Amministrazione</h2>
          <p className="text-body text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contact" className="section-padding bg-primary text-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center">Contattami</h2>
          <p className="text-slate-300 text-center mt-4">Sezione in costruzione...</p>
        </div>
      </section>
    </div>
  )
}

export default Home
