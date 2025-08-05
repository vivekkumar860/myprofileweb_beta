"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      const response = await fetch("/api/admin/upload-resume", {
        method: "POST",
        body: formData,
      })
      
      if (response.ok) {
        alert("Resume uploaded successfully!")
        setFile(null)
      } else {
        alert("Failed to upload resume")
      }
    } catch (error) {
      console.error("Error uploading resume:", error)
      alert("Error uploading resume")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Resume Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          {file && (
            <div className="text-sm text-gray-600">
              Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 