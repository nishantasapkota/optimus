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
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StudentCounseling {
  _id: string
  fullName: string
  contact: string
  email: string
  interestedCountry?: string
  status: string
  createdAt: string
}

export default function StudentCounselingAdminPage() {
  const { toast } = useToast()
  const [counselings, setCounselings] = useState<StudentCounseling[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCounselings()
  }, [])

  const fetchCounselings = async () => {
    try {
      const response = await fetch("/api/student-counseling")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setCounselings(data.counselings)
    } catch (error) {
      console.error("Error fetching counselings:", error)
      toast({
        title: "Error",
        description: "Failed to fetch student counseling submissions",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      const response = await fetch(`/api/student-counseling/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "Success",
        description: "Submission deleted successfully",
      })

      fetchCounselings()
    } catch (error) {
      console.error("Error deleting counseling:", error)
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      contacted: "default",
      "in-progress": "outline",
      completed: "default",
      rejected: "destructive",
    }

    return (
      <Badge variant={variants[status] || "default"}>
        {status}
      </Badge>
    )
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
        <h1 className="text-3xl font-bold text-gray-900">Student Counseling Submissions</h1>
        <p className="text-gray-600 mt-2">Manage and review student counseling requests</p>
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
            {counselings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No submissions found
                </TableCell>
              </TableRow>
            ) : (
              counselings.map((counseling) => (
                <TableRow key={counseling._id}>
                  <TableCell className="font-medium">{counseling.fullName}</TableCell>
                  <TableCell>{counseling.contact}</TableCell>
                  <TableCell>{counseling.email}</TableCell>
                  <TableCell>{counseling.interestedCountry || "-"}</TableCell>
                  <TableCell>{getStatusBadge(counseling.status)}</TableCell>
                  <TableCell>
                    {new Date(counseling.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          // TODO: Implement view details modal
                          toast({
                            title: "View Details",
                            description: "Details view coming soon",
                          })
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(counseling._id)}
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
    </div>
  )
}
