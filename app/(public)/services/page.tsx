"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Check } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"

const servicesData = [
  {
    title: "Career Counseling and Academic Guidance",
    image: "/modern-office.png",
    items: [
      "Beyond Border Immigration",
      "Strategic Portfolio Building",
      "Direct University Relations",
      "Scholarship Maximization",
      "Certified Mentorship"
    ],
    reverse: false
  },
  {
    title: "Visa and Migration Consultation",
    image: "/professional-team-meeting.png",
    items: [
      "Beyond Border Immigration",
      "High Visa Success Rate",
      "Document Verification",
      "Legal Guidance",
      "Relocation Assistance"
    ],
    reverse: true
  },
  {
    title: "Test Preparation (IELTS / PTE / TOEFL)",
    image: "/modern-product-display.png",
    items: [
      "Beyond Border Immigration",
      "Mock Test Simulations",
      "Strategy Workshops",
      "Certified Instructors",
      "Performance Analytics"
    ],
    reverse: false
  },
  {
      title: "Logistics and Post-Departure Support",
      image: "/destinations/australia.png",
      items: [
        "Beyond Border Immigration",
        "Accommodation Services",
        "Airport Pickup",
        "Cultural Orientation",
        "Job Search Assistance"
      ],
      reverse: true
    }
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen">
      <PageHero 
        title="Services"
        description="Comprehensive support cover every stage of your journey – from identifying the right universities to pre-departure orientation."
        breadcrumbItems={[{ label: "Services" }]}
      />

      {/* Intro Text */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed"
          >
            Optimus Global Education Provides wide range of services cover every stage of your journey – from identifying the right universities to pre-departure orientation. This ensures a smooth and hassle-free process, allowing you to focus on your strengths and aspirations – to fulfill your dream of studying in your Dreamland.
          </motion.p>
        </div>
      </section>

      {/* Alternating Services */}
      <section className="pb-24 space-y-24">
        {servicesData.map((service, index) => (
          <ServiceRow key={index} {...service} />
        ))}
      </section>

      <CtaJourney />
    </div>
  )
}

function ServiceRow({ title, image, items, reverse }: { title: string, image: string, items: string[], reverse: boolean }) {
  return (
    <div className="container">
      <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5"
        >
          <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Card Side */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`w-full lg:w-2/5 -mt-20 lg:mt-0 ${reverse ? 'lg:-mr-32' : 'lg:-ml-32'} relative z-10`}
        >
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-50">
            <h3 className="text-xl md:text-2xl font-bold text-blue-950 mb-8 leading-tight">
              {title}
            </h3>
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="p-1 rounded-md bg-blue-50 text-blue-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-600 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
