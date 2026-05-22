'use client'

import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const navLinks = [
  { label: 'Terras',         to: '/terras' },
  { label: 'Agenda',         to: '/agenda' },
  { label: 'NK Sprietlopen', to: '/nk-sprietlopen' },
  { label: 'Huisregels',     to: '/huisregels' },
  { label: 'Contact',        to: '/contact' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Floating pill navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className={`
            flex items-center justify-between gap-6
            rounded-pill border
            px-5 py-3
            w-full max-w-5xl
            transition-all duration-500 ease-spring
            ${scrolled
              ? 'bg-cream-50/90 backdrop-blur-xl border-espresso-800/12 shadow-warm-sm'
              : 'bg-cream-50/70 backdrop-blur-md border-espresso-800/8'}
          `}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col items-start leading-none hover:opacity-80 transition-opacity duration-300"
            aria-label="Café 't Veerhuys — home"
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: '0.6rem',
                letterSpacing: '0.04em',
                color: '#1a0a00',
                textShadow: '1px 1px 2px rgba(0,0,0,0.18)',
                lineHeight: 1,
                marginBottom: '1px',
              }}
            >
              Cafe &#x2019;t
            </span>
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: '1.45rem',
                letterSpacing: '-0.01em',
                color: '#1a0a00',
                textShadow: '2px 2px 0 #c0b8b0, 3px 3px 6px rgba(0,0,0,0.18)',
                lineHeight: 1,
              }}
            >
              Veerhuys
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-body text-sm font-medium px-3 py-1.5 rounded-pill transition-all duration-300 ease-out-expo ${
                      isActive
                        ? 'bg-espresso-800 text-cream-50'
                        : 'text-espresso-700 hover:bg-espresso-800/8'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-espresso-800/8 transition-colors duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} weight="bold" className="text-espresso-800" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <List size={20} weight="bold" className="text-espresso-800" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </header>

      {/* Mobile overlay — glassmorphism fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-cream-50/95 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <nav>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.07,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `block font-display text-3xl font-semibold py-2 transition-colors duration-300 ${
                          isActive ? 'text-amber-cafe' : 'text-espresso-800 hover:text-amber-cafe'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
