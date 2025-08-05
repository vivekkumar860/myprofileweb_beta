"use client"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthSignin":
        return "There was an error signing in with Google. Please check your credentials."
      case "OAuthCallback":
        return "There was an error during the authentication callback."
      case "OAuthCreateAccount":
        return "Could not create OAuth account."
      case "EmailCreateAccount":
        return "Could not create email account."
      case "Callback":
        return "There was an error during the callback."
      case "OAuthAccountNotLinked":
        return "This account is not linked to any existing user."
      case "EmailSignin":
        return "Check your email for a sign-in link."
      case "CredentialsSignin":
        return "Sign in failed. Check the details you provided are correct."
      case "SessionRequired":
        return "Please sign in to access this page."
      default:
        return "An error occurred during authentication."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            {getErrorMessage(error)}
          </p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/auth/signin">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 