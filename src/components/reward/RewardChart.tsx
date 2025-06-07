
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
    color: "hsl(142, 76%, 36%)", // Green
  },
  referralPoints: {
    label: "Referral:",
    color: "hsl(221, 83%, 53%)", // Blue
  },
  welcome: {
    label: "Welcome:",
    color: "hsl(48, 96%, 53%)", // Yellow
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

  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

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
          tickFormatter={formatDateForDisplay}
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
              formatter={(value, name, props) => {
                console.log('Tooltip formatter called:', { value, name, props });
                console.log('Item color:', props?.color, 'Payload fill:', props?.payload?.fill);
                const numValue = Number(value);
                
                // Don't show zero values
                if (numValue === 0) {
                  return null;
                }
                
                // Only show total when there are multiple point types
                if (name === 'totalPoints') {
                  const hasEmployee = data.some(d => d.employeePoints > 0);
                  const hasReferral = data.some(d => d.referralPoints > 0);
                  const hasWelcome = data.some(d => d.welcome > 0);
                  const pointTypeCount = [hasEmployee, hasReferral, hasWelcome].filter(Boolean).length;
                  if (pointTypeCount < 2) {
                    return null;
                  }
                }
                
                const config = chartConfig[name as keyof typeof chartConfig];
                const label = config?.label || name;
                
                return `${label} ${numValue.toLocaleString()} pts`;
              }}
              indicator="dot"
              hideIndicator={false}
              labelFormatter={(label) => formatDateForDisplay(String(label))}
            />
          }
        />
        <Area
          dataKey="welcome"
          type="monotone"
          fill="url(#fillWelcome)"
          stroke="var(--color-welcome)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="referralPoints"
          type="monotone"
          fill="url(#fillReferral)"
          stroke="var(--color-referralPoints)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="employeePoints"
          type="monotone"
          fill="url(#fillEmployee)"
          stroke="var(--color-employeePoints)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="totalPoints"
          type="monotone"
          fill="url(#fillTotal)"
          stroke="var(--color-totalPoints)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
