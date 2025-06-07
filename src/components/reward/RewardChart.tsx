
import * as React from "react"
import { useRewardChartData } from "@/hooks/useRewardChartData"
import { TimeRangeSelector } from "@/components/chart/TimeRangeSelector"
import { RewardChartDisplay } from "./RewardChartDisplay"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface RewardChartProps {
  onDateClick?: (date: string) => void;
  selectedTimeRange?: string;
  onTimeRangeChange?: (timeRange: string) => void;
}

export function RewardChart({ 
  onDateClick, 
  selectedTimeRange = "ytd", 
  onTimeRangeChange 
}: RewardChartProps) {
  const [timeRange, setTimeRange] = React.useState(selectedTimeRange)

  React.useEffect(() => {
    setTimeRange(selectedTimeRange);
  }, [selectedTimeRange])

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
    onTimeRangeChange?.(newTimeRange);
  };

  const { filteredData, averageDailyPoints } = useRewardChartData(timeRange)

  const getTimeRangeLabel = () => {
    if (timeRange === "ytd") return "(YTD)"
    if (timeRange === "90d") return "(90d)"
    if (timeRange === "30d") return "(30d)"
    if (timeRange === "7d") return "(7d)"
    return "(90d)"
  }

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Daily Rewards by Time Period</CardTitle>
          <CardDescription>
            Average daily points {getTimeRangeLabel()}: {averageDailyPoints.toLocaleString()} points
          </CardDescription>
        </div>
        
        <TimeRangeSelector 
          timeRange={timeRange} 
          onTimeRangeChange={handleTimeRangeChange} 
        />
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <RewardChartDisplay data={filteredData} onDateClick={onDateClick} />
      </CardContent>
    </Card>
  )
}
