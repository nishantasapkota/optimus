"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, MessageSquare, ShieldCheck, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"

export default function OnlineConsultationPage() {
  return (
    <div className="flex flex-col gap-0 bg-transparent">
      <PageHero 
        title={<>Strategic <br /> <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Virtual Session.</span></>}
        description="Connect with our global consultants from anywhere in the world. Precision guidance delivered directly to your screen."
        breadcrumbItems={[{ label: "Virtual Consultation" }]}
        badge="Global Virtual Connect"
      />

      {/* Benefits Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600  font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Consultation Protocol</span>
              <h2 className="text-4xl md:text-6xl  font-bold text-blue-950 tracking-tighter leading-tight mb-8">
                Why Book a <span className="text-red-600 italic underline">Strategy Session?</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  "Direct access to University-certified admission experts",
                  "Comprehensive scholarship eligibility evaluation",
                  "High-precision visa documentation strategy",
                  "Tailored academic mapping for global institutions",
                  "Instant clarification on complex admission protocols",
                  "Priority processing for verified participants"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 font-medium text-lg leading-tight lg:leading-normal">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <h4 className="flex items-center gap-2 text-blue-950  font-bold uppercase tracking-tight mb-2">
                    <ShieldCheck className="w-5 h-5 text-red-600" />
                    Verified Expertise
                  </h4>
                  <p className="text-blue-900/60 text-sm font-medium">Unity Group consultations are conducted by certified professionals with a minimum of 8 years in international academic affairs.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-auto lg:h-[700px] rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop"
                alt="Online Consultation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <Zap className="w-6 h-6" />
                   </div>
                   <div>
                      <h5 className="text-white  font-bold uppercase tracking-widest text-xs">Unity Direct</h5>
                      <p className="text-blue-100/60 font-bold text-sm">Real-time Global Connectivity</p>
                   </div>
                </div>
                <p className="text-white font-medium text-sm leading-relaxed italic">"Our goal is to erase the boundaries between you and your global education. Strategic consultation is the first step."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 md:py-32 bg-gray-50 border-t border-gray-100">
        <div className="container">
          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl  font-bold text-blue-950 tracking-tighter mb-4">Secure Your Session</h2>
                <p className="text-gray-500 text-lg font-medium">Deployment starts after verification. Fill the secure brief below.</p>
             </div>

             <form className="space-y-8 bg-white p-8 md:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-900/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-2">Full Legal Name</label>
                    <Input placeholder="e.g. Liam Anderson" className="bg-gray-50 h-16 rounded-2xl border-none px-6 font-bold text-blue-900 focus:bg-white transition-all ring-0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 ml-2">Email Address</label>
                    <Input placeholder="e.g. liam.a@success.com" className="bg-gray-50 h-16 rounded-2xl border-none px-6 font-bold text-blue-900 focus:bg-white transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-2">Subject</label>
                  <Input placeholder="e.g. University Mapping, Visa Strategy" className="bg-gray-50 h-16 rounded-2xl border-none px-6 font-bold text-blue-900 focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-2">Message</label>
                  <Textarea placeholder="Describe your academic background and global targets..." className="bg-gray-50 min-h-[180px] rounded-3xl border-none p-8 font-bold text-blue-900 focus:bg-white transition-all" />
                </div>
                
                <div className="pt-8">
                  <Button className="w-full bg-blue-950 hover:bg-red-600 text-white h-20 text-xl  font-bold rounded-[2rem] transition-all duration-500 shadow-xl shadow-blue-900/10 flex items-center justify-center gap-4 group">
                    INITIATE CONTACT
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <div className="mt-8 flex items-center justify-center gap-8 border-t border-gray-50 pt-8">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span className="text-[10px]  font-bold uppercase tracking-widest text-gray-400">256-Bit Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px]  font-bold uppercase tracking-widest text-gray-400">Global Priority</span>
                    </div>
                  </div>
                </div>
             </form>
          </div>
        </div>
      </section>
    </div>
  )
}

