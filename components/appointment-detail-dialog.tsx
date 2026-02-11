"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Appointment } from "@/lib/db-utils"
import { Calendar, Clock, Mail, Phone, User, Briefcase, MessageSquare } from "lucide-react"

interface AppointmentDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: Appointment | null
}

export function AppointmentDetailDialog({ open, onOpenChange, appointment }: AppointmentDetailDialogProps) {
  if (!appointment) return null

  const getStatusBadge = (status: Appointment["status"]) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
      completed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    }

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Appointment Details</DialogTitle>
            {getStatusBadge(appointment.status)}
          </div>
          <DialogDescription>Complete information about this appointment request</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Full Name
              </div>
              <p className="text-base font-medium">{appointment.name}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email
              </div>
              <p className="text-base">{appointment.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Phone className="h-4 w-4" />
                Phone
              </div>
              <p className="text-base">{appointment.phone}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Service
              </div>
              <p className="text-base capitalize">{appointment.service.replace("-", " ")}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Preferred Date
              </div>
              <p className="text-base">{format(new Date(appointment.preferredDate), "MMMM dd, yyyy")}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Preferred Time
              </div>
              <p className="text-base">{appointment.preferredTime}</p>
            </div>
          </div>

          {appointment.message && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                Additional Message
              </div>
              <p className="text-base rounded-lg bg-muted p-4">{appointment.message}</p>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">Submitted:</span>
                <span className="ml-2 font-medium">
                  {format(new Date(appointment.createdAt), "MMM dd, yyyy HH:mm")}
                </span>
              </div>
              {appointment.reviewedAt && (
                <div>
                  <span className="text-muted-foreground">Reviewed:</span>
                  <span className="ml-2 font-medium">
                    {format(new Date(appointment.reviewedAt), "MMM dd, yyyy HH:mm")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
