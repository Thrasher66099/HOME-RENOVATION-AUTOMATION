"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, FolderKanban, AlertCircle } from "lucide-react"

const stats = [
  {
    label: "Total Projects",
    value: "24",
    change: "+3 this week",
    trend: "up",
    icon: FolderKanban,
  },
  {
    label: "Total Budget",
    value: "$1.2M",
    change: "+12% from last month",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Avg Profit Margin",
    value: "14.2%",
    change: "+2.1% from last month",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Low Profit Alerts",
    value: "3",
    change: "Requires attention",
    trend: "down",
    icon: AlertCircle,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            {stat.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
