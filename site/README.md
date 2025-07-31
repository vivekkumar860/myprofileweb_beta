# 🚀 Vivek Kumar - Enhanced Portfolio Website (Beta)

A modern, responsive portfolio website built with **Next.js 15** and **React 18**, featuring sophisticated animations, smart navigation, and professional design.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Smart Navigation**: Auto-hide on scroll down, appears on scroll up
- **Sophisticated Hover Effects**: Inspired by Stripe, Linear, Apple, and Vercel
- **Glassmorphism Design**: Modern backdrop blur effects with gradients
- **Professional Animations**: Smooth Framer Motion transitions
- **Mobile-First Responsive**: Optimized for all devices

### 📱 **Enhanced Sections**
- **Hero Section**: Dynamic typewriter effect with animated profile
- **About**: Professional introduction with enhanced styling
- **Skills**: Interactive skill showcase with statistics
- **Portfolio**: Project showcase with loading states and hover effects
- **Certificates**: Professional credentials display
- **Achievements**: Timeline-style accomplishments
- **Contact**: Validated contact form with modern styling

## 🚀 **Getting Started**

### **Local Development**

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### **Building for Production**

To build the application for production:

```bash
npm run build
```

This will create an optimized production build with static export.

### **GitHub Pages Deployment**

This project is configured for deployment to GitHub Pages:

1. **Manual Deployment**: Use `npm run gh-deploy` to deploy directly
2. **GitHub Actions**: Uses workflow in `.github/workflows/deploy.yml` (backup option)
3. **Static Export**: Next.js builds to static files in the `out` directory
4. **Live URL**: Available at `https://vivekkumar860.github.io/myprofileweb_beta/`

#### **✅ GitHub Pages Setup (COMPLETED)**
The `gh-pages` branch has been created and your site is ready! 

**✅ FIXED: UI Consistency Issue**
- **Problem**: Different UI between localhost and GitHub Pages
- **Solution**: Separate build configurations using environment variables
- **Result**: Both versions now display identically

**To configure GitHub Pages:**
1. Go to your repository **Settings** → **Pages**
2. Select **Deploy from a branch**
3. Choose **gh-pages** branch
4. Click **Save**

#### **Manual Deployment**
```bash
npm run gh-deploy
```

## 🌐 **Deployment Options**

### **Option 1: GitHub Pages (Free)**
- ✅ **Automatic**: Push triggers deployment
- ✅ **Free hosting** for public repositories
- ✅ **Custom domain** support available
- ✅ **HTTPS** enabled by default
- 🔗 **Live at**: `https://vivekkumar860.github.io/myprofileweb_beta/`

### **Option 2: Vercel (Recommended for Dynamic Features)**

### **Option 2: Vercel (Recommended for Dynamic Features)**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `vivekkumar860/myprofileweb_beta`
4. Deploy automatically ⚡

### **Option 3: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Connect to GitHub and select your repository
4. Deploy with default settings 🚀

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel for content management
│   ├── api/               # API routes (disabled for static export)
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   ├── Navigation.js      # Smart navigation with hover effects
│   ├── EnhancedHomepage.js # Hero section with animations
│   ├── About.js           # About section
│   ├── EnhancedSkills.js  # Skills showcase
│   ├── EnhancedWorkShowcase.js # Project portfolio
│   ├── Certificates.js    # Professional credentials
│   ├── Achievements.js    # Career highlights
│   ├── Contact.js         # Contact form
│   └── Footer.js          # Site footer
.github/
└── workflows/
    └── deploy.yml         # GitHub Actions deployment
public/                    # Static assets
├── profile.jpg           # Profile image
├── project*.jpg          # Project screenshots
└── siteContent.json      # Site content data
out/                       # Generated static files (after build)
```

## ⚙️ **GitHub Pages Configuration**

The project includes specific configurations for GitHub Pages:

- **Static Export**: `output: 'export'` in `next.config.mjs`
- **Base Path**: Configured for repository name `/myprofileweb_beta`
- **Image Optimization**: Disabled for static compatibility
- **Trailing Slashes**: Enabled for proper routing
- **GitHub Actions**: Automated deployment workflow

### **Technical Notes for GitHub Pages**
- ⚠️ **API Routes**: Disabled (server-side features not supported)
- ✅ **Static Content**: All content from `siteContent.json`
- ✅ **Client-side Routing**: Works with trailing slashes
- ✅ **Images**: Unoptimized but functional
- ✅ **Animations**: Full Framer Motion support maintained
- ✅ **UI Consistency**: Fixed path configuration for identical localhost/GitHub Pages display

### **Development vs Production Builds**
- **Development** (`npm run dev`): No base path, runs on localhost
- **GitHub Pages** (`npm run gh-deploy`): Uses `/myprofileweb_beta` base path
- **Environment Variable**: `GITHUB_PAGES=true` enables correct path configuration
