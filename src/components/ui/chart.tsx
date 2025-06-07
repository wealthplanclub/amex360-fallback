
import * as RechartsPrimitive from "recharts"

// Re-export the refactored components
export { ChartContainer } from "./chart/ChartContainer"
export { ChartTooltipContent } from "./chart/ChartTooltipContent"
export { ChartLegend, ChartLegendContent } from "./chart/ChartLegend"
export { ChartStyle } from "./chart/ChartStyle"
export type { ChartConfig } from "./chart/types"

// Export the original Recharts tooltip component
export const ChartTooltip = RechartsPrimitive.Tooltip
