import { NextRequest, NextResponse } from "next/server"
import { getCloudinaryConfig } from "@/lib/cloudinary"

export const runtime = "nodejs"

type ExtractedPublicId = {
  publicId: string
  resourceType: "raw" | "image" | "video"
  deliveryType: "upload" | "authenticated" | "private"
}

function extractPublicIdFromUrl(url: URL, cloudName: string): ExtractedPublicId | null {
  const expectedPrefix = `/${cloudName}/`
  if (!url.pathname.includes(expectedPrefix)) return null

  const typedMatch = url.pathname.match(/\/(image|video|raw)\/(upload|authenticated|private)\/(.+)$/)
  const fallbackMatch = url.pathname.match(/\/(image|video|raw)\/(.+)$/)
  const match = typedMatch || fallbackMatch

  if (!match) return null

  const resourceType = match[1] as ExtractedPublicId["resourceType"]
  const deliveryType = (match[2] === "authenticated" || match[2] === "private" || match[2] === "upload")
    ? (match[2] as ExtractedPublicId["deliveryType"])
    : "upload"
  let publicId = (typedMatch ? match[3] : match[2]) || ""
  publicId = publicId.replace(/^v\d+\//, "")
  publicId = publicId.replace(/^\/+/, "")

  if (!publicId) return null

  return { publicId, resourceType, deliveryType }
}

export async function GET(request: NextRequest) {
  try {
    const urlParam = request.nextUrl.searchParams.get("url")
    if (!urlParam) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
    }

    const decodedUrl = decodeURIComponent(urlParam)
    let parsedUrl: URL
    try {
      parsedUrl = new URL(decodedUrl)
    } catch {
      return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 })
    }

    if (!parsedUrl.hostname.endsWith("res.cloudinary.com")) {
      return NextResponse.json({ error: "Unsupported document host" }, { status: 400 })
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()

    const extractedPublicId = extractPublicIdFromUrl(parsedUrl, cloudName)
    if (!extractedPublicId) {
      return NextResponse.json({ error: "Invalid Cloudinary document URL" }, { status: 400 })
    }
    const decodedPublicId = decodeURIComponent(extractedPublicId.publicId)
    const withoutExtension = decodedPublicId.replace(/\.[^/.]+$/, "")
    const publicIdCandidates = Array.from(new Set([decodedPublicId, withoutExtension].filter(Boolean)))

    const resourceTypeOrder = Array.from(
      new Set([
        extractedPublicId.resourceType,
        "raw",
        "image",
        "video",
      ]),
    ) as ExtractedPublicId["resourceType"][]

    const deliveryTypeOrder = Array.from(
      new Set([
        extractedPublicId.deliveryType,
        "upload",
        "authenticated",
        "private",
      ]),
    ) as ExtractedPublicId["deliveryType"][]

    const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")

    let lastError: any = null

    const attemptDownload = async (
      resourceType: ExtractedPublicId["resourceType"],
      deliveryType: ExtractedPublicId["deliveryType"],
      publicId: string,
    ) => {
      const formData = new FormData()
      formData.append("public_id", publicId)
      formData.append("attachment", "true")
      formData.append("type", deliveryType)

      const downloadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/download`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${authHeader}`,
          },
          body: formData,
        },
      )

      const contentType = downloadResponse.headers.get("content-type") || ""

      if (!downloadResponse.ok) {
        const errorPayload = contentType.includes("application/json")
          ? await downloadResponse.json()
          : { error: "Failed to download document" }
        return { ok: false as const, errorPayload }
      }

      return { ok: true as const, response: downloadResponse }
    }

    const respondWithDownload = async (downloadResponse: Response, publicId: string) => {
      const contentType = downloadResponse.headers.get("content-type") || ""
      const buffer = await downloadResponse.arrayBuffer()
      const responseHeaders = new Headers()
      const disposition = downloadResponse.headers.get("content-disposition")

      if (contentType) {
        responseHeaders.set("content-type", contentType)
      }
      if (disposition) {
        responseHeaders.set("content-disposition", disposition)
      } else {
        responseHeaders.set("content-disposition", `attachment; filename="${publicId.split("/").pop()}"`)
      }
      responseHeaders.set("cache-control", "private, no-store")

      return new NextResponse(buffer, {
        status: 200,
        headers: responseHeaders,
      })
    }

    const resolvePublicId = async (
      resourceType: ExtractedPublicId["resourceType"],
      deliveryType: ExtractedPublicId["deliveryType"],
      prefix: string,
    ) => {
      const searchUrl = new URL(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/${deliveryType}`,
      )
      searchUrl.searchParams.set("prefix", prefix)
      searchUrl.searchParams.set("max_results", "1")

      const searchResponse = await fetch(searchUrl, {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      })

      if (!searchResponse.ok) return null

      const payload = await searchResponse.json()
      const resource = payload?.resources?.[0]
      return typeof resource?.public_id === "string" ? resource.public_id : null
    }

    for (const resourceType of resourceTypeOrder) {
      for (const deliveryType of deliveryTypeOrder) {
        for (const publicId of publicIdCandidates) {
          const result = await attemptDownload(resourceType, deliveryType, publicId)
          if (result.ok) {
            return respondWithDownload(result.response, publicId)
          }

          lastError = result.errorPayload
          const message = (result.errorPayload?.error?.message || result.errorPayload?.error || "").toString()
          if (message.includes("Resource not found") && publicIdCandidates.length > 1) {
            continue
          }
        }
      }
    }

    const prefix = withoutExtension || decodedPublicId
    if (prefix) {
      for (const resourceType of resourceTypeOrder) {
        for (const deliveryType of deliveryTypeOrder) {
          const resolvedId = await resolvePublicId(resourceType, deliveryType, prefix)
          if (!resolvedId) {
            continue
          }

          const result = await attemptDownload(resourceType, deliveryType, resolvedId)
          if (result.ok) {
            return respondWithDownload(result.response, resolvedId)
          }

          lastError = result.errorPayload
          const message = (result.errorPayload?.error?.message || result.errorPayload?.error || "").toString()
          if (message.includes("Resource not found")) {
            continue
          }

          console.error("Cloudinary download failed:", result.errorPayload)
          return NextResponse.json(
            { error: result.errorPayload?.error?.message || result.errorPayload?.error || "Failed to download document" },
            { status: 500 },
          )
        }
      }
    }

    console.error("Cloudinary download failed:", lastError)
    return NextResponse.json(
      { error: lastError?.error?.message || lastError?.error || "Failed to download document" },
      { status: 500 },
    )
  } catch (error) {
    console.error("Document download error:", error)
    return NextResponse.json({ error: "Failed to download document" }, { status: 500 })
  }
}
