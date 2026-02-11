"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function Partners() {
  const [partners, setPartners] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

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
    <section className="py-24 bg-transparent overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="max-w-xl"
          >
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block">Institutional Network</span>
            <h2 className="text-4xl md:text-5xl  font-bold text-blue-900 tracking-tight leading-tight">
              Our Leading <br/><span className="text-red-600">Partner</span> Universities
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg max-w-sm md:text-right font-medium"
          >
            Unity Group is proud to be officially representative of prestigious institutions worldwide.
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
                <div className="flex items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 h-full hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100">
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
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  )
}
