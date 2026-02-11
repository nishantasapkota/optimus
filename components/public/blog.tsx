"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Blog as BlogType } from "@/lib/db-utils"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface BlogProps {
  initialBlogs?: BlogType[]
  initialTotal?: number
}

export function Blog({ initialBlogs = [], initialTotal = 0 }: BlogProps) {
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / 3))
  const [loading, setLoading] = useState(false)
  const limit = 3

  const fetchBlogs = useCallback(async (pageNum: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blogs?page=${pageNum}&limit=${limit}`)
      const data = await res.json()
      if (data.blogs) {
        setBlogs(data.blogs)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (page !== 1 || (initialBlogs.length === 0 && initialTotal > 0)) {
      fetchBlogs(page)
    }
  }, [page, fetchBlogs, initialBlogs.length, initialTotal])

  const handlePrev = () => {
    if (page > 1) setPage(p => p - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(p => p + 1)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Blogs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
          >
            Insights & Resources
          </motion.h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium">
             Stay updated with the latest trends and guides in international education.
          </p>
        </div>

        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
              <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id?.toString() || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block">
                      <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-lg">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center text-white font-bold">
                            OPTIMUS BLOG
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-950 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <span className="text-red-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full h-80 flex items-center justify-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-[2rem]">
                  No articles found.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2"
              onClick={handlePrev}
              disabled={page <= 1 || loading}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-2"
              onClick={handleNext}
              disabled={page >= totalPages || loading}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
