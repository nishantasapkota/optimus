"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { homeDefaultContent, type HomePageContent } from "@/lib/page-content"
import { normalizeBusinessOffices, type BusinessOffice, type BusinessContactDetails } from "@/lib/business-contact"

type ContactContent = HomePageContent["contact"]

export function Contact({ content }: { content?: ContactContent }) {
  const section = content ?? homeDefaultContent.contact
  const [offices, setOffices] = useState<BusinessOffice[]>([])

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const res = await fetch("/api/business-details")
        const data: { details?: BusinessContactDetails } = await res.json()
        setOffices(normalizeBusinessOffices(data.details))
      } catch (error) {
        setOffices([])
      }
    }

    fetchBusinessDetails()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            {section.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            {section.title}
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
             {section.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm shadow-sm" />
              </div>
              <div className="space-y-2">
                <input type="email" placeholder="Email" className="w-full px-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm shadow-sm" />
              </div>
              <div className="space-y-2">
                <input type="text" placeholder="Careers" className="w-full px-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm shadow-sm" />
              </div>
              <div className="space-y-2">
                <textarea rows={6} placeholder="Message" className="w-full px-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm shadow-sm resize-none" />
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-7 rounded-xl text-lg font-bold shadow-lg shadow-red-600/20 transition-all flex items-center gap-3">
                {section.submitLabel}
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>

          {/* Office Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-4"
          >
            {offices.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-blue-50/40 p-8 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{section.mapStatLabel}</p>
                <p className="mt-2 text-2xl font-black text-blue-950">{section.mapStatValue}</p>
              </div>
            ) : (
              offices.map((office) => (
                <div key={`${office.label}-${office.address}`} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-4">
                      <div>
                        <h3 className="text-lg font-black text-blue-950">{office.label}</h3>
                        {office.address && <p className="mt-1 text-sm font-medium leading-relaxed text-gray-600">{office.address}</p>}
                      </div>

                      {office.phones.length > 0 && (
                        <div className="space-y-2">
                          {office.phones.map((phone) => (
                            <div key={phone} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <Phone className="h-4 w-4 text-red-500" />
                              <span>{phone}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {office.emails.length > 0 && (
                        <div className="space-y-2">
                          {office.emails.map((email) => (
                            <div key={email} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                              <Mail className="h-4 w-4 text-red-500" />
                              <span className="break-all">{email}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
