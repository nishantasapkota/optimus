import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Globe2, MapPin } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"
import { Button } from "@/components/ui/button"
import { getPageContent } from "@/lib/db-utils"
import { mergeHomeContent } from "@/lib/page-content"

export const dynamic = "force-dynamic"

const destinationDetails: Record<string, string[]> = {
  usa: ["Flexible programs across leading public and private universities", "Strong options for STEM, business, technology, and research pathways"],
  australia: ["Popular destination for career-focused degrees and post-study pathways", "Support for university selection, documentation, and intake planning"],
  uk: ["Shorter degree pathways with globally recognized universities", "Guidance for course matching, scholarships, and application readiness"],
  germany: ["Excellent engineering, technology, and research-driven study options", "Planning support for language, documentation, and admissions timelines"],
  canada: ["Student-friendly cities with diverse academic and career pathways", "Clear counselling for programs, finances, and visa preparation"],
}

function getDetails(name: string) {
  return destinationDetails[name.toLowerCase()] ?? [
    "Personalized counselling based on your academic profile and goals",
    "End-to-end support from shortlisting to pre-departure preparation",
  ]
}

export default async function DestinationsPage() {
  let content = mergeHomeContent()

  try {
    const pageContent = await getPageContent("home")
    content = mergeHomeContent(pageContent?.content)
  } catch (error) {
    console.error("Failed to fetch destinations content:", error)
  }

  const destinations = content.destinations.items

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <PageHero
        badge="Study Abroad Destinations"
        title={
          <>
            Choose where your <br />
            <span className="bg-gradient-to-r from-red-500 to-rose-300 bg-clip-text text-transparent">
              next chapter begins.
            </span>
          </>
        }
        description="Explore popular study destinations and start planning the country, university, course, and intake that match your profile."
        breadcrumbItems={[{ label: "Destinations" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600">
                {content.destinations.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-blue-950 md:text-4xl">
                {content.destinations.title}
              </h2>
            </div>
            <Link href="/online-consultation">
              <Button className="h-11 rounded-xl bg-blue-950 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white hover:bg-red-600">
                Talk To Counsellor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {destinations.map((destination) => (
              <article
                key={destination.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid h-full lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[260px] bg-slate-100">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 30vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
                      <MapPin className="h-5 w-5" />
                      <h3 className="text-2xl font-bold">{destination.name}</h3>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6">
                    <div>
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white">
                        <Globe2 className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-950">Study in {destination.name}</h3>
                      <div className="mt-5 space-y-3">
                        {getDetails(destination.name).map((detail) => (
                          <div key={detail} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/online-consultation" className="mt-6 inline-flex items-center text-sm font-bold text-red-600 hover:text-blue-950">
                      Plan for {destination.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaJourney content={content.ctaJourney} />
    </div>
  )
}
