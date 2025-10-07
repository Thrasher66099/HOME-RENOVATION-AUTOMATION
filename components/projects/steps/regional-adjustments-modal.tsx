"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const regionalData = [
  { region: "IL", location: "Illinois", factor: 1.21, rsmeans: 1.18, contingency: 0.03 },
  { region: "CA", location: "California", factor: 1.35, rsmeans: 1.31, contingency: 0.04 },
  { region: "TX", location: "Texas", factor: 1.08, rsmeans: 1.05, contingency: 0.03 },
  { region: "NY", location: "New York", factor: 1.42, rsmeans: 1.38, contingency: 0.04 },
]

export function RegionalAdjustmentsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Info className="h-4 w-4 mr-2" />
          View Regional Factors
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Regional Cost Adjustments</DialogTitle>
          <DialogDescription>
            Regional multipliers account for local labor rates, material costs, and market conditions
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Factor</TableHead>
              <TableHead>RSMeans</TableHead>
              <TableHead>Contingency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionalData.map((data) => (
              <TableRow key={data.region}>
                <TableCell className="font-medium">{data.region}</TableCell>
                <TableCell>{data.location}</TableCell>
                <TableCell>{data.factor}x</TableCell>
                <TableCell>{data.rsmeans}x</TableCell>
                <TableCell>{(data.contingency * 100).toFixed(0)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
