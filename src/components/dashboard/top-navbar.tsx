import React, { useState } from "react"
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  Download,
  CheckCheck,
  Trash2,
  User,
  CreditCard,
  Settings,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NOTIFICATIONS } from "@/data/mock-data"
import { toast } from "sonner"
import { DateRangePicker } from "@/components/date-range-picker"
import type { NavView } from "./sidebar"

interface TopNavbarProps {
  onOpenMobile: () => void
  currentView: NavView
  onSelectView: (view: NavView) => void
  onOpenSearch: () => void
  isRefreshing: boolean
  onRefresh: () => void
}

export function TopNavbar({
  onOpenMobile,
  currentView,
  onSelectView,
  onOpenSearch,
  isRefreshing,
  onRefresh,
}: TopNavbarProps) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    toast.success("All notifications marked as read")
  }

  const handleClearNotifications = () => {
    setNotifications([])
    toast.info("Notifications cleared")
  }

  const handleDownloadReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1200)),
      {
        loading: "Generating financial report CSV...",
        success: "NexusOps-Report-Q4-2026.csv downloaded successfully!",
        error: "Failed to export report",
      }
    )
  }

  const titleMap: Record<NavView, { title: string; subtitle: string }> = {
    overview: {
      title: "Dashboard Overview",
      subtitle: "Real-time telemetry, revenue performance, and key metrics",
    },
    analytics: {
      title: "Analytics & Growth",
      subtitle: "Funnel conversion, visitor trends, and regional breakdown",
    },
    transactions: {
      title: "Orders & Transactions",
      subtitle: "Filter, audit, and inspect enterprise billing activities",
    },
    reports: {
      title: "Executive Reports",
      subtitle: "Scheduled exports, compliance audits, and tax documentation",
    },
    settings: {
      title: "Workspace Settings",
      subtitle: "Manage billing, webhooks, team roles, and system preferences",
    },
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur-md px-4 sm:px-6">
      {/* Left side: Hamburger button + Page Title */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenMobile}
          className="lg:hidden h-9 w-9 border-border/80"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              {titleMap[currentView]?.title || "Dashboard"}
            </h1>
            <span className="hidden sm:inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              v2.4
            </span>
          </div>
          <p className="hidden md:block text-xs text-muted-foreground truncate">
            {titleMap[currentView]?.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Search, Date Picker, Actions, Notifications, Theme, Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Bar */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search metrics, orders... (Ctrl+K)"
            onClick={onOpenSearch}
            readOnly
            className="pl-8 pr-12 h-9 text-xs cursor-pointer bg-muted/30 hover:bg-muted/50 border-border/80 transition-all"
          />
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
            ⌘K
          </kbd>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={onOpenSearch}
          title="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Date Range Picker (hidden on small mobile) */}
        <div className="hidden xl:block">
          <DateRangePicker
            onRangeChange={(range) => toast.info(`Data filtered for ${range}`)}
          />
        </div>

        {/* Refresh Action */}
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-9 w-9 border-border/80"
          title="Refresh Data"
        >
          <RefreshCw
            className={`h-4 w-4 text-muted-foreground ${
              isRefreshing ? "animate-spin text-primary" : ""
            }`}
          />
        </Button>

        {/* Download CSV Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadReport}
          className="hidden sm:inline-flex gap-1.5 h-9 text-xs border-border/80"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-9 w-9 border-border/80"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1 ring-2 ring-background animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 sm:w-96 p-0" align="end">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllRead}
                    className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
                    title="Mark all as read"
                  >
                    <CheckCheck className="h-3.5 w-3.5 mr-1" />
                    Read all
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearNotifications}
                    className="h-7 text-xs px-2 text-muted-foreground hover:text-destructive"
                    title="Clear all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  No notifications yet. You are completely caught up!
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 text-xs transition-colors hover:bg-muted/50 ${
                      notif.unread ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground">{notif.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-[11px] leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t p-2 text-center bg-muted/20">
              <button
                onClick={() => {
                  onSelectView("reports")
                  toast.info("Navigating to Audit Log")
                }}
                className="text-xs text-primary font-medium hover:underline"
              >
                View system activity logs &rarr;
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0 ring-offset-background transition-transform hover:scale-105"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Sarah Connor" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">Sarah Connor</p>
                <p className="text-xs leading-none text-muted-foreground">
                  lead@nexusops.io
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSelectView("settings")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelectView("transactions")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSelectView("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Opening documentation...")}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support Docs</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => toast.error("User logged out")}
            >
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
