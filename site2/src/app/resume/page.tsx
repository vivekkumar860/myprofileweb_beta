'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Briefcase, GraduationCap, Star, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'
import resumeData from '@/data/resume.json'

interface WorkExperience {
  id: string
  jobTitle: string
  company: string
  duration: string
  location: string
  description: string
}

interface Education {
  id: string
  degree: string
  institution: string
  duration: string
  location: string
  description: string
}

interface SkillItem {
  name: string
  level: string
}

export default function ResumePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
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

  const timelineVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-500 text-white'
      case 'Intermediate':
        return 'bg-yellow-500 text-white'
      case 'Basic':
        return 'bg-gray-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Resume
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              My professional experience, education, and technical skills in web development.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Work Experience */}
        <motion.div 
          className="lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
          </motion.div>

          <div className="space-y-6">
            {resumeData.workExperience.map((job: WorkExperience, index: number) => (
              <motion.div
                key={job.id}
                variants={timelineVariants}
                className="relative"
              >
                {/* Timeline line */}
                {index < resumeData.workExperience.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                )}
                
                <Card className="relative ml-12">
                  <div className="absolute -left-6 top-4 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{job.jobTitle}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground">
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {job.duration}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Skills</h2>
            </div>
          </motion.div>

          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <motion.div key={category} variants={itemVariants}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: SkillItem) => (
                      <div key={skill.name} className="flex items-center gap-1">
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                        >
                          {skill.name}
                        </Badge>
                        <Badge 
                          className={`text-xs ${getLevelColor(skill.level)}`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Education */}
      <motion.div 
        className="mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.education.map((edu: Education) => (
            <motion.div
              key={edu.id}
              variants={timelineVariants}
              className="relative"
            >
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <CardDescription className="text-base font-medium text-foreground">
                        {edu.institution}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 