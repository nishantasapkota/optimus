"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BookOpen,
  Briefcase,
  Calendar,
  ImageIcon,
  Globe,
  Handshake,
  GraduationCap,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    name: "Courses",
    href: "/admin/courses",
    icon: GraduationCap,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    name: "Applications",
    href: "/admin/online-application",
    icon: FileText,
  },
  {
    name: "Counseling",
    href: "/admin/student-counseling",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: FileText,
  },
  {
    name: "Media Library",
    href: "/admin/media",
    icon: ImageIcon,
  },
  {
    name: "Partners",
    href: "/admin/partners",
    icon: Handshake,
  },
  {
    name: "Leadership (BOD)",
    href: "/admin/bod",
    icon: Users,
  },
  {
    name: "Business Details",
    href: "/admin/business-details",
    icon: Globe,
  },
  {
    name: "Events",
    href: "/admin/event",
    icon: Calendar,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full min-h-0 w-72 flex-col border-r border-white/10 bg-slate-950 text-white">
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-400 to-amber-300 shadow-[0_12px_30px_-16px_rgba(251,113,133,0.9)]">
            <span className="text-base font-bold text-white">A</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Optimus</p>
            <span className="text-lg font-semibold text-white">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 space-y-1.5 overflow-y-auto px-4 py-6 pr-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white shadow-sm before:absolute before:left-0 before:top-2 before:h-6 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-rose-400 before:to-orange-300 before:content-['']"
                  : "text-slate-300 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
            <span className="text-sm font-semibold">AD</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="truncate text-xs text-white/60">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
