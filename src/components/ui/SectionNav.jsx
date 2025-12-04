import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'problem', label: 'Il Problema' },
  { id: 'solution', label: 'La Soluzione' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'lead-magnet', label: 'Guida' },
  { id: 'about', label: 'Chi Sono' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'public-sector', label: 'PA' },
  { id: 'contact', label: 'Contatti' },
]

function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id)
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Vai a ${section.label}`}
        >
          {/* Label tooltip */}
          <span className="text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm">
            {section.label}
          </span>
          {/* Dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeSection === section.id
                ? 'bg-accent scale-125'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}

export default SectionNav
