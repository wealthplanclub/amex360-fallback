
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Info } from "lucide-react"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxQuickMetricsProps {
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

export function CreditMaxQuickMetrics({ swapTransactions }: CreditMaxQuickMetricsProps) {
  const isMobile = useIsMobile()
  const [openSheet, setOpenSheet] = useState<string | null>(null)

  // Calculate metrics from swap transactions
  const metrics = React.useMemo(() => {
    const outboundTransactions = swapTransactions.filter(t => t.direction === 'SWAP_OUT')
    const totalCardSpend = outboundTransactions.reduce((sum, t) => sum + t.amount, 0)
    const totalPointsEarned = outboundTransactions.reduce((sum, t) => sum + (t.amount * t.multiple), 0)
    const actualSpend = totalCardSpend * 0.03
    const truePointMultiple = actualSpend > 0 ? totalPointsEarned / actualSpend : 0
    const totalCounterparties = new Set(swapTransactions.map(t => t.counterparty)).size

    return {
      totalPointsEarned: Math.round(totalPointsEarned),
      totalCardSpend,
      actualSpend,
      truePointMultiple,
      totalCounterparties
    }
  }, [swapTransactions])

  const metricsData = [
    {
      title: "Total Points Earned",
      value: metrics.totalPointsEarned.toLocaleString(),
      description: "Total points earned on outbound transactions",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Sum of (amount × multiple) for all SWAP_OUT transactions"
    },
    {
      title: "Total Card Spend",
      value: `$${metrics.totalCardSpend.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      description: "Total amount spent on outbound swap transactions",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Sum of all SWAP_OUT transaction amounts"
    },
    {
      title: "Actual Spend",
      value: `$${metrics.actualSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: "Actual cost (3% of total card spend)",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Total card spend × 0.03"
    },
    {
      title: "True Point Multiple",
      value: `${metrics.truePointMultiple.toFixed(1)}x`,
      description: "Effective points per dollar of actual spend",
      dataSource: "CreditMax Transaction System",
      lastUpdated: "Real-time",
      calculationMethod: "Total points earned ÷ actual spend"
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
      <Card className="p-4 bg-gradient-to-b from-white to-gray-100 relative group cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex flex-col space-y-1">
          <div className="text-2xl font-semibold text-gray-900">
            {metric.value}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {metric.title}
          </div>
        </div>
        <Info className="absolute top-2 right-2 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <TooltipContent side="bottom" className="max-w-sm">
            <MetricTooltipContent metric={metric} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:px-6 sm:grid-cols-2 lg:grid-cols-5">
      {metricsData.map((metric, index) => renderMetricCard(metric, index))}
    </div>
  )
}
