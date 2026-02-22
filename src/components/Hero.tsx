'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import type { HeroData } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

interface Props {
  data: HeroData
}

export default function Hero({ data }: Props) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.3])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0.2])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -150])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, isMobile ? 1 : 0])

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!inView) return
    gsap.fromTo(
      '.hero-reveal',
      { opacity: 0, y: 80, rotationX: 45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power4.out',
      }
    )
  }, [inView])

  const heroImgUrl = data?.heroImage?.asset
    ? urlFor(data.heroImage).width(1600).quality(90).auto('format').url()
    : '/img/chris-hero.jpg'

  return (
    <section
      className="hero-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#0a0e1a',
      }}
    >
      {/* Animated Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(199,106,42,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(199,106,42,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 0.3,
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Gradient Orbs with Mouse Parallax */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,106,42,0.15), transparent 70%)',
          filter: 'blur(80px)',
          x: mousePos.x,
          y: mousePos.y,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,88,118,0.2), transparent 70%)',
          filter: 'blur(90px)',
          x: -mousePos.x * 0.5,
          y: -mousePos.y * 0.5,
        }}
      />

      {/* Image Container - Right Side (Desktop) / Top (Mobile) */}
      <motion.div
        className="hero-image"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50%',
          overflow: 'hidden',
          borderRadius: 'clamp(20px, 3vw, 32px)',
          scale: imageScale,
          opacity: imageOpacity,
        }}
      >
        <img
          src={heroImgUrl}
          alt={data?.heroImage?.alt || 'Christopher Hutchins'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            borderRadius: 'clamp(20px, 3vw, 32px)',
          }}
        />
        <div
          className="hero-image-gradient"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right,
              #0a0e1a 0%,
              rgba(10,14,26,0.6) 30%,
              transparent 100%)`,
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="hero-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: 120,
          paddingBottom: 60,
          paddingLeft: 'clamp(24px, 6vw, 100px)',
          paddingRight: 'clamp(24px, 6vw, 100px)',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <div className="hero-content-inner" style={{ maxWidth: '750px', width: '100%' }}>
          {/* Animated Badge */}
          <motion.div
            className="hero-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(199, 106, 42, 0.1)',
              border: '1px solid rgba(199, 106, 42, 0.3)',
              borderRadius: '100px',
              padding: '10px 24px',
              marginBottom: 40,
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--orange)',
                boxShadow: '0 0 20px var(--orange)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--label)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {data?.eyebrow || 'Healthcare AI & Data Strategy'}
            </span>
          </motion.div>

          {/* Headline with Gradient */}
          <h1
            className="hero-reveal"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 32,
              textShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {data?.headline || 'Adopt AI and analytics without losing institutional trust.'}
          </h1>

          {/* Body with Glow Effect */}
          <p
            className="hero-reveal"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '60ch',
              marginBottom: 48,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            {data?.body}
          </p>

          {/* CTA Buttons with Hover Effects */}
          <div
            className="hero-reveal"
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 20,
            }}
          >
            <motion.a
              href={data?.primaryCta?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'linear-gradient(135deg, var(--orange) 0%, #d47836 100%)',
                color: '#fff',
                padding: '18px 36px',
                borderRadius: '100px',
                fontFamily: 'var(--label)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(199,106,42,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {data?.primaryCta?.text || 'Book a call'}
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ position: 'relative', zIndex: 1, fontSize: 16 }}
              >
                →
              </motion.span>
            </motion.a>

            <motion.a
              href={data?.secondaryCta?.href || '#about'}
              whileHover={{ x: 8 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--label)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              {data?.secondaryCta?.text || 'Learn more'}
              <span style={{ fontSize: 14 }}>→</span>
            </motion.a>
          </div>

          {/* Subtext */}
          <p
            className="hero-reveal"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 64,
            }}
          >
            {data?.ctaSubtext}
          </p>

          {/* Stats - Glassmorphism Cards */}
          <div
            className="hero-reveal hero-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(12px, 2vw, 20px)',
              maxWidth: 600,
            }}
          >
            {data?.stats?.map((s, i) => (
              <motion.div
                key={s._key}
                whileHover={{ y: -12, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 24,
                  padding: '24px 20px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, var(--orange), transparent)',
                    transformOrigin: 'left',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(1.5rem, 2vw, 1.9rem)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--label)',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Quote - Repositioned for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hero-quote"
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 80px)',
          right: 'clamp(20px, 5vw, 80px)',
          zIndex: 20,
          maxWidth: 380,
        }}
      >
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(31,42,68,0.95) 0%, rgba(10,14,26,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(199,106,42,0.3)',
            borderRadius: 'clamp(16px, 2vw, 20px)',
            padding: 'clamp(20px, 3vw, 28px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(199,106,42,0.1)',
          }}
        >
          {/* Quote mark accent */}
          <div
            style={{
              position: 'absolute',
              top: -8,
              left: 20,
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, var(--orange), #d47836)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--serif)',
              fontSize: 24,
              color: '#fff',
              boxShadow: '0 4px 16px rgba(199,106,42,0.5)',
            }}
          >
            "
          </div>

          {/* Quote text */}
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.95)',
              lineHeight: 1.6,
              margin: '16px 0 0',
            }}
          >
            {data?.badgeQuote || 'Decision integrity, not decision theater.'}
          </p>

          {/* Bottom accent line */}
          <div
            style={{
              marginTop: 16,
              height: 2,
              background: 'linear-gradient(90deg, var(--orange), transparent)',
              borderRadius: 2,
            }}
          />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(80px);
          }
        }

        /* Tablet adjustments */
        @media (max-width: 1024px) {
          .hero-image {
            width: 60% !important;
          }
          .hero-quote {
            right: clamp(16px, 4vw, 40px) !important;
            bottom: clamp(32px, 6vh, 60px) !important;
            max-width: 280px !important;
          }
        }

        /* Mobile layout - stacked */
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 88px !important;
            position: relative !important;
          }
          .hero-image {
            position: relative !important;
            width: 100% !important;
            height: 50vh !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: auto !important;
            opacity: 1 !important;
            transform: none !important;
            margin-bottom: -60px !important;
          }
          .hero-image img {
            object-position: center 30% !important;
          }
          .hero-image-gradient {
            background: linear-gradient(to bottom,
              transparent 0%,
              transparent 50%,
              rgba(10,14,26,0.3) 70%,
              rgba(10,14,26,0.85) 100%) !important;
          }
          .hero-content-wrapper {
            position: relative !important;
            padding: 32px 20px 10px !important;
            min-height: auto !important;
            margin-top: 0 !important;
            z-index: 10 !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .hero-quote {
            position: absolute !important;
            top: 30% !important;
            bottom: auto !important;
            left: 20px !important;
            right: 20px !important;
            transform: translateY(-50%) !important;
            margin: 0 !important;
            max-width: calc(100% - 40px) !important;
            z-index: 25 !important;
          }
          .hero-stats {
            gap: 8px !important;
          }
          .hero-stats > div {
            padding: 16px 12px !important;
            border-radius: 16px !important;
          }
          .hero-stats > div > div:first-of-type {
            font-size: clamp(1.2rem, 5vw, 1.5rem) !important;
          }
          .hero-stats > div > div:last-of-type {
            font-size: 8px !important;
          }
        }
      `}</style>
    </section>
  )
}
