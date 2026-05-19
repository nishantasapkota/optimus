import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Study Abroad Destinations | UK, Australia, Canada and More | Optimus Global",
  description:
    "Compare top study abroad destinations with Optimus Global. Explore country guidance for the UK, Australia, Canada, Germany, Japan, South Korea, and New Zealand.",
  path: "/destinations",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Optimus Global study abroad destinations",
    },
  ],
})

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
