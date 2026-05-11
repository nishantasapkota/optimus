import type { MetadataRoute } from "next"
import { getBlogs } from "@/lib/db-utils"
import { absoluteUrl } from "@/lib/seo"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about-us",
    "/blogs",
    "/courses",
    "/destinations",
    "/event",
    "/online-application",
    "/online-consultation",
    "/services",
    "/student-counseling",
    "/success-stories",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []

  try {
    const blogs = await getBlogs(1000)
    blogRoutes = blogs
      .filter((blog) => blog.status === "published")
      .map((blog) => ({
        url: absoluteUrl(`/blogs/${blog.slug}`),
        lastModified: blog.updatedAt ?? blog.publishedAt ?? blog.createdAt ?? new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error("Failed to generate blog sitemap entries:", error)
  }

  return [...staticRoutes, ...blogRoutes]
}
