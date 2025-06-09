
import React from "react"
import { TrendingUp, CreditCard, Award } from "lucide-react"
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

  // Calculate metrics from filtered transactions using the bonus context with filter state
  const metrics = React.useMemo(() => {
    return getAdjustedMetrics(filteredTransactions, selectedCardType, selectedLastFive)
  }, [filteredTransactions, getAdjustedMetrics, selectedCardType, selectedLastFive])

  const cardData = [
    {
      title: "Total Points",
      value: metrics.totalPoints,
      badge: "Points",
      icon: Award,
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
