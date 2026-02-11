import crypto from "crypto"

type CloudinaryConfig = {
  cloudName: string
  apiKey: string
  apiSecret: string
}

type CloudinaryParsedUrl = {
  cloudName: string
  apiKey?: string
  apiSecret?: string
}

function parseCloudinaryUrl(): CloudinaryParsedUrl | null {
  const cloudinaryUrl = process.env.CLOUDINARY_URL
  if (!cloudinaryUrl) return null

  const cleaned = cloudinaryUrl.trim().replace(/^['"]|['"]$/g, "")

  try {
    const parsed = new URL(cleaned)

    if (!parsed.hostname) return null

    return {
      cloudName: parsed.hostname,
      apiKey: parsed.username || undefined,
      apiSecret: parsed.password || undefined,
    }
  } catch (_error) {
    return null
  }
}

export function getCloudinaryCloudName() {
  const parsed = parseCloudinaryUrl()
  if (parsed?.cloudName) return parsed.cloudName

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    throw new Error("Missing Cloudinary cloud name. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME.")
  }

  return cloudName
}

export function getCloudinaryUploadPreset() {
  return (
    process.env.CLOUDINARY_UPLOAD_PRESET ||
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
    ""
  )
}

export function getCloudinaryConfig(): CloudinaryConfig {
  const parsed = parseCloudinaryUrl()
  if (parsed) {
    if (!parsed.apiKey || !parsed.apiSecret) {
      throw new Error("CLOUDINARY_URL is missing required parts")
    }
    return {
      cloudName: parsed.cloudName,
      apiKey: parsed.apiKey,
      apiSecret: parsed.apiSecret,
    }
  }

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary credentials. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.",
    )
  }

  return { cloudName, apiKey, apiSecret }
}

export function createCloudinarySignature(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&")
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex")
}

export function isCloudinaryUrl(url?: string | null) {
  return Boolean(url && url.includes("res.cloudinary.com"))
}
