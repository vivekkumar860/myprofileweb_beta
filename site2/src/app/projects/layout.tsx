import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

export const metadata: Metadata = getPageSEO({
  pageTitle: 'Projects',
  pageDesc: 'Explore my portfolio of web development projects built with modern technologies',
  pageKeywords: ['projects', 'portfolio', 'web development', 'React', 'Next.js', 'TypeScript'],
})

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 