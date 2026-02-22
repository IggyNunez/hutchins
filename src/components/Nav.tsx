'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavigationData, SiteSettingsData } from '@/sanity/types'

interface Props {
  data: NavigationData
  settings: SiteSettingsData
}

export default function Nav({ data, settings }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastY && y > 140 && !menu)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menu])

  const links = data?.links || []

  return (
    <>
      {/* Glassmorphism backdrop */}
      <motion.div
        animate={{
          opacity: scrolled && !hidden ? 1 : 0,
          y: hidden && !menu ? -120 : 0
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 88,
          zIndex: 199,
          background: 'linear-gradient(180deg, rgba(31,42,68,0.72) 0%, rgba(31,42,68,0.62) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          pointerEvents: 'none',
        }}
      />

      <motion.header
        animate={{ y: hidden && !menu ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
          transition: 'border-color 0.4s ease',
        }}
      >
        {/* Gradient accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, var(--orange), var(--indigo), var(--orange))',
            transformOrigin: 'left',
          }}
        />

        <div
          style={{
            maxWidth: 1920,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 80px)',
            height: 88,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <img
              src="/img/logo-full.png"
              alt={settings?.siteTitle || 'Hutchins Data Strategy'}
              style={{
                height: 44,
                width: 'auto',
                maxWidth: 280,
                objectFit: 'contain',
                opacity: scrolled ? 1 : 0.95,
                filter: scrolled ? 'none' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                transition: 'all 0.4s ease',
              }}
            />
          </motion.a>

          <nav
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 40,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l._key}
                href={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                }}
              >
                {l.label}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'var(--orange)',
                    transformOrigin: 'left',
                  }}
                />
              </motion.a>
            ))}
            <motion.a
              href={data?.ctaLink || settings?.calendlyUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(199,106,42,0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, var(--orange), #d97428)',
                color: 'var(--warm-white)',
                fontFamily: 'var(--sans)',
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(199,106,42,0.2)',
              }}
            >
              {data?.ctaText || 'Book a call'}
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </motion.a>
          </nav>

          <button
            className="mobile-only"
            onClick={() => setMenu((v) => !v)}
            aria-label="Toggle menu"
            style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 24,
                  height: 1.5,
                  background: '#fff',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: menu
                    ? i === 0
                      ? 'rotate(45deg) translate(4.5px, 4.5px)'
                      : i === 2
                      ? 'rotate(-45deg) translate(4.5px,-4.5px)'
                      : 'none'
                    : 'none',
                  opacity: menu && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                overflow: 'hidden',
                background: 'var(--indigo)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                style={{
                  padding: '28px clamp(20px,5vw,72px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 28,
                }}
              >
                {links.map((l) => (
                  <a
                    key={l._key}
                    href={l.href}
                    onClick={() => setMenu(false)}
                    style={{
                      fontFamily: 'var(--label)',
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href={data?.ctaLink || settings?.calendlyUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-orange"
                  style={{ alignSelf: 'flex-start', padding: '5px 5px 5px 20px' }}
                >
                  {data?.ctaText || 'Book a call'} <span className="btn-icon">→</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
