
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
}

export function TimeRangeSelector({ timeRange, onTimeRangeChange }: TimeRangeSelectorProps) {
  const isMobile = useIsMobile()

  const handleTimeRangeChange = (newTimeRange: string) => {
    onTimeRangeChange(newTimeRange)
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
        <ToggleGroupItem value="ytd">YTD</ToggleGroupItem>
        <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
      </ToggleGroup>
      <Select value={timeRange} onValueChange={handleTimeRangeChange}>
        <SelectTrigger
          className="flex w-40 md:hidden"
          aria-label="Select a value"
        >
          <SelectValue placeholder="YTD" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="ytd" className="rounded-lg">
            YTD
          </SelectItem>
          <SelectItem value="90d" className="rounded-lg">
            Last 90 days
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7d" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
