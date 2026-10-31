export interface Transaction {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
    initials: string
  }
  status: "Completed" | "Pending" | "Processing" | "Refunded"
  amount: number
  date: string
  channel: "Stripe" | "PayPal" | "Apple Pay" | "Bank Transfer"
}

export interface MetricCard {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  period: string
}

export const METRIC_CARDS: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$128,430.80",
    change: "+20.1%",
    trend: "up",
    description: "from last month",
    period: "Past 30 days",
  },
  {
    title: "Active Subscriptions",
    value: "+3,842",
    change: "+12.4%",
    trend: "up",
    description: "from last month",
    period: "Past 30 days",
  },
  {
    title: "Total Sales",
    value: "+18,492",
    change: "+15.2%",
    trend: "up",
    description: "from last month",
    period: "Past 30 days",
  },
  {
    title: "Active Now",
    value: "+749",
    change: "+24.5%",
    trend: "up",
    description: "since last hour",
    period: "Real-time",
  },
]

export const REVENUE_CHART_DATA = [
  { name: "Jan", total: 4200, target: 3800, expenses: 2100 },
  { name: "Feb", total: 3100, target: 3500, expenses: 1800 },
  { name: "Mar", total: 5800, target: 4500, expenses: 2400 },
  { name: "Apr", total: 6400, target: 5000, expenses: 2900 },
  { name: "May", total: 7200, target: 5800, expenses: 3100 },
  { name: "Jun", total: 6800, target: 6000, expenses: 3000 },
  { name: "Jul", total: 8500, target: 7000, expenses: 3800 },
  { name: "Aug", total: 9100, target: 7500, expenses: 4000 },
  { name: "Sep", total: 7900, target: 7200, expenses: 3500 },
  { name: "Oct", total: 10400, target: 8500, expenses: 4500 },
  { name: "Nov", total: 11200, target: 9500, expenses: 4800 },
  { name: "Dec", total: 13800, target: 11000, expenses: 5400 },
]

export const TRAFFIC_DATA = [
  { name: "Desktop", value: 58, color: "hsl(var(--primary))" },
  { name: "Mobile", value: 31, color: "hsl(217.2, 91.2%, 69.8%)" },
  { name: "Tablet", value: 8, color: "hsl(142.1, 76.2%, 36.3%)" },
  { name: "Other", value: 3, color: "hsl(215.4, 16.3%, 46.9%)" },
]

export const CONVERSION_LINE_DATA = [
  { day: "Mon", visitors: 3400, leads: 420, orders: 190 },
  { day: "Tue", visitors: 4200, leads: 510, orders: 240 },
  { day: "Wed", visitors: 5100, leads: 680, orders: 310 },
  { day: "Thu", visitors: 4800, leads: 620, orders: 280 },
  { day: "Fri", visitors: 6200, leads: 830, orders: 420 },
  { day: "Sat", visitors: 5900, leads: 790, orders: 390 },
  { day: "Sun", visitors: 7100, leads: 950, orders: 510 },
]

export const RECENT_SALES = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@kim.dev",
    amount: "+$99.00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$449.00",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    initials: "SD",
  },
]

export const TRANSACTIONS: Transaction[] = [
  {
    id: "TRX-9481",
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      initials: "OM",
    },
    status: "Completed",
    amount: 1999.0,
    date: "2026-10-30 14:24",
    channel: "Stripe",
  },
  {
    id: "TRX-9480",
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      initials: "JL",
    },
    status: "Completed",
    amount: 39.0,
    date: "2026-10-30 13:10",
    channel: "PayPal",
  },
  {
    id: "TRX-9479",
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      initials: "IN",
    },
    status: "Processing",
    amount: 299.0,
    date: "2026-10-30 11:45",
    channel: "Apple Pay",
  },
  {
    id: "TRX-9478",
    customer: {
      name: "William Kim",
      email: "will@kim.dev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      initials: "WK",
    },
    status: "Completed",
    amount: 99.0,
    date: "2026-10-29 18:32",
    channel: "Stripe",
  },
  {
    id: "TRX-9477",
    customer: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      initials: "SD",
    },
    status: "Completed",
    amount: 449.0,
    date: "2026-10-29 16:15",
    channel: "Bank Transfer",
  },
  {
    id: "TRX-9476",
    customer: {
      name: "Alexander Wright",
      email: "a.wright@enterprise.co",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      initials: "AW",
    },
    status: "Pending",
    amount: 3450.0,
    date: "2026-10-29 10:05",
    channel: "Bank Transfer",
  },
  {
    id: "TRX-9475",
    customer: {
      name: "Emma Wilson",
      email: "emma.w@designcraft.io",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      initials: "EW",
    },
    status: "Completed",
    amount: 799.0,
    date: "2026-10-28 20:50",
    channel: "Stripe",
  },
  {
    id: "TRX-9474",
    customer: {
      name: "Lucas Vance",
      email: "lucas@vanceanalytics.org",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      initials: "LV",
    },
    status: "Refunded",
    amount: 149.0,
    date: "2026-10-28 14:12",
    channel: "PayPal",
  },
  {
    id: "TRX-9473",
    customer: {
      name: "Clara Zhang",
      email: "clara.zhang@biotech.ai",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      initials: "CZ",
    },
    status: "Completed",
    amount: 1250.0,
    date: "2026-10-27 09:20",
    channel: "Stripe",
  },
  {
    id: "TRX-9472",
    customer: {
      name: "Marcus Aurelius",
      email: "marcus@meditations.org",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      initials: "MA",
    },
    status: "Processing",
    amount: 520.0,
    date: "2026-10-26 15:44",
    channel: "Apple Pay",
  },
]

export const NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New High-Value Deal Closed",
    description: "Alexander Wright upgraded to Enterprise Annual Plan ($3,450.00).",
    time: "10m ago",
    unread: true,
    type: "payment",
  },
  {
    id: "notif-2",
    title: "System Performance Alert",
    description: "Database latency dropped by 42% following latest query caching patch.",
    time: "45m ago",
    unread: true,
    type: "system",
  },
  {
    id: "notif-3",
    title: "New User Registration Milestone",
    description: "Surpassed 15,000 monthly active users across EU & NA regions.",
    time: "2h ago",
    unread: false,
    type: "user",
  },
  {
    id: "notif-4",
    title: "Security Audit Passed",
    description: "SOC-2 automated weekly compliance scanner reported 100% check rate.",
    time: "1d ago",
    unread: false,
    type: "security",
  },
]
