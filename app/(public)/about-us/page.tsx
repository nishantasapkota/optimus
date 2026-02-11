"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Target, Gem, Eye } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"

export default function AboutUsPage() {
  const [bodMembers, setBodMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch("/api/bod")
        .then(res => res.json())
        .then(data => {
          if (data.members) setBodMembers(data.members)
        })
        .catch(err => console.error('Error fetching BOD members:', err))
        .finally(() => setLoading(false))
    }
  }, [])

  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen text-slate-900">
      <PageHero 
        title="About Us"
        description="Empowering students to achieve their global academic dreams through expert guidance and support."
        breadcrumbItems={[{ label: "About Us" }]}
      />

      {/* Building Connections Section */}
      <section className="relative py-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-rose-100 blur-3xl" />
          <div className="absolute -bottom-28 left-[-4%] h-80 w-80 rounded-full bg-cyan-100 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_50%)]" />
        </div>
        <div className="container relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-red-600 font-semibold">Who we are</p>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
                <span className="text-slate-900">Building Connections,</span> <br />
                <span className="text-red-600">Creating Impact</span>
              </h2>
              <p className="mt-6 text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                Optimus Global Now offers accommodation services. 100% FREE Education Counselling and Application Processing. We bridge the gap between your aspirations and world-class educational opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
                  100% Free Counselling
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
                  Accommodation Support
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
                  Application Processing
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4 h-[480px]">
                <div className="flex flex-col gap-4 h-full">
                  <div className="relative h-1/2 rounded-3xl overflow-hidden shadow-lg">
                    <Image src="/destinations/germany.png" alt="Germany" fill className="object-cover" />
                  </div>
                  <div className="relative h-1/2 rounded-3xl overflow-hidden shadow-lg">
                    <Image src="/destinations/canada.png" alt="Canada" fill className="object-cover" />
                  </div>
                </div>
                <div className="relative h-full rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/destinations/australia.png" alt="Australia" fill className="object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Our Promise</p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  We bridge the gap between your aspirations and world-class educational opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Centered About Text */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 font-semibold">Our Story</p>
              <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900">
                About us
              </h2>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Our Focus</p>
                <p className="mt-4 text-lg font-semibold text-slate-900 leading-relaxed">
                  Guidance that keeps pace with a fast moving world.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 text-slate-600 text-lg font-medium leading-relaxed"
            >
              <p>
                In today&apos;s fast moving world it is not at all possible or prudent to do all personal investments on your own. Only today&apos;s fast moving world it is not at all possible or prudent to do all personal investments on your own. One can&apos;t keep pace with the quick moving markets and data stream on an everyday promise can I keep pace with the quick moving markets and data stream on an everyday promise.
              </p>
              <p>
                In today&apos;s fast moving world it is not at all possible or prudent to do all personal investments on your own. One can&apos;t keep pace with the quick moving markets and data stream on an everyday promise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video/Image Hero Section */}
      <section className="py-24 bg-slate-950">
        <div className="container">
          <div className="relative h-[520px] w-full overflow-hidden rounded-[36px] border border-white/10">
            <Image 
              src="/professional-team-meeting.png" 
              alt="Team Working" 
              fill 
              className="object-cover brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-10">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Inside Optimus</p>
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold text-white">
                  A closer look at how we guide students.
                </h3>
              </div>
            </div>
            <div className="absolute bottom-10 right-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-red-600 shadow-2xl relative z-10"
              >
                <Play className="w-8 h-8 fill-current" />
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Values Vision */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mission",
                icon: Target,
                desc: "Our mission is to empower students through personalized guidance and seamless application processing."
              },
              {
                title: "Values",
                icon: Gem,
                desc: "We prioritize integrity, excellence, and student-centric support in every step of our journey."
              },
              {
                title: "Vision",
                icon: Eye,
                desc: "To be the most trusted portal for global education, creating a worldwide network of successful scholars."
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(15,23,42,0.6)]"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.12),transparent_55%)]" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/40 group-hover:bg-red-600 transition-colors">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-red-600 font-semibold">Leadership</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">Our Team</h2>
            </div>
            <p className="max-w-xl text-lg text-slate-600 font-medium">
              Dedicated to guiding students at every step of their global education journey.
            </p>
          </div>

          <div className="space-y-16">
            {/* Top Director */}
            <div className="flex justify-center">
              {bodMembers.filter(m => m.level === 1).slice(0, 1).map((member) => (
                <TeamCard key={member._id} member={member} isLarge />
              ))}
              {bodMembers.filter(m => m.level === 1).length === 0 && (
                 <div className="w-80 aspect-[4/5] bg-slate-200/70 rounded-3xl animate-pulse" />
              )}
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {bodMembers.filter(m => m.level > 1 || (m.level === 1 && bodMembers.indexOf(m) > 0)).map((member) => (
                <TeamCard key={member._id} member={member} />
              ))}
              {bodMembers.length === 0 && loading && Array(8).fill(null).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-slate-200/70 rounded-3xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}

function TeamCard({ member, isLarge = false }: { member: any; isLarge?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`relative group ${isLarge ? 'w-full max-w-sm' : 'w-full'}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_50px_-30px_rgba(15,23,42,0.7)]">
        <Image 
          src={member.image || "/placeholder-user.jpg"} 
          alt={member.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80">
            {member.role}
          </span>
          <h3 className="mt-3 text-lg font-semibold text-white truncate">{member.name}</h3>
        </div>
      </div>
    </motion.div>
  )
}
