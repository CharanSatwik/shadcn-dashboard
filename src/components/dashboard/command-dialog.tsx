import React, { useState, useEffect } from "react"
import {
  Search,
  LayoutDashboard,
  BarChart3,
  CreditCard,
  FileText,
  Settings,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { NavView } from "./sidebar"

interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectView: (view: NavView) => void
}

export function CommandDialog({
  open,
  onOpenChange,
  onSelectView,
}: CommandDialogProps) {
  const [query, setQuery] = useState("")

  const actions = [
    { label: "Dashboard Overview", view: "overview" as NavView, icon: LayoutDashboard, category: "Navigation" },
    { label: "Conversion & Growth Analytics", view: "analytics" as NavView, icon: BarChart3, category: "Navigation" },
    { label: "Transactions & Orders Ledger", view: "transactions" as NavView, icon: CreditCard, category: "Navigation" },
    { label: "Executive Reports & Audit", view: "reports" as NavView, icon: FileText, category: "Navigation" },
    { label: "Workspace Settings", view: "settings" as NavView, icon: Settings, category: "Navigation" },
  ]

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (view: NavView) => {
    onSelectView(view)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>Quick Search</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-sm shadow-none"
            autoFocus
          />
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-xs text-muted-foreground">
              No matching commands found.
            </p>
          ) : (
            <div className="space-y-1">
              <p className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase">
                Pages & Actions
              </p>
              {filtered.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.view)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs transition-colors hover:bg-accent text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

