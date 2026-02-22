'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { BookData } from '@/sanity/types'

interface Props {
  data: BookData
}

export default function Book({ data }: Props) {
  const ref = useRef(null)
  const bookRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })

  if (!data?.bookTitle) {
    return (
      <section style={{ background: '#0a0f1e', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: 'white' }}>Book section - No content available</p>
      </section>
    )
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookRef.current) return
    const rect = bookRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #0a0f1e 0%, #1a1f2e 100%)',
        padding: 'clamp(100px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(177,145,90,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(60px, 10vw, 120px)',
            alignItems: 'center',
          }}
        >
          {/* Left - Content */}
          <div style={{ order: 2 }}>
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
                  background: 'linear-gradient(90deg, var(--gold), transparent)',
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
                  color: 'var(--gold)',
                }}
              >
                {data?.eyebrow || 'Published Work'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 600,
                color: 'var(--warm-white)',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {data?.bookTitle || 'The Accountable System'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)',
                fontStyle: 'italic',
                color: 'rgba(177,145,90,0.9)',
                marginBottom: 28,
                lineHeight: 1.4,
              }}
            >
              {data?.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.8,
                marginBottom: 'clamp(32px, 5vw, 48px)',
                maxWidth: '52ch',
              }}
            >
              {data?.description}
            </motion.p>

            <motion.a
              href={data?.purchaseUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, var(--gold), #c89950)',
                color: 'var(--indigo)',
                fontFamily: 'var(--sans)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '18px 36px',
                borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 10px 40px rgba(177,145,90,0.3)',
              }}
            >
              {data?.ctaText || 'Get the Book'}
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </motion.a>
          </div>

          {/* Right - 3D Book Showcase */}
          <motion.div
            ref={bookRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              perspective: '2000px',
              order: 1,
            }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D Book */}
              <div
                style={{
                  width: 'clamp(220px, 30vw, 320px)',
                  aspectRatio: '2/3',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Book Cover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, #1f2a44 0%, #2a3654 100%)',
                    borderRadius: '8px 28px 28px 8px',
                    boxShadow:
                      '0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative Elements */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(135deg, rgba(177,145,90,0.1) 0%, transparent 60%)',
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      padding: 'clamp(24px, 4vw, 36px)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--label)',
                          fontSize: 'clamp(8px, 1vw, 10px)',
                          fontWeight: 700,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: 'rgba(177,145,90,0.7)',
                          marginBottom: 12,
                        }}
                      >
                        Christopher Hutchins
                      </p>
                      <h3
                        style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                          fontWeight: 600,
                          color: '#fff',
                          lineHeight: 1.2,
                          marginBottom: 16,
                        }}
                      >
                        {data?.bookTitle || 'The Accountable System'}
                      </h3>
                      <div
                        style={{
                          width: 40,
                          height: 3,
                          background: 'linear-gradient(90deg, var(--gold), transparent)',
                          borderRadius: 99,
                        }}
                      />
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                      <div
                        style={{
                          padding: 16,
                          background: 'rgba(250,248,246,0.95)',
                          borderRadius: 12,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--sans)',
                            fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                            color: 'var(--indigo)',
                            lineHeight: 1.5,
                          }}
                        >
                          {data?.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spine Accent */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 6,
                      background: 'linear-gradient(180deg, var(--gold), #c89950)',
                    }}
                  />
                </div>

                {/* 3D Depth - Spine */}
                <div
                  style={{
                    position: 'absolute',
                    left: -6,
                    top: 0,
                    bottom: 0,
                    width: 6,
                    background: 'linear-gradient(90deg, #1a2333, #1f2a44)',
                    borderRadius: '8px 0 0 8px',
                    transform: 'rotateY(-90deg)',
                    transformOrigin: 'right',
                  }}
                />

                {/* 3D Depth - Top */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: -6,
                    height: 6,
                    background: 'linear-gradient(180deg, #151d2c, #1f2a44)',
                    borderRadius: '8px 28px 0 0',
                    transform: 'rotateX(90deg)',
                    transformOrigin: 'bottom',
                  }}
                />

                {/* 3D Depth - Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -6,
                    height: 6,
                    background: 'linear-gradient(180deg, #1f2a44, #0f1420)',
                    borderRadius: '0 0 28px 8px',
                    transform: 'rotateX(-90deg)',
                    transformOrigin: 'top',
                  }}
                />
              </div>

              {/* Floating Particles */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  right: '-10%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--gold), transparent)',
                  filter: 'blur(10px)',
                }}
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '-5%',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--gold), transparent)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
