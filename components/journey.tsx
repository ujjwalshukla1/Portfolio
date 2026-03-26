'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface JourneyItem {
  _id: string
  title: string
  organization?: string
  type: 'work' | 'education' | 'certification' | 'achievement'
  startDate: string
  endDate?: string
  description?: string
  technologies?: { tech: string }[]
  order?: number
}

interface JourneySectionProps {
  journeyItems: JourneyItem[]
}

const typeConfig: Record<string, { icon: string; color: string; glowColor: string; label: string }> = {
  work: { icon: '>', color: 'cyan', glowColor: 'rgba(6, 182, 212, 0.4)', label: 'WORK' },
  education: { icon: '◆', color: 'indigo', glowColor: 'rgba(99, 102, 241, 0.4)', label: 'EDU' },
  certification: { icon: '✦', color: 'amber', glowColor: 'rgba(245, 158, 11, 0.4)', label: 'CERT' },
  achievement: { icon: '★', color: 'green', glowColor: 'rgba(34, 197, 94, 0.4)', label: 'WIN' },
}

const colorMap: Record<string, { dot: string; border: string; text: string; bg: string; glow: string }> = {
  cyan: {
    dot: 'bg-cyan-400',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
  },
  indigo: {
    dot: 'bg-indigo-400',
    border: 'border-indigo-500/40',
    text: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    glow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
  },
  amber: {
    dot: 'bg-amber-400',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
  },
  green: {
    dot: 'bg-green-400',
    border: 'border-green-500/40',
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]',
  },
}

export function JourneySection({ journeyItems }: JourneySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Circuit board background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    let time = 0
    const nodes: { x: number; y: number; connections: number[] }[] = []

    const initNodes = () => {
      nodes.length = 0
      const count = 25
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          connections: [],
        })
      }
      // Create connections to nearest neighbors
      nodes.forEach((node, i) => {
        const distances = nodes
          .map((other, j) => ({
            j,
            dist: Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2),
          }))
          .filter(({ j }) => j !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 2)
        node.connections = distances.filter((d) => d.dist < 300).map((d) => d.j)
      })
    }

    const animate = () => {
      time += 0.008
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((j) => {
          const other = nodes[j]
          const alpha = 0.04 + Math.sin(time * 2) * 0.02
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Traveling data packet
          const packetPos = ((time * 0.3 + node.x * 0.001) % 1)
          const px = node.x + (other.x - node.x) * packetPos
          const py = node.y + (other.y - node.y) * packetPos
          ctx.beginPath()
          ctx.arc(px, py, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${0.3 + Math.sin(time * 3) * 0.2})`
          ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2 + pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${0.1 + pulse * 0.1})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initNodes()
    animate()

    window.addEventListener('resize', () => {
      resize()
      initNodes()
    })
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })

    // Title decode animation
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

      tl.to({}, { duration: 1.2 })
    }

    // Animate the timeline line growing
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top' })
      tl.to(lineRef.current, {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=0.8')
    }

    // Animate each timeline card
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.journey-item')
      gsap.set(items, { opacity: 0, x: -40 })
      tl.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=1')

      // Animate dots on timeline
      const dots = timelineRef.current.querySelectorAll('.timeline-dot')
      gsap.set(dots, { scale: 0 })
      tl.to(dots, {
        scale: 1,
        duration: 0.4,
        stagger: 0.2,
        ease: 'back.out(3)',
      }, '-=1.2')

      // Animate connector lines
      const connectors = timelineRef.current.querySelectorAll('.timeline-connector')
      gsap.set(connectors, { scaleX: 0, transformOrigin: 'left' })
      tl.to(connectors, {
        scaleX: 1,
        duration: 0.3,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=1')

      // Type in the terminal headers
      const termHeaders = timelineRef.current.querySelectorAll('.journey-term-path')
      termHeaders.forEach((header) => {
        const text = header.textContent || ''
        header.textContent = ''
        tl.call(() => {
          let i = 0
          const typeInterval = setInterval(() => {
            header.textContent = text.slice(0, i + 1)
            i++
            if (i >= text.length) clearInterval(typeInterval)
          }, 25)
        }, [], '-=0.8')
      })

      // Tech badges pop in
      const badges = timelineRef.current.querySelectorAll('.journey-tech')
      gsap.set(badges, { opacity: 0, scale: 0.5, y: 10 })
      tl.to(badges, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'back.out(2)',
      }, '-=0.5')
    }
  }, [journeyItems])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 bg-linear-to-b from-slate-950 to-slate-900 relative overflow-hidden"
    >
      {/* Circuit board background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-white font-mono opacity-0"
          >
            My Journey
          </h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-cyan-500/50" />
            <span className="text-cyan-400 font-mono text-sm">~/timeline</span>
            <span className="h-px w-12 bg-linear-to-l from-transparent to-cyan-500/50" />
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-cyan-500/40 via-indigo-500/30 to-transparent"
          />

          <div className="space-y-8">
            {journeyItems.map((item, index) => {
              const config = typeConfig[item.type] || typeConfig.work
              const colors = colorMap[config.color] || colorMap.cyan

              return (
                <div key={item._id} className="journey-item relative flex gap-6 md:gap-8">
                  {/* Timeline dot & connector */}
                  <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: '48px' }}>
                    <div
                      className={`timeline-dot w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center ${colors.glow} backdrop-blur-sm`}
                    >
                      <span className={`${colors.text} font-mono text-lg font-bold`}>
                        {config.icon}
                      </span>
                    </div>
                    {/* Pulse ring */}
                    <div
                      className={`absolute top-0 left-0 w-12 h-12 rounded-xl ${colors.border} border opacity-50`}
                      style={{
                        animation: `ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-2">
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 group">
                      {/* Terminal header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-400/80" />
                          <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                          <span className="w-2 h-2 rounded-full bg-green-400/80" />
                          <span className="journey-term-path ml-2 text-xs text-slate-400 font-mono">
                            ~/{item.type}/{item.organization?.toLowerCase().replace(/\s+/g, '-') || 'entry'}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                          {config.label}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="px-5 py-4">
                        {/* Date range */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-slate-400">
                            {item.startDate}
                          </span>
                          <span className="h-px w-3 bg-slate-600" />
                          <span className={`text-xs font-mono ${item.endDate === 'Present' ? colors.text : 'text-slate-400'}`}>
                            {item.endDate || 'Present'}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>

                        {/* Organization */}
                        {item.organization && (
                          <p className={`text-sm font-medium ${colors.text} mb-3 font-mono`}>
                            @ {item.organization}
                          </p>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((t, i) => (
                              <span
                                key={i}
                                className="journey-tech text-xs font-mono px-2.5 py-1 rounded-md bg-slate-700/50 text-cyan-300 border border-slate-600/40"
                              >
                                {t.tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom glow */}
                      <div className="h-px w-full bg-linear-to-r from-transparent via-transparent to-transparent group-hover:via-cyan-500/30 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Terminal end marker */}
          <div className="relative flex gap-6 md:gap-8 mt-8">
            <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: '48px' }}>
              <div className="w-12 h-12 rounded-xl bg-slate-800/50 border-2 border-slate-600/40 flex items-center justify-center backdrop-blur-sm">
                <span className="text-slate-500 font-mono text-sm font-bold blink-cursor">_</span>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-sm font-mono text-slate-500">
                <span className="text-cyan-500/60">$</span> more chapters loading<span className="blink-cursor text-cyan-400">|</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.4); opacity: 0; }
        }
        .blink-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default JourneySection
