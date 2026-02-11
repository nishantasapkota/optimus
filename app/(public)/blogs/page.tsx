"use client"

import { getBlogs } from "@/lib/db-utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Sparkles, Search, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { PageHero } from "@/components/public/page-hero"
import { cn } from "@/lib/utils"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 6
  
  useEffect(() => {
    setLoading(true)
    fetch(`/api/blogs?page=${page}&limit=${limit}&search=${search}`)
      .then(res => res.json())
      .then(data => {
        if (data.blogs) {
          setBlogs(data.blogs)
          setTotalPages(data.totalPages)
        }
      })
      .finally(() => setLoading(false))
  }, [page, search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleClearSearch = () => {
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-0 bg-transparent min-h-screen">
      <PageHero 
        title={<>Insights for <br /> <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">Global Success.</span></>}
        description="Stay ahead with the latest trends, university updates, and scholarship opportunities curated by our experts."
        breadcrumbItems={[{ label: "Knowledge Hub" }]}
        badge="Global Knowledge Hub"
      />

      {/* Main Content */}
      <section className="py-24 md:py-32">
        <div className="container">
          {/* Header & Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-red-600  font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Expert Resources</span>
              <h2 className="text-4xl md:text-6xl  font-bold text-blue-950 tracking-tighter leading-tight">
                Latest from <br /> <span className="text-red-600 underline">Unity Insights</span>
              </h2>
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100 w-full md:w-auto">
              <div className="flex items-center gap-3 px-4 flex-1">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  placeholder="Search articles..." 
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold text-blue-900 w-full md:w-48 placeholder:text-gray-400"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-blue-950 hover:bg-red-600 rounded-xl px-6  font-bold uppercase tracking-widest text-xs h-12 transition-all">
                Search
              </Button>
            </form>
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="space-y-6 animate-pulse">
                  <div className="aspect-[4/3] bg-gray-100 rounded-[2.5rem]" />
                  <div className="h-4 w-32 bg-gray-100 rounded-full" />
                  <div className="h-8 w-full bg-gray-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog._id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                    <div className="flex flex-col h-full">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-700 bg-gray-100">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-blue-950 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/10" />
                          </div>
                        )}
                        
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-[10px]  font-bold text-blue-900 shadow-sm uppercase tracking-widest z-20">
                          <Calendar className="w-3.5 h-3.5 text-red-600" />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        
                        <div className="absolute inset-0 bg-blue-950/20 group-hover:opacity-0 transition-opacity duration-700" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4 px-2">
                        <h3 className="text-2xl md:text-3xl  font-bold text-blue-950 group-hover:text-red-600 transition-colors duration-500 tracking-tight leading-tight line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="pt-4 flex items-center gap-3 text-red-600  font-bold uppercase tracking-widest text-[10px] group-hover:gap-5 transition-all duration-500">
                          READ ARTICLE <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && blogs.length > 0 && totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl px-8 h-12  font-bold uppercase tracking-widest text-xs"
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-xl text-xs  font-bold transition-all",
                      page === i + 1 ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "bg-gray-100 text-blue-950 hover:bg-gray-200"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-xl px-8 h-12  font-bold uppercase tracking-widest text-xs"
              >
                Next
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && blogs.length === 0 && (
            <div className="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl  font-bold text-blue-950 mb-2">
                {search ? "No matches found" : "No Insights Yet"}
              </h3>
              <p className="text-gray-500 font-medium">
                {search ? `Searching for "${search}" didn't return any results.` : "We're currently drafting new strategic updates for you. Stay tuned!"}
              </p>
              <div className="flex items-center justify-center gap-4 mt-8">
                {search && (
                   <Button onClick={handleClearSearch} variant="outline" className="rounded-2xl px-10 py-7  font-bold transition-all">
                    Clear Search
                  </Button>
                )}
                <Link href="/">
                  <Button className="bg-blue-950 hover:bg-red-600 text-white rounded-2xl px-10 py-7  font-bold transition-all">
                    Back to Hub
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Accent */}
      <section className="pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-red-600 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-red-600/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl  font-bold text-white mb-8 tracking-tighter leading-tight">
                Get Strategic Updates <br /> In Your Inbox.
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  placeholder="Your professional email" 
                  className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 h-16 text-white placeholder:text-white/50 font-bold focus:ring-2 focus:ring-white/30"
                />
                <Button className="bg-white text-red-600 hover:bg-blue-950 hover:text-white h-16 px-12 rounded-2xl  font-bold tracking-widest text-xs transition-all">
                  SUBSCRIBE
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


