'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import gsap from 'gsap'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  ctaText?: string
  image?: Record<string, unknown>
}

export function HeroSection({ title, subtitle, description, ctaText = 'View My Work', image }: HeroSectionProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const ctaGlowRef = useRef<HTMLSpanElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const widget1Ref = useRef<HTMLDivElement>(null)
  const widget2Ref = useRef<HTMLDivElement>(null)
  const widget3Ref = useRef<HTMLDivElement>(null)
  const widget4Ref = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const titleWords = useMemo(() => title.split(' '), [title])

  useEffect(() => {
    const tl = gsap.timeline()

    // Title words — each word flies in from a different direction with rotation
    if (titleRef.current) {
      const wordEls = titleRef.current.querySelectorAll('.hero-word')
      gsap.set(wordEls, { opacity: 0 })

      wordEls.forEach((word, i) => {
        const directions = [
          { x: -80, y: 40, rotate: -15 },
          { x: 60, y: -30, rotate: 10 },
          { x: -40, y: -50, rotate: -8 },
          { x: 80, y: 20, rotate: 12 },
          { x: 0, y: 60, rotate: -5 },
        ]
        const dir = directions[i % directions.length]

        tl.fromTo(
          word,
          { opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: 0.5 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          i * 0.12
        )
      })

      // After all words land, add a subtle bounce
      tl.to(wordEls, {
        y: -4,
        duration: 0.15,
        ease: 'power2.out',
        stagger: 0.03,
      })
        .to(wordEls, {
          y: 0,
          duration: 0.2,
          ease: 'bounce.out',
          stagger: 0.03,
        })
    }

    // Subtitle — typewriter effect with cursor following typed text
    if (subtitleRef.current) {
      const charEls = subtitleRef.current.querySelectorAll('.subtitle-char')
      const textWrapper = subtitleRef.current.querySelector('.subtitle-text-wrapper')
      gsap.set(subtitleRef.current, { opacity: 1 })
      gsap.set(charEls, { opacity: 0 })

      // Blinking cursor
      const cursorBlink = cursorRef.current
        ? gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'steps(1)',
          })
        : null

      // Reveal each character and move cursor after it
      charEls.forEach((char, i) => {
        tl.call(
          () => {
            // Reveal the character
            gsap.set(char, { opacity: 1 })
            // Move cursor right after this character
            if (cursorRef.current && textWrapper) {
              char.after(cursorRef.current)
            }
          },
          [],
          `>+${i === 0 ? 0.2 : 0.04 + Math.random() * 0.04}`
        )
      })

      // After typing done, stop blinking and fade cursor out
      tl.call(() => {
        if (cursorBlink) cursorBlink.kill()
        if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 1 })
      })
      tl.to(cursorRef.current, { opacity: 0, duration: 0.5, delay: 1.2 })
    }

    // Description — words reveal with a wave effect
    if (descriptionRef.current && description) {
      const words = descriptionRef.current.querySelectorAll('.desc-word')
      tl.fromTo(
        words,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.out',
        },
        '-=0.8'
      )
    }

    // CTA button — scale in with glow burst
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)' },
        '-=0.3'
      )

      if (ctaGlowRef.current) {
        tl.fromTo(
          ctaGlowRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1.5, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        ).to(ctaGlowRef.current, { opacity: 0, scale: 2, duration: 0.6, ease: 'power2.out' })
      }

      // Continuous subtle glow pulse on CTA
      gsap.to(ctaRef.current, {
        boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: tl.duration(),
      })
    }

    // Image container animation
    if (imageContainerRef.current) {
      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.8, rotate: -5 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)' },
        1.0
      )
    }

    // Widgets staggered entrance
    const widgets = [widget1Ref.current, widget2Ref.current, widget3Ref.current, widget4Ref.current].filter(Boolean)
    if (widgets.length > 0) {
      tl.fromTo(
        widgets,
        { opacity: 0, scale: 0, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(2)' },
        '-=0.5'
      )
    }

    // Ring rotation
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }

    // Floating animations for widgets
    widgets.forEach((widget, i) => {
      if (widget) {
        gsap.to(widget, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        })
      }
    })

    // Subtle pulse on the image container
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: 1.02,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    // Continuous hover-like float on title words
    if (titleRef.current) {
      const wordEls = titleRef.current.querySelectorAll('.hero-word')
      wordEls.forEach((word, i) => {
        gsap.to(word, {
          y: -3,
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: tl.duration() + i * 0.15,
        })
      })
    }
  }, [subtitle, description, titleWords])

  return (
    <section className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Title — each word animated independently */}
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight flex flex-wrap gap-x-4"
            >
              {titleWords.map((word, i) => (
                <span key={i} className="hero-word inline-block">
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle — typewriter effect */}
            <div
              ref={subtitleRef}
              className="text-2xl md:text-4xl font-semibold mb-6 opacity-0"
            >
              <span className="subtitle-text-wrapper bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                <span
                  ref={cursorRef}
                  className="inline-block w-0.75 h-[1.2em] bg-cyan-400 align-middle translate-y-0.5"
                  style={{ WebkitTextFillColor: 'initial' }}
                />
                {subtitle.split('').map((char, i) => (
                  <span key={i} className="subtitle-char opacity-0">
                    {char}
                  </span>
                ))}
              </span>
            </div>

            {/* Description — word-by-word blur reveal */}
            <div className="space-y-6">
              {description && (
                <p ref={descriptionRef} className="text-gray-300 text-lg leading-relaxed">
                  {description.split(' ').map((word, i) => (
                    <span key={i} className="desc-word inline-block mr-[0.3em] opacity-0">
                      {word}
                    </span>
                  ))}
                </p>
              )}

              {/* CTA — glow burst entrance */}
              <div className="relative inline-block">
                <span
                  ref={ctaGlowRef}
                  className="absolute inset-0 bg-cyan-400/30 rounded-lg blur-xl opacity-0 pointer-events-none"
                />
                <button
                  ref={ctaRef}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 opacity-0"
                >
                  {ctaText}
                </button>
              </div>
            </div>
          </div>

          {image && (
            <div className="relative flex items-center justify-center h-112 md:h-128">
              {/* Rotating dashed ring */}
              <div
                ref={ringRef}
                className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-dashed border-cyan-500/30"
              />

              {/* Glowing backdrop */}
              <div className="absolute w-64 h-64 md:w-72 md:h-72 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />

              {/* Image with unique organic blob shape */}
              <div
                ref={imageContainerRef}
                className="relative w-64 h-64 md:w-72 md:h-72"
                style={{
                  clipPath: 'polygon(50% 0%, 85% 10%, 100% 40%, 95% 75%, 70% 100%, 30% 100%, 5% 75%, 0% 40%, 15% 10%)',
                }}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-blue-900/30 to-transparent"
                  style={{
                    clipPath: 'polygon(50% 0%, 85% 10%, 100% 40%, 95% 75%, 70% 100%, 30% 100%, 5% 75%, 0% 40%, 15% 10%)',
                  }}
                />
              </div>

              {/* Border ring matching the shape */}
              <div
                className="absolute w-68 h-68 md:w-76 md:h-76 border-2 border-cyan-400/40"
                style={{
                  clipPath: 'polygon(50% 0%, 85% 10%, 100% 40%, 95% 75%, 70% 100%, 30% 100%, 5% 75%, 0% 40%, 15% 10%)',
                }}
              />

              {/* Widget 1: Code snippet - top right */}
              <div
                ref={widget1Ref}
                className="absolute -top-2 right-2 md:top-0 md:right-0 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-lg px-3 py-2 shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  <span className="text-[10px] text-slate-400 ml-1 font-mono">index.tsx</span>
                </div>
                <pre className="text-[10px] font-mono leading-relaxed">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-300">dev</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-green-400">{`{`}</span>{'\n'}
                  {'  '}<span className="text-blue-300">passion</span>
                  <span className="text-white">:</span>{' '}
                  <span className="text-amber-300">&quot;∞&quot;</span>{'\n'}
                  <span className="text-green-400">{`}`}</span>
                </pre>
              </div>

              {/* Widget 2: Status badge - top left */}
              <div
                ref={widget2Ref}
                className="absolute top-4 -left-4 md:top-6 md:-left-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-lg px-3 py-2 shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[11px] text-green-400 font-mono font-medium">Available for work</span>
                </div>
              </div>

              {/* Widget 3: Tech stack - bottom right */}
              <div
                ref={widget3Ref}
                className="absolute bottom-4 -right-4 md:bottom-6 md:-right-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-lg px-3 py-2 shadow-lg shadow-black/20"
              >
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-1">Tech Stack</p>
                <div className="flex gap-1.5">
                  {['React', 'Next', 'TS', 'Node'].map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-[10px] text-cyan-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Widget 4: Experience/commits counter - bottom left */}
              <div
                ref={widget4Ref}
                className="absolute bottom-2 -left-4 md:bottom-4 md:-left-2 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 rounded-lg px-3 py-2 shadow-lg shadow-black/20"
              >
                <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider mb-0.5">Commits</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-white font-mono">2.4k</span>
                  <span className="text-[10px] text-green-400 font-mono">+12%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
