"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Sparkles, X, ArrowRight, Clock, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface HomePopupProps {
  initialEvent?: any
}

export function HomePopup({ initialEvent }: HomePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000) // Show after 2 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  // Fallback content if no event is provided
  const displayEvent = initialEvent || {
    title: "Global Education Expo 2025",
    description: "Meet top UK university representatives and explore scholarship opportunities for the upcoming intake.",
    date: "Coming Soon",
    location: "Unity Group Head Office",
    image: "/professional-team-meeting.png",
    slug: "global-expo-2025"
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-none rounded-[3rem] bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex flex-col md:flex-row w-full relative">
          
          {/* Close Button - Custom Positioned */}
          <button 
            onClick={handleClose}
            className="absolute right-6 top-6 z-50 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 text-gray-900 hover:bg-red-600 hover:text-white transition-all shadow-sm group"
          >
            <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
          </button>

          {/* Left Side: Visual/Image */}
          <div className="md:w-5/12 relative min-h-[300px] md:min-h-auto overflow-hidden">
            <Image 
              src={displayEvent.image || "/professional-team-meeting.png"} 
              alt={displayEvent.title} 
              fill 
              className="object-cover"
              priority
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/80 via-blue-950/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-[10px]  font-bold uppercase tracking-widest mb-4 shadow-lg shadow-red-600/30"
              >
                <Sparkles className="w-3 h-3" /> Featured Event
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white space-y-2"
              >
                <p className="text-xs  font-bold uppercase tracking-widest text-white/60">Coming Next</p>
                <h4 className="text-2xl  font-bold leading-tight tracking-tighter">Don't Miss Out <br /> On Your Future.</h4>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            {/* Red Accent Dot Pattern (Decorative) */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-600" />
                ))}
              </div>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <span className="text-red-600  font-bold uppercase tracking-[0.2em] text-[10px] block">Exclusive Invitation</span>
                <h2 className="text-3xl md:text-5xl  font-bold text-blue-950 tracking-tighter leading-[1.1]">
                  {displayEvent.title}
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                  {displayEvent.description?.substring(0, 150)}...
                </p>
              </div>

              {/* Event Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[1.5rem] border border-gray-100 transition-colors hover:border-blue-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px]  font-bold text-gray-400 uppercase tracking-widest">Date</p>
                    <p className="text-sm font-bold text-blue-950">{displayEvent.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[1.5rem] border border-gray-100 transition-colors hover:border-red-100">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px]  font-bold text-gray-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-blue-950 truncate max-w-[120px]">{displayEvent.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/event" className="flex-1">
                  <Button className="w-full bg-blue-950 hover:bg-red-600 text-white  font-bold uppercase tracking-widest text-xs h-16 rounded-2xl shadow-xl shadow-blue-900/10 transition-all group">
                    View Full Details <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button 
                   onClick={handleClose}
                   variant="outline" 
                   className="sm:w-auto px-8 h-16 rounded-2xl border-2 border-gray-100 text-gray-400 font-bold hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px]"
                >
                  Maybe Later
                </Button>
              </div>

              {/* Urgency Badge */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative bg-gray-100">
                      <Image src={`https://i.pravatar.cc/100?img=${i+40}`} alt="User" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-medium text-gray-400">
                  <span className="text-blue-950  font-bold">42+ students</span> already registered
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
