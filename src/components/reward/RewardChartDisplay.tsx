
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
  onDateClick?: (date: string) => void
}

export function RewardChartDisplay({ filters, onTimeRangeChange, onDateClick }: RewardChartDisplayProps) {
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

  const getAverageDailyRewards = () => {
    if (chartData.length === 0) return 0
    
    const totalRewards = chartData.reduce((sum, day) => sum + day.totalPoints, 0)
    
    // Calculate number of days based on time range
    let numberOfDays: number
    const today = new Date()
    
    switch (filters.selectedTimeRange) {
      case "ytd":
        const startOfYear = new Date(today.getFullYear(), 0, 1)
        numberOfDays = Math.ceil((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1
        break
      case "90d":
        numberOfDays = 90
        break
      case "30d":
        numberOfDays = 30
        break
      case "7d":
        numberOfDays = 7
        break
      default:
        numberOfDays = chartData.length
    }
    
    if (numberOfDays === 0) return 0
    
    return Math.round(totalRewards / numberOfDays)
  }

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Bonus awards over time</CardTitle>
          <CardDescription>
            Average daily bonus awards {getTimeRangeLabel()}: {getAverageDailyRewards().toLocaleString()} pts
          </CardDescription>
        </div>
        
        <TimeRangeSelector 
          timeRange={filters.selectedTimeRange}
          onTimeRangeChange={onTimeRangeChange}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <RewardChart data={chartData} onDateClick={onDateClick} />
      </CardContent>
    </Card>
  )
}
