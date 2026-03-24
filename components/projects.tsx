'use client'

import React, { useRef, useEffect } from 'react'
import { urlFor } from '@/lib/image'
import Image from 'next/image'
import { ScrollReveal } from './animations'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
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
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    projectRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
  }, [projects])

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">Featured Projects</h2>
        </ScrollReveal>

        <div className="grid gap-12">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, idx) => (
              <div
                key={project._id}
                ref={(el) => {
                  if (el) projectRefs.current[idx] = el
                }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                {project.image && (
                  <div className={idx % 2 === 0 ? 'order-1' : 'order-2'}>
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl group">
                      <Image
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40"></div>
                    </div>
                  </div>
                )}

                <div className={idx % 2 === 0 ? 'order-2' : 'order-1'}>
                  <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-6">
                      <p className="text-cyan-400 font-semibold mb-3">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-700/50 text-cyan-300 rounded-full text-sm"
                          >
                            {tech.tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
                      >
                        View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all duration-300"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">No featured projects yet</div>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mt-20 mb-8">Other Projects</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((project, idx) => (
                <div
                  key={project._id}
                  ref={(el) => {
                    if (el) projectRefs.current[featuredProjects.length + idx] = el
                  }}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500/50 group transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-700/50 text-cyan-300 rounded text-xs"
                            >
                              {tech.tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1 bg-cyan-500 text-black font-semibold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                          Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1 bg-slate-700 text-white font-semibold rounded hover:bg-slate-600 transition-all"
                        >
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
