
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
    date: string
    totalPoints: number
    employeePoints: number
    referralPoints: number
  }>
}

export function RewardChart({ data }: RewardChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
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
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          defaultIndex={-1}
          content={
            <ChartTooltipContent
              formatter={(value) => [
                `${Number(value).toLocaleString()} pts`,
                ""
              ]}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="referralPoints"
          type="monotone"
          fill="url(#fillReferral)"
          stroke="var(--color-referralPoints)"
          strokeWidth={1}
          stackId="a"
        />
        <Area
          dataKey="employeePoints"
          type="monotone"
          fill="url(#fillEmployee)"
          stroke="var(--color-employeePoints)"
          strokeWidth={1}
          stackId="a"
        />
        <Area
          dataKey="totalPoints"
          type="monotone"
          fill="url(#fillTotal)"
          stroke="var(--color-totalPoints)"
          strokeWidth={1}
        />
      </AreaChart>
    </ChartContainer>
  )
}
