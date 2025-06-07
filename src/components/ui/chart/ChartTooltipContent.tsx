
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { ChartConfig } from "./types"
import { useChart } from "./ChartContext"
import { getPayloadConfigFromPayload } from "./utils"

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    // Filter out null items from formatter to prevent extra spacing
    const validItems = payload
      .map((item, index) => {
        const key = `${nameKey || item.name || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        
        // Get the raw color value from config, avoiding CSS variables
        let indicatorColor = color
        if (!indicatorColor && itemConfig?.color) {
          // Use the raw color value directly
          indicatorColor = itemConfig.color
        } else if (!indicatorColor && config[key]?.color) {
          // Use the raw color value directly
          indicatorColor = config[key].color
        }

        // If we still have a CSS variable, extract the fallback color or use a default
        if (!indicatorColor || indicatorColor.startsWith('var(')) {
          // Use stroke color from the item as fallback, removing 'var(' prefix if present
          const strokeColor = item.stroke
          if (strokeColor && !strokeColor.startsWith('var(')) {
            indicatorColor = strokeColor
          } else {
            // Fallback colors based on data key
            const fallbackColors = {
              'totalPoints': 'hsl(var(--chart-1))',
              'employeePoints': 'hsl(142, 76%, 36%)',
              'referralPoints': 'hsl(221, 83%, 53%)',
              'welcome': 'hsl(48, 96%, 53%)'
            }
            indicatorColor = fallbackColors[key as keyof typeof fallbackColors] || '#8884d8'
          }
        }

        if (formatter && item?.value !== undefined && item.name) {
          const formatterResult = formatter(item.value, item.name, item, index, item.payload)
          if (formatterResult === null || formatterResult === undefined) {
            return null
          }
          return { item, index, itemConfig, indicatorColor, formatterResult }
        }

        return { item, index, itemConfig, indicatorColor, formatterResult: null }
      })
      .filter(Boolean)

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {validItems.map((validItem) => {
            if (!validItem) return null
            
            const { item, index, itemConfig, indicatorColor, formatterResult } = validItem

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatterResult ? (
                  formatterResult
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={{
                            backgroundColor: indicatorColor,
                            borderColor: indicatorColor,
                          }}
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"
