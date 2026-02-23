"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

type PartnersContent = HomePageContent["partners"]

export function Partners({ content }: { content?: PartnersContent }) {
  const [partners, setPartners] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const section = content ?? homeDefaultContent.partners

  useEffect(() => {
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        if (data.partners) setPartners(data.partners)
      })
  }, [])

  useEffect(() => {
    if (partners.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length)
    }, 1500) // 1.5s per slide for better readability
    return () => clearInterval(interval)
  }, [partners])

  if (partners.length === 0) return null

  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30 translate-x-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-blue-900 mb-6 tracking-tight"
          >
            {section.titlePrefix} <span className="text-red-600">{section.titleHighlight}</span> {section.titleSuffix}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed font-medium"
          >
            {section.description}
          </motion.p>
        </div>
      </div>

      {/* Auto-Sliding 1s Interval Slider */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="container overflow-visible">
          <motion.div 
            className="flex items-center gap-6"
            animate={{ 
              x: `-${currentIndex * (192 + 24)}px` // w-48 (192px) + gap-6 (24px)
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.32, 0.72, 0, 1] 
            }}
          >
            {/* Display partners thrice to allow for seamless loop visual */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div 
                key={index} 
                className="flex-shrink-0 relative group w-48 h-28"
              >
                <div className="flex items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 h-full hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 opacity-90 group-hover:opacity-100">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={160} 
                    height={60} 
                    className="object-contain max-h-full" 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
