import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { isAdmin } from "@/config/auth.config"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !isAdmin(session.user?.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.formData()
    const file = data.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), "public", "resume.pdf")
    await writeFile(filePath, buffer)

    return NextResponse.json({ message: "Uploaded!" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
} 