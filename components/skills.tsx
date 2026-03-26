'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
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

const categoryOrder = ['all', 'frontend', 'backend', 'databases', 'tools', 'other']

const categoryMeta: Record<string, { icon: string; label: string }> = {
  all: { icon: '✦', label: 'All' },
  frontend: { icon: '</>', label: 'Frontend' },
  backend: { icon: '{ }', label: 'Backend' },
  databases: { icon: '⛁', label: 'Databases' },
  tools: { icon: '> _', label: 'Tools' },
  other: { icon: '●', label: 'Other' },
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [hasAnimated, setHasAnimated] = useState(false)

  // Get available categories from the skills data
  const availableCategories = categoryOrder.filter(
    (cat) => cat === 'all' || skills.some((s) => s.category === cat)
  )

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  // Hex grid background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const hexes: { x: number; y: number; phase: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initHexes()
    }

    const initHexes = () => {
      hexes.length = 0
      const size = 30
      const h = size * Math.sqrt(3)
      const cols = Math.ceil(canvas.offsetWidth / (size * 1.5)) + 1
      const rows = Math.ceil(canvas.offsetHeight / h) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * size * 1.5
          const y = r * h + (c % 2 === 1 ? h / 2 : 0)
          hexes.push({ x, y, phase: Math.random() * Math.PI * 2 })
        }
      }
    }

    const drawHex = (x: number, y: number, size: number, alpha: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      hexes.forEach((hex) => {
        const pulse = Math.sin(time * 1.5 + hex.phase) * 0.5 + 0.5
        const alpha = 0.02 + pulse * 0.04
        drawHex(hex.x, hex.y, 14, alpha)
      })

      // Sweep highlight
      const sweepX = ((time * 80) % (canvas.offsetWidth + 400)) - 200
      hexes.forEach((hex) => {
        const dist = Math.abs(hex.x - sweepX)
        if (dist < 100) {
          const intensity = 1 - dist / 100
          drawHex(hex.x, hex.y, 14, intensity * 0.15)
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

  // Entry animations
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    // Title scramble
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/{}[]'
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
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
          iteration += 1 / 3
          if (iteration >= titleText.length) {
            clearInterval(interval)
            el.textContent = titleText
          }
        }, 30)
      })
      tl.to({}, { duration: 1 })
    }

    // Tabs slide in
    if (tabsRef.current) {
      const tabs = tabsRef.current.querySelectorAll('.skill-tab')
      gsap.set(tabs, { opacity: 0, y: 20 })
      tl.to(tabs, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      }, '-=0.5')
    }

    // Skills grid
    tl.call(() => setHasAnimated(true))
  }, [hasAnimated])

  // Animate skill tiles on filter change
  const animateGrid = useCallback(() => {
    if (!gridRef.current) return
    const tiles = gridRef.current.querySelectorAll('.skill-tile')
    gsap.fromTo(tiles,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'back.out(1.5)' }
    )
  }, [])

  useEffect(() => {
    if (hasAnimated) animateGrid()
  }, [activeCategory, hasAnimated, animateGrid])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-linear-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Hex grid background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="mb-12 text-center">
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

        {/* Category tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {availableCategories.map((cat) => {
            const meta = categoryMeta[cat] || categoryMeta.other
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`skill-tab relative px-5 py-2.5 rounded-xl font-mono text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="mr-2 opacity-60">{meta.icon}</span>
                {meta.label}
                {isActive && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* Skills count */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono text-slate-500">
            <span className="text-cyan-400/70">{filteredSkills.length}</span> technologies loaded
          </span>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} />
          ))}
        </div>

        {/* Bottom terminal line */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-600">
            <span className="text-cyan-500/40">$</span> skills --list --sort proficiency
            <span className="inline-block w-1.5 h-4 bg-cyan-400/60 ml-1 animate-pulse align-middle" />
          </p>
        </div>
      </div>
    </section>
  )
}

function SkillTile({ skill }: { skill: SkillsData }) {
  const [hovered, setHovered] = useState(false)
  const ringRef = useRef<SVGCircleElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!hovered || !ringRef.current || !percentRef.current) return

    const circumference = 2 * Math.PI * 28
    const target = skill.proficiency
    const offset = circumference - (circumference * target) / 100

    gsap.fromTo(
      ringRef.current,
      { strokeDashoffset: circumference },
      { strokeDashoffset: offset, duration: 0.8, ease: 'power2.out' }
    )

    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate() {
        if (percentRef.current) percentRef.current.textContent = Math.round(obj.val) + '%'
      },
    })
  }, [hovered, skill.proficiency])

  const circumference = 2 * Math.PI * 28

  return (
    <div
      className="skill-tile group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-800/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] cursor-default h-full">
        {/* Proficiency ring (shown on hover) */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* SVG ring */}
          <svg
            className={`absolute inset-0 w-full h-full -rotate-90 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            viewBox="0 0 64 64"
          >
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="rgba(51,65,85,0.5)"
              strokeWidth="3"
            />
            <circle
              ref={ringRef}
              cx="32" cy="32" r="28"
              fill="none"
              stroke="url(#skillGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
            />
            <defs>
              <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Icon or fallback */}
          <div className={`relative z-10 transition-transform duration-300 ${hovered ? 'scale-90' : 'scale-100'}`}>
            {skill.icon && urlFor(skill.icon).url() ? (
              <Image
                src={urlFor(skill.icon).url()}
                alt={skill.name}
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="text-cyan-400 font-mono text-xs font-bold">
                  {skill.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Percentage below the ring on hover */}
        <span
          ref={percentRef}
          className={`text-[11px] font-mono font-bold text-cyan-400 transition-opacity duration-300 -mt-1 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        >
          0%
        </span>

        {/* Skill name */}
        <span className="text-sm font-medium text-white text-center leading-tight group-hover:text-cyan-300 transition-colors">
          {skill.name}
        </span>

        {/* Category badge */}
        <span className="text-[10px] font-mono text-slate-500 capitalize">
          {skill.category}
        </span>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  )
}

export default SkillsSection
