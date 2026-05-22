import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck, Prohibit, HandHeart, IdentificationCard, ProhibitInset, Dog,
} from '@phosphor-icons/react'
import SectionLabel from '../components/ui/SectionLabel'
import { CAFE_NAME } from '../data/siteData'

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

const regels: { icon: React.ElementType; titel: string; tekst: string }[] = [
  {
    icon: IdentificationCard,
    titel: 'Legitimatie',
    tekst:
      'Wij serveren uitsluitend alcohol aan personen van 18 jaar en ouder. Wij hanteren een strikt legitimatiebeleid. Bij twijfel wordt altijd gevraagd om een geldig identiteitsbewijs.',
  },
  {
    icon: HandHeart,
    titel: 'Respectvol gedrag',
    tekst:
      'Wij verwachten dat bezoekers respectvol omgaan met personeel, medebezoekers en de inrichting. Agressie, intimidatie of discriminerend gedrag wordt niet getolereerd en leidt tot onmiddellijke verwijdering.',
  },
  {
    icon: Prohibit,
    titel: 'Verwijdering',
    tekst:
      'Het personeel en de eigenaar behouden zich het recht voor om bezoekers te weigeren of te verwijderen die zich niet aan de huisregels houden of overlast veroorzaken, zonder opgaaf van reden.',
  },
  {
    icon: ShieldCheck,
    titel: 'Verantwoord drinken',
    tekst:
      'Wij schenken verantwoord. Personen die zichtbaar dronken zijn of anderszins onder invloed, kunnen geweigerd worden. Wij zijn niet aansprakelijk voor de gevolgen van overmatig alcoholgebruik.',
  },
  {
    icon: ProhibitInset,
    titel: 'Roken',
    tekst:
      'Roken is uitsluitend toegestaan op de aangewezen rookgebieden buiten het café. Binnen het gebouw is roken niet toegestaan.',
  },
  {
    icon: Dog,
    titel: 'Huisdieren',
    tekst:
      'Aangelijnd en netjes opgevoede honden zijn welkom op het terras. Vraag bij twijfel even aan het personeel.',
  },
]

export default function HuisregelsPage() {
  return (
    <>
      {/* Paginatitel */}
      <section
        className="bg-cream-100 pt-36 pb-16"
        aria-label="Huisregels"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="max-w-xl"
          >
            <SectionLabel className="mb-5">Beleid</SectionLabel>
            <h1 className="font-display text-display-lg text-espresso-800 mb-5 text-balance">
              Huisregels
            </h1>
            <p className="text-taupe leading-relaxed max-w-[52ch]">
              Om het gezellig en veilig te houden voor iedereen, vragen wij onze bezoekers
              zich te houden aan de volgende regels. Bedankt voor je begrip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Regels */}
      <section className="py-section max-w-7xl mx-auto px-4" aria-label="Regeloverzicht">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {regels.map((regel, i) => (
            <FadeUp key={regel.titel} delay={i * 0.07}>
              <div className="card-shell h-full">
                <div className="card-core px-7 py-7 h-full flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-cafe/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <regel.icon size={19} weight="duotone" className="text-amber-cafe" />
                  </div>
                  <div>
                    <h2 className="font-body font-semibold text-espresso-800 text-base mb-2 leading-snug">
                      {regel.titel}
                    </h2>
                    <p className="text-sm text-taupe leading-relaxed">{regel.tekst}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Slotopmerking */}
        <FadeUp>
          <div className="card-shell max-w-2xl">
            <div className="card-core bg-espresso-800 px-8 py-8">
              <p className="font-display text-cream-50 text-xl font-semibold mb-4 leading-snug">
                Samen genieten doe je zo
              </p>
              <p className="text-cream-200/65 text-sm leading-relaxed">
                {CAFE_NAME} is er voor iedereen. We willen een plek zijn waar je
                ontspannen een drankje kunt doen, waar je je welkom voelt en waar het
                gezellig is. Heb je vragen of opmerkingen? Spreek gerust een medewerker aan.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
