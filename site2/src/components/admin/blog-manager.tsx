"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogManager() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [slug, setSlug] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          slug,
        }),
      })
      
      if (response.ok) {
        alert("Blog post created successfully!")
        setTitle("")
        setContent("")
        setSlug("")
      }
    } catch (error) {
      console.error("Error creating blog post:", error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Blog Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog post title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="enter-blog-post-slug"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Content (MDX)</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content in MDX format..."
                rows={15}
                required
              />
            </div>
            
            <Button type="submit">Create Blog Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 