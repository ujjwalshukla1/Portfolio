'use client'

import React, { useRef, useEffect } from 'react'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AboutSectionProps {
  title: string
  intro?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any
  image?: Record<string, unknown>
}

const highlights = [
  { icon: '⚡', label: 'Fast Learner', desc: 'Quick to adapt new tech' },
  { icon: '🎯', label: 'Problem Solver', desc: 'Clean & scalable solutions' },
  { icon: '🔗', label: 'Full Stack', desc: 'Frontend to deployment' },
  { icon: '🤝', label: 'Team Player', desc: 'Async & collaborative' },
]

export function AboutSection({ title, intro, bio, image }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<SVGSVGElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    })

    // Title scramble
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || ''
      const glyphChars = '░▒▓█▄▀■□▪▫●○◆◇'
      const el = titleRef.current
      gsap.set(el, { opacity: 1 })

      let iteration = 0
      tl.call(() => {
        const interval = window.setInterval(() => {
          el.textContent = titleText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return titleText[index]
              return glyphChars[Math.floor(Math.random() * glyphChars.length)]
            })
            .join('')
          iteration += 1 / 2
          if (iteration >= titleText.length) {
            clearInterval(interval)
            el.textContent = titleText
          }
        }, 40)
      })
      tl.to({}, { duration: 0.8 })
    }

    // Image — scale up from small with blur
    if (imageWrapRef.current) {
      gsap.set(imageWrapRef.current, { scale: 0.6, opacity: 0, filter: 'blur(20px)' })
      tl.to(imageWrapRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4')
    }

    // Orbit ring
    if (orbitRef.current) {
      gsap.set(orbitRef.current, { opacity: 0, scale: 0.8, rotate: -180 })
      tl.to(orbitRef.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.8')

      // Continuous slow rotation
      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        delay: 2,
      })
    }

    // Badge
    if (badgeRef.current) {
      gsap.set(badgeRef.current, { opacity: 0, y: 20, scale: 0.8 })
      tl.to(badgeRef.current, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)',
      }, '-=0.5')
    }

    // Highlights cards
    if (highlightsRef.current) {
      const cards = highlightsRef.current.querySelectorAll('.highlight-card')
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.9 })
      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.3')
    }

    // Intro
    if (introRef.current) {
      gsap.set(introRef.current, { opacity: 0, y: 30 })
      tl.to(introRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      }, '-=0.4')
    }

    // Bio
    if (bioRef.current) {
      gsap.set(bioRef.current, { opacity: 0, y: 20 })
      tl.to(bioRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
    }
  }, [title, intro, bio])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 bg-linear-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner gradient blurs */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/6 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="mb-20 text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white font-mono opacity-0"
          >
            {title}
          </h2>
          <div className="mt-4 flex justify-center items-center gap-3">
            <span className="h-px w-16 bg-linear-to-r from-transparent to-indigo-500/50" />
            <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase">who I am</span>
            <span className="h-px w-16 bg-linear-to-l from-transparent to-indigo-500/50" />
          </div>
        </div>

        {/* Hero area — centered image with orbit */}
        <div className="flex flex-col items-center mb-20">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Animated orbit ring */}
            <svg
              ref={orbitRef}
              className="absolute -inset-6 md:-inset-8 w-[calc(100%+48px)] h-[calc(100%+48px)] md:w-[calc(100%+64px)] md:h-[calc(100%+64px)]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <defs>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0" />
                  <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="96" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="6 4" />
              {/* Orbiting dots */}
              <circle cx="100" cy="4" r="3" fill="#6366f1" opacity="0.8" />
              <circle cx="196" cy="100" r="2.5" fill="#06b6d4" opacity="0.6" />
              <circle cx="100" cy="196" r="2" fill="#8b5cf6" opacity="0.5" />
            </svg>

            {/* Image */}
            {image && (
              <div
                ref={imageWrapRef}
                className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl shadow-indigo-500/10 opacity-0"
              >
                <Image
                  src={urlFor(image).url()}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />

                {/* Scan line */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="about-scanline absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent" />
                </div>
              </div>
            )}

            {/* Available badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-full shadow-lg opacity-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-mono text-green-400 whitespace-nowrap">Open to work</span>
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div ref={highlightsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="highlight-card group bg-slate-800/30 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-5 text-center hover:border-indigo-500/40 hover:bg-slate-800/50 transition-all duration-300 cursor-default"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{h.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{h.label}</div>
              <div className="text-xs text-slate-400">{h.desc}</div>
            </div>
          ))}
        </div>

        {/* Text content — centered, clean */}
        <div className="max-w-3xl mx-auto space-y-6">
          {intro && (
            <div ref={introRef} className="opacity-0">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                {intro}
              </p>
            </div>
          )}

          {bio && (
            <div
              ref={bioRef}
              className="prose prose-invert max-w-none prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-center opacity-0"
            >
              <PortableText value={bio} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .about-scanline {
          animation: aboutScan 3.5s ease-in-out infinite;
        }
        @keyframes aboutScan {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
