'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ProblemsData } from '@/sanity/types'

interface Props {
  data: ProblemsData
}

export default function Problems({ data }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  if (!data?.problems || data.problems.length === 0) {
    return (
      <section style={{ background: '#0a0f1e', padding: '100px 20px', textAlign: 'center' }}>
        <p style={{ color: 'white' }}>Problems section - No content available</p>
      </section>
    )
  }

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #0a0f1e 0%, #1a1f2e 100%)',
        padding: 'clamp(100px,12vw,160px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Animated Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(199,106,42,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,106,42,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        }}
      />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,106,42,0.2), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: 80, textAlign: 'center', maxWidth: 900, margin: '0 auto 80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(199, 106, 42, 0.1)',
              padding: '8px 24px',
              borderRadius: '100px',
              marginBottom: 32,
              border: '1px solid rgba(199, 106, 42, 0.2)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                background: 'var(--orange)',
                borderRadius: '50%',
                boxShadow: '0 0 12px var(--orange)',
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
              {data?.eyebrow || 'The Problem'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: 'var(--warm-white)',
              marginBottom: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {data?.heading}
          </motion.h2>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="problem-cards-container">
          {data?.problems?.map((p, i) => (
            <ProblemCard
              key={p._key}
              problem={p}
              index={i}
              inView={inView}
              isHovered={hoveredCard === p._key}
              onHover={() => setHoveredCard(p._key)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Pullquote - Enhanced Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(31,42,68,0.6) 0%, rgba(42,54,84,0.6) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 40,
            padding: 'clamp(50px, 8vw, 90px)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(199,106,42,0.15), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 1000,
              margin: '0 auto',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(60px, 10vw, 120px)',
                color: 'rgba(199,106,42,0.3)',
                lineHeight: 0.8,
                marginBottom: 20,
              }}
            >
              "
            </motion.div>
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.95)',
                margin: 0,
              }}
            >
              {data?.pullquote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProblemCard({
  problem,
  index,
  inView,
  isHovered,
  onHover,
  onLeave,
}: {
  problem: any
  index: number
  inView: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    onLeave()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12 }}
      className="problem-card"
      style={{
        position: 'relative',
        height: 420,
        cursor: 'pointer',
        perspective: '2000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Front Face */}
        <div
          className="problem-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(31,42,68,0.95) 0%, rgba(42,54,84,0.95) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 32,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: isHovered
              ? '0 30px 80px rgba(199,106,42,0.2)'
              : '0 20px 60px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.3s ease',
            overflow: 'hidden',
          }}
        >
          {/* Gradient Overlay */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.15 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, var(--orange), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 72,
                fontWeight: 700,
                background: 'linear-gradient(135deg, rgba(199,106,42,0.4), rgba(199,106,42,0.2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: 28,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 600,
                lineHeight: 1.25,
                color: 'var(--warm-white)',
              }}
            >
              {problem.heading}
            </h3>
          </div>

          <motion.div
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'rgba(199,106,42,0.8)',
              fontFamily: 'var(--label)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span>Read more</span>
            <motion.span
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
              style={{ fontSize: 16 }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Back Face */}
        <div
          className="problem-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(250,248,246,0.98) 0%, rgba(255,255,255,0.98) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 32,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transform: 'rotateY(180deg)',
            border: '1px solid rgba(31,42,68,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}
        >
          <div>
            <div
              style={{
                width: 50,
                height: 5,
                background: 'linear-gradient(90deg, var(--orange), transparent)',
                borderRadius: 5,
                marginBottom: 28,
              }}
            />
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-1)',
              }}
            >
              {problem.body}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--text-2)',
              fontFamily: 'var(--label)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ fontSize: 16, transform: 'rotate(180deg)' }}>→</span>
            <span>Click to flip back</span>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .problem-cards-container {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }

        @media (min-width: 769px) {
          .problem-cards-container {
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)) !important;
            gap: 28px !important;
          }
        }

        @media (max-width: 768px) {
          .problem-card {
            height: 380px !important;
          }
          .problem-card-front,
          .problem-card-back {
            padding: 28px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
