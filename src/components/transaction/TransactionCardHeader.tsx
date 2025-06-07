
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateFilterIndicator } from "./DateFilterIndicator"
import { TimeRangeFilterIndicator } from "./TimeRangeFilterIndicator"
import { FilterState } from "@/hooks/useFilterState"

interface TransactionCardHeaderProps {
  selectedDate?: string
  onClearDateFilter?: () => void
  hasStatCardFilter?: boolean
  onClearStatCardFilter?: () => void
  selectedTimeRange?: string
  onClearTimeRangeFilter?: () => void
  filters: FilterState
}

export function TransactionCardHeader({
  selectedDate,
  onClearDateFilter,
  hasStatCardFilter,
  onClearStatCardFilter,
  selectedTimeRange,
  onClearTimeRangeFilter,
  filters
}: TransactionCardHeaderProps) {
  const hasActiveFilter = selectedDate || hasStatCardFilter || (selectedTimeRange && selectedTimeRange !== "ytd") || (filters.selectedCard && filters.selectedCard !== "all")

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "ytd": return "YTD"
      case "90d": return "90d"
      case "30d": return "30d"
      case "7d": return "7d"
      default: return range.toUpperCase()
    }
  }

  const getStatCardFilterLabel = () => {
    if (filters.expenseFilter) return "Expenses"
    if (filters.creditFilter) return "Credits"
    return ""
  }

  const getCardDisplayName = (cardName: string) => {
    if (cardName === 'BUSINESS_GREEN_COMBINED') return 'Business Green'
    return cardName.replace(/\b(card|Rewards)\b/gi, '').trim()
  }

  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
      {!hasActiveFilter && (
        <CardDescription className="mb-0">
          Transaction activity (YTD)
        </CardDescription>
      )}
      {selectedDate && onClearDateFilter && (
        <DateFilterIndicator 
          selectedDate={selectedDate} 
          onClear={onClearDateFilter}
        />
      )}
      {hasStatCardFilter && onClearStatCardFilter && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
            Filtered by: {getStatCardFilterLabel()}, {getTimeRangeLabel(selectedTimeRange || "ytd")}
            <button 
              onClick={onClearStatCardFilter}
              className="hover:bg-gray-200 rounded p-0.5"
              title="Clear stat card filter"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}
      {filters.selectedCard && filters.selectedCard !== "all" && !hasStatCardFilter && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
            Filtered by: {getCardDisplayName(filters.selectedCard)}, {getTimeRangeLabel(selectedTimeRange || "ytd")}
            <button 
              onClick={onClearStatCardFilter}
              className="hover:bg-gray-200 rounded p-0.5"
              title="Clear card filter"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}
      {selectedTimeRange && selectedTimeRange !== "ytd" && !hasStatCardFilter && (!filters.selectedCard || filters.selectedCard === "all") && onClearTimeRangeFilter && (
        <TimeRangeFilterIndicator
          timeRange={selectedTimeRange}
          onClear={onClearTimeRangeFilter}
        />
      )}
    </CardHeader>
  )
}
