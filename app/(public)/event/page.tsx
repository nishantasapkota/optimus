"use client"

import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Loader2, Sparkles, Send, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { PageHero } from "@/components/public/page-hero"

type EventData = {
  _id: string
  title: string
  description?: string
  status?: string
  date?: string
  location?: string
  image?: string
}

export default function EventPage() {
  const [event, setEvent] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    address: "",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!event) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/event/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventId: event._id,
        }),
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
      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(80%_90%_at_20%_20%,rgba(37,99,235,0.24),transparent_60%),radial-gradient(70%_80%_at_85%_10%,rgba(220,38,38,0.22),transparent_60%)]" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 text-center px-6">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">Loading event details</p>
        </div>
      </div>
    )
  }

  if (!event || event.status === "inactive") {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Calendar className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">No Active Events Right Now</h1>
          <p className="mt-4 max-w-xl text-slate-600 leading-relaxed">
            We are currently preparing the next intake-focused session. Please check back soon for new event announcements.
          </p>
          <Link href="/" className="mt-8">
            <Button className="h-11 rounded-xl bg-slate-900 px-6 text-white hover:bg-red-600">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        title={event.title}
        description="Join our admissions-focused event to get direct guidance on universities, scholarships, and intake planning."
        breadcrumbItems={[{ label: "Events", href: "/event" }, { label: event.title }]}
        badge="Admissions Event"
      />

      <section className="relative -mt-14 pb-24">
        <div className="container">
          <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {event.image ? (
                    <Image src={event.image} alt={event.title} fill className="object-cover" priority />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                      <Sparkles className="h-14 w-14 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent" />

                  <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Date</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                        <Calendar className="h-4 w-4" />
                        {event.date || "Date to be announced"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Location</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                        <MapPin className="h-4 w-4" />
                        {event.location || "Optimus Global Head Office"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-8 pt-7 sm:px-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Event Brief
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">What this session covers</h2>

                  <div
                    className="mt-4 text-[15px] leading-relaxed text-slate-700 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{
                      __html:
                        event.description ||
                        "<p>Detailed agenda and expert lineup will be shared soon.</p>",
                    }}
                  />
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Profile-based university shortlisting",
                  "Scholarship and visa process updates",
                  "Direct counseling and action plan",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-red-600" />
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="xl:sticky xl:top-24"
            >
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-7 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700">
                    <ArrowRight className="h-3.5 w-3.5" />
                    Registration
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Reserve Your Seat</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Fill in your details and we will confirm your participation by email or phone.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <Input
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-900 focus-visible:ring-blue-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Contact Number</label>
                    <Input
                      placeholder="e.g. +977 9800000000"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                      className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-900 focus-visible:ring-blue-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-900 focus-visible:ring-blue-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <Input
                      placeholder="e.g. Kathmandu"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-900 focus-visible:ring-blue-300"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 h-12 w-full rounded-xl bg-slate-900 text-white hover:bg-red-600"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Confirm Registration
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  By registering, you agree to be contacted regarding event details and related academic counseling updates.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}
