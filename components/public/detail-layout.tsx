import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  href: string
  active?: boolean
}

interface DetailLayoutProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
  children: React.ReactNode
  sidebarTitle?: string
  sidebarItems?: SidebarItem[]
}

export function DetailLayout({
  title,
  breadcrumbs,
  children,
  sidebarTitle = "Related",
  sidebarItems = [],
}: DetailLayoutProps) {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Banner */}
      <section className="relative min-h-[360px] bg-blue-900 overflow-hidden pt-32 pb-16 md:min-h-[380px] md:pt-36 lg:min-h-[420px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="container relative z-20 flex min-h-[210px] flex-col justify-center text-white md:min-h-[220px] lg:min-h-[250px]">
          <h1 className="mb-5 max-w-6xl text-[clamp(2.35rem,8vw,4.25rem)] font-bold leading-[1.08] tracking-tight md:text-[clamp(2.75rem,5vw,4rem)] lg:text-[clamp(3rem,4.2vw,4.4rem)]">
            {title}
          </h1>
          <div className="flex max-w-5xl flex-wrap items-center gap-x-2 gap-y-2 text-base font-medium leading-relaxed text-gray-300 md:text-lg">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>{">"}</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="break-words">{crumb.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Abstract shapes background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-800/50 transform skew-x-12 translate-x-20" />
      </section>

      {/* Main Content Area */}
      <section className="py-16  ">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Content Column */}
            <div className="lg:col-span-8">
              {children}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-red-500 mb-6">{sidebarTitle}</h3>
                <div className="flex flex-col border rounded-lg overflow-hidden">
                  {sidebarItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors text-gray-600 text-sm",
                        item.active && "bg-blue-50 text-blue-900 font-medium"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
