/**
 * Advanced animation utilities for GSAP and Framer Motion
 * Performance-optimized with TypeScript support
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Split text into spans for character/word animations
 */
export function splitText(
  element: HTMLElement,
  type: 'chars' | 'words' | 'lines' = 'words'
): HTMLSpanElement[] {
  const text = element.textContent || ''
  const spans: HTMLSpanElement[] = []

  if (type === 'chars') {
    element.innerHTML = ''
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.className = 'split-char'
      element.appendChild(span)
      spans.push(span)
    })
  } else if (type === 'words') {
    element.innerHTML = ''
    text.split(' ').forEach((word, i) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      span.className = 'split-word'
      element.appendChild(span)
      spans.push(span)

      // Add space between words
      if (i < text.split(' ').length - 1) {
        const space = document.createTextNode(' ')
        element.appendChild(space)
      }
    })
  } else if (type === 'lines') {
    // More complex line splitting would require measuring text
    // For now, we'll split by manual line breaks or sentences
    const lines = text.split(/(?<=[.!?])\s+/)
    element.innerHTML = ''
    lines.forEach((line) => {
      const span = document.createElement('span')
      span.textContent = line
      span.style.display = 'block'
      span.className = 'split-line'
      element.appendChild(span)
      spans.push(span)
    })
  }

  return spans
}

/**
 * Animate counter from 0 to target value
 */
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration: number = 2,
  delay: number = 0,
  suffix: string = ''
): gsap.core.Tween {
  const obj = { value: 0 }

  return gsap.to(obj, {
    value: target,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString() + suffix
    },
  })
}

/**
 * Create parallax effect with customizable speed
 */
export function createParallax(
  element: HTMLElement | string,
  speed: number = 0.5,
  options: ScrollTrigger.Vars = {}
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      if (typeof element === 'string') {
        const el = document.querySelector(element) as HTMLElement
        if (el) {
          gsap.set(el, {
            y: self.progress * 100 * speed,
          })
        }
      } else {
        gsap.set(element, {
          y: self.progress * 100 * speed,
        })
      }
    },
    ...options,
  })
}

/**
 * Stagger reveal animation for collections
 */
export function staggerReveal(
  elements: HTMLElement[] | NodeListOf<HTMLElement> | string,
  options: {
    delay?: number
    stagger?: number
    duration?: number
    ease?: string
    from?: 'start' | 'end' | 'center' | 'edges' | 'random'
  } = {}
): gsap.core.Timeline {
  const {
    delay = 0,
    stagger = 0.1,
    duration = 0.8,
    ease = 'power2.out',
    from = 'start',
  } = options

  const tl = gsap.timeline({ delay })

  tl.from(elements, {
    opacity: 0,
    y: 30,
    duration,
    ease,
    stagger: {
      each: stagger,
      from,
    },
  })

  return tl
}

/**
 * Magnetic effect for interactive elements
 */
export function createMagneticEffect(element: HTMLElement, strength: number = 0.3): () => void {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const handleMouseMove = (e: MouseEvent) => {
    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: distX,
      y: distY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

/**
 * Smooth reveal with clip-path animation
 */
export function clipPathReveal(
  element: HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: gsap.TweenVars = {}
): gsap.core.Tween {
  const clipPaths = {
    up: {
      from: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    down: {
      from: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    left: {
      from: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    right: {
      from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  }

  gsap.set(element, { clipPath: clipPaths[direction].from })

  return gsap.to(element, {
    clipPath: clipPaths[direction].to,
    duration: 1,
    ease: 'power2.inOut',
    ...options,
  })
}

/**
 * Performance optimization: Manage will-change property
 */
export function optimizeWillChange(
  element: HTMLElement,
  properties: string[],
  duration: number = 100
): void {
  // Add will-change before animation
  element.style.willChange = properties.join(', ')

  // Remove will-change after animation + buffer
  setTimeout(() => {
    element.style.willChange = 'auto'
  }, duration)
}

/**
 * Check for reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Batch ScrollTrigger for performance
 */
export function batchScrollTrigger(
  elements: string | Element[] | NodeListOf<Element>,
  vars: gsap.TweenVars
): ScrollTrigger[] {
  return ScrollTrigger.batch(elements, {
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true,
      ...vars
    }),
    onLeave: (batch) => gsap.set(batch, { opacity: 0, y: 100 }),
    onEnterBack: (batch) => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true,
      ...vars
    }),
    onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: -100 }),
  })
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  duration: number = 1,
  offset: number = 0
): void {
  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: offset,
    },
    ease: 'power2.inOut',
  })
}

/**
 * Timeline scrubber for scroll-based animations
 */
export function createScrollTimeline(
  trigger: string | HTMLElement,
  timeline: gsap.core.Timeline,
  options: ScrollTrigger.Vars = {}
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
    animation: timeline,
    ...options,
  })
}