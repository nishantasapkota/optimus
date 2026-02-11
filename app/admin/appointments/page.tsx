"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { AppointmentsTable } from "@/components/appointments-table"
import { AppointmentDetailDialog } from "@/components/appointment-detail-dialog"
import { Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Appointment } from "@/lib/db-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAppointments()
  }, [])

  useEffect(() => {
    let filtered = appointments

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.phone.includes(searchQuery) ||
          appointment.service.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter)
    }

    setFilteredAppointments(filtered)
  }, [searchQuery, statusFilter, appointments])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments")
      const data = await response.json()
      setAppointments(data.appointments)
      setFilteredAppointments(data.appointments)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          reviewedAt: new Date(),
          reviewedBy: "Admin User",
        }),
      })

      if (!response.ok) throw new Error("Failed to approve appointment")

      toast({
        title: "Success",
        description: "Appointment approved successfully",
      })

      fetchAppointments()
    } catch (error) {
      console.error("Error approving appointment:", error)
      toast({
        title: "Error",
        description: "Failed to approve appointment",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "rejected",
          reviewedAt: new Date(),
          reviewedBy: "Admin User",
        }),
      })

      if (!response.ok) throw new Error("Failed to reject appointment")

      toast({
        title: "Success",
        description: "Appointment rejected",
      })

      fetchAppointments()
    } catch (error) {
      console.error("Error rejecting appointment:", error)
      toast({
        title: "Error",
        description: "Failed to reject appointment",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (appointmentId: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete appointment")

      toast({
        title: "Success",
        description: "Appointment deleted successfully",
      })

      fetchAppointments()
    } catch (error) {
      console.error("Error deleting appointment:", error)
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive",
      })
    }
  }

  const handleView = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailDialogOpen(true)
  }

  const pendingCount = appointments.filter((a) => a.status === "pending").length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading appointments...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Manage appointment requests {pendingCount > 0 && `(${pendingCount} pending)`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AppointmentsTable
        appointments={filteredAppointments}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        onView={handleView}
      />

      <AppointmentDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        appointment={selectedAppointment}
      />
    </div>
  )
}
