import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin, Phone, EnvelopeSimple, FacebookLogo, InstagramLogo, TwitterLogo,
  Clock, ArrowRight,
} from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME, contact, social, openingstijden } from '../data/siteData'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ContactFormulier() {
  const [verzonden, setVerzonden] = useState(false)
  const [naam, setNaam] = useState('')
  const [email, setEmail] = useState('')
  const [bericht, setBericht] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: koppel aan backend of e-mailservice (bijv. Resend, Formspree, Netlify Forms)
    setVerzonden(true)
  }

  if (verzonden) {
    return (
      <div className="card-shell">
        <div className="card-core px-8 py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-sage/12 flex items-center justify-center mx-auto mb-5">
            <ArrowRight size={24} weight="duotone" className="text-sage" />
          </div>
          <p className="font-display text-espresso-800 text-2xl font-semibold mb-3">
            Bericht ontvangen
          </p>
          <p className="text-taupe text-sm max-w-[36ch] mx-auto leading-relaxed">
            Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-shell">
      <form onSubmit={handleSubmit} className="card-core px-8 py-8" noValidate>
        <p className="font-display text-espresso-800 text-2xl font-semibold mb-7 leading-snug">
          Stuur ons een bericht
        </p>

        <div className="flex flex-col gap-5">
          {/* Naam */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="naam" className="font-body text-sm font-medium text-espresso-800">
              Naam
            </label>
            <input
              id="naam"
              type="text"
              required
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              placeholder="Jouw naam"
              className="
                w-full rounded-xl border border-espresso-800/15 bg-cream-50
                px-4 py-3 text-sm text-espresso-800 placeholder:text-taupe/50
                focus:outline-none focus:ring-2 focus:ring-amber-cafe/40 focus:border-amber-cafe/60
                transition-all duration-300
              "
            />
          </div>

          {/* E-mail */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-body text-sm font-medium text-espresso-800">
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              className="
                w-full rounded-xl border border-espresso-800/15 bg-cream-50
                px-4 py-3 text-sm text-espresso-800 placeholder:text-taupe/50
                focus:outline-none focus:ring-2 focus:ring-amber-cafe/40 focus:border-amber-cafe/60
                transition-all duration-300
              "
            />
          </div>

          {/* Bericht */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bericht" className="font-body text-sm font-medium text-espresso-800">
              Bericht
            </label>
            <textarea
              id="bericht"
              required
              rows={5}
              value={bericht}
              onChange={(e) => setBericht(e.target.value)}
              placeholder="Waar kunnen we je mee helpen?"
              className="
                w-full rounded-xl border border-espresso-800/15 bg-cream-50
                px-4 py-3 text-sm text-espresso-800 placeholder:text-taupe/50 resize-none
                focus:outline-none focus:ring-2 focus:ring-amber-cafe/40 focus:border-amber-cafe/60
                transition-all duration-300
              "
            />
            <p className="text-xs text-taupe/50">
              {/* TODO: koppel formulier aan backend/e-mailservice */}
              Je bericht wordt gestuurd naar {contact.email}
            </p>
          </div>

          <button
            type="submit"
            className="
              group inline-flex items-center justify-center gap-2.5 font-body font-semibold text-sm
              rounded-pill px-6 py-3 w-full
              bg-espresso-800 text-cream-50
              hover:bg-espresso-700 active:scale-[0.98]
              transition-all duration-300 ease-out-expo shadow-warm-sm
            "
          >
            Verstuur bericht
            <span className="w-7 h-7 rounded-full bg-cream-50/15 flex items-center justify-center transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
              <ArrowRight size={14} weight="bold" />
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default function ContactPage() {
  const today = new Date().getDay()
  const dagIndex = [1, 2, 3, 4, 5, 6, 0]

  return (
    <>
      {/* Paginatitel */}
      <section className="bg-cream-100 pt-36 pb-16" aria-label="Contact header">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="max-w-xl"
          >
            <SectionLabel className="mb-5">Bereikbaarheid</SectionLabel>
            <h1 className="font-display text-display-lg text-espresso-800 mb-5 text-balance">
              Contact
            </h1>
            <p className="text-taupe leading-relaxed max-w-[50ch]">
              Vragen over openingstijden, een feestje boeken of gewoon even hallo zeggen?
              We horen graag van je.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Inhoud */}
      <section className="py-section max-w-7xl mx-auto px-4" aria-label="Contactgegevens en formulier">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Links: gegevens */}
          <FadeUp>
            <div className="flex flex-col gap-8">
              {/* Adres & telefoon */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-taupe/50 mb-5">
                  Bezoekadres
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href={`https://maps.google.com/?q=Oosthavenzijde+1+Puttershoek`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} weight="duotone" className="text-amber-cafe" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-espresso-800 text-sm group-hover:text-amber-cafe transition-colors duration-300">
                        {contact.adres}
                      </p>
                      <p className="text-sm text-taupe">{contact.postcode} {contact.plaats}</p>
                    </div>
                  </a>
                  <a
                    href={contact.telefoonLink}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} weight="duotone" className="text-amber-cafe" />
                    </div>
                    <span className="font-body font-medium text-espresso-800 text-sm group-hover:text-amber-cafe transition-colors duration-300">
                      {contact.telefoon}
                    </span>
                  </a>
                  <a
                    href={contact.emailLink}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0">
                      <EnvelopeSimple size={18} weight="duotone" className="text-amber-cafe" />
                    </div>
                    <span className="font-body font-medium text-espresso-800 text-sm group-hover:text-amber-cafe transition-colors duration-300 break-all">
                      {contact.email}
                    </span>
                  </a>
                </div>
              </div>

              {/* Openingstijden */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-taupe/50 mb-5 flex items-center gap-2">
                  <Clock size={14} weight="duotone" className="text-amber-cafe" />
                  Openingstijden
                </p>
                <div className="card-shell">
                  <div className="card-core divide-y divide-espresso-800/6">
                    {openingstijden.map((entry, i) => {
                      const isToday = dagIndex[i] === today
                      return (
                        <div
                          key={entry.dag}
                          className={`flex items-center justify-between px-5 py-3 ${isToday ? 'bg-amber-cafe/8' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            {isToday && <span className="w-1.5 h-1.5 rounded-full bg-amber-cafe" aria-hidden="true" />}
                            <span className={`font-body text-sm ${isToday ? 'font-semibold text-espresso-800' : 'font-medium text-taupe'}`}>
                              {entry.dag}
                            </span>
                          </div>
                          <span className={`font-body text-sm tabular-nums ${entry.gesloten ? 'text-taupe/35 italic' : isToday ? 'font-semibold text-espresso-800' : 'text-taupe'}`}>
                            {entry.tijden}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-taupe/50 mb-5">
                  Volg ons
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { href: social.facebook,  icon: FacebookLogo,  label: 'Facebook' },
                    { href: social.instagram, icon: InstagramLogo, label: 'Instagram' },
                    { href: social.twitter,   icon: TwitterLogo,   label: 'Twitter' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="
                        w-11 h-11 rounded-full
                        bg-cream-100 border border-espresso-800/10
                        flex items-center justify-center
                        text-taupe hover:text-espresso-800 hover:bg-cream-200
                        transition-all duration-300
                      "
                    >
                      <Icon size={18} weight="fill" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Rechts: formulier + kaart */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <ContactFormulier />
            </FadeUp>

            {/* Kaart placeholder */}
            <FadeUp delay={0.15}>
              <div className="card-shell">
                <div className="card-core bg-taupe/10 aspect-video flex items-center justify-center">
                  <div className="text-center text-taupe/50 px-6">
                    <MapPin size={30} weight="duotone" className="mx-auto mb-2 text-amber-cafe/50" />
                    <p className="text-sm font-body">
                      {/* TODO: vervang door echte Google Maps embed */}
                      {CAFE_NAME}<br />
                      {contact.adres}, {contact.postcode} {contact.plaats}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=Oosthavenzijde+1+Puttershoek`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-cafe/70 hover:text-amber-cafe mt-2 inline-block underline underline-offset-2"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  )
}
