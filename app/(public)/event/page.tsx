"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Calendar, MapPin, Loader2, Sparkles, Send, ArrowRight, GraduationCap } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { PageHero } from "@/components/public/page-hero"

export default function EventPage() {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    address: ""
  })

  useEffect(() => {
    fetchEvent()
  }, [])

  async function fetchEvent() {
    try {
      const res = await fetch("/api/event")
      const data = await res.json()
      if (data.event) {
        setEvent(data.event)
      }
    } catch (error) {
      console.error("Error fetching event:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/event/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventId: event._id
        })
      })

      if (res.ok) {
        toast.success("Successfully registered for the event!")
        setFormData({ fullName: "", contact: "", email: "", address: "" })
      } else {
        toast.error("Failed to register. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-900" />
      </div>
    )
  }

  if (!event || event.status === "inactive") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-gray-50">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-8">
           <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-4xl  font-bold text-blue-950 mb-4 tracking-tighter">No Active Events Found</h1>
        <p className="text-gray-500 text-lg max-w-md font-medium">We're currently planning our next big institutional interaction. Stay tuned!</p>
        <Button onClick={() => window.location.href = "/"} className="mt-8 bg-blue-900 hover:bg-red-600 px-8 py-6 rounded-2xl  font-bold">Back to Home</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0 bg-transparent min-h-screen">
      <PageHero 
        title={event.title}
        description="Join us for an exclusive session with global education leaders. Secure your spot today."
        breadcrumbItems={[{ label: "Events", href: "/event" }, { label: event.title }]}
        badge="Global Academic Summit"
      />

      {/* Main Content & Registration */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column: Details & Narrative */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <div className="space-y-6">
                <span className="text-red-600  font-bold uppercase tracking-widest text-sm">Deep Insight</span>
                <div 
                  className="prose prose-2xl prose-blue max-w-none text-gray-600 font-medium leading-[1.6]
                    prose-headings:text-blue-950 prose-headings: font-bold prose-headings:tracking-tighter
                    prose-strong:text-blue-900 prose-p:mb-8"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>

              {/* High-End Registration Form */}
              <div className="bg-gray-50/50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <div className="mb-10">
                  <h2 className="text-3xl  font-bold text-blue-950 tracking-tighter mb-4">
                    Exclusive Reservation
                  </h2>
                  <p className="text-gray-500 font-medium tracking-tight">Limited slots available for high-tier academic consultations during this event.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="space-y-3">
                       <label className="text-sm font-medium text-gray-700 ml-1">Full Legal Name</label>
                       <Input 
                        placeholder="e.g. Johnathan Doe" 
                        value={formData.fullName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, fullName: e.target.value})}
                        required
                        className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-900/5 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                       <label className="text-sm font-medium text-gray-700 ml-1">Contact Number</label>
                       <Input 
                        placeholder="e.g. +977 4820 900" 
                        value={formData.contact}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, contact: e.target.value})}
                        required
                        className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-900/5 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="space-y-3">
                       <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                       <Input 
                        placeholder="e.g. jdoe@example.com" 
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-900/5 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                       <label className="text-sm font-medium text-gray-700 ml-1">Permanent Address</label>
                       <Input 
                        placeholder="e.g. Kathmandu, Nepal" 
                        value={formData.address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, address: e.target.value})}
                        className="bg-gray-50/50 h-16 rounded-[1.25rem] border-gray-100 px-6 font-bold text-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-900/5 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-blue-950 hover:bg-red-600 text-white h-16 text-lg  font-bold rounded-2xl transition-all duration-500 shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group/btn"
                  >
                    {submitting ? (
                       <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        CONFIRM ATTENDANCE
                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Right Column: High-End Media Display */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="sticky top-10"
            >
              <div className="relative aspect-[4/5] bg-gray-50 rounded-[4rem] overflow-hidden shadow-2xl group border-[16px] border-white">
                {event.image ? (
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-950">
                    <Sparkles className="w-20 h-20 text-white/10" />
                  </div>
                )}
                
                {/* Visual Accent Overlays */}
                <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay" />
                <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-2xl flex flex-col items-center">
                   <div className="text-4xl  font-bold text-red-600">2026</div>
                   <div className="text-[10px]  font-bold uppercase tracking-[0.2em] text-blue-900">Elite Series</div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-10 -left-10 bg-blue-950 p-8 rounded-[2.5rem] shadow-2xl text-white max-w-[280px]"
              >
                 <GraduationCap className="w-10 h-10 text-red-500 mb-4" />
                 <h4 className="text-xl font-bold mb-2 leading-tight">Direct University Interaction</h4>
                 <p className="text-blue-200/60 text-sm font-medium">Meet representatives from top-tier institutions directly during the summit.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Decorative Brand Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
           {/* You could map partner logos here if available */}
           <div className="text-2xl  font-bold tracking-tighter text-blue-950 italic underline decoration-red-600 decoration-4">UNITY GROUP</div>
           <div className="text-2xl  font-bold tracking-tighter text-blue-950 italic underline decoration-red-600 decoration-4 uppercase">Elite Selection</div>
           <div className="text-2xl  font-bold tracking-tighter text-blue-950 italic underline decoration-red-600 decoration-4">Global Network</div>
        </div>
      </section>
    </div>
  )
}
