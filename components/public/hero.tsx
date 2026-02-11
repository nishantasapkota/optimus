"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[800px] flex items-center bg-white overflow-hidden">
      {/* Background patterns/circles */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-red-50/50 blur-3xl" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold uppercase tracking-wider">
            <span>2025</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1a1a1a] leading-[1.1] tracking-tight">
            Applications <span className="text-gray-900">are open for</span> <br />
            <span className="text-red-600">2025</span> <span className="text-gray-900">intake</span>
          </h1>

          <p className="max-w-xl text-lg text-gray-600 leading-relaxed font-medium">
            Take the first step towards your global education. Our experts are here to guide you through every step of the process.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-7 rounded-lg text-lg font-bold shadow-lg shadow-red-600/20 group transition-all duration-300">
              Check For Your Eligibility
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[500px] lg:h-[700px] w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-10 rounded-3xl" />
          <Image
            src="/hero-bg.png"
            alt="Student with flags"
            fill
            className="object-cover rounded-3xl shadow-2xl"
            priority
          />
          
          {/* Floating element 1 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute -left-10 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 hidden md:flex"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <span className="font-bold">700+</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Partners</p>
              <p className="text-sm font-black text-blue-900">Worldwide</p>
            </div>
          </motion.div>

          {/* Floating element 2 */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -right-5 top-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 hidden md:flex"
          >
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white">
              <span className="font-bold">12y</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
              <p className="text-sm font-black text-blue-900">Trusted Advice</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
