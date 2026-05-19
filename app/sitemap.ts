import type { MetadataRoute } from "next"
import { getBlogs, getCourses, getDestinations, getServices } from "@/lib/db-utils"
import { absoluteUrl } from "@/lib/seo"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about-us",
    "/appointment",
    "/blogs",
    "/contact",
    "/courses",
    "/destinations",
    "/event",
    "/founder",
    "/online-application",
    "/online-consultation",
    "/privacy",
    "/services",
    "/student-counseling",
    "/success-stories",
    "/terms-and-conditions",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  let courseRoutes: MetadataRoute.Sitemap = []
  let destinationRoutes: MetadataRoute.Sitemap = []
  let serviceRoutes: MetadataRoute.Sitemap = []

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

  try {
    const courses = await getCourses(1000)
    courseRoutes = courses
      .filter((course) => course.status === "active")
      .map((course) => ({
        url: absoluteUrl(`/courses/${course.slug}`),
        lastModified: course.updatedAt ?? course.createdAt ?? new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error("Failed to generate course sitemap entries:", error)
  }

  try {
    const destinations = await getDestinations(1000)
    destinationRoutes = destinations
      .filter((destination) => destination.status === "active")
      .map((destination) => ({
        url: absoluteUrl(`/destinations/${destination.slug}`),
        lastModified: destination.updatedAt ?? destination.createdAt ?? new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error("Failed to generate destination sitemap entries:", error)
  }

  try {
    const services = await getServices(1000)
    serviceRoutes = services
      .filter((service) => service.status === "active")
      .map((service) => ({
        url: absoluteUrl(`/services/${service.slug}`),
        lastModified: service.updatedAt ?? service.createdAt ?? new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error("Failed to generate service sitemap entries:", error)
  }

  return [...staticRoutes, ...blogRoutes, ...courseRoutes, ...destinationRoutes, ...serviceRoutes]
}
