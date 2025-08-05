import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { isAdmin } from "@/config/auth.config"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, slug } = await req.json()
    
    // Create the MDX content with frontmatter
    const mdxContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
description: "${title}"
---

${content}
`
    
    // Write to the blog directory
    const blogDir = path.join(process.cwd(), "src/content/blog")
    const filePath = path.join(blogDir, `${slug}.mdx`)
    
    await writeFile(filePath, mdxContent)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
} 