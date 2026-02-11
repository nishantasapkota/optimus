"use client"

import { motion } from "framer-motion"
import { Users, BookOpen, Calendar, FileCheck } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "700+",
    label: "Global Partners",
  },
  {
    icon: BookOpen,
    value: "6000+",
    label: "Students Guided",
  },
  {
    icon: Calendar,
    value: "2021",
    label: "Estd. Date",
  },
  {
    icon: FileCheck,
    value: "15000+",
    label: "Applications",
  },
]

export function StatsBar() {
  return (
    <div className="container relative z-20 -mt-12 md:-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 md:justify-center border-r last:border-0 border-gray-100 last:border-none">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-blue-950">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
