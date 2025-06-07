
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  totalPoints: {
    label: "Total Points",
    color: "var(--primary)",
  },
} satisfies ChartConfig

interface RewardChartDisplayProps {
  data: Array<{ date: string; totalPoints: number }>
  onDateClick?: (date: string) => void
}

export function RewardChartDisplay({ data, onDateClick }: RewardChartDisplayProps) {
  const handleChartClick = (chartData: any) => {
    if (chartData && chartData.activePayload && chartData.activePayload[0] && onDateClick) {
      const clickedDate = chartData.activePayload[0].payload.date;
      console.log("Reward chart clicked, date:", clickedDate);
      onDateClick(clickedDate);
    }
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data} onClick={handleChartClick}>
        <defs>
          <linearGradient id="fillTotalPoints" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-totalPoints)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-totalPoints)"
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
            const date = new Date(value + 'T00:00:00')
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
                const date = new Date(value + 'T00:00:00')
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }}
              formatter={(value) => [
                `Total Points: ${Number(value).toLocaleString()} pts`,
                ""
              ]}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="totalPoints"
          type="monotone"
          fill="url(#fillTotalPoints)"
          stroke="#000000"
          strokeWidth={1}
        />
      </AreaChart>
    </ChartContainer>
  )
}
