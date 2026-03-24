'use client'

import React, { useRef, useEffect } from 'react'
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
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
  }, [])

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
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
            >
              {title}
            </h1>
            <h2
              ref={subtitleRef}
              className="text-2xl md:text-4xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-semibold mb-6"
            >
              {subtitle}
            </h2>
            <div ref={contentRef} className="space-y-6">
              {description && <p className="text-gray-300 text-lg leading-relaxed">{description}</p>}
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                {ctaText}
              </button>
            </div>
          </div>

          {image && (
            <div className="relative h-96 md:h-full">
              <Image
                src={urlFor(image).url()}
                alt={title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
