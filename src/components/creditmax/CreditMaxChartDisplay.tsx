
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TimeRangeSelector } from "@/components/chart/TimeRangeSelector"
import { CreditMaxChart } from "./CreditMaxChart"
import { useCreditMaxChartData } from "@/hooks/useCreditMaxChartData"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxChartDisplayProps {
  swapTransactions: SwapTransaction[]
  selectedTimeRange: string
  onTimeRangeChange: (timeRange: string) => void
  onDateClick?: (date: string) => void
}

export function CreditMaxChartDisplay({ 
  swapTransactions, 
  selectedTimeRange, 
  onTimeRangeChange, 
  onDateClick 
}: CreditMaxChartDisplayProps) {
  const chartData = useCreditMaxChartData(swapTransactions, selectedTimeRange)

  const getTimeRangeLabel = () => {
    switch (selectedTimeRange) {
      case "ytd": return "(YTD)"
      case "90d": return "(90d)"
      case "30d": return "(30d)"
      case "7d": return "(7d)"
      default: return "(YTD)"
    }
  }

  const getCumulativePoints = () => {
    if (chartData.length === 0) return 0
    
    // Return the final cumulative points value from the chart data
    const totalPoints = chartData[chartData.length - 1]?.cumulativePoints || 0
    return Math.round(totalPoints)
  }

  // Check which time ranges have data
  const getAvailableTimeRanges = () => {
    const ranges = ["ytd", "90d", "30d", "7d"]
    const availableRanges: string[] = []

    ranges.forEach(range => {
      const testData = useCreditMaxChartData(swapTransactions, range)
      if (testData.length > 0) {
        availableRanges.push(range)
      }
    })

    return availableRanges
  }

  const availableTimeRanges = getAvailableTimeRanges()

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">CreditMax cumulative metrics</CardTitle>
          <CardDescription>
            Points accumulated {getTimeRangeLabel()}: {getCumulativePoints().toLocaleString()} pts
          </CardDescription>
        </div>
        
        {availableTimeRanges.length > 1 && (
          <TimeRangeSelector 
            timeRange={selectedTimeRange}
            onTimeRangeChange={onTimeRangeChange}
            availableRanges={availableTimeRanges}
          />
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <CreditMaxChart data={chartData} onDateClick={onDateClick} />
      </CardContent>
    </Card>
  )
}
