import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { isAdmin } from "@/config/auth.config"
import { readFile, writeFile } from "fs/promises"
import path from "path"

const PROJECTS_FILE = path.join(process.cwd(), "src/data/projects.json")

// Helper function to validate project data
function validateProject(project: any) {
  const requiredFields = ['title', 'description', 'techStack', 'liveLink', 'githubLink', 'category']
  const missingFields = requiredFields.filter(field => !project[field])
  
  if (missingFields.length > 0) {
    return { valid: false, error: `Missing required fields: ${missingFields.join(', ')}` }
  }
  
  if (!Array.isArray(project.techStack)) {
    return { valid: false, error: 'techStack must be an array' }
  }
  
  return { valid: true }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects = JSON.parse(data)
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const project = await req.json()
    
    // Validate project data
    const validation = validateProject(project)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }
    
    // Read existing projects
    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects = JSON.parse(data)
    
    // Generate new ID if not provided
    if (!project.id) {
      const maxId = Math.max(...projects.map((p: any) => parseInt(p.id) || 0), 0)
      project.id = (maxId + 1).toString()
    }
    
    // Check if project with same ID already exists
    const existingIndex = projects.findIndex((p: any) => p.id === project.id)
    if (existingIndex >= 0) {
      projects[existingIndex] = project
    } else {
      projects.push(project)
    }
    
    // Write back to file
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: existingIndex >= 0 ? "Project updated successfully" : "Project added successfully",
      project 
    })
  } catch (error) {
    console.error("Error saving project:", error)
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 })
  }
} 