
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartDataPoint } from "@/hooks/useChartData"

interface ChartAreaProps {
  data: ChartDataPoint[]
  yAxisDomain: [number, number]
  isMobile: boolean
}

const chartConfig = {
  totalSpend: {
    label: "Total Spend",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartArea({ data, yAxisDomain, isMobile }: ChartAreaProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart 
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
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
        <YAxis hide domain={yAxisDomain} />
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
          stroke="#000000"
          strokeWidth={1}
        />
      </AreaChart>
    </ChartContainer>
  )
}
