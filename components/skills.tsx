'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SkillsData {
  category: string
  name: string
  proficiency: number
  icon?: Record<string, unknown>
}

interface SkillsSectionProps {
  skills: SkillsData[]
}

const categoryIcons: Record<string, string> = {
  frontend: '</>',
  backend: '{ }',
  databases: '⛁',
  tools: '> _',
  design: '◇',
}

const codeSymbols = ['</', '/>', '{ }', '()', '=>', '&&', '||', '::']

export function SkillsSection({ skills }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLCanvasElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const symbolsRef = useRef<HTMLDivElement>(null)

  // Animated dot grid background
  useEffect(() => {
    const canvas = gridRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const dots: { x: number; y: number; baseAlpha: number; alpha: number; pulseSpeed: number; phase: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initDots()
    }

    const initDots = () => {
      dots.length = 0
      const spacing = 40
      const cols = Math.ceil(canvas.offsetWidth / spacing)
      const rows = Math.ceil(canvas.offsetHeight / spacing)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing + spacing / 2,
            y: r * spacing + spacing / 2,
            baseAlpha: 0.08 + Math.random() * 0.06,
            alpha: 0,
            pulseSpeed: 0.5 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    let time = 0
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      dots.forEach((dot) => {
        const pulse = Math.sin(time * dot.pulseSpeed + dot.phase) * 0.5 + 0.5
        dot.alpha = dot.baseAlpha + pulse * 0.1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${dot.alpha})`
        ctx.fill()
      })

      // Occasional pulse wave
      const waveRadius = ((time * 60) % 600)
      const waveCenterX = canvas.offsetWidth / 2
      const waveCenterY = canvas.offsetHeight / 2

      dots.forEach((dot) => {
        const dist = Math.sqrt((dot.x - waveCenterX) ** 2 + (dot.y - waveCenterY) ** 2)
        if (Math.abs(dist - waveRadius) < 30) {
          const intensity = 1 - Math.abs(dist - waveRadius) / 30
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${intensity * 0.4})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Main animations
  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })

    // Title — glitch/scramble effect
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/{}[]'
      const el = titleRef.current

      gsap.set(el, { opacity: 1 })

      // Scramble phase
      let iteration = 0
      const scrambleInterval = { value: 0 }

      tl.call(() => {
        scrambleInterval.value = window.setInterval(() => {
          el.textContent = titleText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration) return titleText[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')

          iteration += 1 / 3
          if (iteration >= titleText.length) {
            clearInterval(scrambleInterval.value)
            el.textContent = titleText
          }
        }, 30)
      })

      // Wait for scramble to finish
      tl.to({}, { duration: 1.2 })
    }

    // Category cards — stagger in from bottom
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.skill-card')
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 })
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.5'
      )

      // Terminal header typing animation
      const termHeaders = cardsContainerRef.current.querySelectorAll('.term-path')
      termHeaders.forEach((header) => {
        const text = header.textContent || ''
        header.textContent = ''
        tl.call(() => {
          let i = 0
          const typeInterval = setInterval(() => {
            header.textContent = text.slice(0, i + 1)
            i++
            if (i >= text.length) clearInterval(typeInterval)
          }, 40)
        }, [], '-=0.6')
      })
    }

    // Skill items — stagger with scan effect
    if (cardsContainerRef.current) {
      const skillItems = cardsContainerRef.current.querySelectorAll('.skill-item')
      gsap.set(skillItems, { opacity: 0, x: -20 })
      tl.to(
        skillItems,
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // Skill bars fill with scanning line
      const skillBars = cardsContainerRef.current.querySelectorAll('.skill-bar-fill')
      const scanLines = cardsContainerRef.current.querySelectorAll('.scan-line')

      skillBars.forEach((bar, i) => {
        const width = bar.getAttribute('data-width') || '0'
        gsap.set(bar, { width: '0%' })
        tl.to(
          bar,
          {
            width: width + '%',
            duration: 1,
            ease: 'power2.out',
          },
          `-=${i === 0 ? 0 : 0.85}`
        )
      })

      // Scan lines sweep across
      scanLines.forEach((line) => {
        gsap.set(line, { left: '0%', opacity: 1 })
        tl.to(
          line,
          {
            left: '100%',
            duration: 1,
            ease: 'power2.out',
            onComplete() { gsap.set(line, { opacity: 0 }) },
          },
          '-=1'
        )
      })

      // Proficiency counters tick up
      const counters = cardsContainerRef.current.querySelectorAll('.skill-percent')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10)
        const obj = { val: 0 }
        tl.to(
          obj,
          {
            val: target,
            duration: 1,
            ease: 'power2.out',
            onUpdate() {
              counter.textContent = Math.round(obj.val) + '%'
            },
            onComplete() {
              counter.textContent = target + '%'
            },
          },
          '-=1'
        )
      })
    }

    // Floating symbols
    if (symbolsRef.current) {
      const syms = symbolsRef.current.querySelectorAll('.code-symbol')
      gsap.set(syms, { opacity: 0, scale: 0 })
      tl.to(
        syms,
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
        1.0
      )

      // Continuous float
      syms.forEach((sym, i) => {
        gsap.to(sym, {
          y: `random(-20, 20)`,
          x: `random(-10, 10)`,
          rotate: `random(-15, 15)`,
          duration: 4 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2 + i * 0.3,
        })
      })
    }
  }, [skills])

  const groupedSkills = skills.reduce<Record<string, SkillsData[]>>((acc, skill) => {
    const category = skill.category
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-linear-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Animated dot grid canvas */}
      <canvas
        ref={gridRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Floating code symbols */}
      <div ref={symbolsRef} className="absolute inset-0 pointer-events-none">
        {codeSymbols.map((sym, i) => {
          const positions = [
            'top-16 left-[8%]', 'top-24 right-[12%]', 'top-1/3 left-[5%]',
            'top-1/2 right-[8%]', 'bottom-1/3 left-[10%]', 'bottom-24 right-[6%]',
            'bottom-16 left-[15%]', 'top-1/4 right-[15%]',
          ]
          return (
            <span
              key={i}
              className={`code-symbol absolute ${positions[i]} text-cyan-500/15 font-mono text-2xl md:text-3xl font-bold select-none`}
            >
              {sym}
            </span>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title with glitch effect */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white font-mono opacity-0"
          >
            Skills & Expertise
          </h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500/50" />
            <span className="text-cyan-400 font-mono text-sm">&lt;/&gt;</span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500/50" />
          </div>
        </div>

        {/* Category cards */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const icon = categoryIcons[category] || '●'
            return (
              <div
                key={category}
                className="skill-card bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 overflow-hidden hover:border-cyan-500/40 transition-all duration-300 group"
              >
                {/* Terminal header bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border-b border-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  <span className="term-path ml-2 text-xs text-slate-400 font-mono">
                    ~/{category}/skills
                  </span>
                </div>

                {/* Category label */}
                <div className="px-6 pt-5 pb-2 flex items-center gap-3">
                  <span className="text-xl font-mono text-cyan-400 opacity-60">{icon}</span>
                  <h3 className="text-xl font-bold text-cyan-400 capitalize font-mono">{category}</h3>
                </div>

                {/* Skill items */}
                <div className="px-6 pb-6 space-y-4">
                  {categorySkills.map((skill: SkillsData) => {
                    return (
                      <div
                        key={skill.name}
                        className="skill-item"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                            {skill.icon && urlFor(skill.icon).url() && (
                              <Image
                                src={urlFor(skill.icon).url()}
                                alt={skill.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                            )}
                            <span className="text-white font-medium text-sm">{skill.name}</span>
                          </div>
                          <span
                            className="skill-percent text-cyan-400 font-mono text-sm font-semibold"
                            data-target={skill.proficiency}
                          >
                            0%
                          </span>
                        </div>

                        {/* Skill bar with scan line */}
                        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="skill-bar-fill h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                            data-width={skill.proficiency}
                            style={{ width: '0%' }}
                          />
                          {/* Scanning line */}
                          <div className="scan-line absolute top-0 w-px h-full bg-white/60 opacity-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom glow on hover */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/40 transition-all duration-500" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
