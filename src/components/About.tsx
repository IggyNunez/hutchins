'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { AboutData } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

interface Props {
  data: AboutData
}

export default function About({ data }: Props) {
  const ref = useRef(null)
  const imageRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const portraitUrl = data?.portrait?.asset
    ? urlFor(data.portrait).width(900).quality(90).auto('format').url()
    : '/img/chris-about.jpg'

  if (!data?.bio || data.bio.length === 0) {
    return (
      <section style={{ background: '#ffffff', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: '#1f2a44' }}>About section - No content available</p>
      </section>
    )
  }

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #faf8f6 100%)',
        padding: 'clamp(100px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Magazine-style decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 4,
          background: 'linear-gradient(90deg, var(--orange), var(--indigo), var(--orange))',
        }}
      />

      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: 'clamp(48px, 8vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Left Column - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, var(--indigo), var(--orange))',
                  borderRadius: 99,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--label)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--indigo)',
                }}
              >
                {data?.eyebrow || 'The Guide'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                color: 'var(--indigo)',
                marginBottom: 16,
              }}
            >
              {data?.name || 'Christopher Hutchins'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                fontStyle: 'italic',
                color: 'var(--orange)',
                marginBottom: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.4,
              }}
            >
              {data?.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {data?.bio?.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                    lineHeight: 1.8,
                    color: 'var(--text-1)',
                    marginBottom: 24,
                    maxWidth: '60ch',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Credentials Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                marginTop: 'clamp(40px, 6vw, 64px)',
                marginBottom: 'clamp(40px, 6vw, 64px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: 'var(--orange)',
                    borderRadius: 99,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--label)',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-2)',
                  }}
                >
                  Background
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                  gap: 16,
                }}
              >
                {data?.credentials?.map((credential, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{
                      y: -4,
                      boxShadow: '0 12px 40px rgba(31,42,68,0.12)',
                    }}
                    style={{
                      padding: 20,
                      background: 'linear-gradient(135deg, #ffffff, #faf8f6)',
                      border: '1px solid rgba(31,42,68,0.08)',
                      borderRadius: 20,
                      borderLeft: '3px solid var(--indigo)',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '0.9rem',
                        color: 'var(--text-1)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {credential}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <motion.a
                href={data?.primaryCta?.href || '#contact'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'linear-gradient(135deg, var(--indigo), #2a3654)',
                  color: 'var(--warm-white)',
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '16px 32px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(31,42,68,0.2)',
                }}
              >
                {data?.primaryCta?.text || 'Work with Chris'}
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </motion.a>

              <motion.a
                href={data?.secondaryCta?.href || '#speaking'}
                whileHover={{ scale: 1.05, borderColor: 'var(--indigo)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'transparent',
                  color: 'var(--indigo)',
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '16px 32px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  border: '2px solid rgba(31,42,68,0.2)',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {data?.secondaryCta?.text || 'Speaking topics'}
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Sticky Image & Stats */}
          <div
            ref={imageRef}
            style={{
              position: 'sticky',
              top: 120,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Portrait with Magazine Layout */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'clamp(20px, 3vw, 32px)',
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  boxShadow: '0 30px 80px rgba(31,42,68,0.2)',
                }}
              >
                <motion.img
                  src={portraitUrl}
                  alt={data?.portrait?.alt || 'Christopher Hutchins'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: 'clamp(20px, 3vw, 32px)',
                    y,
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(31,42,68,0.9) 0%, transparent 40%)',
                  }}
                />

                {/* Quote Overlay */}
                {data?.quote && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'clamp(24px, 4vw, 40px)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                        fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      "{data.quote}"
                    </p>
                  </div>
                )}

                {/* Decorative Accent Bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 6,
                    background: 'linear-gradient(180deg, var(--orange), var(--indigo))',
                  }}
                />
              </div>

              {/* Stats Grid */}
              {data?.stats && data.stats.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 12,
                    marginTop: 16,
                  }}
                >
                  {data.stats.map((stat, i) => (
                    <motion.div
                      key={stat._key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: 20,
                        background: 'linear-gradient(135deg, #ffffff, #faf8f6)',
                        border: '1px solid rgba(31,42,68,0.08)',
                        borderRadius: 20,
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)',
                          fontWeight: 600,
                          color: 'var(--indigo)',
                          lineHeight: 1,
                          marginBottom: 8,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--label)',
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--text-2)',
                        }}
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
