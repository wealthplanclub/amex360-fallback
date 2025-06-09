
import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface TimeRangeSelectorProps {
  timeRange: string
  onTimeRangeChange: (timeRange: string) => void
  availableRanges?: string[]
}

export function TimeRangeSelector({ 
  timeRange, 
  onTimeRangeChange, 
  availableRanges = ["ytd", "90d", "30d", "7d"] 
}: TimeRangeSelectorProps) {
  const isMobile = useIsMobile()

  const handleTimeRangeChange = (newTimeRange: string) => {
    onTimeRangeChange(newTimeRange)
  }

  const timeRangeLabels = {
    ytd: { short: "YTD", long: "YTD" },
    "90d": { short: "Last 90 days", long: "Last 90 days" },
    "30d": { short: "Last 30 days", long: "Last 30 days" },
    "7d": { short: "Last 7 days", long: "Last 7 days" }
  }

  const filteredRanges = availableRanges.filter(range => timeRangeLabels[range as keyof typeof timeRangeLabels])

  if (filteredRanges.length <= 1) {
    return null
  }

  return (
    <div className="flex justify-start md:justify-end">
      <ToggleGroup
        type="single"
        value={timeRange}
        onValueChange={handleTimeRangeChange}
        variant="outline"
        className="hidden *:data-[slot=toggle-group-item]:!px-4 md:flex"
      >
        {filteredRanges.map(range => (
          <ToggleGroupItem key={range} value={range}>
            {timeRangeLabels[range as keyof typeof timeRangeLabels].short}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Select value={timeRange} onValueChange={handleTimeRangeChange}>
        <SelectTrigger
          className="flex w-40 md:hidden"
          aria-label="Select a value"
        >
          <SelectValue placeholder="YTD" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {filteredRanges.map(range => (
            <SelectItem key={range} value={range} className="rounded-lg">
              {timeRangeLabels[range as keyof typeof timeRangeLabels].long}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
