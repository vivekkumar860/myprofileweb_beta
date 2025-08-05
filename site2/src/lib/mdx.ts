import { getAllPosts as getAllPostsServer, getPostBySlug as getPostBySlugServer } from './mdx.server'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  content: string
  readingTime: string
  excerpt: string
}

export function getAllPosts(): BlogPost[] {
  return getAllPostsServer()
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    return getPostBySlugServer(slug)
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
} 