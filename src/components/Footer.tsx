import { Link } from 'react-router-dom'
import { FacebookLogo, InstagramLogo, TwitterLogo, ArrowUpRight } from '@phosphor-icons/react'
import { contact, social, CAFE_NAME } from '../data/siteData'

const footerLinks = [
  { label: 'Terras',         to: '/terras' },
  { label: 'Agenda',         to: '/agenda' },
  { label: 'NK Sprietlopen', to: '/nk-sprietlopen' },
  { label: 'Huisregels',     to: '/huisregels' },
  { label: 'Contact',        to: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso-800 text-cream-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-cream-200/10">
          {/* Merk */}
          <div>
            <p className="font-display text-2xl text-cream-50 font-semibold mb-3 leading-tight">
              {CAFE_NAME}
            </p>
            <p className="text-sm text-cream-200/60 leading-relaxed max-w-[30ch]">
              Gezellig borrelen, terras en avondleven aan de Oude Maas in Puttershoek.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-cream-50/8 flex items-center justify-center hover:bg-amber-cafe/20 transition-colors duration-300"
              >
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-cream-50/8 flex items-center justify-center hover:bg-amber-cafe/20 transition-colors duration-300"
              >
                <InstagramLogo size={18} weight="fill" />
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-cream-50/8 flex items-center justify-center hover:bg-amber-cafe/20 transition-colors duration-300"
              >
                <TwitterLogo size={18} weight="fill" />
              </a>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-cream-200/40 mb-5">
              Pagina's
            </p>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-cream-200/70 hover:text-cream-50 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-cream-200/40 mb-5">
              Contact
            </p>
            <address className="not-italic flex flex-col gap-2">
              <span className="text-sm text-cream-200/70">
                {contact.adres}
              </span>
              <span className="text-sm text-cream-200/70">
                {contact.postcode} {contact.plaats}
              </span>
              <a
                href={contact.telefoonLink}
                className="text-sm text-cream-200/70 hover:text-cream-50 transition-colors duration-300 mt-1"
              >
                {contact.telefoon}
              </a>
              <a
                href={contact.emailLink}
                className="text-sm text-cream-200/70 hover:text-cream-50 transition-colors duration-300 inline-flex items-center gap-1"
              >
                {contact.email}
                <ArrowUpRight size={13} className="opacity-60" />
              </a>
            </address>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-cream-200/30">
            &copy; {year} {CAFE_NAME} — Puttershoek
          </p>
          <p className="text-xs text-cream-200/25">
            Openingstijden kunnen afwijken. Controleer social media voor actuele informatie.
          </p>
        </div>
      </div>
    </footer>
  )
}
