"use client"

import { useEffect, useState } from "react"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { motion } from "framer-motion"

interface TestimonialData {
  _id: string
  name: string
  designation: string
  description: string
  image: string
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-gray-50/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto rounded-full mb-4"></div>
            <div className="h-10 w-64 bg-gray-200 animate-pulse mx-auto rounded-xl"></div>
          </div>
          <div className="max-w-5xl mx-auto h-[500px] bg-gray-100 animate-pulse rounded-[3rem]"></div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.description,
    name: t.name,
    designation: t.designation,
    src: t.image,
  }))

  return (
    <section className="py-20 md:py-32 bg-gray-50/50 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30 translate-x-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Success Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl  font-bold text-blue-900 mb-6 tracking-tight"
          >
            Voice of Our <span className="text-red-600">Scholars</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Real experiences from students who transformed their global education dreams into reality with Unity Group.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
        </div>
      </div>
    </section>
  )
}
