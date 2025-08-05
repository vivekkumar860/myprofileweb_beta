import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx.server'

export default function BlogPage() {
  const posts = getAllPosts()




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
      <div className="mb-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Thoughts, tutorials, and insights about web development, programming, and technology.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              {/* Post Image */}
              {post.image && (
                <div className="relative h-48 overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-muted-foreground/50">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Read More Button */}
                <Button asChild size="sm" className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
} 