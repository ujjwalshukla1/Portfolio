'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FadeInProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

export function FadeIn({ children, duration = 0.8, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
      )
    }
  }, [duration, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function ScaleIn({ children, duration = 0.8, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration, delay, ease: 'back.out' }
      )
    }
  }, [duration, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function SlideIn({ children, duration = 0.8, delay = 0, direction = 'left', className }: FadeInProps & { direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const xValue = direction === 'left' ? -50 : 50
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: xValue },
        { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
      )
    }
  }, [duration, delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ScrollRevealProps extends FadeInProps {
  triggerElement?: string
}

export function ScrollReveal({ children, duration = 0.8, className, triggerElement }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration,
          scrollTrigger: {
            trigger: triggerElement || ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            markers: false,
          },
        }
      )
    }
  }, [duration, triggerElement])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
