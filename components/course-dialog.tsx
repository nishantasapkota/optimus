"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MediaPickerDialog } from "@/components/media-picker-dialog"
import { ImageIcon } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"
import type { Course } from "@/lib/db-utils"

interface CourseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  course: Course | null
  onSave: (courseData: Partial<Course>) => Promise<void>
}

export function CourseDialog({ open, onOpenChange, course, onSave }: CourseDialogProps) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    status: "active" as "active" | "inactive",
    category: "",
    highlights: "",
    icon: "",
  })

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        slug: course.slug,
        description: course.description,
        shortDescription: course.shortDescription,
        status: course.status,
        category: course.category,
        highlights: course.highlights?.join(", ") || "",
        icon: course.icon || "",
      })
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        status: "active",
        category: "",
        highlights: "",
        icon: "",
      })
    }
  }, [course, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const courseData = {
      ...formData,
      highlights: formData.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }
    await onSave(courseData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{course ? "Edit Course" : "Create Course"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(newContent: string) => setFormData({ ...formData, description: newContent })}
              placeholder="Describe the course in detail..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">Course Highlights (comma separated)</Label>
            <Textarea
              id="highlights"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              rows={3}
              placeholder="Placement years, Scholarships, Global recognition, Visa support"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Thumbnail</Label>
            <div className="flex gap-2">
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" variant="outline" onClick={() => setMediaPickerOpen(true)}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </div>
            {formData.icon && (
              <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border">
                <img src={formData.icon || "/placeholder.svg"} alt="Thumbnail preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{course ? "Update Course" : "Create Course"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <MediaPickerDialog
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => setFormData({ ...formData, icon: url })}
        currentImage={formData.icon}
      />
    </Dialog>
  )
}
