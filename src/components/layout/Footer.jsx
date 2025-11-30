import { Link } from 'react-router-dom'
import { Linkedin, Mail, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-bold text-xl">
              OpenOutsourcing<span className="text-accent">.AI</span>
            </Link>
            <p className="mt-4 text-slate-300 text-sm">
              Sostituisco le esternalizzazioni costose con AI Agents e automazioni.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">Chi Sono</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contatti</a></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@openoutsourcing.ai" className="hover:text-white transition-colors">
                  info@openoutsourcing.ai
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+39 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin size={16} />
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} OpenOutsourcing.AI - Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
