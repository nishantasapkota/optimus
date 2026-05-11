"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function EditTestimonialPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) return

      try {
        const response = await fetch(`/api/testimonials/${id}`)
        if (!response.ok) {
          toast.error("Failed to load testimonial")
          router.push("/admin/testimonials")
          return
        }

        const data = await response.json()
        const testimonial = data?.testimonial

        if (!testimonial) {
          toast.error("Testimonial not found")
          router.push("/admin/testimonials")
          return
        }

        setFormData({
          name: testimonial.name ?? "",
          designation: testimonial.designation ?? "",
          description: testimonial.description ?? "",
          image: testimonial.image ?? "",
        })
      } catch (error) {
        console.error("Error fetching testimonial:", error)
        toast.error("An error occurred while loading testimonial")
        router.push("/admin/testimonials")
      } finally {
        setLoadingData(false)
      }
    }

    fetchTestimonial()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    setLoading(true)

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Testimonial updated successfully")
        router.push("/admin/testimonials")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to update testimonial")
      }
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast.error("An error occurred while saving")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
          <p className="text-muted-foreground">Update the details for this testimonial.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testimonial Details</CardTitle>
          <CardDescription>Edit and save changes to this testimonial.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingData ? (
            <div className="py-10 text-center">Loading testimonial...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g. John Doe" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    placeholder="e.g. CEO at Company"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Provide a URL for the person's photo.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Testimonial)</Label>
                <Textarea
                  id="description"
                  placeholder="What did they say about your service?"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link href="/admin/testimonials">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Update Testimonial"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
