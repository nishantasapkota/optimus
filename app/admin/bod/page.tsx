"use client"

import { useState, useEffect } from "react"
import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BODTable } from "@/components/bod-table"
import { BODDialog } from "@/components/bod-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function BODAdminPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/bod")
      const data = await res.json()
      if (data.members) {
        setMembers(data.members)
      }
    } catch (error) {
      console.error("Failed to fetch BOD members:", error)
      toast.error("Failed to load members")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleCreate = () => {
    setSelectedMember(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (member: any) => {
    setSelectedMember(member)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return

    try {
      const res = await fetch(`/api/admin/bod?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Member deleted")
        fetchMembers()
      }
    } catch (error) {
      toast.error("Failed to delete member")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Board of Directors</h2>
          <p className="text-muted-foreground">
            Manage the leadership team and their hierarchy on the About Us page.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <BODTable 
          members={members} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <BODDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        member={selectedMember} 
        onSuccess={fetchMembers} 
      />
    </div>
  )
}
