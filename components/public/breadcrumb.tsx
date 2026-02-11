import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface BreadcrumbProps {
  items: {
    label: string
    href?: string
  }[]
}

export function Breadcrumb({ items, className, theme = "light" }: BreadcrumbProps & { className?: string, theme?: "light" | "dark" }) {
  const baseColor = theme === "dark" ? "text-blue-200/60" : "text-gray-500"
  const activeColor = theme === "dark" ? "text-white" : "text-gray-900"
  const separatorColor = theme === "dark" ? "text-blue-200/40" : "text-gray-400"
  const hoverColor = theme === "dark" ? "hover:text-red-400" : "hover:text-red-600"

  return (
    <nav className={`flex items-center text-sm font-medium ${baseColor} mb-8 ${className || ""}`}>
      <Link href="/" className={`${hoverColor} transition-colors`}>
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className={`h-4 w-4 mx-2 ${separatorColor}`} />
          {item.href ? (
            <Link href={item.href} className={`${hoverColor} transition-colors`}>
              {item.label}
            </Link>
          ) : (
            <span className={`${activeColor} font-bold`}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
