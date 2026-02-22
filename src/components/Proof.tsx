'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { ProofData } from '@/sanity/types'

interface Props {
  data: ProofData
}

export default function Proof({ data }: Props) {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const scrollWidth = ticker.scrollWidth
    const duration = scrollWidth / 50 // Adjust speed here

    ticker.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${scrollWidth / 2}px)` },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'linear',
      }
    )
  }, [data?.items])

  // Duplicate items for seamless loop
  const duplicatedItems = data?.items ? [...data.items, ...data.items] : []

  if (duplicatedItems.length === 0) {
    return (
      <section style={{ background: 'var(--paper)', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-1)' }}>Proof section - No items available</p>
      </section>
    )
  }

  return (
    <section
      style={{
        background: 'var(--paper)',
        borderTop: '1px solid var(--divider)',
        borderBottom: '1px solid var(--divider)',
        overflow: 'hidden',
        position: 'relative',
        padding: '28px 0',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Gradient Fade Edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: 'linear-gradient(to right, var(--paper), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          background: 'linear-gradient(to left, var(--paper), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Infinite Scrolling Ticker */}
      <div
        ref={tickerRef}
        style={{
          display: 'flex',
          gap: 60,
          willChange: 'transform',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexShrink: 0,
              padding: '8px 0',
            }}
          >
            {/* Bullet Icon */}
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--orange)',
                flexShrink: 0,
              }}
            />

            {/* Text */}
            <span
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.95rem',
                color: 'var(--text-2)',
                whiteSpace: 'nowrap',
                fontWeight: 500,
              }}
            >
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
