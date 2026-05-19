import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Globe2 } from "lucide-react"
import { notFound } from "next/navigation"
import { CtaJourney } from "@/components/public/cta-journey"
import { PageHero } from "@/components/public/page-hero"
import { Button } from "@/components/ui/button"
import { getDestinationBySlug, getDestinations } from "@/lib/db-utils"
import { createPageMetadata } from "@/lib/seo"
import { buildBreadcrumbJsonLd } from "@/lib/structured-data"

interface DestinationPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    return createPageMetadata({
      title: "Destination not found",
      description: "The requested study destination page could not be found.",
      path: `/destinations/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: destination.metaTitle || `Study in ${destination.name}`,
    description: destination.metaDescription || destination.shortDescription,
    path: `/destinations/${destination.slug}`,
    noIndex: destination.status !== "active",
    images: destination.image
      ? [
          {
            url: destination.image,
            width: 1200,
            height: 630,
            alt: `Study in ${destination.name}`,
          },
        ]
      : undefined,
  })
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination || destination.status !== "active") {
    notFound()
  }

  let allDestinations: any[] = []

  try {
    allDestinations = (await getDestinations(100)).filter((item) => item.status === "active")
  } catch (error) {
    console.error("Failed to fetch destinations for sidebar:", error)
  }

  const relatedDestinations = allDestinations
    .filter((item) => item.slug !== slug)
    .slice(0, 6)
    .map((item) => ({
      title: item.name,
      href: `/destinations/${item.slug}`,
    }))

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: `Study in ${destination.name}`, path: `/destinations/${destination.slug}` },
  ])

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        badge={`Study in ${destination.name}`}
        title={`Study in ${destination.name}`}
        description={destination.metaDescription || destination.shortDescription}
        breadcrumbItems={[
          { label: "Destinations", href: "/destinations" },
          { label: destination.name },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-slate-600">{destination.shortDescription}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {destination.highlights?.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <span className="text-sm font-medium leading-relaxed text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/online-consultation">
                <Button className="h-11 rounded-xl bg-blue-950 px-6 text-sm font-semibold text-white hover:bg-red-600">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-blue-950">
                Talk to a Counsellor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-xl">
            <Image
              src={destination.image || "/placeholder.jpg"}
              alt={`Study in ${destination.name}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white">
              <Globe2 className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Why study in {destination.name}</h2>
            <div
              className="mt-6 prose prose-sm max-w-none prose-p:text-slate-600 prose-li:text-slate-600 prose-headings:text-blue-950"
              dangerouslySetInnerHTML={{ __html: destination.description }}
            />
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-950">Popular program directions</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {destination.popularPrograms?.map((program) => (
                <div key={program} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700">
                  {program}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedDestinations.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-blue-950">Other destinations</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedDestinations.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-blue-950">{item.title}</h3>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-red-600">
                    View page <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaJourney />
    </div>
  )
}
