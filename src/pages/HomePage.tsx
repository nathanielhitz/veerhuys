import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  SunHorizonIcon, PintGlassIcon, UsersIcon, MusicNoteIcon, MapPinIcon, PhoneIcon, ArrowRightIcon,
  FacebookLogo, InstagramLogo
} from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME, contact, openingstijden, images, nkSprietlopen, social } from '../data/siteData'

// ─── Fade-up reveal ────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Achtergrond placeholder — TODO: vervangen door echte foto */}
      <div
        className="absolute inset-0 bg-cover [background-position:72%_center] md:bg-center"
        style={{ backgroundImage: `url(${images.heroPlaceholder})` }}
        aria-hidden="true"
      />
      {/* Scrim 1 — bottom-to-top: algemene leesbaarheidsbasis voor de gehele breedte */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-espresso-800/82 via-espresso-800/35 to-espresso-800/5"
        aria-hidden="true"
      />
      {/* Scrim 2 — left-to-right: beschermt de tekstkolom links, laat het Veerhuys-gebouw rechts ademhalen */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-espresso-800/55 via-espresso-800/18 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow mb-6 inline-flex">
            Puttershoek — aan de Oude Maas
          </span>
          <h1 className="font-display text-cream-50 text-display-xl mb-5 text-balance text-shadow-hero">
            {CAFE_NAME}
          </h1>
          <p className="text-cream-200/80 text-lg leading-relaxed mb-10 max-w-[48ch] text-shadow-hero-sm">
            Of je na het werk binnenstapt voor een biertje, buiten wil zitten
            met uitzicht op de Maas, of later op de avond aanschuift — je bent welkom.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/agenda" className="btn btn-primary">
              Bekijk de agenda
              <span className="btn-arrow"><ArrowRightIcon size={14} weight="bold" /></span>
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact opnemen
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll-indicator */}
      <motion.div
        className="absolute bottom-6 right-6 text-cream-200/40 flex flex-col items-center gap-1.5 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold rotate-90">scroll</span>
      </motion.div>
    </section>
  )
}

// ─── Introductie ────────────────────────────────────────────────────
function IntroductieSection() {
  return (
    <section
      className="relative z-10 -mt-8 sm:-mt-12 md:-mt-16 bg-cream-50 rounded-t-[1.75rem] md:rounded-t-[2.5rem] pt-10 sm:pt-14 md:pt-20 pb-section"
      style={{ boxShadow: '0 -10px 40px rgba(28, 16, 8, 0.10), 0 -2px 8px rgba(28, 16, 8, 0.06)' }}
      aria-label="Over het café"
    >
      <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <FadeUp>
          <SectionLabel className="mb-6">Over ons</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
            Al jaren aan de Oude Maas
          </h2>
          <p className="text-taupe leading-relaxed mb-5 max-w-[55ch]">
            We zitten hier al zo lang dat de meeste vaste gasten de verjaardag
            van het café niet meer weten. Gewoon een café in Puttershoek waar
            je een goed glas kunt drinken, lekker kunt borrelen, of gewoon even
            kunt zitten.
          </p>
          <p className="text-taupe leading-relaxed max-w-[55ch]">
            Het terras ligt aan de Oude Maas — in de zomer de beste plek in
            het dorp. En als DJ Danzz draait op vrijdag en zaterdag, hoef je
            ook na elven nergens anders naartoe.
          </p>
        </FadeUp>

        {/* Feature-grid — asymmetrisch, geen 3-koloms */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: PintGlassIcon,  label: 'Bier & borrelen',          sub: 'Pils, speciaal en wat je maar wilt' },
              { icon: SunHorizonIcon, label: 'Terras aan de Maas',        sub: 'Water aan de overkant' },
              { icon: MusicNoteIcon,  label: 'Vrijdag & zaterdag',        sub: 'DJ Danzz vanaf 22.30 uur' },
              { icon: UsersIcon,      label: 'Feestje of avondje?',       sub: 'Bel even, dan kijken we wat kan' },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div
                key={label}
                className={`card-shell ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className="card-core p-5">
                  <div className="w-9 h-9 rounded-full bg-amber-cafe/12 flex items-center justify-center mb-3">
                    <Icon size={18} weight="duotone" className="text-amber-cafe" />
                  </div>
                  <p className="font-body font-semibold text-espresso-800 text-sm leading-snug mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-taupe/80 leading-snug">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      </div>
    </section>
  )
}

// ─── Terras & snacks ────────────────────────────────────────────────
function TerrasSection() {
  return (
    <section className="bg-espresso-800 py-section overflow-hidden" aria-label="Terras">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Beeld */}
          <FadeUp className="relative order-last lg:order-first">
            <div className="card-shell bg-espresso-700/40 border-cream-200/8">
              <div
                className="card-core bg-cover bg-center aspect-[4/3]"
                style={{ backgroundImage: `url(${images.terrasSfeer})` }}
                role="img"
                aria-label="Terras aan de Oude Maas — TODO: echte foto"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 bg-amber-cafe rounded-card px-5 py-4 shadow-warm">
              <p className="text-cream-50 font-display text-lg font-semibold leading-none">Zomer</p>
              <p className="text-cream-50/70 text-xs font-body mt-0.5">Vanaf 12.00 uur</p>
            </div>
          </FadeUp>

          {/* Tekst */}
          <FadeUp delay={0.1}>
            <SectionLabel className="mb-6 bg-cream-50/8 border-cream-200/15 text-cream-200/70">
              Terras
            </SectionLabel>
            <h2 className="font-display text-display-md text-cream-50 mb-6 text-balance">
              Buiten zitten aan de Oude Maas
            </h2>
            <p className="text-cream-200/70 leading-relaxed mb-5 max-w-[50ch]">
              Het terras ligt recht aan het water. In de zomer schijnt de zon
              er tot laat, en als het wat koeler wordt is er altijd een warm
              drankje. Wij zitten hier zelf ook graag, dus het moet gewoon goed zijn.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                'Pils, speciaal bier, wijn en frisdrank',
                'Snacks uit de frituur',
                'Bal gehakt — al jaren onze bestseller',
                "'s Zomers op zaterdag al open vanaf 12.00",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-cafe mt-2 flex-shrink-0" />
                  <span className="text-sm text-cream-200/70">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/terras" className="btn btn-ghost-fill">
              Meer over het terras
              <span className="btn-arrow"><ArrowRightIcon size={14} weight="bold" /></span>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Avondje uit ────────────────────────────────────────────────────
function AvondSection() {
  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="Avondleven">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Tekst */}
        <FadeUp>
          <SectionLabel className="mb-6">Avond uit</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
            Vrijdag en zaterdag met DJ Danzz
          </h2>
          <p className="text-taupe leading-relaxed mb-5 max-w-[50ch]">
            Elke vrijdag en zaterdagavond staat DJ Danzz achter de draaitafel,
            van 22.30 tot 02.30 uur. Gewoon in Puttershoek, gewoon bij ons.
          </p>
          <p className="text-taupe leading-relaxed mb-8 max-w-[50ch]">
            Wat er op de agenda staat zetten we op Facebook. Volg ons daar
            als je niks wil missen.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/agenda" className="btn btn-dark">
              Bekijk agenda
              <span className="btn-arrow"><ArrowRightIcon size={14} weight="bold" /></span>
            </Link>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-social">
              <FacebookLogo size={16} weight="fill" className="text-[#1877F2]" />
              Volg op Facebook
            </a>
          </div>
        </FadeUp>

        {/* Sfeerkaart */}
        <FadeUp delay={0.12}>
          <div className="relative">
            <div className="card-shell">
              <div
                className="card-core bg-cover bg-center aspect-[4/3]"
                style={{ backgroundImage: `url(${images.avondSfeer})` }}
                role="img"
                aria-label="Sfeervolle avond in het café — TODO: echte foto"
              />
            </div>
            {/* DJ info badge */}
            <div className="absolute top-4 left-4 bg-espresso-800/90 backdrop-blur-sm rounded-card px-4 py-3 border border-cream-200/10">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-amber-cafe animate-pulse" />
                <span className="text-[10px] text-cream-200/50 uppercase tracking-[0.15em] font-semibold">Elke vr & za</span>
              </div>
              <p className="text-cream-50 font-display font-semibold text-base leading-none">
                DJ Danzz
              </p>
              <p className="text-cream-200/50 font-body text-xs mt-0.5">22.30 – 02.30 uur</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── NK Sprietlopen highlight ───────────────────────────────────────
function NKSprietHighlight() {
  return (
    <section
      className="py-section bg-cream-100 overflow-hidden"
      aria-label="NK Sprietlopen"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Tekst — 3 kolommen breed */}
          <FadeUp className="lg:col-span-3">
            <SectionLabel className="mb-6">Sinds 1968</SectionLabel>
            <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
              Het NK Sprietlopen — elke zomer over de haven
            </h2>
            <p className="text-taupe leading-relaxed mb-5 max-w-[52ch]">
              Al sinds 1968 doen we dit. Een boomstam over de haven — eerste
              ronde droog, tweede ronde met zeep. Inschrijven doe je gewoon
              op de dag zelf bij de jury, op het terras.
            </p>
            <div className="bg-amber-cafe/10 border border-amber-cafe/20 rounded-card px-6 py-5 mb-8 max-w-[42ch]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-cafe font-semibold mb-2">
                Volgende editie
              </p>
              <p className="font-display text-espresso-800 text-xl font-semibold leading-snug">
                {nkSprietlopen.datum}
              </p>
              <p className="text-sm text-taupe mt-1.5">
                Vrijdag 21 augustus: indrinkavond &bull; Entree gratis
              </p>
            </div>
            <Link to="/nk-sprietlopen" className="btn btn-dark">
              Meer over NK Sprietlopen
              <span className="btn-arrow"><ArrowRightIcon size={14} weight="bold" /></span>
            </Link>
          </FadeUp>

          {/* Beeld — 2 kolommen breed */}
          <FadeUp delay={0.15} className="lg:col-span-2">
            <div className="card-shell">
              <div
                className="card-core bg-cover bg-center aspect-[3/4]"
                style={{ backgroundImage: `url(${images.nkSpriet})` }}
                role="img"
                aria-label="NK Sprietlopen over de haven — TODO: echte foto"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Openingstijden & locatie ───────────────────────────────────────
function OpeningstijdenSection() {
  const today = new Date().getDay()
  const dagIndex = [1, 2, 3, 4, 5, 6, 0]

  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="Openingstijden en locatie">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Openingstijden */}
        <FadeUp>
          <SectionLabel className="mb-6">Openingstijden</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-8 text-balance">
            Wanneer zijn we open?
          </h2>

          <div className="card-shell">
            <div className="card-core divide-y divide-espresso-800/6">
              {openingstijden.map((entry, i) => {
                const isToday = dagIndex[i] === today
                return (
                  <div
                    key={entry.dag}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                      isToday ? 'bg-amber-cafe/8' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-cafe" aria-hidden="true" />
                      )}
                      <span className={`font-body text-sm font-medium ${isToday ? 'text-espresso-800' : 'text-taupe'}`}>
                        {entry.dag}
                      </span>
                      {isToday && (
                        <span className="text-[9px] uppercase tracking-[0.15em] bg-amber-cafe/15 text-amber-cafe px-2 py-0.5 rounded-pill font-semibold">
                          Vandaag
                        </span>
                      )}
                    </div>
                    <span className={`font-body text-sm tabular-nums ${
                      entry.gesloten ? 'text-taupe/40 italic' : isToday ? 'text-espresso-800 font-semibold' : 'text-taupe'
                    }`}>
                      {entry.tijden}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <p className="text-xs text-taupe/60 mt-4 leading-relaxed max-w-[45ch]">
            Zomerschema (mei – sept): zaterdag open vanaf 12.00, zondag 11.00 – 19.00.
            Kleine afwijkingen? Die zetten we op Facebook.
          </p>
        </FadeUp>

        {/* Locatie */}
        <FadeUp delay={0.1}>
          <SectionLabel className="mb-6">Locatie</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-8 text-balance">
            Je vindt ons aan de haven
          </h2>

          {/* Kaart placeholder — TODO: Google Maps embed */}
          <div className="card-shell mb-6">
            <div className="card-core bg-taupe/10 aspect-video flex items-center justify-center">
              <div className="text-center text-taupe/50">
                <MapPinIcon size={32} weight="duotone" className="mx-auto mb-2 text-amber-cafe/50" />
                <p className="text-sm font-body">
                  {/* TODO: vervang door Google Maps embed */}
                  Google Maps — Oosthavenzijde 1, Puttershoek
                </p>
              </div>
            </div>
          </div>

          <address className="not-italic flex flex-col gap-4">
            <a
              href={`https://maps.google.com/?q=Oosthavenzijde+1+Puttershoek`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPinIcon size={17} weight="duotone" className="text-amber-cafe" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-espresso-800 group-hover:text-amber-cafe transition-colors duration-300">
                  {contact.adres}
                </p>
                <p className="text-sm text-taupe">{contact.postcode} {contact.plaats}</p>
              </div>
            </a>
            <a
              href={contact.telefoonLink}
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0">
                <PhoneIcon size={17} weight="duotone" className="text-amber-cafe" />
              </div>
              <span className="font-body text-sm font-medium text-espresso-800 group-hover:text-amber-cafe transition-colors duration-300">
                {contact.telefoon}
              </span>
            </a>
          </address>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Contact CTA ────────────────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="py-section-sm max-w-7xl mx-auto px-4" aria-label="Contact call-to-action">
      <FadeUp>
        <div className="card-shell">
          <div className="card-core bg-espresso-800 px-8 py-12 md:py-16 text-center flex flex-col items-center">
            <SectionLabel className="mb-6 bg-cream-50/8 border-cream-200/12 text-cream-200/60">
              Even praten?
            </SectionLabel>
            <h2 className="font-display text-display-md text-cream-50 mb-5 text-balance">
              Kom gerust langs
            </h2>
            <p className="text-cream-200/60 leading-relaxed mb-10 max-w-[48ch]">
              Feestje plannen, iets reserveren, of gewoon een vraag?
              Stuur een berichtje of bel even — dat is prima.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-primary">
                Contact opnemen
                <span className="btn-arrow"><ArrowRightIcon size={14} weight="bold" /></span>
              </Link>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-social-dark">
                <InstagramLogo size={16} weight="fill" />
                Volg op Instagram
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  )
}

// ─── HomePage ───────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroductieSection />
      <TerrasSection />
      <AvondSection />
      <NKSprietHighlight />
      <OpeningstijdenSection />
      <ContactCTA />
    </>
  )
}
