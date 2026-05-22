import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MusicNote, CalendarBlank, FacebookLogo, ArrowSquareOut } from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME, social, images } from '../data/siteData'

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
      className="relative min-h-[55dvh] flex items-end overflow-hidden bg-espresso-800"
      aria-label="Agenda hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${images.avondSfeer})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-800 via-espresso-800/50 to-transparent" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-xl pt-32"
        >
          <span className="eyebrow mb-5 inline-flex bg-cream-50/8 border-cream-200/15 text-cream-200/70">
            Uitgaan
          </span>
          <h1 className="font-display text-display-lg text-cream-50 mb-4 text-balance">
            Agenda & evenementen
          </h1>
          <p className="text-cream-200/70 text-lg max-w-[44ch]">
            Elke vrijdag en zaterdag draait DJ Danzz. Volg ons voor speciale evenementen.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function VastAgenda() {
  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="Vaste evenementen">
      <FadeUp>
        <SectionLabel className="mb-6">Wekelijks</SectionLabel>
        <h2 className="font-display text-display-md text-espresso-800 mb-10 text-balance">
          Vrijdag & zaterdag met DJ Danzz
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            dag: 'Vrijdag',
            beschrijving: "De week afsluiten doe je bij Café 't Veerhuys. DJ Danzz draait van 22.30 tot 02.30 uur. Kom gezellig met vrienden en geniet van de avond.",
            badge: 'Elke vrijdag',
          },
          {
            dag: 'Zaterdag',
            beschrijving: "De zaterdag is de avond bij uitstek om uit te gaan in Puttershoek. DJ Danzz achter de draaitafel van 22.30 tot 02.30 uur.",
            badge: 'Elke zaterdag',
          },
        ].map((item, i) => (
          <FadeUp key={item.dag} delay={i * 0.1}>
            <div className="card-shell h-full">
              <div className="card-core p-7 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-full bg-amber-cafe/12 flex items-center justify-center">
                    <MusicNote size={21} weight="duotone" className="text-amber-cafe" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold bg-espresso-800/8 text-taupe px-3 py-1 rounded-pill">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-espresso-800 font-semibold mb-2">{item.dag}</h3>
                <p className="text-sm text-taupe leading-relaxed flex-1 mb-5">{item.beschrijving}</p>
                <div className="pt-4 border-t border-espresso-800/6">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-semibold text-espresso-800 text-sm">DJ Danzz</span>
                    <span className="font-body text-sm text-taupe tabular-nums">22.30 – 02.30 uur</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function SpecialeEvents() {
  return (
    <section className="py-section bg-cream-100" aria-label="Speciale evenementen">
      <div className="max-w-7xl mx-auto px-4">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <SectionLabel className="mb-6">Party-agenda</SectionLabel>
              <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
                Speciale avonden & feesten
              </h2>
              <p className="text-taupe leading-relaxed mb-6 max-w-[50ch]">
                Naast de vaste vrijdag- en zaterdagavonden organiseert {CAFE_NAME} door het jaar
                heen speciale avonden en feesten. De actuele party-agenda vind je altijd op Facebook.
              </p>

              {/* TODO: vervang door dynamische evenementen zodra agenda-beheer beschikbaar is */}
              <div className="bg-espresso-800/5 border border-espresso-800/10 rounded-card px-6 py-5 mb-8 max-w-[44ch]">
                <div className="flex items-start gap-3">
                  <CalendarBlank size={20} weight="duotone" className="text-amber-cafe flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body font-semibold text-espresso-800 text-sm mb-1">
                      Agenda bijgehouden op Facebook
                    </p>
                    <p className="text-sm text-taupe leading-relaxed">
                      Voor de meest actuele informatie over speciale avonden en party's volg je ons
                      op Facebook. Daar posten we alles als eerste.
                    </p>
                  </div>
                </div>
              </div>

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
                <FacebookLogo size={17} weight="fill" />
                Bekijk Facebook-agenda
                <ArrowSquareOut size={15} className="opacity-70" />
              </a>
            </div>

            {/* Sfeerblok rechts */}
            <FadeUp delay={0.15} className="lg:col-span-2">
              <div className="card-shell">
                <div className="card-core bg-espresso-800 px-7 py-10 flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-full bg-amber-cafe/15 flex items-center justify-center">
                    <MusicNote size={24} weight="duotone" className="text-amber-cafe" />
                  </div>
                  <div>
                    <p className="font-display text-cream-50 text-xl font-semibold mb-2 leading-snug">
                      DJ Danzz
                    </p>
                    <p className="text-sm text-cream-200/60 leading-relaxed">
                      Vaste DJ op vrijdag- en zaterdagavond van 22.30 tot 02.30 uur.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-cream-200/10 text-xs text-cream-200/35 leading-relaxed">
                    Entree is gratis. Alcohol uitsluitend voor bezoekers van 18 jaar en ouder.
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

export default function AgendaPage() {
  return (
    <>
      <PageHero />
      <VastAgenda />
      <SpecialeEvents />
    </>
  )
}
