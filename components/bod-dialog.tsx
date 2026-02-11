"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"
import { Sparkles, Image as ImageIcon } from "lucide-react"

const MediaPickerDialog = dynamic(() => import("@/components/media-picker-dialog").then(mod => mod.MediaPickerDialog), { ssr: false })

interface BODDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  member?: any
}

export function BODDialog({ open, onOpenChange, onSuccess, member }: BODDialogProps) {
  const [loading, setLoading] = useState(false)
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    level: 3,
    socials: {
      mail: "",
      linkedin: "",
      facebook: "",
      twitter: ""
    }
  })

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        role: member.role || "",
        image: member.image || "",
        level: member.level || 3,
        socials: {
          mail: member.socials?.mail || "",
          linkedin: member.socials?.linkedin || "",
          facebook: member.socials?.facebook || "",
          twitter: member.socials?.twitter || ""
        }
      })
    } else {
      setFormData({
        name: "",
        role: "",
        image: "",
        level: 3,
        socials: {
          mail: "",
          linkedin: "",
          facebook: "",
          twitter: ""
        }
      })
    }
  }, [member, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = "/api/admin/bod"
      const method = member ? "PUT" : "POST"
      const body = member ? { id: member._id, ...formData } : formData

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      if (res.ok) {
        onSuccess()
        onOpenChange(false)
      }
    } catch (error) {
      console.error("Failed to save BOD member:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{member ? "Edit Member" : "Add New Member"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Sharma"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Designation</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Chairman"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Hierarchy Level (1=Top)</Label>
                <Input
                  id="level"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="URL to image"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => setShowMediaPicker(true)}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <Label className="text-sm font-bold opacity-50 uppercase tracking-widest">Social Profiles</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mail">Email Address</Label>
                  <Input
                    id="mail"
                    value={formData.socials.mail}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, mail: e.target.value } })}
                    placeholder="mail@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (URL)</Label>
                  <Input
                    id="linkedin"
                    value={formData.socials.linkedin}
                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <MediaPickerDialog
        open={showMediaPicker}
        onOpenChange={setShowMediaPicker}
        onSelect={(url) => setFormData({ ...formData, image: url })}
      />
    </>
  )
}
