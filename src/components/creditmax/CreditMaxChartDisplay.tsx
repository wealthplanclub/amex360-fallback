
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

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">CreditMax cumulative metrics</CardTitle>
          <CardDescription>
            Cumulative points {getTimeRangeLabel()}: {getCumulativePoints().toLocaleString()} pts
          </CardDescription>
        </div>
        
        <TimeRangeSelector 
          timeRange={selectedTimeRange}
          onTimeRangeChange={onTimeRangeChange}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <CreditMaxChart data={chartData} onDateClick={onDateClick} />
      </CardContent>
    </Card>
  )
}
