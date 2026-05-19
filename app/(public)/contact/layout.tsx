import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Contact Optimus Global | Study Abroad Counselling in Nepal",
  description:
    "Contact Optimus Global for study abroad counselling, admissions support, visa guidance, and education consulting for international students in Nepal.",
  path: "/contact",
  images: [
    {
      url: "/banner.jpeg",
      width: 1200,
      height: 630,
      alt: "Contact Optimus Global study abroad consultancy",
    },
  ],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
