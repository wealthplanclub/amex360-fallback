
import { X } from "lucide-react"

interface StatCardFilterIndicatorProps {
  cardType: string
  timeRange: string
  onClear: () => void
}

export function StatCardFilterIndicator({ cardType, timeRange, onClear }: StatCardFilterIndicatorProps) {
  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "ytd": return "YTD"
      case "90d": return "90d"
      case "30d": return "30d"
      case "7d": return "7d"
      default: return range.toUpperCase()
    }
  }

  const getCardTypeLabel = (type: string) => {
    switch (type) {
      case "expenses": return "Expenses"
      case "credits": return "Credits"
      case "top-card": return "Top Card"
      case "lowest-card": return "Lowest Card"
      default: return type
    }
  }

  return (
    <div className="mt-2">
      <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
        Filtered by: All cards, {getCardTypeLabel(cardType)}, {getTimeRangeLabel(timeRange)}
        <button 
          onClick={onClear}
          className="hover:bg-gray-300 rounded p-0.5"
          title="Clear stat card filter"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    </div>
  )
}
