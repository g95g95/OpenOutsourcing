import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from 'lucide-react'

// Genera gli slot orari (9:00 - 18:00, ogni 30 min)
const generaSlotOrari = () => {
  const slots = []
  for (let ora = 9; ora < 18; ora++) {
    slots.push(`${ora.toString().padStart(2, '0')}:00`)
    slots.push(`${ora.toString().padStart(2, '0')}:30`)
  }
  return slots
}

const SLOT_ORARI = generaSlotOrari()

// Nomi giorni e mesi in italiano
const GIORNI = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
const MESI = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
              'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

// Chiave localStorage per le prenotazioni
const BOOKINGS_KEY = 'openoutsourcing_bookings'

function CalendarBooking({ onSelect, selectedDateTime }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookedSlots, setBookedSlots] = useState({})

  // Carica prenotazioni da localStorage
  useEffect(() => {
    const saved = localStorage.getItem(BOOKINGS_KEY)
    if (saved) {
      setBookedSlots(JSON.parse(saved))
    }
  }, [])

  // Ottieni giorni del mese corrente
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // Giorni vuoti all'inizio
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Giorni del mese
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const days = getDaysInMonth(currentMonth)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Verifica se un giorno è selezionabile (lun-ven, non passato)
  const isDaySelectable = (date) => {
    if (!date) return false
    const day = date.getDay()
    return day !== 0 && day !== 6 && date >= today
  }

  // Verifica se uno slot è già prenotato
  const isSlotBooked = (date, slot) => {
    if (!date) return false
    const dateKey = date.toISOString().split('T')[0]
    return bookedSlots[dateKey]?.includes(slot)
  }

  // Gestisce selezione data
  const handleDateSelect = (date) => {
    if (isDaySelectable(date)) {
      setSelectedDate(date)
      setSelectedSlot(null)
    }
  }

  // Gestisce selezione slot
  const handleSlotSelect = (slot) => {
    if (!isSlotBooked(selectedDate, slot)) {
      setSelectedSlot(slot)

      // Notifica il parent
      if (onSelect && selectedDate) {
        const dateStr = selectedDate.toLocaleDateString('it-IT', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        onSelect({
          date: selectedDate,
          slot: slot,
          formatted: `${dateStr} alle ${slot}`
        })
      }
    }
  }

  // Naviga mesi
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Formatta data selezionata per display
  const formatSelectedDate = () => {
    if (!selectedDate) return ''
    return selectedDate.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3">
        <div className="flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5" />
          <span className="font-semibold">Scegli Data e Ora</span>
        </div>
      </div>

      <div className="p-4">
        {/* Navigazione Mese */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="font-semibold text-slate-800">
            {MESI[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Griglia Giorni */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Header giorni settimana */}
          {GIORNI.map(giorno => (
            <div key={giorno} className="text-center text-xs font-medium text-slate-500 py-2">
              {giorno}
            </div>
          ))}

          {/* Giorni del mese */}
          {days.map((day, index) => {
            const isSelectable = isDaySelectable(day)
            const isSelected = selectedDate && day &&
              selectedDate.toDateString() === day.toDateString()
            const isToday = day && day.toDateString() === today.toDateString()

            return (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                disabled={!isSelectable}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all
                  ${!day ? 'invisible' : ''}
                  ${isSelected
                    ? 'bg-emerald-500 text-white shadow-md'
                    : isSelectable
                      ? 'hover:bg-emerald-50 text-slate-700'
                      : 'text-slate-300 cursor-not-allowed'
                  }
                  ${isToday && !isSelected ? 'ring-2 ring-emerald-300' : ''}
                `}
              >
                {day?.getDate()}
              </button>
            )
          })}
        </div>

        {/* Slot Orari */}
        {selectedDate && (
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-slate-700">
                Orari disponibili per {formatSelectedDate()}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {SLOT_ORARI.map(slot => {
                const booked = isSlotBooked(selectedDate, slot)
                const isSelected = selectedSlot === slot

                return (
                  <button
                    key={slot}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={booked}
                    className={`
                      py-2 px-3 rounded-lg text-sm font-medium transition-all
                      ${isSelected
                        ? 'bg-emerald-500 text-white shadow-md'
                        : booked
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                          : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                      }
                    `}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Riepilogo Selezione */}
        {selectedDate && selectedSlot && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">
                Appuntamento selezionato:
              </span>
            </div>
            <p className="text-emerald-700 mt-1 font-semibold">
              {formatSelectedDate()} alle {selectedSlot}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Funzione utility per salvare una prenotazione
export const saveBooking = (date, slot) => {
  const saved = localStorage.getItem(BOOKINGS_KEY)
  const bookings = saved ? JSON.parse(saved) : {}
  const dateKey = date.toISOString().split('T')[0]

  if (!bookings[dateKey]) {
    bookings[dateKey] = []
  }

  if (!bookings[dateKey].includes(slot)) {
    bookings[dateKey].push(slot)
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
  }
}

export default CalendarBooking
