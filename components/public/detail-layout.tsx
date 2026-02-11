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
      <section className="relative h-[300px] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="container relative z-20 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>{">"}</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
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
