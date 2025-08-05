"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  liveLink: string
  githubLink: string
  thumbnail: string
  category: string
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSave = async (project: Project) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
      if (response.ok) {
        fetchProjects()
        setEditingProject(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Project Management</h2>
        <Button onClick={() => setIsEditing(true)}>Add New Project</Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProject ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={editingProject?.title || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject!,
                    title: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Category"
                value={editingProject?.category || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject!,
                    category: e.target.value,
                  })
                }
              />
            </div>
            <Textarea
              placeholder="Description"
              value={editingProject?.description || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject!,
                  description: e.target.value,
                })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Live Link"
                value={editingProject?.liveLink || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject!,
                    liveLink: e.target.value,
                  })
                }
              />
              <Input
                placeholder="GitHub Link"
                value={editingProject?.githubLink || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject!,
                    githubLink: e.target.value,
                  })
                }
              />
            </div>
            <Input
              placeholder="Thumbnail URL"
              value={editingProject?.thumbnail || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject!,
                  thumbnail: e.target.value,
                })
              }
            />
            <Input
              placeholder="Tech Stack (comma separated)"
              value={editingProject?.techStack?.join(", ") || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject!,
                  techStack: e.target.value.split(", ").filter(Boolean),
                })
              }
            />
            <div className="flex gap-2">
              <Button onClick={() => handleSave(editingProject!)}>
                Save Project
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setEditingProject(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {project.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProject(project)
                      setIsEditing(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 text-sm">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 