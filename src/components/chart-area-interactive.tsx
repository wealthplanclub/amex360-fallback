
"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useChartData } from "@/hooks/useChartData"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TimeRangeSelector } from "@/components/chart/TimeRangeSelector"
import { ChartArea } from "@/components/chart/ChartArea"

export const description = "An interactive area chart showing daily spending"

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("ytd")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const { filteredData, yAxisDomain, averageDailySpend } = useChartData(timeRange)

  const getTimeRangeLabel = () => {
    if (timeRange === "ytd") return "YTD"
    if (timeRange === "90d") return "Last 90 days"
    if (timeRange === "30d") return "Last 30 days"
    if (timeRange === "7d") return "Last 7 days"
    return "Last 90 days"
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl font-semibold">Daily Spend by Time Period</CardTitle>
          <CardDescription>
            Average daily spend ({getTimeRangeLabel()}): ${averageDailySpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardDescription>
        </div>
        
        <TimeRangeSelector 
          timeRange={timeRange} 
          onTimeRangeChange={setTimeRange} 
        />
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartArea 
          data={filteredData}
          yAxisDomain={yAxisDomain}
          isMobile={isMobile}
        />
      </CardContent>
    </Card>
  )
}
