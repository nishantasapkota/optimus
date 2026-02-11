"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavbarProps {
  details: any
  businessName: string
  firstName: string
}

export function Navbar({ details, businessName, firstName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

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
          ? "bg-white/90 backdrop-blur-xl shadow-2xl py-2 border-b border-gray-100" 
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
              <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center text-white  font-bold transform -skew-x-6 shadow-lg shadow-red-600/20">
                {firstName[0]}
              </div>
            )}
          </div>
        </Link>
        
        <nav className={cn(
          "hidden lg:flex items-center gap-8 text-sm  font-bold capitalize  transition-colors duration-500",
          isDarkText ? "text-blue-950" : "text-white"
        )}>
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about-us" },
            { name: "Services", href: "/services" },
            { name: "Courses", href: "/courses" },
            { name: "Online Counselling", href: "/online-consultation" },
            { name: "Success Stories", href: "/#testimonials" },
            { name: "Blogs", href: "/blogs" },
            { name: "Contact Us", href: "/contact" },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="hover:text-red-600 transition-colors relative group py-2 whitespace-nowrap"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           <Link href="/online-application">
              <Button className={cn(
                "rounded-full px-8 h-11 font-semibold uppercase tracking-widest text-[10px] transition-all duration-500",
                isDarkText 
                  ? "bg-red-600 hover:bg-blue-950 text-white shadow-xl shadow-red-600/20" 
                  : "bg-white hover:bg-red-600 text-blue-950 hover:text-white"
              )}>
                Register
              </Button>
           </Link>
        </div>
      </div>
    </header>
  )
}
