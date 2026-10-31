import React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  LogOut,
  ExternalLink,
  ChevronsUpDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export type NavView = "overview" | "analytics" | "transactions" | "reports" | "settings"

interface SidebarProps {
  currentView: NavView
  onSelectView: (view: NavView) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const navItems: { id: NavView; label: string; icon: React.ElementType; badge?: string; disabled?: boolean }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: "Live" },
    { id: "transactions", label: "Transactions", icon: CreditCard, badge: "10" },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleNavClick = (id: NavView, disabled?: boolean) => {
    if (disabled) {
      toast.info("This section is under maintenance.")
      return
    }
    onSelectView(id)
    onCloseMobile()
  }

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r bg-card/95 backdrop-blur-md transition-all duration-300 ease-in-out lg:z-30",
          isCollapsed ? "w-18" : "w-64",
          // Mobile responsive slide-in
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand / Logo Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-blue-400 text-primary-foreground shadow-sm shadow-primary/30">
              <Sparkles className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-sm tracking-tight truncate flex items-center gap-1.5">
                  NexusOps
                  <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                    PRO
                  </Badge>
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  Enterprise Cloud
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden lg:flex h-7 w-7 text-muted-foreground hover:text-foreground"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id

              if (isCollapsed) {
                return (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleNavClick(item.id, item.disabled)}
                        className={cn(
                          "flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors relative",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.badge && !isActive && (
                          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                      {item.badge && ` (${item.badge})`}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.disabled)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive && "text-primary-foreground")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant={isActive ? "secondary" : "default"}
                      className={cn(
                        "text-[10px] px-1.5 py-0 h-4.5 font-semibold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              )
            })}
          </TooltipProvider>

          {/* Secondary links divider */}
          {!isCollapsed && (
            <div className="pt-4 pb-2">
              <p className="px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Support & Ecosystem
              </p>
            </div>
          )}

          {!isCollapsed && (
            <div className="space-y-1">
              <a
                href="#docs"
                onClick={(e) => {
                  e.preventDefault()
                  toast.success("Documentation handbook opened in new tab.")
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Compliance & Docs</span>
                </div>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
          )}
        </div>

        {/* User Profile Card at Sidebar Footer */}
        <div className="p-3 border-t bg-muted/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent focus:outline-none",
                  isCollapsed ? "justify-center" : "justify-between"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Sarah Connor" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold truncate leading-tight">
                        Sarah Connor
                      </span>
                      <span className="text-xs text-muted-foreground truncate leading-tight">
                        lead@nexusops.io
                      </span>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mb-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Sarah Connor</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    lead@nexusops.io
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSelectView("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectView("reports")}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Billing & Invoices</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => toast.error("Session logout simulated.")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  )
}
