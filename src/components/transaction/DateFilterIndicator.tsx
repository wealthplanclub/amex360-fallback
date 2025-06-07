
import { X } from "lucide-react"

interface DateFilterIndicatorProps {
  selectedDate: string
  onClear: () => void
}

export function DateFilterIndicator({ selectedDate, onClear }: DateFilterIndicatorProps) {
  // Parse ISO date string directly without timezone conversion
  const [year, month, day] = selectedDate.split('-').map(Number);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const formattedDate = `${monthNames[month - 1]} ${day}, ${year}`;

  return (
    <div className="mt-2">
      <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
        Filtered by: {formattedDate}
        <button 
          onClick={onClear}
          className="hover:bg-gray-200 rounded p-0.5"
          title="Clear date filter"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    </div>
  )
}
