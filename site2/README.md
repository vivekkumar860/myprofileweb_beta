# Next.js 14 Website with TypeScript, Tailwind CSS, and ShadCN UI

A modern, fully-featured Next.js 14 website built with TypeScript, Tailwind CSS, and ShadCN UI. This project includes dark/light mode toggle, SEO optimization, responsive design, and a complete component library.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ShadCN UI** for beautiful components
- **Dark/Light Mode** toggle with system preference support
- **SEO Optimization** with meta tags and Open Graph
- **Responsive Design** that works on all devices
- **Modern UI/UX** with smooth animations and transitions
- **Component Library** with reusable UI components
- **Performance Optimized** with Next.js best practices

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   ├── theme-provider.tsx # Theme provider
│   └── theme-toggle.tsx  # Theme toggle component
├── config/               # Configuration files
│   └── theme.ts          # Theme and site configuration
├── hooks/                # Custom React hooks
│   └── use-seo.ts        # SEO management hook
├── lib/                  # Utility libraries
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
│   └── index.ts          # Global type definitions
└── styles/               # Additional styles (if needed)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Theme**: next-themes
- **Forms**: React Hook Form (ready to add)
- **Validation**: Zod (ready to add)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd site2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Theme Configuration

Edit `src/config/theme.ts` to customize:
- Site name and description
- Social media links
- Theme colors and settings

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Use the `useSEO` hook for SEO optimization

### Adding New Components

1. Create components in `src/components/`
2. For UI components, use `npx shadcn@latest add <component-name>`
3. Import and use in your pages

## 🔧 Configuration

### ShadCN UI

The project is configured with ShadCN UI. To add new components:

```bash
npx shadcn@latest add <component-name>
```

### Tailwind CSS

Tailwind CSS is configured with custom colors and dark mode support. Edit `tailwind.config.ts` for customization.

### SEO

Each page uses the `useSEO` hook for dynamic SEO management. The root layout includes comprehensive meta tags and Open Graph support.

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Responsive navigation
- Adaptive layouts
- Touch-friendly interactions

## 🌙 Dark Mode

Dark mode is implemented with:
- System preference detection
- Manual toggle
- Smooth transitions
- Persistent preference storage

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
