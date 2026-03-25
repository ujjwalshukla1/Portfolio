'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ContactData {
  title?: string
  email?: string
  phone?: string
  location?: string
  socialLinks?: Array<{ platform: string; url: string }>
}

interface ContactSectionProps {
  contactData?: ContactData
}

export function ContactSection({ contactData }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contactItemsRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const socialLabelRef = useRef<HTMLParagraphElement>(null)
  const socialLinksRef = useRef<HTMLDivElement>(null)
  const pulseRingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })

    // Pulse rings — expand outward like a signal
    if (pulseRingsRef.current) {
      const rings = pulseRingsRef.current.querySelectorAll('.pulse-ring')
      rings.forEach((ring, i) => {
        gsap.set(ring, { scale: 0.3, opacity: 0 })
        gsap.to(ring, {
          scale: 1.8,
          opacity: 0,
          duration: 3,
          repeat: -1,
          delay: i * 1,
          ease: 'power1.out',
        })
        // Initial appearance
        tl.to(ring, { opacity: 0.15, duration: 0.01 }, 0.3 + i * 0.3)
      })
    }

    // Title — words slide up with stagger
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.contact-word')
      gsap.set(words, { opacity: 0, y: 40, rotateX: -45 })
      tl.to(words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.5)',
      })
    }

    // Card — scales up from center with glow
    if (cardRef.current) {
      gsap.set(cardRef.current, { opacity: 0, scale: 0.9, y: 30 })
      tl.to(
        cardRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )
    }

    // Contact items — each icon + text pair reveals with bounce
    if (contactItemsRef.current) {
      const items = contactItemsRef.current.querySelectorAll('.contact-item')
      gsap.set(items, { opacity: 0, y: 30, scale: 0.8 })
      tl.to(
        items,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(2)',
        },
        '-=0.3'
      )

      // Icon spin-in
      const icons = contactItemsRef.current.querySelectorAll('.contact-icon')
      gsap.set(icons, { rotate: -180, scale: 0 })
      tl.to(
        icons,
        {
          rotate: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(2)',
        },
        '-=0.8'
      )
    }

    // Divider line draws from center
    if (dividerRef.current) {
      gsap.set(dividerRef.current, { scaleX: 0 })
      tl.to(
        dividerRef.current,
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
    }

    // Social label fades in
    if (socialLabelRef.current) {
      gsap.set(socialLabelRef.current, { opacity: 0, y: 10 })
      tl.to(
        socialLabelRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.1'
      )
    }

    // Social links — pop in from bottom with stagger
    if (socialLinksRef.current) {
      const links = socialLinksRef.current.querySelectorAll('.social-link')
      gsap.set(links, { opacity: 0, y: 20, scale: 0.7 })
      tl.to(
        links,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(2.5)',
        },
        '-=0.1'
      )

      // Continuous subtle hover pulse on social links
      links.forEach((link, i) => {
        gsap.to(link, {
          y: -3,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3 + i * 0.2,
        })
      })
    }
  }, [contactData])

  const contactTitle = contactData?.title || 'Get In Touch'
  const titleWords = contactTitle.split(' ')

  // Build contact items
  const contactItems: { key: string; icon: React.ReactNode; label: string; value: React.ReactNode }[] = []

  if (contactData?.email) {
    contactItems.push({
      key: 'email',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: 'Email',
      value: (
        <Link
          href={`mailto:${contactData.email}`}
          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm break-all"
        >
          {contactData.email}
        </Link>
      ),
    })
  }

  if (contactData?.phone) {
    contactItems.push({
      key: 'phone',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Phone',
      value: (
        <Link
          href={`tel:${contactData.phone}`}
          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm"
        >
          {contactData.phone}
        </Link>
      ),
    })
  }

  if (contactData?.location) {
    contactItems.push({
      key: 'location',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: <p className="text-gray-300 text-sm">{contactData.location}</p>,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-linear-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      {/* Animated pulse rings — signal/broadcast motif */}
      <div ref={pulseRingsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pulse-ring absolute w-64 h-64 rounded-full border border-cyan-500/15" />
        <div className="pulse-ring absolute w-64 h-64 rounded-full border border-blue-500/15" />
        <div className="pulse-ring absolute w-64 h-64 rounded-full border border-indigo-500/15" />
      </div>

      {/* Blob background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="mb-12 text-center" style={{ perspective: '600px' }}>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white inline-flex flex-wrap justify-center gap-x-3"
          >
            {titleWords.map((word, i) => (
              <span key={i} className="contact-word inline-block">
                {word}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-slate-400 font-mono text-sm">
            {'// Let\'s connect and build something great'}
          </p>
        </div>

        {/* Main card */}
        <div
          ref={cardRef}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700 shadow-2xl shadow-black/10"
        >
          {/* Contact items with icons */}
          <div
            ref={contactItemsRef}
            className={`grid grid-cols-1 ${
              contactItems.length === 3 ? 'md:grid-cols-3' : contactItems.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'
            } gap-8 mb-10`}
          >
            {contactItems.map((item) => (
              <div key={item.key} className="contact-item text-center group">
                {/* Icon circle */}
                <div className="contact-icon inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-700/50 border border-slate-600/50 text-cyan-400 mb-3 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 group-hover:shadow-lg group-hover:shadow-cyan-500/10 transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-cyan-400 font-semibold text-sm mb-1.5 font-mono uppercase tracking-wider">
                  {item.label}
                </p>
                {item.value}
              </div>
            ))}
          </div>

          {/* Divider */}
          {contactData?.socialLinks && contactData.socialLinks.length > 0 && (
            <>
              <div
                ref={dividerRef}
                className="h-px bg-linear-to-r from-transparent via-slate-600 to-transparent origin-center"
              />

              {/* Social section */}
              <div className="pt-8">
                <p
                  ref={socialLabelRef}
                  className="text-center text-cyan-400 font-semibold mb-6 font-mono text-sm uppercase tracking-wider"
                >
                  Connect With Me
                </p>
                <div ref={socialLinksRef} className="flex justify-center gap-4 flex-wrap">
                  {contactData.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group/social relative px-6 py-2.5 bg-slate-700/50 border border-slate-600/40 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      {/* Hover fill sweep */}
                      <span className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2 text-sm group-hover/social:text-black transition-colors duration-300">
                        {link.platform}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/social:opacity-100 group-hover/social:translate-x-0.5 transition-all duration-300">
                          <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
