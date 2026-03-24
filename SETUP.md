# 🚀 Portfolio Setup Guide

Complete step-by-step instructions to get your portfolio website up and running.

## Prerequisites

- Node.js 18+ (download from [nodejs.org](https://nodejs.org))
- npm or yarn package manager
- A code editor (VS Code recommended)

## Step 1: Install Dependencies

```bash
cd portfolio
npm install
```

This installs all required packages including Next.js, GSAP, Sanity, and Tailwind CSS.

## Step 2: Set Up Sanity CMS

### Option A: Create a New Sanity Project (Recommended)

```bash
npx sanity@latest init
```

Follow the prompts:
1. Create a new project (select "Yes" when asked)
2. Choose a project name (e.g., "My Portfolio")
3. Select dataset visibility (can be public or private)
4. Choose your preferred template (select "Clean project")
5. Accept the default dataset name or customize it

The command will create:
- A Sanity project in the cloud
- Access credentials automatically added to `.env.local`

### Option B: Use Existing Sanity Project

If you already have a Sanity project:

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project and dataset
3. Copy your Project ID
4. Update `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 3: Deploy Schema to Sanity

After setting up Sanity, deploy the schema:

```bash
npx sanity@latest deploy
```

This uploads all document types (Hero, About, Projects, Skills, Contact) to your Sanity project.

## Step 4: Verify Environment Configuration

Check that `.env.local` contains:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

If these are missing after `sanity init`, add them manually.

## Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

You should see the portfolio homepage with:
- Navigation bar
- Hero section with default content
- Animated background elements
- Smooth scroll effects

## Step 6: Add Content in Sanity Studio

### Open Sanity Studio

```bash
npx sanity@latest desk
```

Or visit your studio URL: `https://<project-id>.sanity.studio`

### Create Hero Section Content

1. Click "Hero" in the left sidebar
2. Click "+ Create" or the create button
3. Fill in:
   - **Title**: "Hi, I'm John Doe" (or your name)
   - **Subtitle**: "Full Stack Developer"
   - **Description**: A brief intro about yourself
   - **Image**: Upload a profile picture
   - **CTA Text**: "View My Work" or custom text
4. Click "Publish"

### Create About Section

1. Click "About" in the sidebar
2. Create a new document
3. Fill in:
   - **Title**: "About Me"
   - **Intro**: Brief introduction
   - **Bio**: Longer biography (supports rich text formatting)
   - **Image**: Your photo
4. Publish

### Add Skills

1. Click "Skill" in the sidebar
2. For each skill, create a new document:
   - **Category**: Choose from Frontend, Backend, Tools, or Other
   - **Name**: Skill name (e.g., "React", "Node.js")
   - **Proficiency**: 1-100 (representing percentage)
   - **Icon**: (Optional) Skill icon image
3. Publish each skill

### Add Projects

1. Click "Project" in the sidebar
2. For each project, create a new document:
   - **Title**: Project name
   - **Description**: Short description
   - **Content**: Full project details (rich text)
   - **Image**: Project screenshot/hero image
   - **Technologies**: Add tech stack (click "+ Add item")
   - **Live URL**: Link to live project (if available)
   - **GitHub URL**: Link to repository
   - **Featured**: Check this for featured projects
   - **Order**: Number to control display order
3. Publish

### Add Contact Information

1. Click "Contact" in the sidebar
2. Create a new document:
   - **Title**: "Get In Touch" or similar
   - **Email**: Your email address
   - **Phone**: Your phone number (optional)
   - **Location**: Your location (optional)
   - **Social Links**: Add each:
     - Platform (GitHub, LinkedIn, Twitter, etc.)
     - URL to your profile
3. Publish

## Step 7: Verify Content Appears

Refresh or navigate back to `http://localhost:3000`

You should now see:
- Your hero section with custom content
- About section with your story
- Skills section with animated progress bars
- Projects showcase
- Contact section with your links
- All sections should have smooth animations

## Step 8: Customize Styling (Optional)

### Change Colors

Edit `app/globals.css` or `tailwind.config.ts` to customize:
- Primary color (currently cyan/blue)
- Background colors
- Text colors
- Animation speeds

### Modify Animations

Edit component files in `components/` to adjust:
- Animation duration
- Animation easing
- Animation delays
- Trigger points for scroll animations

## Step 9: Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

## Step 10: Deploy to Vercel (Optional)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
6. Click "Deploy"

Your portfolio is now live!

## Troubleshooting

### Images Not Loading
- Verify Project ID and Dataset in `.env.local`
- Check image URLs in Sanity Dashboard
- Ensure images are published (blue checkmark)

### Content Not Appearing
- Check browser console for errors (F12 → Console)
- Verify documents are published in Sanity
- Clear browser cache (Ctrl+Shift+Delete)
- Restart development server

### Animations Not Playing
- Check that GSAP is installed (`npm list gsap`)
- Scroll page to trigger scroll animations
- Try on a different browser
- Clear cache and hard refresh (Ctrl+F5)

### Build Errors
- Delete `node_modules` folder
- Delete `.next` folder
- Run `npm install` again
- Run `npm run build`

### Sanity Connection Issues
- Verify internet connection
- Check Project ID and Dataset are correct
- Try logging out and back into Sanity
- Check Sanity status at [status.sanity.io](https://status.sanity.io)

## Next Steps

After setup, consider:
1. **Customize styling** - Match your brand colors
2. **Add more projects** - Showcase your best work
3. **Fine-tune animations** - Adjust speed and effects
4. **Set up analytics** - Track visitor engagement
5. **Add SEO metadata** - Improve search visibility
6. **Deploy to production** - Share your portfolio

## Getting Help

- **Next.js**: [docs.nextjs.org](https://docs.nextjs.org)
- **Sanity**: [sanity.io/docs](https://www.sanity.io/docs)
- **GSAP**: [greensock.com/docs](https://greensock.com/docs/)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Sanity
npx sanity@latest init      # Initialize Sanity
npx sanity@latest desk      # Open Sanity Studio
npx sanity@latest deploy    # Deploy schema

# Maintenance
npm install         # Install dependencies
npm list           # List installed packages
```

---

**Congratulations! Your portfolio is ready to showcase your skills.** 🎉

For questions or issues, refer to the main README.md or component documentation.

