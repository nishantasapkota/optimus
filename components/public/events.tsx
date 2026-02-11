"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight, Loader2, Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventsProps {
  initialEvent?: any
}

export function Events({ initialEvent }: EventsProps) {
  const [event, setEvent] = useState<any>(initialEvent || null)
  const [loading, setLoading] = useState(!initialEvent)

  useEffect(() => {
    if (initialEvent) return

    fetch("/api/event")
      .then(res => res.json())
      .then(data => {
        if (data.event && data.event.status === "active") {
          setEvent(data.event)
        }
      })
      .finally(() => setLoading(false))
  }, [initialEvent])

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    )
  }

  if (!event) return null

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-red-600/5 w-fit px-4 py-1.5 rounded-full border border-red-600/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-[10px]  font-bold uppercase tracking-[0.2em] text-red-600">Institutional Events</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl  font-bold text-blue-900 tracking-tight leading-tight"
            >
              Major Admissions <br /> <span className="text-red-600">Event 2026</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-sm font-medium italic border-l-4 border-gray-100 pl-6"
          >
            "Connecting ambitious scholars with prestigious global institutions through direct interaction."
          </motion.p>
        </div>

        {/* Hero Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="group relative w-full h-[600px] md:h-[500px] rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-blue-900/10 border border-gray-100"
        >
          <Link href="/event" className="flex flex-col md:flex-row h-full">
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-full relative p-6">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-inner">
                <Image 
                  src={event.image || "/professional-team-meeting.png"} 
                  alt={event.title} 
                  fill 
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110" 
                />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-2xl text-[10px]  font-bold tracking-widest uppercase shadow-xl animate-pulse">
                  Active
                </div>
                
                {/* Visual Glass Overlay */}
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:p-16">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-red-600  font-bold text-xs uppercase tracking-widest mb-2">
                    <Calendar className="w-4 h-4" />
                    {event.date || "Scheduled for Spring 2026"}
                  </div>
                  <h3 className="text-3xl md:text-5xl  font-bold text-blue-950 tracking-tight group-hover:text-red-600 transition-colors duration-500 leading-tight">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 group-hover:bg-white group-hover:shadow-lg transition-all duration-500">
                    <div className="p-3 bg-blue-900/5 rounded-2xl text-blue-900">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs  font-bold text-blue-900/40 uppercase tracking-widest">Global Location</p>
                      <p className="text-blue-950 font-bold text-lg">{event.location || "Unity Hub"}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Button className="bg-blue-900 hover:bg-red-600 text-white px-10 py-8 text-lg  font-bold rounded-2xl transition-all duration-500 flex items-center gap-3 group/btn shadow-xl shadow-blue-900/10">
                    Register for Seat
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-3xl  font-bold text-blue-950">1,200+</span>
                    <span className="text-[10px] text-gray-400  font-bold uppercase tracking-widest">Expected Attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Subtle Corner Decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-colors" />
        </motion.div>
      </div>
    </section>
  )
}
