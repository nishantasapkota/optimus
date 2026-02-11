"use client"

import { Contact } from "@/components/public/contact"
import { PageHero } from "@/components/public/page-hero"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHero 
        title={<>Get in <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Touch.</span></>}
        description="Have questions about studying abroad? Our expert consultants are here to guide you every step of the way. Reach out to us today!"
        breadcrumbItems={[{ label: "Contact Us" }]}
        badge="Global Support Network"
      />

      {/* Main Contact Section (Reused) */}
      <Contact />
      
      {/* Simplified Map Section could go here if needed, but Contact already has a placeholder */}
    </div>
  )
}
