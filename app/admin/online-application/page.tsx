"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OnlineApplication {
  _id: string
  fullName: string
  contact: string
  email: string
  address?: string
  interestedCountry?: string
  university?: string
  intake?: string
  interestedCourse?: string
  lastAcademicQualification?: string
  academicScores?: string
  englishTest?: string
  englishScores?: string
  passedYear?: string
  yearIntake?: string
  documents: Record<string, string>
  status: string
  createdAt: string
}

export default function OnlineApplicationAdminPage() {
  const { toast } = useToast()
  const [applications, setApplications] = useState<OnlineApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<OnlineApplication | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/online-application")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setApplications(data.applications)
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast({
        title: "Error",
        description: "Failed to fetch online applications",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return

    try {
      const response = await fetch(`/api/online-application/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "Success",
        description: "Application deleted successfully",
      })

      fetchApplications()
    } catch (error) {
      console.error("Error deleting application:", error)
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      })
    }
  }

  const handleView = (application: OnlineApplication) => {
    setSelectedApplication(application)
    setIsDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      "under-review": "outline",
      approved: "default",
      rejected: "destructive",
    }

    return (
      <Badge variant={variants[status] || "default"}>
        {status}
      </Badge>
    )
  }

  const documentLabels: Record<string, string> = {
    masterDegree: "Master Degree Certificate",
    bachelorsDegree: "Bachelors Degree Certificate",
    diploma: "Diploma",
    grade12: "Grade 12 Certificate",
    cv: "CV",
    passport: "Passport",
    ielts: "IELTS",
    oxfordELLT: "Oxford (ELLT) English",
    others: "Others",
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Online Applications</h1>
        <p className="text-gray-600 mt-2">Manage and review student applications</p>
      </div>

      <div className="  rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell className="font-medium">{application.fullName}</TableCell>
                  <TableCell>{application.contact}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>{application.interestedCountry || "-"}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(application)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(application._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedApplication && new Date(selectedApplication.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* General Information */}
              <div>
                <h3 className="font-bold text-lg mb-3">General Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Full Name:</span>
                    <p className="font-medium">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Contact:</span>
                    <p className="font-medium">{selectedApplication.contact}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span>
                    <p className="font-medium">{selectedApplication.address || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Study Information */}
              <div>
                <h3 className="font-bold text-lg mb-3">Study Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Interested Country:</span>
                    <p className="font-medium">{selectedApplication.interestedCountry || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">University:</span>
                    <p className="font-medium">{selectedApplication.university || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Intake:</span>
                    <p className="font-medium">{selectedApplication.intake || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Interested Course:</span>
                    <p className="font-medium">{selectedApplication.interestedCourse || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <h3 className="font-bold text-lg mb-3">Academic Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Last Qualification:</span>
                    <p className="font-medium">{selectedApplication.lastAcademicQualification || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Academic Scores:</span>
                    <p className="font-medium">{selectedApplication.academicScores || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">English Test:</span>
                    <p className="font-medium">{selectedApplication.englishTest || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">English Scores:</span>
                    <p className="font-medium">{selectedApplication.englishScores || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Passed Year:</span>
                    <p className="font-medium">{selectedApplication.passedYear || "-"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Year Intake:</span>
                    <p className="font-medium">{selectedApplication.yearIntake || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-bold text-lg mb-3">Documents</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(selectedApplication.documents).map(([key, url]) => (
                    url && (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">{documentLabels[key] || key}</span>
                        </div>
                        <a
                          href={`/api/documents/download?url=${encodeURIComponent(url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View
                        </a>
                      </div>
                    )
                  ))}
                  {Object.values(selectedApplication.documents).every(v => !v) && (
                    <p className="text-sm text-gray-500">No documents uploaded</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-bold text-lg mb-3">Status</h3>
                {getStatusBadge(selectedApplication.status)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
