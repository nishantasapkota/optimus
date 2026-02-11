"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Plus, Trash2, Globe, ImageIcon, Link as LinkIcon } from "lucide-react"
import { MediaPickerDialog } from "@/components/media-picker-dialog"
import Image from "next/image"

export default function PartnersPage() {
  const [loading, setLoading] = useState(true)
  const [partners, setPartners] = useState<any[]>([])
  const [adding, setAdding] = useState(false)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  
  const [newPartner, setNewPartner] = useState({
    name: "",
    logo: "",
    website: "",
    order: 0
  })

  useEffect(() => {
    fetchPartners()
  }, [])

  async function fetchPartners() {
    try {
      const res = await fetch("/api/partners")
      const data = await res.json()
      setPartners(data.partners || [])
    } catch (error) {
      toast.error("Failed to load partners")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPartner.logo) {
      toast.error("Please select a logo")
      return
    }
    setAdding(true)
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPartner)
      })
      if (res.ok) {
        toast.success("Partner added successfully")
        setNewPartner({ name: "", logo: "", website: "", order: 0 })
        fetchPartners()
      } else {
        toast.error("Failed to add partner")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return
    try {
      const res = await fetch(`/api/partners?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Partner deleted")
        fetchPartners()
      } else {
        toast.error("Failed to delete")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Partner Universities</h1>
        <p className="text-muted-foreground text-lg">Manage the logos of universities you collaborate with.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Section */}
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <CardHeader>
            <CardTitle className="text-xl">Add New Partner</CardTitle>
            <CardDescription>Enter university details and logo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">University Name</label>
                <Input 
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="e.g. University of Oxford"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <div className="flex gap-2">
                  <div 
                    className="flex-1 h-10 px-3 bg-muted rounded-md flex items-center text-sm text-muted-foreground truncate cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={() => setMediaPickerOpen(true)}
                  >
                    {newPartner.logo ? newPartner.logo : "Select from media..."}
                  </div>
                  <Button type="button" variant="outline" size="icon" onClick={() => setMediaPickerOpen(true)}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                {newPartner.logo && (
                  <div className="mt-2 relative h-20 w-fit aspect-video bg-muted rounded-md overflow-hidden border">
                    <Image src={newPartner.logo} alt="Preview" fill className="object-contain p-2" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL (Optional)</label>
                <Input 
                  value={newPartner.website}
                  onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Order</label>
                <Input 
                  type="number"
                  value={newPartner.order}
                  onChange={(e) => setNewPartner({ ...newPartner, order: parseInt(e.target.value) })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={adding}>
                {adding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Add Partner
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partners.length === 0 ? (
              <div className="col-span-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
                <ImageIcon className="h-8 w-8 mb-2 opacity-20" />
                <p>No partners added yet.</p>
              </div>
            ) : (
              partners.map((partner) => (
                <Card key={partner._id} className="group overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 bg-muted rounded-lg shrink-0 overflow-hidden">
                      <Image src={partner.logo} alt={partner.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{partner.name}</h3>
                      {partner.website && (
                        <a 
                          href={partner.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary flex items-center gap-1 hover:underline"
                        >
                          <LinkIcon className="h-3 w-3" />
                          Visit Website
                        </a>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => partner._id && handleDelete(partner._id.toString())}
                      className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <MediaPickerDialog 
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url) => setNewPartner({ ...newPartner, logo: url })}
        currentImage={newPartner.logo}
      />
    </div>
  )
}
