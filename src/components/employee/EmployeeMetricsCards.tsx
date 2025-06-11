
import React from "react"
import { TrendingUp, CreditCard } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"
import { useEmployeeBonus } from "@/hooks/useEmployeeBonusContext"

interface EmployeeMetricsCardsProps {
  filteredTransactions: EmployeeTransaction[]
  selectedCardType?: string
  selectedLastFive?: string
}

export function EmployeeMetricsCards({ 
  filteredTransactions, 
  selectedCardType, 
  selectedLastFive 
}: EmployeeMetricsCardsProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [numbersKey, setNumbersKey] = React.useState(0)
  const { getAdjustedMetrics } = useEmployeeBonus()

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

  // Calculate metrics from filtered transactions - negative amounts are charges/expenses
  const metrics = React.useMemo(() => {
    // Filter for charges (negative amounts)
    const charges = filteredTransactions.filter(t => t.amount < 0)
    
    // Calculate total spend (absolute value of negative amounts)
    const totalSpend = charges.reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    // Calculate total points (from charges only)
    const totalPoints = charges.reduce((sum, t) => sum + (Math.abs(t.amount) * t.point_multiple), 0)
    
    // Calculate average points per dollar
    const avgPointsPerDollar = totalSpend > 0 ? totalPoints / totalSpend : 0
    
    // Calculate unique cards
    const uniqueCards = new Set(filteredTransactions.map(t => `${t.card_type}-${t.last_five}`)).size
    
    return {
      totalPoints: Math.round(totalPoints),
      totalSpend,
      avgPointsPerDollar,
      totalCards: uniqueCards
    }
  }, [filteredTransactions])

  const cardData = [
    {
      title: "Total Points",
      value: metrics.totalPoints,
      badge: "Points",
      icon: () => <img src="https://i.imgur.com/dTz9vVm.png" alt="Points" className="h-4 w-4" />,
      footer: "Points earned",
      description: "Total points accumulated",
      formatAsPoints: true,
      isPointMultiple: false
    },
    {
      title: "Total Spend",
      value: metrics.totalSpend,
      badge: "100%",
      icon: TrendingUp,
      footer: "Employee spending",
      description: "Total amount spent",
      formatAsPoints: false,
      isPointMultiple: false
    },
    {
      title: "Avg Points/Dollar",
      value: metrics.avgPointsPerDollar,
      badge: "Rate",
      icon: TrendingUp,
      footer: "Points per dollar",
      description: "Average points earned per dollar",
      formatAsPoints: false,
      isPointMultiple: true
    },
    {
      title: "Total Cards",
      value: metrics.totalCards,
      badge: "Cards",
      icon: CreditCard,
      footer: "Unique cards",
      description: "Total unique employee cards",
      formatAsPoints: false,
      isPointMultiple: false
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
          isPointMultiple={card.isPointMultiple}
          showBadge={false}
          showHover={true}
        />
      ))}
    </div>
  )
}
