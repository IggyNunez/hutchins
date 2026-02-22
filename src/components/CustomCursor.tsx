'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let dotX = 0, dotY = 0, ringX = 0, ringY = 0
    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const loop = () => {
      ringX += (dotX - ringX) * 0.1
      ringY += (dotY - ringY) * 0.1
      if (dot) dot.style.transform = `translate(${dotX}px,${dotY}px) translate(-50%,-50%)`
      if (ring) ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    const grow = () => {
      if (dot) { dot.style.width = '14px'; dot.style.height = '14px' }
      if (ring) { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = 'var(--orange)' }
    }
    const shrink = () => {
      if (dot) { dot.style.width = '9px'; dot.style.height = '9px' }
      if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--indigo)' }
    }

    const attachListeners = () => {
      document.querySelectorAll('a,button').forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }

    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="c-dot" ref={dotRef} />
      <div id="c-ring" ref={ringRef} />
    </>
  )
}
