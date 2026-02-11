"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export function MiddleCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Optimus</span>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
            We are an Educational Consultancy
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 font-medium">
             Our team of experts is dedicated to providing you with the best guidance and support for your international education journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl"
        >
          <Image
            src="/middle-cta.png"
            alt="City view"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Link href="/contact">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-lg shadow-red-600/20">
              Contact Us
            </Button>
          </Link>
          <Link href="/services">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-lg shadow-blue-600/20">
              Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
