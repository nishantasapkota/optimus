"use client"

import { Breadcrumb } from "@/components/public/breadcrumb"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface PageHeroProps {
  badge?: string
  title: React.ReactNode
  description: string
  breadcrumbItems?: { label: string; href?: string }[]
}

export function PageHero({ badge = "Institutional Grade Excellence", title, description, breadcrumbItems }: PageHeroProps) {
  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden bg-slate-950 pt-28 pb-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_12%_18%,rgba(56,189,248,0.28),transparent_62%),radial-gradient(60%_70%_at_85%_10%,rgba(244,63,94,0.22),transparent_55%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -bottom-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[160px]" />
        <div className="absolute top-10 left-[-10%] h-[360px] w-[360px] rounded-full bg-rose-500/20 blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950" />
      </div>

      <div className="container relative z-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {breadcrumbItems && (
              <Breadcrumb items={breadcrumbItems} theme="dark" className="mb-10" />
            )}

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-xl">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-[0_0_24px_rgba(251,113,133,0.5)]">
                <Sparkles className="h-4 w-4 animate-spin-slow" />
              </span>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-white/90">
                {badge}
              </span>
            </div>

            <h1 className="mt-8 text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] drop-shadow-2xl">
              {title}
            </h1>

            <p className="mt-6 text-white/80 text-lg md:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="relative"
            aria-hidden="true"
          >
            <div className="relative h-64 md:h-80 lg:h-[360px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_40px_80px_-60px_rgba(0,0,0,0.9)] backdrop-blur">
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-white/15" />
              <div className="absolute -left-16 bottom-6 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-rose-400 shadow-[0_0_18px_rgba(251,113,133,0.8)]" />
              <div className="absolute right-10 bottom-10 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.8)]" />
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 space-y-4">
                <div className="h-2 w-24 rounded-full bg-white/25" />
                <div className="h-2 w-40 rounded-full bg-white/10" />
                <div className="h-2 w-32 rounded-full bg-white/20" />
              </div>
              <div className="absolute bottom-8 left-8 h-px w-16 bg-gradient-to-r from-rose-400 via-white/30 to-transparent" />
              <div className="absolute right-8 top-1/3 h-px w-24 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
