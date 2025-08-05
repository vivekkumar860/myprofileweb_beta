'use client'

import { useEffect } from 'react'
import type { SEOProps } from '@/types'
import { siteConfig } from '@/config/theme'

export function useSEO({
  title,
  description,
  keywords = [],
  ogImage,
  canonical,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
    document.title = fullTitle

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || siteConfig.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description || siteConfig.description
      document.head.appendChild(meta)
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords.join(', '))
    } else if (keywords.length > 0) {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = keywords.join(', ')
      document.head.appendChild(meta)
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical || window.location.href)
    } else {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = canonical || window.location.href
      document.head.appendChild(link)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = fullTitle
      document.head.appendChild(meta)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description || siteConfig.description)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = description || siteConfig.description
      document.head.appendChild(meta)
    }

    const ogImageElement = document.querySelector('meta[property="og:image"]')
    if (ogImageElement) {
      ogImageElement.setAttribute('content', ogImage || siteConfig.ogImage)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:image')
      meta.content = ogImage || siteConfig.ogImage
      document.head.appendChild(meta)
    }
  }, [title, description, keywords, ogImage, canonical])
} 