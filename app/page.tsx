import { WardrobeHeader } from "@/components/wardrobe-header"
import { WardrobeUploader } from "@/components/wardrobe-uploader"
import { WardrobeGrid } from "@/components/wardrobe-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <WardrobeHeader />
      <div className="container mx-auto px-4 py-6 space-y-8">
        <WardrobeUploader />
        <WardrobeGrid />
      </div>
    </main>
  )
}