import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site.config'
import type { FooterLink, SocialLink } from '@/types'

const footerLinks: FooterLink[] = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'Privacy',
    href: '/privacy',
  },
  {
    title: 'Terms',
    href: '/terms',
  },
]

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: siteConfig.social.github,
    icon: Github,
  },
  {
    name: 'Twitter',
    href: siteConfig.social.twitter,
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{siteConfig.title}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 