"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const destinations = [
  {
    name: "USA",
    image: "/destinations/usa.png",
  },
  {
    name: "Australia",
    image: "/destinations/australia.png",
  },
  {
    name: "Germany",
    image: "/destinations/germany.png",
  },
  {
    name: "Canada",
    image: "/destinations/canada.png",
  },
]

export function Destinations() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Study Abroad
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            Choose the destination you want to study
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{destination.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
      </div>
    </section>
  )
}
