
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, TrendingUp, TrendingDown, DollarSign, Building } from "lucide-react"
import { transactionFilterService } from "@/services/transactionFilterService"

interface QuickMetricsCardsProps {
  selectedTimeRange: string
}

export function QuickMetricsCards({ selectedTimeRange }: QuickMetricsCardsProps) {
  // Get total number of unique card accounts
  const totalCardAccounts = React.useMemo(() => {
    return transactionFilterService.getUniqueCardAccounts().length
  }, [])

  const metricsData = [
    {
      title: "Total Card Accounts",
      value: totalCardAccounts.toString(),
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      title: "Highest Credit Limit",
      value: "$30K",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Lowest Pay Over Time Limit",
      value: "$2K",
      icon: TrendingDown,
      color: "text-orange-600"
    },
    {
      title: "Available Line of Credit",
      value: "$2M",
      icon: DollarSign,
      color: "text-emerald-600"
    },
    {
      title: "Brand Partner Cards",
      value: "4",
      icon: Building,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metricsData.map((metric, index) => (
        <Card key={metric.title} className="bg-gradient-to-b from-white to-gray-50 border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  {metric.title}
                </p>
                <p className="text-lg font-bold tabular-nums">
                  {metric.value}
                </p>
              </div>
              <metric.icon className={`h-4 w-4 ${metric.color} flex-shrink-0 ml-2`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
