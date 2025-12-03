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
    const pageWidth = doc.internal.pageSize.getWidth()

    // Colori
    const emerald = [16, 185, 129]
    const red = [239, 68, 68]
    const slate900 = [15, 23, 42]
    const slate600 = [71, 85, 105]
    const slate200 = [226, 232, 240]

    // === HEADER CON BANDA COLORATA ===
    doc.setFillColor(...emerald)
    doc.rect(0, 0, pageWidth, 45, 'F')

    // Logo/Titolo su sfondo verde
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text("OpenOutsourcing.AI", 20, 25)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text("Trasforma l'outsourcing in risparmio con AI e automazione", 20, 37)

    // === TITOLO REPORT ===
    doc.setTextColor(...slate900)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text("Report Analisi Potenziale di Risparmio", 20, 65)

    // Data generazione
    const oggi = new Date().toLocaleDateString('it-IT', {
      day: '2-digit', month: 'long', year: 'numeric'
    })
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...slate600)
    doc.text("Generato il " + oggi, 20, 73)

    // === BOX RISULTATO PRINCIPALE ===
    const boxY = 82
    const boxColor = punteggio <= 2 ? [209, 250, 229] : punteggio <= 4 ? [254, 243, 199] : [254, 226, 226]
    const textColor = punteggio <= 2 ? [5, 150, 105] : punteggio <= 4 ? [180, 83, 9] : [185, 28, 28]

    doc.setFillColor(...boxColor)
    doc.roundedRect(20, boxY, pageWidth - 40, 35, 4, 4, 'F')

    // Punteggio grande
    doc.setTextColor(...textColor)
    doc.setFontSize(32)
    doc.setFont('helvetica', 'bold')
    doc.text(punteggio + "/7", 35, boxY + 23)

    // Livello e messaggio
    doc.setFontSize(14)
    doc.text("Potenziale di Risparmio: " + risultato.livello.toUpperCase(), 75, boxY + 15)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...slate600)
    const msgRighe = doc.splitTextToSize(risultato.messaggio, pageWidth - 100)
    doc.text(msgRighe, 75, boxY + 25)

    // === BARRA PROGRESSO VISUALE ===
    const barY = boxY + 42
    doc.setFillColor(...slate200)
    doc.roundedRect(20, barY, pageWidth - 40, 8, 2, 2, 'F')

    const progressWidth = ((pageWidth - 40) / 7) * punteggio
    const progressColor = punteggio <= 2 ? emerald : punteggio <= 4 ? [245, 158, 11] : red
    doc.setFillColor(...progressColor)
    doc.roundedRect(20, barY, progressWidth, 8, 2, 2, 'F')

    // === SEZIONE RISPOSTE ===
    let y = barY + 20
    doc.setTextColor(...slate900)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text("Dettaglio Risposte", 20, y)

    y += 10
    domande.forEach((domanda, index) => {
      const risposta = risposte[index]

      // Box per ogni domanda
      const rowHeight = 12
      doc.setFillColor(risposta ? 254 : 240, risposta ? 242 : 253, risposta ? 242 : 244)
      doc.roundedRect(20, y - 6, pageWidth - 40, rowHeight, 2, 2, 'F')

      // Numero domanda
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...slate900)
      doc.text((index + 1) + ".", 25, y + 2)

      // Testo domanda (troncato se necessario)
      doc.setFont('helvetica', 'normal')
      let testoDomanda = domanda
      if (testoDomanda.length > 70) {
        testoDomanda = testoDomanda.substring(0, 67) + "..."
      }
      doc.text(testoDomanda, 35, y + 2)

      // Indicatore risposta con simbolo
      const simbolo = risposta ? "!" : "OK"
      const indicatoreColor = risposta ? red : emerald
      doc.setFillColor(...indicatoreColor)
      doc.roundedRect(pageWidth - 35, y - 4, 18, 8, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text(simbolo, pageWidth - 29, y + 1)

      y += rowHeight + 3
    })

    // === SEZIONE CTA ===
    y += 10
    doc.setFillColor(...emerald)
    doc.roundedRect(20, y, pageWidth - 40, 30, 4, 4, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text("Vuoi scoprire quanto puoi risparmiare?", pageWidth / 2, y + 12, { align: 'center' })

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text("Prenota una consulenza GRATUITA su openoutsourcing.ai", pageWidth / 2, y + 22, { align: 'center' })

    // === FOOTER ===
    const footerY = 275
    doc.setDrawColor(...slate200)
    doc.line(20, footerY - 5, pageWidth - 20, footerY - 5)

    doc.setTextColor(...slate600)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text("OpenOutsourcing.AI - Trasformiamo l'outsourcing in risparmio", 20, footerY + 2)
    doc.text("openoutsourcing.ai | +39 320 083 2135", 20, footerY + 8)

    doc.setTextColor(...emerald)
    doc.setFontSize(8)
    doc.text("Questo report e' stato generato automaticamente.", pageWidth - 20, footerY + 8, { align: 'right' })

    doc.save("analisi-outsourcing-" + oggi.replace(/ /g, '-') + ".pdf")
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
