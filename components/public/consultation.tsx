"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Consultation() {
  const [businessName, setBusinessName] = useState("Unity Group")

  useEffect(() => {
    fetch("/api/business-details")
      .then(res => res.json())
      .then(data => {
        if (data.details?.name) setBusinessName(data.details.name)
      })
  }, [])

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-[3rem] overflow-hidden bg-blue-950 text-white min-h-[500px] flex items-center shadow-2xl shadow-blue-900/40"
        >
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full">
            <div className="p-10 md:p-20 flex flex-col justify-center items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Limited Sessions Available</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl  font-bold mb-8 tracking-tight leading-tight"
              >
                Start Your <span className="text-red-500">Global</span> <br /> 
                Career Today
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-blue-100 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-medium"
              >
                Connect with {businessName}'s expert mentors for a personalized strategic consultation tailored to your educational goals.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/appointment">
                  <Button className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-10 py-8 text-lg  font-bold rounded-2xl transition-all duration-500 group flex items-center gap-3">
                    Book Free Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-10 py-8 text-lg font-bold rounded-2xl backdrop-blur-md border-2">
                    Inquire Online
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <div className="relative min-h-[400px] hidden lg:flex items-center justify-center p-20">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="relative w-full aspect-square max-w-md"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-blue-700 rounded-[4rem] rotate-6 opacity-20" />
                 <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-3xl rounded-[4rem] -rotate-3 border border-white/10" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                   <div className="w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-red-600/40 rotate-12">
                     <GraduationCap className="w-12 h-12 text-white" />
                   </div>
                   <h3 className="text-3xl  font-bold mb-4">40+ Universities</h3>
                   <p className="text-blue-100 font-medium">Partnered with global institutions across UK, Australia, & USA</p>
                   
                   <div className="mt-12 flex -space-x-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-950 bg-gray-200" />
                     ))}
                     <div className="w-12 h-12 rounded-full border-4 border-blue-950 bg-red-600 flex items-center justify-center text-[10px] font-bold">+1k</div>
                   </div>
                   <p className="mt-4 text-xs font-bold text-blue-300 uppercase tracking-widest">Successful Enrollments</p>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
