import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'

interface PageSEOProps {
  pageTitle?: string
  pageDesc?: string
  pageKeywords?: string[]
  pageImage?: string
  canonical?: string
}

interface StructuredDataProps {
  '@type': string
  name?: string
  description?: string
  url?: string
  image?: string
  [key: string]: unknown
}

export function getPageSEO({
  pageTitle,
  pageDesc,
  pageKeywords = [],
  pageImage,
  canonical,
}: PageSEOProps = {}): Metadata {
  const title = pageTitle 
    ? `${pageTitle} | ${siteConfig.title}`
    : siteConfig.title

  const description = pageDesc || siteConfig.description
  const keywords = [...siteConfig.keywords, ...pageKeywords]
  const image = pageImage || siteConfig.ogImage
  const url = canonical || siteConfig.siteUrl

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.title}`,
    },
    description,
    keywords,
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.url,
      },
    ],
    creator: siteConfig.creator,
    openGraph: {
      type: siteConfig.openGraph.type,
      locale: siteConfig.openGraph.locale,
      url,
      title,
      description,
      siteName: siteConfig.openGraph.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card,
      title,
      description,
      images: [image],
      creator: siteConfig.twitter.creator,
      site: siteConfig.twitter.site,
    },
    icons: siteConfig.icons,
    manifest: siteConfig.manifest,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Helper function for generating structured data
export function getStructuredData(type: 'website' | 'article' | 'organization', data: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  }

  return {
    ...baseData,
    ...data,
  }
}

// Helper function for generating JSON-LD script
export function generateJsonLd(type: 'website' | 'article' | 'organization', data: StructuredDataProps) {
  const structuredData = getStructuredData(type, data)
  
  return {
    __html: JSON.stringify(structuredData),
  }
} 