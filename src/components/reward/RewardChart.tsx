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
                const config = chartConfig[name as keyof typeof chartConfig];
                const label = config?.label || name;
                const numValue = Number(value);
                
                // Don't show zero values
                if (numValue === 0) {
                  return null;
                }
                
                // Only show total when there are multiple point types
                if (name === 'totalPoints') {
                  const hasEmployee = props.payload.employeePoints > 0;
                  const hasReferral = props.payload.referralPoints > 0;
                  const hasWelcome = props.payload.welcome > 0;
                  const pointTypeCount = [hasEmployee, hasReferral, hasWelcome].filter(Boolean).length;
                  if (pointTypeCount < 2) {
                    return null;
                  }
                }
                
                return (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: config?.color || '#ccc' }}
                    />
                    <span>{label} {numValue.toLocaleString()} pts</span>
                  </div>
                );
              }}
              hideIndicator={true}
              labelFormatter={(label) => formatDateForDisplay(String(label))}
            />
          }
        />
        <Area
          dataKey="welcome"
          type="monotone"
          fill="url(#fillWelcome)"
          stroke="var(--color-welcome)"
          strokeWidth={0}
          stackId="a"
        />
        <Area
          dataKey="referralPoints"
          type="monotone"
          fill="url(#fillReferral)"
          stroke="var(--color-referralPoints)"
          strokeWidth={0}
          stackId="a"
        />
        <Area
          dataKey="employeePoints"
          type="monotone"
          fill="url(#fillEmployee)"
          stroke="var(--color-employeePoints)"
          strokeWidth={0}
          stackId="a"
        />
        <Area
          dataKey="totalPoints"
          type="monotone"
          fill="url(#fillTotal)"
          stroke="var(--color-totalPoints)"
          strokeWidth={0}
        />
      </AreaChart>
    </ChartContainer>
  )
}
