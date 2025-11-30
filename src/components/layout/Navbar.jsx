import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '#problem', label: 'Il Problema' },
    { href: '#solution', label: 'La Soluzione' },
    { href: '#about', label: 'Chi Sono' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#contact', label: 'Contatti' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-primary">
            OpenOutsourcing<span className="text-accent">.AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Consulenza Gratuita
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-accent hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Consulenza Gratuita
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
