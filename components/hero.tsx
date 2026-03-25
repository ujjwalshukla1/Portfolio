'use client'

import React, { useRef, useEffect, useMemo } from 'react'
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

          <div className="relative flex items-center justify-center h-112 md:h-128">
              {/* Rotating dashed ring */}
              <div
                ref={ringRef}
                className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-dashed border-cyan-500/30"
              />

              {/* Glowing backdrop */}
              <div className="absolute w-64 h-64 md:w-72 md:h-72 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />

              {/* Developer workspace illustration */}
              <div ref={imageContainerRef} className="relative w-72 h-72 md:w-80 md:h-80">
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                  {/* Monitor */}
                  <rect x="60" y="60" width="280" height="200" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <rect x="60" y="60" width="280" height="24" rx="12" fill="#1e293b" />
                  {/* Traffic lights */}
                  <circle cx="80" cy="72" r="5" fill="#f87171" />
                  <circle cx="96" cy="72" r="5" fill="#fbbf24" />
                  <circle cx="112" cy="72" r="5" fill="#4ade80" />
                  {/* Tab */}
                  <rect x="130" y="66" width="60" height="12" rx="3" fill="#334155" />
                  <text x="140" y="75" fontSize="7" fill="#94a3b8" fontFamily="monospace">App.tsx</text>

                  {/* Code lines */}
                  <text x="76" y="104" fontSize="8" fill="#64748b" fontFamily="monospace">1</text>
                  <text x="90" y="104" fontSize="8" fill="#c084fc" fontFamily="monospace">import</text>
                  <text x="126" y="104" fontSize="8" fill="#e2e8f0" fontFamily="monospace">React</text>
                  <text x="158" y="104" fontSize="8" fill="#c084fc" fontFamily="monospace">from</text>
                  <text x="180" y="104" fontSize="8" fill="#fbbf24" fontFamily="monospace">{`'react'`}</text>

                  <text x="76" y="118" fontSize="8" fill="#64748b" fontFamily="monospace">2</text>
                  <text x="90" y="118" fontSize="8" fill="#c084fc" fontFamily="monospace">import</text>
                  <text x="126" y="118" fontSize="8" fill="#22d3ee" fontFamily="monospace">{'{ motion }'}</text>
                  <text x="194" y="118" fontSize="8" fill="#c084fc" fontFamily="monospace">from</text>
                  <text x="216" y="118" fontSize="8" fill="#fbbf24" fontFamily="monospace">{`'framer'`}</text>

                  <text x="76" y="136" fontSize="8" fill="#64748b" fontFamily="monospace">3</text>

                  <text x="76" y="150" fontSize="8" fill="#64748b" fontFamily="monospace">4</text>
                  <text x="90" y="150" fontSize="8" fill="#c084fc" fontFamily="monospace">export</text>
                  <text x="122" y="150" fontSize="8" fill="#c084fc" fontFamily="monospace">const</text>
                  <text x="150" y="150" fontSize="8" fill="#60a5fa" fontFamily="monospace">App</text>
                  <text x="168" y="150" fontSize="8" fill="#e2e8f0" fontFamily="monospace">= () =&gt; {'{'}</text>

                  <text x="76" y="164" fontSize="8" fill="#64748b" fontFamily="monospace">5</text>
                  <text x="100" y="164" fontSize="8" fill="#c084fc" fontFamily="monospace">return</text>
                  <text x="134" y="164" fontSize="8" fill="#e2e8f0" fontFamily="monospace">(</text>

                  <text x="76" y="178" fontSize="8" fill="#64748b" fontFamily="monospace">6</text>
                  <text x="110" y="178" fontSize="8" fill="#4ade80" fontFamily="monospace">&lt;div</text>
                  <text x="138" y="178" fontSize="8" fill="#60a5fa" fontFamily="monospace">className</text>
                  <text x="186" y="178" fontSize="8" fill="#e2e8f0" fontFamily="monospace">=</text>
                  <text x="192" y="178" fontSize="8" fill="#fbbf24" fontFamily="monospace">{`"app"`}</text>
                  <text x="218" y="178" fontSize="8" fill="#4ade80" fontFamily="monospace">&gt;</text>

                  <text x="76" y="192" fontSize="8" fill="#64748b" fontFamily="monospace">7</text>
                  <text x="120" y="192" fontSize="8" fill="#4ade80" fontFamily="monospace">&lt;h1&gt;</text>
                  <text x="144" y="192" fontSize="8" fill="#e2e8f0" fontFamily="monospace">Hello World</text>
                  <text x="210" y="192" fontSize="8" fill="#4ade80" fontFamily="monospace">&lt;/h1&gt;</text>

                  <text x="76" y="206" fontSize="8" fill="#64748b" fontFamily="monospace">8</text>
                  <text x="120" y="206" fontSize="8" fill="#22d3ee" fontFamily="monospace">&lt;Portfolio</text>
                  <text x="186" y="206" fontSize="8" fill="#22d3ee" fontFamily="monospace">/&gt;</text>

                  <text x="76" y="220" fontSize="8" fill="#64748b" fontFamily="monospace">9</text>
                  <text x="110" y="220" fontSize="8" fill="#4ade80" fontFamily="monospace">&lt;/div&gt;</text>

                  <text x="76" y="234" fontSize="8" fill="#64748b" fontFamily="monospace">10</text>
                  <text x="100" y="234" fontSize="8" fill="#e2e8f0" fontFamily="monospace">)</text>

                  <text x="76" y="248" fontSize="8" fill="#64748b" fontFamily="monospace">11</text>
                  <text x="90" y="248" fontSize="8" fill="#e2e8f0" fontFamily="monospace">{'}'}</text>

                  {/* Cursor blink line */}
                  <rect x="200" y="198" width="1.5" height="12" fill="#22d3ee" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
                  </rect>

                  {/* Monitor stand */}
                  <rect x="170" y="260" width="60" height="10" rx="2" fill="#1e293b" />
                  <rect x="150" y="270" width="100" height="6" rx="3" fill="#334155" />

                  {/* Floating elements around the monitor */}
                  {/* React logo */}
                  <g transform="translate(20, 100)">
                    <circle cx="16" cy="16" r="18" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                    <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.7" transform="rotate(0, 16, 16)" />
                    <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.7" transform="rotate(60, 16, 16)" />
                    <ellipse cx="16" cy="16" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.7" transform="rotate(120, 16, 16)" />
                    <circle cx="16" cy="16" r="2.5" fill="#22d3ee" />
                  </g>

                  {/* TypeScript badge */}
                  <g transform="translate(350, 130)">
                    <rect width="32" height="32" rx="6" fill="#3178c6" opacity="0.8" />
                    <text x="7" y="23" fontSize="16" fill="white" fontFamily="monospace" fontWeight="bold">TS</text>
                  </g>

                  {/* Git branch */}
                  <g transform="translate(20, 210)">
                    <circle cx="12" cy="8" r="8" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.5" />
                    <circle cx="12" cy="8" r="3" fill="#f97316" opacity="0.6" />
                    <line x1="12" y1="16" x2="12" y2="28" stroke="#f97316" strokeWidth="1" opacity="0.4" />
                    <circle cx="12" cy="32" r="3" fill="#f97316" opacity="0.6" />
                  </g>

                  {/* Terminal icon */}
                  <g transform="translate(350, 220)">
                    <rect width="30" height="24" rx="4" fill="#0f172a" stroke="#4ade80" strokeWidth="1" opacity="0.6" />
                    <text x="5" y="17" fontSize="10" fill="#4ade80" fontFamily="monospace" opacity="0.8">&gt;_</text>
                  </g>

                  {/* Floating brackets */}
                  <text x="30" y="55" fontSize="24" fill="#6366f1" fontFamily="monospace" opacity="0.2">{'{'}</text>
                  <text x="360" y="80" fontSize="24" fill="#6366f1" fontFamily="monospace" opacity="0.2">{'}'}</text>
                  <text x="10" y="310" fontSize="18" fill="#22d3ee" fontFamily="monospace" opacity="0.15">&lt;/&gt;</text>
                  <text x="355" y="310" fontSize="18" fill="#22d3ee" fontFamily="monospace" opacity="0.15">=&gt;</text>

                  {/* Connection lines */}
                  <line x1="38" y1="116" x2="60" y2="130" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                  <line x1="362" y1="146" x2="340" y2="170" stroke="#3178c6" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                  <line x1="32" y1="240" x2="60" y2="230" stroke="#f97316" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
                  <line x1="352" y1="232" x2="340" y2="220" stroke="#4ade80" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />

                  {/* Glow effect behind monitor */}
                  <defs>
                    <radialGradient id="monitorGlow" cx="50%" cy="45%" r="50%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect x="40" y="40" width="320" height="240" rx="20" fill="url(#monitorGlow)" />
                </svg>
              </div>

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
        </div>
      </div>
    </section>
  )
}
