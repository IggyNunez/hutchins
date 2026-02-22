'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/animations/utils'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  className?: string
  style?: React.CSSProperties
  threshold?: number
  once?: boolean
  parallax?: boolean
  parallaxSpeed?: number
  scale?: boolean
  scaleFrom?: number
  scaleTo?: number
  rotate?: boolean
  rotateFrom?: number
  rotateTo?: number
  blur?: boolean
  blurFrom?: number
  blurTo?: number
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
  threshold = 0.1,
  once = true,
  parallax = false,
  parallaxSpeed = 0.5,
  scale = false,
  scaleFrom = 0.9,
  scaleTo = 1,
  rotate = false,
  rotateFrom = -5,
  rotateTo = 0,
  blur = false,
  blurFrom = 10,
  blurTo = 0,
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: threshold })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Check for reduced motion preference
  if (prefersReducedMotion()) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  // Parallax transform
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxSpeed * -100, parallaxSpeed * 100]
  )

  // Scale transform
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [scaleFrom, scaleTo, scaleFrom]
  )

  // Rotate transform
  const rotateValue = useTransform(
    scrollYProgress,
    [0, 1],
    [rotateFrom, rotateTo]
  )

  // Blur transform
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [blurFrom, blurTo, blurFrom]
  )

  // Initial animation states based on direction
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
    x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
    scale: scale ? scaleFrom : 1,
    rotate: rotate ? rotateFrom : 0,
    filter: blur ? `blur(${blurFrom}px)` : 'none',
  }

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: scale ? scaleTo : 1,
    rotate: rotate ? rotateTo : 0,
    filter: blur ? `blur(${blurTo}px)` : 'none',
  }

  // Build motion values object
  const motionStyle: any = { ...style }
  if (parallax) motionStyle.y = y
  if (scale && !inView) motionStyle.scale = scaleValue
  if (rotate && !inView) motionStyle.rotate = rotateValue
  if (blur && !inView) motionStyle.filter = useTransform(blurValue, (val) => `blur(${val}px)`)

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        duration: 0.8,
        delay,
        ease: EASE,
        // Stagger children if they exist
        staggerChildren: 0.1,
      }}
      className={className}
      style={motionStyle}
    >
      {children}
    </motion.div>
  )
}

/**
 * Variant component for staggered children animations
 */
export function AnimatedItem({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE,
      },
    },
  }

  return (
    <motion.div variants={item} className={className} style={style}>
      {children}
    </motion.div>
  )
}

/**
 * Container for staggered animations
 */
export function AnimatedContainer({
  children,
  className,
  style,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  stagger?: number
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}