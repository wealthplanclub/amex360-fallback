
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Info } from "lucide-react"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxVerticalMetricsProps {
  swapTransactions: SwapTransaction[]
}

const MetricTooltipContent = ({ metric }: { metric: any }) => (
  <div className="space-y-3 max-w-xs">
    <div className="font-medium">{metric.title}</div>
    <div className="text-sm text-muted-foreground">{metric.description}</div>
    
    <div className="text-xs space-y-1 pt-2 border-t">
      <div><span className="font-medium">Source:</span> {metric.dataSource}</div>
      <div><span className="font-medium">Updated:</span> {metric.lastUpdated}</div>
      <div><span className="font-medium">Method:</span> {metric.calculationMethod}</div>
    </div>
  </div>
)

const MetricSheetContent = ({ metric }: { metric: any }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold">{metric.title}</h3>
      <div className="text-3xl font-bold text-primary mt-2">{metric.value}</div>
    </div>
    <div className="space-y-3">
      <div>
        <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
        <p className="text-sm">{metric.description}</p>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-muted-foreground">Data Source</h4>
        <p className="text-sm">{metric.dataSource}</p>
      </div>
      <div>
        <h4 className="font-medium text-sm text-muted-foreground">Last Updated</h4>
        <p className="text-sm">{metric.lastUpdated}</p>
      </div>
      <div>
        <h4 className="font-medium text-sm text-muted-foreground">Calculation Method</h4>
        <p className="text-sm">{metric.calculationMethod}</p>
      </div>
    </div>
  </div>
)

export function CreditMaxVerticalMetrics({ swapTransactions }: CreditMaxVerticalMetricsProps) {
  const isMobile = useIsMobile()
  const [openSheet, setOpenSheet] = useState<string | null>(null)

  // Calculate metrics from swap transactions
  const metrics = React.useMemo(() => {
    const swapInTransactions = swapTransactions.filter(t => t.direction === 'SWAP_IN')
    const swapOutTransactions = swapTransactions.filter(t => t.direction === 'SWAP_OUT')
    
    const totalSwapOut = swapOutTransactions.reduce((sum, t) => sum + t.amount, 0)
    const totalSwapIn = swapInTransactions.reduce((sum, t) => sum + t.amount, 0)
    const netFlow = totalSwapIn - totalSwapOut
    const averageVolume = swapOutTransactions.length > 0 ? totalSwapOut / swapOutTransactions.length : 0
    const totalCounterparties = new Set(swapTransactions.map(t => t.counterparty)).size

    return {
      totalSwapOut,
      totalSwapIn,
      netFlow,
      averageVolume,
      totalCounterparties
    }
  }, [swapTransactions])

  const metricsData = [
    {
      title: "Total Swaps Out",
      value: `$${metrics.totalSwapOut.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      description: "Total amount swapped out to counterparties",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Sum of all SWAP_OUT transaction amounts"
    },
    {
      title: "Total Swaps In",
      value: `$${metrics.totalSwapIn.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      description: "Total amount swapped in from counterparties",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Sum of all SWAP_IN transaction amounts"
    },
    {
      title: "Net Flow",
      value: `$${Math.abs(metrics.netFlow).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      description: `Net ${metrics.netFlow > 0 ? 'inflow' : metrics.netFlow < 0 ? 'outflow' : 'neutral'} of swap activity`,
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Total swaps in minus total swaps out"
    },
    {
      title: "Average Volume",
      value: `$${metrics.averageVolume.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      description: "Average outbound transaction amount",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Total swaps out ÷ number of outbound transactions"
    },
    {
      title: "Total Counterparties",
      value: metrics.totalCounterparties.toString(),
      description: "Number of unique counterparties in swap transactions",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Count of unique counterparty names"
    }
  ]

  const renderMetricCard = (metric: typeof metricsData[0], index: number) => {
    const cardContent = (
      <Card className="p-6 bg-gradient-to-r from-white to-gray-50 relative group cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metric.value}
            </div>
            <div className="text-base font-semibold text-gray-700">
              {metric.title}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {metric.description}
            </div>
          </div>
          <Info className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" />
        </div>
      </Card>
    )

    if (isMobile) {
      return (
        <Sheet key={metric.title} open={openSheet === metric.title} onOpenChange={(open) => setOpenSheet(open ? metric.title : null)}>
          <SheetTrigger asChild>
            {cardContent}
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto max-h-[80vh]">
            <MetricSheetContent metric={metric} />
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <TooltipProvider key={metric.title}>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm">
            <MetricTooltipContent metric={metric} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="space-y-4">
      {metricsData.map((metric, index) => renderMetricCard(metric, index))}
    </div>
  )
}
