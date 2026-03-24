# 🏗️ Architecture & Component Map

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         app/page.tsx (Main Page - Server)            │   │
│  │  - Fetches all content from Sanity                   │   │
│  │  - Passes data to components                         │   │
│  │  - Renders complete portfolio                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Client Components (Animated)                │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  ┌────────────────┐    ┌────────────────┐           │   │
│  │  │   Navbar       │    │   Hero         │           │   │
│  │  │ (Fixed header) │    │ (Fade in)      │           │   │
│  │  └────────────────┘    └────────────────┘           │   │
│  │  ┌────────────────┐    ┌────────────────┐           │   │
│  │  │   About        │    │   Skills       │           │   │
│  │  │ (Scroll reveal)│    │(Bar animation) │           │   │
│  │  └────────────────┘    └────────────────┘           │   │
│  │  ┌────────────────┐    ┌────────────────┐           │   │
│  │  │   Projects     │    │   Contact      │           │   │
│  │  │ (Grid + hover) │    │ (Scroll reveal)│           │   │
│  │  └────────────────┘    └────────────────┘           │   │
│  │  ┌────────────────┐                                 │   │
│  │  │   Footer       │                                 │   │
│  │  │ (Fixed bottom) │                                 │   │
│  │  └────────────────┘                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
       ↑                                    ↑
       │         Uses                       │ Uses
       │                                    │
┌──────────────────┐            ┌───────────────────────┐
│   SANITY CMS     │            │  GSAP ANIMATIONS      │
│                  │            │                       │
│ • Hero           │            │ • FadeIn              │
│ • About          │            │ • ScaleIn             │
│ • Skills         │            │ • SlideIn             │
│ • Projects       │            │ • ScrollReveal        │
│ • Contact        │            │ • Blob animations     │
│                  │            │ • Progress bars       │
└──────────────────┘            └───────────────────────┘
```

## Component Hierarchy

```
<RootLayout>
  └─ <html> + <body>
      └─ <page.tsx> (Main content)
          ├─ <Navbar />
          ├─ <HeroSection />
          │   └─ Uses: FadeIn, SlideIn animations
          ├─ <AboutSection />
          │   └─ Uses: ScrollReveal animation
          ├─ <SkillsSection />
          │   └─ Uses: ScrollReveal, GSAP bars
          ├─ <ProjectsSection />
          │   └─ Uses: ScrollReveal, hover effects
          ├─ <ContactSection />
          │   └─ Uses: ScrollReveal, links
          └─ <Footer />
```

## Content Type Structure (Sanity)

```
SANITY PROJECT
├── Hero (Document)
│   ├── title: string
│   ├── subtitle: string
│   ├── description?: string
│   ├── image?: image
│   └── cta_text: string
│
├── About (Document)
│   ├── title: string
│   ├── intro?: string
│   ├── bio: rich text
│   └── image?: image
│
├── Skills (Multiple Documents)
│   ├── category: "frontend" | "backend" | "tools" | "other"
│   ├── name: string
│   ├── proficiency: 0-100
│   └── icon?: image
│
├── Projects (Multiple Documents)
│   ├── title: string
│   ├── slug: slug
│   ├── description?: string
│   ├── image?: image
│   ├── technologies: [{tech: string}]
│   ├── liveUrl?: url
│   ├── githubUrl?: url
│   ├── featured: boolean
│   └── order: number
│
└── Contact (Document)
    ├── title?: string
    ├── email?: string
    ├── phone?: string
    ├── location?: string
    └── socialLinks: [{platform, url}]
```

## File Organization

```
portfolio/
│
├── app/
│   ├── page.tsx              ← Fetches from Sanity, renders all sections
│   ├── layout.tsx            ← HTML structure, metadata
│   └── globals.css           ← Animations, dark theme
│
├── components/               ← All React components
│   ├── animations.tsx        ← GSAP utility components (FadeIn, etc)
│   ├── header.tsx            ← Navbar + Footer
│   ├── hero.tsx              ← Hero section with animations
│   ├── about.tsx             ← About section
│   ├── projects.tsx          ← Projects showcase
│   ├── skills.tsx            ← Skills with bars
│   └── contact.tsx           ← Contact & social
│
├── lib/                      ← Utilities & configurations
│   ├── sanity.ts             ← Sanity client + fetch functions
│   ├── image.ts              ← Image URL builder
│   └── gsap-config.ts        ← GSAP initialization
│
├── sanity/
│   └── schemaTypes/          ← Document type definitions
│       ├── index.ts          ← Exports all types
│       ├── hero.ts           ← Hero schema
│       ├── about.ts          ← About schema
│       ├── skill.ts          ← Skill schema
│       ├── project.ts        ← Project schema
│       └── contact.ts        ← Contact schema
│
├── sanity.config.ts          ← Sanity Studio config
├── sanity.cli.ts             ← Sanity CLI config
├── next.config.ts            ← Next.js config
├── tailwind.config.ts        ← Tailwind config
├── tsconfig.json             ← TypeScript config
├── package.json              ← Dependencies
└── .env.local                ← Environment variables
```

## Data Flow for Hero Section Example

```
1. User visits http://localhost:3000
                         ↓
2. Next.js renders app/page.tsx (Server Component)
                         ↓
3. page.tsx runs HERO_QUERY:
   *[_type == "hero"][0]
                         ↓
4. Data fetched from Sanity via sanityFetch()
                         ↓
5. Hero data passed to <HeroSection /> component
                         ↓
6. HeroSection renders with animations:
   - Uses urlFor() to get image URL
   - Applies GSAP animations from useEffect
   - Returns animated JSX
                         ↓
7. Browser displays hero with animations
   - Title fades in
   - Subtitle slides up
   - Content appears
   - Profile image loads
```

## Animation Trigger Points

```
Page Load                    On Scroll
    ↓                           ↓
┌─────────────┐        ┌──────────────────┐
│ Hero        │        │ About            │
│ - Title     │        │ - Fades in       │
│ - Subtitle  │        │ - When at 80%    │
│ - Content   │        │   from top       │
│ - Image     │        └──────────────────┘
└─────────────┘
                       ┌──────────────────┐
                       │ Skills           │
Sticky                 │ - Bars fill      │
┌─────────────┐        │ - On scroll      │
│ Navbar      │        │   trigger        │
└─────────────┘        └──────────────────┘

                       ┌──────────────────┐
                       │ Projects         │
                       │ - Scale in       │
                       │ - On scroll      │
                       │ - Cards appear   │
                       └──────────────────┘

                       ┌──────────────────┐
                       │ Contact          │
                       │ - Reveals        │
                       │ - On scroll      │
                       └──────────────────┘
```

## Technology Stack Visualization

```
┌──────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
├──────────────────────────────────────────────────────────┤
│  React 19 + TypeScript                                   │
│  ├─ Components (JSX/TSX)                                 │
│  ├─ Hooks (useState, useEffect, useRef)                  │
│  └─ Client-side interactivity                            │
└──────────────────────────────────────────────────────────┘
                         ↑
┌──────────────────────────────────────────────────────────┐
│              NEXT.JS 16 FRAMEWORK                        │
├──────────────────────────────────────────────────────────┤
│  ├─ App Router (app/ directory)                          │
│  ├─ Server Components (page.tsx)                         │
│  ├─ Image Optimization                                   │
│  ├─ Static Generation                                    │
│  └─ API Routes                                           │
└──────────────────────────────────────────────────────────┘
                         ↑
┌──────────────────────────────────────────────────────────┐
│                   UTILITY LAYER                          │
├──────────────────────────────────────────────────────────┤
│  ├─ GSAP (gregsock.com)                                  │
│  │  └─ Animations & ScrollTrigger                        │
│  ├─ Sanity Client                                        │
│  │  └─ Content Management & Queries                      │
│  ├─ Tailwind CSS                                         │
│  │  └─ Styling & Dark Theme                              │
│  └─ TypeScript                                           │
│     └─ Type Safety                                       │
└──────────────────────────────────────────────────────────┘
                         ↑
┌──────────────────────────────────────────────────────────┐
│           BACKEND/CMS LAYER (Sanity)                    │
├──────────────────────────────────────────────────────────┤
│  ├─ Cloud-hosted CMS                                     │
│  ├─ Real-time updates                                    │
│  ├─ Rich text & media support                            │
│  ├─ GROQ query language                                  │
│  └─ Instant publishing                                   │
└──────────────────────────────────────────────────────────┘
```

## Development Workflow

```
1. Write/Edit Code
   ├─ components/*.tsx
   ├─ lib/*.ts
   ├─ app/*.tsx
   └─ app/globals.css
            ↓
2. Dev Server Watches Changes
            ↓
3. Hot Module Reload (HMR)
            ↓
4. Browser Updates Instantly
            ↓
5. See Animations & Content
   
OR

1. Manage Content
   ├─ Open Sanity Studio
   ├─ Create/Edit Documents
   └─ Publish Changes
            ↓
2. GROQ Query Triggers
            ↓
3. Next.js Refetches Data
            ↓
4. Page Updates Automatically
            ↓
5. New Content Visible Instantly
```

---

This architecture provides:
- ✅ Separation of concerns
- ✅ Easy content management
- ✅ Smooth animations
- ✅ Type-safe development
- ✅ Performance optimization
- ✅ Developer experience
