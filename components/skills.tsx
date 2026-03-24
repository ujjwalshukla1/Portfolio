'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import { ScrollReveal } from './animations'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
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

export function SkillsSection({ skills }: SkillsSectionProps) {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    skillRefs.current.forEach((ref, idx) => {
      if (ref) {
        const proficiency = skills[idx].proficiency

        gsap.fromTo(
          ref.querySelector('.skill-bar-fill'),
          { width: '0%' },
          {
            width: `${proficiency}%`,
            duration: 1.2,
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              end: 'top 50%',
              scrub: false,
            },
          }
        )
      }
    })
  }, [skills])

  const groupedSkills = skills.reduce<Record<string, SkillsData[]>>((acc, skill) => {
    const category = skill.category
    if (!acc[category]) acc[category] = []
    acc[category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Skills & Expertise</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <ScrollReveal key={category}>
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 capitalize">{category}</h3>

                <div className="space-y-6">
                  {categorySkills.map((skill: SkillsData, idx: number) => (
                    <div
                      key={skill.name}
                      ref={(el) => {
                        if (el) skillRefs.current[idx] = el
                      }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {skill.icon && urlFor(skill.icon).url() && (
                            <Image
                              src={urlFor(skill.icon).url()}
                              alt={skill.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          )}
                          <span className="text-white font-medium">{skill.name}</span>
                        </div>
                        <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="skill-bar-fill h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
