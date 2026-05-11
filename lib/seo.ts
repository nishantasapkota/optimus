import type { Metadata } from "next"

export const siteName = "Optimus Global"
export const productionSiteUrl = "https://www.optimusglobaledu.com"
export const defaultSeoDescription =
  "Expert education consulting insights, university updates, scholarship guidance, and study abroad resources from Optimus Global."

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : productionSiteUrl)

  return rawUrl.replace(/\/$/, "")
}

export function absoluteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return getSiteUrl()

  try {
    return new URL(pathOrUrl).toString()
  } catch {
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
    return `${getSiteUrl()}${path}`
  }
}

export function cleanText(value?: string | null, fallback = "") {
  if (!value) return fallback

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

export function truncateText(value: string, maxLength = 160) {
  if (value.length <= maxLength) return value

  const truncated = value.slice(0, maxLength - 1).trimEnd()
  const lastSpace = truncated.lastIndexOf(" ")
  return `${truncated.slice(0, lastSpace > 80 ? lastSpace : truncated.length)}...`
}

export function buildSeoDescription(excerpt?: string | null, content?: string | null) {
  return truncateText(cleanText(excerpt) || cleanText(content) || defaultSeoDescription)
}

export const defaultOpenGraphImage = {
  url: "/placeholder-logo.png",
  width: 1200,
  height: 630,
  alt: siteName,
}

export function createPageMetadata({
  title,
  description = defaultSeoDescription,
  path = "/",
  images = [defaultOpenGraphImage],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  images?: NonNullable<Metadata["openGraph"]>["images"]
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)

  return {
    title,
    description,
    keywords: tags,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: "en_US",
      type,
      images,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  }
}
