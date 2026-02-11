"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, BookOpen, FileCheck } from "lucide-react"

export function ConsultancySection() {
  return (
    <section className="py-20 bg-blue-50/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              We are an Educational Consultancy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Optimus Global is a premier educational consultancy dedicated to helping students achieve their dreams of studying abroad. With years of experience and a track record of success, we provide comprehensive guidance and support throughout your educational journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-blue-950">700+</div>
                  <div className="text-xs text-gray-500 font-medium">Global Partners</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-blue-950">6000+</div>
                  <div className="text-xs text-gray-500 font-medium">Students Guided</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-blue-950">15000+</div>
                  <div className="text-xs text-gray-500 font-medium">Applications</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-gray-200/50"
          >
            <h3 className="text-2xl font-bold text-blue-950 mb-2">Book an appointment</h3>
            <p className="text-gray-500 mb-8 font-medium">Fill out the form below to schedule a free consultation.</p>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                  <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Choose Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm appearance-none">
                    <option>Select Subject</option>
                    <option>Visa Consultation</option>
                    <option>Admissions</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 outline-none transition-all text-sm" />
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl text-lg font-bold shadow-lg shadow-red-600/20 transition-all mt-4">
                Book An Appointment
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
