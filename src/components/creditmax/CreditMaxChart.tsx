
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
    color: "#86efac", // green-300
  },
  actualSpent: {
    label: "Actual Spend:",
    color: "#86efac", // green-300
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
  // Calculate the maximum value to set an optimal Y-axis domain
  const maxValue = Math.max(...data.map(d => Math.max(d.cumulativePoints, d.cumulativeSpent, d.actualSpent)))
  const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.05) : 100

  const handleChartClick = (chartData: any) => {
    if (chartData && chartData.activePayload && chartData.activePayload[0] && onDateClick) {
      const clickedDate = chartData.activePayload[0].payload.date;
      console.log("CreditMax chart clicked, date:", clickedDate);
      onDateClick(clickedDate);
    }
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
              stopColor="#00175a"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#00175a"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillCumulativeSpent" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="#86efac"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="#86efac"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillActualSpent" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="#86efac"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="#86efac"
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
          stroke="#00175a"
          strokeWidth={0}
          stackId="a"
        />
        <Area
          dataKey="cumulativeSpent"
          type="monotone"
          fill="url(#fillCumulativeSpent)"
          stroke="#86efac"
          strokeWidth={0}
          stackId="b"
        />
        <Area
          dataKey="actualSpent"
          type="monotone"
          fill="url(#fillActualSpent)"
          stroke="#86efac"
          strokeWidth={0}
          stackId="c"
        />
      </AreaChart>
    </ChartContainer>
  )
}
