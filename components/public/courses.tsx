"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import type { Course } from "@/lib/db-utils"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface CoursesProps {
  initialCourses?: Course[]
  initialTotal?: number
}

export function Courses({ initialCourses = [], initialTotal = 0 }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [page, setPage] = useState(initialCourses.length > 0 ? 1 : 0)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 6))
  const [loading, setLoading] = useState(false)
  const limit = 6

  const fetchCourses = useCallback(async (pageNum: number, append = false) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/courses?page=${pageNum}&limit=${limit}`)
      const data = await res.json()
      if (data.courses) {
        setCourses((prev) => (append ? [...prev, ...data.courses] : data.courses))
        setTotalPages(data.totalPages)
        setPage(pageNum)
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialCourses.length === 0) {
      fetchCourses(1, false)
    }
  }, [fetchCourses, initialCourses.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col gap-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <span className="text-red-600 font-bold uppercase tracking-widest text-sm">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 max-w-3xl tracking-tight">
                Find the course that matches your goals and your future.
              </h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Courses</p>
              <p className="mt-2 text-lg font-semibold text-blue-950">
                {courses.length} listed
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-slate-600 text-lg">
            Explore curated programs, compare pathways, and get expert support to choose the right academic direction.
          </p>
        </motion.div>

        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={page}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <motion.div 
                    key={course._id?.toString() || index} 
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(15,23,42,0.75)]"
                  >
                    <div className="relative h-56">
                      {course.icon ? (
                        <Image 
                          src={course.icon} 
                          alt={course.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                          <span className="text-white font-bold text-xl px-6 text-center">{course.name}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                      <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl font-semibold text-blue-950 mb-3 leading-tight">
                        {course.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-6 line-clamp-2 font-medium leading-relaxed">
                        {course.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(course.highlights || []).slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                        {(course.highlights || []).length === 0 && (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                            Personalized guidance
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/courses/${course.slug}`} 
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-950 group/link transition-colors hover:text-red-600"
                      >
                        Explore Course
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full h-80 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No courses found.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {page < totalPages && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => fetchCourses(page + 1, true)}
              disabled={loading}
              className="rounded-full px-8 h-12 bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-900/20"
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
