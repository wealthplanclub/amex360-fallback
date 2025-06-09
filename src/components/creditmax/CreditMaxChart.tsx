
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  cumulativePoints: {
    label: "Cumulative Points:",
    color: "hsl(var(--chart-1))",
  },
  cumulativeSpent: {
    label: "Cumulative Card Spend:",
    color: "hsl(var(--chart-2))",
  },
  actualSpent: {
    label: "Actual Spend:",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface CreditMaxChartProps {
  data: Array<{
    date: string
    displayDate: string
    cumulativePoints: number
    cumulativeSpent: number
    actualSpent: number
  }>
  onDateClick?: (date: string) => void
}

export function CreditMaxChart({ data, onDateClick }: CreditMaxChartProps) {
  console.log('CreditMaxChart received data:', data)
  
  // Calculate the maximum value to set an optimal Y-axis domain
  const maxValue = Math.max(...data.map(d => Math.max(d.cumulativePoints, d.cumulativeSpent, d.actualSpent)))
  const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.05) : 100

  console.log('Chart max value:', maxValue, 'Y-axis max:', yAxisMax)

  const handleChartClick = (chartData: any) => {
    if (chartData && chartData.activePayload && chartData.activePayload[0] && onDateClick) {
      const clickedDate = chartData.activePayload[0].payload.date;
      console.log("CreditMax chart clicked, date:", clickedDate);
      onDateClick(clickedDate);
    }
  }

  if (data.length === 0) {
    return (
      <div className="aspect-auto h-[250px] w-full flex items-center justify-center text-muted-foreground">
        No data available for the selected time range
      </div>
    )
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }} onClick={handleChartClick}>
        <defs>
          <linearGradient id="fillCumulativePoints" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillCumulativeSpent" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-2))"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-2))"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillActualSpent" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-3))"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-3))"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="displayDate"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
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
                const numValue = Number(value);
                
                // Don't show zero values
                if (numValue === 0) {
                  return null;
                }
                
                if (name === 'cumulativePoints') {
                  return `${label} ${numValue.toLocaleString()} pts`;
                } else {
                  return `${label} $${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
              }}
              indicator="dot"
            />
          }
        />
        <Area
          dataKey="cumulativePoints"
          type="monotone"
          fill="url(#fillCumulativePoints)"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
        />
        <Area
          dataKey="cumulativeSpent"
          type="monotone"
          fill="url(#fillCumulativeSpent)"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
        />
        <Area
          dataKey="actualSpent"
          type="monotone"
          fill="url(#fillActualSpent)"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
