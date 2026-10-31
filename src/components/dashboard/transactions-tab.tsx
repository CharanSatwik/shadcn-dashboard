import React, { useState, useMemo } from "react"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Copy,
  Receipt,
  Download,
  Plus,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TRANSACTIONS, type Transaction } from "@/data/mock-data"
import { toast } from "sonner"

export function TransactionsTab() {
  const [data, setData] = useState<Transaction[]>(TRANSACTIONS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Transaction>("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeModalTransaction, setActiveModalTransaction] = useState<Transaction | null>(null)
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false)

  // New transaction form state
  const [newCustomerName, setNewCustomerName] = useState("")
  const [newCustomerEmail, setNewCustomerEmail] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [newChannel, setNewChannel] = useState<Transaction["channel"]>("Stripe")

  // Filter and sort transactions
  const filteredData = useMemo(() => {
    return data
      .filter((tx) => {
        const matchesSearch =
          tx.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.id.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
          statusFilter === "all" || tx.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        let aVal = a[sortField]
        let bVal = b[sortField]

        if (sortField === "customer") {
          aVal = a.customer.name
          bVal = b.customer.name
        }

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
        return 0
      })
  }, [data, searchQuery, statusFilter, sortField, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  const toggleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedData.map((tx) => tx.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success(`Copied ID ${id} to clipboard`)
  }

  const handleBatchStatus = (status: Transaction["status"]) => {
    if (selectedIds.length === 0) return
    setData((prev) =>
      prev.map((tx) => (selectedIds.includes(tx.id) ? { ...tx, status } : tx))
    )
    toast.success(`Updated ${selectedIds.length} transactions to ${status}`)
    setSelectedIds([])
  }

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCustomerName || !newCustomerEmail || !newAmount) {
      toast.error("Please fill out all fields.")
      return
    }

    const newTx: Transaction = {
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: newCustomerName,
        email: newCustomerEmail,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        initials: newCustomerName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      },
      amount: parseFloat(newAmount) || 0,
      status: "Completed",
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      channel: newChannel,
    }

    setData((prev) => [newTx, ...prev])
    setIsNewTxModalOpen(false)
    setNewCustomerName("")
    setNewCustomerEmail("")
    setNewAmount("")
    toast.success(`Transaction ${newTx.id} created successfully!`)
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="success" className="gap-1 font-normal text-xs">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="info" className="gap-1 font-normal text-xs">
            <Clock className="h-3 w-3" />
            Processing
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="warning" className="gap-1 font-normal text-xs">
            <AlertTriangle className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "Refunded":
        return (
          <Badge variant="destructive" className="gap-1 font-normal text-xs">
            <RotateCcw className="h-3 w-3" />
            Refunded
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold">
                Orders & Transactions
              </CardTitle>
              <CardDescription className="text-xs">
                Inspect, filter, and audit ledger entries across global gateways.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsNewTxModalOpen(true)}
                className="gap-1.5 h-9 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Transaction</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by customer, email, or ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-8 text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[140px] h-9 text-xs">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              {/* Rows per page */}
              <Select
                value={pageSize.toString()}
                onValueChange={(val) => {
                  setPageSize(Number(val))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-[100px] h-9 text-xs">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 rows</SelectItem>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Batch Actions Bar (when items selected) */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs">
              <span className="font-semibold text-primary">
                {selectedIds.length} transaction(s) selected
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBatchStatus("Completed")}
                  className="h-7 text-xs bg-background"
                >
                  <Check className="h-3 w-3 mr-1 text-emerald-500" />
                  Mark Completed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBatchStatus("Refunded")}
                  className="h-7 text-xs bg-background text-rose-500 hover:text-rose-600"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Refund
                </Button>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((tx) => selectedIds.includes(tx.id))
                      }
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => toggleSort("id")}
                      className="flex items-center gap-1 font-semibold text-xs hover:text-foreground"
                    >
                      ID
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => toggleSort("customer")}
                      className="flex items-center gap-1 font-semibold text-xs hover:text-foreground"
                    >
                      Customer
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => toggleSort("status")}
                      className="flex items-center gap-1 font-semibold text-xs hover:text-foreground"
                    >
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>
                    <button
                      onClick={() => toggleSort("date")}
                      className="flex items-center gap-1 font-semibold text-xs hover:text-foreground"
                    >
                      Date & Time
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                      onClick={() => toggleSort("amount")}
                      className="flex items-center gap-1 ml-auto font-semibold text-xs hover:text-foreground"
                    >
                      Amount
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead className="w-12 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-32 text-center text-xs text-muted-foreground"
                    >
                      No transactions matched your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((tx) => {
                    const isSelected = selectedIds.includes(tx.id)
                    return (
                      <TableRow
                        key={tx.id}
                        data-state={isSelected ? "selected" : undefined}
                      >
                        <TableCell className="text-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleSelectRow(tx.id, !!checked)
                            }
                            aria-label={`Select transaction ${tx.id}`}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                          {tx.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={tx.customer.avatar}
                                alt={tx.customer.name}
                              />
                              <AvatarFallback>
                                {tx.customer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-xs text-foreground">
                                {tx.customer.name}
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                {tx.customer.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {tx.channel}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {tx.date}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-xs">
                          ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="text-xs">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => setActiveModalTransaction(tx)}
                              >
                                <Receipt className="mr-2 h-3.5 w-3.5" />
                                <span>View Receipt</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleCopyId(tx.id)}
                              >
                                <Copy className="mr-2 h-3.5 w-3.5" />
                                <span>Copy ID</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  toast.info(`Invoice resent to ${tx.customer.email}`)
                                }}
                              >
                                <Download className="mr-2 h-3.5 w-3.5" />
                                <span>Send Invoice</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              Showing{" "}
              <strong className="text-foreground">
                {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              </strong>{" "}
              to{" "}
              <strong className="text-foreground">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </strong>{" "}
              of <strong className="text-foreground">{filteredData.length}</strong>{" "}
              entries
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                Previous
              </Button>
              <div className="flex items-center px-2 font-medium text-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 text-xs"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      {activeModalTransaction && (
        <Dialog
          open={!!activeModalTransaction}
          onOpenChange={(open) => !open && setActiveModalTransaction(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold flex items-center justify-between">
                <span>Transaction Details</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {activeModalTransaction.id}
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs">
                Official payment receipt recorded by automated gateway.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="rounded-lg bg-muted/40 p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold text-foreground">
                    {activeModalTransaction.customer.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{activeModalTransaction.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-mono">{activeModalTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gateway Provider:</span>
                  <span>{activeModalTransaction.channel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <div>{getStatusBadge(activeModalTransaction.status)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="font-bold">Total Amount Paid</span>
                <span className="font-bold font-mono text-base text-primary">
                  ${activeModalTransaction.amount.toFixed(2)}
                </span>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyId(activeModalTransaction.id)}
                className="text-xs"
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy ID
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  toast.success("Receipt downloaded as PDF")
                  setActiveModalTransaction(null)
                }}
                className="text-xs"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Transaction Form Modal */}
      <Dialog open={isNewTxModalOpen} onOpenChange={setIsNewTxModalOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleCreateTransaction}>
            <DialogHeader>
              <DialogTitle className="text-base font-bold">
                Create New Manual Transaction
              </DialogTitle>
              <DialogDescription className="text-xs">
                Log offline enterprise wire transfers or custom invoices.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-foreground">Customer Name</label>
                <Input
                  placeholder="e.g. Rachel Green"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="h-9 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="rachel@acme.inc"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                  className="h-9 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Amount (USD)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="99.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="h-9 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-foreground">Payment Channel</label>
                  <Select
                    value={newChannel}
                    onValueChange={(val: Transaction["channel"]) => setNewChannel(val)}
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stripe">Stripe</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Apple Pay">Apple Pay</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsNewTxModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Record Transaction
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
