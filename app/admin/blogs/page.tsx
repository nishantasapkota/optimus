"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogsTable } from "@/components/blogs-table"
import { BlogDialog } from "@/components/blog-dialog"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Blog } from "@/lib/db-utils"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredBlogs(filtered)
  }, [searchQuery, blogs])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs?limit=100")
      const data = await response.json()
      setBlogs(data.blogs)
      setFilteredBlogs(data.blogs)
    } catch (error) {
      console.error("[v0] Error fetching blogs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (blogData: Partial<Blog>) => {
    try {
      const url = selectedBlog ? `/api/blogs/${selectedBlog._id}` : "/api/blogs"
      const method = selectedBlog ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) throw new Error("Failed to save blog")

      toast({
        title: "Success",
        description: `Blog ${selectedBlog ? "updated" : "created"} successfully`,
      })

      fetchBlogs()
      setSelectedBlog(null)
    } catch (error) {
      console.error("[v0] Error saving blog:", error)
      toast({
        title: "Error",
        description: "Failed to save blog",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete blog")

      toast({
        title: "Success",
        description: "Blog deleted successfully",
      })

      fetchBlogs()
    } catch (error) {
      console.error("[v0] Error deleting blog:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedBlog(null)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading blogs...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Blogs</h1>
          <p className="text-muted-foreground mt-1">Manage your blog posts</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <BlogsTable blogs={filteredBlogs} onEdit={handleEdit} onDelete={handleDelete} />

      <BlogDialog open={dialogOpen} onOpenChange={setDialogOpen} blog={selectedBlog} onSave={handleSave} />
    </div>
  )
}
