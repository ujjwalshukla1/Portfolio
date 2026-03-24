# ✅ Portfolio Setup Checklist

Track your progress setting up your professional portfolio.

## Phase 1: Installation & Setup

- [ ] Install Node.js 18+ (if not already installed)
- [ ] Navigate to portfolio folder: `cd portfolio`
- [ ] Install dependencies: `npm install`
- [ ] Verify installation: `npm list` shows all packages
- [ ] Read QUICKSTART.md for quick reference

## Phase 2: Sanity CMS Setup

### Create Sanity Project
- [ ] Run `npx sanity@latest init`
- [ ] Create new Sanity project when prompted
- [ ] Choose "Clean project" template
- [ ] Accept dataset creation
- [ ] Verify `.env.local` auto-populated with credentials

### Alternative: Use Existing Project
- [ ] Log in to [manage.sanity.io](https://manage.sanity.io)
- [ ] Copy your Project ID
- [ ] Copy your Dataset name
- [ ] Update `.env.local` with credentials
- [ ] Verify format: `NEXT_PUBLIC_SANITY_PROJECT_ID=xxx`

### Deploy Schema
- [ ] Run `npx sanity@latest deploy`
- [ ] Schema uploads successfully
- [ ] No error messages in console

## Phase 3: Start Development

- [ ] Run `npm run dev`
- [ ] Open browser to `http://localhost:3000`
- [ ] See portfolio page load
- [ ] See default hero section
- [ ] Verify navbar appears
- [ ] Check animations work (scroll the page)
- [ ] No console errors (F12 key)

## Phase 4: Add Content - Sanity Studio

### Open Sanity Studio
- [ ] Run `npx sanity@latest desk`
- [ ] Or visit `https://your-project-id.sanity.studio`
- [ ] Log in with Sanity credentials
- [ ] See document types in left sidebar

### Create Hero Document
- [ ] Click "Hero" in sidebar → "+ Create"
- [ ] Enter your name as **Title**
- [ ] Add your professional **Subtitle**
  - Example: "Full Stack Developer"
- [ ] Write compelling **Description**
- [ ] Upload professional **Image**
- [ ] Customize **CTA Text** (or leave default)
- [ ] Click "Publish" (blue button)
- [ ] Refresh portfolio page
- [ ] See your hero content appear

### Create About Document
- [ ] Click "About" in sidebar → "+ Create"
- [ ] Enter "About Me" or similar as **Title**
- [ ] Write **Intro paragraph**
- [ ] Write **Bio** (use rich text formatting)
  - Add bold, italics, lists as needed
- [ ] Upload your **Image** (headshot or photo)
- [ ] Click "Publish"
- [ ] Scroll portfolio to About section
- [ ] See your about content with animations

### Create Skills Documents
- [ ] Click "Skill" in sidebar → "+ Create"
- [ ] For each skill you know:
  - [ ] Select **Category** (Frontend, Backend, Tools, Other)
  - [ ] Enter **Name** (e.g., "React", "Node.js")
  - [ ] Set **Proficiency** 0-100
    - Entry level: 40-60
    - Intermediate: 60-80
    - Advanced: 80-100
  - [ ] (Optional) Upload **Icon**
  - [ ] Click "Publish"
- [ ] Add at least 3 skills per category
- [ ] Scroll portfolio to Skills section
- [ ] See animated proficiency bars

### Create Project Documents
- [ ] Click "Project" in sidebar → "+ Create"
- [ ] For each project:
  - [ ] Enter **Title** (project name)
  - [ ] Auto-generated **Slug** (check it's clean)
  - [ ] Write **Description** (one-liner)
  - [ ] Write **Content** (full project details)
  - [ ] Upload **Image** (screenshot or hero)
  - [ ] Add **Technologies**:
    - Click "+ Add item"
    - Enter tech name (e.g., "React", "MongoDB")
    - Repeat for each tech
  - [ ] (Optional) Add **Live URL** (if deployed)
  - [ ] (Optional) Add **GitHub URL**
  - [ ] Check **Featured** box for top 2-3 projects
  - [ ] Set **Order** number (lower = appears first)
  - [ ] Click "Publish"
- [ ] Create at least 3 projects
- [ ] Scroll portfolio to Projects section
- [ ] See featured projects + grid

### Create Contact Document
- [ ] Click "Contact" in sidebar → "+ Create"
- [ ] Enter **Title** (e.g., "Get In Touch")
- [ ] Enter your **Email**
- [ ] (Optional) Enter your **Phone**
- [ ] (Optional) Enter your **Location**
- [ ] Add **Social Links**:
  - Click "+ Add item"
  - Platform: "GitHub" → URL: "https://github.com/yourname"
  - Platform: "LinkedIn" → URL: "https://linkedin.com/in/yourname"
  - Platform: "Twitter" → URL: "https://twitter.com/yourname"
  - Repeat for other social media
- [ ] Click "Publish"
- [ ] Scroll portfolio to Contact section
- [ ] See your contact info and social links

## Phase 5: Verify Everything

### Home Page
- [ ] [ ] Navbar visible at top (sticky)
- [ ] [ ] Navigation links work
- [ ] [ ] Your name/title displayed
- [ ] [ ] Your heroImage shows
- [ ] [ ] Animations are smooth

### About Section
- [ ] [ ] Your story is visible
- [ ] [ ] Your about image appears
- [ ] [ ] Text is properly formatted
- [ ] [ ] Scrolls smoothly with page

### Skills Section
- [ ] [ ] All skills grouped by category
- [ ] [ ] Bar animations work on scroll
- [ ] [ ] Proficiency percentages correct
- [ ] [ ] Category names clear

### Projects Section
- [ ] [ ] Featured projects displayed prominently
- [ ] [ ] Project images load
- [ ] [ ] Other projects in grid
- [ ] [ ] Live and GitHub buttons work
- [ ] [ ] Tech stack visible

### Contact Section
- [ ] [ ] Your email is clickable
- [ ] [ ] Social links work (test 1-2)
- [ ] [ ] Phone/location display correctly
- [ ] [ ] Links open in new tab

### Performance
- [ ] [ ] Page loads quickly
- [ ] [ ] Images are optimized
- [ ] [ ] No console errors
- [ ] [ ] Mobile looks good (test on phone)
- [ ] [ ] Animations smooth (60fps ideally)

## Phase 6: Customization (Optional)

### Styling
- [ ] Change primary colors (edit globals.css)
- [ ] Adjust fonts (edit tailwind.config.ts)
- [ ] Modify spacing/padding as desired
- [ ] Test dark mode appearance

### Animations
- [ ] Adjust animation speeds (edit components)
- [ ] Test animations on slower devices
- [ ] Verify accessibility (not too distracting)

### Content
- [ ] Consider adding more projects
- [ ] Expand your bio with more detail
- [ ] Add all relevant skills
- [ ] Update contact info
- [ ] Ensure all links are active

## Phase 7: Production Build

- [ ] Run `npm run build`
- [ ] No build errors
- [ ] Build size is reasonable
- [ ] Run `npm start` to test
- [ ] Verify content still loads

## Phase 8: Deployment (Optional)

### Deploy to Vercel (Easiest)
- [ ] Push code to GitHub
- [ ] Create account at [vercel.com](https://vercel.com)
- [ ] Import your GitHub repository
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Click Deploy
- [ ] Wait for deployment (2-5 minutes)
- [ ] Visit your live site
- [ ] Test all sections work
- [ ] Share your portfolio! 🎉

### Other Deployment Options
- [ ] Netlify (with Vercel functions)
- [ ] Self-hosted server
- [ ] AWS/DigitalOcean
- [ ] Other hosting provider

## Final Checks

- [ ] ✅ All content is published in Sanity
- [ ] ✅ Portfolio loads without errors
- [ ] ✅ All sections have content
- [ ] ✅ Animations work smoothly
- [ ] ✅ Mobile responsive
- [ ] ✅ Images load properly
- [ ] ✅ Links are correct
- [ ] ✅ No console errors
- [ ] ✅ Page title is yours (not "create next app")
- [ ] ✅ Ready to share!

## Troubleshooting Quick Links

If you encounter issues:
1. Check **SETUP.md** - Detailed step-by-step instructions
2. Check **README.md** - Troubleshooting section
3. Check **console errors** - F12 in browser
4. Check **Sanity dashboard** - Are documents published?
5. Check **env variables** - `cat .env.local`

## Next Steps After Setup

- [ ] Add analytics (Google Analytics/Plausible)
- [ ] Set up custom domain (if deployed)
- [ ] Add SEO metadata
- [ ] Get Google PageSpeed insights
- [ ] Monitor with Vercel Analytics
- [ ] Regular content updates
- [ ] Collect feedback from viewers

## Resources

- 📖 [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup
- 📚 [SETUP.md](./SETUP.md) - Detailed walkthrough
- 📘 [README.md](./README.md) - Full documentation
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- 📝 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - What was built

---

## Progress Summary

**Total Phases:** 8
**Key Milestones:**
- ✅ Phase 1-3: Setup (15 minutes)
- ✅ Phase 4-5: Content Creation (30-60 minutes)
- ✅ Phase 6: Customization (optional, 15+ minutes)
- ✅ Phase 7-8: Production (10-30 minutes)

**Estimated Total Time:** 1-2 hours

---

**Once you complete this checklist, you'll have a stunning, professional portfolio ready to impress!** 🚀

Good luck! 🌟
