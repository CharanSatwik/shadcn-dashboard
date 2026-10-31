import React, { useState } from "react"
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertCircle,
  X,
  PieChart as PieChartIcon,
  BarChart2,
  Calendar,
  Sparkles,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  METRIC_CARDS,
  REVENUE_CHART_DATA,
  TRAFFIC_DATA,
  RECENT_SALES,
} from "@/data/mock-data"
import { toast } from "sonner"

interface OverviewTabProps {
  onViewTransactions: () => void
}

export function OverviewTab({ onViewTransactions }: OverviewTabProps) {
  const [showAlert, setShowAlert] = useState(true)
  const [chartView, setChartView] = useState<"revenue" | "comparison">("revenue")

  const metricIcons = [
    DollarSign,
    Users,
    CreditCard,
    Activity,
  ]

  return (
    <div className="space-y-6">
      {/* Dynamic Status / Alert Banner */}
      {showAlert && (
        <Alert className="relative border-primary/30 bg-primary/5 text-primary">
          <Sparkles className="h-4 w-4 text-primary" />
          <div className="flex items-center justify-between w-full pr-6">
            <div>
              <AlertTitle className="text-sm font-semibold text-foreground">
                Q4 Automated Optimization Completed
              </AlertTitle>
              <AlertDescription className="text-xs text-muted-foreground mt-0.5">
                Stripe payment routing algorithms reduced transaction gateway fees by 14.8%. Your next payout is scheduled for Friday.
              </AlertDescription>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </Alert>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRIC_CARDS.map((metric, idx) => {
          const Icon = metricIcons[idx]
          const isUp = metric.trend === "up"

          return (
            <Card key={metric.title} className="relative overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">
                  {metric.value}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <span
                    className={`inline-flex items-center font-semibold ${
                      isUp ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {isUp ? (
                      <ArrowUpRight className="h-3.5 w-3.5 mr-0.5 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5 mr-0.5 stroke-[2.5]" />
                    )}
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
              {/* Subtle bottom decorative line */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${
                  idx === 0
                    ? "from-primary to-blue-400"
                    : idx === 1
                    ? "from-emerald-500 to-teal-400"
                    : idx === 2
                    ? "from-indigo-500 to-purple-400"
                    : "from-amber-500 to-orange-400"
                }`}
              />
            </Card>
          )
        })}
      </div>

      {/* Main Charts & Recent Sales Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Bar Chart: Revenue Trends */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                Revenue Analytics
              </CardTitle>
              <CardDescription className="text-xs">
                Monthly revenue distribution and expense margins for 2026
              </CardDescription>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg">
              <Button
                variant={chartView === "revenue" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartView("revenue")}
                className="h-7 text-xs px-2.5"
              >
                Revenue
              </Button>
              <Button
                variant={chartView === "comparison" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartView("comparison")}
                className="h-7 text-xs px-2.5"
              >
                Target vs Actual
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[310px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={REVENUE_CHART_DATA}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-muted/50"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <RechartsTooltip
                    cursor={{ fill: "hsl(var(--muted)/0.3)" }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-popover p-2.5 shadow-md text-xs">
                            <p className="font-semibold text-foreground mb-1">{label} 2026</p>
                            {payload.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="capitalize">{item.name}:</span>
                                <span className="font-semibold text-foreground">
                                  ${item.value?.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar
                    dataKey="total"
                    name="Revenue"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  {chartView === "comparison" && (
                    <Bar
                      dataKey="target"
                      name="Target"
                      fill="hsl(215.4 16.3% 46.9%)"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                Annual projected run-rate: <strong className="text-foreground">$1.12M</strong>
              </span>
              <span>Updated 5m ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales Customer Activity */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Sales
              </CardTitle>
              <CardDescription className="text-xs">
                You made 265 sales this week.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewTransactions}
              className="text-xs text-primary hover:text-primary font-medium p-0 h-auto"
            >
              View all &rarr;
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_SALES.map((sale) => (
                <div
                  key={sale.email}
                  className="flex items-center justify-between gap-4 p-1.5 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={sale.avatar} alt={sale.name} />
                      <AvatarFallback>{sale.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <p className="text-xs font-semibold truncate leading-none">
                        {sale.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate mt-1">
                        {sale.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    {sale.amount}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-dashed p-3 text-center bg-muted/20">
              <p className="text-xs text-muted-foreground">
                All transactions are verified via 256-bit Stripe Webhooks.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Share & Channel Breakdown Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Donut Chart: Device & Channel Traffic */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-primary" />
              Traffic by Platform
            </CardTitle>
            <CardDescription className="text-xs">
              Client session origin distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TRAFFIC_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {TRAFFIC_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="rounded-md border bg-popover p-2 text-xs shadow-md">
                            <span className="font-semibold">{data.name}:</span>{" "}
                            {data.value}% of total traffic
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconSize={8}
                    formatter={(val) => (
                      <span className="text-xs text-muted-foreground">{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick System Health Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Infrastructure Health & SLA
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time API latency and service up-time telemetry
              </CardDescription>
            </div>
            <Badge variant="success" className="text-xs">
              All Systems Operational
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">API Gateway Uptime (30d)</span>
                <span className="font-semibold text-emerald-500">99.98%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[99.98%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Database Query Latency</span>
                <span className="font-semibold">18.4ms</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[24%]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="rounded-lg border p-2 bg-muted/10">
                <p className="text-[10px] text-muted-foreground uppercase">EU-Central</p>
                <p className="text-sm font-bold text-foreground">22ms</p>
              </div>
              <div className="rounded-lg border p-2 bg-muted/10">
                <p className="text-[10px] text-muted-foreground uppercase">US-East</p>
                <p className="text-sm font-bold text-foreground">14ms</p>
              </div>
              <div className="rounded-lg border p-2 bg-muted/10">
                <p className="text-[10px] text-muted-foreground uppercase">AP-South</p>
                <p className="text-sm font-bold text-foreground">38ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
