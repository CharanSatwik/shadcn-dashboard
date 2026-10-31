import React from "react"
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function ReportsTab() {
  const reports = [
    {
      id: "REP-2026-Q3",
      name: "Q3 Comprehensive Financial & P&L Statement",
      period: "Jul 1, 2026 - Sep 30, 2026",
      format: "PDF (3.4 MB)",
      status: "Certified",
    },
    {
      id: "REP-2026-TAX",
      name: "Consolidated Sales Tax & VAT Assessment",
      period: "Jan 1, 2026 - Oct 1, 2026",
      format: "CSV (850 KB)",
      status: "Ready",
    },
    {
      id: "REP-2026-AUDIT",
      name: "SOC-2 Type II Automated Security Audit Log",
      period: "Monthly Rolling",
      format: "PDF (12.1 MB)",
      status: "Certified",
    },
    {
      id: "REP-2026-CHURN",
      name: "Enterprise Customer Cohort Retention Matrix",
      period: "Trailing 12 Months",
      format: "XLSX (1.8 MB)",
      status: "Ready",
    },
  ]

  const handleDownload = (name: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: `Preparing ${name}...`,
        success: `${name} downloaded successfully!`,
        error: "Download failed.",
      }
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Executive Reports & Compliance
              </CardTitle>
              <CardDescription className="text-xs">
                Download verified financial statements, audit trails, and cohort analytics.
              </CardDescription>
            </div>
            <Button
              size="sm"
              onClick={() => handleDownload("Scheduled-Auto-Report")}
              className="gap-1.5 h-9 text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download All Reports</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y rounded-lg border">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {report.name}
                      </p>
                      <Badge variant="outline" className="text-[10px]">
                        {report.format}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(report.name)}
                  className="gap-1.5 text-xs h-8 shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-muted/40 p-4 border flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Automated Weekly Delivery:</span>{" "}
              Reports are compiled and cryptographically signed each Monday at 00:00 UTC.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

