"use client"

import { Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"

export function WardrobeUploader() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setUploading(false)
        setProgress(0)
        toast({
          title: "Upload Complete",
          description: `Successfully uploaded ${acceptedFiles.length} items`,
        })
      }
    }, 500)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heif']
    },
    multiple: true
  })

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragActive ? "border-primary bg-primary/10" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Upload Wardrobe Items</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop images here, or click to select files
        </p>
        <Button className="mt-4" disabled={uploading}>
          Select Files
        </Button>
      </div>
      {uploading && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  )
}