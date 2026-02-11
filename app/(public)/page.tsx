import { Hero } from "@/components/public/hero"
import { Destinations } from "@/components/public/destinations"
import { Features } from "@/components/public/features"
import { Partners } from "@/components/public/partners"
import { Testimonials } from "@/components/public/testimonials"
import { Blog } from "@/components/public/blog"
import { Contact } from "@/components/public/contact"
import { HomePopup } from "@/components/public/home-popup"
import { StatsBar } from "@/components/public/stats-bar"
import { ConsultancySection } from "@/components/public/consultancy-section"
import { MiddleCTA } from "@/components/public/middle-cta"
import { CtaJourney } from "@/components/public/cta-journey"
import { getBlogs, getServices, getEvent, getServicesCount, getBlogsCount } from "@/lib/db-utils"

// Force dynamic rendering to ensure we get fresh data
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch data in parallel with error handling
  let blogs: any[] = []
  let servicesSnapshot: any[] = []
  let totalServices = 0
  let totalBlogs = 0
  let event: any = null
  
  try {
    const [fetchedBlogs, fetchedCountBlogs, fetchedServices, fetchedCount, fetchedEvent] = await Promise.all([
      getBlogs(3).catch(e => {
        console.error("Failed to fetch blogs:", e)
        return []
      }),
      getBlogsCount().catch(e => {
        console.error("Failed to fetch blogs count:", e)
        return 0
      }),
      getServices(4).catch(e => {
        console.error("Failed to fetch services:", e)
        return []
      }),
      getServicesCount().catch(e => {
        console.error("Failed to fetch services count:", e)
        return 0
      }),
      getEvent().catch(e => {
        console.error("Failed to fetch event:", e)
        return null
      })
    ])
    
    totalServices = fetchedCount
    totalBlogs = fetchedCountBlogs
    
    // Serialize MongoDB objects for Client Components
    blogs = fetchedBlogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt instanceof Date ? blog.createdAt.toISOString() : blog.createdAt,
      updatedAt: blog.updatedAt instanceof Date ? blog.updatedAt.toISOString() : blog.updatedAt,
    }))
    
    servicesSnapshot = fetchedServices.map(service => ({
      ...service,
      _id: service._id.toString(),
      createdAt: service.createdAt instanceof Date ? service.createdAt.toISOString() : service.createdAt,
      updatedAt: service.updatedAt instanceof Date ? service.updatedAt.toISOString() : service.updatedAt,
    }))

    if (fetchedEvent && fetchedEvent.status === "active") {
      event = {
        ...fetchedEvent,
        _id: fetchedEvent._id.toString(),
        createdAt: fetchedEvent.createdAt instanceof Date ? fetchedEvent.createdAt.toISOString() : fetchedEvent.createdAt,
      }
    }
  } catch (error) {
    console.error("Error fetching home page data:", error)
  }

  return (
    <div className="flex flex-col gap-0 bg-white">
      <Hero />
      <StatsBar />
      <Destinations />
      <ConsultancySection />
      <MiddleCTA />
      <Partners />
      <Features />
      <Blog initialBlogs={blogs} initialTotal={totalBlogs} />
      <Contact />
      <CtaJourney />
      <Testimonials />
      <HomePopup initialEvent={event} />
    </div>
  )
}
