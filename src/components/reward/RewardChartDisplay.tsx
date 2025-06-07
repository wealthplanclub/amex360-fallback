
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TimeRangeSelector } from "@/components/chart/TimeRangeSelector"
import { RewardChart } from "./RewardChart"
import { useRewardChartData } from "@/hooks/useRewardChartData"
import { FilterState } from "@/hooks/useFilterState"

interface RewardChartDisplayProps {
  filters: FilterState
  onTimeRangeChange: (timeRange: string) => void
}

export function RewardChartDisplay({ filters, onTimeRangeChange }: RewardChartDisplayProps) {
  const chartData = useRewardChartData(filters)

  const getTimeRangeLabel = () => {
    switch (filters.selectedTimeRange) {
      case "ytd": return "Year to Date"
      case "90d": return "Last 90 Days"
      case "30d": return "Last 30 Days"
      case "7d": return "Last 7 Days"
      default: return "Year to Date"
    }
  }

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Rewards Over Time</CardTitle>
          <CardDescription>
            Showing reward points earned {getTimeRangeLabel().toLowerCase()}
          </CardDescription>
        </div>
        <TimeRangeSelector 
          timeRange={filters.selectedTimeRange}
          onTimeRangeChange={onTimeRangeChange}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <RewardChart data={chartData} />
      </CardContent>
    </Card>
  )
}
