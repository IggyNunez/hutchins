'use client'

import { motion } from 'framer-motion'
import type { FooterData, SiteSettingsData } from '@/sanity/types'

interface Props {
  data: FooterData
  settings: SiteSettingsData
}

export default function Footer({ data, settings }: Props) {
  const year = new Date().getFullYear()
  const copyright = data?.copyrightText
    ? data.copyrightText.replace('{year}', String(year))
    : `© ${year} Christopher Hutchins. All rights reserved.`

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0a0f1e 0%, #000000 100%)',
        padding: 'clamp(80px, 10vw, 100px) 0 clamp(40px, 5vw, 50px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(199,106,42,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,106,42,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            height: 2,
            background: 'linear-gradient(90deg, var(--orange), transparent)',
            marginBottom: 'clamp(60px, 8vw, 80px)',
            transformOrigin: 'left',
          }}
        />

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(48px, 6vw, 72px)',
            marginBottom: 'clamp(60px, 8vw, 80px)',
            maxWidth: 1400,
          }}
        >
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              gridColumn: 'span 2',
            }}
          >
            <img
              src="/img/logo-full.png"
              alt={settings?.siteTitle || 'Hutchins Data Strategy'}
              style={{
                height: 40,
                width: 'auto',
                maxWidth: 260,
                objectFit: 'contain',
                marginBottom: 28,
                opacity: 0.9,
              }}
            />
            {data?.brandDescription && (
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.75,
                  maxWidth: '48ch',
                }}
              >
                {data.brandDescription}
              </p>
            )}
          </motion.div>

          {/* Navigation Sections */}
          {data?.navSections?.map((section, i) => (
            <motion.div
              key={section._key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3
                style={{
                  fontFamily: 'var(--label)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(199,106,42,0.75)',
                  marginBottom: 24,
                }}
              >
                {section.heading}
              </h3>
              {section.links?.map((link) => (
                <a
                  key={link._key}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--sans)',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.65)',
                    marginBottom: 14,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--orange)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            marginBottom: 28,
          }}
        />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
            }}
          >
            {copyright}
          </p>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--orange)',
            boxShadow: '0 0 20px var(--orange)',
          }}
        />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            overflow: hidden !important;
          }
        }
      `}</style>
    </footer>
  )
}
