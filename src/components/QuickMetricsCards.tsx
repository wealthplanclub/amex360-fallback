
import React from "react"
import { Card } from "@/components/ui/card"

const metricsData = [
  {
    title: "Total Card Accounts",
    value: "13"
  },
  {
    title: "Highest Credit Limit",
    value: "$30k"
  },
  {
    title: "Lowest Pay Over Time Limit",
    value: "$2k"
  },
  {
    title: "Available Line of Credit",
    value: "$2M"
  },
  {
    title: "Brand Partner Cards",
    value: "4"
  }
]

export function QuickMetricsCards() {
  return (
    <div className="grid grid-cols-1 gap-3 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-5">
      {metricsData.map((metric, index) => (
        <Card key={metric.title} className="p-4 bg-white/80 backdrop-blur-sm border border-gray-200">
          <div className="flex flex-col space-y-1">
            <div className="text-2xl font-semibold text-gray-900">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-gray-600">
              {metric.title}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
