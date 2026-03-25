'use client'

import React, { useRef, useEffect } from 'react'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectData {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  image?: Record<string, unknown>
  technologies?: Array<{ tech: string }>
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
}

interface ProjectsSectionProps {
  projects: ProjectData[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const otherRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Blueprint scanline — sweeps down the section continuously
    if (scanlineRef.current) {
      gsap.to(scanlineRef.current, {
        y: '100vh',
        duration: 4,
        repeat: -1,
        ease: 'none',
        delay: 1,
      })
    }

    // Title animation
    if (titleRef.current) {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      const titleText = titleRef.current.querySelector('.project-title')
      const titleLine = titleRef.current.querySelector('.title-line')
      const titleSub = titleRef.current.querySelector('.title-sub')

      if (titleText) {
        gsap.set(titleText, { opacity: 0, y: 30 })
        titleTl.to(titleText, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      }
      if (titleLine) {
        gsap.set(titleLine, { scaleX: 0, transformOrigin: 'center' })
        titleTl.to(titleLine, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      }
      if (titleSub) {
        gsap.set(titleSub, { opacity: 0, y: 10 })
        titleTl.to(titleSub, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      }
    }

    // Featured projects
    if (featuredRef.current) {
      const cards = featuredRef.current.querySelectorAll('.featured-card')

      cards.forEach((card, idx) => {
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        })

        // Project number fades in
        const num = card.querySelector('.project-num')
        if (num) {
          gsap.set(num, { opacity: 0, scale: 1.5 })
          cardTl.to(num, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' })
        }

        // Image reveals with curtain wipe
        const imageWrap = card.querySelector('.project-image-wrap')
        if (imageWrap) {
          const fromSide = idx % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
          gsap.set(imageWrap, { clipPath: fromSide })
          cardTl.to(
            imageWrap,
            { clipPath: 'inset(0 0% 0 0%)', duration: 1, ease: 'power3.inOut' },
            0.2
          )
        }

        // Content side — title, description, badges, buttons stagger in
        const contentItems = card.querySelectorAll('.content-reveal')
        gsap.set(contentItems, { opacity: 0, y: 25 })
        cardTl.to(
          contentItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          },
          0.5
        )

        // Tech badges bounce in
        const badges = card.querySelectorAll('.tech-badge')
        gsap.set(badges, { opacity: 0, scale: 0.5 })
        cardTl.to(
          badges,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.06,
            ease: 'back.out(2)',
          },
          0.8
        )

        // Buttons slide up
        const buttons = card.querySelectorAll('.project-btn')
        gsap.set(buttons, { opacity: 0, y: 15 })
        cardTl.to(
          buttons,
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          1.0
        )
      })
    }

    // Other projects — staggered cascade
    if (otherRef.current) {
      const cards = otherRef.current.querySelectorAll('.other-card')
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 })

        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })

        // Image inside the card
        const img = card.querySelector('.other-card-image')
        if (img) {
          gsap.set(img, { scale: 1.2 })
          gsap.to(img, {
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          })
        }
      })

      // "Other Projects" heading
      const otherTitle = otherRef.current.querySelector('.other-title')
      if (otherTitle) {
        gsap.set(otherTitle, { opacity: 0, x: -30 })
        gsap.to(otherTitle, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: otherTitle,
            start: 'top 85%',
          },
        })
      }
    }
  }, [projects])

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 bg-linear-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Moving scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.15), transparent)',
          top: '-100vh',
        }}
      />

      {/* Blob accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="project-title text-4xl md:text-5xl font-bold text-white">
            Featured Projects
          </h2>
          <div className="title-line mt-4 h-px w-32 mx-auto bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
          <p className="title-sub mt-4 text-slate-400 font-mono text-sm">
            {'// Showcasing what I\'ve built'}
          </p>
        </div>

        {/* Featured projects */}
        <div ref={featuredRef} className="space-y-24">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, idx) => (
              <div
                key={project._id}
                className="featured-card grid md:grid-cols-2 gap-10 items-center relative"
              >
                {/* Large faded project number */}
                <div className={`project-num absolute -top-8 ${idx % 2 === 0 ? '-left-4' : '-right-4'} text-[8rem] md:text-[10rem] font-bold font-mono text-white/[0.03] leading-none select-none pointer-events-none`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Image side */}
                {project.image && (
                  <div className={idx % 2 === 0 ? 'order-1' : 'md:order-2'}>
                    <div className="project-image-wrap relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl shadow-black/20 group">
                      <Image
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay with code bracket decoration */}
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 to-transparent opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-6xl font-mono text-white/20 font-bold">&lt;/&gt;</span>
                      </div>
                      {/* Corner accents */}
                      <span className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}

                {/* Content side */}
                <div className={idx % 2 === 0 ? 'order-2' : 'md:order-1'}>
                  {/* Project label */}
                  <p className="content-reveal text-cyan-400 font-mono text-sm mb-2">
                    Project {String(idx + 1).padStart(2, '0')}
                  </p>

                  <h3 className="content-reveal text-3xl font-bold text-white mb-4">{project.title}</h3>

                  {/* Description in a card */}
                  <div className="content-reveal bg-slate-800/50 backdrop-blur-sm rounded-lg p-5 border border-slate-700/50 mb-5">
                    <p className="text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tech badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="content-reveal mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="tech-badge px-3 py-1 bg-slate-700/40 border border-slate-600/30 text-cyan-300 rounded-full text-sm font-mono hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
                          >
                            {tech.tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn group/btn relative px-6 py-2.5 bg-cyan-500 text-black font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          View Live
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform">
                            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                          </svg>
                        </span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn px-6 py-2.5 bg-slate-700/50 border border-slate-600/50 text-white font-semibold rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-300 flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12 font-mono">{'// No featured projects yet'}</div>
          )}
        </div>

        {/* Other projects */}
        {otherProjects.length > 0 && (
          <div ref={otherRef} className="mt-24">
            <div className="other-title flex items-center gap-4 mb-10">
              <h3 className="text-2xl font-bold text-white font-mono">Other Projects</h3>
              <span className="h-px flex-1 bg-linear-to-r from-slate-700 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project._id}
                  className="other-card bg-slate-800/50 backdrop-blur-xl rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/40 group transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        fill
                        className="other-card-image object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-700/50 text-cyan-300 rounded text-xs font-mono"
                            >
                              {tech.tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2 border-t border-slate-700/50">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 bg-cyan-500 text-black font-semibold rounded-md hover:shadow-md hover:shadow-cyan-500/30 transition-all flex items-center gap-1"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 text-white font-semibold rounded-md hover:bg-slate-700 transition-all flex items-center gap-1"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
