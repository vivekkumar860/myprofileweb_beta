'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Github, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import projectsData from '@/data/projects.json'

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

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState<string>('All')

  // Get all unique tech stacks for filter
  const allTechStacks = useMemo(() => {
    const techSet = new Set<string>()
    projectsData.forEach((project: Project) => {
      project.techStack.forEach(tech => techSet.add(tech))
    })
    return ['All', ...Array.from(techSet).sort()]
  }, [])

  // Filter projects based on search and tech filter
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project: Project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTech = selectedTech === 'All' || project.techStack.includes(selectedTech)
      
      return matchesSearch && matchesTech
    })
  }, [searchTerm, selectedTech])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
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
          My Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Explore my portfolio of web development projects built with modern technologies and best practices.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tech Stack Filter */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 mr-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
          </div>
          {allTechStacks.map((tech) => (
            <Badge
              key={tech}
              variant={selectedTech === tech ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projectsData.length} projects
        </p>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                layout
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-muted-foreground/50">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-sm">
                Try adjusting your search terms or filter criteria.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedTech('All')
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 