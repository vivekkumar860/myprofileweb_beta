export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface FooterLink {
  title: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
} 