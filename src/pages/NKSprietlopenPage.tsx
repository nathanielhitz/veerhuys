import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CalendarBlank, Users, Trophy, Info, FacebookLogo, ArrowRight,
} from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME, nkSprietlopen, social, images } from '../data/siteData'

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

function PageHero() {
  return (
    <section
      className="relative min-h-[65dvh] flex items-end overflow-hidden"
      aria-label="NK Sprietlopen hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.nkSpriet})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-800/92 via-espresso-800/40 to-espresso-800/10" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-2xl pt-32"
        >
          <span className="eyebrow mb-5 inline-flex">Jaarlijks evenement &bull; Puttershoek</span>
          <h1 className="font-display text-display-lg text-cream-50 mb-4 text-balance">
            NK Sprietlopen
          </h1>
          <p className="text-cream-200/75 text-lg max-w-[48ch]">
            Een boomstam over de haven. Eerste ronde droog, tweede ronde met zeep.
            Georganiseerd door {CAFE_NAME} — al sinds 1968.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function Editie2026() {
  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="NK Sprietlopen 2026">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <FadeUp>
          <SectionLabel className="mb-6">Editie {nkSprietlopen.jaar}</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
            NK Sprietlopen {nkSprietlopen.jaar}
          </h2>
          <p className="text-taupe leading-relaxed mb-8 max-w-[52ch]">
            Op {nkSprietlopen.datum} is het weer zover. De haven van Puttershoek
            vormt opnieuw het decor voor het NK Sprietlopen. Deelnemen doe je op de dag
            zelf — inschrijven bij de jury op het terras.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {[
              {
                icon: CalendarBlank,
                label: nkSprietlopen.datum,
                sub: 'NK Sprietlopen',
              },
              {
                icon: CalendarBlank,
                label: nkSprietlopen.indrinken,
                sub: 'Indrinkavond — vrijdagavond voor het NK',
              },
              {
                icon: Users,
                label: 'Inschrijven op de dag zelf',
                sub: 'Meld je aan bij de jury op het terras',
              },
              {
                icon: Trophy,
                label: nkSprietlopen.entree,
                sub: 'Geen toegangsprijs voor toeschouwers',
              },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} weight="duotone" className="text-amber-cafe" />
                </div>
                <div>
                  <p className="font-body font-semibold text-espresso-800 text-sm leading-snug">{label}</p>
                  <p className="text-sm text-taupe">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-cafe/8 border border-amber-cafe/20 rounded-card px-5 py-4 max-w-[44ch]">
            <div className="flex items-start gap-2.5">
              <Info size={17} weight="duotone" className="text-amber-cafe flex-shrink-0 mt-0.5" />
              <p className="text-sm text-taupe leading-relaxed">
                {nkSprietlopen.alcoholLeeftijd}. Details kunnen wijzigen —
                volg onze social media voor de meest actuele informatie.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Wat is sprietlopen */}
        <FadeUp delay={0.12}>
          <div className="card-shell">
            <div className="card-core px-8 py-10">
              <p className="eyebrow mb-5">Hoe werkt het?</p>
              <h3 className="font-display text-2xl text-espresso-800 font-semibold mb-6 leading-tight">
                Over de boomstam
              </h3>
              <div className="flex flex-col gap-6">
                {[
                  {
                    stap: '01',
                    titel: 'Ronde 1 — droog',
                    tekst: 'Balanceer over de boomstam die over de haven ligt. Eerste ronde zonder zeep: voor iedereen haalbaar.',
                  },
                  {
                    stap: '02',
                    titel: 'Ronde 2 — met zeep',
                    tekst: 'De tweede ronde is een andere wereld. De stam is ingesmeerd met zeep — nu begint het echte werk.',
                  },
                  {
                    stap: '03',
                    titel: 'Inschrijven',
                    tekst: 'Meld je op de dag zelf aan bij de jury op het terras. Laagdrempelig, voor iedereen.',
                  },
                  {
                    stap: '04',
                    titel: 'Afterparty',
                    tekst: "Na afloop is het feest nog niet voorbij. De afterparty wordt gevierd in Café 't Veerhuys.",
                  },
                ].map(({ stap, titel, tekst }) => (
                  <div key={stap} className="flex gap-5 items-start">
                    <span className="font-body text-[11px] font-bold text-amber-cafe/60 tabular-nums w-5 flex-shrink-0 mt-0.5">
                      {stap}
                    </span>
                    <div>
                      <p className="font-body font-semibold text-espresso-800 text-sm mb-1">{titel}</p>
                      <p className="text-sm text-taupe leading-relaxed">{tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Geschiedenis() {
  return (
    <section className="py-section bg-espresso-800 overflow-hidden" aria-label="Geschiedenis NK Sprietlopen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <FadeUp className="lg:col-span-3">
            <SectionLabel className="mb-6 bg-cream-50/8 border-cream-200/15 text-cream-200/60">
              Geschiedenis
            </SectionLabel>
            <h2 className="font-display text-display-md text-cream-50 mb-6 text-balance">
              Ontstaan aan de bar, al sinds 1968
            </h2>
            <p className="text-cream-200/65 leading-relaxed mb-5 max-w-[52ch]">
              {nkSprietlopen.history} Wat begon als een lokaal idee aan de bar,
              groeide uit tot een jaarlijks evenement dat de gemeenschap van Puttershoek
              al tientallen jaren samenbrengt.
            </p>
            <p className="text-cream-200/65 leading-relaxed max-w-[52ch]">
              Het NK Sprietlopen is meer dan een wedstrijd — het is een traditie die
              generaties verbindt en de eigenheid van Puttershoek laat zien.
            </p>
          </FadeUp>

          {/* Statistieken / highlights */}
          <FadeUp delay={0.12} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { getal: '1968', label: 'Jaar van oorsprong' },
                { getal: '55+', label: 'Edities en meer' },
                { getal: 'Gratis', label: 'Entree op zaterdag' },
                { getal: '18+', label: 'Alcohol leeftijdsgrens' },
              ].map(({ getal, label }) => (
                <div key={label} className="card-shell bg-espresso-700/30 border-cream-200/8">
                  <div className="card-core bg-espresso-700/40 shadow-inner-highlight px-5 py-6 text-center">
                    <p className="font-display text-cream-50 text-3xl font-semibold leading-none mb-2">{getal}</p>
                    <p className="font-body text-xs text-cream-200/45 leading-snug">{label}</p>
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

function PraktischInfo() {
  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="Praktische informatie">
      <FadeUp>
        <SectionLabel className="mb-6">Praktisch</SectionLabel>
        <h2 className="font-display text-display-md text-espresso-800 mb-10 text-balance">
          Alles wat je moet weten
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            titel: 'Locatie',
            inhoud: 'Haven van Puttershoek, bij Café \'t Veerhuys — Oosthavenzijde 1, Puttershoek.',
          },
          {
            titel: 'Parkeren',
            inhoud: 'Parkeren in de omgeving van de haven. Volg de aanwijzingen ter plaatse.',
          },
          {
            titel: 'Inschrijven',
            inhoud: 'Inschrijven op de dag zelf bij de jury op het terras. Geen voorinschrijving nodig.',
          },
          {
            titel: 'Entree',
            inhoud: 'Gratis toegang op zaterdag voor toeschouwers. Voor deelnemers: aanmelden bij de jury.',
          },
          {
            titel: 'Alcoholbeleid',
            inhoud: 'Alcohol uitsluitend voor bezoekers van 18 jaar en ouder.',
          },
          {
            titel: 'Actuele info',
            inhoud: 'Details kunnen wijzigen. Controleer onze Facebook-pagina voor de meest actuele informatie.',
          },
        ].map((item, i) => (
          <FadeUp key={item.titel} delay={i * 0.06}>
            <div className="card-shell h-full">
              <div className="card-core px-6 py-6 h-full">
                <p className="font-body font-semibold text-espresso-800 text-sm mb-2">{item.titel}</p>
                <p className="text-sm text-taupe leading-relaxed">{item.inhoud}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.1} className="mt-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex items-center gap-2.5 font-body font-semibold text-sm
              rounded-pill px-6 py-3
              bg-[#1877F2] text-white
              hover:bg-[#166FE5] active:scale-[0.98]
              transition-all duration-300 ease-out-expo shadow-warm-sm
            "
          >
            <FacebookLogo size={16} weight="fill" />
            Volg op Facebook voor updates
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
              <ArrowRight size={14} weight="bold" />
            </span>
          </a>
        </div>
      </FadeUp>
    </section>
  )
}

export default function NKSprietlopenPage() {
  return (
    <>
      <PageHero />
      <Editie2026 />
      <Geschiedenis />
      <PraktischInfo />
    </>
  )
}
