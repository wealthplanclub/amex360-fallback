
import React from "react"
import { DollarSign, Star, TrendingUp } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

interface EmployeeHeaderProps {
  filteredTransactions: EmployeeTransaction[]
}

export function EmployeeHeader({ filteredTransactions }: EmployeeHeaderProps) {
  // Calculate metrics from filtered transactions
  const metrics = React.useMemo(() => {
    const totalSpend = filteredTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const totalPoints = filteredTransactions.reduce((sum, transaction) => sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0)
    const avgPointsPerDollar = totalSpend > 0 ? totalPoints / totalSpend : 0

    return {
      totalSpend,
      totalPoints: Math.round(totalPoints),
      avgPointsPerDollar: Number(avgPointsPerDollar.toFixed(2))
    }
  }, [filteredTransactions])

  return (
    <div className="flex flex-col items-center gap-6">
      <img 
        src="https://i.imgur.com/1fFddP4.png" 
        alt="Amex Logo" 
        className="mx-auto"
        style={{ width: '276px' }}
      />
      
      {/* Metrics Cards */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Spend"
            value={metrics.totalSpend}
            badge="100%"
            icon={DollarSign}
            footer="Employee spending"
            description="Total amount spent"
            index={0}
            isVisible={true}
            numbersKey={0}
            formatAsPoints={false}
          />
          <StatCard
            title="Total Points"
            value={metrics.totalPoints}
            badge="Points"
            icon={Star}
            footer="Points earned"
            description="Total points accumulated"
            index={1}
            isVisible={true}
            numbersKey={0}
            formatAsPoints={true}
          />
          <StatCard
            title="Avg Points/$"
            value={metrics.avgPointsPerDollar}
            badge="Rate"
            icon={TrendingUp}
            footer="Points per dollar"
            description="Average points earned per dollar"
            index={2}
            isVisible={true}
            numbersKey={0}
            formatAsPoints={true}
          />
        </div>
      </div>
    </div>
  )
}
