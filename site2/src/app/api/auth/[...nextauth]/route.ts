import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session // session.user.email will be used for admin check
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 