
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart showing daily spending"

const chartConfig = {
  totalSpend: {
    label: "Total Spend",
    color: "var(--primary)",
  },
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
  onDateClick?: (date: string) => void;
}

export function ChartAreaInteractive({ onDateClick }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("ytd")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Process transaction data to get daily spending totals
  const processedData = React.useMemo(() => {
    const transactions = parseTransactionData(staticTxnData)
    
    // Group transactions by date and calculate daily spending
    const dailySpending = transactions
      .filter(transaction => transaction.amount < 0) // Only expenses
      .reduce((acc, transaction) => {
        // Since dates are already in ISO format, use them directly
        const date = transaction.date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += Math.abs(transaction.amount)
        return acc
      }, {} as Record<string, number>)

    // Convert to array and sort by date
    return Object.entries(dailySpending)
      .map(([date, totalSpend]) => ({
        date,
        totalSpend: Math.round(totalSpend * 100) / 100 // Round to 2 decimal places
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [])

  const filteredData = React.useMemo(() => {
    if (processedData.length === 0) return []
    
    // Get the latest date from the data
    const latestDate = new Date(Math.max(...processedData.map(item => new Date(item.date).getTime())))
    
    let startDate = new Date(latestDate)
    
    if (timeRange === "ytd") {
      // Year to date - start from January 1st of the current year
      startDate = new Date(latestDate.getFullYear(), 0, 1)
    } else if (timeRange === "90d") {
      startDate.setDate(startDate.getDate() - 90)
    } else if (timeRange === "30d") {
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeRange === "7d") {
      startDate.setDate(startDate.getDate() - 7)
    }
    
    return processedData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate
    })
  }, [processedData, timeRange])

  const totalSpendForPeriod = filteredData.reduce((sum, item) => sum + item.totalSpend, 0)
  const averageDailySpend = filteredData.length > 0 ? totalSpendForPeriod / filteredData.length : 0

  const getTimeRangeLabel = () => {
    if (timeRange === "ytd") return "YTD"
    if (timeRange === "90d") return "Last 90 days"
    if (timeRange === "30d") return "Last 30 days"
    if (timeRange === "7d") return "Last 7 days"
    return "Last 90 days"
  }

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0] && onDateClick) {
      const clickedDate = data.activePayload[0].payload.date;
      console.log("Chart clicked, date:", clickedDate);
      onDateClick(clickedDate);
    }
  };

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="flex flex-col space-y-4 pb-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Daily Spend by Time Period</CardTitle>
          <CardDescription>
            Average daily spend ({getTimeRangeLabel()}): ${averageDailySpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardDescription>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex justify-start md:justify-end">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 md:flex"
          >
            <ToggleGroupItem value="ytd">YTD</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 md:hidden"
              aria-label="Select a value"
            >
              <SelectValue placeholder="YTD" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ytd" className="rounded-lg">
                YTD
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 90 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData} onClick={handleChartClick}>
            <defs>
              <linearGradient id="fillTotalSpend" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalSpend)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalSpend)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={-1}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value) => [
                    `Total Spend: $${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    ""
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalSpend"
              type="monotone"
              fill="url(#fillTotalSpend)"
              stroke="#000000"
              strokeWidth={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
