import { motion } from 'framer-motion'
import { Clock, TrendingUp, Shield, CheckCircle } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const pricingFeatures = [
  {
    icon: Clock,
    title: 'Tariffa Oraria',
    price: '50 - 150',
    unit: 'euro/ora',
    description: 'Variabile in base alla complessita del progetto e alle competenze richieste.',
  },
  {
    icon: TrendingUp,
    title: 'Success Fee',
    price: '20%',
    unit: 'del risparmio annuo',
    description: 'Pagamento una tantum, solo dopo aver verificato l\'efficacia della soluzione.',
  },
]

const benefits = [
  'Primo consulto completamente gratuito',
  'Pagamento success fee solo dopo 1 mese di test',
  'Nessun costo nascosto',
  'Trasparenza totale sui risultati',
]

function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 text-primary">
            Pricing Trasparente
          </h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Rischio zero. Paghi solo se ottieni risultati concreti.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {pricingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full text-center">
                <Card.Header>
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <Card.Title className="text-2xl">{feature.title}</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">{feature.price}</span>
                    <span className="text-slate-600 ml-2">{feature.unit}</span>
                  </div>
                  <p className="text-slate-600">{feature.description}</p>
                </Card.Content>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-8 max-w-2xl mx-auto border border-slate-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-semibold text-primary">Garanzie Incluse</h3>
          </div>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-slate-700">{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Richiedi Consulenza Gratuita
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
