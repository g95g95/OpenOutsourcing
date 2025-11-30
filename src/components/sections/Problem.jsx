import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, TrendingDown, AlertTriangle, Building2, PlaneTakeoff } from 'lucide-react'
import Card from '../ui/Card'

function AccordionSection({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-slate-800">{title}</span>
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] pb-6' : 'max-h-0'
        }`}
      >
        <div className="text-slate-600 space-y-4">{children}</div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card hover className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="text-3xl font-bold text-primary">{value}</div>
        <div className="text-slate-600 mt-1">{label}</div>
        {trend && <div className="text-sm text-warning mt-2">{trend}</div>}
      </Card>
    </motion.div>
  )
}

function Problem() {
  return (
    <section id="problem" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-primary">
            L'Esternalizzazione e il Suo Impatto sul Fatturato
          </h2>
          <p className="text-body mt-4 max-w-3xl mx-auto">
            L'outsourcing può liberare risorse, ridurre costi e aumentare l'efficienza, ma se applicato in modo eccessivo
            o sbagliato può compromettere la competitività di lungo periodo.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Building2}
            value="19 mld €"
            label="Mercato BPO in Italia"
            trend="Rapporto Censis 2022"
          />
          <StatCard
            icon={TrendingDown}
            value="~30.000"
            label="Imprese coinvolte"
          />
          <StatCard
            icon={AlertTriangle}
            value="200.000"
            label="Addetti nei servizi esternalizzati"
          />
          <StatCard
            icon={TrendingDown}
            value="+15,5%"
            label="Crescita fatturato 2016-2019"
          />
        </div>

        {/* Main Content Accordion */}
        <div className="bg-slate-50 rounded-xl p-6 md:p-8">

          <AccordionSection title="1. Che cos'è l'esternalizzazione" defaultOpen={true}>
            <p>
              L'esternalizzazione (outsourcing) consiste nell'affidare a fornitori esterni attività prima svolte internamente.
              Storicamente nasce come strategia di riduzione dei costi, ma negli ultimi decenni si è trasformata in una leva
              per accedere a competenze specializzate, aumentare la scalabilità e accelerare l'innovazione.
            </p>
            <p>
              La decisione <strong>make or buy</strong> comporta compromessi: efficienza operativa da un lato,
              perdita di controllo e di competenze interne dall'altro.
            </p>
            <div className="bg-white rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Forme di esternalizzazione:</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Offshore outsourcing</strong> – delega in paesi lontani, tipicamente con costi del lavoro inferiori</li>
                <li><strong>Onshore outsourcing</strong> – delega a fornitori nazionali, mantenendo prossimità e maggiore controllo</li>
                <li><strong>Nearshoring</strong> – fornitori in paesi culturalmente e geograficamente vicini</li>
                <li><strong>BPO (Business Process Outsourcing)</strong> – servizi amministrativi, logistica, customer care</li>
                <li><strong>ITO (IT Outsourcing)</strong> – sviluppo software, infrastrutture IT, cloud services</li>
              </ul>
            </div>
          </AccordionSection>

          <AccordionSection title="2. Il mercato dell'outsourcing in Italia">
            <p>Secondo il Rapporto Censis–Gruppo De Pasquale (2022):</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">19 mld €</div>
                <div className="text-sm text-slate-600">Valore settore BPO</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">~30.000</div>
                <div className="text-sm text-slate-600">Imprese coinvolte</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">~200.000</div>
                <div className="text-sm text-slate-600">Addetti</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">9,4 mld €</div>
                <div className="text-sm text-slate-600">Valore aggiunto</div>
              </div>
            </div>
            <p className="font-medium text-slate-700">Le imprese italiane esternalizzano soprattutto per:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Raggiungere nuovi mercati (38,7%)</li>
              <li>Contenere i costi (36,1%)</li>
              <li>Innovare processi/prodotti (22,9%)</li>
              <li>Accedere a competenze tecnologiche (20%)</li>
            </ul>
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong>Il contesto italiano:</strong> Oltre 4 milioni di microimprese con meno di 10 dipendenti,
                solo 4.000 aziende superano i 250 dipendenti. Questa forte frammentazione spiega perché molte
                aziende siano "costrette" a esternalizzare.
              </p>
            </div>
          </AccordionSection>

          <AccordionSection title="3. Benefici operativi ed economici">
            <p className="font-medium text-slate-700">Risparmi tipici:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Fino al <strong>70%</strong> sui costi del personale nei servizi offshore</li>
              <li>Minor spesa in affitti e spazi fisici</li>
              <li>Taglio dei costi fissi (energia, attrezzature)</li>
              <li>Eliminazione degli investimenti in infrastrutture IT</li>
              <li>Risparmi del <strong>50%</strong> nei costi di recruiting</li>
            </ul>
            <p className="mt-4 font-medium text-slate-700">Maggiore flessibilità operativa:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Rapidità nello scalare volumi e personale</li>
              <li>Time-to-market più veloce</li>
              <li>Possibilità di attivare servizi specialistici on demand</li>
            </ul>
          </AccordionSection>

          <AccordionSection title="4. I rischi dell'esternalizzazione">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Costi nascosti</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                <li>Costi di integrazione con sistemi esistenti</li>
                <li>Problemi di comunicazione e fusi orari</li>
                <li>Investimenti necessari per il controllo qualità</li>
                <li>Rischi di sicurezza e conformità (GDPR, ISO)</li>
                <li>Costi di formazione e transizione iniziale</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Perdita di controllo e competenze</h4>
              <p className="text-sm text-red-700">
                Il rischio maggiore emerge quando si esternalizzano: <strong>Ricerca e sviluppo</strong>,
                <strong> Componenti strategici</strong>, <strong>Prodotti di punta</strong>.
                Questi casi aumentano la dipendenza dal fornitore e riducono la capacità competitiva.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Limiti alla differenziazione</h4>
              <p className="text-sm text-red-700">
                Lo studio Impink (NYU, 2022) dimostra che startup che esternalizzano piattaforme IT
                adottano soluzioni uniformi imposte dal fornitore, perdono capacità di personalizzazione
                e rischiano prodotti meno differenziati. <strong>Effetto diretto: erosione dei margini premium.</strong>
              </p>
            </div>
          </AccordionSection>

          <AccordionSection title="5. Caso studio: Boeing 787 Dreamliner">
            <div className="bg-slate-800 text-white rounded-lg p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <PlaneTakeoff className="w-8 h-8 text-accent" />
                <h4 className="text-xl font-bold">Boeing 787 Dreamliner</h4>
              </div>
              <p className="text-slate-300">
                Esempio mondiale della pericolosità di un outsourcing eccessivo.
              </p>
            </div>
            <p><strong>Che cosa ha fatto Boeing?</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Ha esternalizzato circa il <strong>70%</strong> di design, ingegneria e produzione del 787</li>
              <li>Oltre 50 fornitori strategici coinvolti nel programma</li>
              <li>Obiettivo: tagliare tempi e costi. <strong>Risultato: caos.</strong></li>
            </ul>
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-4">
              <p className="font-semibold text-red-800 mb-2">Conseguenze (Forbes, 2024):</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                <li>Incidenti di qualità e sicurezza riconducibili ai fornitori</li>
                <li>Mancanza di coordinamento nella supply chain</li>
                <li>Perdita di controllo del know-how interno</li>
                <li>Dopo l'incidente del 5 gennaio 2024: titolo <strong>-16%</strong> in 5 settimane</li>
                <li>Airbus (concorrente): <strong>+6%</strong> nello stesso periodo</li>
              </ul>
            </div>
          </AccordionSection>

          <AccordionSection title="6. Impatto sul fatturato: quando aumenta e quando diminuisce">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Quando il fatturato AUMENTA</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                  <li>Riduzione costi operativi</li>
                  <li>Scalabilità verso nuovi mercati</li>
                  <li>Accesso a competenze altrimenti non disponibili</li>
                  <li>Rapidità nell'introdurre nuovi prodotti</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">❌ Quando il fatturato DIMINUISCE</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                  <li>Esternalizzazione di attività core → perdita di vantaggio competitivo</li>
                  <li>Prodotti di punta esternalizzati → riduzione qualità e unicità</li>
                  <li>Dipendenza da un unico fornitore → aumento costi a lungo termine</li>
                  <li>Problemi di qualità → resi, richiami, danni reputazionali</li>
                  <li>Lock-in tecnologico → immobilismo e ritardo nell'innovazione</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
              <p className="font-semibold text-amber-800">
                ⚡ Non linearità dell'impatto: L'outsourcing produce una curva a U rovesciata.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 mt-2">
                <li><strong>Troppo poco outsourcing</strong> → inefficienza</li>
                <li><strong>Troppo outsourcing</strong> → perdita di competenze e margine competitivo</li>
                <li><strong>Livello ottimale</strong> → outsourcing selettivo e strategico</li>
              </ul>
            </div>
          </AccordionSection>

          <AccordionSection title="7. Raccomandazioni strategiche">
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Esternalizzare solo attività non core',
                'Mantenere internamente i prodotti di punta',
                'Diversificare i fornitori',
                'Imporre standard di qualità misurabili',
                'Prevedere clausole contrattuali di audit',
                'Proteggere know-how e proprietà intellettuale',
                'Mantenere una capacità interna minima per non perdere competenze'
              ].map((rec, i) => (
                <div key={i} className="bg-white rounded-lg p-3 flex items-start gap-2">
                  <span className="text-accent font-bold">{i + 1}.</span>
                  <span className="text-sm text-slate-700">{rec}</span>
                </div>
              ))}
            </div>
          </AccordionSection>

        </div>

        {/* Conclusion CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-primary rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            L'outsourcing è un'arma a doppio taglio
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            Le imprese che ottengono i risultati migliori sono quelle che proteggono i propri asset core,
            controllano i fornitori e mantengono internamente la capacità di innovare.
          </p>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Scopri la Soluzione
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Sources */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p className="font-medium">Fonti:</p>
          <p>Censis & Gruppo De Pasquale (2022) • MicroSourcing (2025) • Isaiah & Olayide (2023) • Impink, S. (2022) • Forbes (2024)</p>
        </div>
      </div>
    </section>
  )
}

export default Problem
