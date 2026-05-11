import type { Metadata } from "next"
import { BlogsPageClient } from "@/components/public/blogs-page-client"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Study Abroad Insights & Education Blog | Optimus Global",
  description:
    "Read expert study abroad guides, university updates, visa tips, scholarship advice, and international education insights from Optimus Global.",
  path: "/blogs",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Optimus Global education insights blog",
    },
  ],
})

export default function BlogsPage() {
  return <BlogsPageClient />
}
