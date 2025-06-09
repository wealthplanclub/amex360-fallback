
import React from "react"
import { Card } from "@/components/ui/card"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxVerticalMetricsProps {
  swapTransactions: SwapTransaction[]
}

export function CreditMaxVerticalMetrics({ swapTransactions }: CreditMaxVerticalMetricsProps) {
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

  const MetricCard = ({ title, value }: { title: string; value: string }) => (
    <Card className="p-4 bg-gradient-to-b from-white to-gray-100">
      <div className="flex flex-col space-y-1">
        <div className="text-2xl font-semibold text-gray-900">
          {value}
        </div>
        <div className="text-sm font-medium text-gray-600">
          {title}
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-3">
      {/* Row 1: Swaps In & Out */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard 
          title="Total Swaps In"
          value={`$${metrics.totalSwapIn.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        />
        <MetricCard 
          title="Total Swaps Out"
          value={`$${metrics.totalSwapOut.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        />
      </div>

      {/* Row 2: Net Flow & Average Volume */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard 
          title="Net Flow"
          value={`$${Math.abs(metrics.netFlow).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        />
        <MetricCard 
          title="Average Volume"
          value={`$${metrics.averageVolume.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        />
      </div>

      {/* Row 3: Total Counterparties */}
      <div className="grid grid-cols-1">
        <MetricCard 
          title="Total Counterparties"
          value={metrics.totalCounterparties.toString()}
        />
      </div>
    </div>
  )
}
