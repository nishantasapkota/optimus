import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "About Optimus Global | Study Abroad Education Consultancy",
  description:
    "Learn about Optimus Global, our student-first counselling approach, and how we support study abroad applications, visas, and admissions planning.",
  path: "/about-us",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "About Optimus Global education consultancy",
    },
  ],
})

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
