
import React from "react"
import { TrendingUp, TrendingDown, ArrowUpDown, Users } from "lucide-react"
import { StatCard } from "@/components/StatCard"

interface SwapTransaction {
  date: string
  counterparty: string
  amount: number
  direction: 'SWAP_IN' | 'SWAP_OUT'
  multiple?: number
  card?: string
}

interface CreditMaxStatCardsProps {
  swapTransactions: SwapTransaction[]
}

export function CreditMaxStatCards({ swapTransactions }: CreditMaxStatCardsProps) {
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
    // Reset and re-trigger number animation when transactions change
    setNumbersKey(prev => prev + 1)
  }, [swapTransactions])

  // Calculate metrics from swap transactions
  const metrics = React.useMemo(() => {
    const swapInTransactions = swapTransactions.filter(t => t.direction === 'SWAP_IN')
    const swapOutTransactions = swapTransactions.filter(t => t.direction === 'SWAP_OUT')
    
    const totalSwapIn = swapInTransactions.reduce((sum, t) => sum + t.amount, 0)
    const totalSwapOut = swapOutTransactions.reduce((sum, t) => sum + t.amount, 0)
    const netFlow = totalSwapIn - totalSwapOut
    const uniqueMembers = new Set(swapTransactions.map(t => t.counterparty)).size

    return {
      totalSwapIn,
      totalSwapOut,
      netFlow,
      uniqueMembers
    }
  }, [swapTransactions])

  const cardData = [
    {
      title: "Total Swap In",
      value: metrics.totalSwapIn,
      badge: "Inflow",
      icon: TrendingUp,
      footer: "Credit received",
      description: "Total amount swapped in",
      formatAsPoints: false
    },
    {
      title: "Total Swap Out",
      value: metrics.totalSwapOut,
      badge: "Outflow",
      icon: TrendingDown,
      footer: "Credit distributed",
      description: "Total amount swapped out",
      formatAsPoints: false
    },
    {
      title: "Net Flow",
      value: Math.abs(metrics.netFlow),
      badge: metrics.netFlow >= 0 ? "Positive" : "Negative",
      icon: ArrowUpDown,
      footer: metrics.netFlow >= 0 ? "Net inflow" : "Net outflow",
      description: "Net swap activity",
      formatAsPoints: false
    },
    {
      title: "Active Members",
      value: metrics.uniqueMembers,
      badge: "Members",
      icon: Users,
      footer: "Unique participants",
      description: "Total active members",
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
          showHover={true}
        />
      ))}
    </div>
  )
}
