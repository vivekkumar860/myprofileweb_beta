import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

export const metadata: Metadata = getPageSEO({
  pageTitle: 'Blog',
  pageDesc: 'Thoughts, tutorials, and insights about web development, programming, and technology',
  pageKeywords: ['blog', 'web development', 'programming', 'tutorials', 'technology'],
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 