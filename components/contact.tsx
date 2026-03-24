'use client'

import React from 'react'
import { ScrollReveal } from './animations'
import Link from 'next/link'

interface ContactData {
  title?: string
  email?: string
  phone?: string
  location?: string
  socialLinks?: Array<{ platform: string; url: string }>
}

interface ContactSectionProps {
  contactData?: ContactData
}

export function ContactSection({ contactData }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            {contactData?.title || 'Get In Touch'}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 md:p-12 border border-slate-700">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactData?.email && (
              <div className="text-center">
                <p className="text-cyan-400 font-semibold mb-2">Email</p>
                <Link
                  href={`mailto:${contactData.email}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {contactData.email}
                </Link>
              </div>
            )}
            {contactData?.phone && (
              <div className="text-center">
                <p className="text-cyan-400 font-semibold mb-2">Phone</p>
                <Link
                  href={`tel:${contactData.phone}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {contactData.phone}
                </Link>
              </div>
            )}
            {contactData?.location && (
              <div className="text-center">
                <p className="text-cyan-400 font-semibold mb-2">Location</p>
                <p className="text-gray-300">{contactData.location}</p>
              </div>
            )}
          </div>

          {contactData?.socialLinks && contactData.socialLinks.length > 0 && (
            <div className="border-t border-slate-700 pt-8">
              <p className="text-center text-cyan-400 font-semibold mb-6">Follow Me</p>
              <div className="flex justify-center gap-6 flex-wrap">
                {contactData.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-slate-700 hover:bg-cyan-500 text-white hover:text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
