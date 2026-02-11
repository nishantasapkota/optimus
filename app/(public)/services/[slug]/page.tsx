import { DetailLayout } from "@/components/public/detail-layout"
import { getServiceBySlug, getServices } from "@/lib/db-utils"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params
  
  let service = null
  let allServices: any[] = []
  
  try {
    service = await getServiceBySlug(slug)
  } catch (error) {
    console.error("Failed to fetch service:", error)
    notFound()
  }

  if (!service) {
    notFound()
  }

  try {
    allServices = await getServices(10)
  } catch (error) {
    console.error("Failed to fetch services for sidebar:", error)
  }
  
  const sidebarItems = allServices
    .filter(s => s.slug !== slug)
    .map(s => ({
      title: s.name,
      href: `/services/${s.slug}`,
      active: false
    }))

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Service Hero */}
      <section className="relative h-[500px] flex items-center overflow-hidden bg-blue-950 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#050b1f]" />
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-600/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-700/50 to-blue-950" />
        </div>

        <div className="container relative z-20">
          <div className="max-w-4xl">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs mb-6 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Our Services
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
              {service.name}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {service.icon && (
              <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-50">
                <Image
                  src={service.icon}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none prose-headings:text-blue-950 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-blue-950">
              <h2 className="text-3xl font-bold mb-6">Service Overview</h2>
              <div dangerouslySetInnerHTML={{ __html: service.description }} />
              
              {service.features && service.features.length > 0 && (
                <div className="mt-12 not-prose">
                  <h3 className="text-2xl font-bold text-blue-950 mb-8">What we provide</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <div className="p-2 rounded-lg bg-red-100 text-red-600 flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-blue-950/80 group-hover:text-red-600 transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-10">
            {/* Related Services */}
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-red-600 rounded-full" />
                Other Services
              </h3>
              <div className="space-y-3">
                {sidebarItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href}
                    className="flex justify-between items-center p-4 rounded-xl bg-white border border-transparent hover:border-red-200 hover:shadow-lg transition-all group"
                  >
                    <span className="font-bold text-blue-950/70 group-hover:text-red-600 transition-colors">{item.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>

              {/* Quick Contact Card */}
              <div className="mt-10 p-8 rounded-2xl bg-blue-950 text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-4">Need Help?</h4>
                    <p className="text-sm text-blue-200/70 mb-8 font-medium">Contact our experts for specialized advice on your global journey.</p>
                    <Link href="/contact" className="w-full">
                      <Button className="w-full bg-red-600 hover:bg-white hover:text-red-600 text-white h-14 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">
                        GET IN TOUCH
                      </Button>
                    </Link>
                 </div>
                 {/* Decorative background circle */}
                 <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
