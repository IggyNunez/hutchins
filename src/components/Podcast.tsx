'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { PodcastData } from '@/sanity/types'

interface Props {
  data: PodcastData
}

export default function Podcast({ data }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  const platforms = data?.platforms || []

  if (!data?.heading) {
    return (
      <section style={{ background: '#faf8f6', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: '#1f2a44' }}>Podcast section - No content available</p>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #faf8f6 0%, #ffffff 100%)',
        padding: 'clamp(100px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(31,42,68,0.08)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Animated Waveform Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
        }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: [0.3, 1, 0.5, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${(i / 30) * 100}%`,
              bottom: 0,
              width: '2%',
              height: '60%',
              background: 'linear-gradient(180deg, var(--indigo), var(--orange))',
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(60px, 10vw, 100px)',
            alignItems: 'center',
          }}
        >
          {/* Left - Content */}
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
                {data?.eyebrow || 'Podcast'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                fontWeight: 600,
                color: 'var(--indigo)',
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {data?.heading || 'Governing the Machine'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                color: 'var(--text-2)',
                lineHeight: 1.8,
                marginBottom: 'clamp(32px, 5vw, 48px)',
                maxWidth: '52ch',
              }}
            >
              {data?.description}
            </motion.p>

            {/* Platform Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              {platforms.map((platform, i) => (
                <motion.a
                  key={platform._key}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(31,42,68,0.08)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(31,42,68,0.04)',
                    border: '1px solid rgba(31,42,68,0.1)',
                    borderRadius: 100,
                    fontFamily: 'var(--sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--indigo)',
                    textDecoration: 'none',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {platform.name}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Latest Episode Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'linear-gradient(135deg, rgba(31,42,68,0.04), rgba(199,106,42,0.04))',
              border: '2px solid rgba(31,42,68,0.08)',
              borderRadius: 40,
              padding: 'clamp(36px, 5vw, 56px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative Corner */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(199,106,42,0.1), transparent 70%)',
              }}
            />

            {/* Play Button */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 20,
                background: 'linear-gradient(135deg, var(--indigo), #2a3654)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 28,
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(31,42,68,0.2)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: 20,
                  border: '2px solid var(--indigo)',
                }}
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginLeft: 3 }}
              >
                <path d="M8 5v14l11-7z" fill="var(--orange)" />
              </svg>
            </motion.div>

            {/* Label */}
            <p
              style={{
                fontFamily: 'var(--label)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: 16,
              }}
            >
              Latest Episode
            </p>

            {/* Episode Title */}
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                fontWeight: 600,
                color: 'var(--indigo)',
                lineHeight: 1.3,
                marginBottom: 16,
              }}
            >
              {data?.latestEpisode?.title}
            </h3>

            {/* Episode Description */}
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.95rem',
                color: 'var(--text-2)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              {data?.latestEpisode?.description}
            </p>

            {/* Listen Links */}
            <div
              style={{
                display: 'flex',
                gap: 20,
                flexWrap: 'wrap',
                paddingTop: 20,
                borderTop: '1px solid rgba(31,42,68,0.08)',
              }}
            >
              {platforms.map((platform) => (
                <a
                  key={platform._key}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--label)',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-2)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--orange)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--text-2)')
                  }
                >
                  {platform.name} →
                </a>
              ))}
            </div>

            {/* Animated Waveform Visual */}
            <div
              style={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-end',
                height: 60,
                marginTop: 28,
              }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [0.3, 1, 0.5, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, var(--indigo), var(--orange))',
                    borderRadius: 4,
                    opacity: 0.2,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
