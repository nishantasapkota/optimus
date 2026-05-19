import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Study Abroad Services | Admissions, Visa and Test Prep | Optimus Global",
  description:
    "Explore Optimus Global services for study abroad counselling, university applications, visa support, IELTS, PTE, and Duolingo preparation.",
  path: "/services",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Optimus Global study abroad services",
    },
  ],
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
