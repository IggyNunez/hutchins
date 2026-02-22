'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ContactData, SiteSettingsData } from '@/sanity/types'

interface Props {
  data: ContactData
  settings: SiteSettingsData
}

export default function Contact({ data, settings }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) setSent(true)
    } catch {
      /* noop */
    }
    setSending(false)
  }

  const socials = settings?.socialLinks || []

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #1f2a44 0%, #0f1420 100%)',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(75,46,90,0.2), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          minHeight: '100vh',
        }}
      >
        {/* Split Screen Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            minHeight: '100vh',
          }}
        >
          {/* Left Side - Info */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(31,42,68,0.6), rgba(15,20,32,0.8))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: 'clamp(60px, 10vw, 100px) clamp(32px, 6vw, 80px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
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
                {data?.eyebrow || 'Get in Touch'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                color: 'var(--warm-white)',
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {data?.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8,
                maxWidth: '48ch',
                marginBottom: 'clamp(48px, 8vw, 72px)',
              }}
            >
              {data?.body}
            </motion.p>

            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                background: 'rgba(199,106,42,0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(199,106,42,0.2)',
                borderRadius: 32,
                padding: 'clamp(28px, 4vw, 40px)',
                marginBottom: 40,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--label)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  marginBottom: 16,
                }}
              >
                {data?.bookingCard?.label || 'Prefer to book directly?'}
              </p>
              <motion.a
                href={
                  data?.bookingCard?.buttonUrl ||
                  settings?.calendlyUrl ||
                  '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
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
                  padding: '14px 32px',
                  borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(199,106,42,0.3)',
                  marginBottom: 12,
                }}
              >
                {data?.bookingCard?.buttonText || 'Schedule a call'}
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </motion.a>
              {data?.bookingCard?.subtext && (
                <p
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.5)',
                    fontStyle: 'italic',
                    marginTop: 8,
                  }}
                >
                  {data.bookingCard.subtext}
                </p>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {(data?.email || settings?.email) && (
                <a
                  href={`mailto:${data?.email || settings?.email || ''}`}
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.7)',
                    display: 'block',
                    marginBottom: 24,
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--orange)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')
                  }
                >
                  {data?.email || settings?.email}
                </a>
              )}

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {socials.map((social) => (
                  <a
                    key={social._key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--label)',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--orange)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')
                    }
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf8f6 0%, #ffffff 100%)',
              padding: 'clamp(60px, 10vw, 100px) clamp(32px, 6vw, 80px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {sent ? (
                <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(199,106,42,0.1), rgba(199,106,42,0.2))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 32px',
                    }}
                  >
                    <span style={{ fontSize: 36, color: 'var(--orange)' }}>✓</span>
                  </motion.div>
                  <h3
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 600,
                      color: 'var(--indigo)',
                      lineHeight: 1.3,
                      marginBottom: 16,
                    }}
                  >
                    {data?.successHeading || 'Message received.'}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '1rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.7,
                    }}
                  >
                    {data?.successBody}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {data?.formFields?.map((field, i) => (
                    <FormField
                      key={field._key}
                      field={field}
                      index={i}
                      inView={inView}
                    />
                  )) || (
                    <>
                      <FormField
                        field={{ label: 'Name', name: 'name', type: 'text', _key: '1' }}
                        index={0}
                        inView={inView}
                      />
                      <FormField
                        field={{ label: 'Email', name: 'email', type: 'email', _key: '2' }}
                        index={1}
                        inView={inView}
                      />
                      <FormField
                        field={{
                          label: 'What decision are you trying to make?',
                          name: 'message',
                          type: 'textarea',
                          _key: '3',
                        }}
                        index={2}
                        inView={inView}
                      />
                    </>
                  )}

                  <motion.button
                    type="submit"
                    disabled={sending}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: sending ? 1 : 1.03 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      background: sending
                        ? 'rgba(31,42,68,0.5)'
                        : 'linear-gradient(135deg, var(--indigo), #2a3654)',
                      color: 'var(--warm-white)',
                      fontFamily: 'var(--sans)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      padding: '18px 36px',
                      borderRadius: 100,
                      border: 'none',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 40px rgba(31,42,68,0.2)',
                      marginTop: 16,
                    }}
                  >
                    {sending ? 'Sending...' : 'Send message'}
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  field,
  index,
  inView,
}: {
  field: any
  index: number
  inView: boolean
}) {
  const [focused, setFocused] = useState(false)

  const isTextarea = field.type === 'textarea'

  const inputStyles: React.CSSProperties = {
    width: '100%',
    display: 'block',
    background: 'rgba(31,42,68,0.03)',
    border: focused
      ? '2px solid rgba(31,42,68,0.3)'
      : '2px solid rgba(31,42,68,0.1)',
    borderRadius: isTextarea ? 24 : 100,
    padding: isTextarea ? '18px 24px' : '16px 24px',
    fontFamily: 'var(--sans)',
    fontSize: '1rem',
    color: 'var(--indigo)',
    outline: 'none',
    resize: isTextarea ? 'vertical' : 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease',
    minHeight: isTextarea ? 140 : 'auto',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      style={{ marginBottom: 20 }}
    >
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--label)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-2)',
          marginBottom: 10,
        }}
      >
        {field.label}
      </label>
      {isTextarea ? (
        <textarea
          name={field.name}
          rows={4}
          style={inputStyles}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          name={field.name}
          type={field.type === 'email' ? 'email' : 'text'}
          style={inputStyles}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </motion.div>
  )
}
