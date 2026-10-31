import React from "react"
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Zap,
  Globe,
  Share2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import { CONVERSION_LINE_DATA } from "@/data/mock-data"

export function AnalyticsTab() {
  const countryData = [
    { country: "United States", flag: "🇺🇸", users: "12,490", percent: 45 },
    { country: "United Kingdom", flag: "🇬🇧", users: "5,820", percent: 21 },
    { country: "Germany", flag: "🇩🇪", users: "4,110", percent: 15 },
    { country: "Canada", flag: "🇨🇦", users: "2,980", percent: 11 },
    { country: "Australia", flag: "🇦🇺", users: "2,200", percent: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Analytics KPI metrics row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Avg Order Value (AOV)
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$148.50</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-semibold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +8.2% vs last cycle
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Customer Acq. Cost (CAC)
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32.18</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-semibold">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -12.4% cost reduced
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Customer Lifetime Value
            </CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,840.00</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-semibold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +15.7% expansion
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
              Monthly Churn Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.24%</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-500 font-semibold">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -0.4% healthy benchmark
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Conversion Trend Area Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Funnel Conversion Dynamics (Weekly)
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time tracking of visitors, marketing qualified leads, and paid orders
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs self-start sm:self-auto">
              Updated hourly
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CONVERSION_LINE_DATA}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/50" />
                <XAxis dataKey="day" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-popover p-2.5 shadow-md text-xs">
                          <p className="font-semibold text-foreground mb-1">{label}</p>
                          {payload.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-muted-foreground">
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="capitalize">{item.name}:</span>
                              <span className="font-semibold text-foreground">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconSize={8}
                  formatter={(val) => <span className="text-xs text-muted-foreground">{val}</span>}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Visitors"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="Qualified Leads"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  name="Paid Orders"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Global Regional Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Top Active Geographic Markets
            </CardTitle>
            <CardDescription className="text-xs">
              User distribution and localized revenue shares
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {countryData.map((c) => (
              <div key={c.country} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="text-base">{c.flag}</span>
                    <span>{c.country}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{c.users} users</span>
                    <span className="font-semibold">{c.percent}%</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Growth Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Share2 className="h-4 w-4 text-emerald-500" />
              Automated Growth Insights
            </CardTitle>
            <CardDescription className="text-xs">
              AI-driven performance signals and channel recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3 bg-muted/20 space-y-1">
              <p className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Enterprise Upgrade Velocity</span>
                <Badge variant="success" className="text-[10px]">High Impact</Badge>
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Companies with &gt;50 seats are converting 3.4x faster when scheduled on self-serve onboarding pipelines.
              </p>
            </div>

            <div className="rounded-lg border p-3 bg-muted/20 space-y-1">
              <p className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Mobile Checkout Optimization</span>
                <Badge variant="warning" className="text-[10px]">Opportunity</Badge>
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cart dropoff rate on iOS devices decreased by 18% after implementing Apple Pay 1-click tokenization.
              </p>
            </div>

            <div className="rounded-lg border p-3 bg-muted/20 space-y-1">
              <p className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Organic Search Dominance</span>
                <Badge variant="info" className="text-[10px]">SEO Signal</Badge>
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Top 5 engineering blog posts generated 34,000 unique organic visitors this month.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
