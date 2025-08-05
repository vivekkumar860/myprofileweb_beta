import type { Metadata } from 'next'
import { getPageSEO } from '@/lib/seo'

export const metadata: Metadata = getPageSEO({
  pageTitle: 'Resume',
  pageDesc: 'Professional resume showcasing work experience, education, and technical skills in web development',
  pageKeywords: ['resume', 'experience', 'education', 'skills', 'web development', 'career'],
})

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 