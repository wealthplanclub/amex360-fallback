
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
  showTimeRangeOnly?: boolean;
}

export function ChartAreaInteractive({ showTimeRangeOnly = false }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

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
        const date = new Date(transaction.date).toISOString().split('T')[0]
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += Math.abs(transaction.amount)
        return acc
      }, {} as Record<string, number>)

    // Get date range and fill missing dates with zero
    const dates = Object.keys(dailySpending).sort()
    if (dates.length === 0) return []

    const startDate = new Date(dates[0])
    const endDate = new Date(dates[dates.length - 1])
    const filledData: Array<{date: string, totalSpend: number}> = []

    // Fill all dates from start to end
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]
      const totalSpend = dailySpending[dateStr] || 0
      filledData.push({
        date: dateStr,
        totalSpend: Math.round(totalSpend * 100) / 100
      })
    }

    console.log('Processed data sample:', filledData.slice(0, 5))
    console.log('Min value:', Math.min(...filledData.map(d => d.totalSpend)))
    console.log('Max value:', Math.max(...filledData.map(d => d.totalSpend)))

    return filledData
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
    
    const filtered = processedData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate
    })

    console.log('Filtered data sample:', filtered.slice(0, 5))
    console.log('Filtered min value:', Math.min(...filtered.map(d => d.totalSpend)))

    return filtered
  }, [processedData, timeRange])

  const totalSpendForPeriod = filteredData.reduce((sum, item) => sum + item.totalSpend, 0)

  const getTimeRangeLabel = () => {
    if (timeRange === "ytd") return "YTD"
    if (timeRange === "90d") return "Last 90 days"
    if (timeRange === "30d") return "Last 30 days"
    if (timeRange === "7d") return "Last 7 days"
    return "Last 90 days"
  }

  if (showTimeRangeOnly) {
    return (
      <div className="flex justify-end">
        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={setTimeRange}
          variant="outline"
          className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
        >
          <ToggleGroupItem value="ytd">YTD</ToggleGroupItem>
          <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
          <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
          <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
        </ToggleGroup>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="flex w-40 @[767px]/card:hidden"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 90 days" />
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
    );
  }

  return (
    <div className="@container/card">
      {/* Chart Section */}
      <div className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
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
              defaultIndex={isMobile ? -1 : 10}
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
              stroke="var(--color-totalSpend)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}
