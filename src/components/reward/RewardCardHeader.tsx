
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { DateFilterIndicator } from "@/components/transaction/DateFilterIndicator"
import { TimeRangeFilterIndicator } from "@/components/transaction/TimeRangeFilterIndicator"
import { StatCardFilterIndicator } from "@/components/transaction/StatCardFilterIndicator"
import { FilterState } from "@/hooks/useFilterState"

interface RewardCardHeaderProps {
  selectedDate?: string
  onClearDateFilter?: () => void
  selectedTimeRange: string
  onClearTimeRangeFilter?: () => void
  filters: FilterState
  onClearCardFilter?: () => void
}

export function RewardCardHeader({
  selectedDate,
  onClearDateFilter,
  selectedTimeRange,
  onClearTimeRangeFilter,
  filters,
  onClearCardFilter
}: RewardCardHeaderProps) {
  const hasFilters = selectedDate || 
    (selectedTimeRange && selectedTimeRange !== "ytd") || 
    (filters.selectedCard && filters.selectedCard !== "all") ||
    (filters.globalFilter && filters.globalFilter.trim() !== "")

  const getTimeRangeLabel = () => {
    switch (selectedTimeRange) {
      case "ytd": return "YTD"
      case "90d": return "Last 90 days"
      case "30d": return "Last 30 days"
      case "7d": return "Last 7 days"
      default: return "YTD"
    }
  }

  const handleClearEmployeeFilter = () => {
    // This would need to be passed down from parent to clear the globalFilter
    console.log("Clear employee filter clicked")
  }

  return (
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold">Bonus awards</CardTitle>
      
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Filtered by:</span>
          
          {/* Date Filter */}
          {selectedDate && (
            <DateFilterIndicator
              selectedDate={selectedDate}
              onClearFilter={onClearDateFilter}
            />
          )}
          
          {/* Time Range Filter (only show if no specific date is selected) */}
          {!selectedDate && selectedTimeRange && selectedTimeRange !== "ytd" && (
            <TimeRangeFilterIndicator
              selectedTimeRange={getTimeRangeLabel()}
              onClearFilter={onClearTimeRangeFilter}
            />
          )}
          
          {/* Employee Card Filter */}
          {filters.globalFilter && filters.globalFilter.toLowerCase().includes('employee card') && (
            <StatCardFilterIndicator
              filterText="Employee Card"
              onClearFilter={handleClearEmployeeFilter}
            />
          )}
          
          {/* Card Filter */}
          {filters.selectedCard && filters.selectedCard !== "all" && (
            <StatCardFilterIndicator
              filterText={filters.selectedCard}
              onClearFilter={onClearCardFilter}
            />
          )}
        </div>
      )}
    </CardHeader>
  )
}
