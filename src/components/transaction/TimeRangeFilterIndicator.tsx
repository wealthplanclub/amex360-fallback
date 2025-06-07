
import { X } from "lucide-react"

interface TimeRangeFilterIndicatorProps {
  timeRange: string
  onClear: () => void
}

export function TimeRangeFilterIndicator({ timeRange, onClear }: TimeRangeFilterIndicatorProps) {
  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "ytd": return "YTD";
      case "90d": return "90 days";
      case "30d": return "30 days";
      case "7d": return "7 days";
      default: return range;
    }
  };

  return (
    <div className="mt-2">
      <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md">
        Filtered by: {getTimeRangeLabel(timeRange)}
        <button 
          onClick={onClear}
          className="hover:bg-gray-300 rounded p-0.5"
          title="Clear time range filter"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    </div>
  )
}
