import React, { useState, useEffect } from "react"
import { Sidebar, type NavView } from "@/components/dashboard/sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { OverviewTab } from "@/components/dashboard/overview-tab"
import { AnalyticsTab } from "@/components/dashboard/analytics-tab"
import { TransactionsTab } from "@/components/dashboard/transactions-tab"
import { ReportsTab } from "@/components/dashboard/reports-tab"
import { SettingsTab } from "@/components/dashboard/settings-tab"
import { CommandDialog } from "@/components/dashboard/command-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function App() {
  const [currentView, setCurrentView] = useState<NavView>("overview")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Dashboard telemetry synchronized with live servers.")
    }, 900)
  }

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Fixed Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area: adjusts left margin according to sidebar width */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-18" : "lg:pl-64"
        )}
      >
        {/* Sticky Top Navbar */}
        <TopNavbar
          onOpenMobile={() => setMobileOpen(true)}
          currentView={currentView}
          onSelectView={setCurrentView}
          onOpenSearch={() => setIsSearchOpen(true)}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Dashboard Header Tabs navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
            <Tabs
              value={currentView}
              onValueChange={(val) => setCurrentView(val as NavView)}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-3 sm:flex h-9 bg-muted/60 p-1">
                <TabsTrigger value="overview" className="text-xs px-3 py-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs px-3 py-1">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="transactions" className="text-xs px-3 py-1">
                  Transactions
                </TabsTrigger>
                <TabsTrigger value="reports" className="hidden md:inline-flex text-xs px-3 py-1">
                  Reports
                </TabsTrigger>
                <TabsTrigger value="settings" className="hidden lg:inline-flex text-xs px-3 py-1">
                  Settings
                </TabsTrigger>
                {/* Disabled tab for completeness as requested */}
                <TabsTrigger
                  value="integrations"
                  disabled
                  className="hidden xl:inline-flex text-xs px-3 py-1 opacity-50 cursor-not-allowed"
                >
                  Integrations (Soon)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Active View Render */}
          {currentView === "overview" && (
            <OverviewTab onViewTransactions={() => setCurrentView("transactions")} />
          )}

          {currentView === "analytics" && <AnalyticsTab />}

          {currentView === "transactions" && <TransactionsTab />}

          {currentView === "reports" && <ReportsTab />}

          {currentView === "settings" && <SettingsTab />}
        </main>
      </div>

      {/* Global Quick Search Command Modal */}
      <CommandDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSelectView={setCurrentView}
      />

      {/* Modern Sonner Toast System */}
      <Toaster position="bottom-right" richColors />
    </div>
  )
}

export default App

