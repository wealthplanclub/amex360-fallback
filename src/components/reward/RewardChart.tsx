import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  totalPoints: {
    label: "Total:",
    color: "hsl(var(--chart-1))",
  },
  employeePoints: {
    label: "Employee:",
    color: "hsl(var(--chart-2))",
  },
  referralPoints: {
    label: "Referral:",
    color: "hsl(var(--chart-3))",
  },
  welcome: {
    label: "Welcome:",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

interface RewardChartProps {
  data: Array<{
    date: string
    totalPoints: number
    employeePoints: number
    referralPoints: number
    welcome: number
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
          <linearGradient id="fillWelcome" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-welcome)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-welcome)"
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
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
              indicator="dot"
              formatter={(value, name, item, index, payload) => {
                // Filter out zero values
                if (value === 0) return null
                
                // Check if there are multiple non-zero point types
                const nonZeroValues = payload?.filter(p => 
                  p.dataKey !== 'totalPoints' && p.value > 0
                ).length || 0
                
                // Only show total if there are multiple point types
                if (name === 'totalPoints' && nonZeroValues <= 1) {
                  return null
                }
                
                return [
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    {value.toLocaleString()}
                  </span>,
                  name
                ]
              }}
            />
          }
        />
        <Area
          dataKey="welcome"
          type="monotone"
          fill="url(#fillWelcome)"
          stroke="var(--color-welcome)"
          strokeWidth={1}
          stackId="a"
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
