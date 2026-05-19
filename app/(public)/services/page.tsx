import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CtaJourney } from "@/components/public/cta-journey"
import { PageHero } from "@/components/public/page-hero"
import { Button } from "@/components/ui/button"
import { getServices } from "@/lib/db-utils"

export const dynamic = "force-dynamic"

export default async function ServicesPage() {
  let services = []

  try {
    const fetchedServices = await getServices(200)
    services = fetchedServices.filter((service) => service.status === "active")
  } catch (error) {
    console.error("Failed to fetch services:", error)
  }

  return (
    <div className="flex min-h-screen flex-col gap-0 bg-white">
      <PageHero
        title="Services"
        description="Comprehensive support across admissions, visa planning, academic guidance, and test preparation."
        breadcrumbItems={[{ label: "Services" }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Explore all active service pages managed from the CMS. Add, remove, or update any service from the admin panel and it will flow through here automatically.
          </p>
        </div>
      </section>

      <section className="pb-24 space-y-24">
        {services.length === 0 ? (
          <div className="container">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center">
              <h2 className="text-2xl font-bold text-blue-950">No active services published yet.</h2>
              <p className="mt-3 text-sm font-medium text-slate-600">Create or activate services in the admin CMS to show them on this page.</p>
            </div>
          </div>
        ) : (
          services.map((service, index) => (
            <div key={service.slug} className="container">
              <div className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
                <div className="w-full lg:w-3/5">
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem] shadow-2xl">
                    <Image
                      src={service.icon || "/placeholder.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                    />
                  </div>
                </div>

                <div className={`relative z-10 w-full lg:w-2/5 -mt-20 lg:mt-0 ${index % 2 === 1 ? "lg:-mr-32" : "lg:-ml-32"}`}>
                  <div className="rounded-[2rem] border border-gray-50 bg-white p-10 shadow-2xl shadow-gray-200/50">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">{service.category}</p>
                    <h2 className="mt-5 text-xl md:text-2xl font-bold text-blue-950 leading-tight">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">{service.shortDescription}</p>
                    <div className="mt-8 space-y-4">
                      {service.features?.slice(0, 5).map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="rounded-md bg-blue-50 p-1 text-blue-600">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <span className="text-gray-600 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/services/${service.slug}`} className="mt-8 inline-flex items-center text-sm font-bold text-red-600 hover:text-blue-950">
                      View service page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="container pb-24">
        <Link href="/online-consultation">
          <Button className="h-12 rounded-xl bg-blue-950 px-6 text-sm font-semibold text-white hover:bg-red-600">
            Book A Consultation
          </Button>
        </Link>
      </div>

      <CtaJourney />
    </div>
  )
}
