

import React from "react"
import { Banknote, Star, TrendingUp, CreditCard } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

interface EmployeeMetricsCardsProps {
  filteredTransactions: EmployeeTransaction[]
}

export function EmployeeMetricsCards({ filteredTransactions }: EmployeeMetricsCardsProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [numbersKey, setNumbersKey] = React.useState(0)

  React.useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    // Reset and re-trigger number animation when filtered transactions change
    setNumbersKey(prev => prev + 1)
  }, [filteredTransactions])

  // Calculate metrics from filtered transactions
  const metrics = React.useMemo(() => {
    const totalSpend = filteredTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const totalPoints = filteredTransactions.reduce((sum, transaction) => sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0)
    const avgPointsPerDollar = totalSpend > 0 ? totalPoints / totalSpend : 0
    
    // Count unique combinations of card_type and last_five
    const uniqueCardCombinations = new Set(filteredTransactions.map(transaction => `${transaction.card_type}-${transaction.last_five}`))
    const totalCards = uniqueCardCombinations.size

    return {
      totalSpend,
      totalPoints: Math.round(totalPoints),
      avgPointsPerDollar: Number(avgPointsPerDollar.toFixed(2)),
      totalCards
    }
  }, [filteredTransactions])

  const cardData = [
    {
      title: "Total Spend",
      value: metrics.totalSpend,
      badge: "100%",
      icon: Banknote,
      footer: "Employee spending",
      description: "Total amount spent",
      formatAsPoints: false
    },
    {
      title: "Total Points",
      value: metrics.totalPoints,
      badge: "Points",
      icon: Star,
      footer: "Points earned",
      description: "Total points accumulated",
      formatAsPoints: true
    },
    {
      title: "Avg Points/Dollar",
      value: metrics.avgPointsPerDollar,
      badge: "Rate",
      icon: TrendingUp,
      footer: "Points per dollar",
      description: "Average points earned per dollar",
      formatAsPoints: true
    },
    {
      title: "Total Cards",
      value: metrics.totalCards,
      badge: "Cards",
      icon: CreditCard,
      footer: "Unique cards",
      description: "Total unique employee cards",
      formatAsPoints: true
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          badge={card.badge}
          icon={card.icon}
          footer={card.footer}
          description={card.description}
          index={index}
          isVisible={isVisible}
          numbersKey={numbersKey}
          formatAsPoints={card.formatAsPoints}
          showBadge={false}
        />
      ))}
    </div>
  )
}
