
import React from "react"
import { TrendingUp, TrendingDown, ArrowUpDown, BarChart3 } from "lucide-react"
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
    const averageVolume = swapOutTransactions.length > 0 ? totalSwapOut / swapOutTransactions.length : 0

    return {
      totalSwapIn,
      totalSwapOut,
      netFlow,
      averageVolume
    }
  }, [swapTransactions])

  const cardData = [
    {
      title: "Total Swap Out",
      value: metrics.totalSwapOut,
      badge: "100%",
      icon: TrendingDown,
      footer: "Credit distributed",
      description: "Total amount swapped out",
      formatAsPoints: false
    },
    {
      title: "Total Swap In",
      value: metrics.totalSwapIn,
      badge: metrics.totalSwapOut > 0 ? `${Math.round((metrics.totalSwapIn / metrics.totalSwapOut) * 100)}%` : "0%",
      icon: TrendingUp,
      footer: "Credit received",
      description: "Total amount swapped in",
      formatAsPoints: false
    },
    {
      title: "Net Flow",
      value: Math.abs(metrics.netFlow),
      badge: metrics.totalSwapOut > 0 ? `${Math.round((Math.abs(metrics.netFlow) / metrics.totalSwapOut) * 100)}%` : "0%",
      icon: ArrowUpDown,
      footer: metrics.netFlow > 0 ? "Net inflow" : metrics.netFlow < 0 ? "Net outflow" : "Net outflow",
      description: "Net swap activity",
      formatAsPoints: false
    },
    {
      title: "Average Volume",
      value: metrics.averageVolume,
      badge: metrics.totalSwapOut > 0 ? `${Math.round((metrics.averageVolume / metrics.totalSwapOut) * 100)}%` : "0%",
      icon: BarChart3,
      footer: "Outbound average",
      description: "Average outbound amount",
      formatAsPoints: false
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
          showBadge={true}
          showHover={true}
        />
      ))}
    </div>
  )
}
