"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FolderKanban,
  FileText,
  ShoppingCart,
  Receipt,
  BarChart3,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Estimates", href: "/estimates", icon: FileText },
  { name: "Purchase Orders", href: "/pos", icon: ShoppingCart },
  { name: "Billing", href: "/billing", icon: Receipt },
  { name: "Reports", href: "/reports", icon: BarChart3 },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* New Project Button */}
        <div className="p-4">
          <Button className="w-full justify-start gap-2" size={collapsed ? "icon" : "default"}>
            <Plus className="h-4 w-4" />
            {!collapsed && <span>New Project</span>}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t">
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="w-full">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar - TODO: Add mobile menu */}
    </>
  )
}
