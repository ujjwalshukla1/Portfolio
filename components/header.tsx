'use client'

import React from 'react'
import { FadeIn } from './animations'

export function Navbar() {
  const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact']

  const handleScroll = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <FadeIn delay={0.2} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Portfolio
          </FadeIn>
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleScroll(section.toLowerCase())}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} My Portfolio. Built with Next.js, GSAP & Sanity.</p>
        </div>
      </div>
    </footer>
  )
}
