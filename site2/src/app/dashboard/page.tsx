import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { isAdmin } from "@/config/auth.config"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProjectManager } from "@/components/admin/project-manager"
import { BlogManager } from "@/components/admin/blog-manager"
import { ResumeUploader } from "@/components/admin/resume-uploader"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || !isAdmin(session.user?.email)) {
    return null // Or redirect
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectManager />
        </TabsContent>
        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>
        <TabsContent value="resume">
          <ResumeUploader />
        </TabsContent>
      </Tabs>
    </div>
  )
} 