import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, subDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
  className,
  onRangeChange,
}: {
  className?: string
  onRangeChange?: (label: string) => void
}) {
  const [selectedRange, setSelectedRange] = React.useState("Last 30 days")
  const [isOpen, setIsOpen] = React.useState(false)

  const presets = [
    { label: "Today", days: 0 },
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
    { label: "Year to date", days: 300 },
  ]

  const handleSelect = (label: string) => {
    setSelectedRange(label)
    setIsOpen(false)
    if (onRangeChange) {
      onRangeChange(label)
    }
  }

  const currentDate = new Date()
  const startDate = subDays(currentDate, selectedRange === "Today" ? 0 : selectedRange === "Last 7 days" ? 7 : selectedRange === "Last 30 days" ? 30 : 90)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal border-border/80 shadow-none text-xs sm:text-sm",
              !selectedRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {format(startDate, "LLL dd, y")} - {format(currentDate, "LLL dd, y")}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-2" align="end">
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Select date period
            </div>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleSelect(preset.label)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground text-left",
                  selectedRange === preset.label
                    ? "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
                    : ""
                )}
              >
                <span>{preset.label}</span>
                <span className="text-[10px] opacity-70">
                  {preset.days === 0 ? "24 hrs" : `${preset.days}d`}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
