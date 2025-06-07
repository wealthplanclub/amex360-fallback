
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
      case "ytd": return "(YTD)"
      case "90d": return "(90d)"
      case "30d": return "(30d)"
      case "7d": return "(7d)"
      default: return "(YTD)"
    }
  }

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Rewards Over Time</CardTitle>
          <CardDescription>
            Showing reward points earned {getTimeRangeLabel()}
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
