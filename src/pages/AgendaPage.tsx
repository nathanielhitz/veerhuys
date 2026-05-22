import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MusicNote, CalendarBlank, FacebookLogo, ArrowSquareOut, InstagramLogoIcon, ArrowRightIcon } from '@phosphor-icons/react'
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

// ─── Facebook Page embed — consent gate (GDPR) ──────────────────────
function FacebookPageEmbed() {
  const [accepted, setAccepted] = useState(false)
  const iframeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!accepted) return
    // Laad de Facebook SDK éénmalig na toestemming
    if (document.getElementById('fb-sdk')) return
    const script = document.createElement('script')
    script.id = 'fb-sdk'
    script.src = 'https://connect.facebook.net/nl_NL/sdk.js#xfbml=1&version=v20.0'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  }, [accepted])

  if (!accepted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[340px] text-center px-6 py-10 gap-5">
        <div className="w-12 h-12 rounded-full bg-amber-cafe/15 flex items-center justify-center">
          <FacebookLogo size={24} weight="fill" className="text-amber-cafe" />
        </div>
        <div>
          <p className="font-display text-cream-50 text-base font-semibold mb-2">
            Facebook-posts laden
          </p>
          <p className="text-cream-200/55 text-sm leading-relaxed max-w-[30ch]">
            Hiervoor worden cookies van Facebook geplaatst.
          </p>
        </div>
        <button
          onClick={() => setAccepted(true)}
          className="btn btn-ghost-fill text-sm px-5 py-2.5"
        >
          Akkoord & laden
        </button>
      </div>
    )
  }

  return (
    <div ref={iframeRef} className="overflow-hidden rounded-card-inner">
      <div id="fb-root" />
      <div
        className="fb-page"
        data-href="https://www.facebook.com/Veerhuysphoek"
        data-tabs="timeline"
        data-width="400"
        data-height="400"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      />
    </div>
  )
}

// ─── Sociaal sfeerblok ───────────────────────────────────────────────
function SociaalSfeerblok() {
  return (
    <section
      className="py-section bg-espresso-800 overflow-hidden"
      aria-label="Volg ons op social media"
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <SectionLabel className="mb-5 bg-cream-50/8 border-cream-200/15 text-cream-200/60">
                Social media
              </SectionLabel>
              <h2 className="font-display text-display-md text-cream-50 text-balance">
                Volg ons voor de sfeer
              </h2>
            </div>
            <p className="text-cream-200/50 text-sm max-w-[36ch] sm:text-right leading-relaxed">
              De nieuwste party-aankondigingen, sfeerbeelden en updates vind je het eerst op onze socials.
            </p>
          </div>
        </FadeUp>

        {/* Twee-koloms grid — foto-raster + Facebook embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Linker kolom — Instagram CTA */}
          <FadeUp delay={0.05}>
            <div className="card-shell h-full">
              <div className="card-core bg-espresso-700 p-8 h-full flex flex-col justify-between gap-8">

                {/* Logo + handle */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center flex-shrink-0 shadow-warm-sm">
                    <InstagramLogoIcon size={22} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-cream-50 text-sm leading-tight">@veerhuysphoek</p>
                    <p className="text-cream-200/45 text-xs">Instagram</p>
                  </div>
                </div>

                {/* Decoratief vlak */}
                <div className="flex-1 flex items-center justify-center py-4">
                  <div className="w-full max-w-[220px] aspect-square rounded-2xl border border-cream-200/10 bg-cream-50/4 flex items-center justify-center">
                    <InstagramLogoIcon size={56} weight="thin" className="text-cream-200/20" />
                  </div>
                </div>

                {/* Tekst + knop */}
                <div className="flex flex-col gap-5">
                  <p className="text-cream-200/65 text-sm leading-relaxed">
                    De nieuwste sfeerfoto's en aankondigingen vind je op onze Instagram.
                  </p>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-fill w-full justify-center group text-sm"
                  >
                    <InstagramLogoIcon size={16} weight="fill" />
                    Volg ons op Instagram
                    <span className="btn-arrow ml-auto">
                      <ArrowRightIcon size={13} weight="bold" />
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </FadeUp>

          {/* Rechter kolom — Facebook Page embed */}
          <FadeUp delay={0.12}>
            <div className="card-shell h-full">
              <div className="card-core bg-espresso-700 h-full flex flex-col overflow-hidden">

                {/* Kaart-header */}
                <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-cream-200/8">
                  <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                    <FacebookLogo size={18} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-cream-50 text-sm leading-tight">Café 't Veerhuys</p>
                    <p className="text-cream-200/45 text-xs">Facebook-pagina</p>
                  </div>
                </div>

                {/* Embed of consent gate */}
                <div className="flex-1">
                  <FacebookPageEmbed />
                </div>

                {/* Footer-link */}
                <div className="px-5 pb-5 pt-3 border-t border-cream-200/8">
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost-fill w-full justify-center group text-sm"
                  >
                    <FacebookLogo size={16} weight="fill" />
                    Bekijk Facebook-pagina
                    <span className="btn-arrow ml-auto">
                      <ArrowRightIcon size={13} weight="bold" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Sub-tekst */}
        <FadeUp delay={0.18}>
          <p className="text-center text-cream-200/30 text-xs">
            Speciale avonden worden als eerste aangekondigd op Facebook en Instagram.
          </p>
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
      <SociaalSfeerblok />
    </>
  )
}
