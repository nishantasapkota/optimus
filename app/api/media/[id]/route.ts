import { type NextRequest, NextResponse } from "next/server"
import { getMediaById, updateMedia, deleteMedia } from "@/lib/db-utils"
import {
  createCloudinarySignature,
  getCloudinaryConfig,
  isCloudinaryUrl,
} from "@/lib/cloudinary"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const media = await getMediaById(id)

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 })
    }

    return NextResponse.json(media)
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const result = await updateMedia(id, body)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating media:", error)
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const media = await getMediaById(id)

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 })
    }

    if (isCloudinaryUrl(media.url)) {
      try {
        const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
        const timestamp = Math.floor(Date.now() / 1000).toString()
        const signature = createCloudinarySignature(
          { public_id: media.fileName, timestamp },
          apiSecret,
        )

        const destroyForm = new FormData()
        destroyForm.append("public_id", media.fileName)
        destroyForm.append("api_key", apiKey)
        destroyForm.append("timestamp", timestamp)
        destroyForm.append("signature", signature)

        const destroyResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            method: "POST",
            body: destroyForm,
          },
        )

        const destroyData = await destroyResponse.json()
        if (!destroyResponse.ok || destroyData?.result !== "ok") {
          console.error("Cloudinary delete failed:", destroyData)
          return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
        }
      } catch (error) {
        console.warn("Skipping Cloudinary delete due to config error:", error)
      }
    }

    // Delete from MongoDB
    await deleteMedia(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting media:", error)
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
  }
}
