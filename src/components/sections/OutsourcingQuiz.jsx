import { useState } from 'react'
import { jsPDF } from 'jspdf'
import Card from '../ui/Card'
import Button from '../ui/Button'

const domande = [
  "Spendi più del 5% del tuo fatturato in consulenti o fornitori esterni?",
  "I tuoi processi esternalizzati sono ripetitivi e prevedibili?",
  "Hai difficoltà a ottenere modifiche rapide dai tuoi fornitori?",
  "Ti senti \"ostaggio\" di uno o più fornitori esterni?",
  "I costi di outsourcing sono aumentati negli ultimi 2 anni?",
  "Condividi dati sensibili aziendali con fornitori esterni?",
  "Il tuo team interno ha smesso di sviluppare competenze chiave?"
]

function getResultato(punteggio) {
  if (punteggio <= 2) {
    return {
      livello: "Basso",
      colore: "text-emerald-600",
      bgColore: "bg-emerald-50",
      messaggio: "L'outsourcing sembra sotto controllo. Tuttavia, potrebbero esserci margini di ottimizzazione."
    }
  } else if (punteggio <= 4) {
    return {
      livello: "Medio",
      colore: "text-amber-600",
      bgColore: "bg-amber-50",
      messaggio: "Ci sono segnali di inefficienza. Un'analisi approfondita potrebbe rivelare opportunità di risparmio significative."
    }
  } else {
    return {
      livello: "Alto",
      colore: "text-red-600",
      bgColore: "bg-red-50",
      messaggio: "Stai probabilmente sprecando risorse importanti. È il momento di valutare alternative con AI e automazione."
    }
  }
}

function OutsourcingQuiz() {
  const [risposte, setRisposte] = useState({})
  const [mostraRisultato, setMostraRisultato] = useState(false)

  const punteggio = Object.values(risposte).filter(r => r === true).length
  const risultato = getResultato(punteggio)
  const tutteRisposte = Object.keys(risposte).length === domande.length

  const handleRisposta = (index, valore) => {
    setRisposte(prev => ({ ...prev, [index]: valore }))
  }

  const calcolaRisultato = () => {
    setMostraRisultato(true)
  }

  const reset = () => {
    setRisposte({})
    setMostraRisultato(false)
  }

  const esportaPDF = () => {
    const doc = new jsPDF()

    // Titolo
    doc.setFontSize(20)
    doc.setTextColor(15, 23, 42) // slate-900
    doc.text("OpenOutsourcing.AI", 20, 25)

    doc.setFontSize(16)
    doc.text("Analisi Potenziale di Risparmio", 20, 35)

    // Linea separatrice
    doc.setDrawColor(226, 232, 240)
    doc.line(20, 40, 190, 40)

    // Risultato
    doc.setFontSize(14)
    doc.setTextColor(15, 23, 42)
    doc.text("Punteggio: " + punteggio + "/7", 20, 55)
    doc.text("Potenziale di risparmio: " + risultato.livello, 20, 65)

    // Domande e risposte
    doc.setFontSize(12)
    doc.text("Le tue risposte:", 20, 80)

    let y = 90
    domande.forEach((domanda, index) => {
      const risposta = risposte[index] ? "SI" : "NO"

      // Gestione testo lungo
      const testoCompleto = (index + 1) + ". " + domanda
      const righe = doc.splitTextToSize(testoCompleto, 140)

      doc.setTextColor(15, 23, 42)
      doc.text(righe, 20, y)

      // Risposta colorata
      if (risposte[index]) {
        doc.setTextColor(220, 38, 38) // red
      } else {
        doc.setTextColor(22, 163, 74) // green
      }
      doc.text(risposta, 170, y)

      y += righe.length * 7 + 5
    })

    // Messaggio finale
    y += 10
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(11)
    const messaggioRighe = doc.splitTextToSize(risultato.messaggio, 170)
    doc.text(messaggioRighe, 20, y)

    // CTA
    y += messaggioRighe.length * 6 + 15
    doc.setFontSize(12)
    doc.setTextColor(16, 185, 129) // emerald-500
    doc.text("Prenota una consulenza gratuita su openoutsourcing.ai", 20, y)

    // Footer
    doc.setFontSize(9)
    doc.setTextColor(148, 163, 184)
    doc.text("Generato da OpenOutsourcing.AI", 20, 285)

    doc.save("analisi-outsourcing.pdf")
  }

  return (
    <section id="quiz" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="heading-2 text-primary">
            Scopri il tuo potenziale di risparmio
          </h2>
          <p className="text-body mt-4 max-w-2xl mx-auto">
            Rispondi a 7 semplici domande per capire se stai sprecando soldi in outsourcing
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!mostraRisultato ? (
            <Card className="p-8">
              <div className="space-y-6">
                {domande.map((domanda, index) => (
                  <div key={index} className="border-b border-slate-100 pb-4 last:border-0">
                    <p className="text-slate-800 font-medium mb-3">
                      {index + 1}. {domanda}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRisposta(index, true)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          risposte[index] === true
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Sì
                      </button>
                      <button
                        onClick={() => handleRisposta(index, false)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          risposte[index] === false
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={calcolaRisultato}
                  disabled={!tutteRisposte}
                >
                  Vedi il risultato
                </Button>
                {!tutteRisposte && (
                  <p className="text-sm text-slate-500 mt-2">
                    Rispondi a tutte le domande per continuare
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <Card className={`p-8 ${risultato.bgColore}`}>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Potenziale di risparmio:
                  <span className={`ml-2 ${risultato.colore}`}>
                    {risultato.livello}
                  </span>
                </h3>
                <p className="text-4xl font-bold text-primary my-4">
                  {punteggio}/7
                </p>
                <p className="text-slate-700 mb-8">
                  {risultato.messaggio}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={esportaPDF}>
                    Scarica PDF
                  </Button>
                  <Button size="lg" variant="secondary" onClick={reset}>
                    Rifai il test
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-slate-600 mb-4">
                    Vuoi un'analisi approfondita gratuita?
                  </p>
                  <a
                    href="#contact"
                    className="inline-block bg-primary hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Prenota Consulenza Gratuita
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default OutsourcingQuiz
