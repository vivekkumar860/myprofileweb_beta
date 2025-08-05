import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { isAdmin } from "@/config/auth.config"
import { readFile, writeFile } from "fs/promises"
import path from "path"

const PROJECTS_FILE = path.join(process.cwd(), "src/data/projects.json")

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    
    // Read existing projects
    const data = await readFile(PROJECTS_FILE, "utf-8")
    const projects = JSON.parse(data)
    
    // Filter out the project to delete
    const filteredProjects = projects.filter((project: any) => project.id !== id)
    
    // Write back to file
    await writeFile(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
} 