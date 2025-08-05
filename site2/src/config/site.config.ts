export const siteConfig = {
  // Basic site information
  title: 'My Website',
  description: 'A modern Next.js website with TypeScript, Tailwind CSS, and ShadCN UI',
  siteUrl: 'https://example.com',
  ogImage: 'https://example.com/og-image.jpg',
  
  // SEO keywords
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'ShadCN UI',
    'Web Development',
    'Frontend Development',
    'Modern Web',
    'Responsive Design',
    'Dark Mode',
    'SEO Optimized'
  ],
  
  // Creator information
  creator: 'Your Name',
  creatorEmail: 'hello@example.com',
  
  // Social media handles
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'hello@example.com'
  },
  
  // Additional metadata
  author: {
    name: 'Your Name',
    url: 'https://example.com'
  },
  
  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'My Website'
  },
  
  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    creator: '@yourusername',
    site: '@yourusername'
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  
  // Manifest
  manifest: '/site.webmanifest'
} as const

export type SiteConfig = typeof siteConfig 