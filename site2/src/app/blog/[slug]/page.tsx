import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/mdx.server'
import { getPageSEO } from '@/lib/seo'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return getPageSEO({
    pageTitle: post.title,
    pageDesc: post.description,
    pageKeywords: post.tags,
    pageImage: post.image,
    canonical: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Post Image */}
        {post.image && (
          <div className="mb-8">
            <div className="relative h-64 overflow-hidden rounded-lg bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/50">
                  {post.title.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom components for better styling
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="ml-4">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={className}>
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border-collapse border border-border">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border px-4 py-2 bg-muted font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-4 py-2">
                  {children}
                </td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/blog">
                ← Back to Blog
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  )
} 