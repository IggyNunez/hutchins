'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { SolutionData } from '@/sanity/types'

interface Props {
  data: SolutionData
}

export default function Solution({ data }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  if (!data?.outcomes || data.outcomes.length === 0) {
    return (
      <section style={{ background: '#faf8f6', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: '#1f2a44' }}>Solution section - No content available</p>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #faf8f6 0%, #ffffff 50%, #faf8f6 100%)',
        padding: 'clamp(100px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Floating Shapes Background */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31,42,68,0.04), transparent 70%)',
          y,
          opacity,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: 400,
          height: 400,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'radial-gradient(circle, rgba(199,106,42,0.05), transparent 70%)',
          y: useTransform(y, (value) => -value),
          opacity,
        }}
      />

      <div className="wrap">
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
            marginBottom: 'clamp(60px, 8vw, 100px)',
          }}
        >
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
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  width: 60,
                  height: 4,
                  background: 'linear-gradient(90deg, var(--orange), var(--indigo))',
                  borderRadius: 99,
                  transformOrigin: 'left',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--label)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                }}
              >
                {data?.eyebrow || 'The Solution'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                color: 'var(--indigo)',
                marginBottom: 0,
              }}
            >
              {data?.heading}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'var(--text-2)',
              lineHeight: 1.8,
              paddingTop: 'clamp(0px, 3vw, 32px)',
            }}
          >
            {data?.intro}
          </motion.p>
        </div>

        {/* Animated Outcome Cards - Staggered Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 24,
          }}
        >
          {data?.outcomes?.map((outcome, i) => (
            <OutcomeCard
              key={outcome._key}
              outcome={outcome}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function OutcomeCard({
  outcome,
  index,
  inView,
}: {
  outcome: any
  index: number
  inView: boolean
}) {
  const cardRef = useRef(null)
  const isCardInView = useInView(cardRef, { once: true, margin: '-50px' })

  // Unique border radius patterns for each card
  const borderPatterns = [
    '40px 8px 40px 8px',
    '8px 40px 8px 40px',
    '40px 40px 8px 8px',
    '8px 8px 40px 40px',
  ]

  const gradients = [
    'linear-gradient(135deg, rgba(31,42,68,0.03) 0%, rgba(31,42,68,0.08) 100%)',
    'linear-gradient(135deg, rgba(199,106,42,0.03) 0%, rgba(199,106,42,0.08) 100%)',
    'linear-gradient(135deg, rgba(75,46,90,0.03) 0%, rgba(75,46,90,0.08) 100%)',
    'linear-gradient(135deg, rgba(31,42,68,0.05) 0%, rgba(199,106,42,0.05) 100%)',
  ]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={
        inView && isCardInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.9 }
      }
      transition={{
        duration: 0.7,
        delay: 0.3 + index * 0.15,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      style={{
        position: 'relative',
        background: gradients[index % gradients.length],
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(31,42,68,0.08)',
        borderRadius: borderPatterns[index % borderPatterns.length],
        padding: 'clamp(32px, 4vw, 48px)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* Animated Corner Accent */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isCardInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          background: 'linear-gradient(135deg, var(--orange), transparent)',
          opacity: 0.1,
          borderRadius: '0 0 100% 0',
        }}
      />

      {/* Number Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isCardInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.5 + index * 0.15,
          type: 'spring',
          stiffness: 200,
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          background: 'linear-gradient(135deg, var(--indigo), #2a3654)',
          borderRadius: '50%',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--label)',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'var(--orange)',
          }}
        >
          {outcome.number}
        </span>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '2px solid var(--orange)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={isCardInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: 'var(--indigo)',
          lineHeight: 1.3,
          marginBottom: 16,
        }}
      >
        {outcome.heading}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isCardInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 + index * 0.15 }}
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.95rem',
          color: 'var(--text-2)',
          lineHeight: 1.7,
        }}
      >
        {outcome.body}
      </motion.p>

      {/* Decorative Bottom Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isCardInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 + index * 0.15 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, var(--orange), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Hover Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -1,
          background: 'linear-gradient(135deg, var(--orange), var(--indigo))',
          borderRadius: borderPatterns[index % borderPatterns.length],
          opacity: 0,
          zIndex: -1,
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  )
}
