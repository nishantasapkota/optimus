import { NextResponse } from "next/server"
import { createCloudinarySignature, getCloudinaryConfig } from "@/lib/cloudinary"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Validate file size (25MB max)
        const maxSize = 25 * 1024 * 1024 // 25MB in bytes
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File size exceeds 25MB limit" }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only PDF, DOC, and DOCX are allowed" }, { status: 400 })
        }

        const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
        const timestamp = Math.floor(Date.now() / 1000).toString()
        const folder = process.env.CLOUDINARY_DOCUMENT_FOLDER || "optimus/documents"
        const signature = createCloudinarySignature({ folder, timestamp }, apiSecret)

        const uploadForm = new FormData()
        uploadForm.append("file", file, file.name)
        uploadForm.append("api_key", apiKey)
        uploadForm.append("timestamp", timestamp)
        uploadForm.append("signature", signature)
        uploadForm.append("folder", folder)

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
            method: "POST",
            body: uploadForm,
        })

        const uploadData = await uploadResponse.json()

        if (!uploadResponse.ok) {
            console.error("Cloudinary upload failed:", uploadData)
            return NextResponse.json(
                { error: uploadData?.error?.message || "Failed to upload file" },
                { status: 500 }
            )
        }

        const fileUrl = uploadData.secure_url || uploadData.url

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: file.name
        })
    } catch (error) {
        console.error("Error uploading file:", error)
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
}
