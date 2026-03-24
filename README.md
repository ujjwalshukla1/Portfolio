# 🚀 Professional Portfolio Website

A stunning, fully interactive portfolio website built with modern technologies and showcasing developer expertise.

## ✨ Features

- **Responsive Design**: Fully optimized for all devices (mobile, tablet, desktop)
- **GSAP Animations**: Smooth, performant animations throughout the site
- **Sanity CMS Integration**: Easy content management for all portfolio sections
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS
- **Dark Modern UI**: Professional dark theme with gradient accents
- **SEO Optimized**: Proper metadata and structured content
- **Fast Performance**: Optimized images and lazy loading

## 🎯 Sections

1. **Hero Section** - Eye-catching introduction with CTA
2. **About Section** - Personal story with image
3. **Skills Section** - Categorized skills with proficiency levels
4. **Projects Showcase** - Featured and regular projects with links
5. **Contact Section** - Social links and contact information
6. **Navigation Bar** - Sticky navbar with smooth scrolling
7. **Footer** - Professional footer

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP 3.x (GreenSock Animation Platform)
- **CMS**: Sanity.io
- **Image Optimization**: Next.js Image + Sanity Image URL builder

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Sanity CMS

#### Option A: Create a New Sanity Project
```bash
npx sanity@latest init
```

#### Option B: Use Existing Sanity Project
Skip the init command if you already have a Sanity project.

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Get your Project ID from your Sanity dashboard.

### 4. Deploy Schema to Sanity

```bash
npx sanity@latest deploy
```

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📝 Content Management

All content is managed through Sanity Studio. Each section has its own document type:

### Hero Section
- Title
- Subtitle
- Description
- Profile Image
- CTA Button Text

### About Section
- Section Title
- Intro Text
- Detailed Bio (Rich Text)
- Profile Image

### Skills
- Skill Name
- Category (Frontend, Backend, Tools, Other)
- Proficiency Level (0-100)
- Skill Icon (Optional)

### Projects
- Project Title
- Description
- Full Content (Rich Text)
- Project Image
- Technologies Used
- Live URL & GitHub URL
- Featured Flag
- Display Order

### Contact Section
- Email
- Phone
- Location
- Social Links (Platform + URL)

## 🎨 Customization

### Colors & Styling
Edit the Tailwind configuration or modify CSS variables in `app/globals.css`.

### Animations
GSAP animations are configured in:
- `components/animations.tsx` - Reusable animation components
- `components/hero.tsx` - Hero section animations
- `components/projects.tsx` - Project card animations
- `components/skills.tsx` - Skill bar animations

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Main home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & animations
├── components/
│   ├── header.tsx            # Navbar & Footer
│   ├── hero.tsx              # Hero section
│   ├── about.tsx             # About section
│   ├── projects.tsx          # Projects showcase
│   ├── skills.tsx            # Skills section
│   ├── contact.tsx           # Contact section
│   └── animations.tsx        # GSAP animation components
├── lib/
│   ├── sanity.ts             # Sanity client config
│   ├── image.ts              # Image URL builder
│   └── gsap-config.ts        # GSAP setup
├── sanity/
│   └── schemaTypes/          # Sanity schema definitions
├── public/                   # Static assets
├── sanity.config.ts          # Sanity Studio config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

## 🔗 Adding Content via Sanity

1. Get your Sanity credentials from `.env.local`
2. Go to `https://manage.sanity.io` and log in
3. Open your project
4. Add content for each document type using the Studio interface

## ⚡ Performance Tips

- Images are optimized with Next.js Image component
- GSAP animations use GPU acceleration
- Lazy loading on scroll-triggered animations
- Code splitting for components
- Static generation for faster builds

## 🎯 SEO Optimization

- Meta title and description
- Open Graph tags ready for social sharing
- Structured content
- Mobile-friendly design
- Fast page load times

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js, Sanity & GSAP**
