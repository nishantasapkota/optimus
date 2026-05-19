"use client"

import { format } from "date-fns"
import { Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Destination } from "@/lib/db-utils"

interface DestinationsTableProps {
  destinations: Destination[]
  onEdit: (destination: Destination) => void
  onDelete: (id: string) => void
}

export function DestinationsTable({ destinations, onEdit, onDelete }: DestinationsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No destinations found
              </TableCell>
            </TableRow>
          ) : (
            destinations.map((destination) => (
              <TableRow key={destination._id?.toString()}>
                <TableCell className="font-medium">{destination.name}</TableCell>
                <TableCell>{destination.slug}</TableCell>
                <TableCell>
                  <Badge variant={destination.status === "active" ? "default" : "secondary"}>{destination.status}</Badge>
                </TableCell>
                <TableCell>{format(new Date(destination.createdAt), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(destination)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(destination._id?.toString() || "")}>
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
