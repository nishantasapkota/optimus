"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            Contact Us
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
             Reach out to us for any inquiries or support throughout your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                Send Message
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-blue-50/30 p-8 flex items-center justify-center border border-gray-100"
          >
             {/* Abstract World Map decoration */}
             <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                 <svg viewBox="0 0 800 400" className="w-full h-full text-blue-900 fill-current">
                    <path d="M150 150 Q 200 100 250 150 T 350 150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="150" cy="150" r="5" />
                    <circle cx="250" cy="150" r="5" />
                    <circle cx="450" cy="200" r="5" />
                    <circle cx="650" cy="150" r="5" />
                 </svg>
             </div>
             
             {/* Pins and Flags (Simplified) */}
             <div className="relative w-full h-full flex flex-wrap gap-12 items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-xs">USA</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-xs">AUS</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-xs">GER</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center font-bold text-xs">CAN</div>
                </div>
             </div>

             {/* Bottom Overlay Info */}
             <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <Send className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-xs text-gray-500 font-bold uppercase">Success Rate</p>
                   <p className="text-lg font-black text-blue-900">98% Satisfied Students</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
