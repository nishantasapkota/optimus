import { type NextRequest, NextResponse } from "next/server"
import { createMedia } from "@/lib/db-utils"
import {
  createCloudinarySignature,
  getCloudinaryCloudName,
  getCloudinaryConfig,
  getCloudinaryUploadPreset,
} from "@/lib/cloudinary"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported" }, { status: 400 })
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 })
    }

    const cloudName = getCloudinaryCloudName()
    const uploadPreset = getCloudinaryUploadPreset()
    const folderFromEnv = process.env.CLOUDINARY_MEDIA_FOLDER

    let signedConfig: { apiKey: string; apiSecret: string } | null = null
    let signedError: string | null = null

    try {
      const config = getCloudinaryConfig()
      signedConfig = { apiKey: config.apiKey, apiSecret: config.apiSecret }
    } catch (error) {
      signedError = error instanceof Error ? error.message : "Cloudinary config error"
    }

    if (!signedConfig && !uploadPreset) {
      return NextResponse.json(
        {
          error:
            signedError ||
            "Missing Cloudinary credentials or upload preset. Set CLOUDINARY_URL or CLOUDINARY_UPLOAD_PRESET.",
        },
        { status: 500 },
      )
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const buildSignedForm = () => {
      const signedForm = new FormData()
      signedForm.append("file", file, file.name)
      const timestamp = Math.floor(Date.now() / 1000).toString()
      const folder = folderFromEnv || "optimus/media"
      const signature = createCloudinarySignature({ folder, timestamp }, signedConfig!.apiSecret)

      signedForm.append("api_key", signedConfig!.apiKey)
      signedForm.append("timestamp", timestamp)
      signedForm.append("signature", signature)
      signedForm.append("folder", folder)
      return signedForm
    }

    const buildUnsignedForm = () => {
      const unsignedForm = new FormData()
      unsignedForm.append("file", file, file.name)
      unsignedForm.append("upload_preset", uploadPreset)
      if (folderFromEnv) {
        unsignedForm.append("folder", folderFromEnv)
      }
      return unsignedForm
    }

    let uploadData: any = null
    let uploadResponse: Response | null = null

    if (signedConfig) {
      uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: buildSignedForm(),
      })
      uploadData = await uploadResponse.json()
    }

    const shouldFallback =
      (!uploadResponse || !uploadResponse.ok) &&
      uploadPreset &&
      (uploadData?.error?.message?.toLowerCase().includes("signature") || !uploadResponse?.ok)

    if (shouldFallback) {
      uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: buildUnsignedForm(),
      })
      uploadData = await uploadResponse.json()
    }

    if (!uploadResponse?.ok) {
      console.error("Cloudinary upload failed:", uploadData)
      return NextResponse.json(
        { error: uploadData?.error?.message || "Upload failed" },
        { status: 500 },
      )
    }

    // Save metadata to MongoDB
    const mediaData = {
      fileName: uploadData.public_id,
      originalName: file.name,
      url: uploadData.secure_url,
      size: uploadData.bytes ?? file.size,
      mimeType: file.type,
    }

    const result = await createMedia(mediaData)

    return NextResponse.json({
      success: true,
      media: {
        _id: result.insertedId,
        ...mediaData,
      },
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
