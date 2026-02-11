"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, GripVertical } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import type { BODMember } from "@/lib/db-utils"

interface BODTableProps {
  members: BODMember[]
  onEdit: (member: BODMember) => void
  onDelete: (id: string) => void
}

export function BODTable({ members, onEdit, onDelete }: BODTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Socials</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No BOD members found
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member._id?.toString()}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                    <Image
                      src={member.image || "/placeholder-user.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>Level {member.level}</TableCell>
                <TableCell>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    {member.socials?.linkedin && <span>LI</span>}
                    {member.socials?.mail && <span>Email</span>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(member._id?.toString() || "")}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
