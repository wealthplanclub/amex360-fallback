
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateFilterIndicator } from "../transaction/DateFilterIndicator"
import { TimeRangeFilterIndicator } from "../transaction/TimeRangeFilterIndicator"
import { FilterState } from "@/hooks/useFilterState"

interface RewardCardHeaderProps {
  selectedDate?: string
  onClearDateFilter?: () => void
  selectedTimeRange?: string
  onClearTimeRangeFilter?: () => void
  filters: FilterState
}

export function RewardCardHeader({
  selectedDate,
  onClearDateFilter,
  selectedTimeRange,
  onClearTimeRangeFilter,
  filters
}: RewardCardHeaderProps) {
  const hasActiveFilter = selectedDate || (selectedTimeRange && selectedTimeRange !== "ytd") || (filters.selectedCard && filters.selectedCard !== "all")

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "ytd": return "YTD"
      case "90d": return "90d"
      case "30d": return "30d"
      case "7d": return "7d"
      default: return range.toUpperCase()
    }
  }

  const getCardDisplayName = (cardName: string) => {
    if (cardName === 'BUSINESS_GREEN_COMBINED') return 'Business Green'
    return cardName.replace(/\b(card|Rewards)\b/gi, '').trim()
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[month - 1]} ${day}, ${year}`;
  }

  const getCombinedFilterLabel = () => {
    const parts = []
    
    // Add date or time range
    if (selectedDate) {
      parts.push(formatDate(selectedDate))
    } else if (selectedTimeRange && selectedTimeRange !== "ytd") {
      parts.push(getTimeRangeLabel(selectedTimeRange))
    } else {
      parts.push("YTD")
    }
    
    // Add card filter if present and not "all"
    if (filters.selectedCard && filters.selectedCard !== "all") {
      parts.push(getCardDisplayName(filters.selectedCard))
    }
    
    return parts.join(", ")
  }

  const handleClearAllFilters = () => {
    if (selectedDate && onClearDateFilter) {
      onClearDateFilter()
    } else if (selectedTimeRange && selectedTimeRange !== "ytd" && onClearTimeRangeFilter) {
      onClearTimeRangeFilter()
    }
  }

  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-semibold">Rewards History</CardTitle>
      {!hasActiveFilter && (
        <CardDescription className="mb-0">
          Rewards activity (YTD)
        </CardDescription>
      )}
      {hasActiveFilter && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
            Filtered by: {getCombinedFilterLabel()}
            <button 
              onClick={handleClearAllFilters}
              className="hover:bg-gray-200 rounded p-0.5"
              title="Clear filters"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      )}
    </CardHeader>
  )
}
