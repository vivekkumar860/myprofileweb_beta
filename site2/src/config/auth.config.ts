export const ADMIN_EMAILS = ["your.email@gmail.com"] // change this

export const isAdmin = (email: string | null | undefined) => {
  return ADMIN_EMAILS.includes(email || "")
} 