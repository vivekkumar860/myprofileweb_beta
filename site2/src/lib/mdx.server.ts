import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  readingTime: string
  excerpt: string
  content: string
}

export const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR)
  return files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fileContent = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8')
    const { data, content } = matter(fileContent)
    const excerpt = content.slice(0, 300) + '...'
    const time = readingTime(content).text

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      image: data.image || '',
      readingTime: time,
      excerpt,
      content,
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)
    const time = readingTime(content).text

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      image: data.image || '',
      readingTime: time,
      excerpt: content.slice(0, 300) + '...',
      content,
    }
  } catch {
    return null
  }
} 