"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ServicesTable } from "@/components/services-table"
import { ServiceDialog } from "@/components/service-dialog"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Service } from "@/lib/db-utils"

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredServices(filtered)
  }, [searchQuery, services])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services?limit=100")
      const data = await response.json()
      setServices(data.services)
      setFilteredServices(data.services)
    } catch (error) {
      console.error("[v0] Error fetching services:", error)
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (serviceData: Partial<Service>) => {
    try {
      const url = selectedService ? `/api/services/${selectedService._id}` : "/api/services"
      const method = selectedService ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      })

      if (!response.ok) throw new Error("Failed to save service")

      toast({
        title: "Success",
        description: `Service ${selectedService ? "updated" : "created"} successfully`,
      })

      fetchServices()
      setSelectedService(null)
    } catch (error) {
      console.error("[v0] Error saving service:", error)
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete service")

      toast({
        title: "Success",
        description: "Service deleted successfully",
      })

      fetchServices()
    } catch (error) {
      console.error("[v0] Error deleting service:", error)
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedService(null)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading services...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Services</h1>
          <p className="text-muted-foreground mt-1">Manage service offerings and support details</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ServicesTable services={filteredServices} onEdit={handleEdit} onDelete={handleDelete} />

      <ServiceDialog open={dialogOpen} onOpenChange={setDialogOpen} service={selectedService} onSave={handleSave} />
    </div>
  )
}
