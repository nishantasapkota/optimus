"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CoursesTable } from "@/components/courses-table"
import { CourseDialog } from "@/components/course-dialog"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Course } from "@/lib/db-utils"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }, [searchQuery, courses])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses?limit=100")
      const data = await response.json()
      setCourses(data.courses)
      setFilteredCourses(data.courses)
    } catch (error) {
      console.error("[v0] Error fetching courses:", error)
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (courseData: Partial<Course>) => {
    try {
      const url = selectedCourse ? `/api/courses/${selectedCourse._id}` : "/api/courses"
      const method = selectedCourse ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      })

      if (!response.ok) throw new Error("Failed to save course")

      toast({
        title: "Success",
        description: `Course ${selectedCourse ? "updated" : "created"} successfully`,
      })

      fetchCourses()
      setSelectedCourse(null)
    } catch (error) {
      console.error("[v0] Error saving course:", error)
      toast({
        title: "Error",
        description: "Failed to save course",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete course")

      toast({
        title: "Success",
        description: "Course deleted successfully",
      })

      fetchCourses()
    } catch (error) {
      console.error("[v0] Error deleting course:", error)
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (course: Course) => {
    setSelectedCourse(course)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedCourse(null)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading courses...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage academic courses and degree paths</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <CoursesTable courses={filteredCourses} onEdit={handleEdit} onDelete={handleDelete} />

      <CourseDialog open={dialogOpen} onOpenChange={setDialogOpen} course={selectedCourse} onSave={handleSave} />
    </div>
  )
}
