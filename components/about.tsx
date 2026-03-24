'use client'

import React, { useRef } from 'react'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import { ScrollReveal } from './animations'

interface AboutSectionProps {
  title: string
  intro?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any
  image?: Record<string, unknown>
}

export function AboutSection({ title, intro, bio, image }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            {title}
          </h2>
        </ScrollReveal>

        <div ref={containerRef} className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="order-2 md:order-1">
            <div className="space-y-6">
              {intro && (
                <p className="text-xl text-gray-300 leading-relaxed">{intro}</p>
              )}
              {bio && (
                <div className="prose prose-invert max-w-none">
                  <PortableText value={bio} />
                </div>
              )}
            </div>
          </ScrollReveal>

          {image && (
            <ScrollReveal className="order-1 md:order-2">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(image).url()}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
