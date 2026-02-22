/**
 * Custom React hooks for advanced animations
 * Integrates GSAP and Framer Motion with performance optimizations
 */

import { useEffect, useRef, useState, useCallback, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView, useMotionValue, useTransform } from 'framer-motion'
import {
  splitText,
  animateCounter,
  createParallax,
  createMagneticEffect,
  optimizeWillChange,
  prefersReducedMotion,
} from './utils'

/**
 * Hook for text reveal animations with split text
 */
export function useTextReveal(
  type: 'chars' | 'words' | 'lines' = 'words',
  options: {
    stagger?: number
    duration?: number
    delay?: number
    ease?: string
  } = {}
): {
  ref: RefObject<HTMLElement>
  isInView: boolean
} {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as RefObject<Element>, { once: true, margin: '-10%' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current || !isInView) return
    if (prefersReducedMotion()) return

    const element = ref.current
    const spans = splitText(element, type)

    if (spans.length === 0) return

    hasAnimated.current = true

    // Set initial state
    gsap.set(spans, {
      opacity: 0,
      y: type === 'chars' ? 10 : 20,
    })

    // Animate in
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.6,
      stagger: options.stagger || (type === 'chars' ? 0.02 : 0.1),
      delay: options.delay || 0,
      ease: options.ease || 'power2.out',
      onStart: () => optimizeWillChange(element, ['transform', 'opacity']),
      onComplete: () => optimizeWillChange(element, [], 0),
    })
  }, [isInView, type, options])

  return { ref: ref as RefObject<HTMLElement>, isInView }
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax(
  speed: number = 0.5,
  options: ScrollTrigger.Vars = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current
    const scrollTrigger = createParallax(element, speed, options)

    return () => {
      scrollTrigger.kill()
    }
  }, [speed, options])

  return ref
}

/**
 * Hook for scroll-triggered sticky sections
 */
export function useStickySection(
  options: {
    start?: string
    end?: string
    pin?: boolean
    pinSpacing?: boolean
    scrub?: boolean | number
  } = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const st = ScrollTrigger.create({
      trigger: element,
      start: options.start || 'top top',
      end: options.end || 'bottom top',
      pin: options.pin !== false,
      pinSpacing: options.pinSpacing !== false,
      scrub: options.scrub || true,
      onUpdate: (self) => {
        // Custom scroll progress handling
        element.style.setProperty('--scroll-progress', self.progress.toString())
      },
    })

    return () => {
      st.kill()
    }
  }, [options])

  return ref
}

/**
 * Hook for number counter animations
 */
export function useCounterAnimation(
  target: number,
  options: {
    duration?: number
    delay?: number
    suffix?: string
    trigger?: boolean
  } = {}
): {
  ref: RefObject<HTMLElement>
  value: number
} {
  const ref = useRef<HTMLElement>(null)
  const [value, setValue] = useState(0)
  const isInView = useInView(ref as RefObject<Element>, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!ref.current || !isInView) return
    if (prefersReducedMotion()) {
      setValue(target)
      if (ref.current) {
        ref.current.textContent = target.toLocaleString() + (options.suffix || '')
      }
      return
    }

    const element = ref.current
    animateCounter(
      element,
      target,
      options.duration || 2,
      options.delay || 0,
      options.suffix || ''
    )
  }, [isInView, target, options])

  return { ref: ref as RefObject<HTMLElement>, value }
}

/**
 * Hook for magnetic button effect
 */
export function useMagneticEffect(strength: number = 0.3): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const cleanup = createMagneticEffect(ref.current, strength)

    return cleanup
  }, [strength])

  return ref
}

/**
 * Hook for scroll-based timeline animations
 */
export function useScrollTimeline(
  animationCallback: (tl: gsap.core.Timeline) => void,
  options: ScrollTrigger.Vars = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current
    const tl = gsap.timeline()

    // Let the callback define the animation
    animationCallback(tl)

    const st = ScrollTrigger.create({
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      animation: tl,
      scrub: options.scrub !== undefined ? options.scrub : 1,
      ...options,
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [animationCallback, options])

  return ref
}

/**
 * Hook for viewport-based scale animations
 */
export function useScaleOnScroll(
  minScale: number = 0.8,
  maxScale: number = 1
): {
  ref: RefObject<HTMLElement>
  scale: number
} {
  const ref = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(minScale)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current

    const st = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        const newScale = minScale + (maxScale - minScale) * self.progress
        setScale(newScale)
        gsap.set(element, { scale: newScale })
      },
    })

    return () => {
      st.kill()
    }
  }, [minScale, maxScale])

  return { ref: ref as RefObject<HTMLElement>, scale }
}

/**
 * Hook for staggered children animations
 */
export function useStaggerChildren(
  options: {
    stagger?: number
    duration?: number
    delay?: number
    ease?: string
    from?: 'start' | 'end' | 'center' | 'edges' | 'random'
  } = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as RefObject<Element>, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!ref.current || !isInView) return
    if (prefersReducedMotion()) return

    const children = ref.current.children

    gsap.set(children, { opacity: 0, y: 30 })

    gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.8,
      stagger: {
        each: options.stagger || 0.1,
        from: options.from || 'start',
      },
      delay: options.delay || 0,
      ease: options.ease || 'power2.out',
    })
  }, [isInView, options])

  return ref
}

/**
 * Hook for reveal animations with Intersection Observer
 */
export function useRevealAnimation(
  options: {
    threshold?: number
    rootMargin?: string
    animationClass?: string
  } = {}
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const animationClass = options.animationClass || 'revealed'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass)
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return ref
}

/**
 * Hook for mouse parallax effect
 */
export function useMouseParallax(
  strength: number = 0.1
): {
  ref: RefObject<HTMLElement>
  x: number
  y: number
} {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion()) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) * strength
      const y = (e.clientY - centerY) * strength

      setPosition({ x, y })
      gsap.to(ref.current, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      if (ref.current) {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return { ref: ref as RefObject<HTMLElement>, x: position.x, y: position.y }
}