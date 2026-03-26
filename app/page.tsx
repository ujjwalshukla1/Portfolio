import { sanityFetch } from '@/lib/sanity'
import { Navbar, Footer } from '@/components/header'
import { HeroSection } from '@/components/hero'
import { AboutSection } from '@/components/about'
import { SkillsSection } from '@/components/skills'
import { ProjectsSection } from '@/components/projects'
import { ContactSection } from '@/components/contact'
import { SmoothScroll } from '@/components/smooth-scroll'

// Revalidate data from Sanity every 60 seconds
export const revalidate = 60

const HERO_QUERY = `*[_type == "hero"][0]`
const ABOUT_QUERY = `*[_type == "about"][0]`
const SKILLS_QUERY = `*[_type == "skill"] | order(category, proficiency desc)`
const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc) { ..., slug }`
const CONTACT_QUERY = `*[_type == "contact"][0]`

const defaultHero = {
  title: 'Hi, I\'m a Full Stack Developer',
  subtitle: 'Building beautiful, functional web experiences',
  description: 'I craft modern web applications with cutting-edge technologies. Specialized in Next.js, React, and full-stack development.',
  ctaText: 'Explore My Work',
}

const defaultAbout = {
  title: 'About Me',
  intro: 'I\'m a passionate full-stack developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.',
}

const defaultSkills = [
  { category: 'frontend', name: 'React / Next.js', proficiency: 90 },
  { category: 'frontend', name: 'TypeScript', proficiency: 85 },
  { category: 'frontend', name: 'Tailwind CSS', proficiency: 90 },
  { category: 'frontend', name: 'HTML / CSS', proficiency: 95 },
  { category: 'backend', name: 'Node.js', proficiency: 85 },
  { category: 'backend', name: 'Python', proficiency: 75 },
  { category: 'backend', name: 'REST APIs', proficiency: 85 },
  { category: 'backend', name: 'Databases', proficiency: 80 },
  { category: 'tools', name: 'Git / GitHub', proficiency: 90 },
  { category: 'tools', name: 'Docker', proficiency: 70 },
  { category: 'tools', name: 'CI/CD', proficiency: 75 },
  { category: 'tools', name: 'Linux', proficiency: 80 },
]

const defaultProjects = [
  {
    _id: 'default-1',
    title: 'E-Commerce Platform',
    slug: { current: 'ecommerce-platform' },
    description: 'A full-featured e-commerce platform with product management, cart, checkout, and payment integration. Built with Next.js and Stripe.',
    technologies: [{ tech: 'Next.js' }, { tech: 'TypeScript' }, { tech: 'Stripe' }, { tech: 'Tailwind CSS' }],
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    _id: 'default-2',
    title: 'Task Management App',
    slug: { current: 'task-management' },
    description: 'A collaborative task management application with real-time updates, drag-and-drop boards, and team features.',
    technologies: [{ tech: 'React' }, { tech: 'Node.js' }, { tech: 'MongoDB' }, { tech: 'Socket.io' }],
    featured: true,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    _id: 'default-3',
    title: 'Weather Dashboard',
    slug: { current: 'weather-dashboard' },
    description: 'A real-time weather dashboard with location search, forecasts, and interactive maps.',
    technologies: [{ tech: 'React' }, { tech: 'API' }, { tech: 'Chart.js' }],
    featured: false,
    liveUrl: '#',
    githubUrl: '#',
  },
]

const defaultContact = {
  title: 'Get In Touch',
  email: 'hello@example.com',
  location: 'Available Worldwide',
  socialLinks: [
    { platform: 'GitHub', url: '#' },
    { platform: 'LinkedIn', url: '#' },
    { platform: 'Twitter', url: '#' },
  ],
}

export default async function Home() {
  const [heroData, aboutData, skillsData, projectsData, contactData] = await Promise.all([
    sanityFetch({ query: HERO_QUERY }).catch(() => null),
    sanityFetch({ query: ABOUT_QUERY }).catch(() => null),
    sanityFetch({ query: SKILLS_QUERY }).catch(() => []),
    sanityFetch({ query: PROJECTS_QUERY }).catch(() => []),
    sanityFetch({ query: CONTACT_QUERY }).catch(() => null),
  ])

  const hero = heroData || defaultHero
  const about = aboutData || defaultAbout
  const skills = (skillsData && skillsData.length > 0) ? skillsData : defaultSkills
  const projects = (projectsData && projectsData.length > 0) ? projectsData : defaultProjects
  const contact = contactData || defaultContact

  return (
    <SmoothScroll>
      <Navbar />
      <HeroSection {...hero} />
      <AboutSection {...about} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ContactSection contactData={contact} />
      <Footer />
    </SmoothScroll>
  )
}
