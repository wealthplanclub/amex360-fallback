
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateFilterIndicator } from "../transaction/DateFilterIndicator"
import { TimeRangeFilterIndicator } from "../transaction/TimeRangeFilterIndicator"
import { FilterState } from "@/hooks/useFilterState"
import { X } from "lucide-react"

interface RewardCardHeaderProps {
  selectedDate?: string
  onClearDateFilter?: () => void
  selectedTimeRange?: string
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
  const hasActiveFilter = selectedDate || (selectedTimeRange && selectedTimeRange !== "ytd") || (filters.selectedCard && filters.selectedCard !== "all")

  // If there's a selected date, use the DateFilterIndicator component
  if (selectedDate && onClearDateFilter) {
    return (
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Rewards History</CardTitle>
        <DateFilterIndicator 
          selectedDate={selectedDate}
          onClear={onClearDateFilter}
        />
      </CardHeader>
    )
  }

  // If there's a time range filter (not YTD), use the TimeRangeFilterIndicator
  if (selectedTimeRange && selectedTimeRange !== "ytd" && onClearTimeRangeFilter) {
    return (
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Rewards History</CardTitle>
        <TimeRangeFilterIndicator 
          selectedTimeRange={selectedTimeRange}
          onClear={onClearTimeRangeFilter}
        />
      </CardHeader>
    )
  }

  // If there's a card filter, show card filter indicator
  if (filters.selectedCard && filters.selectedCard !== "all" && onClearCardFilter) {
    const getCardDisplayName = (cardName: string) => {
      if (cardName === 'BUSINESS_GREEN_COMBINED') return 'Business Green'
      return cardName.replace(/\b(card|Rewards)\b/gi, '').trim()
    }

    return (
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Rewards History</CardTitle>
        <div className="mt-2">
          <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
            Filtered by: {getCardDisplayName(filters.selectedCard)}
            <button 
              onClick={onClearCardFilter}
              className="hover:bg-gray-200 rounded p-0.5"
              title="Clear card filter"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        </div>
      </CardHeader>
    )
  }

  // Default state with no active filters
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-semibold">Rewards History</CardTitle>
      <CardDescription className="mb-0">
        Rewards activity (YTD)
      </CardDescription>
    </CardHeader>
  )
}
