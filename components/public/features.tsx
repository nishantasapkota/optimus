"use client"

import { motion } from "framer-motion"
import { Plane, FileText, MapPin, Bus, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Visa Preparation",
    description: "Expert guidance for your visa application process with high success rates.",
    icon: Plane,
    color: "bg-red-600 text-white",
    borderColor: "border-red-600",
  },
  {
    title: "Test Interpretation",
    description: "Understanding your test scores and how they affect your applications.",
    icon: FileText,
    color: "bg-white text-blue-950",
    borderColor: "border-gray-100",
  },
  {
    title: "Pre-Departure and Post-Departure",
    description: "Support before you leave and after you arrive at your destination.",
    icon: MapPin,
    color: "bg-white text-blue-950",
    borderColor: "border-gray-100",
  },
  {
    title: "Logistics training",
    description: "Practical training for managing your logistics in a new country.",
    icon: Bus,
    color: "bg-white text-blue-950",
    borderColor: "border-gray-100",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            Services we provide
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
             Comprehensive support for every aspect of your international education journey.
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
              className={`p-8 rounded-3xl border ${service.borderColor} ${service.color === 'bg-red-600 text-white' ? service.color : 'bg-white text-blue-950 shadow-lg shadow-gray-100/50'} flex flex-col items-start transition-all duration-300`}
            >
              <div className={`p-4 rounded-2xl ${service.color === 'bg-red-600 text-white' ? 'bg-white/20' : 'bg-blue-50'} mb-6`}>
                <service.icon className={`h-8 w-8 ${service.color === 'bg-red-600 text-white' ? 'text-white' : 'text-blue-600'}`} />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className={`text-sm mb-8 ${service.color === 'bg-red-600 text-white' ? 'text-red-50' : 'text-gray-500'} font-medium leading-relaxed`}>
                {service.description}
              </p>
              <Link 
                href="/services" 
                className={`mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${service.color === 'bg-red-600 text-white' ? 'text-white border-b border-white' : 'text-blue-600 hover:text-red-600'} transition-colors`}
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
