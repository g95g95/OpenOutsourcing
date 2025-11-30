import { motion } from 'framer-motion'
import { Bot, Code2, Zap, Clock, Shield, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'

function FeatureCard({ icon: Icon, title, description, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card hover className="h-full">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        {items && (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  )
}

function ActivityCard({ activity, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-lg p-4 border border-slate-200 hover:border-accent/50 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <span className="text-slate-700">{activity}</span>
      </div>
    </motion.div>
  )
}

function Solution() {
  const activities = [
    'Customer care di primo livello con agenti conversazionali multimodali',
    'Localizzazione contenuti (traduzioni, adattamenti, copy SEO)',
    'Creazione di landing page, micro-tool e mini-app via vibe-coding',
    'Quality assurance e generazione test nel ciclo software',
    'Analisi dei dati aziendali con agenti connessi ai database interni',
    'Automazione contabile di base: fatture, verifiche, riconciliazioni',
    'Supporto HR: screening CV, risposte candidate, onboarding assistito',
    'Data entry e data cleaning',
    'Generazione report ripetitivi',
    'Testing software di base',
    'Qualità, tagging, moderazione, controllo dati',
    'Traduzioni, riscritture, analisi documentale'
  ]

  return (
    <section id="solution" className="section-padding gradient-mesh">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-primary">
            Come AI Agents e Vibe-Coding Liberano la Tua Azienda
          </h2>
          <p className="text-body mt-4 max-w-3xl mx-auto">
            Non si tratta solo di "automatizzare", ma di mettere nei processi aziendali lavoratori digitali instancabili,
            capaci di fare ciò che prima richiedeva team esterni interi.
          </p>
        </motion.div>

        {/* Intro Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary text-white rounded-xl p-6 md:p-8 mb-12"
        >
          <p className="text-lg leading-relaxed text-slate-200">
            Per anni le aziende hanno delegato all'esterno tutto ciò che "non era core business": sviluppo software,
            customer care, traduzioni, content creation, test, analisi dati, perfino attività operative ripetitive.
            <span className="text-white font-medium"> Il risultato? Costi ricorrenti altissimi, dipendenza dai fornitori,
            scarsa scalabilità e tempi lenti.</span>
          </p>
          <p className="text-lg leading-relaxed text-slate-200 mt-4">
            Oggi, con l'avvento degli <span className="text-accent font-semibold">agent AI</span> e del
            <span className="text-accent font-semibold"> vibe-coding</span>, questo paradigma si sta sgretolando.
          </p>
        </motion.div>

        {/* Two Main Solutions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FeatureCard
            icon={Bot}
            title="Agent AI: Forza Lavoro Digitale"
            description="Gli agent AI sono sistemi autonomi che pianificano, eseguono, correggono e ripetono compiti senza intervento umano continuo. Rispetto ai bot di qualche anno fa, sono un'altra specie."
            items={[
              'Capiscono obiettivi, non solo comandi',
              'Orchestrano più strumenti: API, database, CRM, mail',
              'Imparano dal contesto e migliorano le performance',
              'Costo: 20–200 €/mese e lavorano 24/7'
            ]}
          />
          <FeatureCard
            icon={Code2}
            title="Vibe-Coding: Sviluppo Senza Codice"
            description="Il nuovo approccio alla programmazione dove non si scrive codice, ma si spiega 'che cosa deve succedere' all'IA. Da lì, gli LLM generano file, funzioni, interfacce, database, API e test."
            items={[
              'Prototipi in ore, non settimane',
              'Riduzione quasi totale dei costi di outsourcing software',
              'Indipendenza tecnica con supervisione umana leggera',
              'Iterazioni rapide: l\'IA modifica interi codebase'
            ]}
          />
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="heading-3 text-center text-primary mb-8">
            Da Outsourcing a "Centauri Digitali"
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary mb-2">Più Snelle</h4>
              <p className="text-sm text-slate-600">Meno contratti, meno complessità amministrativa</p>
            </Card>
            <Card className="text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary mb-2">Più Rapide</h4>
              <p className="text-sm text-slate-600">I processi non aspettano fusi orari o cicli esterni</p>
            </Card>
            <Card className="text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary mb-2">Più Sicure</h4>
              <p className="text-sm text-slate-600">I dati restano dentro l'azienda</p>
            </Card>
            <Card className="text-center">
              <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-bold text-primary mb-2">Più Scalabili</h4>
              <p className="text-sm text-slate-600">Si aggiungono agent AI, non nuovi appalti</p>
            </Card>
          </div>
        </motion.div>

        {/* Cost Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-accent/10 border border-accent/30 rounded-xl p-6 md:p-8 mb-12 text-center"
        >
          <p className="text-lg text-slate-700">
            <strong className="text-primary">La spesa operativa diventa prevedibile.</strong> L'outsourcing è variabile
            e spesso opaco; gli agent AI costano <span className="text-accent font-bold text-2xl">20–200 €/mese</span> l'uno
            e lavorano <span className="text-accent font-bold">24/7</span>.
          </p>
        </motion.div>

        {/* Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="heading-3 text-center text-primary mb-4">
            Attività che puoi riportare "in casa" in meno di 90 giorni
          </h3>
          <p className="text-body text-center mb-8 max-w-2xl mx-auto">
            Il tutto senza firmare un nuovo contratto di outsourcing.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity, i) => (
              <ActivityCard key={i} activity={activity} delay={i * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Vibe-Coding Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 mb-12"
        >
          <h3 className="heading-3 text-primary mb-4 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-accent" />
            Cosa significa il vibe-coding in pratica?
          </h3>
          <div className="bg-slate-50 rounded-lg p-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Un progetto che prima richiedeva un team esterno da <span className="text-red-600 font-semibold">30–50 €/h per mesi</span> può
              oggi essere costruito internamente da <span className="text-accent font-semibold">1–2 persone con l'assistenza dell'IA</span>.
            </p>
            <p className="text-slate-600 mt-4">
              Non sempre perfetto al primo colpo, ma radicalmente più economico.
            </p>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            La transizione è già in corso
          </h3>
          <p className="text-slate-300 max-w-3xl mx-auto mb-6 text-lg">
            Ridurre o eliminare le esternalizzazioni non è una fantasia futuristica.
            Gli agent AI agiscono come forza lavoro autonoma; il vibe-coding permette di sviluppare in casa
            ciò che prima veniva commissionato fuori; l'IA generativa automatizza metà delle attività ripetitive
            che bruciano budget.
          </p>
          <div className="bg-white/10 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <p className="text-white font-medium">
              Le aziende che adottano questo approccio diventano più veloci, più leggere e soprattutto
              <span className="text-accent"> meno dipendenti da fornitori esterni</span>.
            </p>
          </div>
          <p className="text-amber-300 font-semibold mb-6">
            Chi non lo fa, rischia di pagare per anni ciò che ormai si può ottenere internamente… in un pomeriggio.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Prenota una Consulenza Gratuita
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Solution
