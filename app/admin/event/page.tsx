"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, Plus, Users, Calendar, Save } from "lucide-react"

export default function AdminEventPage() {
  const [loading, setLoading] = useState(true)
  const [registrationsLoading, setRegistrationsLoading] = useState(true)
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
    status: "active" as "active" | "inactive"
  })
  const [registrations, setRegistrations] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchEvent()
    fetchRegistrations()
  }, [])

  async function fetchEvent() {
    try {
      const res = await fetch("/api/event")
      const data = await res.json()
      if (data.event) {
        setEventData({
          title: data.event.title || "",
          description: data.event.description || "",
          image: data.event.image || "",
          date: data.event.date || "",
          location: data.event.location || "",
          status: data.event.status || "active"
        })
      }
    } catch (error) {
      toast.error("Failed to load event data")
    } finally {
      setLoading(false)
    }
  }

  async function fetchRegistrations() {
    try {
      const res = await fetch("/api/event/registrations")
      const data = await res.json()
      setRegistrations(data.registrations || [])
    } catch (error) {
      toast.error("Failed to load registrations")
    } finally {
      setRegistrationsLoading(false)
    }
  }

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData)
      })
      if (res.ok) {
        toast.success("Event updated successfully")
      } else {
        toast.error("Failed to update event")
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
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
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Event</h1>
          <p className="text-muted-foreground">Manage the active event and view registrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Edit Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Event Details
            </CardTitle>
            <CardDescription>Only one event can be active at a time.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input 
                  placeholder="e.g. Study in UK Seminar 2025" 
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <RichTextEditor
                  value={eventData.description}
                  onChange={(newContent: string) => setEventData({...eventData, description: newContent})}
                  placeholder="Event description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date/Time</label>
                  <Input 
                    placeholder="e.g. Feb 15, 2025 at 10:00 AM" 
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    placeholder="e.g. Unity Group HQ" 
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Banner Image URL</label>
                <Input 
                  placeholder="https://..." 
                  value={eventData.image}
                  onChange={(e) => setEventData({...eventData, image: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={eventData.status}
                  onChange={(e) => setEventData({...eventData, status: e.target.value as "active" | "inactive"})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Event Settings
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Registrations List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Event Registrations
            </CardTitle>
            <CardDescription>List of people who have registered for the current event.</CardDescription>
          </CardHeader>
          <CardContent>
            {registrationsLoading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : registrations.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center text-center">
                <Users className="h-8 w-8 mb-2 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground text-sm">No registrations yet.</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Registered At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg: any) => (
                      <TableRow key={reg._id}>
                        <TableCell className="font-medium">{reg.fullName}</TableCell>
                        <TableCell>{reg.contact}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
