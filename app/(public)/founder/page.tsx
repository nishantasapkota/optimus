import type { Metadata } from "next"
import { CtaJourney } from "@/components/public/cta-journey"
import { FounderSpotlight } from "@/components/public/founder-spotlight"
import { PageHero } from "@/components/public/page-hero"
import { getPageContent } from "@/lib/db-utils"
import { createPageMetadata } from "@/lib/seo"
import { founderDefaultContent, mergeFounderContent } from "@/lib/page-content"

export const dynamic = "force-dynamic"

async function getFounderContent() {
  try {
    const pageContent = await getPageContent("founder")
    return mergeFounderContent(pageContent?.content)
  } catch (error) {
    console.error("Failed to fetch founder page content:", error)
    return founderDefaultContent
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getFounderContent()

  return createPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/founder",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,
        alt: content.founder.name,
      },
    ],
  })
}

export default async function FounderPage() {
  const content = await getFounderContent()

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <PageHero
        badge={content.hero.badge}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbItems={[{ label: "Founder" }]}
      />
      <FounderSpotlight founder={content.founder} />
      <CtaJourney />
    </div>
  )
}
