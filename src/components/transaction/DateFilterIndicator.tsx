
import { X } from "lucide-react"

interface DateFilterIndicatorProps {
  selectedDate: string
  onClear: () => void
}

export function DateFilterIndicator({ selectedDate, onClear }: DateFilterIndicatorProps) {
  return (
    <div className="mt-2">
      <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
        Filtered by: {new Date(selectedDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })}
        <button 
          onClick={onClear}
          className="hover:bg-blue-200 rounded p-0.5"
          title="Clear date filter"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    </div>
  )
}
