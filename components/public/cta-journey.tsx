"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function CtaJourney() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-950/80 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80')" }}
        />
      </div>

      <div className="container relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Book a free consultation
          </h2>
          <p className="text-xl text-blue-100 font-medium opacity-90">
            Take the first step towards your global education destiny. Our expertos are here to guide you through every step of the process.
          </p>
          <div className="pt-4">
            <Link href="/appointment">
              <Button className="bg-white hover:bg-gray-100 text-blue-900 px-10 py-7 text-lg font-bold rounded-xl shadow-2xl transition-all">
                Start Your Journey With Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
