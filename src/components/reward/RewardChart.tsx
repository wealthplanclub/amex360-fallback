
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
    color: "hsl(var(--chart-1))",
  },
  employeePoints: {
    label: "Employee Points",
    color: "hsl(var(--chart-2))",
  },
  referralPoints: {
    label: "Referral Points",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface RewardChartProps {
  data: Array<{
    month: string
    totalPoints: number
    employeePoints: number
    referralPoints: number
  }>
}

export function RewardChart({ data }: RewardChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
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
          <linearGradient id="fillEmployee" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-employeePoints)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-employeePoints)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillReferral" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-referralPoints)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-referralPoints)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="referralPoints"
          type="natural"
          fill="url(#fillReferral)"
          fillOpacity={0.4}
          stroke="var(--color-referralPoints)"
          stackId="a"
        />
        <Area
          dataKey="employeePoints"
          type="natural"
          fill="url(#fillEmployee)"
          fillOpacity={0.4}
          stroke="var(--color-employeePoints)"
          stackId="a"
        />
        <Area
          dataKey="totalPoints"
          type="natural"
          fill="url(#fillTotal)"
          fillOpacity={0.4}
          stroke="var(--color-totalPoints)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
