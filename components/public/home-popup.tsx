"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Sparkles, X, ArrowRight, Bell, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface HomePopupProps {
  initialEvent?: {
    title?: string
    description?: string
    date?: string
    location?: string
    image?: string
    slug?: string
  } | null
}

export function HomePopup({ initialEvent }: HomePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const displayEvent = initialEvent || {
    title: "Global Education Expo 2025",
    description: "Meet top UK university representatives and explore scholarship opportunities for the upcoming intake.",
    date: "Coming Soon",
    location: "Optimus Global Head Office",
    image: "/professional-team-meeting.png",
    slug: "global-expo-2025"
  }

  const description = displayEvent.description || "Connect with our counseling team and discover the right university pathway for your profile."
  const shortDescription =
    description.length > 190 ? `${description.slice(0, 187)}...` : description

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-5xl p-0 overflow-hidden border border-slate-200 rounded-[2rem] bg-white shadow-2xl overflow-y-auto max-h-[92vh]"
      >
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[320px] md:min-h-[540px] overflow-hidden">
            <Image
              src={displayEvent.image || "/professional-team-meeting.png"}
              alt={displayEvent.title || "Upcoming event"}
              fill
              className="object-cover scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/75 to-red-700/55" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_40%)]" />

            <div className="absolute left-6 top-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Featured Announcement
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="absolute bottom-6 left-6 right-6 z-20 space-y-5"
            >
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">Upcoming Event</p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  {displayEvent.title}
                </h2>
                <p className="text-sm text-white/85 leading-relaxed">{shortDescription}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Date</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <Calendar className="h-4 w-4" />
                    {displayEvent.date || "Coming soon"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Location</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <MapPin className="h-4 w-4" />
                    {displayEvent.location || "Optimus Global Head Office"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative px-6 py-8 sm:px-8 md:px-10 md:py-10 bg-[radial-gradient(circle_at_top_left,#f8fafc,transparent_55%)]">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-4 pt-7 md:pt-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                  <Bell className="h-3.5 w-3.5" />
                  First Visit Highlight
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 leading-tight">
                  Plan your next move with our admissions experts.
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Reserve your seat now to meet advisors, review scholarship pathways, and get direct answers for your intake timeline.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Why attend</p>
                <div className="mt-3 space-y-2.5">
                  {[
                    "University shortlisting based on your profile",
                    "Latest visa and scholarship guidance",
                    "One-on-one discussion with our team",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/event" className="w-full">
                  <Button className="h-12 w-full rounded-xl bg-slate-900 text-white hover:bg-red-600 transition group">
                    View Event Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="h-12 w-full rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Dismiss
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
