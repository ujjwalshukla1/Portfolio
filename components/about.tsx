'use client'

import React, { useRef, useEffect } from 'react'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from './theme-provider'

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

export function AboutSection({ title, intro, bio, image }: AboutSectionProps) {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const imageFrameRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const borderRingRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const accentLine1Ref = useRef<HTMLDivElement>(null)
  const accentLine2Ref = useRef<HTMLDivElement>(null)
  const tagContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 20%',
      },
    })

    // Title — letters slide up with 3D flip
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.about-char')
      gsap.set(chars, { opacity: 0, y: 60, rotateX: -90 })
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'back.out(1.5)',
      })
    }

    // Intro — lines draw in from the left like a code editor
    if (introRef.current) {
      const lines = introRef.current.querySelectorAll('.intro-line')
      gsap.set(lines, { opacity: 0, x: -40, clipPath: 'inset(0 100% 0 0)' })
      tl.to(
        lines,
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.3'
      )
    }

    // Bio content fade in
    if (bioRef.current) {
      gsap.set(bioRef.current, { opacity: 0, y: 30 })
      tl.to(
        bioRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
    }

    // === Portrait image animations ===

    // Spotlight glow — fades in and breathes
    if (glowRef.current) {
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 })
      tl.to(
        glowRef.current,
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0.2
      )
      // Continuous breathing glow
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })
    }

    // Animated gradient border — spins in, then rotates continuously
    if (borderRingRef.current) {
      gsap.set(borderRingRef.current, { opacity: 0, rotate: -90, scale: 0.7 })
      tl.to(
        borderRingRef.current,
        { opacity: 1, rotate: 0, scale: 1, duration: 1, ease: 'power3.out' },
        0.4
      )
      // Slow continuous rotation for the gradient border
      gsap.to(borderRingRef.current, {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
        delay: 2,
      })
    }

    // Image — gentle reveal with soft scale
    if (imageFrameRef.current) {
      gsap.set(imageFrameRef.current, { opacity: 0, scale: 1.15, filter: 'blur(10px)' })
      tl.to(
        imageFrameRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
        },
        0.5
      )
      // Subtle gentle breathing — very slow, portrait-friendly
      gsap.to(imageFrameRef.current, {
        scale: 1.03,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })
    }

    // Accent lines — draw in from edges
    if (accentLine1Ref.current) {
      gsap.set(accentLine1Ref.current, { scaleX: 0, transformOrigin: 'left center' })
      tl.to(
        accentLine1Ref.current,
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0.8
      )
    }
    if (accentLine2Ref.current) {
      gsap.set(accentLine2Ref.current, { scaleY: 0, transformOrigin: 'center top' })
      tl.to(
        accentLine2Ref.current,
        { scaleY: 1, duration: 0.8, ease: 'power3.out' },
        0.9
      )
    }

    // Floating particles — fade in and drift
    if (particlesRef.current) {
      const dots = particlesRef.current.querySelectorAll('.about-particle')
      gsap.set(dots, { opacity: 0, scale: 0 })
      tl.to(
        dots,
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' },
        1.0
      )
      // Each particle floats on its own path
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          y: `random(-15, 15)`,
          x: `random(-10, 10)`,
          duration: 3 + i * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2 + i * 0.2,
        })
      })
    }

    // Skill tags — slide up with stagger
    if (tagContainerRef.current) {
      const tags = tagContainerRef.current.querySelectorAll('.about-tag')
      gsap.set(tags, { opacity: 0, y: 20, scale: 0.8 })
      tl.to(
        tags,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.5)',
        },
        1.2
      )
    }
  }, [title, intro, bio])

  // Split intro into lines for animation
  const introLines = intro
    ? intro.match(/.{1,60}(\s|$)/g)?.map((s) => s.trim()) || [intro]
    : []

  const skillTags = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Full-Stack']

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-linear-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="mb-16 text-center overflow-hidden">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white inline-flex flex-wrap justify-center gap-x-3"
            style={{ perspective: '600px' }}
          >
            {title.split('').map((char, i) => (
              <span
                key={i}
                className="about-char inline-block"
                style={{ display: char === ' ' ? 'inline' : undefined }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div className="order-2 md:order-1">
            {introLines.length > 0 && (
              <div ref={introRef} className="mb-8 space-y-2">
                {introLines.map((line, i) => (
                  <div key={i} className="intro-line flex items-start gap-3">
                    <span className="text-slate-500 font-mono text-sm select-none shrink-0 mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-lg text-gray-300 leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            )}

            {bio && (
              <div ref={bioRef} className="prose prose-invert max-w-none prose-p:text-gray-300 prose-p:leading-relaxed">
                <PortableText value={bio} />
              </div>
            )}
          </div>

          {/* Portrait image side */}
          <div className="order-1 md:order-2 flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center w-72 h-80 md:w-80 md:h-96">

              {/* Soft spotlight glow behind portrait */}
              <div
                ref={glowRef}
                className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full opacity-0"
                style={{
                  background: theme === 'light'
                    ? 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(8,145,178,0.08) 40%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.15) 40%, transparent 70%)',
                }}
              />

              {/* Animated gradient border ring */}
              <div
                ref={borderRingRef}
                className="absolute w-64 h-72 md:w-72 md:h-80 rounded-4xl p-0.5 opacity-0"
                style={{
                  background: theme === 'light'
                    ? 'conic-gradient(from 0deg, #0891b2, #4f46e5, #7c3aed, #0891b2)'
                    : 'conic-gradient(from 0deg, #06b6d4, #6366f1, #8b5cf6, #06b6d4)',
                }}
              >
                <div className="w-full h-full rounded-4xl bg-slate-950" />
              </div>

              {/* The portrait image — tall rounded rectangle, portrait-friendly */}
              {image && (
                <div
                  ref={imageFrameRef}
                  className="relative w-60 h-68 md:w-68 md:h-76 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 opacity-0"
                >
                  <Image
                    src={urlFor(image).url()}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle warm vignette for portrait depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] rounded-3xl" />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-950/60 to-transparent" />
                </div>
              )}

              {/* Decorative accent lines */}
              <div
                ref={accentLine1Ref}
                className="absolute -left-6 top-1/2 w-12 h-0.5 bg-linear-to-r from-cyan-400/60 to-transparent"
              />
              <div
                ref={accentLine2Ref}
                className="absolute -right-6 top-8 w-0.5 h-12 bg-linear-to-b from-indigo-400/60 to-transparent"
              />

              {/* Floating particles — small glowing dots around the portrait */}
              <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                <span className="about-particle absolute top-2 right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/80" />
                <span className="about-particle absolute top-12 -left-3 w-2 h-2 bg-indigo-400 rounded-full shadow-sm shadow-indigo-400/80" />
                <span className="about-particle absolute bottom-16 -right-2 w-1 h-1 bg-violet-400 rounded-full shadow-sm shadow-violet-400/80" />
                <span className="about-particle absolute bottom-8 left-2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-sm shadow-blue-400/80" />
                <span className="about-particle absolute top-1/2 -right-4 w-1 h-1 bg-cyan-300 rounded-full shadow-sm shadow-cyan-300/80" />
                <span className="about-particle absolute top-1/3 -left-5 w-1 h-1 bg-indigo-300 rounded-full shadow-sm shadow-indigo-300/80" />
              </div>
            </div>

            {/* Skill tags beneath the portrait */}
            <div ref={tagContainerRef} className="flex flex-wrap justify-center gap-2 max-w-xs">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="about-tag px-3 py-1 bg-slate-800/70 border border-slate-600/40 rounded-full text-xs font-mono text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
