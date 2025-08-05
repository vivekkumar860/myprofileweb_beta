"use client"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign In to Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => signIn("google")} 
            className="w-full"
            size="lg"
          >
            Sign in with Google
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Only authorized users can access the admin dashboard.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 