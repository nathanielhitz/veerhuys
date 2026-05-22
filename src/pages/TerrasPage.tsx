import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SunHorizon, Waves, WarningCircle, InstagramLogo } from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME, images, zomeropening, social } from '../data/siteData'

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
    <section className="relative min-h-[60dvh] flex items-end overflow-hidden" aria-label="Terras hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.terrasSfeer})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-800/85 via-espresso-800/35 to-transparent" aria-hidden="true" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-xl pt-32"
        >
          <span className="eyebrow mb-5 inline-flex">Buitenzitten</span>
          <h1 className="font-display text-display-lg text-cream-50 mb-4 text-balance">
            Het terras
          </h1>
          <p className="text-cream-200/75 text-lg max-w-[44ch]">
            Neerstrijken aan de Oude Maas met een koud drankje. Er is geen betere plek.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function TerrasInhoud() {
  return (
    <section className="py-section max-w-7xl mx-auto px-4" aria-label="Terras informatie">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeUp>
          <SectionLabel className="mb-6">Buiten zitten</SectionLabel>
          <h2 className="font-display text-display-md text-espresso-800 mb-6 text-balance">
            Uitwaaien aan de Oude Maas
          </h2>
          <p className="text-taupe leading-relaxed mb-5 max-w-[52ch]">
            Het terras van Café 't Veerhuys ligt langs de haven van Puttershoek,
            met uitzicht op de Oude Maas. Schuif gezellig aan bij vrienden,
            geniet van het uitzicht en bestel iets lekkers.
          </p>
          <p className="text-taupe leading-relaxed mb-10 max-w-[52ch]">
            Van een rustig middagbiertje tot een zomeravond met het hele gezelschap —
            op het terras zit het altijd goed.
          </p>

          {/* Sfeer-details */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: SunHorizon,
                title: 'Open in de zon',
                text: 'Als het weer meezit, zit je hier het beste.',
              },
              {
                icon: Waves,
                title: 'Aan de Oude Maas',
                text: "Uitzicht op het water — ideaal om bij te komen.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={19} weight="duotone" className="text-amber-cafe" />
                </div>
                <div>
                  <p className="font-body font-semibold text-espresso-800 text-sm mb-0.5">{title}</p>
                  <p className="text-sm text-taupe leading-snug">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Dranken & snacks */}
        <FadeUp delay={0.12}>
          <div className="card-shell mb-8">
            <div className="card-core px-7 py-8">
              <p className="eyebrow mb-5">Drankjes & snacks</p>
              <p className="font-display text-display-md text-espresso-800 mb-6 leading-tight">
                Simpel en goed
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Bieren op tap & fles',      sub: 'Heineken en meer' },
                  { label: 'Wijnen & frisdranken',       sub: 'Voor ieder wat wils' },
                  { label: 'Snacks uit de frituur',      sub: 'Lekker bij een drankje' },
                  { label: 'Bal gehakt',                 sub: 'De huisklassieker van Veerhuys' },
                ].map(({ label, sub }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3 border-b border-espresso-800/6 last:border-0"
                  >
                    <div>
                      <p className="font-body font-medium text-espresso-800 text-sm">{label}</p>
                      <p className="text-xs text-taupe/70">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-taupe/50 mt-5 italic leading-relaxed">
                Geen uitgebreide menukaart — gewoon drankjes, borrelen en genieten.
              </p>
            </div>
          </div>

          {/* Zomeropeningstijden */}
          <div className="bg-amber-cafe/8 border border-amber-cafe/20 rounded-card px-6 py-6">
            <div className="flex items-start gap-3">
              <WarningCircle size={20} weight="duotone" className="text-amber-cafe flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-espresso-800 text-sm mb-2">
                  Zomerschema ({zomeropening.periode})
                </p>
                <ul className="flex flex-col gap-1.5">
                  <li className="text-sm text-taupe">
                    <span className="font-medium text-espresso-800">Zaterdag:</span> {zomeropening.zaterdag}
                  </li>
                  <li className="text-sm text-taupe">
                    <span className="font-medium text-espresso-800">Zondag:</span> {zomeropening.zondag}
                  </li>
                  <li className="text-sm text-taupe/70 mt-1">{zomeropening.slectWeer}</li>
                </ul>
                <p className="text-xs text-taupe/55 mt-3">{zomeropening.opmerking}</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function TerrasCTA() {
  return (
    <section className="py-section-sm bg-cream-100" aria-label="Volg ons">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <FadeUp>
          <p className="font-display text-display-md text-espresso-800 mb-4 text-balance">
            Mooi weer voorspeld?
          </p>
          <p className="text-taupe mb-8 max-w-[42ch] mx-auto">
            Volg {CAFE_NAME} op Instagram voor terras-updates en sfeerbeelden.
          </p>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2.5 font-body font-semibold text-sm
              rounded-pill px-6 py-3
              bg-espresso-800 text-cream-50
              hover:bg-espresso-700 active:scale-[0.98]
              transition-all duration-300 ease-out-expo shadow-warm-sm
            "
          >
            <InstagramLogo size={16} weight="fill" />
            Volg op Instagram
          </a>
        </FadeUp>
      </div>
    </section>
  )
}

export default function TerrasPage() {
  return (
    <>
      <PageHero />
      <TerrasInhoud />
      <TerrasCTA />
    </>
  )
}
