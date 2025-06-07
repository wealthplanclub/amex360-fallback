import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    label: "Employee Card Points",
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
  // Calculate the maximum value to set an optimal Y-axis domain
  const maxValue = Math.max(...data.map(d => d.totalPoints))
  const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.05) : 100

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
        <YAxis
          domain={[0, yAxisMax]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          hide
        />
        <ChartTooltip
          cursor={false}
          defaultIndex={-1}
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                const config = chartConfig[name as keyof typeof chartConfig];
                const label = config?.label || name;
                return [
                  `${Number(value).toLocaleString()} pts`,
                  label
                ];
              }}
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
