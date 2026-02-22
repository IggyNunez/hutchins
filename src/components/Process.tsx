'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { ProcessData, SiteSettingsData } from '@/sanity/types'

interface Props {
  data: ProcessData
  settings: SiteSettingsData
}

export default function Process({ data, settings }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!data?.steps || data.steps.length === 0) {
    return (
      <section style={{ background: '#1f2a44', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: 'white' }}>Process section - No content available</p>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #1f2a44 0%, #0f1420 50%, #1f2a44 100%)',
        padding: 'clamp(100px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Animated Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(199,106,42,0.02) 100px,
              rgba(199,106,42,0.02) 101px
            )
          `,
        }}
      />

      <div className="wrap" style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(80px, 10vw, 120px)', textAlign: 'center', maxWidth: 1920, margin: '0 auto clamp(80px, 10vw, 120px)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 60,
                height: 4,
                background: 'linear-gradient(90deg, var(--orange), transparent)',
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
                color: 'var(--orange)',
              }}
            >
              {data?.eyebrow || 'How We Work'}
            </span>
            <div
              style={{
                width: 60,
                height: 4,
                background: 'linear-gradient(90deg, transparent, var(--orange))',
                borderRadius: 99,
              }}
            />
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
              color: 'var(--warm-white)',
              marginBottom: 0,
            }}
          >
            {data?.heading || 'How We Work Together'}
          </motion.h2>
        </div>

        {/* Vertical Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: 'relative',
            maxWidth: 1920,
            margin: '0 auto',
          }}
        >
          {/* Animated Progress Line */}
          <div
            style={{
              position: 'absolute',
              left: 50,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'rgba(199,106,42,0.1)',
            }}
          >
            <motion.div
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, var(--orange), var(--indigo))',
                width: '100%',
              }}
            />
          </div>

          {/* Steps */}
          {data?.steps?.map((step, index) => (
            <ProcessStep
              key={step._key}
              step={step}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            marginTop: 'clamp(80px, 10vw, 120px)',
            textAlign: 'center',
          }}
        >
          <motion.a
            href={data?.cta?.url || settings?.calendlyUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'linear-gradient(135deg, var(--orange), #d97428)',
              color: 'var(--warm-white)',
              fontFamily: 'var(--sans)',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '18px 40px',
              borderRadius: 100,
              textDecoration: 'none',
              boxShadow: '0 10px 40px rgba(199,106,42,0.3)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {data?.cta?.text || 'Book a call'}
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </motion.a>
          {data?.ctaSubtext && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.5)',
                marginTop: 16,
              }}
            >
              {data.ctaSubtext}
            </motion.p>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            width: 100% !important;
            margin-left: 0 !important;
            padding: clamp(60px, 10vw, 80px) 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProcessStep({
  step,
  index,
}: {
  step: any
  index: number
}) {
  const stepRef = useRef(null)
  const isInView = useInView(stepRef, { once: true, margin: '-100px' })

  return (
    <>
      <motion.div
        ref={stepRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        className="process-step"
        style={{
          display: 'flex',
          gap: 'clamp(32px, 5vw, 60px)',
          marginBottom: 'clamp(60px, 8vw, 100px)',
          position: 'relative',
          alignItems: 'flex-start',
        }}
      >
        {/* Circle + Connector */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1,
              type: 'spring',
              stiffness: 200,
            }}
            className="step-circle"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--indigo), #2a3654)',
              border: '4px solid rgba(199,106,42,0.3)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 40px rgba(31,42,68,0.4)',
            }}
          >
            <span
              className="step-number"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--orange)',
                lineHeight: 1,
              }}
            >
              {step.number}
            </span>
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
              style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                border: '2px solid var(--orange)',
              }}
            />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            flex: 1,
          }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              fontWeight: 600,
              color: 'var(--warm-white)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {step.heading}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(1rem, 1.1vw, 1.05rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              marginBottom: 16,
            }}
          >
            {step.body}
          </motion.p>
          {step.detail && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: 'rgba(199,106,42,0.85)',
                lineHeight: 1.7,
                borderLeft: '3px solid rgba(199,106,42,0.3)',
                paddingLeft: 20,
              }}
            >
              {step.detail}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
