
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateFilterIndicator } from "./DateFilterIndicator"
import { StatCardFilterIndicator } from "./StatCardFilterIndicator"
import { TimeRangeFilterIndicator } from "./TimeRangeFilterIndicator"

interface TransactionCardHeaderProps {
  selectedDate?: string
  onClearDateFilter?: () => void
  statCardFilter?: {
    cardType: string
    timeRange: string
    topCardAccount?: string
  } | null
  onClearStatCardFilter?: () => void
  selectedTimeRange?: string
  onClearTimeRangeFilter?: () => void
}

export function TransactionCardHeader({
  selectedDate,
  onClearDateFilter,
  statCardFilter,
  onClearStatCardFilter,
  selectedTimeRange,
  onClearTimeRangeFilter
}: TransactionCardHeaderProps) {
  const hasActiveFilter = selectedDate || statCardFilter || (selectedTimeRange && selectedTimeRange !== "ytd")

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
      {statCardFilter && onClearStatCardFilter && (
        <StatCardFilterIndicator
          cardType={statCardFilter.cardType}
          timeRange={statCardFilter.timeRange}
          topCardAccount={statCardFilter.topCardAccount}
          onClear={onClearStatCardFilter}
        />
      )}
      {selectedTimeRange && selectedTimeRange !== "ytd" && !statCardFilter && onClearTimeRangeFilter && (
        <TimeRangeFilterIndicator
          timeRange={selectedTimeRange}
          onClear={onClearTimeRangeFilter}
        />
      )}
    </CardHeader>
  )
}
