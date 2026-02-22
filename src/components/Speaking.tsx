'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { SpeakingData } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

interface Props {
  data: SpeakingData
}

export default function Speaking({ data }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })

  const photoUrl = data?.photo?.asset
    ? urlFor(data.photo).width(1800).quality(85).auto('format').url()
    : '/img/chris-speaking.png'

  if (!data?.topics || data.topics.length === 0) {
    return (
      <section style={{ background: '#faf8f6', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: '#1f2a44' }}>Speaking section - No content available</p>
      </section>
    )
  }

  // Bento grid layout definitions - different sized cards
  const bentoLayouts = [
    { gridColumn: '1 / 3', gridRow: '1 / 2' }, // Large horizontal
    { gridColumn: '3 / 4', gridRow: '1 / 3' }, // Tall vertical
    { gridColumn: '1 / 2', gridRow: '2 / 3' }, // Small square
    { gridColumn: '2 / 3', gridRow: '2 / 3' }, // Small square
  ]

  return (
    <section id="speaking" ref={ref}>
      {/* Hero Image */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(500px, 65vw, 800px)',
          overflow: 'hidden',
          background: 'var(--indigo)',
          borderRadius: 'clamp(20px, 3vw, 32px)',
        }}
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          src={photoUrl}
          alt={data?.photo?.alt || 'Christopher Hutchins speaking'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            borderRadius: 'clamp(20px, 3vw, 32px)',
          }}
        />

        {/* Gradient Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(17,24,39,0.2) 0%, rgba(17,24,39,0.6) 60%, rgba(17,24,39,0.95) 100%)',
          }}
        />

        {/* Top Accent Strip */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, var(--orange), var(--indigo), var(--orange))',
            transformOrigin: 'left',
          }}
        />

        {/* Content Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)',
          }}
        >
          <div className="wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: 'var(--orange)',
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
                {data?.eyebrow || 'Speaking'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.05,
                maxWidth: '16ch',
                marginBottom: 16,
              }}
            >
              {data?.heading || 'Speaking'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '48ch',
              }}
            >
              {data?.tagline}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Topics - Bento Grid */}
      <div
        style={{
          background: 'linear-gradient(180deg, #faf8f6 0%, #ffffff 100%)',
          padding: 'clamp(80px, 10vw, 120px) 0',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }}
      >
        <div className="wrap">
          {/* Bento Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gridAutoRows: 'minmax(280px, auto)',
              gap: 20,
              marginBottom: 'clamp(60px, 8vw, 100px)',
            }}
          >
            {data?.topics?.map((topic, i) => (
              <BentoCard
                key={topic._key}
                topic={topic}
                index={i}
                layout={bentoLayouts[i % bentoLayouts.length]}
                inView={inView}
              />
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(31,42,68,0.03), rgba(199,106,42,0.03))',
              border: '2px solid rgba(31,42,68,0.1)',
              borderRadius: 40,
              padding: 'clamp(40px, 6vw, 60px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(24px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                  fontWeight: 600,
                  color: 'var(--indigo)',
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {data?.ctaHeading ||
                  'Topics tailored to your audience and format.'}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.7,
                }}
              >
                {data?.ctaBody ||
                  'Available for keynotes, executive summits, board retreats, and leadership workshops.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.a
                href={data?.ctaButtonHref || '#contact'}
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
                  padding: '18px 36px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 10px 40px rgba(31,42,68,0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                {data?.ctaButtonText || 'Inquire'}
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          /* Hero image section - stack image and text vertically */
          #speaking > div:first-of-type {
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            position: relative !important;
          }

          /* Image - make it first in order */
          #speaking > div:first-of-type img {
            position: relative !important;
            height: 50vh !important;
            min-height: 400px !important;
            order: 1 !important;
          }

          /* Remove gradient overlay on mobile */
          #speaking > div:first-of-type > div:nth-of-type(2) {
            display: none !important;
          }

          /* Top accent strip - hide on mobile or reorder */
          #speaking > div:first-of-type > div:nth-of-type(3) {
            order: 0 !important;
            position: relative !important;
          }

          /* Content - move below image, not overlaid */
          #speaking > div:first-of-type > div:nth-of-type(4) {
            position: relative !important;
            bottom: auto !important;
            background: var(--indigo) !important;
            padding: 40px 20px !important;
            order: 2 !important;
          }

          /* Reduce heading size on mobile */
          #speaking > div:first-of-type h2 {
            font-size: clamp(1.8rem, 8vw, 3rem) !important;
            max-width: 100% !important;
          }

          /* Bento grid mobile fix */
          #speaking .wrap > div:first-of-type {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          #speaking .wrap > div:first-of-type > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  )
}

function BentoCard({
  topic,
  index,
  layout,
  inView,
}: {
  topic: any
  index: number
  layout: { gridColumn: string; gridRow: string }
  inView: boolean
}) {
  const cardRef = useRef(null)
  const isCardInView = useInView(cardRef, { once: true, margin: '-50px' })

  const backgrounds = [
    'linear-gradient(135deg, rgba(31,42,68,0.05), rgba(31,42,68,0.02))',
    'linear-gradient(135deg, rgba(199,106,42,0.05), rgba(199,106,42,0.02))',
    'linear-gradient(135deg, rgba(75,46,90,0.05), rgba(75,46,90,0.02))',
    'linear-gradient(135deg, rgba(31,42,68,0.03), rgba(199,106,42,0.03))',
  ]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={
        inView && isCardInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.95, y: 20 }
      }
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 60px rgba(31,42,68,0.12)',
      }}
      style={{
        ...layout,
        background: backgrounds[index % backgrounds.length],
        border: '1px solid rgba(31,42,68,0.08)',
        borderRadius: 32,
        padding: 'clamp(28px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Decorative Corner */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isCardInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,106,42,0.1), transparent 70%)',
        }}
      />

      <div>
        {/* Number Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={isCardInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.4 + index * 0.12,
            type: 'spring',
          }}
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(199,106,42,0.1)',
            border: '1px solid rgba(199,106,42,0.2)',
            borderRadius: 100,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--label)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--orange)',
            }}
          >
            {topic.number}
          </span>
        </motion.div>

        {/* Heading */}
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
            fontWeight: 600,
            color: 'var(--indigo)',
            lineHeight: 1.3,
            marginBottom: 14,
          }}
        >
          {topic.heading}
        </h3>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.95rem',
            color: 'var(--text-2)',
            lineHeight: 1.7,
          }}
        >
          {topic.body}
        </p>
      </div>

      {/* Bottom Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isCardInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 + index * 0.12 }}
        style={{
          height: 3,
          background: 'linear-gradient(90deg, var(--orange), transparent)',
          borderRadius: 3,
          marginTop: 24,
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}
