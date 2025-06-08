
import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Info } from "lucide-react"

const metricsData = [
  {
    title: "Active Card Accounts",
    value: "13",
    description: "Total number of active corporate card accounts",
    dataSource: "Card Management System",
    lastUpdated: "Real-time",
    calculationMethod: "Count of all active card accounts with non-zero limits"
  },
  {
    title: "Highest Credit Limit",
    value: "$30k",
    description: "The highest credit limit among all active cards",
    dataSource: "Credit Management System",
    lastUpdated: "Updated daily",
    calculationMethod: "Maximum credit limit across all active accounts"
  },
  {
    title: "Lowest Pay Over Time Limit",
    value: "$2k",
    description: "The lowest pay over time limit across all accounts",
    dataSource: "Payment Processing System",
    lastUpdated: "Updated daily",
    calculationMethod: "Minimum pay over time limit for active accounts"
  },
  {
    title: "Available Line of Credit",
    value: "$2M",
    description: "Total available credit across all accounts",
    dataSource: "Credit Management System",
    lastUpdated: "Real-time",
    calculationMethod: "Sum of (credit limit - current balance) for all accounts"
  },
  {
    title: "Brand Partner Cards",
    value: "4",
    description: "Number of active brand partner card programs",
    dataSource: "Partner Management System",
    lastUpdated: "Updated weekly",
    calculationMethod: "Count of active brand partnership agreements"
  }
]

const MetricTooltipContent = ({ metric }: { metric: typeof metricsData[0] }) => (
  <div className="space-y-2 max-w-xs">
    <div className="font-medium">{metric.title}</div>
    <div className="text-sm text-muted-foreground">{metric.description}</div>
    <div className="text-xs space-y-1">
      <div><span className="font-medium">Source:</span> {metric.dataSource}</div>
      <div><span className="font-medium">Updated:</span> {metric.lastUpdated}</div>
      <div><span className="font-medium">Method:</span> {metric.calculationMethod}</div>
    </div>
  </div>
)

const MetricSheetContent = ({ metric }: { metric: typeof metricsData[0] }) => (
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

export function QuickMetricsCards() {
  const isMobile = useIsMobile()
  const [openSheet, setOpenSheet] = useState<string | null>(null)

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
            <SheetHeader>
              <SheetTitle>Metric Details</SheetTitle>
            </SheetHeader>
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
    <div className="grid grid-cols-1 gap-3 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-5">
      {metricsData.map((metric, index) => renderMetricCard(metric, index))}
    </div>
  )
}
