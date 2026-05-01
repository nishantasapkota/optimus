"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  details: any
  businessName: string
  firstName: string
}

export function Navbar({ details, businessName, firstName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services" },
    { name: "Courses", href: "/courses" },
    { name: "Online Counselling", href: "/online-consultation" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Pages with light heroes (need dark text initially)
  const hasLightHero = pathname === "/"

  // On light hero pages, we want dark text even when not scrolled.
  // On dark hero pages, we want white text when not scrolled.
  // When scrolled, we always want dark text (white background).
  const isDarkText = isScrolled || hasLightHero

  return (
    <header 
      className={cn(
        "w-full fixed top-0 z-[5000] transition-all duration-500",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl shadow-2xl py-2 border-b border-border"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex items-center gap-1">
            {details?.logo ? (
              <Image 
                src={details.logo} 
                alt={businessName} 
                width={140} 
                height={40} 
                className={cn("object-contain", (!isDarkText) && "brightness-0 invert")} 
              />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold transform -skew-x-6 shadow-lg shadow-primary/20">
                {firstName[0]}
              </div>
            )}
          </div>
        </Link>
        
        <nav className={cn(
          "hidden lg:flex items-center gap-8 text-sm  font-bold capitalize  transition-colors duration-500",
          isDarkText ? "text-foreground" : "text-white"
        )}>
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="hover:text-primary transition-colors relative group py-2 whitespace-nowrap"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           <Link href="/online-application" className="hidden lg:block">
              <Button className={cn(
                "rounded-full px-8 h-11 font-semibold uppercase tracking-widest text-[10px] transition-all duration-500",
                isDarkText 
                  ? "bg-primary hover:bg-secondary text-primary-foreground shadow-xl shadow-primary/20"
                  : "bg-white/95 hover:bg-primary text-primary hover:text-primary-foreground"
              )}>
                Register
              </Button>
           </Link>
           <button
             type="button"
             onClick={() => setIsMenuOpen((open) => !open)}
             className={cn(
               "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden",
               isDarkText
                 ? "border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-900/10 hover:border-primary hover:text-primary"
                 : "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
             )}
             aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
             aria-expanded={isMenuOpen}
             aria-controls="mobile-navigation"
           >
             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "container lg:hidden",
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute left-4 right-4 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 transition-all duration-300",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          )}
        >
          <nav className="grid gap-1 p-3 text-sm font-bold text-slate-900">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 transition hover:bg-slate-50 hover:text-primary",
                  pathname === item.href && "bg-blue-50 text-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/online-application" className="mt-2">
              <Button className="h-12 w-full rounded-xl bg-primary text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground hover:bg-secondary">
                Register
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
