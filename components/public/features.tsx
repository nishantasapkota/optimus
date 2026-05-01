"use client"

import { motion } from "framer-motion"
import { Plane, FileText, MapPin, Bus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"

type FeaturesContent = HomePageContent["features"]

const featureStyles = [
  {
    icon: Plane,
  },
  {
    icon: FileText,
  },
  {
    icon: MapPin,
  },
  {
    icon: Bus,
  },
]

export function Features({ content }: { content?: FeaturesContent }) {
  const section = content ?? homeDefaultContent.features
  const services = section.items.map((item, index) => {
    const style = featureStyles[index] ?? featureStyles[0]
    return {
      ...style,
      ...item,
    }
  })

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            {section.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            {section.title}
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
             {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-start rounded-3xl border border-gray-100 bg-white p-8 text-blue-950 shadow-lg shadow-gray-100/50 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              <div className="mb-6 rounded-2xl bg-blue-50 p-4 transition-colors duration-300 group-hover:bg-white/20">
                <service.icon className="h-8 w-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="mb-8 text-sm font-medium leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-red-50">
                {service.description}
              </p>
              <Link 
                href="/services" 
                className="mt-auto inline-flex items-center gap-2 border-b border-blue-600 text-sm font-bold uppercase tracking-widest text-blue-600 transition-colors duration-300 group-hover:border-white group-hover:text-white"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
