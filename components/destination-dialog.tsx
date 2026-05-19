"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MediaPickerDialog } from "@/components/media-picker-dialog"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageIcon } from "lucide-react"
import type { Destination } from "@/lib/db-utils"

interface DestinationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  destination: Destination | null
  onSave: (destinationData: Partial<Destination>) => Promise<void>
}

export function DestinationDialog({ open, onOpenChange, destination, onSave }: DestinationDialogProps) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    status: "active" as "active" | "inactive",
    highlights: "",
    popularPrograms: "",
    image: "",
  })

  useEffect(() => {
    if (destination) {
      setFormData({
        name: destination.name,
        slug: destination.slug,
        shortDescription: destination.shortDescription,
        description: destination.description,
        metaTitle: destination.metaTitle,
        metaDescription: destination.metaDescription,
        status: destination.status,
        highlights: destination.highlights?.join(", ") || "",
        popularPrograms: destination.popularPrograms?.join(", ") || "",
        image: destination.image || "",
      })
      return
    }

    setFormData({
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      status: "active",
      highlights: "",
      popularPrograms: "",
      image: "",
    })
  }, [destination, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave({
      ...formData,
      highlights: formData.highlights
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      popularPrograms: formData.popularPrograms
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{destination ? "Edit Destination" : "Create Destination"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(newContent: string) => setFormData({ ...formData, description: newContent })}
              placeholder="Describe this destination in detail..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}>
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
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlights">Highlights (comma separated)</Label>
            <Textarea
              id="highlights"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popularPrograms">Popular Programs (comma separated)</Label>
            <Textarea
              id="popularPrograms"
              value={formData.popularPrograms}
              onChange={(e) => setFormData({ ...formData, popularPrograms: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" variant="outline" onClick={() => setMediaPickerOpen(true)}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Browse
              </Button>
            </div>
            {formData.image && (
              <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-lg border">
                <img src={formData.image || "/placeholder.svg"} alt="Destination preview" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{destination ? "Update Destination" : "Create Destination"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <MediaPickerDialog
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => setFormData({ ...formData, image: url })}
        currentImage={formData.image}
      />
    </Dialog>
  )
}
