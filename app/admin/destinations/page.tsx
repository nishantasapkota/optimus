"use client"

import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { DestinationDialog } from "@/components/destination-dialog"
import { DestinationsTable } from "@/components/destinations-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import type { Destination } from "@/lib/db-utils"

export default function DestinationsAdminPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchDestinations()
  }, [])

  useEffect(() => {
    const query = searchQuery.toLowerCase()
    const filtered = destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(query) ||
        destination.slug.toLowerCase().includes(query) ||
        destination.shortDescription.toLowerCase().includes(query),
    )
    setFilteredDestinations(filtered)
  }, [searchQuery, destinations])

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations?limit=200")
      const data = await response.json()
      setDestinations(data.destinations)
      setFilteredDestinations(data.destinations)
    } catch (error) {
      console.error("Error fetching destinations:", error)
      toast({
        title: "Error",
        description: "Failed to fetch destinations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (destinationData: Partial<Destination>) => {
    try {
      const url = selectedDestination ? `/api/destinations/${selectedDestination._id}` : "/api/destinations"
      const method = selectedDestination ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destinationData),
      })

      if (!response.ok) throw new Error("Failed to save destination")

      toast({
        title: "Success",
        description: `Destination ${selectedDestination ? "updated" : "created"} successfully`,
      })

      fetchDestinations()
      setSelectedDestination(null)
    } catch (error) {
      console.error("Error saving destination:", error)
      toast({
        title: "Error",
        description: "Failed to save destination",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (destinationId: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return

    try {
      const response = await fetch(`/api/destinations/${destinationId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete destination")

      toast({
        title: "Success",
        description: "Destination deleted successfully",
      })

      fetchDestinations()
    } catch (error) {
      console.error("Error deleting destination:", error)
      toast({
        title: "Error",
        description: "Failed to delete destination",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading destinations...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Destinations</h1>
          <p className="text-muted-foreground mt-1">Manage study destination landing pages from the CMS.</p>
        </div>
        <Button
          onClick={() => {
            setSelectedDestination(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <DestinationsTable
        destinations={filteredDestinations}
        onEdit={(destination) => {
          setSelectedDestination(destination)
          setDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <DestinationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        destination={selectedDestination}
        onSave={handleSave}
      />
    </div>
  )
}
